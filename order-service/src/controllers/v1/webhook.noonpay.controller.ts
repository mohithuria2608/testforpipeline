import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { paymentService, userService } from '../../grpc/client'
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
                    paymentStatus:Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                })
                let dataToUpdateOrder = {
                    $addToSet: {
                        transLogs: status
                    },
                    "payment.transactionId": status.transactions[0].id,
                    "payment.status": status.transactions[0].type
                }
                order = await ENTITY.OrderE.updateOneEntityMdb({ _id: order._id }, dataToUpdateOrder, { new: true })
                if (order.payment.status == "AUTHORIZATION") {
                    /**
                     * @description update order on sdm with payment object
                     */
                    /**
                    * @description : update user with new cart
                    */
                    let newCartId = ENTITY.OrderE.ObjectId().toString()
                    ENTITY.CartE.assignNewCart(order.cartId, newCartId, order.userId)
                    let asUserChange = {
                        set: Constant.SET_NAME.USER,
                        as: {
                            update: true,
                            argv: JSON.stringify({ userId: order.userId, cartId: newCartId })
                        }
                    }
                    await userService.sync(asUserChange)
                    redirectUrl = redirectUrl + "payment/success?newCartId=" + newCartId
                } else {
                    redirectUrl = redirectUrl + "payment/failure"
                }
                return redirectUrl
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