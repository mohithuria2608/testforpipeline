import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    // let a: IMenuGrpcRequest.IFetchMenuRes

    // let bundle_option = {};
    // let selection_configurable_option = {};
    // let sitem = {
    //   "description": "12 chicken pcs & Family fries",
    //   "position": 3,
    //   "sku": 67,
    //   "bundleProductOptions": [
    //     {
    //       "position": 1,
    //       "subtitle": "",
    //       "maximumQty": 0,
    //       "productLinks": [
    //         {
    //           "option_id": "1258",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1469,
    //           "price": 0,
    //           "name": "Super Mega Deal - Original",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 1
    //         },
    //         {
    //           "option_id": "1258",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1470,
    //           "price": 0,
    //           "name": "Super Mega Deal - Spicy",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 0
    //         },
    //         {
    //           "option_id": "1258",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1579,
    //           "price": 0,
    //           "name": "Super Mega Deal - Mix",
    //           "selected": 1,
    //           "dependentSteps": [
    //             2
    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 0
    //         }
    //       ],
    //       "ingredient": 0,
    //       "title": "Choice of flavor",
    //       "minimumQty": 0,
    //       "isDependent": 0,
    //       "type": "radio"
    //     },
    //     {
    //       "position": 2,
    //       "subtitle": "",
    //       "maximumQty": 12,
    //       "productLinks": [
    //         {
    //           "option_id": "1259",
    //           "position": -1,
    //           "subOptions": [

    //           ],
    //           "id": 1471,
    //           "price": 0,
    //           "name": "Chicken Pc - Original",
    //           "selected": 1,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 0,
    //           "selection_id": 0,
    //           "default": 0
    //         },
    //         {
    //           "option_id": "1259",
    //           "position": -1,
    //           "subOptions": [

    //           ],
    //           "id": 1472,
    //           "price": 0,
    //           "name": "Chicken Pc - Spicy",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 0,
    //           "selection_id": 0,
    //           "default": 0
    //         }
    //       ],
    //       "ingredient": 0,
    //       "title": "Super Mega Deal - Mix",
    //       "minimumQty": 12,
    //       "isDependent": 1,
    //       "type": "radio"
    //     },
    //     {
    //       "position": 3,
    //       "subtitle": "",
    //       "maximumQty": 0,
    //       "productLinks": [
    //         {
    //           "option_id": "1259",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1459,
    //           "price": 15,
    //           "name": "Family Fries",
    //           "selected": 1,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 1
    //         },
    //         {
    //           "option_id": "1259",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1462,
    //           "price": 17,
    //           "name": "Family Fries Spicy",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 0
    //         },
    //         {
    //           "option_id": "1259",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1456,
    //           "price": 18,
    //           "name": "Loaded Fries Family",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 0
    //         },
    //         {
    //           "option_id": "1259",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1465,
    //           "price": 15,
    //           "name": "Family Dipper Fries",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 0
    //         },
    //         {
    //           "option_id": "1259",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1473,
    //           "price": 12,
    //           "name": "Cheese Potato Dipper Fami",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 0
    //         },
    //         {
    //           "option_id": "1259",
    //           "position": 0,
    //           "subOptions": [

    //           ],
    //           "id": 1474,
    //           "price": 5,
    //           "name": "Loaded Fries P.Chili Fami",
    //           "selected": 0,
    //           "dependentSteps": [

    //           ],
    //           "selectionQty": 1,
    //           "selection_id": 0,
    //           "default": 0
    //         }
    //       ],
    //       "ingredient": 0,
    //       "title": "Choice of side item",
    //       "minimumQty": 0,
    //       "isDependent": 0,
    //       "type": "radio"
    //     }
    //   ],
    //   "image": "/d/u/dummy-product.png",
    //   "items": [

    //   ],
    //   "imageSmall": "/d/u/dummy-product.png",
    //   "catId": 21,
    //   "visibility": 4,
    //   "taxClassId": 2,
    //   "name": "Super Mega Deal",
    //   "id": 1535,
    //   "specialPrice": 44.099998474121094,
    //   "configurableProductOptions": [

    //   ],
    //   "qty": 1,
    //   "associative": 0,
    //   "metaKeyword": [
    //     "Super Mega Deal"
    //   ],
    //   "typeId": "bundle",
    //   "selectedItem": 0,
    //   "imageThumbnail": "/d/u/dummy-product.png",
    //   "virtualGroup": 0,
    //   "finalPrice": 44.099998474121094,
    //   "inSide": 1
    // }

    // sitem['bundleProductOptions'].forEach(bpo => {
    //   if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
    //     bpo['productLinks'].forEach(pl => {
    //       if (pl['selected'] == 1) {
    //         if (pl['subOptions'] && pl['subOptions'].length > 0) {
    //           if (bundle_option[pl['option_id']] == null)
    //             bundle_option[pl['option_id']] = {}
    //           bundle_option[pl['option_id']][pl['id']] = pl['selection_id']
    //         } else {
    //           bundle_option[pl['option_id']] = pl['selection_id']
    //           if (pl['dependentSteps'] && pl['dependentSteps'].length > 0 && (typeof pl['dependentSteps'][0] == 'number')) {
    //             console.log("pl['dependentSteps']", pl['dependentSteps'], typeof pl['dependentSteps'][0])
    //             sitem['bundleProductOptions'].forEach(bpo2 => {
    //               if (bpo2['position'] == pl['dependentSteps'][0]) {
    //                 bpo2['productLinks'].forEach(pl2 => {
    //                   if (pl2['selected'] == 1)
    //                     selection_configurable_option[pl['selection_id']] = pl2['id']
    //                 })
    //               }
    //             })
    //           }
    //         }
    //       }
    //       // if (bundle_option.hasOwnProperty(pl['option_id'])) {
    //       //   pl['subOptions'].forEach(so => {
    //       //     if (pl['selected'] == 1 && so['selected'] == 1) {
    //       //       selection_configurable_option[pl['selection_id']] = so['id']
    //       //     }
    //       //     else {
    //       //       if (selection_configurable_option[pl['selection_id']] == undefined)
    //       //         selection_configurable_option[pl['selection_id']] = ""
    //       //     }
    //       //   })
    //       // }
    //     })
    //   }
    // })
    // console.log("bundle_option", bundle_option)
    // console.log("selection_configurable_option", selection_configurable_option)
    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()