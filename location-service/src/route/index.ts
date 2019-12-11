import * as compose from 'koa-compose'
import * as Router from 'koa-router'
import { Context } from 'koa'

import staticRoutes from './v1/static.route'
import countryRoutes from './v1/country.route'
import cityRoutes from './v1/city.route'
import areaRoutes from './v1/area.route'
import storeRoutes from './v1/store.route'
import locationRoutes from './v1/location.route'

const version1 = "/v1"

const children = [
  { routes: staticRoutes, prefix: '' },
  { routes: countryRoutes, prefix: version1 + '/country' },
  { routes: cityRoutes, prefix: version1 + '/city' },
  { routes: areaRoutes, prefix: version1 + '/area' },
  { routes: storeRoutes, prefix: version1 + '/store' },
  { routes: locationRoutes, prefix: version1 + '/location' },
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



