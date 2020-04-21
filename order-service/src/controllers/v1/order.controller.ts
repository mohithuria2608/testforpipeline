import * as config from "config"
import * as Constant from '../../constant'
import { consolelog, getFrequency } from '../../utils'
import { userService, locationService, promotionService, menuService } from '../../grpc/client'
import * as ENTITY from '../../entity'
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
            // let validatedStore = await locationService.validateCoordinate({ lat: getAddress.lat, lng: getAddress.lng, serviceType: serviceType })
            // if (validatedStore.storeId != getAddress.storeId) {
            // }
            let store: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.storeId, language: headers.language, serviceType: serviceType })
            if (store && store.id && store.menuId == payload.curMenuId) {
                const menu = await menuService.fetchMenu({
                    menuId: payload.curMenuId,
                    language: headers.language,
                })
                if (!menu.menuId || (menu.menuId && menu.updatedAt != payload.menuUpdatedAt)) {
                    return {
                        validateCart: {
                            ...cart,
                            invalidMenu: 1
                        }
                    }
                }
                if (!store.active)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E412.SERVICE_UNAVAILABLE)
                if (!store.isOnline)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
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
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MIN_CART_VALUE_VOILATION(Constant.CONF.COUNTRY_SPECIFIC[headers.country].MIN_CART_VALUE))
            if (totalAmount[0].amount > Constant.CONF.COUNTRY_SPECIFIC[headers.country].MIN_COD_CART_VALUE && payload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MAX_COD_CART_VALUE_VOILATION(Constant.CONF.COUNTRY_SPECIFIC[headers.country].MIN_COD_CART_VALUE))

            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.createOrderMongo(headers, payload, cart, getAddress, store, userData)
            consolelog(process.cwd(), "step 6", new Date(), false)

            let initiatePayment = await ENTITY.OrderE.initiatePaymentHandler(
                headers,
                payload.paymentMethodId,
                order,
                totalAmount[0].amount
            )
            consolelog(process.cwd(), "step 7", new Date(), false)
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
            let orderHistory = await ENTITY.OrderE.getOrderHistory(payload, auth)
            return orderHistory
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
                order = await ENTITY.OrderE.maxPendingReachedHandler(order);
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
                order = await ENTITY.OrderE.maxPendingReachedHandler(order);
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
                order = await ENTITY.OrderE.maxPendingReachedHandler(order);
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
            let sdmActiveOrders = await OrderSDME.getActiveOrders({
                language: Constant.DATABASE.LANGUAGE.EN,
                country: Constant.DATABASE.COUNTRY.UAE,
                // ordersIDs: [{ int: 39867166 }],
                fromDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            })
            if (sdmActiveOrders && sdmActiveOrders.KeyValueOflongint) {
                sdmActiveOrders.KeyValueOflongint = await ENTITY.OrderstatusE.checkOrderstatusValidForCron(sdmActiveOrders.KeyValueOflongint)

                if (sdmActiveOrders.KeyValueOflongint && sdmActiveOrders.KeyValueOflongint.length > 0)
                    this.cronUpdate(sdmActiveOrders.KeyValueOflongint)
                else
                    this.cronUpdate([sdmActiveOrders.KeyValueOflongint])
            }
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrderSchedulerNew", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async cronUpdate(payload: IOrderSdmRequest.IGetActiveOrdersResObj[]) {
        try {
            let promise = []
            payload.forEach(obj => { promise.push(this.cronPromise(obj)) })
            let fakeSdmOrderIds = await Promise.all(promise)
            fakeSdmOrderIds = fakeSdmOrderIds.filter(obj => { return (obj) })
            if (fakeSdmOrderIds && fakeSdmOrderIds.length > 0) {
                let checkOrderExistsByUpdatingOrder = await ENTITY.OrderE.getMultipleMdb({
                    sdmOrderRef: { $in: fakeSdmOrderIds },
                    status: {
                        $nin: [
                            Constant.CONF.ORDER_STATUS.CANCELED.MONGO,
                            Constant.CONF.ORDER_STATUS.FAILURE.MONGO
                        ]
                    }
                }, { _id: 1, sdmOrderRef: 1, sdmOrderStatus: 1 })
                let finalSdmOrderIdToBypass = []
                if (checkOrderExistsByUpdatingOrder && checkOrderExistsByUpdatingOrder.length > 0) {
                    fakeSdmOrderIds.forEach(soi => {
                        if (soi) {
                            let soiExists = false
                            checkOrderExistsByUpdatingOrder.map(mo => {
                                if (mo) {
                                    if (soi == mo.sdmOrderRef)
                                        soiExists = true
                                }
                            })
                            if (!soiExists)
                                finalSdmOrderIdToBypass.push(soi)
                        }
                    })
                } else
                    finalSdmOrderIdToBypass = fakeSdmOrderIds

                await ENTITY.OrderstatusE.appendTodayOrderStatus({ bin: "fake", value: finalSdmOrderIdToBypass })
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "cronPromise", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async cronPromise(payload: IOrderSdmRequest.IGetActiveOrdersResObj) {
        try {
            let donotGetOrderDetailStatus = [2, 8, 16, 32, 64, 128, 2048]
            let getRetrySdmOrderStatus = [96, 0]
            if (payload && payload.Key && payload.Value) {
                let checkIfStatusChanged = await ENTITY.OrderE.updateOneEntityMdb({
                    status: {
                        $nin: [
                            Constant.CONF.ORDER_STATUS.CANCELED.MONGO,
                            Constant.CONF.ORDER_STATUS.FAILURE.MONGO
                        ]
                    },
                    sdmOrderRef: parseInt(payload.Key)
                }, {
                    sdmOrderStatus: parseInt(payload.Value),
                    updatedAt: new Date().getTime()
                }, { new: true, select: { items: 0, selFreeItem: 0, freeItems: 0 } })
                if (checkIfStatusChanged && checkIfStatusChanged._id) {
                    await ENTITY.OrderstatusE.updateOrderstatusForCron(payload, checkIfStatusChanged)
                    if (donotGetOrderDetailStatus.indexOf(parseInt(payload.Value)) >= 0)
                        ENTITY.OrderE.donotGetSdmOrderScheduler(checkIfStatusChanged)
                    else
                        ENTITY.OrderE.getSdmOrderScheduler(checkIfStatusChanged)
                    return
                } else {
                    if (getRetrySdmOrderStatus.indexOf(parseInt(payload.Value)) >= 0) {
                        let order = await ENTITY.OrderE.getOneEntityMdb({ sdmOrderRef: parseInt(payload.Key) }, { items: 0, selFreeItem: 0, freeItems: 0 })
                        if (order && order._id) {
                            ENTITY.OrderE.getSdmOrderScheduler(order)
                            return
                        } else
                            return parseInt(payload.Key)

                    } else
                        return parseInt(payload.Key)
                }
            } else
                return
        } catch (error) {
            consolelog(process.cwd(), "cronPromise", JSON.stringify(error), false)
            return
        }
    }
}

export const orderController = new OrderController();