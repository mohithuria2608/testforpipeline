import * as Router from 'koa-router';
import { getMiddleware } from '../../middlewares'
import * as Constant from '../../constant';
import { sendSuccess } from '../../utils'
import { createReadStream } from 'fs';
import { syncService } from '../../grpc/client'

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            if (global.healthcheck.as &&
                global.healthcheck.sdm) {
                ctx.body = "<html>  <head>  </head> <body> user-service@KFC</body> </html>"
            }
            else
                ctx.status = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.httpCode
        })
        .get('/faq',
            ...getMiddleware([
                Constant.MIDDLEWARE.APP_VERSION,
            ]),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let faq = await syncService.fetchFaq({ language: headers.language, country: headers.country })
                    if (faq && faq.category) {
                        ctx.status = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, [faq]).statusCode
                        ctx.body = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, [faq])
                    } else {
                        ctx.status = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, []).statusCode
                        ctx.body = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, [])
                    }
                }
                catch (error) {
                    throw error
                }
            })
        .get('/privacy-policy',
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    ctx.type = 'html';
                    if (headers.language && headers.language == Constant.DATABASE.LANGUAGE.AR)
                        ctx.body = createReadStream(process.cwd() + '/views/kfc-privacy_ar.html');
                    else
                        ctx.body = createReadStream(process.cwd() + '/views/kfc-privacy_en.html');
                }
                catch (error) {
                    throw error
                }
            })
        .get('/terms-condition',
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    ctx.type = 'html';
                    if (headers.language && headers.language == Constant.DATABASE.LANGUAGE.AR)
                        ctx.body = createReadStream(process.cwd() + '/views/kfc-terms_ar.html');
                    else
                        ctx.body = createReadStream(process.cwd() + '/views/kfc-terms_en.html');
                }
                catch (error) {
                    throw error
                }
            })
}
