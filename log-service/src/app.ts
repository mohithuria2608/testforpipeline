import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap } from './utils'
import middleware from './middlewares'
import route from './route'
import { event } from './lib'

const app = new Koa()


app.use(middleware());
app.use(route());


export const start = (async () => {
  try {
    const port = config.get("server.user.port")
    const server = app.listen(port)

    event.emit('logger', { name: "ankit" });
    await bootstrap(server)

  } catch (err) {
    console.error(err)
  }
})()