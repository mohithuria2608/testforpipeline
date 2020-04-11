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
                Constant.MIDDLEWARE.AUTH
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY_CODE.type)),
                    phnNo: Joi.string().min(9).max(9).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PHONE_NO.type)),
                    email: Joi.string().email().lowercase().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_EMAIL.type)),
                    name: Joi.string().trim().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_NAME.type)),

                    /**
                     * @description allow these keys
                     */
                    isGuest: Joi.any().description("allow for android").error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.ICreateProfile = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res: any = await userController.createProfile(headers, payload, auth);
                    if (res.statusCode && res.httpCode) {
                        ctx.status = res.httpCode;
                        ctx.body = sendSuccess(res, headers.language, {})
                    } else {
                        let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                        ctx.status = sendResponse.statusCode;
                        ctx.body = sendResponse
                    }
                }
                catch (error) {
                    throw error
                }
            })
        .patch('/edit',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    name: Joi.string().trim().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_NAME.type)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IUserRequest.IEditProfile = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await userController.editProfile(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}