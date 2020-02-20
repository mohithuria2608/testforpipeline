import * as Constant from '../../constant'
import { consolelog, hashObj } from '../../utils'
import { userService, locationService, promotionService, paymentService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { cartController } from './cart.controller';
import { parse } from 'path'

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
                    ENTITY.OrderE.createSdmOrder(data)
                if (payload.sdm.get)
                    ENTITY.OrderE.getSdmOrder(data)
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
            let order: IOrderRequest.IOrderData
            let retry = false
            let getCurrentCart = await ENTITY.CartE.getCart({ cartId: payload.cartId })
            if (hashObj(getCurrentCart.items) == hashObj(payload.items)) {
                order = await ENTITY.OrderE.getOneEntityMdb({ cartId: payload.cartId }, {}, { lean: true })
                if (order && order._id)
                    retry = true
            }

            let newCartId = ""
            let noonpayRedirectionUrl = ""
            if (!retry) {
                let addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                if (payload.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP)
                    addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                let getAddress: IUserGrpcRequest.IFetchAddressRes = await userService.fetchAddress({ userId: auth.id, addressId: payload.addressId, bin: addressBin })
                if (!getAddress.hasOwnProperty("id") || getAddress.id == "")
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)

                let getStore: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.sdmStoreRef })
                if (!getStore.hasOwnProperty("id"))
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_STORE)

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
                    items: payload.items
                }
                let cmsReq = await ENTITY.CartE.createCartReqForCms(postCartPayload, userData)
                let cmsOrder = await ENTITY.OrderE.createOrderOnCMS(cmsReq.req, getAddress.cmsAddressRef)

                let cartData: ICartRequest.ICartData
                if (cmsOrder && cmsOrder['order_id']) {
                    cartData = await ENTITY.CartE.getCart({ cartId: payload.cartId })
                    cartData['cmsOrderRef'] = parseInt(cmsOrder['order_id'])
                } else {
                    cartData = await ENTITY.CartE.updateCart(payload.cartId, cmsOrder, payload.items)
                    cartData['promo'] = promo
                    return { cartValidate: cartData }
                }
                cartData['orderType'] = payload.orderType
                order = await ENTITY.OrderE.createOrder(payload.orderType, cartData, getAddress, getStore, userData)
            }
            // let subTotal = order.amount.filter(elem => { return elem.type == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL.SUB_TOTAL })
            // let tax = order.amount.filter(elem => { return elem.type == Constant.DATABASE.TYPE.CART_AMOUNT.TAX })
            let amount = order.amount.filter(elem => { return elem.type == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL })
            // if ((subTotal[0].amount + tax[0].amount) < 23.5) {
            //     return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MINIMUM_CART_VALUE_VIOLATION)
            // }
            if (payload.paymentMethodId != 0) {
                let initiatePaymentObj: IPaymentGrpcRequest.IInitiatePaymentRes = await paymentService.initiatePayment({
                    orderId: order.cmsOrderRef.toString(),
                    amount: amount[0].amount,
                    storeCode: "kfc_uae_store",
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
                        amount: amount[0].amount,
                        name: "Card",
                    }
                })
            } else {
                order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                    payment: {
                        paymentMethodId: payload.paymentMethodId,
                        amount: amount[0].amount,
                        name: "Cash On Delivery"
                    }
                })
                /**
                * @description : update user with new cart in case of Cash On Delivery
                */
                newCartId = ENTITY.OrderE.ObjectId().toString()
                ENTITY.CartE.assignNewCart(order.cartId, newCartId, auth.id)
                let asUserChange = {
                    set: Constant.SET_NAME.USER,
                    as: {
                        update: true,
                        argv: JSON.stringify({ userId: auth.id, cartId: newCartId })
                    }
                }
                await userService.sync(asUserChange)
            }
            ENTITY.OrderE.syncOrder(order)

            return {
                orderPlaced: {
                    newCartId: newCartId,
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
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ orderId: payload.orderId }, { transLogs: 0 })
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
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ orderId: payload.orderId }, { status: 1, orderId: 1 })
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
            let userData: IUserRequest.IUserData
            if (payload.cCode && payload.phnNo) {
                userData = await userService.fetchUser({ cCode: payload.cCode, phnNo: payload.phnNo })
                if (userData.id == undefined || userData.id == null || userData.id == "")
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            }
            let order: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ orderId: payload.orderId }, { transLogs: 0 })
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