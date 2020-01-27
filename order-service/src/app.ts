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

    let bundle_option = {};
    let selection_configurable_option = {};
    let sitem = {
      "id": 1535,
      "qty": 2,
      "position": 3,
      "name": "Super Mega Deal",
      "title": "Super Mega Deal",
      "description": "12 chicken pcs & Family fries",
      "inSide": 1,
      "finalPrice": 44.1,
      "specialPrice": 44.1,
      "catId": 21,
      "metaKeyword": [
        "Super Mega Deal"
      ],
      "bundleProductOptions": [
        {
          "position": 1,
          "name": "Choice of flavor",
          "title": "Choice of flavor",
          "ingredient": 0,
          "type": "radio",
          "imageThumbnail": "/d/u/dummy-product.png",
          "productLinks": [
            {
              "position": 0,
              "option_id": "1258",
              "selection_id": "8949",
              "price": 0,
              "id": 1469,
              "name": "Super Mega Deal - Original",
              "title": "Super Mega Deal - Original",
              "imageThumbnail": "/imagestemp/itm413002.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 1,
              "default": 1,
              "dependentSteps": [
                "not dependent"
              ]
            },
            {
              "position": 0,
              "option_id": "1258",
              "selection_id": "8950",
              "price": 0,
              "id": 1470,
              "name": "Super Mega Deal - Spicy",
              "title": "Super Mega Deal - Spicy",
              "imageThumbnail": "/imagestemp/itm413003.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 0,
              "default": 0,
              "dependentSteps": [
                "not dependent"
              ]
            },
            {
              "position": 0,
              "option_id": "1258",
              "selection_id": "10015",
              "price": 0,
              "id": 1579,
              "name": "Super Mega Deal - Mix",
              "title": "Super Mega Deal - Mix",
              "imageThumbnail": "/imagestemp/itm413004.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 0,
              "default": 0,
              "dependentSteps": [
                2
              ]
            }
          ],
          "maximumQty": 12,
          "minimumQty": 12,
          "isDependent": 0
        },
        {
          "position": 2,
          "name": "Super Mega Deal - Mix",
          "title": "Super Mega Deal - Mix",
          "ingredient": 0,
          "type": "radio",
          "imageThumbnail": "/d/u/dummy-product.png",
          "productLinks": [
            {
              "option_id": "1259",
              "selection_id": 0,
              "price": 0,
              "selected": 1,
              "name": "Chicken Pc - Original",
              "title": "Chicken Pc - Original",
              "id": 1471,
              "sku": 910001
            },
            {
              "option_id": "1259",
              "selection_id": 0,
              "price": 0,
              "selected": 0,
              "name": "Chicken Pc - Spicy",
              "title": "Chicken Pc - Spicy",
              "id": 1472,
              "sku": 910002
            }
          ],
          "maximumQty": 12,
          "minimumQty": 12,
          "isDependent": 1
        },
        {
          "position": 3,
          "name": "Choice of side item",
          "title": "Choice of side item",
          "ingredient": 0,
          "type": "radio",
          "imageThumbnail": "/d/u/dummy-product.png",
          "productLinks": [
            {
              "position": 0,
              "option_id": "1259",
              "selection_id": "8951",
              "price": 15,
              "id": 1459,
              "name": "Family Fries",
              "title": "Family Fries",
              "imageThumbnail": "/imagestemp/itm510005.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 1,
              "default": 1,
              "dependentSteps": [
                "not dependent"
              ]
            },
            {
              "position": 0,
              "option_id": "1259",
              "selection_id": "8952",
              "price": 17,
              "id": 1462,
              "name": "Family Fries Spicy",
              "title": "Family Fries Spicy",
              "imageThumbnail": "/imagestemp/itm510014.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 0,
              "default": 0,
              "dependentSteps": [
                "not dependent"
              ]
            },
            {
              "position": 0,
              "option_id": "1259",
              "selection_id": "8953",
              "price": 18,
              "id": 1456,
              "name": "Loaded Fries Family",
              "title": "Loaded Fries Family",
              "imageThumbnail": "/imagestemp/itm510030.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 0,
              "default": 0,
              "dependentSteps": [
                "not dependent"
              ]
            },
            {
              "position": 0,
              "option_id": "1259",
              "selection_id": "8954",
              "price": 15,
              "id": 1465,
              "name": "Family Dipper Fries",
              "title": "Family Dipper Fries",
              "imageThumbnail": "/imagestemp/itm510074.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 0,
              "default": 0,
              "dependentSteps": [
                "not dependent"
              ]
            },
            {
              "position": 0,
              "option_id": "1259",
              "selection_id": "8955",
              "price": 12,
              "id": 1473,
              "name": "Cheese Potato Dipper Fami",
              "title": "Cheese Potato Dipper Fami",
              "imageThumbnail": "/imagestemp/itm510076.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 0,
              "default": 0,
              "dependentSteps": [
                "not dependent"
              ]
            },
            {
              "position": 0,
              "option_id": "1259",
              "selection_id": "8956",
              "price": 5,
              "id": 1474,
              "name": "Loaded Fries P.Chili Fami",
              "title": "Loaded Fries P.Chili Fami",
              "imageThumbnail": "/imagestemp/itm510080.png",
              "selectionQty": 1,
              "subOptions": [

              ],
              "selected": 0,
              "default": 0,
              "dependentSteps": [
                "not dependent"
              ]
            }
          ],
          "maximumQty": 0,
          "minimumQty": 0,
          "isDependent": 0
        }
      ],
      "typeId": "bundle",
      "originalTypeId": "bundle",
      "selectedItem": 0,
      "configurableProductOptions": [],
      "items": [ ],
      "sku": 67,
      "imageSmall": "/d/u/dummy-product.png",
      "imageThumbnail": "/d/u/dummy-product.png",
      "image": "/d/u/dummy-product.png",
      "taxClassId": 2,
      "virtualGroup": 0,
      "visibility": 4,
      "associative": 0
    }

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
    //         }
    //       }
    //       if (bundle_option.hasOwnProperty(pl['option_id'])) {
    //         pl['subOptions'].forEach(so => {
    //           if (pl['selected'] == 1 && so['selected'] == 1) {
    //             selection_configurable_option[pl['selection_id']] = so['id']
    //           }
    //           else {
    //             if (selection_configurable_option[pl['selection_id']] == undefined)
    //               selection_configurable_option[pl['selection_id']] = ""
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    console.log("bundle_option", bundle_option)
    console.log("selection_configurable_option", selection_configurable_option)
    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()