import * as config from "config"
require('./grpc/server/server')
import * as Koa from 'koa'
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'


const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.port")
    const server = app.listen(port)

    await bootstrap(server)

    // kafkaProducerE.sendMessage({
    //   messages: JSON.stringify({ userId: "1" }),
    //   topic: 'AUTH',
    //   partition: 0,
    // });

    // initConsumers()


  } catch (err) {
    console.error(err)
  }
})()