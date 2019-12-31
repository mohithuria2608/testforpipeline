import * as Router from 'koa-router';
import { validate } from '../../middlewares';
import * as Constant from '../../constant';
import * as JOI from './common.joi.validator';
import { sendSuccess } from '../../utils'
import { miscController } from '../../controllers';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            ctx.body = "<html>  <head>  </head> <body> user-service@KFC</body> </html>"
        })
        .get('/faq',
            validate({
                headers: JOI.COMMON_HEADERS,
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let res = await miscController.faq(headers);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}
