import * as Router from 'koa-router'
import * as Constant from '../../constant';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            ctx.body = "<html>  <head>  </head> <body> upload-service@kfc2019</body> </html>"
        })
}
