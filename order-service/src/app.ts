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
    //   "id": 1743,
    //   "position": 26,
    //   "name": "Dinner Strips - Medium",
    //   "title": "Dinner Strips - Medium",
    //   "description": "",
    //   "inSide": 1,
    //   "finalPrice": 27,
    //   "specialPrice": 27,
    //   "metaKeyword": [
    //     "Dinner Strips - Medium"
    //   ],
    //   "bundleProductOptions": [
    //     {
    //       "position": 1,
    //       "name": "Choice of flavor",
    //       "title": "Choice of flavor",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1490",
    //           "selection_id": "11533",
    //           "price": 0,
    //           "id": 1662,
    //           "name": "Dinner Crispy Strips - Original",
    //           "title": "Dinner Crispy Strips - Original",
    //           "imageThumbnail": "\/imagestemp\/itm511003.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1490",
    //           "selection_id": "11534",
    //           "price": 0,
    //           "id": 1663,
    //           "name": "Dinner Crispy Strips - Spicy",
    //           "title": "Dinner Crispy Strips - Spicy",
    //           "imageThumbnail": "\/imagestemp\/itm511004.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1490",
    //           "selection_id": "11535",
    //           "price": 0,
    //           "id": 1711,
    //           "name": "Dinner Crispy Strips - Mix",
    //           "title": "Dinner Crispy Strips - Mix",
    //           "imageThumbnail": "\/imagestemp\/itm511005.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             2
    //           ]
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 2,
    //       "name": "Dinner Crispy Strips - Mix",
    //       "title": "Dinner Crispy Strips - Mix",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "option_id": "1491",
    //           "selection_id": 0,
    //           "price": 0,
    //           "selected": 1,
    //           "name": "Crispy Strips Original",
    //           "title": "Crispy Strips Original",
    //           "id": 1664,
    //           "sku": 511001
    //         },
    //         {
    //           "option_id": "1491",
    //           "selection_id": 0,
    //           "price": 0,
    //           "selected": 0,
    //           "name": "Crispy Strips Spicy",
    //           "title": "Crispy Strips Spicy",
    //           "id": 1665,
    //           "sku": 511002
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 1
    //     },
    //     {
    //       "position": 3,
    //       "name": "Choice of second side item",
    //       "title": "Choice of second side item",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1491",
    //           "selection_id": "11536",
    //           "price": 9,
    //           "id": 1633,
    //           "name": "Medium Fries",
    //           "title": "Medium Fries",
    //           "imageThumbnail": "\/imagestemp\/itm510050.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1491",
    //           "selection_id": "11537",
    //           "price": 10,
    //           "id": 1637,
    //           "name": "Medium Fries Spicy",
    //           "title": "Medium Fries Spicy",
    //           "imageThumbnail": "\/imagestemp\/itm510051.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1491",
    //           "selection_id": "11538",
    //           "price": 7,
    //           "id": 1619,
    //           "name": "Coleslaw Salad Small",
    //           "title": "Coleslaw Salad Small",
    //           "imageThumbnail": "\/imagestemp\/itm510001.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1491",
    //           "selection_id": "11539",
    //           "price": 10,
    //           "id": 1628,
    //           "name": "Loaded Fries Regular",
    //           "title": "Loaded Fries Regular",
    //           "imageThumbnail": "\/imagestemp\/itm510036.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1491",
    //           "selection_id": "11540",
    //           "price": 9,
    //           "id": 1640,
    //           "name": "Medium Dipper Fries",
    //           "title": "Medium Dipper Fries",
    //           "imageThumbnail": "\/imagestemp\/itm510072.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1491",
    //           "selection_id": "11541",
    //           "price": 5,
    //           "id": 1650,
    //           "name": "Cheese Potato Dipper",
    //           "title": "Cheese Potato Dipper",
    //           "imageThumbnail": "\/imagestemp\/itm510075.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1491",
    //           "selection_id": "11542",
    //           "price": 3,
    //           "id": 1651,
    //           "name": "Loaded Fries P.Chili Reg",
    //           "title": "Loaded Fries P.Chili Reg",
    //           "imageThumbnail": "\/imagestemp\/itm510079.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 4,
    //       "name": "Choice of first side item",
    //       "title": "Choice of first side item",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1492",
    //           "selection_id": "11544",
    //           "price": 7,
    //           "id": 1630,
    //           "name": "Regular Fries",
    //           "title": "Regular Fries",
    //           "imageThumbnail": "\/imagestemp\/itm510004.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 1,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1492",
    //           "selection_id": "11545",
    //           "price": 8,
    //           "id": 1636,
    //           "name": "Regular Fries Spicy",
    //           "title": "Regular Fries Spicy",
    //           "imageThumbnail": "\/imagestemp\/itm510012.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1492",
    //           "selection_id": "11547",
    //           "price": 8,
    //           "id": 1639,
    //           "name": "Potato Dipper- Regular",
    //           "title": "Potato Dipper- Regular",
    //           "imageThumbnail": "\/imagestemp\/itm510071.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 5,
    //       "name": "Choice of Beverages",
    //       "title": "Choice of Beverages",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "\/d\/u\/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11549",
    //           "price": 9,
    //           "id": 1605,
    //           "name": "Pepsi Medium",
    //           "title": "Pepsi Medium",
    //           "imageThumbnail": "\/imagestemp\/itm600003.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11550",
    //           "price": 9,
    //           "id": 1617,
    //           "name": "Mirinda Medium",
    //           "title": "Mirinda Medium",
    //           "imageThumbnail": "\/imagestemp\/itm600009.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11551",
    //           "price": 9,
    //           "id": 1612,
    //           "name": "7Up Medium",
    //           "title": "7Up Medium",
    //           "imageThumbnail": "\/imagestemp\/itm600016.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11552",
    //           "price": 9,
    //           "id": 1607,
    //           "name": "Diet Pepsi Medium",
    //           "title": "Diet Pepsi Medium",
    //           "imageThumbnail": "\/imagestemp\/itm600006.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11553",
    //           "price": 9,
    //           "id": 1614,
    //           "name": "Mountain Dew Medium",
    //           "title": "Mountain Dew Medium",
    //           "imageThumbnail": "\/imagestemp\/itm600013.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11554",
    //           "price": 12,
    //           "id": 1600,
    //           "name": "Mojito Krusher",
    //           "title": "Mojito Krusher",
    //           "imageThumbnail": "\/imagestemp\/itm610021.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11555",
    //           "price": 0,
    //           "id": 1652,
    //           "name": "Small Aquafina",
    //           "title": "Small Aquafina",
    //           "imageThumbnail": "\/imagestemp\/itm610011.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11556",
    //           "price": 13,
    //           "id": 1599,
    //           "name": "Fresh Orange Juice",
    //           "title": "Fresh Orange Juice",
    //           "imageThumbnail": "\/imagestemp\/itm610020.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11557",
    //           "price": 3,
    //           "id": 1655,
    //           "name": "Lemon Mint Ice Tea",
    //           "title": "Lemon Mint Ice Tea",
    //           "imageThumbnail": "\/imagestemp\/itm610019.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11558",
    //           "price": 0,
    //           "id": 1657,
    //           "name": "Pepsi 500ML",
    //           "title": "Pepsi 500ML",
    //           "imageThumbnail": "\/imagestemp\/itm610000.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1493",
    //           "selection_id": "11559",
    //           "price": 0,
    //           "id": 1656,
    //           "name": "Pepsi Can",
    //           "title": "Pepsi Can",
    //           "imageThumbnail": "\/imagestemp\/itm600001.png",
    //           "selectionQty": 1,
    //           "subOptions": [

    //           ],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": [
    //             "not dependent"
    //           ]
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     }
    //   ],
    //   "typeId": "bundle",
    //   "selectedItem": 0,
    //   "configurableProductOptions": [
    //     {
    //       "id": "144",
    //       "position": 1,
    //       "title": "Choice of Size",
    //       "subtitle": "Choice of Size",
    //       "selIndex": 1,
    //       "options": [
    //         {
    //           "isSelected": 1,
    //           "position": 1,
    //           "name": "Regular",
    //           "title": "Regular",
    //           "id": "16285"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 2,
    //           "name": "Medium",
    //           "title": "Medium",
    //           "id": "16287"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 3,
    //           "name": "Large",
    //           "title": "Large",
    //           "id": "16286"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 4,
    //           "name": "Small",
    //           "title": "Small",
    //           "id": "16293"
    //         },
    //         {
    //           "isSelected": 0,
    //           "position": 5,
    //           "name": "Family",
    //           "title": "Family",
    //           "id": "16294"
    //         }
    //       ]
    //     }
    //   ],
    //   "items": [

    //   ],
    //   "sku": 900010,
    //   "imageSmall": "\/d\/u\/dummy-product.png",
    //   "imageThumbnail": "\/d\/u\/dummy-product.png",
    //   "image": "\/d\/u\/dummy-product.png",
    //   "taxClassId": 2,
    //   "virtualGroup": 0,
    //   "visibility": 4,
    //   "sel1Value": 16287,
    //   "sel2Value": -1,
    //   "sel3Value": -1,
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
    await bootstrap(server)
  } catch (error) {
    console.error(error)
  }
})()