import * as validate from 'koa-joi-validate'
import * as Joi from 'joi';
import * as Router from 'koa-router'
import { getMiddleware } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess, sendError } from '../../utils'
import { anonymousUserController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/refresh-token',
            ...getMiddleware([
                Constant.MIDDLEWARE.REFRESH_AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: {
                    language: Joi.string().valid([
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ]).required(),
                    appversion: Joi.string().required(),
                    devicemodel: Joi.string().required(),
                    devicetype: Joi.string().valid([
                        Constant.DATABASE.TYPE.DEVICE.ANDROID,
                        Constant.DATABASE.TYPE.DEVICE.IOS
                    ]).required(),
                    osversion: Joi.string().required(),
                },
                body: {
                    deviceId: Joi.string().trim().required()
                }
            }),
            async (ctx) => {
                try {
                    let payload: IUserRequest.IRefreshToken = { ...ctx.request.body, ...ctx.request.header };
                    let res = await anonymousUserController.refreshToken(payload);
                    ctx.set({ 'accessToken': res.accessToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, {})
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw (sendError(error))
                }
            })
}