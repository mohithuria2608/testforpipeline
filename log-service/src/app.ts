global.configSync = {
  general: 0,
  kafka: 0,
  orderStatus: 0
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
    const port = config.get("server.log.port")
    const server = app.listen(port)

    await bootstrap(server)

  } catch (error) {
    console.error(error)
  }
})()