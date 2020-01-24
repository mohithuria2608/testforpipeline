import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { sendSuccess } from '../../utils'
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


            //noonpay order id + order status
            // dont rely status hit = > get payment status from payment service  =>response {order status and transaction array [{transactionId : ""},{transactionId : ""}]}
            //if(status = authorise => update sdm with payment object)

            
            return {}
        } catch (error) {
            consolelog(process.cwd(), "processPayment", error, false)
            return Promise.reject(error)
        }
    }
}

export const webhookNoonpayController = new WebhookNoonpayController();