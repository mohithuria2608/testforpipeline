import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { userController } from '../../controllers';
import * as JOI from './common.route.validator';

export default (router: Router) => {
    router
        .patch('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.JOI_HEADERS,
                body: {
                    socialKey: Joi.string(),
                    mdeium: Joi.string().valid(Constant.DATABASE.TYPE.SOCIAL_PLATFORM.FB, Constant.DATABASE.TYPE.SOCIAL_PLATFORM.GOOGLE),
                    cCode: Joi.string(),
                    phnNo: Joi.string().max(9),
                    email: Joi.string().email().lowercase(),
                    name: Joi.string()
                }
            }),
            async (ctx) => {
                try {
                    let payload: IUserRequest.IAuthSocial = { ...ctx.request.body, ...ctx.request.header };
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await userController.profileUpdate(payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.UPDATED, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}