import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { userController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .post('/send-otp',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY_CODE.message)),
                    phnNo: Joi.string().max(9).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PHONE_NO.message)),//@todo : Country specific regex
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.IAuthSendOtp = ctx.request.body;
                    let res = await userController.loginSendOtp(headers, payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.OTP_SENT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/verify-otp',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY_CODE.message)),
                    phnNo: Joi.string().max(9).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PHONE_NO.message)),
                    otp: Joi.number().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_OTP.message)),
                    isGuest: Joi.boolean().valid(0, 1).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.IAuthVerifyOtp = ctx.request.body;
                    let res = await userController.verifyOtp(headers, payload);
                    ctx.set({ 'accessToken': res.accessToken, 'refreshToken': res.refreshToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.OTP_VERIFIED, res.response)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/social-validate',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    socialKey: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_SOCIAL_INFO.message)),
                    medium: Joi.string().valid(
                        Constant.DATABASE.TYPE.SOCIAL_PLATFORM.FB,
                        Constant.DATABASE.TYPE.SOCIAL_PLATFORM.GOOGLE,
                        Constant.DATABASE.TYPE.SOCIAL_PLATFORM.APPLE
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_SOCIAL_INFO.message)),
                    name: Joi.string().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_NAME.message)),
                    email: Joi.string().email().lowercase().allow(null).allow("").error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_EMAIL.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.IAuthSocial = ctx.request.body;
                    let res = await userController.socialAuthValidate(headers, payload);
                    ctx.set({ 'accessToken': res.accessToken, 'refreshToken': res.refreshToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.SOCIAL_LOGIN, res.response)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}