import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsConfigController } from '../../controllers';
import { JOI_CMS_HEADERS } from './common.joi.validator'

export default (router: Router) => {
    router
        .post('/',
            validate({
                // headers: JOI_CMS_HEADERS,
                body: {
                    type: Joi.string().required().valid(
                        Constant.DATABASE.TYPE.CONFIG.GENERAL,
                        Constant.DATABASE.TYPE.CONFIG.PAYMENT,
                        Constant.DATABASE.TYPE.CONFIG.SHIPMENT).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    action: Joi.string().required().valid(Constant.DATABASE.TYPE.SYNC_ACTION.RESET).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    data: Joi.any().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICmsConfigRequest.ICmsConfig = ctx.request.body;
                    let res = await cmsConfigController.postConfig(headers, payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            }
        )
}