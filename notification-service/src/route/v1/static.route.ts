import * as Router from 'koa-router';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            ctx.body = "<html>  <head>  </head> <body> notification-service@KFC</body> </html>"
        })
}
