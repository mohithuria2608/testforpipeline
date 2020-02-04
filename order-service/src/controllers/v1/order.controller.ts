import * as Constant from '../../constant'
import { consolelog, cryptData } from '../../utils'
import { userService, locationService, kafkaService, paymentService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { cartController } from './cart.controller';

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
            let noonpayRedirectionUrl = ""
            let postCartPayload: ICartRequest.IValidateCart = {
                cartId: payload.cartId,
                curMenuId: payload.curMenuId,
                menuUpdatedAt: payload.menuUpdatedAt,
                couponCode: payload.couponCode,
                items: payload.items
            }
            let cartData: ICartRequest.ICartData = await cartController.validateCart(headers, postCartPayload, auth)
            // if (cartData['isPriceChanged'] || cartData['invalidMenu'])
            //     return { cartValidate: cartData }

            consolelog(process.cwd(), "cartData", JSON.stringify(cartData), false)

            let getAddress: IUserGrpcRequest.IFetchAddressRes = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: "delivery" })
            if (!getAddress.hasOwnProperty("id") || getAddress.id == "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)

            let getStore: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.sdmStoreRef })
            if (!getStore.hasOwnProperty("id"))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_STORE)


            /**
             * @description step 1 create order on CMS synchronously
             * @description step 2 create order on SDM async
             * @description step 3 create order on MONGO synchronously
             * @description step 4 inititate payment on Noonpay synchronously
             */
            // let cmsOrder = await ENTITY.OrderE.createOrderOnCMS({})
            ENTITY.OrderE.syncOrder(cartData)
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.createOrder(cartData, getAddress, getStore)
            let amount
            order.amount.filter(elem => {
                if (elem.code == "TOTAL") {
                    return amount = elem
                }
            })
            console.log("amount", typeof amount, amount)
            if (payload.paymentMethodId != 0) {
                let initiatePaymentObj: IPaymentGrpcRequest.IInitiatePaymentRes = await paymentService.initiatePayment({
                    orderId: order._id.toString(),
                    amount: amount.amount,
                    storeCode: "kfc_uae_store",
                    paymentMethodId: 1,
                    channel: "Mobile",
                    locale: "en",
                })
                noonpayRedirectionUrl = initiatePaymentObj.noonpayRedirectionUrl,
                    await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                        $addToSet: {
                            transLogs: initiatePaymentObj
                        },
                        payment: {
                            paymentMethodId: payload.paymentMethodId,
                            amount: amount.amount,
                        }
                    })
            } else {
                await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                    payment: {
                        paymentMethodId: payload.paymentMethodId,
                        amount: amount.amount,
                    }
                })
            }
            /**
             * @description : update user with new cart
             */
            let newCartId = ENTITY.OrderE.ObjectId().toString()
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
            return {
                orderPlaced: {
                    newCartId: newCartId,
                    noonpayRedirectionUrl: noonpayRedirectionUrl,
                    orderInfo: order
                }
            }
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
            let userData = await userService.fetchUser({ cCode: payload.cCode, phnNo: payload.phnNo })
            if (userData.id == undefined || userData.id == null || userData.id == "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ orderId: payload.orderId }, { transLogs: 0 })
            if (order && order._id) {
                if (userData.id != order.userId)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
                order.amount.filter(obj => { return obj.code == "TOTAL" })[0]
                return order
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }
        } catch (error) {
            consolelog(process.cwd(), "trackOrder", error, false)
            return Promise.reject(error)
        }
    }
}

export const orderController = new OrderController();