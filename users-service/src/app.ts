import * as config from "config"
import * as Koa from 'koa'
import { bootstrap, consolelog } from './utils'
require('./grpc/server')
import middleware from './middlewares'
import route from './route'
import { event } from './lib'
import * as SDM from './sdm';
import * as Constant from './constant';

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
    await bootstrap(server)
    // await SDM.UserSDME.createCustomer({})
    // await SDM.UserSDME.getCustomerByUserNameAndPswd({ customerUserName: "", customerPassword: "" })
    // await SDM.UserSDME.getCustomerByEmail({ email: "abc@gmail.com" })
    // await SDM.UserSDME.getCustomersByEmail("")
    // await SDM.UserSDME.getCustomerById(7340706)
    // await SDM.UserSDME.getCustomerByMobile(1111111)
    // await UserSDME.getCustomersByPhone({ phoneNo: 1111111 })
    // await SDM.UserSDME.getsdmUserRef(1111111, "abc@gmail.com")
  } catch (error) {
    console.error(error)
  }
})()