import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cartController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/validate',
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
                body: {
                    curMenuId: Joi.string().required(),
                    lat: Joi.number().min(0).max(90),
                    lng: Joi.number().min(-180).max(180),
                    items: Joi.array().items(
                        Joi.object().keys({
                            itemId: Joi.string().required(),
                            name: Joi.string().required(),
                        })).required()
                }
            }),
            async (ctx) => {
                try {
                    let payload: ICartRequest.IValidateCart = { ...ctx.request.body, ...ctx.request.header };
                    let res = await cartController.validateCart(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}