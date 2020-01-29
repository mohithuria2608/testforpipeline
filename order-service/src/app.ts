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
    // let sitem = [{
    //   "id": 1649,
    //   "qty": 2,
    //   "position": 23,
    //   "name": "Twister Sandwich - Spicy",
    //   "description": "",
    //   "inSide": 0,
    //   "finalPrice": 9,
    //   "specialPrice": 9,
    //   "catId": 34,
    //   "metaKeyword": [
    //     "Twister Sandwich - Spicy"
    //   ],
    //   "bundleProductOptions": [
    //     {
    //       "position": 1,
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "title": "Choose Your Condiments",
    //       "name": "Choose Your Condiments",
    //       "subtitle": "Choose Your Condiments",
    //       "ingredient": 1,
    //       "type": "checkbox",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": 0,
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": "40",
    //           "name": "American Cheese",
    //           "title": "American Cheese",
    //           "imageThumbnail": "/d/u/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 2,
    //               "selected": 1,
    //               "product_id": "1717",
    //               "name": "Regular",
    //               "title": "Regular",
    //               "id": "119",
    //               "sku": "8100012"
    //             },
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 4,
    //               "selected": 0,
    //               "product_id": "1718",
    //               "name": "Extra",
    //               "title": "Extra",
    //               "id": "120",
    //               "sku": "8100013"
    //             }
    //           ],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 2,
    //           "option_id": 0,
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": "41",
    //           "name": "Lettuce",
    //           "title": "Lettuce",
    //           "imageThumbnail": "/d/u/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 0,
    //               "selected": 1,
    //               "product_id": 0,
    //               "name": "Regular",
    //               "title": "Regular",
    //               "id": "122",
    //               "sku": "811702"
    //             },
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 0,
    //               "selected": 0,
    //               "product_id": "1727",
    //               "name": "Extra",
    //               "title": "Extra",
    //               "id": "123",
    //               "sku": "811703"
    //             }
    //           ],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 3,
    //           "option_id": 0,
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": "42",
    //           "name": "Tomato",
    //           "title": "Tomato",
    //           "imageThumbnail": "/d/u/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 0,
    //               "selected": 1,
    //               "product_id": "1725",
    //               "name": "Regular",
    //               "title": "Regular",
    //               "id": "125",
    //               "sku": "8117032"
    //             },
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 0,
    //               "selected": 0,
    //               "product_id": "1726",
    //               "name": "Extra",
    //               "title": "Extra",
    //               "id": "126",
    //               "sku": "8117033"
    //             }
    //           ],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "isDependent": 1
    //     }
    //   ],
    //   "typeId": "bundle",
    //   "originalTypeId": "simple",
    //   "selectedItem": 0,
    //   "configurableProductOptions": [],
    //   "items": [],
    //   "sku": 110002,
    //   "imageSmall": "/d/u/dummy-product.png",
    //   "imageThumbnail": "/d/u/dummy-product.png",
    //   "image": "/d/u/dummy-product.png",
    //   "taxClassId": 2,
    //   "virtualGroup": 16298,
    //   "visibility": 4,
    //   "associative": 0
    // }]

    // [
    //   {
    //     "product_id": "1649",
    //     "qty": 1,
    //     "type_id": "simple",
    //     "price": "5",
    //     "options": {
    //       "40": "119",
    //       "41": "122",
    //       "42": "125"
    //     }
    //   }{
    //     "product_id": "1",
    //     "qty": 1,
    //     "type_id": "simple",
    //     "price": "5"
    //   }{
    //     "product_id": "1",
    //     "qty": 1,
    //     "type_id": "simple",
    //     "price": "5"
    //   }{
    //     "product_id": "1",
    //     "qty": 1,
    //     "type_id": "simple",
    //     "price": "5"
    //   }
    // ]

    // let products = []
    // sitem.map(item => {
    //   let product = {}
    //   if (item['typeId'] != item['originalTypeId']) {
    //     product['product_id'] = item['id']
    //     product['qty'] = item['qty']
    //     product['type_id'] = item['originalTypeId']
    //     let option = {}
    //     if (item['bundleProductOptions'] && item['bundleProductOptions'].length > 0) {
    //       item['bundleProductOptions'].forEach(bpo => {
    //         if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
    //           bpo['productLinks'].forEach(pl => {
    //             if (pl['selected'] == 1) {
    //               if (pl['subOptions'] && pl['subOptions'].length > 0) {
    //                 pl['subOptions'].map(so => {
    //                   if (so['selected'] == 1) {
    //                     option[pl['id']] = so['id']
    //                     products.push({
    //                       product_id: so['product_id'],
    //                       qty: item['qty'],
    //                       type_id: "simple",
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

    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()