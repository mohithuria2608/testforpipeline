import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as SDM from './sdm';
import * as ENTITY from './entity';
import * as CMS from './cms';

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    // let a: IMenuGrpcRequest.IFetchMenuRes

    let stock: any = [
      {
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [
          {
            "compId": 1,
            "imageThumbnail": "/i/t/itm8_1.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 1,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [

                ],
                "id": 1653,
                "imageThumbnail": "/imagestemp/itm310001.png",
                "modGroupId": -1,
                "name": "Dinner Meal - Original",
                "option_id": 1446,
                "position": 1,
                "price": 0,
                "sdmId": 310001,
                "selected": 1,
                "selection_id": 11251,
                "selectionQty": 1,
                "sku": 310001,
                "subOptions": [

                ],
                "title": "Dinner Meal - Original"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1654,
                "imageThumbnail": "/imagestemp/itm310002.png",
                "modGroupId": -1,
                "name": "Dinner Meal - Spicy",
                "option_id": 1446,
                "position": 2,
                "price": 0,
                "sdmId": 310002,
                "selected": 0,
                "selection_id": 11252,
                "selectionQty": 1,
                "sku": 310002,
                "subOptions": [

                ],
                "title": "Dinner Meal - Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [
                  2
                ],
                "id": 1773,
                "imageThumbnail": "/i/t/itm310003.png",
                "modGroupId": -1,
                "name": "Dinner Meal - Mix",
                "option_id": 1446,
                "position": 3,
                "price": 0,
                "sdmId": 310003,
                "selected": 0,
                "selection_id": 12297,
                "selectionQty": 1,
                "sku": 310003,
                "subOptions": [

                ],
                "title": "Dinner Meal - Mix"
              }
            ],
            "subtitle": "Choice of flavor",
            "title": "Choice of flavor",
            "type": "radio"
          },
          {
            "compId": 1,
            "imageThumbnail": "/i/t/itm8_1.png",
            "ingredient": 0,
            "isDependent": 1,
            "isModifier": 1,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 2,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1645,
                "imageThumbnail": "/imagestemp/itm910002.png",
                "modGroupId": 10205,
                "name": "Chicken Pc - Spicy",
                "option_id": 1629,
                "position": 1,
                "price": 0,
                "sdmId": 910002,
                "selected": 1,
                "selection_id": 12298,
                "selectionQty": 2,
                "sku": 910002,
                "subOptions": [

                ],
                "title": "Chicken Pc - Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1644,
                "imageThumbnail": "/imagestemp/itm910001.png",
                "modGroupId": 10205,
                "name": "Chicken Pc - Original",
                "option_id": 1629,
                "position": 2,
                "price": 0,
                "sdmId": 910001,
                "selected": 0,
                "selection_id": 12299,
                "selectionQty": 1,
                "sku": 910001,
                "subOptions": [

                ],
                "title": "Chicken Pc - Original"
              }
            ],
            "subtitle": "Choice of Chicken",
            "title": "Choice of Chicken",
            "type": "stepper"
          },
          {
            "compId": 2,
            "imageThumbnail": "/i/t/itm8_1.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 3,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [

                ],
                "id": 1619,
                "imageThumbnail": "/imagestemp/itm510001.png",
                "modGroupId": -1,
                "name": "Coleslaw Salad Small",
                "option_id": 1448,
                "position": 1,
                "price": 0,
                "sdmId": 510001,
                "selected": 1,
                "selection_id": 11261,
                "selectionQty": 1,
                "sku": 510001,
                "subOptions": [

                ],
                "title": "Coleslaw Salad Small"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1630,
                "imageThumbnail": "/imagestemp/itm510004.png",
                "modGroupId": -1,
                "name": "Regular Fries",
                "option_id": 1448,
                "position": 2,
                "price": 2,
                "sdmId": 510004,
                "selected": 0,
                "selection_id": 11262,
                "selectionQty": 1,
                "sku": 510004,
                "subOptions": [

                ],
                "title": "Regular Fries"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1636,
                "imageThumbnail": "/imagestemp/itm510012.png",
                "modGroupId": -1,
                "name": "Regular Fries Spicy",
                "option_id": 1448,
                "position": 3,
                "price": 3,
                "sdmId": 510012,
                "selected": 0,
                "selection_id": 11263,
                "selectionQty": 1,
                "sku": 510012,
                "subOptions": [

                ],
                "title": "Regular Fries Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1628,
                "imageThumbnail": "/imagestemp/itm510036.png",
                "modGroupId": -1,
                "name": "Loaded Fries Regular",
                "option_id": 1448,
                "position": 4,
                "price": 5,
                "sdmId": 510036,
                "selected": 0,
                "selection_id": 11264,
                "selectionQty": 1,
                "sku": 510036,
                "subOptions": [

                ],
                "title": "Loaded Fries Regular"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1639,
                "imageThumbnail": "/imagestemp/itm510071.png",
                "modGroupId": -1,
                "name": "Potato Dipper- Regular",
                "option_id": 1448,
                "position": 5,
                "price": 3,
                "sdmId": 510071,
                "selected": 0,
                "selection_id": 11265,
                "selectionQty": 1,
                "sku": 510071,
                "subOptions": [

                ],
                "title": "Potato Dipper- Regular"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1650,
                "imageThumbnail": "/imagestemp/itm510075.png",
                "modGroupId": -1,
                "name": "Cheese Potato Dipper",
                "option_id": 1448,
                "position": 6,
                "price": 7,
                "sdmId": 510075,
                "selected": 0,
                "selection_id": 11266,
                "selectionQty": 1,
                "sku": 510075,
                "subOptions": [

                ],
                "title": "Cheese Potato Dipper"
              }
            ],
            "subtitle": "Choice of first side item",
            "title": "Choice of first side item",
            "type": "radio"
          },
          {
            "compId": 3,
            "imageThumbnail": "/i/t/itm8_1.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 4,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [

                ],
                "id": 1633,
                "imageThumbnail": "/imagestemp/itm510050.png",
                "modGroupId": -1,
                "name": "Medium Fries",
                "option_id": 1447,
                "position": 1,
                "price": 0,
                "sdmId": 510050,
                "selected": 1,
                "selection_id": 11254,
                "selectionQty": 1,
                "sku": 510050,
                "subOptions": [

                ],
                "title": "Medium Fries"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1637,
                "imageThumbnail": "/imagestemp/itm510051.png",
                "modGroupId": -1,
                "name": "Medium Fries Spicy",
                "option_id": 1447,
                "position": 2,
                "price": 1,
                "sdmId": 510051,
                "selected": 0,
                "selection_id": 11255,
                "selectionQty": 1,
                "sku": 510051,
                "subOptions": [

                ],
                "title": "Medium Fries Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1619,
                "imageThumbnail": "/imagestemp/itm510001.png",
                "modGroupId": -1,
                "name": "Coleslaw Salad Small",
                "option_id": 1447,
                "position": 3,
                "price": 0,
                "sdmId": 510001,
                "selected": 0,
                "selection_id": 11256,
                "selectionQty": 1,
                "sku": 510001,
                "subOptions": [

                ],
                "title": "Coleslaw Salad Small"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1628,
                "imageThumbnail": "/imagestemp/itm510036.png",
                "modGroupId": -1,
                "name": "Loaded Fries Regular",
                "option_id": 1447,
                "position": 4,
                "price": 3,
                "sdmId": 510036,
                "selected": 0,
                "selection_id": 11257,
                "selectionQty": 1,
                "sku": 510036,
                "subOptions": [

                ],
                "title": "Loaded Fries Regular"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1640,
                "imageThumbnail": "/imagestemp/itm510072.png",
                "modGroupId": -1,
                "name": "Medium Dipper Fries",
                "option_id": 1447,
                "position": 5,
                "price": 1,
                "sdmId": 510072,
                "selected": 0,
                "selection_id": 11258,
                "selectionQty": 1,
                "sku": 510072,
                "subOptions": [

                ],
                "title": "Medium Dipper Fries"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1650,
                "imageThumbnail": "/imagestemp/itm510075.png",
                "modGroupId": -1,
                "name": "Cheese Potato Dipper",
                "option_id": 1447,
                "position": 6,
                "price": 5,
                "sdmId": 510075,
                "selected": 0,
                "selection_id": 11259,
                "selectionQty": 1,
                "sku": 510075,
                "subOptions": [

                ],
                "title": "Cheese Potato Dipper"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1651,
                "imageThumbnail": "/imagestemp/itm510079.png",
                "modGroupId": -1,
                "name": "Loaded Fries P.Chili Reg",
                "option_id": 1447,
                "position": 7,
                "price": 3,
                "sdmId": 510079,
                "selected": 0,
                "selection_id": 11260,
                "selectionQty": 1,
                "sku": 510079,
                "subOptions": [

                ],
                "title": "Loaded Fries P.Chili Reg"
              }
            ],
            "subtitle": "Choice of second side item",
            "title": "Choice of second side item",
            "type": "radio"
          },
          {
            "compId": 4,
            "imageThumbnail": "/i/t/itm8_1.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 5,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [

                ],
                "id": 1605,
                "imageThumbnail": "/imagestemp/itm600003.png",
                "modGroupId": -1,
                "name": "Pepsi Medium",
                "option_id": 1449,
                "position": 1,
                "price": 0,
                "sdmId": 600003,
                "selected": 1,
                "selection_id": 11267,
                "selectionQty": 1,
                "sku": 600003,
                "subOptions": [

                ],
                "title": "Pepsi Medium"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1617,
                "imageThumbnail": "/imagestemp/itm600009.png",
                "modGroupId": -1,
                "name": "Mirinda Medium",
                "option_id": 1449,
                "position": 2,
                "price": 0,
                "sdmId": 600009,
                "selected": 0,
                "selection_id": 11268,
                "selectionQty": 1,
                "sku": 600009,
                "subOptions": [

                ],
                "title": "Mirinda Medium"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1612,
                "imageThumbnail": "/imagestemp/itm600016.png",
                "modGroupId": -1,
                "name": "7Up Medium",
                "option_id": 1449,
                "position": 3,
                "price": 0,
                "sdmId": 600016,
                "selected": 0,
                "selection_id": 11269,
                "selectionQty": 1,
                "sku": 600016,
                "subOptions": [

                ],
                "title": "7Up Medium"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1607,
                "imageThumbnail": "/imagestemp/itm600006.png",
                "modGroupId": -1,
                "name": "Diet Pepsi Medium",
                "option_id": 1449,
                "position": 4,
                "price": 0,
                "sdmId": 600006,
                "selected": 0,
                "selection_id": 11270,
                "selectionQty": 1,
                "sku": 600006,
                "subOptions": [

                ],
                "title": "Diet Pepsi Medium"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1614,
                "imageThumbnail": "/imagestemp/itm600013.png",
                "modGroupId": -1,
                "name": "Mountain Dew Medium",
                "option_id": 1449,
                "position": 5,
                "price": 0,
                "sdmId": 600013,
                "selected": 0,
                "selection_id": 11271,
                "selectionQty": 1,
                "sku": 600013,
                "subOptions": [

                ],
                "title": "Mountain Dew Medium"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1600,
                "imageThumbnail": "/imagestemp/itm610021.png",
                "modGroupId": -1,
                "name": "Mojito Krusher",
                "option_id": 1449,
                "position": 6,
                "price": 7.5,
                "sdmId": 610021,
                "selected": 0,
                "selection_id": 11272,
                "selectionQty": 1,
                "sku": 610021,
                "subOptions": [

                ],
                "title": "Mojito Krusher"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1652,
                "imageThumbnail": "/imagestemp/itm610011.png",
                "modGroupId": -1,
                "name": "Small Aquafina",
                "option_id": 1449,
                "position": 7,
                "price": 0,
                "sdmId": 610011,
                "selected": 0,
                "selection_id": 11273,
                "selectionQty": 1,
                "sku": 610011,
                "subOptions": [

                ],
                "title": "Small Aquafina"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1599,
                "imageThumbnail": "/imagestemp/itm610020.png",
                "modGroupId": -1,
                "name": "Fresh Orange Juice",
                "option_id": 1449,
                "position": 8,
                "price": 8.5,
                "sdmId": 610020,
                "selected": 0,
                "selection_id": 11274,
                "selectionQty": 1,
                "sku": 610020,
                "subOptions": [

                ],
                "title": "Fresh Orange Juice"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1655,
                "imageThumbnail": "/imagestemp/itm610019.png",
                "modGroupId": -1,
                "name": "Lemon Mint Ice Tea",
                "option_id": 1449,
                "position": 9,
                "price": 3,
                "sdmId": 610019,
                "selected": 0,
                "selection_id": 11275,
                "selectionQty": 1,
                "sku": 610019,
                "subOptions": [

                ],
                "title": "Lemon Mint Ice Tea"
              }
            ],
            "subtitle": "Choice of Beverages",
            "title": "Choice of Beverages",
            "type": "radio"
          }
        ],
        "catId": 34,
        "configurableProductOptions": [
          {
            "id": 144,
            "options": [
              {
                "id": 16287,
                "isSelected": 1,
                "position": 1,
                "title": "Medium"
              },
              {
                "id": 16286,
                "isSelected": 0,
                "position": 2,
                "title": "Large"
              }
            ],
            "position": 1,
            "selIndex": 1,
            "subtitle": "Choice of Size",
            "title": "Choice of Size"
          }
        ],
        "description": "3 chicken pcs., fries, coleslaw, bun & a drink",
        "finalPrice": 28,
        "id": 17,
        "image": "/i/t/itm8_1.png",
        "imageSmall": "/i/t/itm8_1.png",
        "imageThumbnail": "/i/t/itm8_1.png",
        "inSide": 1,
        "items": [
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1653,
                    "imageThumbnail": "/imagestemp/itm310001.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Original",
                    "option_id": 1446,
                    "position": 1,
                    "price": 0,
                    "sdmId": 310001,
                    "selected": 1,
                    "selection_id": 11251,
                    "selectionQty": 1,
                    "sku": 310001,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Original"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1654,
                    "imageThumbnail": "/imagestemp/itm310002.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Spicy",
                    "option_id": 1446,
                    "position": 2,
                    "price": 0,
                    "sdmId": 310002,
                    "selected": 0,
                    "selection_id": 11252,
                    "selectionQty": 1,
                    "sku": 310002,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      2
                    ],
                    "id": 1773,
                    "imageThumbnail": "/i/t/itm310003.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Mix",
                    "option_id": 1446,
                    "position": 3,
                    "price": 0,
                    "sdmId": 310003,
                    "selected": 0,
                    "selection_id": 12297,
                    "selectionQty": 1,
                    "sku": 310003,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Mix"
                  }
                ],
                "subtitle": "Choice of flavor",
                "title": "Choice of flavor",
                "type": "radio"
              },
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 1,
                "isModifier": 1,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1645,
                    "imageThumbnail": "/imagestemp/itm910002.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Spicy",
                    "option_id": 1629,
                    "position": 1,
                    "price": 0,
                    "sdmId": 910002,
                    "selected": 1,
                    "selection_id": 12298,
                    "selectionQty": 2,
                    "sku": 910002,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1644,
                    "imageThumbnail": "/imagestemp/itm910001.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Original",
                    "option_id": 1629,
                    "position": 2,
                    "price": 0,
                    "sdmId": 910001,
                    "selected": 0,
                    "selection_id": 12299,
                    "selectionQty": 1,
                    "sku": 910001,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Original"
                  }
                ],
                "subtitle": "Choice of Chicken",
                "title": "Choice of Chicken",
                "type": "stepper"
              },
              {
                "compId": 2,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1448,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 1,
                    "selection_id": 11261,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1630,
                    "imageThumbnail": "/imagestemp/itm510004.png",
                    "modGroupId": -1,
                    "name": "Regular Fries",
                    "option_id": 1448,
                    "position": 2,
                    "price": 2,
                    "sdmId": 510004,
                    "selected": 0,
                    "selection_id": 11262,
                    "selectionQty": 1,
                    "sku": 510004,
                    "subOptions": [

                    ],
                    "title": "Regular Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1636,
                    "imageThumbnail": "/imagestemp/itm510012.png",
                    "modGroupId": -1,
                    "name": "Regular Fries Spicy",
                    "option_id": 1448,
                    "position": 3,
                    "price": 3,
                    "sdmId": 510012,
                    "selected": 0,
                    "selection_id": 11263,
                    "selectionQty": 1,
                    "sku": 510012,
                    "subOptions": [

                    ],
                    "title": "Regular Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1448,
                    "position": 4,
                    "price": 5,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11264,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1639,
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "modGroupId": -1,
                    "name": "Potato Dipper- Regular",
                    "option_id": 1448,
                    "position": 5,
                    "price": 3,
                    "sdmId": 510071,
                    "selected": 0,
                    "selection_id": 11265,
                    "selectionQty": 1,
                    "sku": 510071,
                    "subOptions": [

                    ],
                    "title": "Potato Dipper- Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1448,
                    "position": 6,
                    "price": 7,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11266,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  }
                ],
                "subtitle": "Choice of first side item",
                "title": "Choice of first side item",
                "type": "radio"
              },
              {
                "compId": 3,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1633,
                    "imageThumbnail": "/imagestemp/itm510050.png",
                    "modGroupId": -1,
                    "name": "Medium Fries",
                    "option_id": 1447,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510050,
                    "selected": 1,
                    "selection_id": 11254,
                    "selectionQty": 1,
                    "sku": 510050,
                    "subOptions": [

                    ],
                    "title": "Medium Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1637,
                    "imageThumbnail": "/imagestemp/itm510051.png",
                    "modGroupId": -1,
                    "name": "Medium Fries Spicy",
                    "option_id": 1447,
                    "position": 2,
                    "price": 1,
                    "sdmId": 510051,
                    "selected": 0,
                    "selection_id": 11255,
                    "selectionQty": 1,
                    "sku": 510051,
                    "subOptions": [

                    ],
                    "title": "Medium Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1447,
                    "position": 3,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 11256,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1447,
                    "position": 4,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11257,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1640,
                    "imageThumbnail": "/imagestemp/itm510072.png",
                    "modGroupId": -1,
                    "name": "Medium Dipper Fries",
                    "option_id": 1447,
                    "position": 5,
                    "price": 1,
                    "sdmId": 510072,
                    "selected": 0,
                    "selection_id": 11258,
                    "selectionQty": 1,
                    "sku": 510072,
                    "subOptions": [

                    ],
                    "title": "Medium Dipper Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1447,
                    "position": 6,
                    "price": 5,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11259,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1651,
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries P.Chili Reg",
                    "option_id": 1447,
                    "position": 7,
                    "price": 3,
                    "sdmId": 510079,
                    "selected": 0,
                    "selection_id": 11260,
                    "selectionQty": 1,
                    "sku": 510079,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries P.Chili Reg"
                  }
                ],
                "subtitle": "Choice of second side item",
                "title": "Choice of second side item",
                "type": "radio"
              },
              {
                "compId": 4,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 5,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1605,
                    "imageThumbnail": "/imagestemp/itm600003.png",
                    "modGroupId": -1,
                    "name": "Pepsi Medium",
                    "option_id": 1449,
                    "position": 1,
                    "price": 0,
                    "sdmId": 600003,
                    "selected": 1,
                    "selection_id": 11267,
                    "selectionQty": 1,
                    "sku": 600003,
                    "subOptions": [

                    ],
                    "title": "Pepsi Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1617,
                    "imageThumbnail": "/imagestemp/itm600009.png",
                    "modGroupId": -1,
                    "name": "Mirinda Medium",
                    "option_id": 1449,
                    "position": 2,
                    "price": 0,
                    "sdmId": 600009,
                    "selected": 0,
                    "selection_id": 11268,
                    "selectionQty": 1,
                    "sku": 600009,
                    "subOptions": [

                    ],
                    "title": "Mirinda Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1612,
                    "imageThumbnail": "/imagestemp/itm600016.png",
                    "modGroupId": -1,
                    "name": "7Up Medium",
                    "option_id": 1449,
                    "position": 3,
                    "price": 0,
                    "sdmId": 600016,
                    "selected": 0,
                    "selection_id": 11269,
                    "selectionQty": 1,
                    "sku": 600016,
                    "subOptions": [

                    ],
                    "title": "7Up Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1607,
                    "imageThumbnail": "/imagestemp/itm600006.png",
                    "modGroupId": -1,
                    "name": "Diet Pepsi Medium",
                    "option_id": 1449,
                    "position": 4,
                    "price": 0,
                    "sdmId": 600006,
                    "selected": 0,
                    "selection_id": 11270,
                    "selectionQty": 1,
                    "sku": 600006,
                    "subOptions": [

                    ],
                    "title": "Diet Pepsi Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1614,
                    "imageThumbnail": "/imagestemp/itm600013.png",
                    "modGroupId": -1,
                    "name": "Mountain Dew Medium",
                    "option_id": 1449,
                    "position": 5,
                    "price": 0,
                    "sdmId": 600013,
                    "selected": 0,
                    "selection_id": 11271,
                    "selectionQty": 1,
                    "sku": 600013,
                    "subOptions": [

                    ],
                    "title": "Mountain Dew Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1600,
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "modGroupId": -1,
                    "name": "Mojito Krusher",
                    "option_id": 1449,
                    "position": 6,
                    "price": 7.5,
                    "sdmId": 610021,
                    "selected": 0,
                    "selection_id": 11272,
                    "selectionQty": 1,
                    "sku": 610021,
                    "subOptions": [

                    ],
                    "title": "Mojito Krusher"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1652,
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "modGroupId": -1,
                    "name": "Small Aquafina",
                    "option_id": 1449,
                    "position": 7,
                    "price": 0,
                    "sdmId": 610011,
                    "selected": 0,
                    "selection_id": 11273,
                    "selectionQty": 1,
                    "sku": 610011,
                    "subOptions": [

                    ],
                    "title": "Small Aquafina"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1599,
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "modGroupId": -1,
                    "name": "Fresh Orange Juice",
                    "option_id": 1449,
                    "position": 8,
                    "price": 8.5,
                    "sdmId": 610020,
                    "selected": 0,
                    "selection_id": 11274,
                    "selectionQty": 1,
                    "sku": 610020,
                    "subOptions": [

                    ],
                    "title": "Fresh Orange Juice"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1655,
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "modGroupId": -1,
                    "name": "Lemon Mint Ice Tea",
                    "option_id": 1449,
                    "position": 9,
                    "price": 3,
                    "sdmId": 610019,
                    "selected": 0,
                    "selection_id": 11275,
                    "selectionQty": 1,
                    "sku": 610019,
                    "subOptions": [

                    ],
                    "title": "Lemon Mint Ice Tea"
                  }
                ],
                "subtitle": "Choice of Beverages",
                "title": "Choice of Beverages",
                "type": "radio"
              }
            ],
            "catId": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "options": [
                  {
                    "id": 16287,
                    "isSelected": 1,
                    "position": 1,
                    "title": "Medium"
                  },
                  {
                    "id": 16286,
                    "isSelected": 0,
                    "position": 2,
                    "title": "Large"
                  }
                ],
                "position": 1,
                "selIndex": 1,
                "subtitle": "Choice of Size",
                "title": "Choice of Size"
              }
            ],
            "description": "",
            "finalPrice": 28,
            "id": 1731,
            "image": "/i/t/itm8_1.png",
            "imageSmall": "/i/t/itm8_1.png",
            "imageThumbnail": "/i/t/itm8_1.png",
            "inSide": 1,
            "metaKeyword": [
              "Dinner Meal - Medium"
            ],
            "name": "Dinner Meal - Medium",
            "position": 10,
            "promoId": 39,
            "sdmId": 7,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900007,
            "specialPrice": 28,
            "taxClassId": 2,
            "title": "Dinner Meal - Medium",
            "typeId": "bundle",
            "virtualGroup": 16298,
            "visibility": 4
          },
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1653,
                    "imageThumbnail": "/imagestemp/itm310001.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Original",
                    "option_id": 1450,
                    "position": 1,
                    "price": 0,
                    "sdmId": 310001,
                    "selected": 1,
                    "selection_id": 11276,
                    "selectionQty": 1,
                    "sku": 310001,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Original"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1654,
                    "imageThumbnail": "/imagestemp/itm310002.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Spicy",
                    "option_id": 1450,
                    "position": 2,
                    "price": 0,
                    "sdmId": 310002,
                    "selected": 0,
                    "selection_id": 11277,
                    "selectionQty": 1,
                    "sku": 310002,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      2
                    ],
                    "id": 1773,
                    "imageThumbnail": "/i/t/itm310003.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Mix",
                    "option_id": 1450,
                    "position": 3,
                    "price": 0,
                    "sdmId": 310003,
                    "selected": 0,
                    "selection_id": 12300,
                    "selectionQty": 1,
                    "sku": 310003,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Mix"
                  }
                ],
                "subtitle": "Choice of flavor",
                "title": "Choice of flavor",
                "type": "radio"
              },
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 1,
                "isModifier": 1,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1645,
                    "imageThumbnail": "/imagestemp/itm910002.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Spicy",
                    "option_id": 1630,
                    "position": 1,
                    "price": 0,
                    "sdmId": 910002,
                    "selected": 1,
                    "selection_id": 12301,
                    "selectionQty": 2,
                    "sku": 910002,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1644,
                    "imageThumbnail": "/imagestemp/itm910001.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Original",
                    "option_id": 1630,
                    "position": 2,
                    "price": 0,
                    "sdmId": 910001,
                    "selected": 0,
                    "selection_id": 12302,
                    "selectionQty": 1,
                    "sku": 910001,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Original"
                  }
                ],
                "subtitle": "Choose your Chicken",
                "title": "Choose your Chicken",
                "type": "stepper"
              },
              {
                "compId": 2,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1452,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 1,
                    "selection_id": 11286,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1630,
                    "imageThumbnail": "/imagestemp/itm510004.png",
                    "modGroupId": -1,
                    "name": "Regular Fries",
                    "option_id": 1452,
                    "position": 2,
                    "price": 2,
                    "sdmId": 510004,
                    "selected": 0,
                    "selection_id": 11287,
                    "selectionQty": 1,
                    "sku": 510004,
                    "subOptions": [

                    ],
                    "title": "Regular Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1636,
                    "imageThumbnail": "/imagestemp/itm510012.png",
                    "modGroupId": -1,
                    "name": "Regular Fries Spicy",
                    "option_id": 1452,
                    "position": 3,
                    "price": 3,
                    "sdmId": 510012,
                    "selected": 0,
                    "selection_id": 11288,
                    "selectionQty": 1,
                    "sku": 510012,
                    "subOptions": [

                    ],
                    "title": "Regular Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1452,
                    "position": 4,
                    "price": 5,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11289,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1639,
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "modGroupId": -1,
                    "name": "Potato Dipper- Regular",
                    "option_id": 1452,
                    "position": 5,
                    "price": 2,
                    "sdmId": 510071,
                    "selected": 0,
                    "selection_id": 11290,
                    "selectionQty": 1,
                    "sku": 510071,
                    "subOptions": [

                    ],
                    "title": "Potato Dipper- Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1452,
                    "position": 6,
                    "price": 7,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11291,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  }
                ],
                "subtitle": "Choice of first side item",
                "title": "Choice of first side item",
                "type": "radio"
              },
              {
                "compId": 3,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1631,
                    "imageThumbnail": "/imagestemp/itm510006.png",
                    "modGroupId": -1,
                    "name": "Large Fries",
                    "option_id": 1451,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510006,
                    "selected": 1,
                    "selection_id": 11279,
                    "selectionQty": 1,
                    "sku": 510006,
                    "subOptions": [

                    ],
                    "title": "Large Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1634,
                    "imageThumbnail": "/imagestemp/itm510013.png",
                    "modGroupId": -1,
                    "name": "Large Fries Spicy",
                    "option_id": 1451,
                    "position": 2,
                    "price": 1,
                    "sdmId": 510013,
                    "selected": 0,
                    "selection_id": 11280,
                    "selectionQty": 1,
                    "sku": 510013,
                    "subOptions": [

                    ],
                    "title": "Large Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1451,
                    "position": 3,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 11281,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1451,
                    "position": 4,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11282,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1641,
                    "imageThumbnail": "/imagestemp/itm510073.png",
                    "modGroupId": -1,
                    "name": "Large Dipper Fries",
                    "option_id": 1451,
                    "position": 5,
                    "price": 1,
                    "sdmId": 510073,
                    "selected": 0,
                    "selection_id": 11283,
                    "selectionQty": 1,
                    "sku": 510073,
                    "subOptions": [

                    ],
                    "title": "Large Dipper Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1451,
                    "position": 6,
                    "price": 5,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11284,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1651,
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries P.Chili Reg",
                    "option_id": 1451,
                    "position": 7,
                    "price": 3,
                    "sdmId": 510079,
                    "selected": 0,
                    "selection_id": 11285,
                    "selectionQty": 1,
                    "sku": 510079,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries P.Chili Reg"
                  }
                ],
                "subtitle": "Choice of second side item",
                "title": "Choice of second side item",
                "type": "radio"
              },
              {
                "compId": 4,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 5,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1606,
                    "imageThumbnail": "/imagestemp/itm600004.png",
                    "modGroupId": -1,
                    "name": "Pepsi Large",
                    "option_id": 1453,
                    "position": 1,
                    "price": 0,
                    "sdmId": 600004,
                    "selected": 1,
                    "selection_id": 11292,
                    "selectionQty": 1,
                    "sku": 600004,
                    "subOptions": [

                    ],
                    "title": "Pepsi Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1618,
                    "imageThumbnail": "/imagestemp/itm600010.png",
                    "modGroupId": -1,
                    "name": "Mirinda Large",
                    "option_id": 1453,
                    "position": 2,
                    "price": 0,
                    "sdmId": 600010,
                    "selected": 0,
                    "selection_id": 11293,
                    "selectionQty": 1,
                    "sku": 600010,
                    "subOptions": [

                    ],
                    "title": "Mirinda Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1610,
                    "imageThumbnail": "/imagestemp/itm600017.png",
                    "modGroupId": -1,
                    "name": "7Up Large",
                    "option_id": 1453,
                    "position": 3,
                    "price": 0,
                    "sdmId": 600017,
                    "selected": 0,
                    "selection_id": 11294,
                    "selectionQty": 1,
                    "sku": 600017,
                    "subOptions": [

                    ],
                    "title": "7Up Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1609,
                    "imageThumbnail": "/imagestemp/itm600007.png",
                    "modGroupId": -1,
                    "name": "Diet Pepsi Large",
                    "option_id": 1453,
                    "position": 4,
                    "price": 0,
                    "sdmId": 600007,
                    "selected": 0,
                    "selection_id": 11295,
                    "selectionQty": 1,
                    "sku": 600007,
                    "subOptions": [

                    ],
                    "title": "Diet Pepsi Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1615,
                    "imageThumbnail": "/imagestemp/itm600014.png",
                    "modGroupId": -1,
                    "name": "Mountain Dew Large",
                    "option_id": 1453,
                    "position": 5,
                    "price": 0,
                    "sdmId": 600014,
                    "selected": 0,
                    "selection_id": 11296,
                    "selectionQty": 1,
                    "sku": 600014,
                    "subOptions": [

                    ],
                    "title": "Mountain Dew Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1600,
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "modGroupId": -1,
                    "name": "Mojito Krusher",
                    "option_id": 1453,
                    "position": 6,
                    "price": 7.5,
                    "sdmId": 610021,
                    "selected": 0,
                    "selection_id": 11297,
                    "selectionQty": 1,
                    "sku": 610021,
                    "subOptions": [

                    ],
                    "title": "Mojito Krusher"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1652,
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "modGroupId": -1,
                    "name": "Small Aquafina",
                    "option_id": 1453,
                    "position": 7,
                    "price": 0,
                    "sdmId": 610011,
                    "selected": 0,
                    "selection_id": 11298,
                    "selectionQty": 1,
                    "sku": 610011,
                    "subOptions": [

                    ],
                    "title": "Small Aquafina"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1599,
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "modGroupId": -1,
                    "name": "Fresh Orange Juice",
                    "option_id": 1453,
                    "position": 8,
                    "price": 8.5,
                    "sdmId": 610020,
                    "selected": 0,
                    "selection_id": 11299,
                    "selectionQty": 1,
                    "sku": 610020,
                    "subOptions": [

                    ],
                    "title": "Fresh Orange Juice"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1655,
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "modGroupId": -1,
                    "name": "Lemon Mint Ice Tea",
                    "option_id": 1453,
                    "position": 9,
                    "price": 3,
                    "sdmId": 610019,
                    "selected": 0,
                    "selection_id": 11300,
                    "selectionQty": 1,
                    "sku": 610019,
                    "subOptions": [

                    ],
                    "title": "Lemon Mint Ice Tea"
                  }
                ],
                "subtitle": "Choice of Beverages",
                "title": "Choice of Beverages",
                "type": "radio"
              }
            ],
            "catId": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "options": [
                  {
                    "id": 16287,
                    "isSelected": 1,
                    "position": 1,
                    "title": "Medium"
                  },
                  {
                    "id": 16286,
                    "isSelected": 0,
                    "position": 2,
                    "title": "Large"
                  }
                ],
                "position": 1,
                "selIndex": 1,
                "subtitle": "Choice of Size",
                "title": "Choice of Size"
              }
            ],
            "description": "",
            "finalPrice": 29.5,
            "id": 1732,
            "image": "/i/t/itm8.png",
            "imageSmall": "/i/t/itm8.png",
            "imageThumbnail": "/i/t/itm8.png",
            "inSide": 1,
            "metaKeyword": [
              "Dinner Meal - Large"
            ],
            "name": "Dinner Meal - Large",
            "position": 11,
            "promoId": 39,
            "sdmId": 8,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900008,
            "specialPrice": 29.5,
            "taxClassId": 2,
            "title": "Dinner Meal - Large",
            "typeId": "bundle",
            "virtualGroup": 16298,
            "visibility": 4
          }
        ],
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#34",
        "langMenuIdCatIdProductId": "En#1#34#17",
        "langMenuIdProductId": "En#1#17",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "Dinner Meal - Medium"
        ],
        "name": "Dinner Meal",
        "originalTypeId": "bundle_group",
        "position": 10,
        "promoId": 39,
        "sdmId": "7",
        "selectedItem": 900007,
        "sellingPrice": 28,
        "sku": 900007,
        "specialPrice": 0,
        "taxClassId": 2,
        "tempItemList": [
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1653,
                    "imageThumbnail": "/imagestemp/itm310001.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Original",
                    "option_id": 1446,
                    "position": 1,
                    "price": 0,
                    "sdmId": 310001,
                    "selected": 1,
                    "selection_id": 11251,
                    "selectionQty": 1,
                    "sku": 310001,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Original"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1654,
                    "imageThumbnail": "/imagestemp/itm310002.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Spicy",
                    "option_id": 1446,
                    "position": 2,
                    "price": 0,
                    "sdmId": 310002,
                    "selected": 0,
                    "selection_id": 11252,
                    "selectionQty": 1,
                    "sku": 310002,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      2
                    ],
                    "id": 1773,
                    "imageThumbnail": "/i/t/itm310003.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Mix",
                    "option_id": 1446,
                    "position": 3,
                    "price": 0,
                    "sdmId": 310003,
                    "selected": 0,
                    "selection_id": 12297,
                    "selectionQty": 1,
                    "sku": 310003,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Mix"
                  }
                ],
                "subtitle": "Choice of flavor",
                "title": "Choice of flavor",
                "type": "radio"
              },
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 1,
                "isModifier": 1,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1645,
                    "imageThumbnail": "/imagestemp/itm910002.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Spicy",
                    "option_id": 1629,
                    "position": 1,
                    "price": 0,
                    "sdmId": 910002,
                    "selected": 1,
                    "selection_id": 12298,
                    "selectionQty": 2,
                    "sku": 910002,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1644,
                    "imageThumbnail": "/imagestemp/itm910001.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Original",
                    "option_id": 1629,
                    "position": 2,
                    "price": 0,
                    "sdmId": 910001,
                    "selected": 0,
                    "selection_id": 12299,
                    "selectionQty": 1,
                    "sku": 910001,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Original"
                  }
                ],
                "subtitle": "Choice of Chicken",
                "title": "Choice of Chicken",
                "type": "stepper"
              },
              {
                "compId": 2,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1448,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 1,
                    "selection_id": 11261,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1630,
                    "imageThumbnail": "/imagestemp/itm510004.png",
                    "modGroupId": -1,
                    "name": "Regular Fries",
                    "option_id": 1448,
                    "position": 2,
                    "price": 2,
                    "sdmId": 510004,
                    "selected": 0,
                    "selection_id": 11262,
                    "selectionQty": 1,
                    "sku": 510004,
                    "subOptions": [

                    ],
                    "title": "Regular Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1636,
                    "imageThumbnail": "/imagestemp/itm510012.png",
                    "modGroupId": -1,
                    "name": "Regular Fries Spicy",
                    "option_id": 1448,
                    "position": 3,
                    "price": 3,
                    "sdmId": 510012,
                    "selected": 0,
                    "selection_id": 11263,
                    "selectionQty": 1,
                    "sku": 510012,
                    "subOptions": [

                    ],
                    "title": "Regular Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1448,
                    "position": 4,
                    "price": 5,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11264,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1639,
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "modGroupId": -1,
                    "name": "Potato Dipper- Regular",
                    "option_id": 1448,
                    "position": 5,
                    "price": 3,
                    "sdmId": 510071,
                    "selected": 0,
                    "selection_id": 11265,
                    "selectionQty": 1,
                    "sku": 510071,
                    "subOptions": [

                    ],
                    "title": "Potato Dipper- Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1448,
                    "position": 6,
                    "price": 7,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11266,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  }
                ],
                "subtitle": "Choice of first side item",
                "title": "Choice of first side item",
                "type": "radio"
              },
              {
                "compId": 3,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1633,
                    "imageThumbnail": "/imagestemp/itm510050.png",
                    "modGroupId": -1,
                    "name": "Medium Fries",
                    "option_id": 1447,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510050,
                    "selected": 1,
                    "selection_id": 11254,
                    "selectionQty": 1,
                    "sku": 510050,
                    "subOptions": [

                    ],
                    "title": "Medium Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1637,
                    "imageThumbnail": "/imagestemp/itm510051.png",
                    "modGroupId": -1,
                    "name": "Medium Fries Spicy",
                    "option_id": 1447,
                    "position": 2,
                    "price": 1,
                    "sdmId": 510051,
                    "selected": 0,
                    "selection_id": 11255,
                    "selectionQty": 1,
                    "sku": 510051,
                    "subOptions": [

                    ],
                    "title": "Medium Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1447,
                    "position": 3,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 11256,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1447,
                    "position": 4,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11257,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1640,
                    "imageThumbnail": "/imagestemp/itm510072.png",
                    "modGroupId": -1,
                    "name": "Medium Dipper Fries",
                    "option_id": 1447,
                    "position": 5,
                    "price": 1,
                    "sdmId": 510072,
                    "selected": 0,
                    "selection_id": 11258,
                    "selectionQty": 1,
                    "sku": 510072,
                    "subOptions": [

                    ],
                    "title": "Medium Dipper Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1447,
                    "position": 6,
                    "price": 5,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11259,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1651,
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries P.Chili Reg",
                    "option_id": 1447,
                    "position": 7,
                    "price": 3,
                    "sdmId": 510079,
                    "selected": 0,
                    "selection_id": 11260,
                    "selectionQty": 1,
                    "sku": 510079,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries P.Chili Reg"
                  }
                ],
                "subtitle": "Choice of second side item",
                "title": "Choice of second side item",
                "type": "radio"
              },
              {
                "compId": 4,
                "imageThumbnail": "/i/t/itm8_1.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 5,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1605,
                    "imageThumbnail": "/imagestemp/itm600003.png",
                    "modGroupId": -1,
                    "name": "Pepsi Medium",
                    "option_id": 1449,
                    "position": 1,
                    "price": 0,
                    "sdmId": 600003,
                    "selected": 1,
                    "selection_id": 11267,
                    "selectionQty": 1,
                    "sku": 600003,
                    "subOptions": [

                    ],
                    "title": "Pepsi Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1617,
                    "imageThumbnail": "/imagestemp/itm600009.png",
                    "modGroupId": -1,
                    "name": "Mirinda Medium",
                    "option_id": 1449,
                    "position": 2,
                    "price": 0,
                    "sdmId": 600009,
                    "selected": 0,
                    "selection_id": 11268,
                    "selectionQty": 1,
                    "sku": 600009,
                    "subOptions": [

                    ],
                    "title": "Mirinda Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1612,
                    "imageThumbnail": "/imagestemp/itm600016.png",
                    "modGroupId": -1,
                    "name": "7Up Medium",
                    "option_id": 1449,
                    "position": 3,
                    "price": 0,
                    "sdmId": 600016,
                    "selected": 0,
                    "selection_id": 11269,
                    "selectionQty": 1,
                    "sku": 600016,
                    "subOptions": [

                    ],
                    "title": "7Up Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1607,
                    "imageThumbnail": "/imagestemp/itm600006.png",
                    "modGroupId": -1,
                    "name": "Diet Pepsi Medium",
                    "option_id": 1449,
                    "position": 4,
                    "price": 0,
                    "sdmId": 600006,
                    "selected": 0,
                    "selection_id": 11270,
                    "selectionQty": 1,
                    "sku": 600006,
                    "subOptions": [

                    ],
                    "title": "Diet Pepsi Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1614,
                    "imageThumbnail": "/imagestemp/itm600013.png",
                    "modGroupId": -1,
                    "name": "Mountain Dew Medium",
                    "option_id": 1449,
                    "position": 5,
                    "price": 0,
                    "sdmId": 600013,
                    "selected": 0,
                    "selection_id": 11271,
                    "selectionQty": 1,
                    "sku": 600013,
                    "subOptions": [

                    ],
                    "title": "Mountain Dew Medium"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1600,
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "modGroupId": -1,
                    "name": "Mojito Krusher",
                    "option_id": 1449,
                    "position": 6,
                    "price": 7.5,
                    "sdmId": 610021,
                    "selected": 0,
                    "selection_id": 11272,
                    "selectionQty": 1,
                    "sku": 610021,
                    "subOptions": [

                    ],
                    "title": "Mojito Krusher"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1652,
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "modGroupId": -1,
                    "name": "Small Aquafina",
                    "option_id": 1449,
                    "position": 7,
                    "price": 0,
                    "sdmId": 610011,
                    "selected": 0,
                    "selection_id": 11273,
                    "selectionQty": 1,
                    "sku": 610011,
                    "subOptions": [

                    ],
                    "title": "Small Aquafina"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1599,
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "modGroupId": -1,
                    "name": "Fresh Orange Juice",
                    "option_id": 1449,
                    "position": 8,
                    "price": 8.5,
                    "sdmId": 610020,
                    "selected": 0,
                    "selection_id": 11274,
                    "selectionQty": 1,
                    "sku": 610020,
                    "subOptions": [

                    ],
                    "title": "Fresh Orange Juice"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1655,
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "modGroupId": -1,
                    "name": "Lemon Mint Ice Tea",
                    "option_id": 1449,
                    "position": 9,
                    "price": 3,
                    "sdmId": 610019,
                    "selected": 0,
                    "selection_id": 11275,
                    "selectionQty": 1,
                    "sku": 610019,
                    "subOptions": [

                    ],
                    "title": "Lemon Mint Ice Tea"
                  }
                ],
                "subtitle": "Choice of Beverages",
                "title": "Choice of Beverages",
                "type": "radio"
              }
            ],
            "catId": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "options": [
                  {
                    "id": 16287,
                    "isSelected": 1,
                    "position": 1,
                    "title": "Medium"
                  },
                  {
                    "id": 16286,
                    "isSelected": 0,
                    "position": 2,
                    "title": "Large"
                  }
                ],
                "position": 1,
                "selIndex": 1,
                "subtitle": "Choice of Size",
                "title": "Choice of Size"
              }
            ],
            "description": "",
            "finalPrice": 28,
            "id": 1731,
            "image": "/i/t/itm8_1.png",
            "imageSmall": "/i/t/itm8_1.png",
            "imageThumbnail": "/i/t/itm8_1.png",
            "inSide": 1,
            "metaKeyword": [
              "Dinner Meal - Medium"
            ],
            "name": "Dinner Meal - Medium",
            "position": 10,
            "promoId": 39,
            "sdmId": 7,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900007,
            "specialPrice": 28,
            "taxClassId": 2,
            "title": "Dinner Meal - Medium",
            "typeId": "bundle",
            "virtualGroup": 16298,
            "visibility": 4
          },
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1653,
                    "imageThumbnail": "/imagestemp/itm310001.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Original",
                    "option_id": 1450,
                    "position": 1,
                    "price": 0,
                    "sdmId": 310001,
                    "selected": 1,
                    "selection_id": 11276,
                    "selectionQty": 1,
                    "sku": 310001,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Original"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1654,
                    "imageThumbnail": "/imagestemp/itm310002.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Spicy",
                    "option_id": 1450,
                    "position": 2,
                    "price": 0,
                    "sdmId": 310002,
                    "selected": 0,
                    "selection_id": 11277,
                    "selectionQty": 1,
                    "sku": 310002,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      2
                    ],
                    "id": 1773,
                    "imageThumbnail": "/i/t/itm310003.png",
                    "modGroupId": -1,
                    "name": "Dinner Meal - Mix",
                    "option_id": 1450,
                    "position": 3,
                    "price": 0,
                    "sdmId": 310003,
                    "selected": 0,
                    "selection_id": 12300,
                    "selectionQty": 1,
                    "sku": 310003,
                    "subOptions": [

                    ],
                    "title": "Dinner Meal - Mix"
                  }
                ],
                "subtitle": "Choice of flavor",
                "title": "Choice of flavor",
                "type": "radio"
              },
              {
                "compId": 1,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 1,
                "isModifier": 1,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1645,
                    "imageThumbnail": "/imagestemp/itm910002.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Spicy",
                    "option_id": 1630,
                    "position": 1,
                    "price": 0,
                    "sdmId": 910002,
                    "selected": 1,
                    "selection_id": 12301,
                    "selectionQty": 2,
                    "sku": 910002,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1644,
                    "imageThumbnail": "/imagestemp/itm910001.png",
                    "modGroupId": 10205,
                    "name": "Chicken Pc - Original",
                    "option_id": 1630,
                    "position": 2,
                    "price": 0,
                    "sdmId": 910001,
                    "selected": 0,
                    "selection_id": 12302,
                    "selectionQty": 1,
                    "sku": 910001,
                    "subOptions": [

                    ],
                    "title": "Chicken Pc - Original"
                  }
                ],
                "subtitle": "Choose your Chicken",
                "title": "Choose your Chicken",
                "type": "stepper"
              },
              {
                "compId": 2,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1452,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 1,
                    "selection_id": 11286,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1630,
                    "imageThumbnail": "/imagestemp/itm510004.png",
                    "modGroupId": -1,
                    "name": "Regular Fries",
                    "option_id": 1452,
                    "position": 2,
                    "price": 2,
                    "sdmId": 510004,
                    "selected": 0,
                    "selection_id": 11287,
                    "selectionQty": 1,
                    "sku": 510004,
                    "subOptions": [

                    ],
                    "title": "Regular Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1636,
                    "imageThumbnail": "/imagestemp/itm510012.png",
                    "modGroupId": -1,
                    "name": "Regular Fries Spicy",
                    "option_id": 1452,
                    "position": 3,
                    "price": 3,
                    "sdmId": 510012,
                    "selected": 0,
                    "selection_id": 11288,
                    "selectionQty": 1,
                    "sku": 510012,
                    "subOptions": [

                    ],
                    "title": "Regular Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1452,
                    "position": 4,
                    "price": 5,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11289,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1639,
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "modGroupId": -1,
                    "name": "Potato Dipper- Regular",
                    "option_id": 1452,
                    "position": 5,
                    "price": 2,
                    "sdmId": 510071,
                    "selected": 0,
                    "selection_id": 11290,
                    "selectionQty": 1,
                    "sku": 510071,
                    "subOptions": [

                    ],
                    "title": "Potato Dipper- Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1452,
                    "position": 6,
                    "price": 7,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11291,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  }
                ],
                "subtitle": "Choice of first side item",
                "title": "Choice of first side item",
                "type": "radio"
              },
              {
                "compId": 3,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1631,
                    "imageThumbnail": "/imagestemp/itm510006.png",
                    "modGroupId": -1,
                    "name": "Large Fries",
                    "option_id": 1451,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510006,
                    "selected": 1,
                    "selection_id": 11279,
                    "selectionQty": 1,
                    "sku": 510006,
                    "subOptions": [

                    ],
                    "title": "Large Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1634,
                    "imageThumbnail": "/imagestemp/itm510013.png",
                    "modGroupId": -1,
                    "name": "Large Fries Spicy",
                    "option_id": 1451,
                    "position": 2,
                    "price": 1,
                    "sdmId": 510013,
                    "selected": 0,
                    "selection_id": 11280,
                    "selectionQty": 1,
                    "sku": 510013,
                    "subOptions": [

                    ],
                    "title": "Large Fries Spicy"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1451,
                    "position": 3,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 11281,
                    "selectionQty": 1,
                    "sku": 510001,
                    "subOptions": [

                    ],
                    "title": "Coleslaw Salad Small"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1451,
                    "position": 4,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 11282,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1641,
                    "imageThumbnail": "/imagestemp/itm510073.png",
                    "modGroupId": -1,
                    "name": "Large Dipper Fries",
                    "option_id": 1451,
                    "position": 5,
                    "price": 1,
                    "sdmId": 510073,
                    "selected": 0,
                    "selection_id": 11283,
                    "selectionQty": 1,
                    "sku": 510073,
                    "subOptions": [

                    ],
                    "title": "Large Dipper Fries"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1650,
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 1451,
                    "position": 6,
                    "price": 5,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 11284,
                    "selectionQty": 1,
                    "sku": 510075,
                    "subOptions": [

                    ],
                    "title": "Cheese Potato Dipper"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1651,
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries P.Chili Reg",
                    "option_id": 1451,
                    "position": 7,
                    "price": 3,
                    "sdmId": 510079,
                    "selected": 0,
                    "selection_id": 11285,
                    "selectionQty": 1,
                    "sku": 510079,
                    "subOptions": [

                    ],
                    "title": "Loaded Fries P.Chili Reg"
                  }
                ],
                "subtitle": "Choice of second side item",
                "title": "Choice of second side item",
                "type": "radio"
              },
              {
                "compId": 4,
                "imageThumbnail": "/i/t/itm8.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 5,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 1606,
                    "imageThumbnail": "/imagestemp/itm600004.png",
                    "modGroupId": -1,
                    "name": "Pepsi Large",
                    "option_id": 1453,
                    "position": 1,
                    "price": 0,
                    "sdmId": 600004,
                    "selected": 1,
                    "selection_id": 11292,
                    "selectionQty": 1,
                    "sku": 600004,
                    "subOptions": [

                    ],
                    "title": "Pepsi Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1618,
                    "imageThumbnail": "/imagestemp/itm600010.png",
                    "modGroupId": -1,
                    "name": "Mirinda Large",
                    "option_id": 1453,
                    "position": 2,
                    "price": 0,
                    "sdmId": 600010,
                    "selected": 0,
                    "selection_id": 11293,
                    "selectionQty": 1,
                    "sku": 600010,
                    "subOptions": [

                    ],
                    "title": "Mirinda Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1610,
                    "imageThumbnail": "/imagestemp/itm600017.png",
                    "modGroupId": -1,
                    "name": "7Up Large",
                    "option_id": 1453,
                    "position": 3,
                    "price": 0,
                    "sdmId": 600017,
                    "selected": 0,
                    "selection_id": 11294,
                    "selectionQty": 1,
                    "sku": 600017,
                    "subOptions": [

                    ],
                    "title": "7Up Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1609,
                    "imageThumbnail": "/imagestemp/itm600007.png",
                    "modGroupId": -1,
                    "name": "Diet Pepsi Large",
                    "option_id": 1453,
                    "position": 4,
                    "price": 0,
                    "sdmId": 600007,
                    "selected": 0,
                    "selection_id": 11295,
                    "selectionQty": 1,
                    "sku": 600007,
                    "subOptions": [

                    ],
                    "title": "Diet Pepsi Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1615,
                    "imageThumbnail": "/imagestemp/itm600014.png",
                    "modGroupId": -1,
                    "name": "Mountain Dew Large",
                    "option_id": 1453,
                    "position": 5,
                    "price": 0,
                    "sdmId": 600014,
                    "selected": 0,
                    "selection_id": 11296,
                    "selectionQty": 1,
                    "sku": 600014,
                    "subOptions": [

                    ],
                    "title": "Mountain Dew Large"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1600,
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "modGroupId": -1,
                    "name": "Mojito Krusher",
                    "option_id": 1453,
                    "position": 6,
                    "price": 7.5,
                    "sdmId": 610021,
                    "selected": 0,
                    "selection_id": 11297,
                    "selectionQty": 1,
                    "sku": 610021,
                    "subOptions": [

                    ],
                    "title": "Mojito Krusher"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1652,
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "modGroupId": -1,
                    "name": "Small Aquafina",
                    "option_id": 1453,
                    "position": 7,
                    "price": 0,
                    "sdmId": 610011,
                    "selected": 0,
                    "selection_id": 11298,
                    "selectionQty": 1,
                    "sku": 610011,
                    "subOptions": [

                    ],
                    "title": "Small Aquafina"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1599,
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "modGroupId": -1,
                    "name": "Fresh Orange Juice",
                    "option_id": 1453,
                    "position": 8,
                    "price": 8.5,
                    "sdmId": 610020,
                    "selected": 0,
                    "selection_id": 11299,
                    "selectionQty": 1,
                    "sku": 610020,
                    "subOptions": [

                    ],
                    "title": "Fresh Orange Juice"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 1655,
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "modGroupId": -1,
                    "name": "Lemon Mint Ice Tea",
                    "option_id": 1453,
                    "position": 9,
                    "price": 3,
                    "sdmId": 610019,
                    "selected": 0,
                    "selection_id": 11300,
                    "selectionQty": 1,
                    "sku": 610019,
                    "subOptions": [

                    ],
                    "title": "Lemon Mint Ice Tea"
                  }
                ],
                "subtitle": "Choice of Beverages",
                "title": "Choice of Beverages",
                "type": "radio"
              }
            ],
            "catId": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "options": [
                  {
                    "id": 16287,
                    "isSelected": 1,
                    "position": 1,
                    "title": "Medium"
                  },
                  {
                    "id": 16286,
                    "isSelected": 0,
                    "position": 2,
                    "title": "Large"
                  }
                ],
                "position": 1,
                "selIndex": 1,
                "subtitle": "Choice of Size",
                "title": "Choice of Size"
              }
            ],
            "description": "",
            "finalPrice": 29.5,
            "id": 1732,
            "image": "/i/t/itm8.png",
            "imageSmall": "/i/t/itm8.png",
            "imageThumbnail": "/i/t/itm8.png",
            "inSide": 1,
            "metaKeyword": [
              "Dinner Meal - Large"
            ],
            "name": "Dinner Meal - Large",
            "position": 11,
            "promoId": 39,
            "sdmId": 8,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900008,
            "specialPrice": 29.5,
            "taxClassId": 2,
            "title": "Dinner Meal - Large",
            "typeId": "bundle",
            "virtualGroup": 16298,
            "visibility": 4
          }
        ],
        "typeId": "bundle_group",
        "viewIdentifier": 0,
        "virtualGroup": 16298,
        "visibility": 4
      }
    ]
    let Entries = {
      CEntry: []
    }

    stock.forEach(product => {
      let instanceId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      for (let i = 0; i < product.qty; i++) {
        if (product.originalTypeId == "simple") {
          if (product.typeId == "simple") {
            // "name": "Fresh Orange Juice"
            Entries.CEntry.push({
              ItemID: product.sdmId,
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
              ItemID: product.sdmId,
              ModCode: "NONE",
              Name: product.name,
              QCComponent: -1,
              QCInstanceID: instanceId,
              QCLevel: 0,
              QCProID: product.promoId,
            }
            if (product.bundleProductOptions && product.bundleProductOptions.length > 0) {
              product.bundleProductOptions.forEach(bpo => {
                if (bpo && bpo.productLinks.length > 0) {
                  bpo.productLinks.forEach(pl => {
                    if (pl.selected == 1) {
                      if (pl.subOptions && pl.subOptions.length > 0) {
                        pl.subOptions.forEach(so => {
                          if (so.selected == 1) {
                            if (so.title == "None") { }
                            else if (so.title == "Regular") {
                              obj.Entries.CEntry.push({
                                ID: 0,
                                ItemID: so.sdmId,
                                ModCode: "WITH",
                                ModgroupID: pl.modGroupId ? pl.modGroupId : -1,
                                Name: so.name,
                                OrdrMode: "OM_SAVED",
                                Weight: 0,
                              })
                            } else if (so.title == "Extra") {
                              obj.Entries.CEntry.push({
                                ID: 0,
                                ItemID: so.sdmId,
                                ModCode: "WITH",
                                ModgroupID: pl.modGroupId,
                                Name: so.name,
                                OrdrMode: "OM_SAVED",
                                Weight: 0,
                              }, {
                                ID: 0,
                                ItemID: so.sdmId,
                                ModCode: "WITH",
                                ModgroupID: pl.modGroupId,
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
                  ItemID: 600002,// i.sdmId,
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
                let QCComponent = bpo.compId
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
                          ItemID: pl.sdmId,
                          ModCode: "NONE",
                          Name: pl.name,
                          QCComponent: QCComponent,
                          QCInstanceID: instanceId,
                          QCLevel: 0,
                          QCProID: product.promoId,
                        }
                        product.bundleProductOptions.forEach(plbpo => {
                          if (pl.dependentSteps.indexOf(plbpo.position) >= 0) {
                            if (plbpo.type == "stepper") {
                              plbpo.productLinks.forEach(plbpopl => {
                                let instanceId2 = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                                for (let i = 0; i < plbpopl.selectionQty; i++) {
                                  obj.Entries.CEntry.push({
                                    DealID: 0,
                                    ID: 0,
                                    ItemID: plbpopl.sdmId,
                                    ModCode: "NONE",
                                    Name: plbpopl.name,
                                    QCComponent: QCComponent,
                                    QCInstanceID: instanceId2,
                                    QCLevel: 0,
                                    QCProID: product.promoId,
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
                            ItemID: pl.sdmId,
                            ModCode: "NONE",
                            Name: pl.name,
                            QCComponent: QCComponent,
                            QCInstanceID: instanceId,
                            QCLevel: 0,
                            QCProID: product.promoId,
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
            // "name": "Twister Meal",   "name": "Mighty Twist",
            if (product.items && product.items.length > 0) {
              product.items.forEach(i => {
                if (i['sku'] == product.selectedItem) {
                  if (i.bundleProductOptions && i.bundleProductOptions.length > 0) {
                    let positionIndex = i.bundleProductOptions[0].position
                    i.bundleProductOptions.forEach(bpo => {
                      let QCComponent = bpo.compId
                      if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                        if (bpo.ingredient == 0) {
                          bpo.productLinks.forEach(pl => {
                            if (pl.selected == 1) {
                              if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                                let obj = {
                                  DealID: 0,
                                  Entries: {
                                    CEntry: []
                                  },
                                  ID: 0,
                                  ItemID: pl.sdmId,
                                  ModCode: "NONE",
                                  Name: pl.name,
                                  QCComponent: QCComponent,
                                  QCInstanceID: instanceId,
                                  QCLevel: 0,
                                  QCProID: i.promoId,
                                }
                                let dependentSteps = i.bundleProductOptions[(positionIndex == 0) ? pl.dependentSteps[0] : (pl.dependentSteps[0] - 1)]
                                console.log("dependentSteps", dependentSteps)

                                if (dependentSteps.ingredient == 1 || dependentSteps.isModifier == 1) {
                                  /**
                                   * @description (ingredient == 1) :  "name": "Twister Meal"
                                   * @description (isModifier == 1) :  "name": "Mighty Twist"
                                   */
                                  if (dependentSteps.productLinks && dependentSteps.productLinks.length > 0) {
                                    dependentSteps.productLinks.forEach(dspl => {
                                      let ItemID = 0
                                      if (dspl.subOptions && dspl.subOptions.length > 0) {
                                        dspl.subOptions.forEach(dsplso => {
                                          if (dsplso.selected == 1)
                                            ItemID = dsplso.sdmId
                                        })
                                      }
                                      obj.Entries.CEntry.push({
                                        ID: 0,
                                        ItemID: ItemID,
                                        ModCode: "WITH",
                                        ModgroupID: dspl.modGroupId,
                                        Name: dspl.name,
                                        OrdrMode: "OM_SAVED",
                                        Weight: 0
                                      })
                                    })
                                  }
                                  Entries.CEntry.push(obj)
                                } else if (dependentSteps['type'] == "stepper") {
                                  /**
                                   * @description (type == "stepper") : "name": "Dinner Meal", 
                                   */
                                  dependentSteps.productLinks.forEach(dspl => {
                                    if (dspl.selectionQty > 0) {
                                      let count = dspl.selectionQty
                                      while (count != 0) {
                                        Entries.CEntry.push({
                                          DealID: 0,
                                          ID: 0,
                                          ItemID: dspl.sdmId,
                                          ModCode: "NONE",
                                          Name: dspl.name,
                                          QCComponent: QCComponent,
                                          QCInstanceID: instanceId,
                                          QCLevel: 0,
                                          QCProID: i.promoId,
                                        })
                                        count = count - 1
                                      }
                                    }
                                  })
                                }
                              } else {
                                let count = pl.selectionQty
                                while (count != 0) {
                                  Entries.CEntry.push({
                                    DealID: 0,
                                    ID: 0,
                                    ItemID: pl.sdmId,
                                    ModCode: "NONE",
                                    Name: pl.name,
                                    QCComponent: QCComponent,
                                    QCInstanceID: instanceId,
                                    QCLevel: 0,
                                    QCProID: i.promoId,
                                  })
                                  count = count - 1
                                }
                              }
                            }
                          })
                        } else {
                          /**
                           * @description : if the product does not have dependentstep value but actually is dependent on the next product in the array
                           */
                          let lastProductAddedInCentry = {
                            DealID: Entries.CEntry[Entries.CEntry.length - 1].DealID,
                            Entries: {
                              CEntry: []
                            },
                            ID: Entries.CEntry[Entries.CEntry.length - 1].ID,
                            ItemID: Entries.CEntry[Entries.CEntry.length - 1].ItemID,
                            ModCode: Entries.CEntry[Entries.CEntry.length - 1].ModCode,
                            Name: Entries.CEntry[Entries.CEntry.length - 1].Name,
                            QCComponent: Entries.CEntry[Entries.CEntry.length - 1].QCComponent,
                            QCInstanceID: Entries.CEntry[Entries.CEntry.length - 1].QCInstanceID,
                            QCLevel: Entries.CEntry[Entries.CEntry.length - 1].QCLevel,
                            QCProID: Entries.CEntry[Entries.CEntry.length - 1].QCProID,
                          }
                          if (bpo.productLinks && bpo.productLinks.length > 0) {
                            bpo.productLinks.forEach(bpopl => {
                              let ItemID = 0
                              if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                bpopl.subOptions.forEach(bpoplso => {
                                  if (bpoplso.selected == 1)
                                    ItemID = bpoplso.sdmId
                                })
                              }
                              lastProductAddedInCentry.Entries.CEntry.push({
                                ID: 0,
                                ItemID: ItemID,
                                ModCode: "WITH",
                                ModgroupID: bpopl.modGroupId,
                                Name: bpopl.name,
                                OrdrMode: "OM_SAVED",
                                Weight: 0
                              })
                            })
                          }
                          Entries.CEntry[Entries.CEntry.length - 1] = { ...lastProductAddedInCentry }
                        }
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
              let positionIndex = product.bundleProductOptions[0].position
              product.bundleProductOptions.forEach(bpo => {
                let QCComponent = bpo.compId
                if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                  bpo.productLinks.forEach(pl => {
                    if (pl.selected == 1) {
                      if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                        let dependentSteps = product.bundleProductOptions[(positionIndex == 0) ? pl.dependentSteps[0] : (pl.dependentSteps[0] - 1)]
                        console.log("dependentSteps", dependentSteps)
                        if (dependentSteps.position == pl.dependentSteps[0]) {
                          if (dependentSteps.type == "stepper") {
                            dependentSteps.productLinks.forEach(dspl => {
                              if (dspl.selectionQty > 0) {
                                let count = dspl.selectionQty
                                while (count != 0) {
                                  Entries.CEntry.push({
                                    DealID: 0,
                                    ID: 0,
                                    ItemID: dspl.sdmId,
                                    ModCode: "NONE",
                                    Name: dspl.name,
                                    QCComponent: QCComponent,
                                    QCInstanceID: instanceId,
                                    QCLevel: 0,
                                    QCProID: product.promoId,
                                  })
                                  count = count - 1
                                }
                              }
                            })
                          }
                        }
                      } else {
                        let count = pl.selectionQty
                        while (count != 0) {
                          Entries.CEntry.push({
                            DealID: 0,
                            ID: 0,
                            ItemID: pl.sdmId,
                            ModCode: "NONE",
                            Name: pl.name,
                            QCComponent: QCComponent,
                            QCInstanceID: instanceId,
                            QCLevel: 0,
                            QCProID: product.promoId,
                          })
                          count = count - 1
                        }
                      }
                    }
                  })
                }
              })
            }
          }
        }
      }
    })

    // console.log("Entries", JSON.stringify(Entries))

    await bootstrap(server)

    let order = {
      "licenseCode": "AmericanaWeb",
      "conceptID": 3,
      "order": {
        "AddressID": "10512559",
        "ConceptID": "3",
        "CountryID": 1,
        "CustomerID": "7694266",
        "DeliveryChargeID": 279,
        "DistrictID": -1,
        "Entries": {
          "CEntry": [
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 310001,
              "ModCode": "NONE",
              "Name": "Dinner Meal - Original",
              "QCComponent": 1,
              "QCInstanceID": 624,
              "QCLevel": 0,
              "QCProID": 39
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510001,
              "ModCode": "NONE",
              "Name": "Coleslaw Salad Small",
              "QCComponent": 2,
              "QCInstanceID": 624,
              "QCLevel": 0,
              "QCProID": 39
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 3,
              "QCInstanceID": 624,
              "QCLevel": 0,
              "QCProID": 39
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 600003,
              "ModCode": "NONE",
              "Name": "Pepsi Medium",
              "QCComponent": 4,
              "QCInstanceID": 624,
              "QCLevel": 0,
              "QCProID": 39
            }
          ]
        },
        "OrderID": 0,
        "OrderMode": "1",
        "OrderType": 0,
        "ProvinceID": 7,
        "StoreID": "1219",
        "StreetID": 315
      },
      "autoApprove": "true",
      "useBackupStoreIfAvailable": "true",
      "creditCardPaymentbool": "false",
      "menuTemplateID": "17"
    }
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    // await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: orderPlaced })

  } catch (error) {
    console.error(error)
  }
})()
