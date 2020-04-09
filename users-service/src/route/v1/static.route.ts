import * as Router from 'koa-router';
import * as Constant from '../../constant';
import { sendSuccess } from '../../utils'
import { createReadStream } from 'fs';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            console.log("healthcheck------------>", global.healthcheck)
            if (global.healthcheck.as &&
                global.healthcheck.sdm) {
                ctx.body = "<html>  <head>  </head> <body> user-service@KFC</body> </html>"
            }
            else
                ctx.status = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.httpCode
        })
        .get('/faq',
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let sendResponse
                    if (headers.language && headers.language == Constant.DATABASE.LANGUAGE.AR)
                        sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, Constant.DATABASE.FAQ[Constant.DATABASE.LANGUAGE.AR])
                    else
                        sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, Constant.DATABASE.FAQ[Constant.DATABASE.LANGUAGE.EN])
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse

                    // let headers: ICommonRequest.IHeaders = ctx.request.header;
                    // let faq = await syncService.fetchFaq({ language: headers.language, country: headers.country })
                    // ctx.status = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, faq).statusCode
                    // ctx.body = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, faq)
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
