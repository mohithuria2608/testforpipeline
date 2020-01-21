import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'

const app = new Koa()


app.use(middleware());

export const start = (async () => {
  try {
    const port = config.get("server.notification.port")
    const server = app.listen(port)

    await bootstrap(server)

  } catch (error) {
    console.error(error)
  }
})()