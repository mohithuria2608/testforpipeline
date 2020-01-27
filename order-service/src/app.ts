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
    //   "id": 1575,
    //   "position": 1,
    //   "name": "21 Pcs Super Bucket",
    //   "title": "21 Pcs Super Bucket",
    //   "description": "21 chicken pcs + 5 crispy strips + 2 family fries + 2 family coleslaw +7 bun + 2.25 L drink",
    //   "inSide": 1,
    //   "finalPrice": 135,
    //   "specialPrice": 135,
    //   "metaKeyword": [
    //     "21 Pcs Super Bucket"
    //   ],
    //   "bundleProductOptions": [
    //     {
    //       "position": 1,
    //       "name": "Choice Of Chicken",
    //       "title": "Choice Of Chicken",
    //       "ingredient": 0,
    //       "type": "checkbox",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1421",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1471,
    //           "name": "Chicken Pc - Original",
    //           "title": "Chicken Pc - Original",
    //           "imageThumbnail": "/imagestemp/itm910001.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1421",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1472,
    //           "name": "Chicken Pc - Spicy",
    //           "title": "Chicken Pc - Spicy",
    //           "imageThumbnail": "/imagestemp/itm910002.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 2,
    //       "name": "Choice of Strips",
    //       "title": "Choice of Strips",
    //       "ingredient": 0,
    //       "type": "checkbox",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1422",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1491,
    //           "name": "Crispy Strips Original",
    //           "title": "Crispy Strips Original",
    //           "imageThumbnail": "/imagestemp/itm511001.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1422",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1492,
    //           "name": "Crispy Strips Spicy",
    //           "title": "Crispy Strips Spicy",
    //           "imageThumbnail": "/imagestemp/itm511002.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 3,
    //       "name": "Choice of first side item",
    //       "title": "Choice of first side item",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 15,
    //           "id": 1459,
    //           "name": "Family Fries",
    //           "title": "Family Fries",
    //           "imageThumbnail": "/imagestemp/itm510005.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 17,
    //           "id": 1462,
    //           "name": "Family Fries Spicy",
    //           "title": "Family Fries Spicy",
    //           "imageThumbnail": "/imagestemp/itm510014.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 15,
    //           "id": 1447,
    //           "name": "Coleslaw Salad Large",
    //           "title": "Coleslaw Salad Large",
    //           "imageThumbnail": "/imagestemp/itm510002.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 18,
    //           "id": 1456,
    //           "name": "Loaded Fries Family",
    //           "title": "Loaded Fries Family",
    //           "imageThumbnail": "/imagestemp/itm510030.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1507,
    //           "name": "Chips Large Catering",
    //           "title": "Chips Large Catering",
    //           "imageThumbnail": "/imagestemp/itm510068.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 15,
    //           "id": 1465,
    //           "name": "Family Dipper Fries",
    //           "title": "Family Dipper Fries",
    //           "imageThumbnail": "/imagestemp/itm510074.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 12,
    //           "id": 1473,
    //           "name": "Cheese Potato Dipper Fami",
    //           "title": "Cheese Potato Dipper Fami",
    //           "imageThumbnail": "/imagestemp/itm510076.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1423",
    //           "selection_id": 0,
    //           "price": 5,
    //           "id": 1474,
    //           "name": "Loaded Fries P.Chili Fami",
    //           "title": "Loaded Fries P.Chili Fami",
    //           "imageThumbnail": "/imagestemp/itm510080.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 4,
    //       "name": "Choice of second side item",
    //       "title": "Choice of second side item",
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [],
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
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 0,
    //           "option_id": "1425",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1516,
    //           "name": "Pepsi 2.25",
    //           "title": "Pepsi 2.25",
    //           "imageThumbnail": "/imagestemp/itm610034.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1425",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1517,
    //           "name": "7Up  2.25",
    //           "title": "7Up  2.25",
    //           "imageThumbnail": "/imagestemp/itm610035.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1425",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1518,
    //           "name": "Mountain Dew 2.25",
    //           "title": "Mountain Dew 2.25",
    //           "imageThumbnail": "/imagestemp/itm610036.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1425",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1519,
    //           "name": "Diet Pepsi 2.25",
    //           "title": "Diet Pepsi 2.25",
    //           "imageThumbnail": "/imagestemp/itm610037.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1425",
    //           "selection_id": 0,
    //           "price": 0,
    //           "id": 1520,
    //           "name": "Mirinda 2.25",
    //           "title": "Mirinda 2.25",
    //           "imageThumbnail": "/imagestemp/itm610038.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 0,
    //           "option_id": "1425",
    //           "selection_id": 0,
    //           "price": 21,
    //           "id": 1513,
    //           "name": "Orange Juice 1L",
    //           "title": "Orange Juice 1L",
    //           "imageThumbnail": "/imagestemp/itm610033.png",
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
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
    //   "items": [],
    //   "sku": 118,
    //   "imageSmall": "/d/u/dummy-product.png",
    //   "imageThumbnail": "/d/u/dummy-product.png",
    //   "image": "/d/u/dummy-product.png",
    //   "taxClassId": 2,
    //   "virtualGroup": 0,
    //   "visibility": 4,
    //   "sel1Value": 0,
    //   "sel2Value": 0,
    //   "sel3Value": -1,
    //   "associative": 0
    // }

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