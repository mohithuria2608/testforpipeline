import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsPromotionController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/',
            validate({
                body: {
                    action: Joi.string().required().valid(
                        Constant.DATABASE.TYPE.SYNC_ACTION.CREATE,
                        Constant.DATABASE.TYPE.SYNC_ACTION.UPDATE,
                        Constant.DATABASE.TYPE.SYNC_ACTION.RESET).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    data: Joi.any().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICmsPromotionRequest.ICmsPromotion = ctx.request.body;
                    let res = await cmsPromotionController.postPromotion(headers, payload);
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