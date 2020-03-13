process.env.ALLOW_CONFIG_MUTATIONS = "true";
global.healthcheck = {}
import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog, checkStoreOnline } from './utils'
import middleware from './middlewares'
import route from './route'
import { startTimer } from "winston";



const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.location.port")
    const server = app.listen(port)

    await bootstrap(server)

    let startTime = "2014-08-03T04:30:00.000Z",
      endTime = "2014-08-02T21:30:59.000Z"
    console.log("aaaaaaaaaaaaaaaaaaaaa", checkStoreOnline(startTime, endTime))
  } catch (error) {
    console.error(error)
  }
})()