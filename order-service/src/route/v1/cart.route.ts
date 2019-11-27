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
                    curMenuId: Joi.number().required(),
                    menuUpdatedAt: Joi.number().required(),
                    lat: Joi.number().min(0).max(90),
                    lng: Joi.number().min(-180).max(180),
                    items: Joi.array().items(
                        Joi.object().keys({
                            quantity: Joi.number().required(),
                            categoryId: Joi.number().required(),
                            sequence: Joi.number().required(),
                            steps: Joi.array().items(
                                Joi.object().keys({
                                    sequence: Joi.number().required(),
                                    title_en: Joi.string().required().allow(""),
                                    title_ar: Joi.string().required().allow(""),
                                    subtitle_ar: Joi.string().required().allow(""),
                                    subtitle_en: Joi.string().required().allow(""),
                                    displayType: Joi.string().valid("radio", "checkbox", "stepper"),
                                    options: Joi.array().items(
                                        Joi.object().keys({
                                            sequence: Joi.number().required(),
                                            name_ar: Joi.string().required().allow(""),
                                            name_en: Joi.string().required().allow(""),
                                            price: Joi.number().required(),
                                            promoId: Joi.number(),
                                            id: Joi.number().required(),
                                            selected: Joi.number().required()
                                        })),
                                })),
                            price: Joi.number().required(),
                            promoId: Joi.number(),
                            description_en: Joi.string().required().allow(""),
                            description_ar: Joi.string().required().allow(""),
                            itemType: Joi.string().valid("bundle", "standalone").required(),
                            title_en: Joi.string().required().allow(""),
                            title_ar: Joi.string().required().allow(""),
                            id: Joi.number().required(),
                            image: Joi.object().keys({
                                dimension: Joi.string().required(),
                                url: Joi.string().required(),
                                type: Joi.string().valid("image/jpg").required()
                            })
                        })).required()
                }
            }),
            async (ctx) => {
                try {
                    let payload: ICartRequest.IValidateCart = { ...ctx.request.body, ...ctx.request.header };
                    let res = await cartController.validateCart(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/addon',
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
                }
            }),
            async (ctx) => {
                try {
                    let payload: ICartRequest.ICartSuggestion = { ...ctx.request.body, ...ctx.request.header };
                    let res = await cartController.cartSuggestion(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}