import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as ENTITY from './entity'
import * as SDM from './sdm';

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    let a: IMenuGrpcRequest.IFetchMenuRes

    await bootstrap(server)
    //   Entries: {
    //     "CEntry": [
    //         {
    //             "ItemID": "110002",
    //             "Level": "0",
    //             "ModCode": "NONE",
    //             "Name": "Kids Chicken Meal",
    //             "OrdrMode": "OM_SAVED",
    //             "Price": "13",
    //             "Status": "NOTAPPLIED"
    //         },
    //         {
    //             "ItemID": "110002",
    //             "Level": "0",
    //             "ModCode": "NONE",
    //             "Name": "Kids Chicken Meal",
    //             "OrdrMode": "OM_SAVED",
    //             "Price": "13",
    //             "Status": "NOTAPPLIED"
    //         },
    //         {
    //             "ItemID": "110002",
    //             "Level": "0",
    //             "ModCode": "NONE",
    //             "Name": "Kids Chicken Meal",
    //             "OrdrMode": "OM_SAVED",
    //             "Price": "13",
    //             "Status": "NOTAPPLIED"
    //         }
    //     ]
    // },
    let entry = {}
    


    // await SDM.OrderSDME.getOrderDetail({})

  } catch (error) {
    console.error(error)
  }
})()