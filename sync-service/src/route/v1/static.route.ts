import * as Router from 'koa-router'
import * as Constant from '../../constant';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            if (global.healthcheck.as )
            ctx.body = "<html>  <head>  </head> <body> sync-service@kfc2019</body> </html>"
            else
                ctx.status = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.httpCode
        })
}
