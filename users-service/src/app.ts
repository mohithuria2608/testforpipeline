if (process.env.NODE_ENV == 'staging')
  require('newrelic');
process.env.ALLOW_CONFIG_MUTATIONS = "true";
// process.env.AEROSPIKE_DEBUG_STACKTRACES = "1";
global.healthcheck = {}
global.configSync = {
  general: 0,
  kafka: 0,
  orderStatus: 0,
  payment: 0,
  shipment: 0,
  countrySpecific: 0,
}
import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap } from './utils'
import middleware from './middlewares'
import route from './route'

const app = new Koa()

app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.user.port")
    const server = app.listen(port)
    // AGGREGATE americana.check_social_key("KFC","UAE","FB",465869130981340) ON user

    await bootstrap(server)

  } catch (error) {
    console.error(error)
  }
})()