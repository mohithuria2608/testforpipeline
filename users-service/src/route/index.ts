import * as compose from 'koa-compose'
import * as Router from 'koa-router'
import { Context } from 'koa'

import staticRoutes from './v1/static.route'
import deeplink from './v1/deeplink.route'
import guest from './v1/guest.route'
import miscRoutes from './v1/misc.route'
import userRoutes from './v1/user.route'

const version1 = "/v1"

const children = [
  { routes: staticRoutes, prefix: '' },
  { routes: deeplink, prefix: version1 + '/deeplink' },
  { routes: guest, prefix: version1 + '/guest' },
  { routes: miscRoutes, prefix: version1 + '/user' },
  { routes: userRoutes, prefix: version1 + '/user' },
]

export default function routes() {
  const router = new Router()
  router
    .get('/api', (ctx: Context) => {
      ctx.body = router.stack.map(i => i.path)
    })
    .get('/echo', (ctx: Context) => {
      ctx.body = { method: ctx.method, headers: ctx.headers, query: ctx.query }
    })
    .post('/echo', (ctx: Context) => {
      ctx.body = { method: ctx.method, headers: ctx.headers, params: ctx.request.body }
    })

  /**
   * @description Nested routers
   * */
  children.forEach(child => {
    const nestedRouter = new Router()
    child.routes(nestedRouter)
    router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods())
  })

  return compose([router.routes(), router.allowedMethods()])
}



