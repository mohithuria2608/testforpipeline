import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsController } from '../../controllers';
import * as JOI from './common.joi.validator'

export default (router: Router) => {
    router
        .post('/auth',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.JOI_CMS_HEADERS,
                body: {
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICmsRequest.ICmsAuth = ctx.request.body;
                    let res = await cmsController.auth(headers, payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}