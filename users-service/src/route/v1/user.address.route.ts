import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { addressController } from '../../controllers';
import { JOI_HEADERS } from './common.route.validator';

export default (router: Router) => {
    router
        .post('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI_HEADERS,
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
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await addressController.registerAddressById(payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .patch('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI_HEADERS,
                body: {
                    addressId: Joi.string().required(),
                    areaId: Joi.number(),
                    bldgName: Joi.string(),
                    bldgNameUn: Joi.string(),
                    bldgNum: Joi.string(),
                    cityId: Joi.number(),
                    classId: Joi.number(),
                    countryId: Joi.number(),
                    userId: Joi.number(),
                    description: Joi.string(),
                    districtId: Joi.number(),
                    flatNum: Joi.number(),
                    id: Joi.number().required(),
                    language: Joi.string(),
                    phoneAreaCode: Joi.string(),
                    phoneLookup: Joi.string(),
                    phoneNumber: Joi.string(),
                    phoneType: Joi.number(),
                    provinceCode: Joi.number(),
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