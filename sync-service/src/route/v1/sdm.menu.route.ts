import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { sdmMenuController } from '../../controllers';
import { JOI_CMS_HEADERS } from './common.joi.validator'

export default (router: Router) => {
    router
        .post('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                body: {
                    data: Joi.object().keys({
                        menuId: Joi.number().required()
                    }).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ISdmMenuRequest.ISdmMenu = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await sdmMenuController.fetchMenuFromSDM(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}