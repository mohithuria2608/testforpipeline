import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as SDM from './sdm';

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    let a: IMenuGrpcRequest.IFetchMenuRes

    // let items = [
    //   {
    //     "id": 1728,
    //     "position": 3,
    //     "name": "Super Mega Deal",
    //     "description": "12 chicken pcs & Family fries",
    //     "inSide": 1,
    //     "finalPrice": 49,
    //     "specialPrice": 49,
    //     "catId": 21,
    //     "metaKeyword": [
    //       "Super Mega Deal"
    //     ],
    //     "bundleProductOptions": [
    //       {
    //         "position": 1,
    //         "name": "Choice of flavor",
    //         "title": "Choice of flavor",
    //         "subtitle": "Choice of flavor",
    //         "ingredient": 0,
    //         "isModifier": 0,
    //         "compId": 1,
    //         "type": "radio",
    //         "productLinks": [
    //           {
    //             "position": 1,
    //             "option_id": 1436,
    //             "selection_id": 11190,
    //             "price": 0,
    //             "id": 1642,
    //             "name": "Super Mega Deal - Original",
    //             "title": "Super Mega Deal - Original",
    //             "modGroupId": -1,
    //             "imageThumbnail": "/imagestemp/itm413002.png",
    //             "selectionQty": 12,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 1,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 2,
    //             "option_id": 1436,
    //             "selection_id": 11191,
    //             "price": 0,
    //             "id": 1643,
    //             "name": "Super Mega Deal - Spicy",
    //             "title": "Super Mega Deal - Spicy",
    //             "modGroupId": -1,
    //             "imageThumbnail": "/imagestemp/itm413003.png",
    //             "selectionQty": 12,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 3,
    //             "option_id": 1436,
    //             "selection_id": 11192,
    //             "price": 0,
    //             "id": 1709,
    //             "name": "Super Mega Deal - Mix",
    //             "title": "Super Mega Deal - Mix",
    //             "modGroupId": -1,
    //             "imageThumbnail": "/imagestemp/itm413004.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 1,
    //             "default": 0,
    //             "dependentSteps": [
    //               2
    //             ]
    //           }
    //         ],
    //         "maximumQty": 0,
    //         "minimumQty": 0,
    //         "isDependent": 0
    //       },
    //       {
    //         "position": 2,
    //         "name": "Choice of Chicken",
    //         "title": "Choice of Chicken",
    //         "subtitle": "Select 12 Pieces of your favorite flavor",
    //         "ingredient": 0,
    //         "type": "stepper",
    //         "isModifier": 1,
    //         "compId": 1,
    //         "productLinks": [
    //           {
    //             "option_id": 1437,
    //             "selection_id": 0,
    //             "price": 0,
    //             "selected": 1,
    //             "modGroupId": 10217,
    //             "name": "Chicken Pc - Original",
    //             "title": "Chicken Pc - Original",
    //             "id": 1644,
    //             "sku": 910001,
    //             "selectionQty": 6
    //           },
    //           {
    //             "option_id": 1437,
    //             "selection_id": 0,
    //             "price": 0,
    //             "selected": 0,
    //             "modGroupId": 10217,
    //             "name": "Chicken Pc - Spicy",
    //             "title": "Chicken Pc - Spicy",
    //             "id": 1645,
    //             "sku": 910002,
    //             "selectionQty": 6
    //           }
    //         ],
    //         "maximumQty": 12,
    //         "minimumQty": 12,
    //         "isDependent": 1
    //       },
    //       {
    //         "position": 3,
    //         "name": "Choice of side item",
    //         "title": "Choice of side item",
    //         "subtitle": "Choice of side item",
    //         "ingredient": 0,
    //         "type": "radio",
    //         "isModifier": 0,
    //         "compId": 2,
    //         "productLinks": [
    //           {
    //             "position": 1,
    //             "option_id": 1437,
    //             "selection_id": 11193,
    //             "price": 0,
    //             "id": 1632,
    //             "name": "Family Fries",
    //             "title": "Family Fries",
    //             "modGroupId": -1,
    //             "imageThumbnail": "/imagestemp/itm510005.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 1,
    //             "default": 1,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 2,
    //             "option_id": 1437,
    //             "selection_id": 11194,
    //             "price": 3,
    //             "id": 1635,
    //             "name": "Family Fries Spicy",
    //             "title": "Family Fries Spicy",
    //             "modGroupId": -1,
    //             "imageThumbnail": "/imagestemp/itm510014.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 3,
    //             "option_id": 1437,
    //             "selection_id": 11195,
    //             "price": 5,
    //             "id": 1629,
    //             "name": "Loaded Fries Family",
    //             "title": "Loaded Fries Family",
    //             "modGroupId": -1,
    //             "imageThumbnail": "/imagestemp/itm510030.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 4,
    //             "option_id": 1437,
    //             "selection_id": 11196,
    //             "price": 6,
    //             "id": 1638,
    //             "name": "Family Dipper Fries",
    //             "title": "Family Dipper Fries",
    //             "modGroupId": -1,
    //             "imageThumbnail": "/imagestemp/itm510074.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           }
    //         ],
    //         "maximumQty": 0,
    //         "minimumQty": 0,
    //         "isDependent": 0
    //       }
    //     ],
    //     "selectedItem": 0,
    //     "configurableProductOptions": [],
    //     "typeId": "bundle",
    //     "originalTypeId": "bundle",
    //     "items": [],
    //     "sku": 900067,
    //     "promoId": 55,
    //     "imageSmall": "/imagestemp/itm1.png",
    //     "imageThumbnail": "/imagestemp/itm1.png",
    //     "image": "/imagestemp/itm1.png",
    //     "taxClassId": 2,
    //     "virtualGroup": 16298,
    //     "visibility": 4,
    //     "associative": 0
    //   },
    //   {
    //     "id": 1696,
    //     "position": 13,
    //     "name": "Pepsi",
    //     "description": "Soft Drink",
    //     "inSide": 0,
    //     "finalPrice": 9,
    //     "specialPrice": 9,
    //     "catId": 36,
    //     "metaKeyword": [
    //       "Pepsi"
    //     ],
    //     "bundleProductOptions": [],
    //     "selectedItem": 600003,
    //     "configurableProductOptions": [
    //       {
    //         "id": 144,
    //         "position": 1,
    //         "name": "Choose your Size",
    //         "title": "Choose your Size",
    //         "subtitle": "Choose your Size",
    //         "selIndex": 1,
    //         "options": [
    //           {
    //             "isSelected": 0,
    //             "position": 1,
    //             "name": "Regular",
    //             "title": "Regular",
    //             "id": 16285
    //           },
    //           {
    //             "isSelected": 1,
    //             "position": 2,
    //             "name": "Medium",
    //             "title": "Medium",
    //             "id": 16287
    //           },
    //           {
    //             "isSelected": 0,
    //             "position": 3,
    //             "name": "Large",
    //             "title": "Large",
    //             "id": 16286
    //           }
    //         ]
    //       }
    //     ],
    //     "typeId": "configurable",
    //     "originalTypeId": "configurable",
    //     "items": [
    //       {
    //         "id": 1604,
    //         "position": 0,
    //         "name": "Pepsi Regular",
    //         "title": "Pepsi Regular",
    //         "description": "",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "finalPrice": 8,
    //         "specialPrice": 8,
    //         "metaKeyword": [],
    //         "typeId": "simple",
    //         "sel1Value": 16285,
    //         "sel2Value": -1,
    //         "sel3Value": -1,
    //         "sku": 600002
    //       },
    //       {
    //         "id": 1605,
    //         "position": 0,
    //         "name": "Pepsi Medium",
    //         "title": "Pepsi Medium",
    //         "description": "",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "finalPrice": 9,
    //         "specialPrice": 9,
    //         "metaKeyword": [],
    //         "typeId": "simple",
    //         "sel1Value": 16287,
    //         "sel2Value": -1,
    //         "sel3Value": -1,
    //         "sku": 600003
    //       },
    //       {
    //         "id": 1606,
    //         "position": 0,
    //         "name": "Pepsi Large",
    //         "title": "Pepsi Large",
    //         "description": "",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "finalPrice": 10,
    //         "specialPrice": 10,
    //         "metaKeyword": [],
    //         "typeId": "simple",
    //         "sel1Value": 16286,
    //         "sel2Value": -1,
    //         "sel3Value": -1,
    //         "sku": 600004
    //       }
    //     ],
    //     "sku": 1,
    //     "imageSmall": "/imagestemp/itm600041.png",
    //     "imageThumbnail": "/imagestemp/itm600041.png",
    //     "image": "/imagestemp/itm600041.png",
    //     "taxClassId": 2,
    //     "virtualGroup": 0,
    //     "visibility": 4,
    //     "associative": 0
    //   },
    //   {
    //     "id": 1658,
    //     "position": 16,
    //     "name": "Mighty Original",
    //     "description": "2 chicken breast fillets with KFC’s, cheese, lettuce, spicy mayo in a round bun",
    //     "inSide": 1,
    //     "finalPrice": 18,
    //     "specialPrice": 18,
    //     "catId": 34,
    //     "metaKeyword": [
    //       "Mighty Original"
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
    //                 "option_id": 1719,
    //                 "selection_id": 0,
    //                 "price": 2,
    //                 "selected": 1,
    //                 "name": "Regular",
    //                 "title": "Regular",
    //                 "id": 1717,
    //                 "sku": 8100012
    //               },
    //               {
    //                 "option_id": 1719,
    //                 "selection_id": 0,
    //                 "price": 4,
    //                 "selected": 0,
    //                 "name": "Extra",
    //                 "title": "Extra",
    //                 "id": 1718,
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
    //                 "selected": 0,
    //                 "name": "Regular",
    //                 "title": "Regular",
    //                 "id": 1721,
    //                 "sku": 8117012
    //               },
    //               {
    //                 "option_id": 1723,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 1,
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
    //     "sku": 110025,
    //     "imageSmall": "/imagestemp/vrg15.png",
    //     "imageThumbnail": "/imagestemp/vrg15.png",
    //     "image": "/imagestemp/vrg15.png",
    //     "taxClassId": 2,
    //     "virtualGroup": 16298,
    //     "visibility": 4,
    //     "associative": 0
    //   },
    //   {
    //     "id": 1599,
    //     "position": 14,
    //     "name": "Fresh Orange Juice",
    //     "description": "",
    //     "inSide": 0,
    //     "finalPrice": 13,
    //     "specialPrice": 13,
    //     "catId": 36,
    //     "metaKeyword": [
    //       "Fresh Orange Juice"
    //     ],
    //     "bundleProductOptions": [],
    //     "selectedItem": 0,
    //     "configurableProductOptions": [],
    //     "typeId": "simple",
    //     "originalTypeId": "simple",
    //     "items": [],
    //     "sku": 610020,
    //     "imageSmall": "/imagestemp/itm613001.png",
    //     "imageThumbnail": "/imagestemp/itm613001.png",
    //     "image": "/imagestemp/itm613001.png",
    //     "taxClassId": 2,
    //     "virtualGroup": 0,
    //     "visibility": 4,
    //     "associative": 0
    //   },
    //   {
    //     "id": 33,
    //     "position": 6,
    //     "name": "Bucket 15 Pcs",
    //     "description": "15 chicken pcs., family size coleslaw, family size fries,5 buns & 2.25 liters drink",
    //     "inSide": 1,
    //     "finalPrice": 90,
    //     "specialPrice": 90,
    //     "catId": 35,
    //     "metaKeyword": [
    //       "Bucket 15 Pcs"
    //     ],
    //     "bundleProductOptions": [
    //       {
    //         "position": 1,
    //         "name": "Choice of flavor",
    //         "title": "Choice of flavor",
    //         "subtitle": "Choice of flavor",
    //         "ingredient": 0,
    //         "type": "radio",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "productLinks": [
    //           {
    //             "position": 1,
    //             "option_id": 1591,
    //             "selection_id": 12120,
    //             "price": 0,
    //             "id": 1687,
    //             "name": "Bucket 15 Pcs - Original",
    //             "title": "Bucket 15 Pcs - Original",
    //             "imageThumbnail": "/imagestemp/itm410001.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 1,
    //             "default": 1,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 2,
    //             "option_id": 1591,
    //             "selection_id": 12121,
    //             "price": 0,
    //             "id": 1688,
    //             "name": "Bucket 15 Pcs - Spicy",
    //             "title": "Bucket 15 Pcs - Spicy",
    //             "imageThumbnail": "/imagestemp/itm410002.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 3,
    //             "option_id": 1591,
    //             "selection_id": 12122,
    //             "price": 0,
    //             "id": 1714,
    //             "name": "Bucket 15 Pcs - Mix",
    //             "title": "Bucket 15 Pcs - Mix",
    //             "imageThumbnail": "/imagestemp/itm410003.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": [
    //               2
    //             ]
    //           }
    //         ],
    //         "maximumQty": 0,
    //         "minimumQty": 0,
    //         "isDependent": 0
    //       },
    //       {
    //         "position": 2,
    //         "name": "Choice of Chicken",
    //         "title": "Choice of Chicken",
    //         "subtitle": "Select 15 peices of your favorite flavor",
    //         "ingredient": 0,
    //         "type": "stepper",
    //         "imageThumbnail": "/imagestemp/itm410003.png",
    //         "productLinks": [
    //           {
    //             "option_id": 1592,
    //             "selection_id": 0,
    //             "price": 0,
    //             "selected": 1,
    //             "name": "Chicken Pc - Original",
    //             "title": "Chicken Pc - Original",
    //             "id": 1644,
    //             "sku": 910001,
    //             "selectionQty": 8
    //           },
    //           {
    //             "option_id": 1592,
    //             "selection_id": 0,
    //             "price": 0,
    //             "selected": 0,
    //             "name": "Chicken Pc - Spicy",
    //             "title": "Chicken Pc - Spicy",
    //             "id": 1645,
    //             "sku": 910002,
    //             "selectionQty": 7
    //           }
    //         ],
    //         "maximumQty": 15,
    //         "minimumQty": 15,
    //         "isDependent": 1
    //       },
    //       {
    //         "position": 3,
    //         "name": "Choice of first side item",
    //         "title": "Choice of first side item",
    //         "subtitle": "Choice of first side item",
    //         "ingredient": 0,
    //         "type": "radio",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "productLinks": [
    //           {
    //             "position": 1,
    //             "option_id": 1592,
    //             "selection_id": 12123,
    //             "price": 0,
    //             "id": 1632,
    //             "name": "Family Fries",
    //             "title": "Family Fries",
    //             "imageThumbnail": "/imagestemp/itm510005.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 1,
    //             "default": 1,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 2,
    //             "option_id": 1592,
    //             "selection_id": 12124,
    //             "price": 3,
    //             "id": 1635,
    //             "name": "Family Fries Spicy",
    //             "title": "Family Fries Spicy",
    //             "imageThumbnail": "/imagestemp/itm510014.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 3,
    //             "option_id": 1592,
    //             "selection_id": 12125,
    //             "price": 5,
    //             "id": 1629,
    //             "name": "Loaded Fries Family",
    //             "title": "Loaded Fries Family",
    //             "imageThumbnail": "/imagestemp/itm510030.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 4,
    //             "option_id": 1592,
    //             "selection_id": 12126,
    //             "price": 0,
    //             "id": 1620,
    //             "name": "Coleslaw Salad Large",
    //             "title": "Coleslaw Salad Large",
    //             "imageThumbnail": "/imagestemp/itm510002.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 6,
    //             "option_id": 1592,
    //             "selection_id": 12128,
    //             "price": 6,
    //             "id": 1638,
    //             "name": "Family Dipper Fries",
    //             "title": "Family Dipper Fries",
    //             "imageThumbnail": "/imagestemp/itm510074.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           }
    //         ],
    //         "maximumQty": 0,
    //         "minimumQty": 0,
    //         "isDependent": 0
    //       },
    //       {
    //         "position": 4,
    //         "name": "Choice of second side item",
    //         "title": "Choice of second side item",
    //         "subtitle": "Choice of second side item",
    //         "ingredient": 0,
    //         "type": "radio",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "productLinks": [
    //           {
    //             "position": 1,
    //             "option_id": 1592,
    //             "selection_id": 12123,
    //             "price": 0,
    //             "id": 1632,
    //             "name": "Family Fries",
    //             "title": "Family Fries",
    //             "imageThumbnail": "/imagestemp/itm510005.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 1,
    //             "default": 1,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 2,
    //             "option_id": 1592,
    //             "selection_id": 12124,
    //             "price": 3,
    //             "id": 1635,
    //             "name": "Family Fries Spicy",
    //             "title": "Family Fries Spicy",
    //             "imageThumbnail": "/imagestemp/itm510014.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 3,
    //             "option_id": 1592,
    //             "selection_id": 12125,
    //             "price": 5,
    //             "id": 1629,
    //             "name": "Loaded Fries Family",
    //             "title": "Loaded Fries Family",
    //             "imageThumbnail": "/imagestemp/itm510030.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 4,
    //             "option_id": 1592,
    //             "selection_id": 12126,
    //             "price": 0,
    //             "id": 1620,
    //             "name": "Coleslaw Salad Large",
    //             "title": "Coleslaw Salad Large",
    //             "imageThumbnail": "/imagestemp/itm510002.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 6,
    //             "option_id": 1592,
    //             "selection_id": 12128,
    //             "price": 6,
    //             "id": 1638,
    //             "name": "Family Dipper Fries",
    //             "title": "Family Dipper Fries",
    //             "imageThumbnail": "/imagestemp/itm510074.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           }
    //         ],
    //         "maximumQty": 0,
    //         "minimumQty": 0,
    //         "isDependent": 0
    //       },
    //       {
    //         "position": 5,
    //         "name": "Choice of Beverages",
    //         "title": "Choice of Beverages",
    //         "subtitle": "Choice of Beverages",
    //         "ingredient": 0,
    //         "type": "radio",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "productLinks": [
    //           {
    //             "position": 1,
    //             "option_id": 1594,
    //             "selection_id": 12137,
    //             "price": 0,
    //             "id": 1689,
    //             "name": "Pepsi 2.25",
    //             "title": "Pepsi 2.25",
    //             "imageThumbnail": "/imagestemp/itm610034.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 1,
    //             "default": 1,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 2,
    //             "option_id": 1594,
    //             "selection_id": 12138,
    //             "price": 0,
    //             "id": 1690,
    //             "name": "7Up  2.25",
    //             "title": "7Up  2.25",
    //             "imageThumbnail": "/imagestemp/itm610035.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 3,
    //             "option_id": 1594,
    //             "selection_id": 12139,
    //             "price": 0,
    //             "id": 1691,
    //             "name": "Mountain Dew 2.25",
    //             "title": "Mountain Dew 2.25",
    //             "imageThumbnail": "/imagestemp/itm610036.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 4,
    //             "option_id": 1594,
    //             "selection_id": 12140,
    //             "price": 0,
    //             "id": 1692,
    //             "name": "Diet Pepsi 2.25",
    //             "title": "Diet Pepsi 2.25",
    //             "imageThumbnail": "/imagestemp/itm610037.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 5,
    //             "option_id": 1594,
    //             "selection_id": 12141,
    //             "price": 0,
    //             "id": 1693,
    //             "name": "Mirinda 2.25",
    //             "title": "Mirinda 2.25",
    //             "imageThumbnail": "/imagestemp/itm610038.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           },
    //           {
    //             "position": 6,
    //             "option_id": 1594,
    //             "selection_id": 12142,
    //             "price": 21,
    //             "id": 1686,
    //             "name": "Orange Juice 1L",
    //             "title": "Orange Juice 1L",
    //             "imageThumbnail": "/imagestemp/itm610033.png",
    //             "selectionQty": 1,
    //             "subOptions": [],
    //             "selected": 0,
    //             "default": 0,
    //             "dependentSteps": []
    //           }
    //         ],
    //         "maximumQty": 0,
    //         "minimumQty": 0,
    //         "isDependent": 0
    //       }
    //     ],
    //     "selectedItem": 900056,
    //     "typeId": "bundle",
    //     "originalTypeId": "bundle_group",
    //     "sku": 900056,
    //     "imageSmall": "/imagestemp/itm911505.png",
    //     "imageThumbnail": "/imagestemp/itm911505.png",
    //     "image": "/imagestemp/itm911505.png",
    //     "taxClassId": 2,
    //     "virtualGroup": 16298,
    //     "visibility": 4,
    //     "associative": 0
    //   },
    //   {
    //     "id": 17,
    //     "position": 10,
    //     "name": "Dinner Meal",
    //     "description": "3 chicken pcs., fries, coleslaw, bun & a drink",
    //     "inSide": 1,
    //     "finalPrice": 28,
    //     "specialPrice": 28,
    //     "catId": 34,
    //     "metaKeyword": [
    //       "Dinner Meal - Medium"
    //     ],
    //     "selectedItem": 900007,
    //     "configurableProductOptions": [
    //       {
    //         "id": 144,
    //         "position": 1,
    //         "title": "Choice of Size",
    //         "subtitle": "Choice of Size",
    //         "selIndex": 1,
    //         "options": [
    //           {
    //             "isSelected": 1,
    //             "position": 1,
    //             "name": "Medium",
    //             "title": "Medium",
    //             "id": 16287
    //           },
    //           {
    //             "isSelected": 0,
    //             "position": 2,
    //             "name": "Large",
    //             "title": "Large",
    //             "id": 16286
    //           }
    //         ]
    //       }
    //     ],
    //     "typeId": "bundle_group",
    //     "originalTypeId": "bundle_group",
    //     "items": [
    //       {
    //         "id": 1731,
    //         "position": 10,
    //         "name": "Dinner Meal - Medium",
    //         "title": "Dinner Meal - Medium",
    //         "description": "",
    //         "inSide": 1,
    //         "finalPrice": 28,
    //         "specialPrice": 28,
    //         "metaKeyword": [
    //           "Dinner Meal - Medium"
    //         ],
    //         "bundleProductOptions": [
    //           {
    //             "position": 1,
    //             "name": "Choice of flavor",
    //             "title": "Choice of flavor",
    //             "subtitle": "Choice of flavor",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1446,
    //                 "selection_id": 11251,
    //                 "price": 0,
    //                 "id": 1653,
    //                 "name": "Dinner Meal - Original",
    //                 "title": "Dinner Meal - Original",
    //                 "imageThumbnail": "/imagestemp/itm310001.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 1,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1446,
    //                 "selection_id": 11252,
    //                 "price": 0,
    //                 "id": 1654,
    //                 "name": "Dinner Meal - Spicy",
    //                 "title": "Dinner Meal - Spicy",
    //                 "imageThumbnail": "/imagestemp/itm310002.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1446,
    //                 "selection_id": 11253,
    //                 "price": 0,
    //                 "id": 1710,
    //                 "name": "Dinner Meal - Mix",
    //                 "title": "Dinner Meal - Mix",
    //                 "imageThumbnail": "/imagestemp/itm310003.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": [
    //                   2
    //                 ]
    //               }
    //             ],
    //             "maximumQty": 3,
    //             "minimumQty": 3,
    //             "isDependent": 0
    //           },
    //           {
    //             "position": 2,
    //             "name": "Choice of Chicken",
    //             "title": "Choice of Chicken",
    //             "subtitle": "Choice of Chicken",
    //             "ingredient": 0,
    //             "type": "stepper",
    //             "imageThumbnail": "/imagestemp/itm310003.png",
    //             "productLinks": [
    //               {
    //                 "option_id": 1447,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 1,
    //                 "name": "Chicken Pc - Original",
    //                 "title": "Chicken Pc - Original",
    //                 "id": 1644,
    //                 "sku": 910001,
    //                 "selectionQty": 2
    //               },
    //               {
    //                 "option_id": 1447,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 0,
    //                 "name": "Chicken Pc - Spicy",
    //                 "title": "Chicken Pc - Spicy",
    //                 "id": 1645,
    //                 "sku": 910002,
    //                 "selectionQty": 1
    //               }
    //             ],
    //             "maximumQty": 3,
    //             "minimumQty": 3,
    //             "isDependent": 1
    //           },
    //           {
    //             "position": 3,
    //             "name": "Choice of first side item",
    //             "title": "Choice of first side item",
    //             "subtitle": "Choice of first side item",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1448,
    //                 "selection_id": 11262,
    //                 "price": 2,
    //                 "id": 1630,
    //                 "name": "Regular Fries",
    //                 "title": "Regular Fries",
    //                 "imageThumbnail": "/imagestemp/itm510004.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1448,
    //                 "selection_id": 11263,
    //                 "price": 3,
    //                 "id": 1636,
    //                 "name": "Regular Fries Spicy",
    //                 "title": "Regular Fries Spicy",
    //                 "imageThumbnail": "/imagestemp/itm510012.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1448,
    //                 "selection_id": 11265,
    //                 "price": 3,
    //                 "id": 1639,
    //                 "name": "Potato Dipper- Regular",
    //                 "title": "Potato Dipper- Regular",
    //                 "imageThumbnail": "/imagestemp/itm510071.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               }
    //             ],
    //             "maximumQty": 0,
    //             "minimumQty": 0,
    //             "isDependent": 0
    //           },
    //           {
    //             "position": 4,
    //             "name": "Choice of second side item",
    //             "title": "Choice of second side item",
    //             "subtitle": "Choice of second side item",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1447,
    //                 "selection_id": 11254,
    //                 "price": 0,
    //                 "id": 1633,
    //                 "name": "Medium Fries",
    //                 "title": "Medium Fries",
    //                 "imageThumbnail": "/imagestemp/itm510050.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 1,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1447,
    //                 "selection_id": 11255,
    //                 "price": 1,
    //                 "id": 1637,
    //                 "name": "Medium Fries Spicy",
    //                 "title": "Medium Fries Spicy",
    //                 "imageThumbnail": "/imagestemp/itm510051.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1447,
    //                 "selection_id": 11256,
    //                 "price": 0,
    //                 "id": 1619,
    //                 "name": "Coleslaw Salad Small",
    //                 "title": "Coleslaw Salad Small",
    //                 "imageThumbnail": "/imagestemp/itm510001.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 4,
    //                 "option_id": 1447,
    //                 "selection_id": 11257,
    //                 "price": 3,
    //                 "id": 1628,
    //                 "name": "Loaded Fries Regular",
    //                 "title": "Loaded Fries Regular",
    //                 "imageThumbnail": "/imagestemp/itm510036.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 5,
    //                 "option_id": 1447,
    //                 "selection_id": 11258,
    //                 "price": 1,
    //                 "id": 1640,
    //                 "name": "Medium Dipper Fries",
    //                 "title": "Medium Dipper Fries",
    //                 "imageThumbnail": "/imagestemp/itm510072.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               }
    //             ],
    //             "maximumQty": 0,
    //             "minimumQty": 0,
    //             "isDependent": 0
    //           },
    //           {
    //             "position": 5,
    //             "name": "Choice of Beverages",
    //             "title": "Choice of Beverages",
    //             "subtitle": "Choice of Beverages",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1449,
    //                 "selection_id": 11267,
    //                 "price": 0,
    //                 "id": 1605,
    //                 "name": "Pepsi Medium",
    //                 "title": "Pepsi Medium",
    //                 "imageThumbnail": "/imagestemp/itm600003.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 1,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1449,
    //                 "selection_id": 11268,
    //                 "price": 0,
    //                 "id": 1617,
    //                 "name": "Mirinda Medium",
    //                 "title": "Mirinda Medium",
    //                 "imageThumbnail": "/imagestemp/itm600009.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1449,
    //                 "selection_id": 11269,
    //                 "price": 0,
    //                 "id": 1612,
    //                 "name": "7Up Medium",
    //                 "title": "7Up Medium",
    //                 "imageThumbnail": "/imagestemp/itm600016.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 4,
    //                 "option_id": 1449,
    //                 "selection_id": 11270,
    //                 "price": 0,
    //                 "id": 1607,
    //                 "name": "Diet Pepsi Medium",
    //                 "title": "Diet Pepsi Medium",
    //                 "imageThumbnail": "/imagestemp/itm600006.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 5,
    //                 "option_id": 1449,
    //                 "selection_id": 11271,
    //                 "price": 0,
    //                 "id": 1614,
    //                 "name": "Mountain Dew Medium",
    //                 "title": "Mountain Dew Medium",
    //                 "imageThumbnail": "/imagestemp/itm600013.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 6,
    //                 "option_id": 1449,
    //                 "selection_id": 11272,
    //                 "price": 7.5,
    //                 "id": 1600,
    //                 "name": "Mojito Krusher",
    //                 "title": "Mojito Krusher",
    //                 "imageThumbnail": "/imagestemp/itm610021.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 7,
    //                 "option_id": 1449,
    //                 "selection_id": 11273,
    //                 "price": 0,
    //                 "id": 1652,
    //                 "name": "Small Aquafina",
    //                 "title": "Small Aquafina",
    //                 "imageThumbnail": "/imagestemp/itm610011.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 8,
    //                 "option_id": 1449,
    //                 "selection_id": 11274,
    //                 "price": 8.5,
    //                 "id": 1599,
    //                 "name": "Fresh Orange Juice",
    //                 "title": "Fresh Orange Juice",
    //                 "imageThumbnail": "/imagestemp/itm610020.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               }
    //             ],
    //             "maximumQty": 0,
    //             "minimumQty": 0,
    //             "isDependent": 0
    //           }
    //         ],
    //         "typeId": "bundle",
    //         "sku": 900007,
    //         "imageSmall": "/d/u/dummy-product.png",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "image": "/d/u/dummy-product.png",
    //         "taxClassId": 2,
    //         "virtualGroup": 16298,
    //         "visibility": 4,
    //         "sel1Value": 16287,
    //         "sel2Value": -1,
    //         "sel3Value": -1,
    //         "associative": 0
    //       },
    //       {
    //         "id": 1732,
    //         "position": 11,
    //         "name": "Dinner Meal - Large",
    //         "title": "Dinner Meal - Large",
    //         "description": "",
    //         "inSide": 1,
    //         "finalPrice": 29.5,
    //         "specialPrice": 29.5,
    //         "metaKeyword": [
    //           "Dinner Meal - Large"
    //         ],
    //         "bundleProductOptions": [
    //           {
    //             "position": 1,
    //             "name": "Choice of flavor",
    //             "title": "Choice of flavor",
    //             "subtitle": "Choice of flavor",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1450,
    //                 "selection_id": 11276,
    //                 "price": 0,
    //                 "id": 1653,
    //                 "name": "Dinner Meal - Original",
    //                 "title": "Dinner Meal - Original",
    //                 "imageThumbnail": "/imagestemp/itm310001.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 1,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1450,
    //                 "selection_id": 11277,
    //                 "price": 0,
    //                 "id": 1654,
    //                 "name": "Dinner Meal - Spicy",
    //                 "title": "Dinner Meal - Spicy",
    //                 "imageThumbnail": "/imagestemp/itm310002.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1450,
    //                 "selection_id": 11278,
    //                 "price": 0,
    //                 "id": 1710,
    //                 "name": "Dinner Meal - Mix",
    //                 "title": "Dinner Meal - Mix",
    //                 "imageThumbnail": "/imagestemp/itm310003.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": [
    //                   2
    //                 ]
    //               }
    //             ],
    //             "maximumQty": 3,
    //             "minimumQty": 3,
    //             "isDependent": 0
    //           },
    //           {
    //             "position": 2,
    //             "name": "Choice of Chicken",
    //             "title": "Choice of Chicken",
    //             "subtitle": "Choice of Chicken",
    //             "ingredient": 0,
    //             "type": "stepper",
    //             "imageThumbnail": "/imagestemp/itm310003.png",
    //             "productLinks": [
    //               {
    //                 "option_id": 1451,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 1,
    //                 "name": "Chicken Pc - Original",
    //                 "title": "Chicken Pc - Original",
    //                 "id": 1644,
    //                 "sku": 910001,
    //                 "selectionQty": 2
    //               },
    //               {
    //                 "option_id": 1451,
    //                 "selection_id": 0,
    //                 "price": 0,
    //                 "selected": 0,
    //                 "name": "Chicken Pc - Spicy",
    //                 "title": "Chicken Pc - Spicy",
    //                 "id": 1645,
    //                 "sku": 910002,
    //                 "selectionQty": 1
    //               }
    //             ],
    //             "maximumQty": 3,
    //             "minimumQty": 3,
    //             "isDependent": 1
    //           },
    //           {
    //             "position": 3,
    //             "name": "Choice of first side item",
    //             "title": "Choice of first side item",
    //             "subtitle": "Choice of first side item",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1452,
    //                 "selection_id": 11287,
    //                 "price": 2,
    //                 "id": 1630,
    //                 "name": "Regular Fries",
    //                 "title": "Regular Fries",
    //                 "imageThumbnail": "/imagestemp/itm510004.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1452,
    //                 "selection_id": 11288,
    //                 "price": 3,
    //                 "id": 1636,
    //                 "name": "Regular Fries Spicy",
    //                 "title": "Regular Fries Spicy",
    //                 "imageThumbnail": "/imagestemp/itm510012.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1452,
    //                 "selection_id": 11290,
    //                 "price": 2,
    //                 "id": 1639,
    //                 "name": "Potato Dipper- Regular",
    //                 "title": "Potato Dipper- Regular",
    //                 "imageThumbnail": "/imagestemp/itm510071.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               }
    //             ],
    //             "maximumQty": 0,
    //             "minimumQty": 0,
    //             "isDependent": 0
    //           },
    //           {
    //             "position": 4,
    //             "name": "Choice of second side item",
    //             "title": "Choice of second side item",
    //             "subtitle": "Choice of second side item",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1451,
    //                 "selection_id": 11279,
    //                 "price": 0,
    //                 "id": 1631,
    //                 "name": "Large Fries",
    //                 "title": "Large Fries",
    //                 "imageThumbnail": "/imagestemp/itm510006.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 1,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1451,
    //                 "selection_id": 11280,
    //                 "price": 1,
    //                 "id": 1634,
    //                 "name": "Large Fries Spicy",
    //                 "title": "Large Fries Spicy",
    //                 "imageThumbnail": "/imagestemp/itm510013.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1451,
    //                 "selection_id": 11281,
    //                 "price": 0,
    //                 "id": 1619,
    //                 "name": "Coleslaw Salad Small",
    //                 "title": "Coleslaw Salad Small",
    //                 "imageThumbnail": "/imagestemp/itm510001.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 4,
    //                 "option_id": 1451,
    //                 "selection_id": 11282,
    //                 "price": 3,
    //                 "id": 1628,
    //                 "name": "Loaded Fries Regular",
    //                 "title": "Loaded Fries Regular",
    //                 "imageThumbnail": "/imagestemp/itm510036.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 5,
    //                 "option_id": 1451,
    //                 "selection_id": 11283,
    //                 "price": 1,
    //                 "id": 1641,
    //                 "name": "Large Dipper Fries",
    //                 "title": "Large Dipper Fries",
    //                 "imageThumbnail": "/imagestemp/itm510073.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               }
    //             ],
    //             "maximumQty": 0,
    //             "minimumQty": 0,
    //             "isDependent": 0
    //           },
    //           {
    //             "position": 5,
    //             "name": "Choice of Beverages",
    //             "title": "Choice of Beverages",
    //             "subtitle": "Choice of Beverages",
    //             "ingredient": 0,
    //             "type": "radio",
    //             "imageThumbnail": "/d/u/dummy-product.png",
    //             "productLinks": [
    //               {
    //                 "position": 1,
    //                 "option_id": 1453,
    //                 "selection_id": 11292,
    //                 "price": 0,
    //                 "id": 1606,
    //                 "name": "Pepsi Large",
    //                 "title": "Pepsi Large",
    //                 "imageThumbnail": "/imagestemp/itm600004.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 1,
    //                 "default": 1,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 2,
    //                 "option_id": 1453,
    //                 "selection_id": 11293,
    //                 "price": 0,
    //                 "id": 1618,
    //                 "name": "Mirinda Large",
    //                 "title": "Mirinda Large",
    //                 "imageThumbnail": "/imagestemp/itm600010.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 3,
    //                 "option_id": 1453,
    //                 "selection_id": 11294,
    //                 "price": 0,
    //                 "id": 1610,
    //                 "name": "7Up Large",
    //                 "title": "7Up Large",
    //                 "imageThumbnail": "/imagestemp/itm600017.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 4,
    //                 "option_id": 1453,
    //                 "selection_id": 11295,
    //                 "price": 0,
    //                 "id": 1609,
    //                 "name": "Diet Pepsi Large",
    //                 "title": "Diet Pepsi Large",
    //                 "imageThumbnail": "/imagestemp/itm600007.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 5,
    //                 "option_id": 1453,
    //                 "selection_id": 11296,
    //                 "price": 0,
    //                 "id": 1615,
    //                 "name": "Mountain Dew Large",
    //                 "title": "Mountain Dew Large",
    //                 "imageThumbnail": "/imagestemp/itm600014.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 6,
    //                 "option_id": 1453,
    //                 "selection_id": 11297,
    //                 "price": 7.5,
    //                 "id": 1600,
    //                 "name": "Mojito Krusher",
    //                 "title": "Mojito Krusher",
    //                 "imageThumbnail": "/imagestemp/itm610021.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 7,
    //                 "option_id": 1453,
    //                 "selection_id": 11298,
    //                 "price": 0,
    //                 "id": 1652,
    //                 "name": "Small Aquafina",
    //                 "title": "Small Aquafina",
    //                 "imageThumbnail": "/imagestemp/itm610011.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               },
    //               {
    //                 "position": 8,
    //                 "option_id": 1453,
    //                 "selection_id": 11299,
    //                 "price": 8.5,
    //                 "id": 1599,
    //                 "name": "Fresh Orange Juice",
    //                 "title": "Fresh Orange Juice",
    //                 "imageThumbnail": "/imagestemp/itm610020.png",
    //                 "selectionQty": 1,
    //                 "subOptions": [],
    //                 "selected": 0,
    //                 "default": 0,
    //                 "dependentSteps": []
    //               }
    //             ],
    //             "maximumQty": 0,
    //             "minimumQty": 0,
    //             "isDependent": 0
    //           }
    //         ],
    //         "typeId": "bundle",
    //         "sku": 900008,
    //         "imageSmall": "/d/u/dummy-product.png",
    //         "imageThumbnail": "/d/u/dummy-product.png",
    //         "image": "/d/u/dummy-product.png",
    //         "taxClassId": 2,
    //         "virtualGroup": 16298,
    //         "visibility": 4,
    //         "sel1Value": 16286,
    //         "sel2Value": -1,
    //         "sel3Value": -1,
    //         "associative": 0
    //       }
    //     ],
    //     "sku": 900007,
    //     "imageSmall": "/imagestemp/vrg15.png",
    //     "imageThumbnail": "/imagestemp/vrg15.png",
    //     "image": "/imagestemp/vrg15.png",
    //     "taxClassId": 2,
    //     "virtualGroup": 16298,
    //     "visibility": 4,
    //     "associative": 0
    //   }
    // ]

    let items = [
      {
        "id": 18,
        "position": 21,
        "name": "Twister Meal",
        "description": "Twister Sandwich, Fries & Drink",
        "inSide": 1,
        "finalPrice": 18,
        "specialPrice": 18,
        "catId": 34,
        "metaKeyword": [
          "Twister Meal - Medium"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "name": "Choice of flavor",
            "title": "Choice of flavor",
            "subtitle": "Choice of flavor",
            "ingredient": 0,
            "type": "radio",
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1454,
                "selection_id": 11301,
                "price": 0,
                "id": 1648,
                "name": "Twister Sandwich - Original",
                "title": "Twister Sandwich - Original",
                "imageThumbnail": "/imagestemp/itm110003.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 1,
                "default": 1,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1454,
                "selection_id": 11302,
                "price": 0,
                "id": 1649,
                "name": "Twister Sandwich - Spicy",
                "title": "Twister Sandwich - Spicy",
                "imageThumbnail": "/imagestemp/itm110002.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 2,
            "name": "Cheese",
            "title": "Cheese",
            "subtitle": "Cheese",
            "ingredient": 1,
            "type": "checkbox",
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1455,
                "selection_id": 11303,
                "price": 2,
                "id": 1719,
                "name": "American Cheese",
                "title": "American Cheese",
                "imageThumbnail": "/imagestemp/itm810001.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1716,
                    "sku": 8100011
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 2,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1717,
                    "sku": 8100012
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 4,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1718,
                    "sku": 8100013
                  }
                ],
                "selected": 1,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1455,
                "selection_id": 11304,
                "price": 0,
                "id": 1723,
                "name": "Lettuce",
                "title": "Lettuce",
                "imageThumbnail": "/imagestemp/itm811701.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1720,
                    "sku": 8117011
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1721,
                    "sku": 8117012
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1722,
                    "sku": 8117013
                  }
                ],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 3,
                "option_id": 1455,
                "selection_id": 11305,
                "price": 0,
                "id": 1727,
                "name": "Tomato",
                "title": "Tomato",
                "imageThumbnail": "/imagestemp/itm811703.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1724,
                    "sku": 8117031
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1725,
                    "sku": 8117032
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1726,
                    "sku": 8117033
                  }
                ],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 3,
            "name": "Choice of side item",
            "title": "Choice of side item",
            "subtitle": "Choice of side item",
            "ingredient": 0,
            "type": "radio",
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1456,
                "selection_id": 11309,
                "price": 0,
                "id": 1633,
                "name": "Medium Fries",
                "title": "Medium Fries",
                "imageThumbnail": "/imagestemp/itm510050.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 1,
                "default": 1,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1456,
                "selection_id": 11310,
                "price": 1,
                "id": 1637,
                "name": "Medium Fries Spicy",
                "title": "Medium Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510051.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 3,
                "option_id": 1456,
                "selection_id": 11311,
                "price": 0,
                "id": 1619,
                "name": "Coleslaw Salad Small",
                "title": "Coleslaw Salad Small",
                "imageThumbnail": "/imagestemp/itm510001.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 4,
                "option_id": 1456,
                "selection_id": 11312,
                "price": 3,
                "id": 1628,
                "name": "Loaded Fries Regular",
                "title": "Loaded Fries Regular",
                "imageThumbnail": "/imagestemp/itm510036.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 5,
                "option_id": 1456,
                "selection_id": 11313,
                "price": 1,
                "id": 1640,
                "name": "Medium Dipper Fries",
                "title": "Medium Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510072.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 6,
                "option_id": 1456,
                "selection_id": 11314,
                "price": 5,
                "id": 1650,
                "name": "Cheese Potato Dipper",
                "title": "Cheese Potato Dipper",
                "imageThumbnail": "/imagestemp/itm510075.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 7,
                "option_id": 1456,
                "selection_id": 11315,
                "price": 3,
                "id": 1651,
                "name": "Loaded Fries P.Chili Reg",
                "title": "Loaded Fries P.Chili Reg",
                "imageThumbnail": "/imagestemp/itm510079.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 4,
            "name": "Choice of Beverages",
            "title": "Choice of Beverages",
            "subtitle": "Choice of Beverages",
            "ingredient": 0,
            "type": "radio",
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1457,
                "selection_id": 11316,
                "price": 0,
                "id": 1605,
                "name": "Pepsi Medium",
                "title": "Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600003.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 1,
                "default": 1,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1457,
                "selection_id": 11317,
                "price": 0,
                "id": 1617,
                "name": "Mirinda Medium",
                "title": "Mirinda Medium",
                "imageThumbnail": "/imagestemp/itm600009.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 3,
                "option_id": 1457,
                "selection_id": 11318,
                "price": 0,
                "id": 1612,
                "name": "7Up Medium",
                "title": "7Up Medium",
                "imageThumbnail": "/imagestemp/itm600016.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 4,
                "option_id": 1457,
                "selection_id": 11319,
                "price": 0,
                "id": 1607,
                "name": "Diet Pepsi Medium",
                "title": "Diet Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600006.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 5,
                "option_id": 1457,
                "selection_id": 11320,
                "price": 0,
                "id": 1614,
                "name": "Mountain Dew Medium",
                "title": "Mountain Dew Medium",
                "imageThumbnail": "/imagestemp/itm600013.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 6,
                "option_id": 1457,
                "selection_id": 11321,
                "price": 7.5,
                "id": 1600,
                "name": "Mojito Krusher",
                "title": "Mojito Krusher",
                "imageThumbnail": "/imagestemp/itm610021.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 7,
                "option_id": 1457,
                "selection_id": 11322,
                "price": 0,
                "id": 1652,
                "name": "Small Aquafina",
                "title": "Small Aquafina",
                "imageThumbnail": "/imagestemp/itm610011.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 8,
                "option_id": 1457,
                "selection_id": 11323,
                "price": 8.5,
                "id": 1599,
                "name": "Fresh Orange Juice",
                "title": "Fresh Orange Juice",
                "imageThumbnail": "/imagestemp/itm610020.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 9,
                "option_id": 1457,
                "selection_id": 11324,
                "price": 3,
                "id": 1655,
                "name": "Lemon Mint Ice Tea",
                "title": "Lemon Mint Ice Tea",
                "imageThumbnail": "/imagestemp/itm610019.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 10,
                "option_id": 1457,
                "selection_id": 11325,
                "price": 0,
                "id": 1656,
                "name": "Pepsi Can",
                "title": "Pepsi Can",
                "imageThumbnail": "/imagestemp/itm600001.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              },
              {
                "position": 11,
                "option_id": 1457,
                "selection_id": 11326,
                "price": 0,
                "id": 1657,
                "name": "Pepsi 500ML",
                "title": "Pepsi 500ML",
                "imageThumbnail": "/imagestemp/itm610000.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "default": 0,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          }
        ],
        "selectedItem": 900014,
        "configurableProductOptions": [
          {
            "id": 144,
            "position": 1,
            "title": "Choice of Size",
            "subtitle": "Choice of Size",
            "selIndex": 1,
            "options": [
              {
                "isSelected": 1,
                "position": 1,
                "name": "Medium",
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 0,
                "position": 2,
                "name": "Large",
                "title": "Large",
                "id": 16286
              }
            ]
          }
        ],
        "typeId": "bundle_group",
        "originalTypeId": "bundle_group",
        "items": [
          {
            "id": 1733,
            "position": 21,
            "name": "Twister Meal - Medium",
            "title": "Twister Meal - Medium",
            "description": "",
            "inSide": 1,
            "finalPrice": 18,
            "specialPrice": 18,
            "metaKeyword": [
              "Twister Meal - Medium"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of flavor",
                "title": "Choice of flavor",
                "subtitle": "Choice of flavor",
                "ingredient": 0,
                "type": "radio",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1454,
                    "selection_id": 11301,
                    "price": 0,
                    "id": 1648,
                    "name": "Twister Sandwich - Original",
                    "title": "Twister Sandwich - Original",
                    "imageThumbnail": "/imagestemp/itm110003.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 1,
                    "default": 1,
                    "dependentSteps": [
                      2
                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1454,
                    "selection_id": 11302,
                    "price": 0,
                    "id": 1649,
                    "name": "Twister Sandwich - Spicy",
                    "title": "Twister Sandwich - Spicy",
                    "imageThumbnail": "/imagestemp/itm110002.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": [
                      2
                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Cheese",
                "title": "Cheese",
                "subtitle": "Cheese",
                "ingredient": 1,
                "type": "checkbox",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1573,
                    "selection_id": 12020,
                    "price": 0,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 1,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013
                      }
                    ],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 2,
                    "option_id": 1573,
                    "selection_id": 12021,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013
                      }
                    ],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 3,
                    "option_id": 1573,
                    "selection_id": 12022,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033
                      }
                    ],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 1
              },
              {
                "position": 3,
                "name": "Choice of side item",
                "title": "Choice of side item",
                "subtitle": "Choice of side item",
                "ingredient": 0,
                "type": "radio",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1456,
                    "selection_id": 11309,
                    "price": 0,
                    "id": 1633,
                    "name": "Medium Fries",
                    "title": "Medium Fries",
                    "imageThumbnail": "/imagestemp/itm510050.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 1,
                    "default": 1,
                    "dependentSteps": []
                  },
                  {
                    "position": 2,
                    "option_id": 1456,
                    "selection_id": 11310,
                    "price": 1,
                    "id": 1637,
                    "name": "Medium Fries Spicy",
                    "title": "Medium Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510051.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 3,
                    "option_id": 1456,
                    "selection_id": 11311,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 4,
                    "option_id": 1456,
                    "selection_id": 11312,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 5,
                    "option_id": 1456,
                    "selection_id": 11313,
                    "price": 1,
                    "id": 1640,
                    "name": "Medium Dipper Fries",
                    "title": "Medium Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510072.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 6,
                    "option_id": 1456,
                    "selection_id": 11314,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 7,
                    "option_id": 1456,
                    "selection_id": 11315,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choice of Beverages",
                "title": "Choice of Beverages",
                "subtitle": "Choice of Beverages",
                "ingredient": 0,
                "type": "radio",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1457,
                    "selection_id": 11316,
                    "price": 0,
                    "id": 1605,
                    "name": "Pepsi Medium",
                    "title": "Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600003.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 1,
                    "default": 1,
                    "dependentSteps": []
                  },
                  {
                    "position": 2,
                    "option_id": 1457,
                    "selection_id": 11317,
                    "price": 0,
                    "id": 1617,
                    "name": "Mirinda Medium",
                    "title": "Mirinda Medium",
                    "imageThumbnail": "/imagestemp/itm600009.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 3,
                    "option_id": 1457,
                    "selection_id": 11318,
                    "price": 0,
                    "id": 1612,
                    "name": "7Up Medium",
                    "title": "7Up Medium",
                    "imageThumbnail": "/imagestemp/itm600016.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 4,
                    "option_id": 1457,
                    "selection_id": 11319,
                    "price": 0,
                    "id": 1607,
                    "name": "Diet Pepsi Medium",
                    "title": "Diet Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600006.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 5,
                    "option_id": 1457,
                    "selection_id": 11320,
                    "price": 0,
                    "id": 1614,
                    "name": "Mountain Dew Medium",
                    "title": "Mountain Dew Medium",
                    "imageThumbnail": "/imagestemp/itm600013.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 6,
                    "option_id": 1457,
                    "selection_id": 11321,
                    "price": 7.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 7,
                    "option_id": 1457,
                    "selection_id": 11322,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 8,
                    "option_id": 1457,
                    "selection_id": 11323,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 9,
                    "option_id": 1457,
                    "selection_id": 11324,
                    "price": 3,
                    "id": 1655,
                    "name": "Lemon Mint Ice Tea",
                    "title": "Lemon Mint Ice Tea",
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 10,
                    "option_id": 1457,
                    "selection_id": 11325,
                    "price": 0,
                    "id": 1656,
                    "name": "Pepsi Can",
                    "title": "Pepsi Can",
                    "imageThumbnail": "/imagestemp/itm600001.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 11,
                    "option_id": 1457,
                    "selection_id": 11326,
                    "price": 0,
                    "id": 1657,
                    "name": "Pepsi 500ML",
                    "title": "Pepsi 500ML",
                    "imageThumbnail": "/imagestemp/itm610000.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "sku": 900014,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          },
          {
            "id": 1734,
            "position": 22,
            "name": "Twister Meal - Large",
            "title": "Twister Meal - Large",
            "description": "",
            "inSide": 1,
            "finalPrice": 19.5,
            "specialPrice": 19.5,
            "metaKeyword": [
              "Twister Meal - Large"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of flavor",
                "title": "Choice of flavor",
                "subtitle": "Choice of flavor",
                "ingredient": 0,
                "type": "radio",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1458,
                    "selection_id": 11327,
                    "price": 0,
                    "id": 1648,
                    "name": "Twister Sandwich - Original",
                    "title": "Twister Sandwich - Original",
                    "imageThumbnail": "/imagestemp/itm110003.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 1,
                    "default": 1,
                    "dependentSteps": [
                      2
                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1458,
                    "selection_id": 11328,
                    "price": 0,
                    "id": 1649,
                    "name": "Twister Sandwich - Spicy",
                    "title": "Twister Sandwich - Spicy",
                    "imageThumbnail": "/imagestemp/itm110002.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": [
                      2
                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Cheese",
                "title": "Cheese",
                "subtitle": "Cheese",
                "ingredient": 1,
                "type": "checkbox",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1573,
                    "selection_id": 12020,
                    "price": 0,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 1,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013
                      }
                    ],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 2,
                    "option_id": 1573,
                    "selection_id": 12021,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013
                      }
                    ],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 3,
                    "option_id": 1573,
                    "selection_id": 12022,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033
                      }
                    ],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 1
              },
              {
                "position": 3,
                "name": "Choice of side item",
                "title": "Choice of side item",
                "subtitle": "Choice of side item",
                "ingredient": 0,
                "type": "radio",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1460,
                    "selection_id": 11335,
                    "price": 0,
                    "id": 1631,
                    "name": "Large Fries",
                    "title": "Large Fries",
                    "imageThumbnail": "/imagestemp/itm510006.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 1,
                    "default": 1,
                    "dependentSteps": []
                  },
                  {
                    "position": 2,
                    "option_id": 1460,
                    "selection_id": 11336,
                    "price": 1,
                    "id": 1634,
                    "name": "Large Fries Spicy",
                    "title": "Large Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510013.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 3,
                    "option_id": 1460,
                    "selection_id": 11337,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 4,
                    "option_id": 1460,
                    "selection_id": 11338,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 5,
                    "option_id": 1460,
                    "selection_id": 11339,
                    "price": 1,
                    "id": 1641,
                    "name": "Large Dipper Fries",
                    "title": "Large Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510073.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 6,
                    "option_id": 1460,
                    "selection_id": 11340,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 7,
                    "option_id": 1460,
                    "selection_id": 11341,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choice of Beverages",
                "title": "Choice of Beverages",
                "subtitle": "Choice of Beverages",
                "ingredient": 0,
                "type": "radio",
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1461,
                    "selection_id": 11342,
                    "price": 0,
                    "id": 1606,
                    "name": "Pepsi Large",
                    "title": "Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600004.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 1,
                    "default": 1,
                    "dependentSteps": []
                  },
                  {
                    "position": 2,
                    "option_id": 1461,
                    "selection_id": 11343,
                    "price": 0,
                    "id": 1618,
                    "name": "Mirinda Large",
                    "title": "Mirinda Large",
                    "imageThumbnail": "/imagestemp/itm600010.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 3,
                    "option_id": 1461,
                    "selection_id": 11344,
                    "price": 0,
                    "id": 1610,
                    "name": "7Up Large",
                    "title": "7Up Large",
                    "imageThumbnail": "/imagestemp/itm600017.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 4,
                    "option_id": 1461,
                    "selection_id": 11345,
                    "price": 0,
                    "id": 1609,
                    "name": "Diet Pepsi Large",
                    "title": "Diet Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600007.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 5,
                    "option_id": 1461,
                    "selection_id": 11346,
                    "price": 0,
                    "id": 1615,
                    "name": "Mountain Dew Large",
                    "title": "Mountain Dew Large",
                    "imageThumbnail": "/imagestemp/itm600014.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 6,
                    "option_id": 1461,
                    "selection_id": 11347,
                    "price": 7.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 7,
                    "option_id": 1461,
                    "selection_id": 11348,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 8,
                    "option_id": 1461,
                    "selection_id": 11349,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 9,
                    "option_id": 1461,
                    "selection_id": 11350,
                    "price": 3,
                    "id": 1655,
                    "name": "Lemon Mint Ice Tea",
                    "title": "Lemon Mint Ice Tea",
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 10,
                    "option_id": 1461,
                    "selection_id": 11351,
                    "price": 0,
                    "id": 1656,
                    "name": "Pepsi Can",
                    "title": "Pepsi Can",
                    "imageThumbnail": "/imagestemp/itm600001.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  },
                  {
                    "position": 11,
                    "option_id": 1461,
                    "selection_id": 11352,
                    "price": 0,
                    "id": 1657,
                    "name": "Pepsi 500ML",
                    "title": "Pepsi 500ML",
                    "imageThumbnail": "/imagestemp/itm610000.png",
                    "selectionQty": 1,
                    "subOptions": [],
                    "selected": 0,
                    "default": 0,
                    "dependentSteps": []
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "sku": 900015,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          }
        ],
        "sku": 900014,
        "imageSmall": "/imagestemp/vrg15.png",
        "imageThumbnail": "/imagestemp/vrg15.png",
        "image": "/imagestemp/vrg15.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      }
    ]
    let Entries = {
      CEntry: []
    }

    items.forEach(product => {
      let instanceId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      if (product.originalTypeId == "simple") {
        if (product.typeId == "simple") {
          // "name": "Fresh Orange Juice"
          Entries.CEntry.push({
            ItemID: product.id,
            Level: 0,
            ModCode: "NONE",
            Name: product.name,
            OrdrMode: "OM_SAVED",
            Price: product.specialPrice,
            Status: "NOTAPPLIED",
          })
        } else if (product.typeId == "bundle") {
          // "name": "Mighty Original",
          let obj = {
            DealID: 0,
            Entries: {
              CEntry: []
            },
            ID: 0,
            ItemID: product.id,
            ModCode: "NONE",
            Name: product.name,
            QCComponent: "",
            QCInstanceID: instanceId,
            QCLevel: 0,
            QCProID: 0,
          }
          if (product.bundleProductOptions && product.bundleProductOptions.length > 0) {
            product.bundleProductOptions.forEach(bpo => {
              if (bpo && bpo.productLinks.length > 0) {
                bpo.productLinks.forEach(pl => {
                  if (pl.selected == 1) {
                    if (pl.subOptions && pl.subOptions.length > 0) {
                      pl.subOptions.forEach(so => {
                        if (so.selected == 1) {
                          if (so.title == "None") {

                          } else if (so.title == "Regular") {
                            obj.Entries.CEntry.push({
                              ID: 0,
                              ItemID: so.id,
                              ModCode: "WITH",
                              ModgroupID: 0,
                              Name: so.name,
                              OrdrMode: "OM_SAVED",
                              Weight: 0,
                            })
                          } else if (so.title == "Extra") {
                            obj.Entries.CEntry.push({
                              ID: 0,
                              ItemID: so.id,
                              ModCode: "WITH",
                              ModgroupID: 0,
                              Name: so.name,
                              OrdrMode: "OM_SAVED",
                              Weight: 0,
                            }, {
                              ID: 0,
                              ItemID: so.id,
                              ModCode: "WITH",
                              ModgroupID: 0,
                              Name: so.name,
                              OrdrMode: "OM_SAVED",
                              Weight: 0,
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
          Entries.CEntry.push(obj)
        }
      }
      else if (product.originalTypeId == "configurable") {
        // "name": "Pepsi",
        if (product.items && product.items.length > 0) {
          product.items.forEach(i => {
            if (i['sku'] == product.selectedItem) {
              Entries.CEntry.push({
                ItemID: i.id,
                Level: 0,
                ModCode: "NONE",
                Name: i.name,
                OrdrMode: "OM_SAVED",
                Price: i.specialPrice,
                Status: "NOTAPPLIED",
              })
            }
          })
        }
      }
      else if (product.originalTypeId == "bundle") {
        if (product.typeId == "bundle") {
          // "name": "Super Mega Deal",
          if (product.bundleProductOptions && product.bundleProductOptions.length > 0) {
            product.bundleProductOptions.forEach(bpo => {
              if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                bpo.productLinks.forEach(pl => {
                  if (pl.selected == 1) {
                    if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                      let obj = {
                        DealID: 0,
                        Entries: {
                          CEntry: []
                        },
                        ID: 0,
                        ItemID: pl.id,
                        ModCode: "NONE",
                        Name: pl.name,
                        QCComponent: "",
                        QCInstanceID: instanceId,
                        QCLevel: 0,
                        QCProID: 0,
                      }
                      product.bundleProductOptions.forEach(plbpo => {
                        if (plbpo.position == pl.dependentSteps[0]) {
                          if (plbpo.type == "stepper") {
                            plbpo.productLinks.forEach(plbpopl => {
                              for (let i = 0; i < plbpopl.selectionQty; i++) {
                                obj.Entries.CEntry.push({
                                  DealID: 0,
                                  ID: 0,
                                  ItemID: plbpopl.id,
                                  ModCode: "NONE",
                                  Name: plbpopl.name,
                                  QCComponent: 0,
                                  QCInstanceID: instanceId,
                                  QCLevel: 0,
                                  QCProID: 0,
                                })
                              }
                            })
                          }
                        }
                      })
                      Entries.CEntry.push(obj)
                    } else {
                      for (let i = 0; i < pl.selectionQty; i++) {
                        Entries.CEntry.push({
                          DealID: 0,
                          ID: 0,
                          ItemID: pl.id,
                          ModCode: "NONE",
                          Name: pl.name,
                          QCComponent: 0,
                          QCInstanceID: instanceId,
                          QCLevel: 0,
                          QCProID: 0,
                        })
                      }
                    }
                  }
                })
              }
            })
          }
        }
      }
      else if (product.originalTypeId == "bundle_group") {
        if (product.typeId == "bundle_group") {
          // "name": "Twister Meal",
          if (product.items && product.items.length > 0) {
            product.items.forEach(i => {
              if (i['sku'] == product.selectedItem) {
                if (i.bundleProductOptions && i.bundleProductOptions.length > 0) {
                  i.bundleProductOptions.forEach(bpo => {
                    if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                      bpo.productLinks.forEach(pl => {
                        if (pl.selected == 1) {
                          if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                            let obj = {
                              DealID: 0,
                              Entries: {
                                CEntry: []
                              },
                              ID: 0,
                              ItemID: pl.id,
                              ModCode: "NONE",
                              Name: pl.name,
                              QCComponent: "",
                              QCInstanceID: instanceId,
                              QCLevel: 0,
                              QCProID: 0,
                            }
                            i.bundleProductOptions.forEach(ibpo => {
                              if (ibpo.position == pl.dependentSteps[0]) {
                                if (ibpo.type == "stepper") {
                                  ibpo.productLinks.forEach(ibpopl => {
                                    for (let i = 0; i < ibpopl.selectionQty; i++) {
                                      obj.Entries.CEntry.push({
                                        DealID: 0,
                                        ID: 0,
                                        ItemID: ibpopl.id,
                                        ModCode: "NONE",
                                        Name: ibpopl.name,
                                        QCComponent: 0,
                                        QCInstanceID: instanceId,
                                        QCLevel: 0,
                                        QCProID: 0,
                                      })
                                    }
                                  })
                                }
                              }
                            })
                            Entries.CEntry.push(obj)
                          } else {
                            for (let i = 0; i < pl.selectionQty; i++) {
                              Entries.CEntry.push({
                                DealID: 0,
                                ID: 0,
                                ItemID: pl.id,
                                ModCode: "NONE",
                                Name: pl.name,
                                QCComponent: 0,
                                QCInstanceID: instanceId,
                                QCLevel: 0,
                                QCProID: 0,
                              })
                            }
                          }
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        }
        else if (product.typeId == "bundle") {
          // "name": "Bucket 15 Pcs",
          if (product.bundleProductOptions && product.bundleProductOptions.length > 0) {
            product.bundleProductOptions.forEach(bpo => {
              if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                bpo.productLinks.forEach(pl => {
                  if (pl.selected == 1) {
                    if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                      let obj = {
                        DealID: 0,
                        Entries: {
                          CEntry: []
                        },
                        ID: 0,
                        ItemID: pl.id,
                        ModCode: "NONE",
                        Name: pl.name,
                        QCComponent: "",
                        QCInstanceID: instanceId,
                        QCLevel: 0,
                        QCProID: 0,
                      }
                      product.bundleProductOptions.forEach(plbpo => {
                        if (plbpo.position == pl.dependentSteps[0]) {
                          if (plbpo.type == "stepper") {
                            plbpo.productLinks.forEach(plbpopl => {
                              for (let i = 0; i < plbpopl.selectionQty; i++) {
                                obj.Entries.CEntry.push({
                                  DealID: 0,
                                  ID: 0,
                                  ItemID: plbpopl.id,
                                  ModCode: "NONE",
                                  Name: plbpopl.name,
                                  QCComponent: 0,
                                  QCInstanceID: instanceId,
                                  QCLevel: 0,
                                  QCProID: 0,
                                })
                              }
                            })
                          }
                        }
                      })
                      Entries.CEntry.push(obj)
                    } else {
                      for (let i = 0; i < pl.selectionQty; i++) {
                        Entries.CEntry.push({
                          DealID: 0,
                          ID: 0,
                          ItemID: pl.id,
                          ModCode: "NONE",
                          Name: pl.name,
                          QCComponent: 0,
                          QCInstanceID: instanceId,
                          QCLevel: 0,
                          QCProID: 0,
                        })
                      }
                    }
                  }
                })
              }
            })
          }
        }
      }
    })


    let p = {
      "CEntry": [
        {
          "DealID": 0,
          "Entries": {
            "CEntry": [
              {
                ID: 0,
                ItemID: 810001,
                ModCode: "WITH",
                ModgroupID: "",
                Name: "American Cheese - Regular",
                OrdrMode: "OM_SAVED",
                Weight: 0,
              }
            ]
          },
          "ID": 0,
          "ItemID": 810001,
          "ModCode": "NONE",
          "Name": "Twister Sandwich - Original",
          "QCComponent": "",
          "QCInstanceID": 233,
          "QCLevel": 0,
          "QCProID": 0
        },
        {
          "DealID": 0,
          "ID": 0,
          "ItemID": 810001,
          "ModCode": "NONE",
          "Name": "Medium Fries",
          "QCComponent": 0,
          "QCInstanceID": 233,
          "QCLevel": 0,
          "QCProID": 0
        },
        {
          "DealID": 0,
          "ID": 0,
          "ItemID": 1605,
          "ModCode": "NONE",
          "Name": "Pepsi Medium",
          "QCComponent": 0,
          "QCInstanceID": 233,
          "QCLevel": 0,
          "QCProID": 0
        }
      ]
    }
    console.log("Entries", JSON.stringify(Entries))

    await bootstrap(server)

    // await SDM.OrderSDME.getOrderDetail({})

  } catch (error) {
    console.error(error)
  }
})()