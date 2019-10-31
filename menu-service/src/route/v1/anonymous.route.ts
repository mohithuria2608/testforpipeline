import * as validate from 'koa-joi-validate'
import * as Joi from 'joi';
import * as Router from 'koa-router'
import * as Constant from '../../constant'
import { sendSuccess, sendError, consolelog } from '../../utils'
import { AnonymousController } from '../../controllers';

export default (router: Router) => {
    router
        .post('/register',
            validate({
                body: {
                    countryCode: Joi.string().min(1).max(6).trim().required(),
                    phoneNo: Joi.string().min(8).max(10).trim().required(),
                    password: Joi.string().min(6).max(16).trim().required(),
                }
            }),
            async (ctx) => {
                try {
                    let payload = ctx.request.body;
                    payload['language'] = ctx.request.header['language'] || Constant.DATABASE.LANGUAGE.EN;
                    payload['appVersion'] = ctx.request.header['appVersion'];
                    payload['deviceModel'] = ctx.request.header['deviceModel'];
                    let registerResponse = await AnonymousController.register(payload);
                    ctx.body = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, registerResponse)
                }
                catch (error) {
                    throw (sendError(error))
                }
            })
}