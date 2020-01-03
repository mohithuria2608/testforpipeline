import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { addressController } from '../../controllers';
import { COMMON_HEADERS } from './common.joi.validator';

export default (router: Router) => {
    router
        .post('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: COMMON_HEADERS,
                body: {
                    lat: Joi.number().min(0).max(90).required(),
                    lng: Joi.number().min(-180).max(180).required(),
                    bldgName: Joi.string().required(),
                    description: Joi.string().required(),
                    flatNum: Joi.string().required(),
                    tag: Joi.string().valid(
                        Constant.DATABASE.TYPE.TAG.HOME,
                        Constant.DATABASE.TYPE.TAG.OFFICE,
                        Constant.DATABASE.TYPE.TAG.HOTEL,
                        Constant.DATABASE.TYPE.TAG.OTHER).required(),
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
                headers: COMMON_HEADERS,
                body: {
                    addressId: Joi.string().required(),
                    lat: Joi.number().min(0).max(90).required(),
                    lng: Joi.number().min(-180).max(180).required(),
                    bldgName: Joi.string().required(),
                    description: Joi.string().required(),
                    flatNum: Joi.string().required(),
                    tag: Joi.string().required(),
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
            })
        .get('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: COMMON_HEADERS
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IAddressRequest.IFetchAddress = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await addressController.fetchAddress(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .delete('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: COMMON_HEADERS,
                query: {
                    addressId: Joi.string().required(),
                },
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IAddressRequest.IUpdateAddress = ctx.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await addressController.deleteAddressById(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                } catch (error) {
                    throw error
                }
            })

}