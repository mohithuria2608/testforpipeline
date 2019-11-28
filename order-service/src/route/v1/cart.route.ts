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
                    curMenuId: Joi.number(),
                    menuUpdatedAt: Joi.number(),
                    lat: Joi.number().min(0).max(90),
                    lng: Joi.number().min(-180).max(180),
                    items: Joi.array().items(
                        Joi.object().keys({
                            quantity: Joi.number(),
                            catId: Joi.number(),
                            sequence: Joi.number(),
                            steps: Joi.array().items(
                                Joi.object().keys({
                                    sequence: Joi.number(),
                                    title_en: Joi.string().allow(""),
                                    title_ar: Joi.string().allow(""),
                                    subtitle_ar: Joi.string().allow(""),
                                    subtitle_en: Joi.string().allow(""),
                                    displayType: Joi.string().valid("radio", "checkbox", "stepper"),
                                    maximum: Joi.number(),
                                    minimum: Joi.number(),
                                    ingredient: Joi.number().valid(0, 1),
                                    itemStyle: Joi.number().valid(0, 1, 2),
                                    options: Joi.array().items(
                                        Joi.object().keys({
                                            sequence: Joi.number(),
                                            name_ar: Joi.string().allow(""),
                                            name_en: Joi.string().allow(""),
                                            price: Joi.number(),
                                            promoId: Joi.number(),
                                            id: Joi.number(),
                                            selected: Joi.number(),
                                            default: Joi.number(),
                                            displayType: Joi.string().valid("radio", "checkbox", "stepper"),
                                            subOptions: Joi.array().items(
                                                Joi.object().keys({
                                                    price: Joi.number(),
                                                    selected: Joi.number(),
                                                    name_en: Joi.string()
                                                })),

                                            //@ignore
                                            hasChild: Joi.boolean(),
                                            isSelected: Joi.boolean(),
                                            defaultValue: Joi.number(),
                                            parentId: Joi.number()
                                        })),
                                })),
                            price: Joi.number(),
                            promoId: Joi.number(),
                            description_en: Joi.string().allow(""),
                            description_ar: Joi.string().allow(""),
                            itemType: Joi.string().valid("bundle", "standalone"),
                            title_en: Joi.string().allow(""),
                            title_ar: Joi.string().allow(""),
                            id: Joi.number(),
                            image: Joi.object().keys({
                                dimension: Joi.string().allow(""),
                                uploadBy: Joi.string(),
                                url: Joi.string(),
                                type: Joi.string().valid("image/jpg")
                            }),

                            //@ignore
                            groupData: Joi.any(),
                            virtualGroupId: Joi.any(),
                            isAvailable: Joi.boolean(),
                            isPriceChange: Joi.boolean(),
                        }))
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
                    ),
                    country: Joi.string().valid(
                        Constant.DATABASE.COUNTRY.UAE
                    ),
                    appversion: Joi.string(),
                    devicemodel: Joi.string(),
                    devicetype: Joi.string().valid(
                        Constant.DATABASE.TYPE.DEVICE.ANDROID,
                        Constant.DATABASE.TYPE.DEVICE.IOS
                    ),
                    osversion: Joi.string(),
                    deviceid: Joi.string().trim()
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