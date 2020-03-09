import * as Router from 'koa-router'
import * as Constant from '../../constant';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            if (global.healthcheck.as &&
                global.healthcheck.sdm)
            ctx.body = "<html>  <head>  </head> <body> order-service@kfc2019</body> </html>"
            else
                ctx.status = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.httpCode
        })
        .get('/payment/success', async (ctx: Router.IRouterContext) => {
            ctx.body = {}
        })
        .get('/payment/failure', async (ctx: Router.IRouterContext) => {
            ctx.body = {}
        })
}
