import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { addressController } from '../../controllers';
import { JOI_HEADERS } from './common.joi.validator';

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
                    lat: Joi.number().min(0).max(90).required(),
                    lng: Joi.number().min(-180).max(180).required(),
                    bldgName: Joi.string().required(),
                    description: Joi.string().required(),
                    flatNum: Joi.number().required(),
                    tag: Joi.string().valid(
                        Constant.DATABASE.TYPE.TAG.HOME,
                        Constant.DATABASE.TYPE.TAG.OFFICE,
                        Constant.DATABASE.TYPE.TAG.HOTEl,
                        Constant.DATABASE.TYPE.TAG.OTHER).required(),




                    // areaId: Joi.number().required(),
                    // cityId: Joi.number().required(),
                    // countryId: Joi.number().required(),
                    // userId: Joi.number().required(),
                    // districtId: Joi.number().required(),// default -1
                    // language: Joi.string(),
                    // provinceCode: Joi.number().required(), //provinceId
                    // streetId: Joi.number(),


                    // bldgNameUn: Joi.string(),
                    // bldgNum: Joi.string(),
                    // classId: Joi.number(),  //default -1
                    // phoneAreaCode: Joi.string(), //coutryCode
                    // phoneLookup: Joi.string(), //phoneNumber
                    // phoneNumber: Joi.string().required(), //phoneNumber
                    // phoneType: Joi.number(), //
                    // useMap: Joi.number(),  //1
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IAddressRequest.IRegisterAddress = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await addressController.registerAddress(headers, payload, auth);
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
                    bldgName: Joi.string(),
                    description: Joi.string(),
                    flatNum: Joi.string(),
                    tag: Joi.string(),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IAddressRequest.IUpdateAddress = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await addressController.updateAddressById(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                } catch (error) {
                    throw error
                }
            }
        )

}