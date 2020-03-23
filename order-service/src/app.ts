if (process.env.NODE_ENV == 'staging')
  require('newrelic');
process.env.ALLOW_CONFIG_MUTATIONS = "true";
global.healthcheck = {}
global.configSync = {
  general: 0,
  kafka: 0,
  orderStatus: 0
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
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [
          {
            "compId": 1,
            "imageThumbnail": "/imagestemp/0.png",
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
                  2
                ],
                "id": 287,
                "imageThumbnail": "/imagestemp/110005.png",
                "modGroupId": -1,
                "name": "Mighty Zinger",
                "option_id": 829,
                "position": 1,
                "price": 0,
                "sdmId": 110005,
                "selected": 1,
                "selection_id": 4689,
                "selectionQty": 1,
                "sku": 110005,
                "subOptions": [

                ],
                "title": "Mighty Zinger"
              }
            ],
            "subtitle": "Select Your favorite Sandwich",
            "title": "Select Your favorite Sandwich",
            "type": "radio"
          },
          {
            "compId": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 1,
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
                "id": 366,
                "imageThumbnail": "/imagestemp/810001.png",
                "modGroupId": 10028,
                "name": "American Cheese",
                "option_id": 830,
                "position": 1,
                "price": 0,
                "sdmId": 810001,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 810001,
                "subOptions": [
                  {
                    "id": 364,
                    "is_sdm_default": 1,
                    "modGroupId": 10028,
                    "name": "Regular",
                    "option_id": 366,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 810001,
                    "selected": 1,
                    "selection_id": 4690,
                    "sku": 810001,
                    "title": "Regular"
                  },
                  {
                    "id": 365,
                    "is_sdm_default": 0,
                    "modGroupId": 10028,
                    "name": "Extra",
                    "option_id": 366,
                    "price": 2,
                    "product_id": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 4691,
                    "sku": 810001,
                    "title": "Extra"
                  }
                ],
                "title": "American Cheese"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 369,
                "imageThumbnail": "/imagestemp/811701.png",
                "modGroupId": 10027,
                "name": "Lettuce",
                "option_id": 830,
                "position": 2,
                "price": 0,
                "sdmId": 811701,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 811701,
                "subOptions": [
                  {
                    "id": 367,
                    "is_sdm_default": 1,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 369,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 4692,
                    "sku": 811701,
                    "title": "Regular"
                  },
                  {
                    "id": 368,
                    "is_sdm_default": 0,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 369,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811701,
                    "selected": 0,
                    "selection_id": 4693,
                    "sku": 811701,
                    "title": "Extra"
                  }
                ],
                "title": "Lettuce"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 372,
                "imageThumbnail": "/imagestemp/811703.png",
                "modGroupId": 10027,
                "name": "Tomato",
                "option_id": 830,
                "position": 4,
                "price": 0,
                "sdmId": 811703,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 811703,
                "subOptions": [
                  {
                    "id": 370,
                    "is_sdm_default": 1,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 372,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 4694,
                    "sku": 811703,
                    "title": "Regular"
                  },
                  {
                    "id": 371,
                    "is_sdm_default": 0,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 372,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811703,
                    "selected": 0,
                    "selection_id": 4695,
                    "sku": 811703,
                    "title": "Extra"
                  }
                ],
                "title": "Tomato"
              }
            ],
            "subtitle": "Add Some Cheese",
            "title": "Add Some Cheese",
            "type": "checkbox"
          },
          {
            "compId": 2,
            "imageThumbnail": "/imagestemp/0.png",
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
                  4
                ],
                "id": 288,
                "imageThumbnail": "/imagestemp/110003.png",
                "modGroupId": -1,
                "name": "Twister Sandwich - Original",
                "option_id": 831,
                "position": 1,
                "price": 0,
                "sdmId": 110003,
                "selected": 1,
                "selection_id": 4696,
                "selectionQty": 1,
                "sku": 110003,
                "subOptions": [

                ],
                "title": "Twister Sandwich - Original"
              },
              {
                "default": 0,
                "dependentSteps": [
                  4
                ],
                "id": 289,
                "imageThumbnail": "/imagestemp/110002.png",
                "modGroupId": -1,
                "name": "Twister Sandwich - Spicy",
                "option_id": 831,
                "position": 2,
                "price": 0,
                "sdmId": 110002,
                "selected": 0,
                "selection_id": 4697,
                "selectionQty": 1,
                "sku": 110002,
                "subOptions": [

                ],
                "title": "Twister Sandwich - Spicy"
              }
            ],
            "subtitle": "Select Your Second Sandwich",
            "title": "Select Your Second Sandwich",
            "type": "radio"
          },
          {
            "compId": 2,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 1,
            "isDependent": 1,
            "isModifier": 1,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 4,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 369,
                "imageThumbnail": "/imagestemp/811701.png",
                "modGroupId": 10027,
                "name": "Lettuce",
                "option_id": 832,
                "position": 1,
                "price": 0,
                "sdmId": 811701,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 811701,
                "subOptions": [
                  {
                    "id": 367,
                    "is_sdm_default": 1,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 369,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 4700,
                    "sku": 811701,
                    "title": "Regular"
                  },
                  {
                    "id": 368,
                    "is_sdm_default": 0,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 369,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811701,
                    "selected": 0,
                    "selection_id": 4701,
                    "sku": 811701,
                    "title": "Extra"
                  }
                ],
                "title": "Lettuce"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 372,
                "imageThumbnail": "/imagestemp/811703.png",
                "modGroupId": 10027,
                "name": "Tomato",
                "option_id": 832,
                "position": 3,
                "price": 0,
                "sdmId": 811703,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 811703,
                "subOptions": [
                  {
                    "id": 370,
                    "is_sdm_default": 1,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 372,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 4702,
                    "sku": 811703,
                    "title": "Regular"
                  },
                  {
                    "id": 371,
                    "is_sdm_default": 0,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 372,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811703,
                    "selected": 0,
                    "selection_id": 4703,
                    "sku": 811703,
                    "title": "Extra"
                  }
                ],
                "title": "Tomato"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 366,
                "imageThumbnail": "/imagestemp/810001.png",
                "modGroupId": 10028,
                "name": "American Cheese",
                "option_id": 832,
                "position": 5,
                "price": 0,
                "sdmId": 810001,
                "selected": 0,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 810001,
                "subOptions": [
                  {
                    "id": 364,
                    "is_sdm_default": 0,
                    "modGroupId": 10028,
                    "name": "Regular",
                    "option_id": 366,
                    "price": 2,
                    "product_id": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 4698,
                    "sku": 810001,
                    "title": "Regular"
                  },
                  {
                    "id": 365,
                    "is_sdm_default": 0,
                    "modGroupId": 10028,
                    "name": "Extra",
                    "option_id": 366,
                    "price": 4,
                    "product_id": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 4699,
                    "sku": 810001,
                    "title": "Extra"
                  }
                ],
                "title": "American Cheese"
              }
            ],
            "subtitle": "Add Some Cheese",
            "title": "Add Some Cheese",
            "type": "checkbox"
          },
          {
            "compId": 3,
            "imageThumbnail": "/imagestemp/0.png",
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
                "id": 271,
                "imageThumbnail": "/imagestemp/510050.png",
                "modGroupId": -1,
                "name": "Medium Fries",
                "option_id": 833,
                "position": 1,
                "price": 0,
                "sdmId": 510050,
                "selected": 1,
                "selection_id": 4704,
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
                "id": 257,
                "imageThumbnail": "/imagestemp/510001.png",
                "modGroupId": -1,
                "name": "Coleslaw Salad Small",
                "option_id": 833,
                "position": 2,
                "price": 0,
                "sdmId": 510001,
                "selected": 0,
                "selection_id": 4706,
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
                "id": 275,
                "imageThumbnail": "/imagestemp/510051.png",
                "modGroupId": -1,
                "name": "Medium Fries Spicy",
                "option_id": 833,
                "position": 3,
                "price": 1,
                "sdmId": 510051,
                "selected": 0,
                "selection_id": 4705,
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
                "id": 277,
                "imageThumbnail": "/imagestemp/510071.png",
                "modGroupId": -1,
                "name": "Potato Dipper- Regular",
                "option_id": 833,
                "position": 4,
                "price": 1,
                "sdmId": 510071,
                "selected": 0,
                "selection_id": 4708,
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
                "id": 266,
                "imageThumbnail": "/imagestemp/510036.png",
                "modGroupId": -1,
                "name": "Loaded Fries Regular",
                "option_id": 833,
                "position": 5,
                "price": 3,
                "sdmId": 510036,
                "selected": 0,
                "selection_id": 4707,
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
                "id": 291,
                "imageThumbnail": "/imagestemp/510079.png",
                "modGroupId": -1,
                "name": "Regular Loaded Fries Pepper - Chili Sauce",
                "option_id": 833,
                "position": 6,
                "price": 3,
                "sdmId": 510079,
                "selected": 0,
                "selection_id": 4710,
                "selectionQty": 1,
                "sku": 510079,
                "subOptions": [

                ],
                "title": "Regular Loaded Fries Pepper - Chili Sauce"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 290,
                "imageThumbnail": "/imagestemp/510075.png",
                "modGroupId": -1,
                "name": "Cheese Potato Dipper",
                "option_id": 833,
                "position": 7,
                "price": 5,
                "sdmId": 510075,
                "selected": 0,
                "selection_id": 4709,
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
                "id": 241,
                "imageThumbnail": "/imagestemp/510085.png",
                "modGroupId": -1,
                "name": "Supreme Loaded Fries",
                "option_id": 833,
                "position": 8,
                "price": 5,
                "sdmId": 510085,
                "selected": 0,
                "selection_id": 4711,
                "selectionQty": 1,
                "sku": 510085,
                "subOptions": [

                ],
                "title": "Supreme Loaded Fries"
              }
            ],
            "subtitle": "Select your favorite side item",
            "title": "Select your favorite side item",
            "type": "radio"
          },
          {
            "compId": 4,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 6,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [

                ],
                "id": 243,
                "imageThumbnail": "/imagestemp/600003.png",
                "modGroupId": -1,
                "name": "Pepsi Medium",
                "option_id": 834,
                "position": 1,
                "price": 0,
                "sdmId": 600003,
                "selected": 1,
                "selection_id": 4712,
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
                "id": 255,
                "imageThumbnail": "/imagestemp/600009.png",
                "modGroupId": -1,
                "name": "Mirinda Medium",
                "option_id": 834,
                "position": 2,
                "price": 0,
                "sdmId": 600009,
                "selected": 0,
                "selection_id": 4713,
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
                "id": 250,
                "imageThumbnail": "/imagestemp/600016.png",
                "modGroupId": -1,
                "name": "7Up Medium",
                "option_id": 834,
                "position": 3,
                "price": 0,
                "sdmId": 600016,
                "selected": 0,
                "selection_id": 4714,
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
                "id": 245,
                "imageThumbnail": "/imagestemp/600006.png",
                "modGroupId": -1,
                "name": "Diet Pepsi Medium",
                "option_id": 834,
                "position": 4,
                "price": 0,
                "sdmId": 600006,
                "selected": 0,
                "selection_id": 4715,
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
                "id": 252,
                "imageThumbnail": "/imagestemp/600013.png",
                "modGroupId": -1,
                "name": "Mountain Dew Medium",
                "option_id": 834,
                "position": 5,
                "price": 0,
                "sdmId": 600013,
                "selected": 0,
                "selection_id": 4716,
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
                "id": 292,
                "imageThumbnail": "/imagestemp/610011.png",
                "modGroupId": -1,
                "name": "Small Aquafina",
                "option_id": 834,
                "position": 6,
                "price": 0,
                "sdmId": 610011,
                "selected": 0,
                "selection_id": 4718,
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
                "id": 237,
                "imageThumbnail": "/imagestemp/610021.png",
                "modGroupId": -1,
                "name": "Mojito Krusher",
                "option_id": 834,
                "position": 7,
                "price": 5.5,
                "sdmId": 610021,
                "selected": 0,
                "selection_id": 4717,
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
                "id": 236,
                "imageThumbnail": "/imagestemp/610020.png",
                "modGroupId": -1,
                "name": "Fresh Orange Juice",
                "option_id": 834,
                "position": 8,
                "price": 8.5,
                "sdmId": 610020,
                "selected": 0,
                "selection_id": 4719,
                "selectionQty": 1,
                "sku": 610020,
                "subOptions": [

                ],
                "title": "Fresh Orange Juice"
              }
            ],
            "subtitle": "Select your favorite beverage",
            "title": "Select your favorite beverage",
            "type": "radio"
          }
        ],
        "catId": 4,
        "configurableProductOptions": [
          {
            "id": 144,
            "options": [
              {
                "id": 16285,
                "isSelected": 1,
                "position": 1,
                "title": "Regular"
              },
              {
                "id": 16287,
                "isSelected": 0,
                "position": 2,
                "title": "Medium"
              },
              {
                "id": 16286,
                "isSelected": 0,
                "position": 3,
                "title": "Large"
              }
            ],
            "position": 1,
            "selIndex": 1,
            "subtitle": "Choice of Size",
            "title": "Choice of Size"
          }
        ],
        "description": "Mighty Zinger + Twister + Fries + Pepsi",
        "finalPrice": 25,
        "id": 16,
        "image": "imagestemp/900070.png",
        "imageSmall": "imagestemp/900070.png",
        "imageThumbnail": "imagestemp/900070.png",
        "inSide": 1,
        "items": [
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 1,
                "imageThumbnail": "/imagestemp/0.png",
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
                      2
                    ],
                    "id": 287,
                    "imageThumbnail": "/imagestemp/110005.png",
                    "modGroupId": -1,
                    "name": "Mighty Zinger",
                    "option_id": 841,
                    "position": 1,
                    "price": 0,
                    "sdmId": 110005,
                    "selected": 1,
                    "selection_id": 4751,
                    "selectionQty": 1,
                    "sku": 110005,
                    "subOptions": [

                    ],
                    "title": "Mighty Zinger"
                  }
                ],
                "subtitle": "Select Your favorite Sandwich",
                "title": "Select Your favorite Sandwich",
                "type": "radio"
              },
              {
                "compId": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 1,
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
                    "id": 366,
                    "imageThumbnail": "imagestemp/810001.png",
                    "modGroupId": 10028,
                    "name": "American Cheese",
                    "option_id": 842,
                    "position": 1,
                    "price": 0,
                    "sdmId": 810001,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "id": 364,
                        "is_sdm_default": 1,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 366,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 4752,
                        "sku": 810001,
                        "title": "Regular"
                      },
                      {
                        "id": 365,
                        "is_sdm_default": 0,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 366,
                        "price": 2,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 1,
                        "selection_id": 4753,
                        "sku": 810001,
                        "title": "Extra"
                      }
                    ],
                    "title": "American Cheese"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 369,
                    "imageThumbnail": "imagestemp/811701.png",
                    "modGroupId": 10027,
                    "name": "Lettuce",
                    "option_id": 842,
                    "position": 2,
                    "price": 0,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "id": 367,
                        "is_sdm_default": 1,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 1,
                        "selection_id": 4754,
                        "sku": 811701,
                        "title": "Regular"
                      },
                      {
                        "id": 368,
                        "is_sdm_default": 0,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 0,
                        "selection_id": 4755,
                        "sku": 811701,
                        "title": "Extra"
                      }
                    ],
                    "title": "Lettuce"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 372,
                    "imageThumbnail": "imagestemp/811703.png",
                    "modGroupId": 10027,
                    "name": "Tomato",
                    "option_id": 842,
                    "position": 4,
                    "price": 0,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "id": 370,
                        "is_sdm_default": 1,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 1,
                        "selection_id": 4756,
                        "sku": 811703,
                        "title": "Regular"
                      },
                      {
                        "id": 371,
                        "is_sdm_default": 0,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 0,
                        "selection_id": 4757,
                        "sku": 811703,
                        "title": "Extra"
                      }
                    ],
                    "title": "Tomato"
                  }
                ],
                "subtitle": "Add Some Cheese",
                "title": "Add Some Cheese",
                "type": "checkbox"
              },
              {
                "compId": 2,
                "imageThumbnail": "/imagestemp/0.png",
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
                      4
                    ],
                    "id": 288,
                    "imageThumbnail": "/imagestemp/110003.png",
                    "modGroupId": -1,
                    "name": "Twister Sandwich - Original",
                    "option_id": 843,
                    "position": 1,
                    "price": 0,
                    "sdmId": 110003,
                    "selected": 1,
                    "selection_id": 4758,
                    "selectionQty": 1,
                    "sku": 110003,
                    "subOptions": [

                    ],
                    "title": "Twister Sandwich - Original"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      4
                    ],
                    "id": 289,
                    "imageThumbnail": "/imagestemp/110002.png",
                    "modGroupId": -1,
                    "name": "Twister Sandwich - Spicy",
                    "option_id": 843,
                    "position": 2,
                    "price": 0,
                    "sdmId": 110002,
                    "selected": 0,
                    "selection_id": 4759,
                    "selectionQty": 1,
                    "sku": 110002,
                    "subOptions": [

                    ],
                    "title": "Twister Sandwich - Spicy"
                  }
                ],
                "subtitle": "Select Your Second Sandwich",
                "title": "Select Your Second Sandwich",
                "type": "radio"
              },
              {
                "compId": 2,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 1,
                "isDependent": 1,
                "isModifier": 1,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 369,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "modGroupId": 10027,
                    "name": "Lettuce",
                    "option_id": 844,
                    "position": 1,
                    "price": 0,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "id": 367,
                        "is_sdm_default": 1,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 1,
                        "selection_id": 4762,
                        "sku": 811701,
                        "title": "Regular"
                      },
                      {
                        "id": 368,
                        "is_sdm_default": 0,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 0,
                        "selection_id": 4763,
                        "sku": 811701,
                        "title": "Extra"
                      }
                    ],
                    "title": "Lettuce"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 372,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "modGroupId": 10027,
                    "name": "Tomato",
                    "option_id": 844,
                    "position": 3,
                    "price": 0,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "id": 370,
                        "is_sdm_default": 1,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 1,
                        "selection_id": 4764,
                        "sku": 811703,
                        "title": "Regular"
                      },
                      {
                        "id": 371,
                        "is_sdm_default": 0,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 0,
                        "selection_id": 4765,
                        "sku": 811703,
                        "title": "Extra"
                      }
                    ],
                    "title": "Tomato"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 366,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "modGroupId": 10028,
                    "name": "American Cheese",
                    "option_id": 844,
                    "position": 5,
                    "price": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "id": 364,
                        "is_sdm_default": 0,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 366,
                        "price": 2,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 4760,
                        "sku": 810001,
                        "title": "Regular"
                      },
                      {
                        "id": 365,
                        "is_sdm_default": 0,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 366,
                        "price": 4,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 4761,
                        "sku": 810001,
                        "title": "Extra"
                      }
                    ],
                    "title": "American Cheese"
                  }
                ],
                "subtitle": "Add Some Cheese",
                "title": "Add Some Cheese",
                "type": "checkbox"
              },
              {
                "compId": 3,
                "imageThumbnail": "/imagestemp/0.png",
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
                    "id": 268,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "modGroupId": -1,
                    "name": "Regular Fries",
                    "option_id": 845,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510004,
                    "selected": 1,
                    "selection_id": 4766,
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
                    "id": 257,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 845,
                    "position": 2,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 4768,
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
                    "id": 274,
                    "imageThumbnail": "/imagestemp/510012.png",
                    "modGroupId": -1,
                    "name": "Regular Fries Spicy",
                    "option_id": 845,
                    "position": 3,
                    "price": 1,
                    "sdmId": 510012,
                    "selected": 0,
                    "selection_id": 4767,
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
                    "id": 277,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "modGroupId": -1,
                    "name": "Potato Dipper- Regular",
                    "option_id": 845,
                    "position": 4,
                    "price": 1,
                    "sdmId": 510071,
                    "selected": 0,
                    "selection_id": 4770,
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
                    "id": 266,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 845,
                    "position": 5,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 4769,
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
                    "id": 291,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "modGroupId": -1,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce",
                    "option_id": 845,
                    "position": 6,
                    "price": 3,
                    "sdmId": 510079,
                    "selected": 0,
                    "selection_id": 4772,
                    "selectionQty": 1,
                    "sku": 510079,
                    "subOptions": [

                    ],
                    "title": "Regular Loaded Fries Pepper - Chili Sauce"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 290,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "modGroupId": -1,
                    "name": "Cheese Potato Dipper",
                    "option_id": 845,
                    "position": 7,
                    "price": 5,
                    "sdmId": 510075,
                    "selected": 0,
                    "selection_id": 4771,
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
                    "id": 241,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "modGroupId": -1,
                    "name": "Supreme Loaded Fries",
                    "option_id": 845,
                    "position": 8,
                    "price": 5,
                    "sdmId": 510085,
                    "selected": 0,
                    "selection_id": 4773,
                    "selectionQty": 1,
                    "sku": 510085,
                    "subOptions": [

                    ],
                    "title": "Supreme Loaded Fries"
                  }
                ],
                "subtitle": "Select your favorite side item",
                "title": "Select your favorite side item",
                "type": "radio"
              },
              {
                "compId": 4,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 6,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [

                    ],
                    "id": 242,
                    "imageThumbnail": "/imagestemp/600002.png",
                    "modGroupId": -1,
                    "name": "Pepsi Regular",
                    "option_id": 846,
                    "position": 1,
                    "price": 0,
                    "sdmId": 600002,
                    "selected": 1,
                    "selection_id": 4774,
                    "selectionQty": 1,
                    "sku": 600002,
                    "subOptions": [

                    ],
                    "title": "Pepsi Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 254,
                    "imageThumbnail": "/imagestemp/600008.png",
                    "modGroupId": -1,
                    "name": "Mirinda Regular",
                    "option_id": 846,
                    "position": 2,
                    "price": 0,
                    "sdmId": 600008,
                    "selected": 0,
                    "selection_id": 4775,
                    "selectionQty": 1,
                    "sku": 600008,
                    "subOptions": [

                    ],
                    "title": "Mirinda Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 249,
                    "imageThumbnail": "/imagestemp/600015.png",
                    "modGroupId": -1,
                    "name": "7Up Regular",
                    "option_id": 846,
                    "position": 3,
                    "price": 0,
                    "sdmId": 600015,
                    "selected": 0,
                    "selection_id": 4776,
                    "selectionQty": 1,
                    "sku": 600015,
                    "subOptions": [

                    ],
                    "title": "7Up Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 246,
                    "imageThumbnail": "/imagestemp/600005.png",
                    "modGroupId": -1,
                    "name": "Diet Pepsi Regular",
                    "option_id": 846,
                    "position": 4,
                    "price": 0,
                    "sdmId": 600005,
                    "selected": 0,
                    "selection_id": 4777,
                    "selectionQty": 1,
                    "sku": 600005,
                    "subOptions": [

                    ],
                    "title": "Diet Pepsi Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 251,
                    "imageThumbnail": "/imagestemp/600012.png",
                    "modGroupId": -1,
                    "name": "Mountain Dew Regular",
                    "option_id": 846,
                    "position": 5,
                    "price": 0,
                    "sdmId": 600012,
                    "selected": 0,
                    "selection_id": 4778,
                    "selectionQty": 1,
                    "sku": 600012,
                    "subOptions": [

                    ],
                    "title": "Mountain Dew Regular"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [

                    ],
                    "id": 292,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "modGroupId": -1,
                    "name": "Small Aquafina",
                    "option_id": 846,
                    "position": 6,
                    "price": 0,
                    "sdmId": 610011,
                    "selected": 0,
                    "selection_id": 4780,
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
                    "id": 237,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "modGroupId": -1,
                    "name": "Mojito Krusher",
                    "option_id": 846,
                    "position": 7,
                    "price": 5.5,
                    "sdmId": 610021,
                    "selected": 0,
                    "selection_id": 4779,
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
                    "id": 236,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "modGroupId": -1,
                    "name": "Fresh Orange Juice",
                    "option_id": 846,
                    "position": 8,
                    "price": 8.5,
                    "sdmId": 610020,
                    "selected": 0,
                    "selection_id": 4781,
                    "selectionQty": 1,
                    "sku": 610020,
                    "subOptions": [

                    ],
                    "title": "Fresh Orange Juice"
                  }
                ],
                "subtitle": "Select your favorite beverage",
                "title": "Select your favorite beverage",
                "type": "radio"
              }
            ],
            "catId": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "options": [
                  {
                    "id": 16285,
                    "isSelected": 1,
                    "position": 1,
                    "title": "Regular"
                  },
                  {
                    "id": 16287,
                    "isSelected": 0,
                    "position": 2,
                    "title": "Medium"
                  },
                  {
                    "id": 16286,
                    "isSelected": 0,
                    "position": 3,
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
            "finalPrice": 25,
            "id": 376,
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "imagestemp/900148.png",
            "inSide": 1,
            "metaKeyword": [
              "Mighty Twist - Regular"
            ],
            "name": "Mighty Twist - Regular",
            "position": 9,
            "promoId": 65,
            "sdmId": 148,
            "sel1Value": 16285,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900148,
            "specialPrice": 25,
            "taxClassId": 2,
            "title": "Mighty Twist - Regular",
            "typeId": "bundle",
            "virtualGroup": 0,
            "visibility": 4
          }
        ],
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#4",
        "langMenuIdCatIdProductId": "En#1#4#16",
        "langMenuIdProductId": "En#1#16",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "Mighty Twist - Medium"
        ],
        "name": "Mighty Twist",
        "originalTypeId": "bundle_group",
        "orignalPrice": 27,
        "position": 7,
        "promoId": 65,
        "sdmId": 70,
        "selectedItem": 900148,
        "sellingPrice": 27,
        "sku": 900070,
        "specialPrice": 0,
        "taxClassId": 2,
        "typeId": "bundle_group",
        "viewIdentifier": 0,
        "virtualGroup": 0,
        "visibility": 4
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
                      let defaultSdm = false
                      if (pl.subOptions && pl.subOptions.length > 0) {
                        pl.subOptions.forEach(dsplso => {
                          if (dsplso.is_sdm_default == 1)
                            defaultSdm = true
                        })
                        pl.subOptions.forEach(so => {
                          if (so.selected == 1) {
                            if (so.title == "None") { }
                            else if (so.title == "Regular") {
                              if (so.sdmId) {
                                if (so.is_sdm_default != undefined) {
                                  if (!defaultSdm)
                                    obj.Entries.CEntry.push({
                                      ID: 0,
                                      ItemID: so.sdmId,
                                      ModCode: "WITH",
                                      ModgroupID: pl.modGroupId ? pl.modGroupId : -1,
                                      Name: so.name,
                                      OrdrMode: "OM_SAVED",
                                      Weight: 0,
                                    })
                                }
                              }
                            } else if (so.title == "Extra") {
                              if (so.sdmId) {
                                if (so.is_sdm_default != undefined) {
                                  if (defaultSdm)
                                    obj.Entries.CEntry.push({
                                      ID: 0,
                                      ItemID: so.sdmId,
                                      ModCode: "WITH",
                                      ModgroupID: pl.modGroupId,
                                      Name: so.name,
                                      OrdrMode: "OM_SAVED",
                                      Weight: 0,
                                    })
                                  else
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
                                } else {
                                  obj.Entries.CEntry.push({
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
                                i.bundleProductOptions.forEach(plbpo => {
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
                                    } else {
                                      /**
                                       * @description (ingredient == 1) :  "name": "Twister Meal"
                                       * @description (isModifier == 1) :  "name": "Mighty Twist"
                                       */
                                      if (plbpo.productLinks && plbpo.productLinks.length > 0) {
                                        plbpo.productLinks.forEach(dspl => {
                                          let defaultSdm = false
                                          if (dspl.subOptions && dspl.subOptions.length > 0) {
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.is_sdm_default == 1)
                                                defaultSdm = true
                                            })
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.sdmId && dsplso.selected == 1) {
                                                if (dsplso.title == "None") {
                                                }
                                                else if (dsplso.title == "Regular") {
                                                  if (dsplso.sdmId) {
                                                    if (dsplso.is_sdm_default != undefined) {
                                                      if (!defaultSdm)
                                                        obj.Entries.CEntry.push({
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
                                                } else if (dsplso.title == "Extra") {
                                                  if (dsplso.sdmId) {
                                                    if (dsplso.is_sdm_default != undefined) {
                                                      if (defaultSdm)
                                                        obj.Entries.CEntry.push({
                                                          ID: 0,
                                                          ItemID: dsplso.sdmId,
                                                          ModCode: "WITH",
                                                          ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                          Name: dspl.name,
                                                          OrdrMode: "OM_SAVED",
                                                          Weight: 0,
                                                        })
                                                      else
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
                                                    } else {
                                                      obj.Entries.CEntry.push({
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
                                                }
                                              }
                                            })
                                          }
                                        })
                                      }
                                    }
                                  }
                                })
                                Entries.CEntry.push(obj)
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
                              if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                let defaultSdm = false
                                bpopl.subOptions.forEach(dsplso => {
                                  if (dsplso.is_sdm_default == 1)
                                    defaultSdm = true
                                })
                                bpopl.subOptions.forEach(bpoplso => {
                                  if (bpoplso.sdmId && bpoplso.selected == 1) {
                                    if (bpoplso.title == "None") { }
                                    else if (bpoplso.title == "Regular") {
                                      if (bpoplso.sdmId) {
                                        if (bpoplso.is_sdm_default != undefined) {
                                          if (!defaultSdm)
                                            lastProductAddedInCentry.Entries.CEntry.push({
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
                                    } else if (bpoplso.title == "Extra") {
                                      if (bpoplso.sdmId) {
                                        if (bpoplso.is_sdm_default != undefined) {
                                          if (defaultSdm)
                                            lastProductAddedInCentry.Entries.CEntry.push({
                                              ID: 0,
                                              ItemID: bpoplso.sdmId,
                                              ModCode: "WITH",
                                              ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                              Name: bpopl.name,
                                              OrdrMode: "OM_SAVED",
                                              Weight: 0,
                                            })
                                          else
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

                                        } else {
                                          lastProductAddedInCentry.Entries.CEntry.push({
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
        "CustomerID": "7695133",//"7694266",//"",// 
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
    let orderPlaced = await SDM.OrderSDME.createOrder(order)
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