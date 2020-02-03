import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as ENTITY from './entity'

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    let a: IMenuGrpcRequest.IFetchMenuRes

    // let bundle_option = {};
    // let selection_configurable_option = {};
    // let sitem = [
    //   {
    //     "id": 1648,
    //     "qty": 2,
    //     "position": 24,
    //     "name": "Twister Sandwich - Original",
    //     "description": "",
    //     "inside": 1,
    //     "finalPrice": 9,
    //     "specialPrice": 9,
    //     "catId": 34,
    //     "metaKeyword": [
    //       "Twister Sandwich - Original"
    //     ],
    //     "bundleProductOptions": [
    //       {
    //         "position": 1,
    //         "maximumQty": 0,
    //         "minimumQty": 0,
    //         "title": "Add some Cheese",
    //         "name": "Add some Cheese",
    //         "subtitle": "Add some Cheese",
    //         "ingredient": 1,
    //         "type": "checkbox",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "productLinks": [
    //           {
    //             "position": 1,
    //             "option_id": 1573,
    //             "selection_id": 12020,
    //             "price": 0,
    //             "id": 1719,
    //             "name": "American Cheese",
    //             "title": "American Cheese",
    //             "imageThumbnail": "/imagestemp/itm810001.png",
    //             "selectionQty": 1,
    //             "subOptions": [
    //               {
    //                 "option_id": 0,
    //                 "selection_id": 0,
    //                 "price": 2,
    //                 "selected": 1,
    //                 "product_id": 1717,
    //                 "name": "Regular",
    //                 "title": "Regular",
    //                 "id": 146,
    //                 "sku": 8100012
    //               },
    //               {
    //                 "option_id": 0,
    //                 "selection_id": 0,
    //                 "price": 4,
    //                 "selected": 0,
    //                 "product_id": 1718,
    //                 "name": "Extra",
    //                 "title": "Extra",
    //                 "id": 147,
    //                 "sku": 8100013
    //               }
    //             ],
    //             "selected": 1,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 2,
    //             "option_id": 1573,
    //             "selection_id": 12021,
    //             "price": 0,
    //             "id": 1723,
    //             "name": "Lettuce",
    //             "title": "Lettuce",
    //             "imageThumbnail": "/imagestemp/itm811701.png",
    //             "selectionQty": 1,
    //             "subOptions": [
    //               {
    //                 "option_id": 1723,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 1,
    //                 "name": "Regular",
    //                 "title": "Regular",
    //                 "id": 1721,
    //                 "sku": 8117012
    //               },
    //               {
    //                 "option_id": 1723,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 0,
    //                 "name": "Extra",
    //                 "title": "Extra",
    //                 "id": 1722,
    //                 "sku": 8117013
    //               }
    //             ],
    //             "selected": 1,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 3,
    //             "option_id": 1573,
    //             "selection_id": 12022,
    //             "price": 0,
    //             "id": 1727,
    //             "name": "Tomato",
    //             "title": "Tomato",
    //             "imageThumbnail": "/imagestemp/itm811703.png",
    //             "selectionQty": 1,
    //             "subOptions": [
    //               {
    //                 "option_id": 1727,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 1,
    //                 "name": "Regular",
    //                 "title": "Regular",
    //                 "id": 1725,
    //                 "sku": 8117032
    //               },
    //               {
    //                 "option_id": 1727,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 0,
    //                 "name": "Extra",
    //                 "title": "Extra",
    //                 "id": 1726,
    //                 "sku": 8117033
    //               }
    //             ],
    //             "selected": 1,
    //             "default": 0,
    //             "dependentSteps": []
    //           }
    //         ],
    //         "isDependent": 0
    //       }
    //     ],
    //     "selectedItem": 0,
    //     "configurableProductOptions": [],
    //     "typeId": "bundle",
    //     "originalTypeId": "simple",
    //     "items": [],
    //     "sku": 110003,
    //     "imageSmall": "/imagestemp/itm110002.png",
    //     "imageThumbnail": "/imagestemp/itm110002.png",
    //     "image": "/imagestemp/itm110002.png",
    //     "taxClassId": 2,
    //     "virtualGroup": 16298,
    //     "visibility": 4,
    //     "associative": 0
    //   }
    // ]

    // let products = []
    // sitem.map(item => {
    //   let product = {}
    //   if (item['typeId'] != item['originalTypeId']) {
    //     product['product_id'] = item['id']
    //     product['qty'] = item['qty']
    //     product['type_id'] = item['originalTypeId']
    //     product['price'] = item['finalPrice']
    //     let option = {}
    //     if (item['bundleProductOptions'] && item['bundleProductOptions'].length > 0) {
    //       item['bundleProductOptions'].forEach(bpo => {
    //         if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
    //           bpo['productLinks'].forEach(pl => {
    //             if (pl['selected'] == 1) {
    //               if (pl['subOptions'] && pl['subOptions'].length > 0) {
    //                 pl['subOptions'].forEach(so => {
    //                   if (so['selected'] == 1) {
    //                     option[pl['id']] = so['id']
    //                     products.push({
    //                       product_id: so['product_id'],
    //                       qty: item['qty'],
    //                       type_id: "simple",
    //                       price: so['price']
    //                     })
    //                   }
    //                 })
    //               }
    //             }
    //           })
    //         }
    //       })
    //     }
    //     product['option'] = option
    //     products.push(product)
    //   }
    // })
    // console.log("bundle_option", bundle_option)
    // console.log("selection_configurable_option", selection_configurable_option)
    // console.log("products", products)

    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()