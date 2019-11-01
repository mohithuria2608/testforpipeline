import * as validate from 'koa-joi-validate'
import * as Joi from 'joi';
import * as Router from 'koa-router'
import * as Constant from '../../constant'
import { sendSuccess, sendError, consolelog } from '../../utils'
import { guestController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/login',
            validate({
                headers: {
                    language: Joi.string().valid([
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ]).required(),
                    appversion: Joi.string().required(),
                    devicemodel: Joi.string().required(),
                    platform: Joi.string().valid([
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
                    let payload: IGuestRequest.IGuestLogin = { ...ctx.request.body, ...ctx.request.header };
                    let res = await guestController.guestLogin(payload);
                    ctx.body = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                }
                catch (error) {
                    throw (sendError(error))
                }
            })
}