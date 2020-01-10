import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { paymentController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .get('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    cartId: Joi.string().required(),
                    cartUpdatedAt: Joi.number().required(),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    // let payload: ICartRequest.IGetCart = ctx.request.query;
                    // let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    // let res = await cartController.getCart(headers, payload, auth);
                    // let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    // ctx.status = sendResponse.statusCode;
                    // ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}