import * as config from "config"
import * as Koa from 'koa'
require('./grpc')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'

const app = new Koa()

app.use(middleware());

export const start = (async () => {
  try {
    const port = config.get("server.port")
    const server = app.listen(port)

    await bootstrap(server)

  } catch (err) {
    console.error(err)
  }
})()