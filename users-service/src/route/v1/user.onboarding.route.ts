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
                headers: JOI.JOI_HEADERS,
                body: {
                    cCode: Joi.string().required(),
                    phnNo: Joi.string().max(9).required(),
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
                headers: JOI.JOI_HEADERS,
                body: {
                    cCode: Joi.string().required(),
                    phnNo: Joi.string().max(9).required(),
                    otp: Joi.number().required().error(new Error('Enter a valid OTP of 4 digits.')),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.IAuthVerifyOtp = ctx.request.body;
                    let res = await userController.loginVerifyOtp(headers, payload);
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
                headers: JOI.JOI_HEADERS,
                body: {
                    socialKey: Joi.string().required(),
                    medium: Joi.string().valid(Constant.DATABASE.TYPE.SOCIAL_PLATFORM.FB, Constant.DATABASE.TYPE.SOCIAL_PLATFORM.GOOGLE).required(),
                    name: Joi.string(),
                    email: Joi.string().email().lowercase().allow(null)
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.IAuthSocial = ctx.request.body;
                    let res = await userController.socialAuthValidate(headers, payload);
                    ctx.set({ 'accessToken': res.accessToken, 'refreshToken': res.refreshToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res.response)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}