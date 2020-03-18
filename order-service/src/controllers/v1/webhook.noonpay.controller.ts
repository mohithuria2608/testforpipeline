import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { paymentService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import * as CMS from '../../cms'
import { OrderSDME } from '../../sdm'

export class WebhookNoonpayController {

    constructor() { }

    /**
     * @method GET
     * @param {string} paymentInfo :eg : CARD
     * @param {string} result :eg : SUCCESS
     * @param {string} orderReference :eg : 281226369065
     * @param {string} orderId :eg : 281226369065
     * */
    async authorizePayment(headers: ICommonRequest.IHeaders, payload: IWebhookNoonpayRequest.IOrderProcessPayment) {
        try {
            let redirectUrl = config.get("server.order.url")
            let order = await ENTITY.OrderE.getOneEntityMdb({
                "transLogs.noonpayOrderId": payload.orderId
            }, { transLogs: 1, status: 1, payment: 1, userId: 1, cmsOrderRef: 1, sdmOrderRef: 1, language: 1, }, { lean: true })
            if (order && order._id) {
                /**
                 * @description step 1 get noonpay order status
                 */
                let isFailed = false;
                let validationRemarks = "";
                let transLogs = [];
                let webHookStatus;
                try {
                    webHookStatus = await paymentService.getPaymentStatus({
                        noonpayOrderId: payload.orderId,
                        storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                        paymentStatus: Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                    })
                    transLogs.push(webHookStatus)
                } catch (statusError) {
                    isFailed = true
                    validationRemarks = JSON.stringify(statusError.details)
                    if (statusError.data) {
                        if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                            transLogs.push(statusError.data)
                        } else if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                            transLogs.push(statusError.data)
                        } else {
                            consolelog(process.cwd(), "unhandled payment error web hook status", "", false)
                        }
                    }
                }
                consolelog(process.cwd(), "isFailed", isFailed, true)
                consolelog(process.cwd(), "order.status", order.status, true)
                if (order.status != Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO) {
                    if (!isFailed && webHookStatus && webHookStatus.resultCode == 0 && webHookStatus.transactions && webHookStatus.transactions.length > 0) {
                        let dataToUpdateOrder = {
                            $addToSet: {
                                transLogs: { $each: transLogs.reverse() }
                            },
                            "payment.transactionId": webHookStatus.transactions[0].id,
                            "payment.status": webHookStatus.transactions[0].type
                        }
                        order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                        if (order && order._id && order.payment.status == "AUTHORIZATION") {
                            ENTITY.CartE.resetCart(order.userId)
                            CMS.TransactionCMSE.createTransaction({
                                order_id: order.cmsOrderRef,
                                message: webHookStatus.transactions[0].type,
                                type: Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.CMS,
                                payment_data: {
                                    id: webHookStatus.transactions[0].id.toString(),
                                    data: JSON.stringify(webHookStatus)
                                }
                            })
                            CMS.OrderCMSE.updateOrder({
                                order_id: order.cmsOrderRef,
                                payment_status: Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                                order_status: Constant.DATABASE.STATUS.ORDER.PENDING.CMS,
                                sdm_order_id: order.sdmOrderRef
                            })
                            redirectUrl = redirectUrl + "payment/success"
                            return redirectUrl
                        } else {
                            isFailed = true
                            // validationRemarks = error.message
                        }
                    }
                } else {
                    consolelog(process.cwd(), "step 1", isFailed, true)

                    if (!isFailed) {
                        consolelog(process.cwd(), "step 2", isFailed, true)
                        isFailed = true
                        let transLogs = [];
                        let reverseStatus;
                        try {
                            await paymentService.reversePayment({
                                noonpayOrderId: parseInt(order.transLogs[0].noonpayOrderId),
                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                            })
                        } catch (revError) {
                            if (revError.data) {
                                if (revError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                    transLogs.push(revError.data)
                                } else if (revError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                    transLogs.push(revError.data)
                                } else {
                                    consolelog(process.cwd(), "unhandled payment error reverse", "", false)
                                }
                            }
                        }
                        try {
                            reverseStatus = await paymentService.getPaymentStatus({
                                noonpayOrderId: parseInt(order.transLogs[0].noonpayOrderId),
                                storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                                paymentStatus: Constant.DATABASE.STATUS.PAYMENT.CANCELLED,
                            })
                            transLogs.push(reverseStatus)
                        } catch (statusError) {
                            if (statusError.data) {
                                if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID) {
                                    transLogs.push(statusError.data)
                                } else if (statusError.data.actionHint == Constant.DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION) {
                                    transLogs.push(statusError.data)
                                } else {
                                    consolelog(process.cwd(), "unhandled payment error reverse status", "", false)
                                }
                            }
                        }
                        let dataToUpdateOrder = {
                            isActive: 0,
                            status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                            updatedAt: new Date().getTime(),
                            validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.ORDER_AMOUNT_MISMATCH,
                            "payment.status": Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS
                        }
                        if (transLogs && transLogs.length > 0)
                            dataToUpdateOrder['$addToSet'] = {
                                transLogs: { $each: transLogs.reverse() }
                            }
                        order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                    }
                }
                if (isFailed) {
                    let dataToUpdateOrder = {
                        isActive: 0,
                        status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                        updatedAt: new Date().getTime(),
                        "payment.status": Constant.DATABASE.STATUS.TRANSACTION.FAILED.AS
                    }
                    if (transLogs && transLogs.length > 0)
                        dataToUpdateOrder['$addToSet'] = {
                            transLogs: { $each: transLogs.reverse() }
                        }
                    if (validationRemarks && validationRemarks != "")
                        dataToUpdateOrder['validationRemarks'] = validationRemarks
                    order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                    if (webHookStatus && order && order._id) {
                        OrderSDME.cancelOrder({
                            sdmOrderRef: order.sdmOrderRef,
                            voidReason: 1,
                            validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.PAYMENT_FAILURE,
                            language: order.language
                        })
                        CMS.TransactionCMSE.createTransaction({
                            order_id: order.cmsOrderRef,
                            message: (webHookStatus && webHookStatus.transactions && webHookStatus.transactions.length > 0) ? webHookStatus.transactions[0].type : validationRemarks,
                            type: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.CMS,
                            payment_data: {
                                id: (webHookStatus && webHookStatus.transactions && webHookStatus.transactions.length > 0) ? webHookStatus.transactions[0].id.toString() : order.cmsOrderRef,
                                data: JSON.stringify(transLogs)
                            }
                        })
                        CMS.OrderCMSE.updateOrder({
                            order_id: order.cmsOrderRef,
                            payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                            order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS,
                            sdm_order_id: order.sdmOrderRef
                        })
                    }
                    redirectUrl = redirectUrl + "payment/failure"
                    console.log("redirectUrl=================>", redirectUrl)
                    return redirectUrl
                }
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }

        } catch (error) {
            consolelog(process.cwd(), "authorizePayment", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const webhookNoonpayController = new WebhookNoonpayController();