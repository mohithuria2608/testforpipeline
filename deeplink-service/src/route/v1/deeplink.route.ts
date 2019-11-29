import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { deeplinkController } from '../../controllers';

export default (router: Router) => {
    router
        .get('/deeplink',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                query: {
                    url: Joi.string().required(),
                    ios: Joi.string().required()
                },
            }), async (ctx) => {
                try {
                    let payload: DeeplinkRequest.CreateDeeplink = { ...ctx.request.query, ...ctx.request.header };
                    let deeplink = await deeplinkController.createDeepLink(payload)
                    ctx.type = 'html';
                    ctx.body = deeplink
                }
                catch (error) {
                    consolelog('deeplink', error, false)
                    throw error
                }
            })
        .get('/mapper',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                query: {
                    url: Joi.string().required(),
                    ios: Joi.string().required()
                },
            }), async (ctx) => {
                try {
                    let payload: DeeplinkRequest.CreateDeeplink = { ...ctx.request.query, ...ctx.request.header };
                    let deeplink = await deeplinkController.createDeepLink(payload)
                    ctx.type = 'html';
                    ctx.body = deeplink
                }
                catch (error) {
                    consolelog('deeplink', error, false)
                    throw error
                }
            })
}