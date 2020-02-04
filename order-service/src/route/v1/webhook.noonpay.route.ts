import * as config from 'config'
import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { webhookNoonpayController } from '../../controllers';

export default (router: Router) => {
    router
        .get('/order/process-payment',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                query: {
                    paymentInfo: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    result: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    orderReference: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    orderId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IWebhookNoonpayRequest.IOrderProcessPayment = ctx.request.query;
                    let res = await webhookNoonpayController.processPayment(headers, payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)

                    let redirectUrl = config.get("server.order.url") + sendResponse
                    ctx.redirect(redirectUrl)
                    // ctx.status = sendResponse.statusCode;
                    // ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}