import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsUserController } from '../../controllers';
import { validate } from '../../middlewares'

export default (router: Router) => {
    router
        .post('/blob/migrate',
            validate({
                body: {
                    url: Joi.string(),
                    start: Joi.number(),
                    end: Joi.number(),
                }
            }),
            async (ctx) => {
                try {
                    let res = await cmsUserController.migrateUsersFromBlob(ctx.request.body);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse;
                } catch (error) {
                    throw error;
                }
            }
        )
}