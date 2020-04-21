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
    async authorizePayment(payload: IWebhookNoonpayRequest.IOrderProcessPayment) {
        let sucRedirectUrl = config.get("server.order.url") + Constant.CONF.GENERAL.PAYMENT_SUCCESS_FALLBACK

        let { redirectUrl, order } = await ENTITY.OrderE.authorizePaymentHandler({ ...payload, apiCall: true })
        if (redirectUrl == sucRedirectUrl)
            ENTITY.CartE.resetCart(order.cartId)

        return redirectUrl
    }
}

export const webhookNoonpayController = new WebhookNoonpayController();