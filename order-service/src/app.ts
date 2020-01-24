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

    // let sitem = {
    //   "id": 680,
    //   "position": 0,
    //   "name": "Mighty Twist - Large",
    //   "description": "",
    //   "inSide": 1,
    //   "finalPrice": 26.55,
    //   "specialPrice": 26.55,
    //   "typeId": "bundle",
    //   "metaKeyword": [
    //     "Mighty Twist - Large"
    //   ],
    //   "bundleProductOptions": [
    //     {
    //       "position": 1,
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "title": "Cheese",
    //       "ingredient": 0,
    //       "type": "checkbox",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": "233",
    //           "selection_id": "902",
    //           "price": 0,
    //           "id": 664,
    //           "name": "American Cheese",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [
    //             {
    //               "option_id": "664",
    //               "selection_id": null,
    //               "price": 0,
    //               "selected": 1,
    //               "name": "None",
    //               "id": 661,
    //               "sku": 8100011
    //             },
    //             {
    //               "option_id": "664",
    //               "selection_id": null,
    //               "price": 1.8,
    //               "selected": 0,
    //               "name": "Regular",
    //               "id": 662,
    //               "sku": 8100012
    //             },
    //             {
    //               "option_id": "664",
    //               "selection_id": null,
    //               "price": 3.6,
    //               "selected": 0,
    //               "name": "Extra",
    //               "id": 663,
    //               "sku": 8100013
    //             }
    //           ],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 2,
    //           "option_id": "233",
    //           "selection_id": "903",
    //           "price": 0,
    //           "id": 668,
    //           "name": "Lettuce",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [
    //             {
    //               "option_id": "668",
    //               "selection_id": null,
    //               "price": 0,
    //               "selected": 1,
    //               "name": "None",
    //               "id": 665,
    //               "sku": 8117011
    //             },
    //             {
    //               "option_id": "668",
    //               "selection_id": null,
    //               "price": 0,
    //               "selected": 0,
    //               "name": "Regular",
    //               "id": 666,
    //               "sku": 8117012
    //             },
    //             {
    //               "option_id": "668",
    //               "selection_id": null,
    //               "price": 0,
    //               "selected": 0,
    //               "name": "Extra",
    //               "id": 667,
    //               "sku": 8117013
    //             }
    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 3,
    //           "option_id": "233",
    //           "selection_id": "904",
    //           "price": 0,
    //           "id": 672,
    //           "name": "Tomato",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [
    //             {
    //               "option_id": "672",
    //               "selection_id": null,
    //               "price": 0,
    //               "selected": 1,
    //               "name": "None",
    //               "id": 669,
    //               "sku": 8117031
    //             },
    //             {
    //               "option_id": "672",
    //               "selection_id": null,
    //               "price": 0,
    //               "selected": 0,
    //               "name": "Regular",
    //               "id": 670,
    //               "sku": 8117032
    //             },
    //             {
    //               "option_id": "672",
    //               "selection_id": null,
    //               "price": 0,
    //               "selected": 0,
    //               "name": "Extra",
    //               "id": 671,
    //               "sku": 8117033
    //             }
    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 4,
    //           "option_id": "233",
    //           "selection_id": "905",
    //           "price": 0,
    //           "id": 557,
    //           "name": "Twister Sandwich - Spicy",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 5,
    //           "option_id": "233",
    //           "selection_id": "906",
    //           "price": 10,
    //           "id": 601,
    //           "name": "Large Fries",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         }
    //       ],
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 2,
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "title": "Choice of Second Sandwich",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": "234",
    //           "selection_id": "907",
    //           "price": 0,
    //           "id": 558,
    //           "name": "Twister Sandwich - Original",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         }
    //       ],
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 3,
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "title": "Choice of side item",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": "235",
    //           "selection_id": "908",
    //           "price": 11,
    //           "id": 604,
    //           "name": "Large Fries Spicy",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 2,
    //           "option_id": "235",
    //           "selection_id": "909",
    //           "price": 7,
    //           "id": 589,
    //           "name": "Coleslaw Salad Small",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 3,
    //           "option_id": "235",
    //           "selection_id": "910",
    //           "price": 10,
    //           "id": 598,
    //           "name": "Loaded Fries Regular",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 4,
    //           "option_id": "235",
    //           "selection_id": "911",
    //           "price": 8,
    //           "id": 609,
    //           "name": "Potato Dipper- Regular",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 5,
    //           "option_id": "235",
    //           "selection_id": "912",
    //           "price": 5,
    //           "id": 621,
    //           "name": "Cheese Potato Dipper",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 6,
    //           "option_id": "235",
    //           "selection_id": "913",
    //           "price": 3,
    //           "id": 622,
    //           "name": "Loaded Fries P.Chili Reg",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         }
    //       ],
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 4,
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "title": "Choice of Beverages",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": "236",
    //           "selection_id": "914",
    //           "price": 10,
    //           "id": 576,
    //           "name": "Pepsi Large",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 2,
    //           "option_id": "236",
    //           "selection_id": "915",
    //           "price": 10,
    //           "id": 588,
    //           "name": "Mirinda Large",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 3,
    //           "option_id": "236",
    //           "selection_id": "2433",
    //           "price": 10,
    //           "id": 713,
    //           "name": "7Up Large",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 4,
    //           "option_id": "236",
    //           "selection_id": "917",
    //           "price": 10,
    //           "id": 579,
    //           "name": "Diet Pepsi Large",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 5,
    //           "option_id": "236",
    //           "selection_id": "918",
    //           "price": 10,
    //           "id": 585,
    //           "name": "Mountain Dew Large",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 6,
    //           "option_id": "236",
    //           "selection_id": "919",
    //           "price": 5,
    //           "id": 570,
    //           "name": "Mojito Krusher",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 7,
    //           "option_id": "236",
    //           "selection_id": "920",
    //           "price": 0,
    //           "id": 623,
    //           "name": "Small Aquafina",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         },
    //         {
    //           "position": 8,
    //           "option_id": "236",
    //           "selection_id": "921",
    //           "price": 8,
    //           "id": 569,
    //           "name": "Fresh Orange Juice",
    //           "imageThumbnail": "\/d\/u\/dummy-product.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "0"
    //           ]
    //         }
    //       ],
    //       "isDependent": 0
    //     }
    //   ],
    //   "selectedItem": 0,
    //   "configurableProductOptions": [
    //     {
    //       "id": "144",
    //       "position": 1,
    //       "title": "Choice of Size",
    //       "subtitle": "Choice of Size",
    //       "selIndex": 0,
    //       "options": [
    //         {
    //           "isSelected": 1,
    //           "position": 1,
    //           "title": "Regular",
    //           "id": "16285"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 2,
    //           "title": "Large",
    //           "id": "16286"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 3,
    //           "title": "Medium",
    //           "id": "16287"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 4,
    //           "title": "Small",
    //           "id": "16293"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 5,
    //           "title": "Family",
    //           "id": "16294"
    //         }
    //       ]
    //     }
    //   ],
    //   "items": [],
    //   "sku": 71,
    //   "imageSmall": "\/d\/u\/dummy-product.png",
    //   "imageThumbnail": "\/d\/u\/dummy-product.png",
    //   "image": "\/d\/u\/dummy-product.png",
    //   "taxClassId": 2,
    //   "virtualGroup": 0,
    //   "visibility": 4,
    //   "associative": 0
    // }

    // let bundle_option = {};
    // let selection_configurable_option = {};
    // sitem['bundleProductOptions'].map(bpo => {
    //   if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
    //     bpo['productLinks'].map(pl => {
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
    //         pl['subOptions'].map(so => {
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
    // console.log("bundle_option", bundle_option)
    // console.log("selection_configurable_option", selection_configurable_option)
    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()