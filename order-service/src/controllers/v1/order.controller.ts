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
            let postCartPayload: ICartRequest.IValidateCart = {
                cartId: payload.cartId,
                curMenuId: payload.curMenuId,
                menuUpdatedAt: payload.menuUpdatedAt,
                couponCode: payload.couponCode,
                items: payload.items
            }
            let cartData: ICartRequest.ICartData = await cartController.validateCart(headers, postCartPayload, auth)
            if (cartData['isPriceChanged'] || cartData['invalidMenu'])
                return { cart: cartData }

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
            let amount = 0
            order.amount.forEach(elem => {
                if (elem.code == "TOTAL") {
                    amount = elem.amount
                }
            })
            console.log("amount", typeof amount, amount)
            let initiatePaymentObj: IPaymentGrpcRequest.IInitiatePaymentRes = await paymentService.initiatePayment({
                orderId: order._id.toString(),
                amount:75,// amount,
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
            return {
                order: {
                    cartId: newCartId,
                    noonpayRedirectionUrl: initiatePaymentObj.noonpayRedirectionUrl,
                    order: {
                        "_id": "5e2422631f66da1fa13402f1",
                        "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                        "cmsCartRef": 0,
                        "sdmOrderRef": 0,
                        "cmsOrderRef": 0,
                        "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                        "orderId": "UAE-1",
                        "status": "PENDING",
                        "createdAt": 1578558475844,
                        "updatedAt": 1578558475844,
                        "items": [
                            {
                                "id": 1,
                                "position": 1,
                                "name": "Chocolate Chip Cookie",
                                "description": "",
                                "inSide": 0,
                                "finalPrice": 5.5,
                                "specialPrice": 4.5,
                                "typeId": "simple",
                                "catId": 21,
                                "metaKeyword": [
                                    "Chocolate Chip Cookie"
                                ],
                                "bundleProductOptions": [],
                                "selectedItem": 0,
                                "configurableProductOptions": [],
                                "items": [],
                                "sku": 710003,
                                "imageSmall": "/d/u/dummy-product.png",
                                "imageThumbnail": "/d/u/dummy-product.png",
                                "image": "/d/u/dummy-product.png",
                                "taxClassId": 2,
                                "virtualGroup": 0,
                                "visibility": 4,
                                "associative": 0
                            }
                        ],
                        "amount": [
                            {
                                "type": "SUB_TOTAL",
                                "name": "Sub Total",
                                "code": "SUB_TOTAL",
                                "amount": 30.25,
                                "sequence": 1

                            },
                            {
                                "type": "DISCOUNT",
                                "name": "Discount",
                                "code": "KFC 10",
                                "amount": 2,
                                "sequence": 2
                            },
                            {
                                "type": "TAX",
                                "name": "VAT",
                                "code": "VAT",
                                "amount": 0.26,
                                "sequence": 3
                            },
                            {
                                "type": "SHIPPING",
                                "name": "Free Delivery",
                                "code": "FLAT",
                                "amount": 7.5,
                                "sequence": 4
                            },
                            {
                                "type": "TOTAL",
                                "name": "Total",
                                "code": "TOTAL",
                                "amount": 30.25,
                                "sequence": 5
                            }],
                        "address": {
                            "areaId": 520,
                            "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                            "storeId": 0,
                            "sdmAddressRef": 0,
                            "cmsAddressRef": 0,
                            "tag": "HOME",
                            "bldgName": "Peru",
                            "description": "Peru society, street 2",
                            "flatNum": "35",
                            "addressType": "DELIVERY",
                            "lat": 50.322,
                            "lng": 20.322
                        },
                        "store": {
                            "sdmStoreRef": 28,
                            "lat": 50.322,
                            "lng": 20.322,
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
                        },
                        "isPreviousOrder": false
                    }
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
            if (userData || !userData.id || userData.id != "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            let trackOrder: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ $or: [{ _id: payload.orderId }, { orderId: payload.orderId }] },
                {
                    orderId: 1,
                    userId: 1,
                    status: 1,
                    address: 1,
                    store: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    amount: 1,
                })
            if (trackOrder && trackOrder._id) {
                if (userData.id != trackOrder.userId)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
                trackOrder.amount.filter(obj => { return obj.type == "TOTAL" })[0]
                return trackOrder
            } else {
                return {
                    "_id": "5e2422631f66da1fa13402f1",
                    "orderId": "UAE-1",
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address",
                        "name_en": "ABU KADRA - DUBAI",
                        "name_ar": "كنتاكى أبو خضرة  - دبى",
                    },
                    "amount": {
                        "type": "TOTAL",
                        "name": "Total",
                        "code": "TOTAL",
                        "amount": 30.25,
                        "sequence": 5
                    }
                }
            }
        } catch (error) {
            consolelog(process.cwd(), "trackOrder", error, false)
            return Promise.reject(error)
        }
    }
}

export const orderController = new OrderController();