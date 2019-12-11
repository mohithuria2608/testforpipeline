import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { pickupController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .post('/',
            async (ctx) => {
                try {
                    let res = await pickupController.post();
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.JOI_HEADERS,
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let res = await pickupController.getPickupList(headers);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}