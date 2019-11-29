import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { deeplinkController } from '../../controllers';

export default (router: Router) => {
    router
        .get('/deeplink/:path/:id',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                params: {
                    "0": Joi.string(),
                    path: Joi.string().required(),
                    id: Joi.number().required(),
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
                headers: {
                    language: Joi.string().valid(
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ).required(),
                    country: Joi.string().valid(
                        Constant.DATABASE.COUNTRY.UAE
                    ).required(),
                    appversion: Joi.string().required(),
                    devicemodel: Joi.string().required(),
                    devicetype: Joi.string().valid(
                        Constant.DATABASE.TYPE.DEVICE.ANDROID,
                        Constant.DATABASE.TYPE.DEVICE.IOS
                    ).required(),
                    osversion: Joi.string().required(),
                    deviceid: Joi.string().trim().required()
                },
                query: {
                    type: Joi.string().valid(
                        Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.HOME,
                        Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.CATEGORY,
                        Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.ITEM_DETAIL
                    ).required(),
                },
            }), async (ctx) => {
                try {
                    let payload: DeeplinkRequest.IDeeplinkMapper = { ...ctx.request.query, ...ctx.request.header };
                    let deeplink = await deeplinkController.deepLinkMapper(payload)
                    ctx.type = 'html';
                    ctx.body = deeplink
                }
                catch (error) {
                    consolelog('deeplink', error, false)
                    throw error
                }
            })
}