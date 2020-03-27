process.env.ALLOW_CONFIG_MUTATIONS = "true";
// process.env.AEROSPIKE_DEBUG_STACKTRACES = "1";
global.healthcheck = {}
global.configSync = {
  general: 0,
  kafka: 0,
  orderStatus: 0,
  payment: 0,
  shipment: 0
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
    const port = config.get("server.payment.port")
    const server = app.listen(port)

    // let key = `Key_Test ${(new Buffer(`americana_test_cognizant.kfc_uae_test:65c5cc823a3f4c079de1c2928d927ebd`)).toString('base64')}`;
    // console.log("payment environment key", key)

    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()