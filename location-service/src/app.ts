process.env.ALLOW_CONFIG_MUTATIONS = "true";
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
import { bootstrap, checkOnlineStore } from './utils'
import middleware from './middlewares'
import route from './route'



const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.location.port")
    const server = app.listen(port)

    let startTime =  "2014-08-03T10:00:00Z"
    let endTime = "2014-08-03T00:30:59Z"
    let nextday = 1
    console.log("checkOnlineStore(startTime, endTime, nextday)", checkOnlineStore(startTime, endTime, nextday))
    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()