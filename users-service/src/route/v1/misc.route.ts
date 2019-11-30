import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { miscUserController } from '../../controllers';
import * as JOI from './common.route.validator';

export default (router: Router) => {
    router
        .post('/refresh-token',
            ...getMiddleware([
                Constant.MIDDLEWARE.REFRESH_AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.JOI_HEADERS,
            }),
            async (ctx) => {
                try {
                    let payload: IUserRequest.IRefreshToken = { ...ctx.request.body, ...ctx.request.header };
                    let authObj = ctx.state.user
                    let res = await miscUserController.refreshToken(payload, authObj);
                    ctx.set({ 'accessToken': res.accessToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, {})
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}