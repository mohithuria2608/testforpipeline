import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsPromotionController } from '../../controllers';
import { JOI_CMS_HEADERS } from './common.joi.validator'

export default (router: Router) => {
    router
        .post('/',
            ...getMiddleware([
                // Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                // headers: JOI_CMS_HEADERS,
                body: {
                    data: Joi.any()
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICmsMenuRequest.ICmsMenu = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await cmsPromotionController.postPromotion(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            }
        )
}