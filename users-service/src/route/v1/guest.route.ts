import * as Router from 'koa-router'
import * as Joi from '@hapi/joi';
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { guestController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .post('/login',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IGuestRequest.IGuestLogin = ctx.request.body;
                    let res = await guestController.guestLogin(headers, payload);
                    ctx.set({ 'accessToken': res.accessToken, 'refreshToken': res.refreshToken, cartId: res.response['cartId'] })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.LOGIN, headers.language, res.response)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/checkout',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG,
                Constant.MIDDLEWARE.AUTH
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY_CODE.type)),
                    phnNo: Joi.string().min(9).max(9).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PHONE_NO.type)),
                    email: Joi.string().email().lowercase().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_EMAIL.type)),
                    name: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_NAME.type)),
                    isGuest: Joi.number().valid(0, 1).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
                    addressId: Joi.string().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_ADDRESS.type)).required(),
                    addressType: Joi.string().valid(
                        Constant.DATABASE.TYPE.ADDRESS.PICKUP,
                        Constant.DATABASE.TYPE.ADDRESS.DELIVERY).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)).required(),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IGuestRequest.IGuestCheckout = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await guestController.guestCheckout(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}