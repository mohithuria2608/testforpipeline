import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
// import { userGrpcService } from './grpc/client'

const app = new Koa()

app.use(middleware());

export const start = (async () => {
  try {
    const port = config.get("server.auth.port")
    const server = app.listen(port)

    await bootstrap(server)
    // let userData = await userGrpcService.getUserById({ id: "3a419890-169f-11ea-9301-41611e5fdd57" })

  } catch (err) {
    console.error(err)
  }
})()