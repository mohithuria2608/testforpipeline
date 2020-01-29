import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { paymentService } from '../../grpc/client'
import * as ENTITY from '../../entity'

export class WebhookNoonpayController {

    constructor() { }

    /**
     * @method GET
     * @param {string} paymentInfo :eg : CARD
     * @param {string} result :eg : SUCCESS
     * @param {string} orderReference :eg : 281226369065
     * @param {string} orderId :eg : 281226369065
     * */
    async processPayment(headers: ICommonRequest.IHeaders, payload: IWebhookNoonpayRequest.IOrderProcessPayment) {
        try {
            let getOrder = await ENTITY.OrderE.getOneEntityMdb({
                "transLogs.noonpayOrderId": payload.orderId
            }, { transLogs: 1 }, { lean: true })
            if (getOrder && getOrder._id) {
                /**
                 * @description step 1 get noonpay order status
                 */
                let status = await paymentService.getPaymentStatus({
                    noonpayOrderId: payload.orderId,
                    storeCode: "kfc_uae_store",
                    paymentStatus: "AUTHORIZED",
                })
                let dataToUpdateOrder = {
                    $addToSet: {
                        transLogs: status
                    },
                    paymentStatus: status.paymentStatus
                }
                await ENTITY.OrderE.updateOneEntityMdb({ _id: getOrder._id }, dataToUpdateOrder)
                if (status.paymentStatus == "AUTHORIZED") {
                    /**
                     * @description update order on sdm with payment object
                     */
                }
                return {}
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ORDER_NOT_FOUND)
            }

        } catch (error) {
            consolelog(process.cwd(), "processPayment", error, false)
            return Promise.reject(error)
        }
    }
}

export const webhookNoonpayController = new WebhookNoonpayController();