import * as Constant from '../../constant'
import { consolelog, cryptData } from '../../utils'
import { userService, locationService, kafkaService, paymentService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class OrderController {

    constructor() { }

    /**
    * @description : sync user to cms and sdm coming from KAFKA
    * @param {IKafkaGrpcRequest.IKafkaBody} payload 
    */
    async syncOrderFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get)) {
                if (payload.as.create) {

                }
                if (payload.as.update) {

                }
                if (payload.as.update) {

                }
            }
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get)) {
                if (payload.cms.create) {

                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get)) {
                if (payload.sdm.create)
                    ENTITY.OrderE.createSdmOrder(data)
                if (payload.sdm.get)
                    ENTITY.OrderE.getSdmOrder(data)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {string} addressId
     * @param {string} cartId
     * */
    async postOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IPostOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await userService.fetchUser({ userId: auth.id })
            let getAddress: IUserGrpcRequest.IFetchAddressRes = await userService.fetchAddress({ userId: userData.id, addressId: payload.addressId, bin: "delivery" })
            if (!getAddress.hasOwnProperty("id"))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)

            let getStore: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.sdmStoreRef })
            if (!getStore.hasOwnProperty("id"))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_STORE)

            let cartData = await ENTITY.CartE.getCart({ cartId: payload.cartId })

            /**
             * @description step 1 create order on CMS synchronously
             * @description step 2 create order on SDM async
             * @description step 3 create order on MONGO synchronously
             * @description step 4 inititate payment on Noonpay synchronously
             */
            // let cmsOrder = await ENTITY.OrderE.createOrderOnCMS({})
            ENTITY.OrderE.syncOrder(cartData)
            cartData['status'] = Constant.DATABASE.STATUS.ORDER.PENDING.MONGO
            cartData['updatedAt'] = new Date().getTime()
            cartData['transLogs'] = []
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.createOneEntityMdb(cartData)
            let initiatePaymentObj: IPaymentGrpcRequest.IInitiatePaymentRes = await paymentService.initiatePayment({
                orderId: order._id.toString(),
                amount: 100,
                storeCode: "kfc_uae_store",
                paymentMethodId: 1,
                channel: "Mobile",
                locale: "en",
            })
            await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                $addToSet: {
                    transLogs: initiatePaymentObj
                }
            })
            /**
             * @description : update user with new cart
             */
            let newCartId = ENTITY.OrderE.DAOManager.ObjectId.toString()
            ENTITY.CartE.assignNewCart(newCartId, auth.id)
            let asUserChange = {
                set: Constant.SET_NAME.USER,
                as: {
                    update: true,
                    argv: JSON.stringify({ userId: auth.id, cartId: newCartId })
                }
            }
            await userService.sync(asUserChange)
            // Aerospike.remove({ set: ENTITY.CartE.set, key: payload.cartId })

            ENTITY.OrderE.getSdmOrder({
                cartId: payload.cartId,
                sdmOrderRef: 0,
                timeInterval: Constant.KAFKA.SDM.ORDER.INTERVAL.GET_STATUS,
                status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO
            })
            return { cartId: newCartId, noonpayRedirectionUrl: initiatePaymentObj.noonpayRedirectionUrl }
        } catch (error) {
            consolelog(process.cwd(), "postOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {number} page
     * */
    async orderHistory(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IOrderHistory, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.OrderE.getOrderHistory(payload, auth)
        } catch (error) {
            consolelog(process.cwd(), "orderHistory", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {string} cCode
     * @param {string} phnNo
     * @param {number} orderId
     * */
    async trackOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.ITrackOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            let trackOrderOfUser = await userService.fetchUser({ cCode: payload.cCode, phnNo: payload.phnNo })
            let trackOrder: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ $or: [{ _id: payload.orderId }, { orderId: payload.orderId }] },
                {
                    orderId: 1,
                    userId: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1
                })
            if (trackOrder && trackOrder._id) {
                if (trackOrderOfUser.id != trackOrder.userId)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
                return trackOrder
            } else {
                return {
                    "_id": "5e2422631f66da1fa13402f1",
                    "orderId": "UAE-1",
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                }
            }
        } catch (error) {
            consolelog(process.cwd(), "trackOrder", error, false)
            return Promise.reject(error)
        }
    }
}

export const orderController = new OrderController();