import * as Constant from '../../constant'
import { consolelog, hashObj, getFrequency } from '../../utils'
import { userService, locationService, promotionService, paymentService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import * as CMS from '../../cms'
import { OrderSDME } from '../../sdm';


export class OrderController {

    constructor() { }

    /**
    * @description : sync user to cms and sdm coming from KAFKA
    * @param {IKafkaGrpcRequest.IKafkaBody} payload 
    */
    async syncOrderFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get)) {
                let data = JSON.parse(payload.as.argv)
                if (payload.as.create) {

                }
                if (payload.as.update) {

                }
                if (payload.as.update) {

                }
            }
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get)) {
                let data = JSON.parse(payload.as.argv)
                if (payload.cms.create) {

                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get)) {
                let data = JSON.parse(payload.sdm.argv);
                data.language = Constant.DATABASE.LANGUAGE.EN;
                if (payload.sdm.create)
                    await ENTITY.OrderE.createSdmOrder(data)
                if (payload.sdm.get)
                    await ENTITY.OrderE.getSdmOrder(data)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {string} addressId
     * @param {string} orderType
     * @param {string} paymentMethodId
     * @param {string} cartId
     * @param {string} curMenuId
     * @param {string} menuUpdatedAt
     * @param {string} lat
     * @param {string} lng
     * @param {string} couponCode
     * @param {string} items
     * */
    async postOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IPostOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await userService.fetchUser({ userId: auth.id })
            if (!userData.sdmUserRef || userData.sdmUserRef == 0)
                userData = await userService.createUserOnSdm(userData)
            if (!userData.cmsUserRef || userData.cmsUserRef == 0)
                userData = await userService.createUserOnCms(userData)

            let addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
            if (payload.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP.AS)
                addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
            let getAddress: IUserGrpcRequest.IFetchAddressRes = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })

            if (!getAddress.hasOwnProperty("id") || getAddress.id == "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)
            else {
                if (!getAddress.cmsAddressRef || getAddress.cmsAddressRef == 0) {
                    userData['asAddress'] = JSON.stringify([getAddress])
                    userData['headers'] = headers
                    await userService.creatAddressOnCms(userData)
                    getAddress = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })
                }
                if (!getAddress.sdmAddressRef || getAddress.sdmAddressRef == 0) {
                    userData['asAddress'] = JSON.stringify([getAddress])
                    userData['headers'] = headers
                    await userService.creatAddressOnSdm(userData)
                    getAddress = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })
                }
            }
            let store: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.storeId, language: headers.language })
            if (store && store.id && store.id != "" && store.menuId == payload.curMenuId) {
                if (!store.active)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E412.SERVICE_UNAVAILABLE)
                if (!store.isOnline)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E412.SERVICE_UNAVAILABLE)
            let promo: IPromotionGrpcRequest.IValidatePromotionRes
            if (payload.couponCode && payload.items && payload.items.length > 0) {
                promo = await promotionService.validatePromotion({ couponCode: payload.couponCode })
                if (!promo || (promo && !promo.isValid)) {
                    delete payload['couponCode']
                }
            } else
                delete payload['couponCode']
            /**
             * @description step 1 create order on CMS synchronously => async for cod and sync for noonpay
             * @description step 2 create order on SDM async
             * @description step 3 create order on MONGO synchronously
             * @description step 4 inititate payment on Noonpay synchronously
             */
            let cmsReq = await ENTITY.CartE.createCartReqForCms(payload.items, payload.selFreeItem, payload.orderType, payload.couponCode, userData)
            let cmsOrderReq = {
                ...cmsReq.req,
                payment_method: payload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD ? "cashondelivery" : "noonpay"
            }
            let cmsOrder = await ENTITY.OrderE.createOrderOnCMS(cmsOrderReq, getAddress.cmsAddressRef)
            let cart: ICartRequest.ICartData = await ENTITY.CartE.updateCart({
                headers: headers,
                orderType: payload.orderType,
                cartId: payload.cartId,
                cmsCart: cmsOrder,
                curItems: payload.items,
                selFreeItem: payload.selFreeItem,
                invalidMenu: false,
                promo: promo,
                storeOnline: true
            })
            if (cmsOrder && !cmsOrder['order_id']) {
                return { cartValidate: cart }
            }
            let totalAmount = cart.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL })
            if (totalAmount[0].amount < Constant.SERVER.MIN_CART_VALUE) {
                CMS.OrderCMSE.updateOrder({
                    order_id: parseInt(cmsOrder['order_id']),
                    payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                    order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                    sdm_order_id: 0
                })
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MIN_CART_VALUE_VOILATION)
            }
            if (totalAmount[0].amount > Constant.SERVER.MIN_COD_CART_VALUE && payload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                CMS.OrderCMSE.updateOrder({
                    order_id: parseInt(cmsOrder['order_id']),
                    payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                    order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                    sdm_order_id: 0
                })
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MAX_COD_CART_VALUE_VOILATION)
            }

            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.createOrder(headers, parseInt(cmsOrder['order_id']), cart, getAddress, store, userData)
            let initiatePayment = await ENTITY.OrderE.initiatePaymentHandler(
                headers,
                payload.paymentMethodId,
                order,
                totalAmount[0].amount
            )
            console.log("initiatePayment", JSON.stringify(initiatePayment))
            if (initiatePayment.order && initiatePayment.order._id) {
                order = initiatePayment.order
                if (order.status == Constant.DATABASE.STATUS.ORDER.PENDING.MONGO) {
                    ENTITY.OrderE.syncOrder(order)
                    if (payload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD)
                        ENTITY.CartE.resetCart(cart.cartId)
                }
                return {
                    orderPlaced: {
                        noonpayRedirectionUrl: initiatePayment.noonpayRedirectionUrl,
                        orderInfo: order
                    }
                }
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
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
            consolelog(process.cwd(), "orderHistory", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {number} orderId
     * */
    async orderDetail(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IOrderDetail, auth: ICommonRequest.AuthorizationObj) {
        try {
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ _id: payload.orderId }, { transLogs: 0 })
            if (order && order._id) {
                return order
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }
        } catch (error) {
            consolelog(process.cwd(), "orderDetail", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {number} orderId
     * */
    async orderStatusPing(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IOrderStatus, auth: ICommonRequest.AuthorizationObj) {
        try {
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ _id: payload.orderId }, { status: 1, country: 1, sdmOrderRef: 1 })
            if (order && order._id) {
                order['nextPing'] = getFrequency({
                    status: order.status,
                    type: Constant.DATABASE.TYPE.FREQ_TYPE.GET_ONCE,
                    prevTimeInterval: 0,
                    statusChanged: false
                }).nextPingFe
                order['unit'] = "second"
                return order
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }
        } catch (error) {
            consolelog(process.cwd(), "orderStatusPing", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {string=} cCode
     * @param {string=} phnNo
     * @param {number} orderId
     * */
    async trackOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.ITrackOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            let sdmOrderRef = payload.orderId.split("-")
            let sdmOrder = 0
            if (sdmOrderRef && sdmOrderRef.length == 2) {
                if (sdmOrderRef[0] != headers.country)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E422.INVALID_ORDER)
                else
                    sdmOrder = parseInt(sdmOrderRef[1])
            } else if (sdmOrderRef && sdmOrderRef.length == 1)
                sdmOrder = parseInt(sdmOrderRef[0])
            else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            let userData: IUserRequest.IUserData
            if (payload.cCode && payload.phnNo) {
                userData = await userService.fetchUser({ cCode: payload.cCode, phnNo: payload.phnNo })
                if (userData.id == undefined || userData.id == null || userData.id == "")
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }
            let getSdmOrderRef = await ENTITY.OrderE.getOneEntityMdb({ sdmOrderRef: sdmOrder }, { status: 1 })
            if (getSdmOrderRef && getSdmOrderRef._id) {
                await ENTITY.OrderE.getSdmOrder({
                    sdmOrderRef: sdmOrder,
                    language: headers.language,
                    timeInterval: getFrequency({
                        status: getSdmOrderRef.status,
                        type: Constant.DATABASE.TYPE.FREQ_TYPE.GET_ONCE,
                        prevTimeInterval: 0,
                        statusChanged: false
                    }).nextPingMs
                })
                let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ sdmOrderRef: sdmOrder }, { transLogs: 0 })
                if (order && order._id) {
                    if (payload.cCode && payload.phnNo && (userData.id != order.userId))
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
                    order.amount.filter(obj => { return obj.code == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL })[0]
                    order['nextPing'] = getFrequency({
                        status: order.status,
                        type: Constant.DATABASE.TYPE.FREQ_TYPE.GET_ONCE,
                        prevTimeInterval: 0,
                        statusChanged: false
                    }).nextPingFe
                    order['unit'] = "second"
                    return order
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)

        } catch (error) {
            consolelog(process.cwd(), "trackOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description : Bootstraping pending orders after server restart
     */
    async bootstrapPendingOrders() {
        try {
            let getPendingOrders = await ENTITY.OrderE.getMultipleMdb({
                status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO
            }, { sdmOrderRef: 1, createdAt: 1, status: 1, transLogs: 1, cmsOrderRef: 1, language: 1, payment: 1, }, { lean: true })
            if (getPendingOrders && getPendingOrders.length > 0) {
                getPendingOrders.forEach(async order => {
                    if ((order.createdAt + Constant.SERVER.MAX_PENDING_STATE_TIME) > new Date().getTime()) {
                        ENTITY.OrderE.getSdmOrder({
                            sdmOrderRef: order.sdmOrderRef,
                            language: order.language,
                            timeInterval: getFrequency({
                                status: order.status,
                                type: Constant.DATABASE.TYPE.FREQ_TYPE.GET_ONCE,
                                prevTimeInterval: 0,
                                statusChanged: false
                            }).nextPingMs
                        })
                    }
                    else
                        ENTITY.OrderE.maxPendingReachedHandler(order)
                });
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapPendingOrders", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const orderController = new OrderController();