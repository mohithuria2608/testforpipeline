import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/auth',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: {
                    country: Joi.string().valid(
                        Constant.DATABASE.COUNTRY.UAE
                    ).required(),
                    appversion: Joi.string().required(),
                    devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS, Constant.DATABASE.TYPE.DEVICE.WEB).required(),
                    deviceid: Joi.string().required()
                },
                body: {
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }
            }),
            async (ctx) => {
                try {
                    let payload: ICmsRequest.ICmsAuth = { ...ctx.request.body, ...ctx.request.header };
                    let res = await cmsController.auth(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}