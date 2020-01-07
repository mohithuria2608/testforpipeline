import * as compose from 'koa-compose'
import * as Router from 'koa-router'
import { Context } from 'koa'

import staticRoutes from './v1/static.route'
import cmsRoutes from './v1/cms.route'
import cmsMenuRoutes from './v1/cms.menu.route'
import cmsUserRoutes from './v1/cms.user.route'
import sdmMenuRoutes from './v1/sdm.menu.route';

const version1 = "/v1"

const children = [
  { routes: staticRoutes, prefix: '' },
  { routes: cmsRoutes, prefix: version1 + '/cms' },
  { routes: cmsMenuRoutes, prefix: version1 + '/menu' },
  { routes: sdmMenuRoutes, prefix: version1 + '/sdm/menu' },
  { routes: cmsUserRoutes, prefix: version1 + '/user' },
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



