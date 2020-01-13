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
                    ctx.set({ 'accessToken': res.accessToken, 'refreshToken': res.refreshToken })
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.LOGIN, res.response)
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
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
                    phnNo: Joi.string().max(9).required(),
                    email: Joi.string().email().lowercase().required(),
                    name: Joi.string().required()
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IGuestRequest.IisGuest = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await guestController.guestCheckout(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}