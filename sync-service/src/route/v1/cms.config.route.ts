import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsConfigController } from '../../controllers';
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
                    type: Joi.string().required().valid("general", "payment"),
                    data: Joi.any().required()
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICmsConfigRequest.ICmsConfig = ctx.request.body;
                    let res = await cmsConfigController.postConfig(headers, payload);
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