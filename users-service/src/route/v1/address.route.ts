import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { addressController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/address',
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
                    areaId: Joi.number().required(),
                    bldgName: Joi.string(),
                    bldgNameUn: Joi.string(),
                    bldgNum: Joi.string(),
                    cityId: Joi.number().required(),
                    classId: Joi.number(),
                    countryId: Joi.number().required(),
                    userId: Joi.number().required(),
                    description: Joi.string(),
                    districtId: Joi.number().required(),
                    flatNum: Joi.number(),
                    floor: Joi.string(),
                    language: Joi.string(),
                    phoneAreaCode: Joi.string(),
                    phoneLookup: Joi.string(),
                    phoneNumber: Joi.string().required(),
                    phoneType: Joi.number(),
                    postalCode: Joi.string().required(),
                    provinceCode: Joi.number().required(),
                    sketch: Joi.string(),
                    streetId: Joi.number(),
                    useMap: Joi.number(),
                    //@todo home work other
                }
            }),
            async (ctx) => {
                try {
                    let payload: IAddressRequest.IRegisterAddress = { ...ctx.request.body, ...ctx.request.header };
                    let res = await addressController.registerAddressById(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .patch('/address',
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
                    areaId: Joi.number().required(),
                    bldgName: Joi.string(),
                    bldgNameUn: Joi.string(),
                    bldgNum: Joi.string(),
                    cityId: Joi.number().required(),
                    classId: Joi.number(),
                    countryId: Joi.number().required(),
                    userId: Joi.number().required(),
                    description: Joi.string(),
                    districtId: Joi.number().required(),
                    flatNum: Joi.number(),
                    id: Joi.number().required(),
                    language: Joi.string(),
                    phoneAreaCode: Joi.string(),
                    phoneLookup: Joi.string(),
                    phoneNumber: Joi.string().required(),
                    phoneType: Joi.number(),
                    provinceCode: Joi.number().required(),
                    sketch: Joi.string(),
                    streetId: Joi.number(),
                    useMap: Joi.number(),
                    createdBy: Joi.string(),
                    updatedBy: Joi.string()
                }
            }),
            async (ctx) => {
                try {
                    let payload: IAddressRequest.IRegisterAddress = { ...ctx.required.body, ...ctx.required.header };
                    let res = await addressController.updateAddressById(payload);
                } catch (error) {
                    throw error
                }
            }
        )

}