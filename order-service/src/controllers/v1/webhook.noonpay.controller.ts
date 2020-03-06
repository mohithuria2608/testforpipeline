import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { paymentService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import * as CMS from '../../cms'

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
                let status = await paymentService.getPaymentStatus({
                    noonpayOrderId: payload.orderId,
                    storeCode: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE,
                    paymentStatus: Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                })
                if (status.transactions && status.transactions.length > 0) {
                    let dataToUpdateOrder = {
                        $addToSet: {
                            transLogs: status
                        },
                        "payment.transactionId": status.transactions[0].id,
                        "payment.status": status.transactions[0].type
                    }
                    order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                    CMS.TransactionCMSE.createTransaction({
                        order_id: order.cmsOrderRef.toString(),
                        message: status.transactions[0].type,
                        type: status.transactions[0].type,
                        payment_data: {
                            id: status.transactions[0].id.toString(),
                            data: JSON.stringify(status)
                        }
                    })
                    if (order.payment.status == "AUTHORIZATION") {
                        redirectUrl = redirectUrl + "payment/success"
                        ENTITY.CartE.resetCart(order.userId)
                    } else {
                        let dataToUpdateOrder = {
                            isActive: 0,
                            status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                            updatedAt: new Date().getTime(),
                            "payment.status": Constant.DATABASE.STATUS.TRANSACTION.FAILED
                        }
                        order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                        redirectUrl = redirectUrl + "payment/failure"
                    }
                    return redirectUrl
                } else {
                    let dataToUpdateOrder = {
                        $addToSet: {
                            transLogs: status
                        },
                        isActive: 0,
                        status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                        updatedAt: new Date().getTime(),
                        "payment.status": Constant.DATABASE.STATUS.TRANSACTION.FAILED
                    }
                    order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                    CMS.TransactionCMSE.createTransaction({
                        order_id: order.cmsOrderRef.toString(),
                        message: status.transactions[0].type,
                        type: status.transactions[0].type,
                        payment_data: {
                            id: status.transactions[0].id.toString(),
                            data: JSON.stringify(status)
                        }
                    })
                    redirectUrl = redirectUrl + "payment/failure"
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