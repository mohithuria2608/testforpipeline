import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { guestController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/login',
            ...getMiddleware([
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
                // body: {
                //     deviceid: Joi.string().required()
                // }
            }),
            async (ctx) => {
                try {
                    let payload: IGuestRequest.IGuestLogin = { ...ctx.request.body, ...ctx.request.header };
                    let res = await guestController.guestLogin(payload);
                    ctx.set({ 'accessToken': res.accessToken, 'refreshToken': res.refreshToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.LOGIN, {})
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}