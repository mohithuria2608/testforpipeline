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
            }, { transLogs: 1 }, { lean: true })
            if (order && order._id) {
                /**
                 * @description step 1 get noonpay order status
                 */
                let isFailed = false
                let validationRemarks = ""
                let status
                try {
                    status = await paymentService.getPaymentStatus({
                        noonpayOrderId: payload.orderId,
                        storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                        paymentStatus: Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                    })
                } catch (error) {
                    isFailed = true
                    validationRemarks = error.details
                    status = error.data
                }

                if (!isFailed && status && status.resultCode == 0 && status.transactions && status.transactions.length > 0) {
                    let dataToUpdateOrder = {
                        $addToSet: {
                            transLogs: status
                        },
                        "payment.transactionId": status.transactions[0].id,
                        "payment.status": status.transactions[0].type
                    }
                    order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })

                    if (order.payment.status == "AUTHORIZATION") {
                        ENTITY.CartE.resetCart(order.userId)
                        CMS.TransactionCMSE.createTransaction({
                            order_id: order.cmsOrderRef,
                            message: status.transactions[0].type,
                            type: Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.CMS,
                            payment_data: {
                                id: status.transactions[0].id.toString(),
                                data: JSON.stringify(status)
                            }
                        })
                        CMS.OrderCMSE.updateOrder({
                            order_id: order.cmsOrderRef,
                            payment_status: Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                            order_status: Constant.DATABASE.STATUS.ORDER.PENDING.CMS
                        })
                        redirectUrl = redirectUrl + "payment/success"
                        return redirectUrl
                    } else {
                        isFailed = true
                        // validationRemarks = error.message
                    }
                }
                if (isFailed) {
                    let dataToUpdateOrder = {
                        isActive: 0,
                        status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                        updatedAt: new Date().getTime(),
                        "payment.status": Constant.DATABASE.STATUS.TRANSACTION.FAILED.AS
                    }
                    if (status)
                        dataToUpdateOrder['$addToSet'] = {
                            transLogs: status
                        }
                    if (validationRemarks && validationRemarks != "")
                        dataToUpdateOrder['validationRemarks'] = validationRemarks
                    order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                    OrderSDME.cancelOrder({
                        sdmOrderRef: order.sdmOrderRef,
                        voidReason: 1,
                        validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.PAYMENT_FAILURE,
                        language: order.language
                    })
                    CMS.TransactionCMSE.createTransaction({
                        order_id: order.cmsOrderRef,
                        message: (status && status.transactions && status.transactions.length > 0) ? status.transactions[0].type : validationRemarks,
                        type: Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.CMS,
                        payment_data: {
                            id: (status && status.transactions && status.transactions.length > 0) ? status.transactions[0].id.toString() : order.cmsOrderRef,
                            data: status ? JSON.stringify(status) : validationRemarks
                        }
                    })
                    CMS.OrderCMSE.updateOrder({
                        order_id: order.cmsOrderRef,
                        payment_status: Constant.DATABASE.STATUS.PAYMENT.FAILED,
                        order_status: Constant.DATABASE.STATUS.ORDER.FAILURE.CMS
                    })
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