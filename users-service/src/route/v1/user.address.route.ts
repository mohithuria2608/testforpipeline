import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { addressController } from '../../controllers';
import { COMMON_HEADERS } from './common.joi.validator';
import * as ENTITY from '../../entity'

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
                    storeId: Joi.number(),
                    lat: Joi.number().min(0).max(90).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    lng: Joi.number().min(-180).max(180).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    bldgName: Joi.string().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    description: Joi.string().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    flatNum: Joi.string().max(12).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    tag: Joi.string().valid(
                        Constant.DATABASE.TYPE.TAG.HOME,
                        Constant.DATABASE.TYPE.TAG.OFFICE,
                        Constant.DATABASE.TYPE.TAG.HOTEL,
                        Constant.DATABASE.TYPE.TAG.OTHER
                    ).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IAddressRequest.IRegisterAddress = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res: any = await addressController.registerAddress(headers, payload, auth);
                    if (process.env.NODE_ENV == "staging" || process.env.NODE_ENV == "testing") {
                        let cart = await ENTITY.LoadE.getCartForLoadTest(auth.id)
                        ENTITY.LoadE.createOneEntityMdb({
                            cartId: auth.id,
                            deviceId: headers.deviceid,
                            accessToken: ctx.header.authorization,
                            addressId: res.id,
                            cartUpdatedAt: cart.updatedAt
                        })
                    }
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
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
                    addressId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_ADDRESS.type)),
                    lat: Joi.number().min(0).max(90).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    lng: Joi.number().min(-180).max(180).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    bldgName: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    description: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    flatNum: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                    tag: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.type)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IAddressRequest.IUpdateAddress = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await addressController.updateAddressById(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
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
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
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
                    addressId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_ADDRESS.type)),
                },
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IAddressRequest.IUpdateAddress = ctx.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await addressController.deleteAddressById(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                } catch (error) {
                    throw error
                }
            })

}