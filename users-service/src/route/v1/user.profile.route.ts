import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { userController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .patch('/create',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY_CODE.message)),
                    phnNo: Joi.string().max(9).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PHONE_NO.message)),
                    email: Joi.string().email().lowercase().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_EMAIL.message)),
                    name: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_NAME.message)),

                    /**
                     * @description allow these keys
                     */
                    isGuest: Joi.any().description("allow for android").error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.ICreateProfile = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await userController.createProfile(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .patch('/edit',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    email: Joi.string().email().lowercase().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_EMAIL.message)),
                    name: Joi.string().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_NAME.message)),
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY_CODE.message)),
                    phnNo: Joi.string().max(9).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PHONE_NO.message)),

                    /**
                     * @description allow these keys
                     */
                    isGuest: Joi.any().description("allow for android")
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.IEditProfile = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await userController.editProfile(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}