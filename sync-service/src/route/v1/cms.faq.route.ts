import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsFaqController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/',
            validate({
                // headers: JOI_CMS_HEADERS,
                body: {
                    country: Joi.string().valid(
                        Constant.DATABASE.COUNTRY.UAE
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY.type)),
                    language: Joi.string().required().valid(
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ).default(Constant.DATABASE.LANGUAGE.EN).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.type)),
                    data: Joi.any().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICmsFaqRequest.ICmsFaq = ctx.request.body;
                    let res = await cmsFaqController.postFaq(headers, payload);
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