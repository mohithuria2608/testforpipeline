import * as compose from 'koa-compose'
import * as Router from 'koa-router'
import { Context } from 'koa'

import staticRoutes from './v1/static.route'
import menu from './v1/menu.route'

const version1 = "/v1"

const children = [
  { routes: staticRoutes, prefix: '' },
  { routes: menu, prefix: version1 + '/menu' },

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



