process.env.ALLOW_CONFIG_MUTATIONS = "true";
// process.env.AEROSPIKE_DEBUG_STACKTRACES = "1";
global.healthcheck = {}
import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'


const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.promotion.port")
    const server = app.listen(port)

    await bootstrap(server)

  } catch (error) {
    console.error(error)
  }
})()