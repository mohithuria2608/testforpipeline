import * as Router from 'koa-router'
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
                headers: JOI.JOI_HEADERS,
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IGuestRequest.IGuestLogin = ctx.request.body;
                    let res = await guestController.guestLogin(headers, payload);
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