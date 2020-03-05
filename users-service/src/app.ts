import * as config from "config"
import * as Koa from 'koa'
process.env.ALLOW_CONFIG_MUTATIONS = "true";
// process.env.AEROSPIKE_DEBUG_STACKTRACES = "1";
import { bootstrap, consolelog } from './utils'
require('./grpc/server')
import middleware from './middlewares'
import route from './route'
import { event } from './lib'
import * as SDM from './sdm';

const app = new Koa()



app.use(middleware());
app.use(route());


export const start = (async () => {
  try {
    const port = config.get("server.user.port")
    const server = app.listen(port)
    // AGGREGATE americana.check_social_key("KFC","UAE","FB",465869130981340) ON user

    // event.emit('logger', {
    //   type: Constant.DATABASE.TYPE.ACTIVITY_LOG.INFO,
    //   info: { name: "ankit" },
    //   description: "test logger",
    //   options: {
    //     env: Constant.SERVER.ENV[config.get("env")],
    //   },
    //   createdAt: new Date().getTime()
    // });

    await bootstrap(server)

  } catch (error) {
    console.error(error)
  }
})()