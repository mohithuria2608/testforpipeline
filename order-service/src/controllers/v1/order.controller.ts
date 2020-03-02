import * as Constant from '../../constant'
import { consolelog, hashObj } from '../../utils'
import { userService, locationService, promotionService, paymentService } from '../../grpc/client'
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
                let data = JSON.parse(payload.sdm.argv)
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
            if (!userData.sdmUserRef || userData.sdmUserRef == 0) {
                userData = await userService.createUserOnSdm(userData)
            }
            if (!userData.cmsUserRef || userData.cmsUserRef == 0) {
                userData = await userService.createUserOnCms(userData)
            }
            let order: IOrderRequest.IOrderData
            let paymentRetry = false
            let getCurrentCart = await ENTITY.CartE.getCart({ cartId: payload.cartId })
            let dataToHash: ICartRequest.IDataToHash = {
                items: payload.items,
                promo: payload.couponCode ? 1 : 0
            }
            const hash = hashObj(dataToHash)
            console.log("cartUnique ================ ", getCurrentCart.cartUnique)
            console.log("cartUnique ---------------- ", hash)
            if (hash == getCurrentCart.cartUnique) {
                order = await ENTITY.OrderE.getOneEntityMdb({ cartUnique: getCurrentCart.cartUnique }, {}, { lean: true })
                if (order && order._id)
                    paymentRetry = true
            }
            let totalAmount = getCurrentCart.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL })
            if (totalAmount[0].amount < Constant.SERVER.MIN_CART_VALUE)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MIN_CART_VALUE_VOILATION)
            if (totalAmount[0].amount > Constant.SERVER.MIN_COD_CART_VALUE && payload.paymentMethodId == 0)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MAX_COD_CART_VALUE_VOILATION)
            let noonpayRedirectionUrl = ""
            if (!paymentRetry) {
                let addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                if (payload.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP)
                    addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                let getAddress: IUserGrpcRequest.IFetchAddressRes = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })

                if (!getAddress.hasOwnProperty("id") || getAddress.id == "")
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)
                else {
                    if (!getAddress.cmsAddressRef || getAddress.cmsAddressRef == 0) {
                        userData['asAddress'] = JSON.stringify([getAddress])
                        await userService.creatAddressOnCms(userData)
                        getAddress = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })
                    }
                    if (!getAddress.sdmAddressRef || getAddress.sdmAddressRef == 0) {
                        userData['asAddress'] = JSON.stringify([getAddress])
                        await userService.creatAddressOnSdm(userData)
                        getAddress = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })
                    }
                }

                let getStore: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.storeId, language: headers.language })
                if (!getStore.hasOwnProperty("id"))
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_STORE)
                else {
                    if (!getStore['isOnline'])
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                }

                let promo: IPromotionGrpcRequest.IValidatePromotionRes
                if (payload.couponCode && payload.items && payload.items.length > 0) {
                    let promo = await promotionService.validatePromotion({ couponCode: payload.couponCode })
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
                let postCartPayload: ICartRequest.IValidateCart = {
                    cartId: payload.cartId,
                    curMenuId: payload.curMenuId,
                    menuUpdatedAt: payload.menuUpdatedAt,
                    couponCode: payload.couponCode,
                    items: payload.items,
                    orderType: payload.orderType
                }
                let cmsReq = await ENTITY.CartE.createCartReqForCms(postCartPayload, userData)
                let cmsOrder = await ENTITY.OrderE.createOrderOnCMS(cmsReq.req, getAddress.cmsAddressRef)

                let cartData: ICartRequest.ICartData
                if (cmsOrder && cmsOrder['order_id']) {
                    cartData = await ENTITY.CartE.getCart({ cartId: payload.cartId })
                    cartData['cmsOrderRef'] = parseInt(cmsOrder['order_id'])
                } else {
                    cartData = await ENTITY.CartE.updateCart(payload.cartId, cmsOrder, false, payload.items)
                    cartData['promo'] = promo ? promo : {}
                    return { cartValidate: cartData }
                }
                cartData['orderType'] = payload.orderType
                order = await ENTITY.OrderE.createOrder(headers, payload.orderType, cartData, getAddress, getStore, userData, promo)
            }
            if (payload.paymentMethodId != 0) {
                let initiatePaymentObj: IPaymentGrpcRequest.IInitiatePaymentRes = await paymentService.initiatePayment({
                    orderId: order.cmsOrderRef.toString(),
                    amount: totalAmount[0].amount,
                    storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                    paymentMethodId: 1,
                    channel: "Mobile",
                    locale: "en",
                })
                noonpayRedirectionUrl = initiatePaymentObj.noonpayRedirectionUrl
                order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                    $addToSet: {
                        transLogs: initiatePaymentObj
                    },
                    payment: {
                        paymentMethodId: payload.paymentMethodId,
                        amount: totalAmount[0].amount,
                        name: Constant.DATABASE.TYPE.PAYMENT_METHOD.CARD
                    }
                })
            } else {
                order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                    payment: {
                        paymentMethodId: payload.paymentMethodId,
                        amount: totalAmount[0].amount,
                        name: Constant.DATABASE.TYPE.PAYMENT_METHOD.COD
                    }
                })
                ENTITY.CartE.resetCart(payload.cartId)
            }
            ENTITY.OrderE.syncOrder(order)

            return {
                orderPlaced: {
                    noonpayRedirectionUrl: noonpayRedirectionUrl,
                    orderInfo: order
                }
            }
        } catch (error) {
            consolelog(process.cwd(), "postOrder", error, false)

            consolelog(process.cwd(), "postOrder", JSON.stringify(error), false)
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
                order['nextPing'] = 15
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
                return Promise.reject(Constant.STATUS_MSG.ERROR.E422.INVALID_ORDER)
            let userData: IUserRequest.IUserData
            if (payload.cCode && payload.phnNo) {
                userData = await userService.fetchUser({ cCode: payload.cCode, phnNo: payload.phnNo })
                if (userData.id == undefined || userData.id == null || userData.id == "")
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ sdmOrderRef: sdmOrder }, { transLogs: 0 })
            if (order && order._id) {
                if (payload.cCode && payload.phnNo && (userData.id != order.userId))
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
                order.amount.filter(obj => { return obj.code == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL })[0]
                order['nextPing'] = 15
                order['unit'] = "second"
                return order
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }
        } catch (error) {
            consolelog(process.cwd(), "trackOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const orderController = new OrderController();