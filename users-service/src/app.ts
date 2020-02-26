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

    // let ar1 = Object.keys(STATUS_MSG)
    // ar1.map(obj => {
    //   console.log("obj", obj)
    //   let ar2 = Object.keys(STATUS_MSG[obj])
    //   ar2.map(obj2 => {
    //     console.log("obj2", obj2)
    //     let ar3 = Object.keys(STATUS_MSG[obj][obj2])
    //     ar3.map(obj3 => {
    //       console.log("obj3", obj3)
    //       STATUS_MSG[obj][obj2][obj3]['message_Ar'] = STATUS_MSG[obj][obj2][obj3]['message'] + " in arabic"
    //       STATUS_MSG[obj][obj2][obj3]['message_En'] = STATUS_MSG[obj][obj2][obj3]['message']
    //     })
    //   })
    // })
    // console.log("STATUS_MSG", JSON.stringify(STATUS_MSG))

    await bootstrap(server)

  } catch (error) {
    console.error(error)
  }
})()