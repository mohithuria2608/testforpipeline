import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { consolelog, sendSuccess } from '../../utils'
import { deeplinkController } from '../../controllers';
import * as JOI from './common.route.validator';

export default (router: Router) => {
    router
        .get('/deeplink/:path/:id',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                params: {
                    "0": Joi.string(),
                    path: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    id: Joi.number().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    // url: Joi.string().required(),
                    // ios: Joi.string().required()
                },
            }), async (ctx) => {
                try {
                    let payload: DeeplinkRequest.ICreateDeeplink = { ...ctx.request.params, ...ctx.request.header };
                    let deeplink = await deeplinkController.createDeepLink(payload)
                    ctx.type = 'html';
                    ctx.body = deeplink
                }
                catch (error) {
                    consolelog(process.cwd(),'deeplink', error, false)
                    throw error
                }
            })
        .get('/mapper',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    url: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message))
                },
            }), async (ctx) => {
                try {
                    let payload: DeeplinkRequest.IDeeplinkMapper = { ...ctx.request.query, ...ctx.request.header };
                    let res = await deeplinkController.deepLinkMapper(payload)
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}