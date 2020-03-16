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
                promo: payload.couponCode ? 1 : 0,
                updatedAt: getCurrentCart.updatedAt
            }
            const hash = hashObj(dataToHash)
            console.log("cartUnique ================ ", getCurrentCart.cartUnique)
            console.log("cartUnique ---------------- ", hash)
            if (hash == getCurrentCart.cartUnique) {
                order = await ENTITY.OrderE.getOneEntityMdb({ cartUnique: getCurrentCart.cartUnique }, {}, { lean: true })
                if (order && order._id)
                    paymentRetry = true
            } else {
                let midOrder = await ENTITY.OrderE.getOneEntityMdb({ cartUnique: hash }, {}, { lean: true })
                if (midOrder && midOrder._id) {
                    return {
                        orderPlaced: {
                            noonpayRedirectionUrl: "",
                            orderInfo: midOrder
                        }
                    }
                } else {
                    if (getCurrentCart.items && getCurrentCart.items.length == 0) {
                        let midRes: any = { ...getCurrentCart }
                        midRes['invalidMenu'] = (getCurrentCart['invalidMenu'] == 1) ? true : false
                        midRes['storeOnline'] = (getCurrentCart['storeOnline'] == 1) ? true : false
                        return { cartValidate: getCurrentCart }
                    }
                }
            }
            let totalAmount = getCurrentCart.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL })
            if (totalAmount[0].amount < Constant.SERVER.MIN_CART_VALUE)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.MIN_CART_VALUE_VOILATION)
            if (totalAmount[0].amount > Constant.SERVER.MIN_COD_CART_VALUE && payload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD)
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
                    // if (!getStore.isOnline)
                    //     return Constant.STATUS_MSG.ERROR.E409.STORE_NOT_FOUND
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
                let cmsReq = await ENTITY.CartE.createCartReqForCms(payload.items, payload.selFreeItem, payload.orderType, payload.couponCode, userData)

                let cmsOrderReq = {
                    ...cmsReq.req,
                    payment_method: payload.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD ? "cashondelivery" : "noonpay"
                }
                let cmsOrder = await ENTITY.OrderE.createOrderOnCMS(cmsOrderReq, getAddress.cmsAddressRef)

                if (cmsOrder && !cmsOrder['order_id']) {
                    getCurrentCart = await ENTITY.CartE.updateCart({
                        headers: headers,
                        orderType: payload.orderType,
                        cartId: payload.cartId,
                        cmsCart: cmsOrder,
                        changeCartUnique: true,
                        curItems: payload.items,
                        selFreeItem: payload.selFreeItem,
                        invalidMenu: false,
                        storeOnline: true,
                        promo: promo ? promo : {}
                    })
                    return { cartValidate: getCurrentCart }
                }
                order = await ENTITY.OrderE.createOrder(headers, parseInt(cmsOrder['order_id']), getCurrentCart, getAddress, getStore, userData)
            }
            if (payload.paymentMethodId != Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                let initiatePaymentObj: IPaymentGrpcRequest.IInitiatePaymentRes = await paymentService.initiatePayment({
                    orderId: order.cmsOrderRef.toString(),
                    amount: totalAmount[0].amount,
                    storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                    paymentMethodId: Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD,
                    channel: "Mobile",
                    locale: (headers.language == Constant.DATABASE.LANGUAGE.EN) ? "en" : "ar",
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
                CMS.TransactionCMSE.createTransaction({
                    order_id: order.cmsOrderRef,
                    message: initiatePaymentObj.paymentStatus,
                    type: Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.CMS,
                    payment_data: {
                        id: initiatePaymentObj.noonpayOrderId.toString(),
                        data: JSON.stringify(initiatePaymentObj)
                    }
                })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.PAYMENT.INITIATED,
                    order_status: Constant.DATABASE.STATUS.ORDER.PENDING.CMS
                })
            } else {
                order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                    payment: {
                        paymentMethodId: payload.paymentMethodId,
                        amount: totalAmount[0].amount,
                        name: Constant.DATABASE.TYPE.PAYMENT_METHOD.COD
                    }
                })
                CMS.OrderCMSE.updateOrder({
                    order_id: order.cmsOrderRef,
                    payment_status: Constant.DATABASE.STATUS.PAYMENT.INITIATED,
                    order_status: Constant.DATABASE.STATUS.ORDER.PENDING.CMS
                })
                ENTITY.CartE.resetCart(auth.id)
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
                    order.amount.filter(obj => { return obj.code == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL })[0]
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
     * @JUGAAD
     * @description : @todo : remove this
     */
    async bootstrapPendingOrders() {
        try {
            let getPendingOrders = await ENTITY.OrderE.getMultipleMdb({
                status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO
            }, { sdmOrderRef: 1, createdAt: 1, status: 1, transLogs: 1, cmsOrderRef: 1, language: 1 }, { lean: true })
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
                    else {
                        if (order.status == Constant.DATABASE.STATUS.ORDER.PENDING.MONGO) {
                            OrderSDME.cancelOrder({
                                sdmOrderRef: order.sdmOrderRef,
                                voidReason: 1,
                                validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED
                            })
                            if (order.payment && order.payment.paymentMethodId == Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD) {
                                order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                    updatedAt: new Date().getTime(),
                                    sdmOrderStatus: -2,
                                    validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                                }, { new: true })
                                CMS.OrderCMSE.updateOrder({
                                    order_id: order.cmsOrderRef,
                                    payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                                    order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS
                                })
                            } else {
                                await paymentService.reversePayment({
                                    noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                    storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                                })
                                let status = await paymentService.getPaymentStatus({
                                    noonpayOrderId: order.transLogs[1].noonpayOrderId,
                                    storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                                    paymentStatus: Constant.DATABASE.STATUS.PAYMENT.CANCELLED,
                                })
                                order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                    updatedAt: new Date().getTime(),
                                    validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                                    sdmOrderStatus: -2,
                                    $addToSet: {
                                        transLogs: status
                                    },
                                    "payment.status": Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS
                                }, { new: true })
                                CMS.TransactionCMSE.createTransaction({
                                    order_id: order.cmsOrderRef,
                                    message: status.transactions[0].type,
                                    type: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.CMS,
                                    payment_data: {
                                        id: status.transactions[0].id.toString(),
                                        data: JSON.stringify(status)
                                    }
                                })
                                CMS.OrderCMSE.updateOrder({
                                    order_id: order.cmsOrderRef,
                                    payment_status: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                                    order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS
                                })
                            }
                        }
                    }
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