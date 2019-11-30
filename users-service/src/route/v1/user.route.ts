import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { userController } from '../../controllers';
import * as JOI from './common.route.validator';

export default (router: Router) => {
    router
        .post('/login/send-otp',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.JOI_HEADERS,
                body: {
                    countryCode: Joi.string().required(),
                    phoneNo: Joi.string().max(9).required(),
                }
            }),
            async (ctx) => {
                try {
                    let payload: IUserRequest.IAuthSendOtp = { ...ctx.request.body, ...ctx.request.header };
                    let res = await userController.loginSendOtp(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/login/verify-otp',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.JOI_HEADERS,
                body: {
                    countryCode: Joi.string().required(),
                    phoneNo: Joi.string().max(9).required(),
                    otp: Joi.number().max(4).required().error(new Error('Enter a valid OTP of 4 digits.')),
                }
            }),
            async (ctx) => {
                try {
                    let payload: IUserRequest.IAuthVerifyOtp = { ...ctx.request.body, ...ctx.request.header };
                    let res = await userController.loginVerifyOtp(payload);
                    ctx.set({ 'accessToken': res.accessToken, 'refreshToken': res.refreshToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.LOGIN, res.response)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}