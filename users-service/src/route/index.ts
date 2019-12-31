import * as compose from 'koa-compose'
import * as Router from 'koa-router'
import { Context } from 'koa'

import staticRoutes from './v1/static.route'
import miscRoutes from './v1/misc.route'
import aerospikeRoutes from './v1/aerospike.route'
import guest from './v1/guest.route'
import miscUserRoutes from './v1/misc.user.route'
import userOnboardingRoutes from './v1/user.onboarding.route'
import userProfileRoutes from './v1/user.profile.route'
import userAddress from './v1/user.address.route'

const version1 = "/v1"

const children = [
  { routes: staticRoutes, prefix: version1 + '' },
  { routes: miscRoutes, prefix: version1 + '/config' },
  { routes: aerospikeRoutes, prefix: version1 + '/aerospike' },
  { routes: guest, prefix: version1 + '/guest' },
  { routes: miscUserRoutes, prefix: version1 + '/user' },
  { routes: userOnboardingRoutes, prefix: version1 + '/login' },
  { routes: userProfileRoutes, prefix: version1 + '/profile' },
  { routes: userAddress, prefix: version1 + '/address' }
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



