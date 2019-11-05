import * as validate from 'koa-joi-validate'
import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess, sendError } from '../../utils'
import { menuController } from '../../controllers';

export default (router: Router) => {
    router
        .get('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.GUEST_AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: {
                    language: Joi.string().valid(
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ).required(),
                    appversion: Joi.string().required(),
                    devicemodel: Joi.string().required(),
                    devicetype: Joi.string().valid(
                        Constant.DATABASE.TYPE.DEVICE.ANDROID,
                        Constant.DATABASE.TYPE.DEVICE.IOS
                    ).required(),
                    osversion: Joi.string().required(),
                }
            }),
            async (ctx) => {
                try {
                    let payload: IGuestMenuRequest.IGuestMenuFetch = { ...ctx.request.header };
                    let res = await menuController.fetchMenu(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw (sendError(error))
                }
            })
}