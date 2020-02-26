import * as config from "config"
import * as Koa from 'koa'
process.env.ALLOW_CONFIG_MUTATIONS = "true";
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

    // event.emit('logger', {
    //   type: Constant.DATABASE.TYPE.ACTIVITY_LOG.INFO,
    //   info: { name: "ankit" },
    //   description: "test logger",
    //   options: {
    //     env: Constant.SERVER.ENV[config.get("env")],
    //   },
    //   createdAt: new Date().getTime()
    // });

    let a = "ankit"
    let splitName = a.split(" ")
    let firstName = splitName.length == 1 ? splitName[0] : splitName.join(" ")
    let lastName = splitName.length > 1 ? splitName[splitName.length - 1] : "."

    console.log("nameeeeeeeeeeeeeeeee firstName", firstName)
    console.log("nameeeeeeeeeeeeeeeee lastName", lastName)
    await bootstrap(server)

  } catch (error) {
    console.error(error)
  }
})()