import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as SDM from './sdm'

const app = new Koa()


app.use(middleware());
app.use(route());


export const start = (async () => {
  try {
    const port = config.get("server.user.port")
    const server = app.listen(port)

    await bootstrap(server)
    // await SDM.UserSDME.getCustomerByUserNameAndPswd("", "")
    // await SDM.UserSDME.getCustomerByEmail("")
    // await SDM.UserSDME.getCustomersByEmail("")
    // await SDM.UserSDME.getCustomerById(7340706)
    // await SDM.UserSDME.getCustomerByMobile(1111111)
    // await SDM.UserSDME.getCustomersByPhone("1111111")
    // await SDM.UserSDME.getSdmRefId(1111111, "abc@gmail.com")
  } catch (err) {
    console.error(err)
  }
})()