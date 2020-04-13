import * as config from "config"
import * as Constant from '../../constant'
import { consolelog, getFrequency } from '../../utils'
import { userService, locationService, promotionService, menuService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import { OrderSDME } from '../../sdm';
import { Aerospike } from "../../aerospike"

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
                let data = JSON.parse(payload.cms.argv)
                if (payload.cms.create) {
                    let orderPayload = data.orderPayload
                    let headers = data.headers
                    let userData = data.userData
                    let address = data.address
                    let cart = data.cart
                    let order = data.order
                    let failOrder = (payload.count > Constant.CONF.GENERAL.DEFAULT_RETRY_COUNT) ? true : false
                    await this.syncOnCms(orderPayload, headers, userData, address, cart, order, failOrder, false)
                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get)) {
                let data = JSON.parse(payload.sdm.argv);
                if (payload.sdm.create) {
                    let headers = data.headers
                    let userData = data.userData
                    let address = data.address
                    let order = data.order
                    let failOrder = (payload.count > Constant.CONF.GENERAL.DEFAULT_RETRY_COUNT) ? true : false
                    await this.syncOnSdm(headers, userData, address, order, failOrder, false)
                }
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
     * @param {number} contactlessDlvry
     * @param {string} dlvryInstr
     * */
    async postOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IPostOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await userService.fetchUser({ userId: auth.id })
            consolelog(process.cwd(), "step 1", new Date(), false)

            let cart = await ENTITY.CartE.getCart({ cartId: payload.cartId })
            if (!cart)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
            if (cart && (!cart.items || (cart.items && cart.items.length == 0)))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.EMPTY_CART)

            consolelog(process.cwd(), "step 2", new Date(), false)
            let addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
            if (payload.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP.AS)
                addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
            let getAddress: IUserGrpcRequest.IFetchAddressRes = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })
            if (!getAddress.hasOwnProperty("id") || getAddress.id == "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)
            consolelog(process.cwd(), "step 3", new Date(), false)

            let serviceType = ""
            if (payload.orderType == Constant.DATABASE.TYPE.ORDER.DELIVERY.AS)
                serviceType = Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY
            else
                serviceType = Constant.DATABASE.TYPE.STORE_SERVICE.TAKEAWAY
            let store: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.storeId, language: headers.language, serviceType: serviceType })
            if (store && store.id && store.menuId == payload.curMenuId) {
                const menu = await menuService.fetchMenu({
                    menuId: payload.curMenuId,
                    language: headers.language,
                })
                // if (!menu.menuId || (menu.menuId && menu.updatedAt != payload.menuUpdatedAt)) {
                //     return {
                //         validateCart: {
                //             ...cart,
                //             invalidMenu: 1
                //         }
                //     }
                // }
                if (!store.active)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E412.SERVICE_UNAVAILABLE)
                if (!store.isOnline)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E412.SERVICE_UNAVAILABLE)
            consolelog(process.cwd(), "step 4", new Date(), false)

            if (config.get("sdm.promotion.default"))
                payload.couponCode = config.get("sdm.promotion.defaultCode")
            let promo: IPromotionGrpcRequest.IValidatePromotionRes
            if (payload.couponCode) {
                promo = await promotionService.validatePromotion({ couponCode: payload.couponCode })
                if (!promo || (promo && !promo.isValid))
                    delete payload['couponCode']
            } else
                delete payload['couponCode']
            consolelog(process.cwd(), "step 5", new Date(), false)

            let totalAmount = cart.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL })
            if (totalAmount[0].amount < Constant.CONF.COUNTRY_SPECIFIC[headers.country].MIN_CART_VALUE)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MIN_CART_VALUE_VOILATION)
            if (totalAmount[0].amount > Constant.CONF.COUNTRY_SPECIFIC[headers.country].MIN_COD_CART_VALUE && payload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MAX_COD_CART_VALUE_VOILATION)

            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.createOrderMongo(headers, payload, cart, getAddress, store, userData)
            consolelog(process.cwd(), "step 6", new Date(), false)

            let initiatePayment = await ENTITY.OrderE.initiatePaymentHandler(
                headers,
                payload.paymentMethodId,
                order,
                totalAmount[0].amount
            )
            consolelog(process.cwd(), "step 7", new Date(), false)

            if (initiatePayment.order && initiatePayment.order._id) {
                order = initiatePayment.order
                if (order.status == Constant.CONF.ORDER_STATUS.PENDING.MONGO) {
                    this.syncOnLegacy(payload, headers, userData, getAddress, cart, order, false, true)
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
                ENTITY.OrderE.orderFailureHandler(order, -1, Constant.STATUS_MSG.SDM_ORDER_VALIDATION.PAYMENT_FAILURE)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
            }
        } catch (error) {
            consolelog(process.cwd(), "postOrder", error, false)
            return Promise.reject(error)
        }
    }

    async syncOnLegacy(
        orderPayload: IOrderRequest.IPostOrder,
        headers: ICommonRequest.IHeaders,
        userData: IUserRequest.IUserData,
        address: IUserGrpcRequest.IFetchAddressRes,
        cart: ICartRequest.ICartData,
        mongoOrder: IOrderRequest.IOrderData,
        failOrder: boolean,
        firstTry: boolean) {
        try {
            this.syncOnCms(orderPayload, headers, userData, address, cart, mongoOrder, failOrder, firstTry)
            this.syncOnSdm(headers, userData, address, mongoOrder, failOrder, firstTry)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncOnLegacy", error, false)
            return Promise.reject(error)
        }
    }

    async syncOnCms(
        orderPayload: IOrderRequest.IPostOrder,
        headers: ICommonRequest.IHeaders,
        userData: IUserRequest.IUserData,
        address: IUserGrpcRequest.IFetchAddressRes,
        cart: ICartRequest.ICartData,
        mongoOrder: IOrderRequest.IOrderData,
        failOrder: boolean,
        firstTry: boolean
    ) {
        try {
            if (mongoOrder.cmsOrderRef == 0) {
                let cmsReq = await ENTITY.CartE.createCartReqForCms(
                    cart.items,
                    cart.selFreeItem,
                    orderPayload.orderType,
                    orderPayload.couponCode,
                    userData)
                let cmsOrderReq = {
                    ...cmsReq.req,
                    payment_method: orderPayload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD ? "cashondelivery" : "noonpay",
                    mongo_order_id: mongoOrder._id.toString(),
                    contactless_dlvry: mongoOrder.contactlessDlvry,
                    dlvry_instr: mongoOrder.dlvryInstr
                }
                await ENTITY.OrderE.createOrderOnCMS({
                    headers: headers,
                    cmsOrderReq: cmsOrderReq,
                    userData: userData,
                    address: address,
                    order: mongoOrder,
                    failOrder: failOrder,
                    firstTry: firstTry
                }, orderPayload, cart)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncOnCms", error, false)
            return Promise.reject(error)
        }
    }

    async syncOnSdm(
        headers: ICommonRequest.IHeaders,
        userData: IUserRequest.IUserData,
        address: IUserGrpcRequest.IFetchAddressRes,
        mongoOrder: IOrderRequest.IOrderData,
        failOrder: boolean,
        firstTry: boolean) {
        try {
            if (mongoOrder.sdmOrderRef == 0) {
                mongoOrder = await ENTITY.OrderE.createSdmOrder({
                    headers: headers,
                    userData: userData,
                    address: address,
                    order: mongoOrder,
                    failOrder: failOrder,
                    firstTry: firstTry
                })
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncOnLegacy", error, false)
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
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ _id: payload.orderId }, { transLogs: 0, notification: 0 })
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
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ _id: payload.orderId }, { status: 1, country: 1, sdmOrderRef: 1, store: 1 })
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
     * @param {string} cCode
     * @param {string} phnNo
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
            if (isNaN(sdmOrder))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E422.INVALID_ORDER)
            let userData: IUserRequest.IUserData = await userService.fetchUser({ cCode: payload.cCode, phnNo: payload.phnNo })
            if (userData.id == undefined || userData.id == null || userData.id == "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)

            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ sdmOrderRef: sdmOrder }, { transLogs: 0, notification: 0 })
            if (order && order._id) {
                if (userData.id != order.userId)
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
        } catch (error) {
            consolelog(process.cwd(), "trackOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getSdmOrderScheduler() {
        try {
            let validSdmOrderStatus = [0, 1, 96, 2, 8, 16, 32, 64, 128, 2048, 512, 256, 1024, 4096, 8192]
            let sdmActiveOrders = await OrderSDME.getActiveOrders({
                language: "En",
                country: "UAE",
                // ordersIDs: [{ int: 39867166 }]
            })
            if (sdmActiveOrders && sdmActiveOrders.KeyValueOflongint && sdmActiveOrders.KeyValueOflongint.length > 0) {
                sdmActiveOrders.KeyValueOflongint = sdmActiveOrders.KeyValueOflongint.filter(obj => {
                    return (validSdmOrderStatus.indexOf(parseInt(obj.Value)) >= 0)
                })
            }
            if (sdmActiveOrders.KeyValueOflongint && sdmActiveOrders.KeyValueOflongint.length > 0) {
                sdmActiveOrders.KeyValueOflongint.forEach(obj => {
                    this.cronPromise(obj)
                })
            } else {
                this.cronPromise(sdmActiveOrders.KeyValueOflongint)
            }
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrderSchedulerNew", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async cronPromise(payload) {
        try {
            let getOrderDetailStatus = [0, 1, 96, 512, 256, 1024, 4096, 8192];
            if (payload.Key && payload.Value) {
                let checkIfStatusChanged = await ENTITY.OrderE.updateOneEntityMdb({
                    // _id: "5e947a8bb3f8c45309d73870",
                    sdmOrderRef: parseInt(payload.Key),
                    sdmOrderStatus: { $ne: parseInt(payload.Value) }
                }, {
                    sdmOrderStatus: parseInt(payload.Value),
                    updatedAt: new Date().getTime()
                }, { new: true, select: { items: 0, selFreeItem: 0, freeItems: 0 } })
                if (checkIfStatusChanged && checkIfStatusChanged._id) {
                    if (getOrderDetailStatus.indexOf(parseInt(payload.Key)) >= 0)
                        ENTITY.OrderE.getSdmOrderScheduler(checkIfStatusChanged)
                    else
                        ENTITY.OrderE.donotGetSdmOrderScheduler(checkIfStatusChanged)
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "cronPromise", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const orderController = new OrderController();