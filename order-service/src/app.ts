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

    // let a: IMenuGrpcRequest.IFetchMenuRes

    // let bundle_option = {};
    // let selection_configurable_option = {};
    // let sitem = {
    //   "id": 1649,
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
    //               "name": "Regular",
    //               "title": "Regular",
    //               "id": "119",
    //               "sku": "8100012"
    //             },
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 4,
    //               "selected": 1,
    //               "name": "Extra",
    //               "title": "Extra",
    //               "id": "120",
    //               "sku": "8100013"
    //             }
    //           ],
    //           "selected": 0,
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
    //               "name": "Regular",
    //               "title": "Regular",
    //               "id": "122",
    //               "sku": "811702"
    //             },
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 0,
    //               "selected": 1,
    //               "name": "Extra",
    //               "title": "Extra",
    //               "id": "123",
    //               "sku": "811703"
    //             }
    //           ],
    //           "selected": 0,
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
    //               "name": "Regular",
    //               "title": "Regular",
    //               "id": "125",
    //               "sku": "8117032"
    //             },
    //             {
    //               "option_id": 0,
    //               "selection_id": 0,
    //               "price": 0,
    //               "selected": 1,
    //               "name": "Extra",
    //               "title": "Extra",
    //               "id": "126",
    //               "sku": "8117033"
    //             }
    //           ],
    //           "selected": 0,
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
    //   "virtualGroup": 0,
    //   "visibility": 4,
    //   "associative": 0
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
    //         }
    //       }
    //       if (pl['dependentSteps'] && pl['dependentSteps'].length > 0 && (typeof pl['dependentSteps'][0] == 'number')) {
    //         console.log("pl['dependentSteps']", pl['dependentSteps'], typeof pl['dependentSteps'][0])
    //         sitem['bundleProductOptions'].forEach(bpo2 => {
    //           if (bpo2['position'] == pl['dependentSteps'][0]) {
    //             bpo2['productLinks'].forEach(pl2 => {
    //               if (pl2['selected'] == 1)
    //                 selection_configurable_option[pl['selection_id']] = pl2['id']
    //               else
    //                 selection_configurable_option[pl['selection_id']] = ""
    //             })
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    // console.log("bundle_option", bundle_option)
    // console.log("selection_configurable_option", selection_configurable_option)

    let cmsValidatedCart = await ENTITY.CartE.createCartOnCMS({
      "cartId": "5e3140496a4e3e3d2e74294a",
      "lat": 28.606035002572977,
      "curMenuId": 1,
      "menuUpdatedAt": 1580287301.057394,
      "couponCode": "FREEPEP",
      "items": [
        {
          "description": "12 chicken pcs & Family fries",
          "position": 3,
          "sku": 900067,
          "bundleProductOptions": [
            {
              "position": 1,
              "subtitle": "Choice of flavor",
              "maximumQty": 0,
              "productLinks": [
                {
                  "id": 1642,
                  "subOptions": [
                    
                  ],
                  "position": 1,
                  "imageThumbnail": "/imagestemp/itm413002.png",
                  "default": 1,
                  "option_id": 1436,
                  "price": 0,
                  "selection_id": 11190,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 1,
                  "name": "Super Mega Deal - Original"
                },
                {
                  "id": 1643,
                  "subOptions": [
                    
                  ],
                  "position": 2,
                  "imageThumbnail": "/imagestemp/itm413003.png",
                  "default": 0,
                  "option_id": 1436,
                  "price": 0,
                  "selection_id": 11191,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 0,
                  "name": "Super Mega Deal - Spicy"
                },
                {
                  "id": 1709,
                  "subOptions": [
                    
                  ],
                  "position": 3,
                  "imageThumbnail": "/imagestemp/itm413004.png",
                  "default": 0,
                  "option_id": 1436,
                  "price": 0,
                  "selection_id": 11192,
                  "selectionQty": 1,
                  "dependentSteps": [
                    2
                  ],
                  "selected": 0,
                  "name": "Super Mega Deal - Mix"
                }
              ],
              "ingredient": 0,
              "title": "Choice of flavor",
              "minimumQty": 0,
              "isDependent": 0,
              "type": "radio"
            },
            {
              "position": 2,
              "subtitle": "Super Mega Deal - Mix",
              "maximumQty": 4,
              "productLinks": [
                {
                  "id": 1644,
                  "subOptions": [
                    
                  ],
                  "position": -1,
                  "imageThumbnail": "",
                  "default": 0,
                  "option_id": 1437,
                  "price": 0,
                  "selection_id": 0,
                  "selectionQty": 0,
                  "dependentSteps": [
                    
                  ],
                  "selected": 1,
                  "name": "Chicken Pc - Original"
                },
                {
                  "id": 1645,
                  "subOptions": [
                    
                  ],
                  "position": -1,
                  "imageThumbnail": "",
                  "default": 0,
                  "option_id": 1437,
                  "price": 0,
                  "selection_id": 0,
                  "selectionQty": 0,
                  "dependentSteps": [
                    
                  ],
                  "selected": 0,
                  "name": "Chicken Pc - Spicy"
                }
              ],
              "ingredient": 0,
              "title": "Super Mega Deal - Mix",
              "minimumQty": 4,
              "isDependent": 1,
              "type": "stepper"
            },
            {
              "position": 3,
              "subtitle": "Choice of side item",
              "maximumQty": 0,
              "productLinks": [
                {
                  "id": 1632,
                  "subOptions": [
                    
                  ],
                  "position": 1,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "default": 1,
                  "option_id": 1437,
                  "price": 15,
                  "selection_id": 11193,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 1,
                  "name": "Family Fries"
                },
                {
                  "id": 1635,
                  "subOptions": [
                    
                  ],
                  "position": 2,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "default": 0,
                  "option_id": 1437,
                  "price": 17,
                  "selection_id": 11194,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 0,
                  "name": "Family Fries Spicy"
                },
                {
                  "id": 1629,
                  "subOptions": [
                    
                  ],
                  "position": 3,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "default": 0,
                  "option_id": 1437,
                  "price": 18.5,
                  "selection_id": 11195,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 0,
                  "name": "Loaded Fries Family"
                },
                {
                  "id": 1638,
                  "subOptions": [
                    
                  ],
                  "position": 4,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "default": 0,
                  "option_id": 1437,
                  "price": 15,
                  "selection_id": 11196,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 0,
                  "name": "Family Dipper Fries"
                },
                {
                  "id": 1646,
                  "subOptions": [
                    
                  ],
                  "position": 5,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "default": 0,
                  "option_id": 1437,
                  "price": 12,
                  "selection_id": 11197,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 0,
                  "name": "Cheese Potato Dipper Fami"
                },
                {
                  "id": 1647,
                  "subOptions": [
                    
                  ],
                  "position": 6,
                  "imageThumbnail": "/imagestemp/itm510080.png",
                  "default": 0,
                  "option_id": 1437,
                  "price": 5,
                  "selection_id": 11198,
                  "selectionQty": 1,
                  "dependentSteps": [
                    
                  ],
                  "selected": 0,
                  "name": "Loaded Fries P.Chili Fami"
                }
              ],
              "ingredient": 0,
              "title": "Choice of side item",
              "minimumQty": 0,
              "isDependent": 0,
              "type": "radio"
            }
          ],
          "image": "/d/u/dummy-product.png",
          "items": [
            
          ],
          "imageSmall": "/d/u/dummy-product.png",
          "catId": 21,
          "visibility": 4,
          "taxClassId": 2,
          "name": "Super Mega Deal",
          "id": 1728,
          "specialPrice": 44.1,
          "configurableProductOptions": [
            
          ],
          "qty": 1,
          "originalTypeId": "bundle",
          "associative": 0,
          "metaKeyword": [
            "Super Mega Deal"
          ],
          "typeId": "bundle",
          "selectedItem": 0,
          "imageThumbnail": "/d/u/dummy-product.png",
          "virtualGroup": 0,
          "finalPrice": 44.1,
          "inSide": 1
        }
      ],
      "lng": 77.36202940484583
    })

    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()