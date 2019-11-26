import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { userController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/login/send-otp',
            ...getMiddleware([
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
                    countryCode: Joi.string().required(),
                    phoneNo: Joi.string().max(9).required(),
                }
            }),
            async (ctx) => {
                try {
                    let payload: IUserRequest.IAuthSendOtp = { ...ctx.request.body, ...ctx.request.header };
                    let res = await userController.loginSendOtp(payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
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
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}