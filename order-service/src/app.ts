if (process.env.NODE_ENV == 'staging')
  require('newrelic');
process.env.ALLOW_CONFIG_MUTATIONS = "true";
global.healthcheck = {}
global.configSync = {
  general: 0
}
import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as SDM from './sdm';
import * as ENTITY from './entity';
import * as CMS from './cms';
import * as Constant from './constant'

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)
    // let a: IMenuGrpcRequest.IFetchMenuRes

    // await ENTITY.CartE.createCartOnCMS({}, { cmsUserRef: 12 })

    let stock: any = [
      {
        "sdmId": 7,
        "description": "3 chicken pcs., fries, coleslaw, bun & a drink",
        "position": 10,
        "sku": 900007,
        "bundleProductOptions": [
          {
            "subtitle": "Choice of flavor",
            "position": 1,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of flavor",
            "productLinks": [
              {
                "id": 298,
                "sdmId": 310001,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/310001.png",
                "default": 1,
                "sku": 310001,
                "option_id": 901,
                "price": 0,
                "selection_id": 5145,
                "title": "Dinner Meal - Original",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  2
                ],
                "selected": 1,
                "name": "Dinner Meal - Original"
              },
              {
                "id": 299,
                "sdmId": 310002,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/310002.png",
                "default": 0,
                "sku": 310002,
                "option_id": 901,
                "price": 0,
                "selection_id": 5146,
                "title": "Dinner Meal - Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  2
                ],
                "selected": 0,
                "name": "Dinner Meal - Spicy"
              },
              {
                "id": 300,
                "sdmId": 310003,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/310003.png",
                "default": 0,
                "sku": 310003,
                "option_id": 901,
                "price": 0,
                "selection_id": 5147,
                "title": "Dinner Meal - Mix",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  2
                ],
                "selected": 0,
                "name": "Dinner Meal - Mix"
              }
            ],
            "isModifier": 0,
            "compId": 1,
            "maximumQty": 0,
            "name": "Choice of flavor"
          },
          {
            "subtitle": "3 PC'S Chkn__3_3_1_1_0_0",
            "position": 2,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 3,
            "type": "stepper",
            "title": "3 PC'S Chkn__3_3_1_1_0_0",
            "productLinks": [
              {
                "id": 283,
                "sdmId": 910001,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/910001.png",
                "default": 1,
                "sku": 910001,
                "option_id": 902,
                "price": 0,
                "selection_id": 5148,
                "title": "Chicken Pc - Original",
                "modGroupId": 10206,
                "selectionQty": 2,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Chicken Pc - Original"
              },
              {
                "id": 284,
                "sdmId": 910002,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/910002.png",
                "default": 0,
                "sku": 910002,
                "option_id": 902,
                "price": 0,
                "selection_id": 5149,
                "title": "Chicken Pc - Spicy",
                "modGroupId": 10206,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Chicken Pc - Spicy"
              }
            ],
            "isModifier": 1,
            "compId": 1,
            "maximumQty": 3,
            "name": "3 PC'S Chkn__3_3_1_1_0_0"
          },
          {
            "subtitle": "Choice of second side item",
            "position": 3,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of second side item",
            "productLinks": [
              {
                "id": 271,
                "sdmId": 510050,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/510050.png",
                "default": 1,
                "sku": 510050,
                "option_id": 903,
                "price": 0,
                "selection_id": 5150,
                "title": "Medium Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Medium Fries"
              },
              {
                "id": 257,
                "sdmId": 510001,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/510001.png",
                "default": 0,
                "sku": 510001,
                "option_id": 903,
                "price": 0,
                "selection_id": 5152,
                "title": "Coleslaw Salad Small",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Coleslaw Salad Small"
              },
              {
                "id": 275,
                "sdmId": 510051,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/510051.png",
                "default": 0,
                "sku": 510051,
                "option_id": 903,
                "price": 1,
                "selection_id": 5151,
                "title": "Medium Fries Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Medium Fries Spicy"
              },
              {
                "id": 278,
                "sdmId": 510072,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/510072.png",
                "default": 0,
                "sku": 510072,
                "option_id": 903,
                "price": 1,
                "selection_id": 5154,
                "title": "Medium Dipper Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Medium Dipper Fries"
              },
              {
                "id": 266,
                "sdmId": 510036,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/510036.png",
                "default": 0,
                "sku": 510036,
                "option_id": 903,
                "price": 3,
                "selection_id": 5153,
                "title": "Loaded Fries Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Loaded Fries Regular"
              },
              {
                "id": 291,
                "sdmId": 510079,
                "subOptions": [

                ],
                "position": 6,
                "imageThumbnail": "/imagestemp/510079.png",
                "default": 0,
                "sku": 510079,
                "option_id": 903,
                "price": 3,
                "selection_id": 5156,
                "title": "Regular Loaded Fries Pepper - Chili Sauce",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Regular Loaded Fries Pepper - Chili Sauce"
              },
              {
                "id": 290,
                "sdmId": 510075,
                "subOptions": [

                ],
                "position": 7,
                "imageThumbnail": "/imagestemp/510075.png",
                "default": 0,
                "sku": 510075,
                "option_id": 903,
                "price": 5,
                "selection_id": 5155,
                "title": "Cheese Potato Dipper",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Cheese Potato Dipper"
              },
              {
                "id": 241,
                "sdmId": 510085,
                "subOptions": [

                ],
                "position": 8,
                "imageThumbnail": "/imagestemp/510085.png",
                "default": 0,
                "sku": 510085,
                "option_id": 903,
                "price": 5,
                "selection_id": 5157,
                "title": "Supreme Loaded Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Supreme Loaded Fries"
              }
            ],
            "isModifier": 0,
            "compId": 2,
            "maximumQty": 0,
            "name": "Choice of second side item"
          },
          {
            "subtitle": "Choice of first side item",
            "position": 4,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of first side item",
            "productLinks": [
              {
                "id": 257,
                "sdmId": 510001,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/510001.png",
                "default": 1,
                "sku": 510001,
                "option_id": 904,
                "price": 0,
                "selection_id": 5158,
                "title": "Coleslaw Salad Small",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Coleslaw Salad Small"
              },
              {
                "id": 268,
                "sdmId": 510004,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/510004.png",
                "default": 0,
                "sku": 510004,
                "option_id": 904,
                "price": 2,
                "selection_id": 5159,
                "title": "Regular Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Regular Fries"
              },
              {
                "id": 274,
                "sdmId": 510012,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/510012.png",
                "default": 0,
                "sku": 510012,
                "option_id": 904,
                "price": 3,
                "selection_id": 5160,
                "title": "Regular Fries Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Regular Fries Spicy"
              },
              {
                "id": 277,
                "sdmId": 510071,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/510071.png",
                "default": 0,
                "sku": 510071,
                "option_id": 904,
                "price": 3,
                "selection_id": 5162,
                "title": "Potato Dipper- Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Potato Dipper- Regular"
              },
              {
                "id": 266,
                "sdmId": 510036,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/510036.png",
                "default": 0,
                "sku": 510036,
                "option_id": 904,
                "price": 5,
                "selection_id": 5161,
                "title": "Loaded Fries Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Loaded Fries Regular"
              },
              {
                "id": 290,
                "sdmId": 510075,
                "subOptions": [

                ],
                "position": 6,
                "imageThumbnail": "/imagestemp/510075.png",
                "default": 0,
                "sku": 510075,
                "option_id": 904,
                "price": 7,
                "selection_id": 5163,
                "title": "Cheese Potato Dipper",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Cheese Potato Dipper"
              }
            ],
            "isModifier": 0,
            "compId": 3,
            "maximumQty": 0,
            "name": "Choice of first side item"
          },
          {
            "subtitle": "Choice of Beverages",
            "position": 5,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of Beverages",
            "productLinks": [
              {
                "id": 243,
                "sdmId": 600003,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/600003.png",
                "default": 1,
                "sku": 600003,
                "option_id": 905,
                "price": 0,
                "selection_id": 5164,
                "title": "Pepsi Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Pepsi Medium"
              },
              {
                "id": 255,
                "sdmId": 600009,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/600009.png",
                "default": 0,
                "sku": 600009,
                "option_id": 905,
                "price": 0,
                "selection_id": 5165,
                "title": "Mirinda Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mirinda Medium"
              },
              {
                "id": 250,
                "sdmId": 600016,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/600016.png",
                "default": 0,
                "sku": 600016,
                "option_id": 905,
                "price": 0,
                "selection_id": 5166,
                "title": "7Up Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "7Up Medium"
              },
              {
                "id": 245,
                "sdmId": 600006,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/600006.png",
                "default": 0,
                "sku": 600006,
                "option_id": 905,
                "price": 0,
                "selection_id": 5167,
                "title": "Diet Pepsi Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Diet Pepsi Medium"
              },
              {
                "id": 252,
                "sdmId": 600013,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/600013.png",
                "default": 0,
                "sku": 600013,
                "option_id": 905,
                "price": 0,
                "selection_id": 5168,
                "title": "Mountain Dew Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mountain Dew Medium"
              },
              {
                "id": 292,
                "sdmId": 610011,
                "subOptions": [

                ],
                "position": 6,
                "imageThumbnail": "/imagestemp/610011.png",
                "default": 0,
                "sku": 610011,
                "option_id": 905,
                "price": 0,
                "selection_id": 5170,
                "title": "Small Aquafina",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Small Aquafina"
              },
              {
                "id": 294,
                "sdmId": 610019,
                "subOptions": [

                ],
                "position": 7,
                "imageThumbnail": "/imagestemp/610019.png",
                "default": 0,
                "sku": 610019,
                "option_id": 905,
                "price": 3,
                "selection_id": 5172,
                "title": "Lemon Mint Ice Tea",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Lemon Mint Ice Tea"
              },
              {
                "id": 237,
                "sdmId": 610021,
                "subOptions": [

                ],
                "position": 8,
                "imageThumbnail": "/imagestemp/610021.png",
                "default": 0,
                "sku": 610021,
                "option_id": 905,
                "price": 7.5,
                "selection_id": 5169,
                "title": "Mojito Krusher",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mojito Krusher"
              },
              {
                "id": 236,
                "sdmId": 610020,
                "subOptions": [

                ],
                "position": 9,
                "imageThumbnail": "/imagestemp/610020.png",
                "default": 0,
                "sku": 610020,
                "option_id": 905,
                "price": 8.5,
                "selection_id": 5171,
                "title": "Fresh Orange Juice",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Fresh Orange Juice"
              }
            ],
            "isModifier": 0,
            "compId": 4,
            "maximumQty": 0,
            "name": "Choice of Beverages"
          }
        ],
        "originalPrice": 29.5,
        "items": [
          {
            "sdmId": 7,
            "description": "",
            "position": 10,
            "sku": 900007,
            "title": "Dinner Meal - Medium",
            "bundleProductOptions": [
              {
                "subtitle": "Choice of flavor",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of flavor",
                "productLinks": [
                  {
                    "id": 298,
                    "sdmId": 310001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/310001.png",
                    "default": 1,
                    "sku": 310001,
                    "option_id": 901,
                    "price": 0,
                    "selection_id": 5145,
                    "title": "Dinner Meal - Original",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 1,
                    "name": "Dinner Meal - Original"
                  },
                  {
                    "id": 299,
                    "sdmId": 310002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/310002.png",
                    "default": 0,
                    "sku": 310002,
                    "option_id": 901,
                    "price": 0,
                    "selection_id": 5146,
                    "title": "Dinner Meal - Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 0,
                    "name": "Dinner Meal - Spicy"
                  },
                  {
                    "id": 300,
                    "sdmId": 310003,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/310003.png",
                    "default": 0,
                    "sku": 310003,
                    "option_id": 901,
                    "price": 0,
                    "selection_id": 5147,
                    "title": "Dinner Meal - Mix",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 0,
                    "name": "Dinner Meal - Mix"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Choice of flavor"
              },
              {
                "subtitle": "3 PC'S Chkn__3_3_1_1_0_0",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 3,
                "type": "stepper",
                "title": "3 PC'S Chkn__3_3_1_1_0_0",
                "productLinks": [
                  {
                    "id": 283,
                    "sdmId": 910001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/910001.png",
                    "default": 1,
                    "sku": 910001,
                    "option_id": 902,
                    "price": 0,
                    "selection_id": 5148,
                    "title": "Chicken Pc - Original",
                    "modGroupId": 10206,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chicken Pc - Original"
                  },
                  {
                    "id": 284,
                    "sdmId": 910002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/910002.png",
                    "default": 0,
                    "sku": 910002,
                    "option_id": 902,
                    "price": 0,
                    "selection_id": 5149,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": 10206,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Chicken Pc - Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 3,
                "name": "3 PC'S Chkn__3_3_1_1_0_0"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of second side item",
                "productLinks": [
                  {
                    "id": 271,
                    "sdmId": 510050,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510050.png",
                    "default": 1,
                    "sku": 510050,
                    "option_id": 903,
                    "price": 0,
                    "selection_id": 5150,
                    "title": "Medium Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Medium Fries"
                  },
                  {
                    "id": 257,
                    "sdmId": 510001,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "default": 0,
                    "sku": 510001,
                    "option_id": 903,
                    "price": 0,
                    "selection_id": 5152,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Coleslaw Salad Small"
                  },
                  {
                    "id": 275,
                    "sdmId": 510051,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/510051.png",
                    "default": 0,
                    "sku": 510051,
                    "option_id": 903,
                    "price": 1,
                    "selection_id": 5151,
                    "title": "Medium Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Medium Fries Spicy"
                  },
                  {
                    "id": 278,
                    "sdmId": 510072,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/510072.png",
                    "default": 0,
                    "sku": 510072,
                    "option_id": 903,
                    "price": 1,
                    "selection_id": 5154,
                    "title": "Medium Dipper Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Medium Dipper Fries"
                  },
                  {
                    "id": 266,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 903,
                    "price": 3,
                    "selection_id": 5153,
                    "title": "Loaded Fries Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Loaded Fries Regular"
                  },
                  {
                    "id": 291,
                    "sdmId": 510079,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "default": 0,
                    "sku": 510079,
                    "option_id": 903,
                    "price": 3,
                    "selection_id": 5156,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce"
                  },
                  {
                    "id": 290,
                    "sdmId": 510075,
                    "subOptions": [

                    ],
                    "position": 7,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "default": 0,
                    "sku": 510075,
                    "option_id": 903,
                    "price": 5,
                    "selection_id": 5155,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  },
                  {
                    "id": 241,
                    "sdmId": 510085,
                    "subOptions": [

                    ],
                    "position": 8,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "default": 0,
                    "sku": 510085,
                    "option_id": 903,
                    "price": 5,
                    "selection_id": 5157,
                    "title": "Supreme Loaded Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Supreme Loaded Fries"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 4,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of first side item",
                "productLinks": [
                  {
                    "id": 257,
                    "sdmId": 510001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "default": 1,
                    "sku": 510001,
                    "option_id": 904,
                    "price": 0,
                    "selection_id": 5158,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Coleslaw Salad Small"
                  },
                  {
                    "id": 268,
                    "sdmId": 510004,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "default": 0,
                    "sku": 510004,
                    "option_id": 904,
                    "price": 2,
                    "selection_id": 5159,
                    "title": "Regular Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Regular Fries"
                  },
                  {
                    "id": 274,
                    "sdmId": 510012,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/510012.png",
                    "default": 0,
                    "sku": 510012,
                    "option_id": 904,
                    "price": 3,
                    "selection_id": 5160,
                    "title": "Regular Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Regular Fries Spicy"
                  },
                  {
                    "id": 277,
                    "sdmId": 510071,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "default": 0,
                    "sku": 510071,
                    "option_id": 904,
                    "price": 3,
                    "selection_id": 5162,
                    "title": "Potato Dipper- Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Potato Dipper- Regular"
                  },
                  {
                    "id": 266,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 904,
                    "price": 5,
                    "selection_id": 5161,
                    "title": "Loaded Fries Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Loaded Fries Regular"
                  },
                  {
                    "id": 290,
                    "sdmId": 510075,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "default": 0,
                    "sku": 510075,
                    "option_id": 904,
                    "price": 7,
                    "selection_id": 5163,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of Beverages",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of Beverages",
                "productLinks": [
                  {
                    "id": 243,
                    "sdmId": 600003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/600003.png",
                    "default": 1,
                    "sku": 600003,
                    "option_id": 905,
                    "price": 0,
                    "selection_id": 5164,
                    "title": "Pepsi Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Pepsi Medium"
                  },
                  {
                    "id": 255,
                    "sdmId": 600009,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600009.png",
                    "default": 0,
                    "sku": 600009,
                    "option_id": 905,
                    "price": 0,
                    "selection_id": 5165,
                    "title": "Mirinda Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mirinda Medium"
                  },
                  {
                    "id": 250,
                    "sdmId": 600016,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600016.png",
                    "default": 0,
                    "sku": 600016,
                    "option_id": 905,
                    "price": 0,
                    "selection_id": 5166,
                    "title": "7Up Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "7Up Medium"
                  },
                  {
                    "id": 245,
                    "sdmId": 600006,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600006.png",
                    "default": 0,
                    "sku": 600006,
                    "option_id": 905,
                    "price": 0,
                    "selection_id": 5167,
                    "title": "Diet Pepsi Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Medium"
                  },
                  {
                    "id": 252,
                    "sdmId": 600013,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/600013.png",
                    "default": 0,
                    "sku": 600013,
                    "option_id": 905,
                    "price": 0,
                    "selection_id": 5168,
                    "title": "Mountain Dew Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mountain Dew Medium"
                  },
                  {
                    "id": 292,
                    "sdmId": 610011,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "default": 0,
                    "sku": 610011,
                    "option_id": 905,
                    "price": 0,
                    "selection_id": 5170,
                    "title": "Small Aquafina",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Small Aquafina"
                  },
                  {
                    "id": 294,
                    "sdmId": 610019,
                    "subOptions": [

                    ],
                    "position": 7,
                    "imageThumbnail": "/imagestemp/610019.png",
                    "default": 0,
                    "sku": 610019,
                    "option_id": 905,
                    "price": 3,
                    "selection_id": 5172,
                    "title": "Lemon Mint Ice Tea",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Lemon Mint Ice Tea"
                  },
                  {
                    "id": 237,
                    "sdmId": 610021,
                    "subOptions": [

                    ],
                    "position": 8,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "default": 0,
                    "sku": 610021,
                    "option_id": 905,
                    "price": 7.5,
                    "selection_id": 5169,
                    "title": "Mojito Krusher",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mojito Krusher"
                  },
                  {
                    "id": 236,
                    "sdmId": 610020,
                    "subOptions": [

                    ],
                    "position": 9,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "default": 0,
                    "sku": 610020,
                    "option_id": 905,
                    "price": 8.5,
                    "selection_id": 5171,
                    "title": "Fresh Orange Juice",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Fresh Orange Juice"
                  }
                ],
                "isModifier": 0,
                "compId": 4,
                "maximumQty": 0,
                "name": "Choice of Beverages"
              }
            ],
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "sel1Value": 16287,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 39,
            "taxClassId": 2,
            "name": "Dinner Meal - Medium",
            "id": 383,
            "specialPrice": 28,
            "configurableProductOptions": [
              {
                "position": 1,
                "subtitle": "Choice of Size",
                "id": 144,
                "title": "Choice of Size",
                "options": [
                  {
                    "isSelected": 1,
                    "id": 16287,
                    "title": "Medium",
                    "name": "Medium",
                    "position": 1
                  },
                  {
                    "isSelected": 0,
                    "id": 16286,
                    "title": "Large",
                    "name": "Large",
                    "position": 2
                  }
                ],
                "name": "",
                "selIndex": 1
              }
            ],
            "associative": 0,
            "metaKeyword": [
              "Dinner Meal - Medium"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900007.png",
            "finalPrice": 28,
            "virtualGroup": 0,
            "inSide": 1
          },
          {
            "sdmId": 8,
            "description": "",
            "position": 11,
            "sku": 900008,
            "title": "Dinner Meal - Large",
            "bundleProductOptions": [
              {
                "subtitle": "Choice of flavor",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of flavor",
                "productLinks": [
                  {
                    "id": 298,
                    "sdmId": 310001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/310001.png",
                    "default": 1,
                    "sku": 310001,
                    "option_id": 906,
                    "price": 0,
                    "selection_id": 5173,
                    "title": "Dinner Meal - Original",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Dinner Meal - Original"
                  },
                  {
                    "id": 299,
                    "sdmId": 310002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/310002.png",
                    "default": 0,
                    "sku": 310002,
                    "option_id": 906,
                    "price": 0,
                    "selection_id": 5174,
                    "title": "Dinner Meal - Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Dinner Meal - Spicy"
                  },
                  {
                    "id": 300,
                    "sdmId": 310003,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/310003.png",
                    "default": 0,
                    "sku": 310003,
                    "option_id": 906,
                    "price": 0,
                    "selection_id": 5175,
                    "title": "Dinner Meal - Mix",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 1,
                    "name": "Dinner Meal - Mix"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Choice of flavor"
              },
              {
                "subtitle": "3 PC'S Chkn__3_3_1_1_0_0",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 3,
                "type": "stepper",
                "title": "3 PC'S Chkn__3_3_1_1_0_0",
                "productLinks": [
                  {
                    "id": 283,
                    "sdmId": 910001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/910001.png",
                    "default": 1,
                    "sku": 910001,
                    "option_id": 907,
                    "price": 0,
                    "selection_id": 5176,
                    "title": "Chicken Pc - Original",
                    "modGroupId": 10206,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chicken Pc - Original"
                  },
                  {
                    "id": 284,
                    "sdmId": 910002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/910002.png",
                    "default": 1,
                    "sku": 910002,
                    "option_id": 907,
                    "price": 0,
                    "selection_id": 5177,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": 10206,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Chicken Pc - Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 3,
                "name": "3 PC'S Chkn__3_3_1_1_0_0"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of second side item",
                "productLinks": [
                  {
                    "id": 269,
                    "sdmId": 510006,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510006.png",
                    "default": 1,
                    "sku": 510006,
                    "option_id": 908,
                    "price": 0,
                    "selection_id": 5178,
                    "title": "Large Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Large Fries"
                  },
                  {
                    "id": 257,
                    "sdmId": 510001,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "default": 0,
                    "sku": 510001,
                    "option_id": 908,
                    "price": 0,
                    "selection_id": 5180,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Coleslaw Salad Small"
                  },
                  {
                    "id": 272,
                    "sdmId": 510013,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/510013.png",
                    "default": 0,
                    "sku": 510013,
                    "option_id": 908,
                    "price": 1,
                    "selection_id": 5179,
                    "title": "Large Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Large Fries Spicy"
                  },
                  {
                    "id": 279,
                    "sdmId": 510073,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/510073.png",
                    "default": 0,
                    "sku": 510073,
                    "option_id": 908,
                    "price": 1,
                    "selection_id": 5182,
                    "title": "Large Dipper Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Large Dipper Fries"
                  },
                  {
                    "id": 266,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 908,
                    "price": 3,
                    "selection_id": 5181,
                    "title": "Loaded Fries Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Loaded Fries Regular"
                  },
                  {
                    "id": 291,
                    "sdmId": 510079,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "default": 0,
                    "sku": 510079,
                    "option_id": 908,
                    "price": 3,
                    "selection_id": 5184,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce"
                  },
                  {
                    "id": 290,
                    "sdmId": 510075,
                    "subOptions": [

                    ],
                    "position": 7,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "default": 0,
                    "sku": 510075,
                    "option_id": 908,
                    "price": 5,
                    "selection_id": 5183,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  },
                  {
                    "id": 241,
                    "sdmId": 510085,
                    "subOptions": [

                    ],
                    "position": 8,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "default": 0,
                    "sku": 510085,
                    "option_id": 908,
                    "price": 5,
                    "selection_id": 5185,
                    "title": "Supreme Loaded Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Supreme Loaded Fries"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 4,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of first side item",
                "productLinks": [
                  {
                    "id": 257,
                    "sdmId": 510001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "default": 1,
                    "sku": 510001,
                    "option_id": 909,
                    "price": 0,
                    "selection_id": 5186,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Coleslaw Salad Small"
                  },
                  {
                    "id": 268,
                    "sdmId": 510004,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "default": 0,
                    "sku": 510004,
                    "option_id": 909,
                    "price": 2,
                    "selection_id": 5187,
                    "title": "Regular Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Regular Fries"
                  },
                  {
                    "id": 277,
                    "sdmId": 510071,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "default": 0,
                    "sku": 510071,
                    "option_id": 909,
                    "price": 2,
                    "selection_id": 5190,
                    "title": "Potato Dipper- Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Potato Dipper- Regular"
                  },
                  {
                    "id": 274,
                    "sdmId": 510012,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/510012.png",
                    "default": 0,
                    "sku": 510012,
                    "option_id": 909,
                    "price": 3,
                    "selection_id": 5188,
                    "title": "Regular Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Regular Fries Spicy"
                  },
                  {
                    "id": 266,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 909,
                    "price": 5,
                    "selection_id": 5189,
                    "title": "Loaded Fries Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Loaded Fries Regular"
                  },
                  {
                    "id": 290,
                    "sdmId": 510075,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "default": 0,
                    "sku": 510075,
                    "option_id": 909,
                    "price": 7,
                    "selection_id": 5191,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of Beverages",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of Beverages",
                "productLinks": [
                  {
                    "id": 244,
                    "sdmId": 600004,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/600004.png",
                    "default": 1,
                    "sku": 600004,
                    "option_id": 910,
                    "price": 0,
                    "selection_id": 5192,
                    "title": "Pepsi Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Pepsi Large"
                  },
                  {
                    "id": 256,
                    "sdmId": 600010,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600010.png",
                    "default": 0,
                    "sku": 600010,
                    "option_id": 910,
                    "price": 0,
                    "selection_id": 5193,
                    "title": "Mirinda Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mirinda Large"
                  },
                  {
                    "id": 248,
                    "sdmId": 600017,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600017.png",
                    "default": 0,
                    "sku": 600017,
                    "option_id": 910,
                    "price": 0,
                    "selection_id": 5194,
                    "title": "7Up Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "7Up Large"
                  },
                  {
                    "id": 247,
                    "sdmId": 600007,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600007.png",
                    "default": 0,
                    "sku": 600007,
                    "option_id": 910,
                    "price": 0,
                    "selection_id": 5195,
                    "title": "Diet Pepsi Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Large"
                  },
                  {
                    "id": 253,
                    "sdmId": 600014,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/600014.png",
                    "default": 0,
                    "sku": 600014,
                    "option_id": 910,
                    "price": 0,
                    "selection_id": 5196,
                    "title": "Mountain Dew Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mountain Dew Large"
                  },
                  {
                    "id": 292,
                    "sdmId": 610011,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "default": 0,
                    "sku": 610011,
                    "option_id": 910,
                    "price": 0,
                    "selection_id": 5198,
                    "title": "Small Aquafina",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Small Aquafina"
                  },
                  {
                    "id": 294,
                    "sdmId": 610019,
                    "subOptions": [

                    ],
                    "position": 7,
                    "imageThumbnail": "/imagestemp/610019.png",
                    "default": 0,
                    "sku": 610019,
                    "option_id": 910,
                    "price": 3,
                    "selection_id": 5200,
                    "title": "Lemon Mint Ice Tea",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Lemon Mint Ice Tea"
                  },
                  {
                    "id": 237,
                    "sdmId": 610021,
                    "subOptions": [

                    ],
                    "position": 8,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "default": 0,
                    "sku": 610021,
                    "option_id": 910,
                    "price": 7.5,
                    "selection_id": 5197,
                    "title": "Mojito Krusher",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mojito Krusher"
                  },
                  {
                    "id": 236,
                    "sdmId": 610020,
                    "subOptions": [

                    ],
                    "position": 9,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "default": 0,
                    "sku": 610020,
                    "option_id": 910,
                    "price": 8.5,
                    "selection_id": 5199,
                    "title": "Fresh Orange Juice",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Fresh Orange Juice"
                  }
                ],
                "isModifier": 0,
                "compId": 4,
                "maximumQty": 0,
                "name": "Choice of Beverages"
              }
            ],
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "sel1Value": 16286,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 39,
            "taxClassId": 2,
            "name": "Dinner Meal - Large",
            "id": 384,
            "specialPrice": 29.5,
            "configurableProductOptions": [
              {
                "position": 1,
                "subtitle": "Choice of Size",
                "id": 144,
                "title": "Choice of Size",
                "options": [
                  {
                    "isSelected": 1,
                    "id": 16287,
                    "title": "Medium",
                    "name": "Medium",
                    "position": 1
                  },
                  {
                    "isSelected": 0,
                    "id": 16286,
                    "title": "Large",
                    "name": "Large",
                    "position": 2
                  }
                ],
                "name": "",
                "selIndex": 1
              }
            ],
            "associative": 0,
            "metaKeyword": [
              "Dinner Meal - Large"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900008.png",
            "finalPrice": 29.5,
            "virtualGroup": 0,
            "inSide": 1
          }
        ],
        "baseFinalPrice": 28,
        "catId": 12,
        "visibility": 4,
        "promoId": 39,
        "taxClassId": 2,
        "name": "Dinner Meal",
        "baseSpecialPrice": 0,
        "id": 17,
        "specialPrice": 29.5,
        "configurableProductOptions": [
          {
            "position": 1,
            "subtitle": "Choice of Size",
            "id": 144,
            "title": "Choice of Size",
            "options": [
              {
                "isSelected": 0,
                "id": 16287,
                "title": "Medium",
                "name": "Medium",
                "position": 1
              },
              {
                "isSelected": 1,
                "id": 16286,
                "title": "Large",
                "name": "Large",
                "position": 2
              }
            ],
            "name": "",
            "selIndex": 1
          }
        ],
        "qty": 1,
        "sellingPrice": 29.5,
        "originalTypeId": "bundle_group",
        "associative": 0,
        "menuId": 1,
        "metaKeyword": [
          "Dinner Meal - Medium"
        ],
        "typeId": "bundle_group",
        "selectedItem": 900008,
        "imageThumbnail": "/imagestemp/900007.png",
        "virtualGroup": 0,
        "finalPrice": 29.5,
        "inSide": 1
      }
    ]

    let Entries = {
      CEntry: []
    }

    stock.forEach(product => {
      for (let i = 0; i < product.qty; i++) {
        let instanceId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
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
                              if (so.sdmId)
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
                              if (so.sdmId)
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
                  ItemID: i.sdmId,
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
                              console.log("11111111111111111")
                              if (pl.dependentSteps && pl.dependentSteps.length > 0) {
                                console.log("2222222222222222222222222222222222222222222")

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
                                console.log("333333333333333333333333", dependentSteps)

                                if (dependentSteps.ingredient == 1 || dependentSteps.isModifier == 1) {
                                  console.log("333333333333333333333333aaaaaaaaaaaaaaaaaaaa", dependentSteps)
                                  if (dependentSteps['type'] == "stepper") {
                                    console.log("666666666666666666666666666666")
                                    /**
                                     * @description (type == "stepper") : "name": "Dinner Meal", 
                                     */
                                    dependentSteps.productLinks.forEach(dspl => {
                                      if (dspl.selectionQty > 0) {
                                        let count = dspl.selectionQty
                                        while (count != 0) {
                                          obj.Entries.CEntry.push({
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
                                  } else {
                                    /**
                                     * @description (ingredient == 1) :  "name": "Twister Meal"
                                     * @description (isModifier == 1) :  "name": "Mighty Twist"
                                     */
                                    if (dependentSteps.productLinks && dependentSteps.productLinks.length > 0) {
                                      console.log("444444444444444444444444444")
                                      dependentSteps.productLinks.forEach(dspl => {
                                        console.log("55555555555555555555555555555")
                                        if (dspl.subOptions && dspl.subOptions.length > 0) {
                                          dspl.subOptions.forEach(dsplso => {
                                            if (dsplso.sdmId && dsplso.selected == 1) {
                                              if (dsplso.title == "None") {
                                                console.log("none")
                                              }
                                              else if (dsplso.title == "Regular") {
                                                obj.Entries.CEntry.push({
                                                  ID: 0,
                                                  ItemID: dsplso.sdmId,
                                                  ModCode: "WITH",
                                                  ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                  Name: dspl.name,
                                                  OrdrMode: "OM_SAVED",
                                                  Weight: 0,
                                                })
                                              } else if (dsplso.title == "Extra") {
                                                obj.Entries.CEntry.push({
                                                  ID: 0,
                                                  ItemID: dsplso.sdmId,
                                                  ModCode: "WITH",
                                                  ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                  Name: dspl.name,
                                                  OrdrMode: "OM_SAVED",
                                                  Weight: 0,
                                                }, {
                                                  ID: 0,
                                                  ItemID: dsplso.sdmId,
                                                  ModCode: "WITH",
                                                  ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                  Name: dspl.name,
                                                  OrdrMode: "OM_SAVED",
                                                  Weight: 0,
                                                })
                                              }
                                            }
                                          })
                                        }
                                      })
                                    }
                                  }
                                  Entries.CEntry.push(obj)
                                }
                              } else {
                                console.log("777777777777777777777777777777")

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
                              if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                bpopl.subOptions.forEach(bpoplso => {
                                  if (bpoplso.sdmId && bpoplso.selected == 1) {
                                    if (bpoplso.title == "None") { }
                                    else if (bpoplso.title == "Regular") {
                                      lastProductAddedInCentry.Entries.CEntry.push({
                                        ID: 0,
                                        ItemID: bpoplso.sdmId,
                                        ModCode: "WITH",
                                        ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                        Name: bpopl.name,
                                        OrdrMode: "OM_SAVED",
                                        Weight: 0,
                                      })
                                    } else if (bpoplso.title == "Extra") {
                                      lastProductAddedInCentry.Entries.CEntry.push({
                                        ID: 0,
                                        ItemID: bpoplso.sdmId,
                                        ModCode: "WITH",
                                        ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                        Name: bpopl.name,
                                        OrdrMode: "OM_SAVED",
                                        Weight: 0,
                                      }, {
                                        ID: 0,
                                        ItemID: bpoplso.sdmId,
                                        ModCode: "WITH",
                                        ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                        Name: bpopl.name,
                                        OrdrMode: "OM_SAVED",
                                        Weight: 0,
                                      })
                                    }
                                  }
                                })
                              }
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

    console.log("Entries", JSON.stringify(Entries))


    await bootstrap(server)
    let order = {
      "licenseCode": Constant.SERVER.SDM.LICENSE_CODE,
      "conceptID": 3,
      "order": {
        "AddressID": "10514480",//"10512559",//,//
        "ConceptID": "3",
        "CountryID": 1,
        "CustomerID": "7695133",// "7694266",//"",// 
        "DeliveryChargeID": 279,
        "DistrictID": -1,
        "Entries": Entries,
        "OrderID": 0,
        "OrderMode": "1",
        "OrderType": 0,
        "ProvinceID": 7,
        "StoreID": "1240",// "1219"
        "StreetID": 315
      },
      "autoApprove": "true",
      "useBackupStoreIfAvailable": "true",
      "creditCardPaymentbool": "false",
      "menuTemplateID": "17"
    }
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 48601160, language: "En" })
    // await SDM.OrderSDME.cancelOrder({
    //   sdmOrderRef: 39838313,
    //   voidReason: 1,
    //   validationRemarks: Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED
    // })
  } catch (error) {
    console.error(error)
  }
})()