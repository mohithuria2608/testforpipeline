import * as Router from 'koa-router'
import * as Constant from '../../constant';
import { kafkaService } from '../../grpc/client';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            console.log("global.healthcheck.as", global.healthcheck.as)
            console.log("global.healthcheck.sdm", global.healthcheck.sdm)
            if (global.healthcheck.as && global.healthcheck.sdm) {
                let healthPromise = [
                    kafkaService.health({ get: true })
                ]
                let healths = await Promise.all(healthPromise)
                console.log("healths", healths)
                for (const service of healths) {
                    if (!service) {
                        ctx.status = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.httpCode
                        return
                    }
                }
                console.log()
                ctx.body = "<html>  <head>  </head> <body> order-service@kfc2019</body> </html>"
            }
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
