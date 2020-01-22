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

    // let curItems = [
    //   {
    //     "description": "Fries description",
    //     "position": 3,
    //     "sku": 10,
    //     "bundleProductOptions": [

    //     ],
    //     "image": "/d/u/dummy-product.png",
    //     "items": [
    //       {
    //         "id": 6,
    //         "description": "",
    //         "position": 1,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510051,
    //         "title": "Regular Fries Original",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 9.5,
    //         "sel1Value": 16285,
    //         "sel2Value": 16288,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 7,
    //         "description": "",
    //         "position": 2,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510052,
    //         "title": "Fries Original Large",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 9,
    //         "sel1Value": 16286,
    //         "sel2Value": 16288,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 8,
    //         "description": "",
    //         "position": 3,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510053,
    //         "title": "Fries Original Medium",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 8.5,
    //         "sel1Value": 16287,
    //         "sel2Value": 16288,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 9,
    //         "description": "",
    //         "position": 4,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510054,
    //         "title": "Fries Spicy Regular",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 9.5,
    //         "sel1Value": 16285,
    //         "sel2Value": 16289,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 10,
    //         "description": "",
    //         "position": 5,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510055,
    //         "title": "Fries Spicy Large",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 10,
    //         "sel1Value": 16286,
    //         "sel2Value": 16289,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 11,
    //         "description": "",
    //         "position": 6,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 51005,
    //         "title": "Fries Spicy Medium",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 7.5,
    //         "sel1Value": 16287,
    //         "sel2Value": 16289,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       }
    //     ],
    //     "imageSmall": "/d/u/dummy-product.png",
    //     "catId": 21,
    //     "visibility": 4,
    //     "taxClassId": 2,
    //     "name": "Fries",
    //     "id": 12,
    //     "specialPrice": 0,
    //     "configurableProductOptions": [
    //       {
    //         "id": 144,
    //         "title": "Size",
    //         "selIndex": 1,
    //         "subtitle": "Choice of Size",
    //         "position": 1,
    //         "options": [
    //           {
    //             "isSelected": 1,
    //             "id": 16285,
    //             "title": "Regular",
    //             "position": 1
    //           },
    //           {
    //             "isSelected": 0,
    //             "id": 16286,
    //             "title": "Large",
    //             "position": 2
    //           },
    //           {
    //             "isSelected": 0,
    //             "id": 16287,
    //             "title": "Medium",
    //             "position": 3
    //           }
    //         ]
    //       },
    //       {
    //         "id": 145,
    //         "title": "Flavor",
    //         "selIndex": 2,
    //         "subtitle": "Choose your flavor",
    //         "position": 2,
    //         "options": [
    //           {
    //             "isSelected": 1,
    //             "id": 16288,
    //             "title": "Original",
    //             "position": 1
    //           },
    //           {
    //             "isSelected": 0,
    //             "id": 16289,
    //             "title": "Spicy",
    //             "position": 2
    //           }
    //         ]
    //       }
    //     ],
    //     "qty": 1,
    //     "associative": 0,
    //     "metaKeyword": [
    //       "Fries"
    //     ],
    //     "typeId": "configurable",
    //     "selectedItem": 510051,
    //     "imageThumbnail": "/d/u/dummy-product.png",
    //     "virtualGroup": 16298,
    //     "finalPrice": 9.5,
    //     "inSide": 1
    //   },
    //   {
    //     "description": "Fries description",
    //     "position": 3,
    //     "sku": 10,
    //     "bundleProductOptions": [

    //     ],
    //     "image": "/d/u/dummy-product.png",
    //     "items": [
    //       {
    //         "id": 6,
    //         "description": "",
    //         "position": 1,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510051,
    //         "title": "Regular Fries Original",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 9.5,
    //         "sel1Value": 16285,
    //         "sel2Value": 16288,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 7,
    //         "description": "",
    //         "position": 2,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510052,
    //         "title": "Fries Original Large",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 9,
    //         "sel1Value": 16286,
    //         "sel2Value": 16288,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 8,
    //         "description": "",
    //         "position": 3,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510053,
    //         "title": "Fries Original Medium",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 8.5,
    //         "sel1Value": 16287,
    //         "sel2Value": 16288,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 9,
    //         "description": "",
    //         "position": 4,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510054,
    //         "title": "Fries Spicy Regular",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 9.5,
    //         "sel1Value": 16285,
    //         "sel2Value": 16289,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 10,
    //         "description": "",
    //         "position": 5,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 510055,
    //         "title": "Fries Spicy Large",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 10,
    //         "sel1Value": 16286,
    //         "sel2Value": 16289,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       },
    //       {
    //         "id": 11,
    //         "description": "",
    //         "position": 6,
    //         "typeId": "simple",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "metaKeyword": [
    //           ""
    //         ],
    //         "sku": 51005,
    //         "title": "Fries Spicy Medium",
    //         "configurableProductOptions": [

    //         ],
    //         "finalPrice": 7.5,
    //         "sel1Value": 16287,
    //         "sel2Value": 16289,
    //         "sel3Value": -1,
    //         "specialPrice": 0,
    //         "bundleProductOptions": [

    //         ]
    //       }
    //     ],
    //     "imageSmall": "/d/u/dummy-product.png",
    //     "catId": 21,
    //     "visibility": 4,
    //     "taxClassId": 2,
    //     "name": "Fries",
    //     "id": 12,
    //     "specialPrice": 0,
    //     "configurableProductOptions": [
    //       {
    //         "id": 144,
    //         "title": "Size",
    //         "selIndex": 1,
    //         "subtitle": "Choice of Size",
    //         "position": 1,
    //         "options": [
    //           {
    //             "isSelected": 0,
    //             "id": 16285,
    //             "title": "Regular",
    //             "position": 1
    //           },
    //           {
    //             "isSelected": 1,
    //             "id": 16286,
    //             "title": "Large",
    //             "position": 2
    //           },
    //           {
    //             "isSelected": 0,
    //             "id": 16287,
    //             "title": "Medium",
    //             "position": 3
    //           }
    //         ]
    //       },
    //       {
    //         "id": 145,
    //         "title": "Flavor",
    //         "selIndex": 2,
    //         "subtitle": "Choose your flavor",
    //         "position": 2,
    //         "options": [
    //           {
    //             "isSelected": 0,
    //             "id": 16288,
    //             "title": "Original",
    //             "position": 1
    //           },
    //           {
    //             "isSelected": 1,
    //             "id": 16289,
    //             "title": "Spicy",
    //             "position": 2
    //           }
    //         ]
    //       }
    //     ],
    //     "qty": 1,
    //     "associative": 0,
    //     "metaKeyword": [
    //       "Fries"
    //     ],
    //     "typeId": "configurable",
    //     "selectedItem": 510052,
    //     "imageThumbnail": "/d/u/dummy-product.png",
    //     "virtualGroup": 16298,
    //     "finalPrice": 10,
    //     "inSide": 1
    //   }
    // ]
    // let cmsCart = {
    //   "cart_items": [
    //     {
    //       "product_id": 12,
    //       "qty": 1,
    //       "price": 34.865,
    //       "type_id": "configurable"
    //     },
    //     {
    //       "product_id": 12,
    //       "qty": 1,
    //       "price": 36.7,
    //       "type_id": "configurable"
    //     }
    //   ],
    //   "cms_cart_id": "65",
    //   "currency_code": "AED",
    //   "subtotal": 71.57,
    //   "grandtotal": 71.57,
    //   "tax": [

    //   ],
    //   "not_available": [

    //   ],
    //   "is_price_changed": true,
    //   "coupon_code": "",
    //   "discount_amount": 0,
    //   "success": true
    // }

    // let dataToUpdate = {
    //   items: [],
    //   notAvailable: [],
    // }
    // if (cmsCart.cart_items && cmsCart.cart_items.length > 0) {
    //   for (const obj of curItems) {
    //     console.log("1", obj.id)
    //     let parsedData = {}
    //     for (const elem of cmsCart.cart_items) {
    //       console.log("2", elem.product_id)
    //       if (obj.id == elem.product_id && (parsedData[obj.id] == undefined)) {
    //         parsedData[obj.id] = true
    //         dataToUpdate['items'].push(obj)
    //       }
    //     }
    //     if (parsedData[obj.id] == undefined)
    //       dataToUpdate['notAvailable'].push(obj)
    //   }
    // } else {
    //   dataToUpdate['notAvailable'] = curItems
    // }

    // console.log("here.................", JSON.stringify(dataToUpdate))
    let a: IMenuGrpcRequest.IFetchMenuRes


    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()