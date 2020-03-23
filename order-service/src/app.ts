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
        "items": [
          {
            "metaKeyword": [
              "Twister Max Meal - Medium"
            ],
            "configurableProductOptions": [
              {
                "position": 1,
                "name": "",
                "subtitle": "Choice of Size",
                "id": 144,
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
                ],
                "title": "Choice of Size",
                "selIndex": 1
              }
            ],
            "position": 13,
            "promoId": 24,
            "name": "Twister Max Meal - Medium",
            "imageSmall": "/d/u/dummy-product.png",
            "selectedItem": 0,
            "specialPrice": 27,
            "bundleProductOptions": [
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 943,
                    "dependentSteps": [
                      2
                    ],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Twister Max Sandwich - Original",
                    "selection_id": 5409,
                    "imageThumbnail": "/imagestemp/110013.png",
                    "sdmId": 110013,
                    "title": "Twister Max Sandwich - Original",
                    "id": 306,
                    "sku": 110013,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 943,
                    "dependentSteps": [
                      2
                    ],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Twister Max Sandwich - Spicy",
                    "selection_id": 5410,
                    "imageThumbnail": "/imagestemp/110014.png",
                    "sdmId": 110014,
                    "title": "Twister Max Sandwich - Spicy",
                    "id": 307,
                    "sku": 110014,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Choice of flavor",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Choice of flavor",
                "type": "radio",
                "title": "Choice of flavor",
                "ingredient": 0,
                "compId": 1
              },
              {
                "isModifier": 1,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "option_id": 944,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 0,
                    "name": "American Cheese",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "sdmId": 810001,
                    "title": "American Cheese",
                    "id": 366,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "option_id": 366,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5411,
                        "sdmId": 810001,
                        "title": "Regular",
                        "selected": 1,
                        "sku": 810001,
                        "id": 364,
                        "modGroupId": 10028,
                        "name": "Regular"
                      },
                      {
                        "option_id": 366,
                        "price": 2,
                        "product_id": 0,
                        "selection_id": 5412,
                        "sdmId": 810001,
                        "title": "Extra",
                        "selected": 0,
                        "sku": 810001,
                        "id": 365,
                        "modGroupId": 10028,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10028,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 944,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 0,
                    "name": "Lettuce",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "sdmId": 811701,
                    "title": "Lettuce",
                    "id": 369,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5413,
                        "sdmId": 811701,
                        "title": "Regular",
                        "selected": 1,
                        "sku": 811701,
                        "id": 367,
                        "modGroupId": 10027,
                        "name": "Regular"
                      },
                      {
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5414,
                        "sdmId": 811701,
                        "title": "Extra",
                        "selected": 0,
                        "sku": 811701,
                        "id": 368,
                        "modGroupId": 10027,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10027,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 944,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 0,
                    "name": "Tomato",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "sdmId": 811703,
                    "title": "Tomato",
                    "id": 372,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5415,
                        "sdmId": 811703,
                        "title": "Regular",
                        "selected": 1,
                        "sku": 811703,
                        "id": 370,
                        "modGroupId": 10027,
                        "name": "Regular"
                      },
                      {
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5416,
                        "sdmId": 811703,
                        "title": "Extra",
                        "selected": 0,
                        "sku": 811703,
                        "id": 371,
                        "modGroupId": 10027,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10027,
                    "selected": 1
                  }
                ],
                "name": "Add Some Cheese",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 1,
                "maximumQty": 0,
                "subtitle": "Add Some Cheese",
                "type": "checkbox",
                "title": "Add Some Cheese",
                "ingredient": 1,
                "compId": 1
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Medium Fries",
                    "selection_id": 5417,
                    "imageThumbnail": "/imagestemp/510050.png",
                    "sdmId": 510050,
                    "title": "Medium Fries",
                    "id": 271,
                    "sku": 510050,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 5419,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 257,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Medium Fries Spicy",
                    "selection_id": 5418,
                    "imageThumbnail": "/imagestemp/510051.png",
                    "sdmId": 510051,
                    "title": "Medium Fries Spicy",
                    "id": 275,
                    "sku": 510051,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Medium Dipper Fries",
                    "selection_id": 5421,
                    "imageThumbnail": "/imagestemp/510072.png",
                    "sdmId": 510072,
                    "title": "Medium Dipper Fries",
                    "id": 278,
                    "sku": 510072,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 5420,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 266,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id": 5423,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "sdmId": 510079,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "id": 291,
                    "sku": 510079,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Cheese Potato Dipper",
                    "selection_id": 5422,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "sdmId": 510075,
                    "title": "Cheese Potato Dipper",
                    "id": 290,
                    "sku": 510075,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 945,
                    "dependentSteps": [],
                    "position": 8,
                    "selectionQty": 1,
                    "name": "Supreme Loaded Fries",
                    "selection_id": 5424,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "sdmId": 510085,
                    "title": "Supreme Loaded Fries",
                    "id": 241,
                    "sku": 510085,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Choice of side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Choice of side item",
                "type": "radio",
                "title": "Choice of side item",
                "ingredient": 0,
                "compId": 2
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Pepsi Medium",
                    "selection_id": 5425,
                    "imageThumbnail": "/imagestemp/600003.png",
                    "sdmId": 600003,
                    "title": "Pepsi Medium",
                    "id": 243,
                    "sku": 600003,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mirinda Medium",
                    "selection_id": 5426,
                    "imageThumbnail": "/imagestemp/600009.png",
                    "sdmId": 600009,
                    "title": "Mirinda Medium",
                    "id": 255,
                    "sku": 600009,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "7Up Medium",
                    "selection_id": 5427,
                    "imageThumbnail": "/imagestemp/600016.png",
                    "sdmId": 600016,
                    "title": "7Up Medium",
                    "id": 250,
                    "sku": 600016,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Diet Pepsi Medium",
                    "selection_id": 5428,
                    "imageThumbnail": "/imagestemp/600006.png",
                    "sdmId": 600006,
                    "title": "Diet Pepsi Medium",
                    "id": 245,
                    "sku": 600006,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Mountain Dew Medium",
                    "selection_id": 5429,
                    "imageThumbnail": "/imagestemp/600013.png",
                    "sdmId": 600013,
                    "title": "Mountain Dew Medium",
                    "id": 252,
                    "sku": 600013,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Small Aquafina",
                    "selection_id": 5431,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "sdmId": 610011,
                    "title": "Small Aquafina",
                    "id": 292,
                    "sku": 610011,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Pepsi 500ML",
                    "selection_id": 5434,
                    "imageThumbnail": "/imagestemp/610000.png",
                    "sdmId": 610000,
                    "title": "Pepsi 500ML",
                    "id": 302,
                    "sku": 610000,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 8,
                    "selectionQty": 1,
                    "name": "Pepsi Can",
                    "selection_id": 5435,
                    "imageThumbnail": "/imagestemp/600001.png",
                    "sdmId": 600001,
                    "title": "Pepsi Can",
                    "id": 301,
                    "sku": 600001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 9,
                    "selectionQty": 1,
                    "name": "Lemon Mint Ice Tea",
                    "selection_id": 5433,
                    "imageThumbnail": "/imagestemp/610019.png",
                    "sdmId": 610019,
                    "title": "Lemon Mint Ice Tea",
                    "id": 294,
                    "sku": 610019,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 10,
                    "selectionQty": 1,
                    "name": "Mojito Krusher",
                    "selection_id": 5430,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "sdmId": 610021,
                    "title": "Mojito Krusher",
                    "id": 237,
                    "sku": 610021,
                    "subOptions": [],
                    "price": 7.5,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 946,
                    "dependentSteps": [],
                    "position": 11,
                    "selectionQty": 1,
                    "name": "Fresh Orange Juice",
                    "selection_id": 5432,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "sdmId": 610020,
                    "title": "Fresh Orange Juice",
                    "id": 236,
                    "sku": 610020,
                    "subOptions": [],
                    "price": 8.5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Choice of Beverages",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Choice of Beverages",
                "type": "radio",
                "title": "Choice of Beverages",
                "ingredient": 0,
                "compId": 3
              }
            ],
            "visibility": 4,
            "finalPrice": 27,
            "virtualGroup": 0,
            "typeId": "bundle",
            "sdmId": 23,
            "sel3Value": -1,
            "sel2Value": -1,
            "sel1Value": 16287,
            "image": "/d/u/dummy-product.png",
            "description": "",
            "sku": 900023,
            "title": "Twister Max Meal - Medium",
            "taxClassId": 2,
            "id": 393,
            "associative": 0,
            "imageThumbnail": "/imagestemp/900023.png",
            "inSide": 1
          },
          {
            "metaKeyword": [
              "Twister Max Meal - Large"
            ],
            "configurableProductOptions": [
              {
                "position": 1,
                "name": "",
                "subtitle": "Choice of Size",
                "id": 144,
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
                ],
                "title": "Choice of Size",
                "selIndex": 1
              }
            ],
            "position": 14,
            "promoId": 24,
            "name": "Twister Max Meal - Large",
            "imageSmall": "/d/u/dummy-product.png",
            "selectedItem": 0,
            "specialPrice": 28.5,
            "bundleProductOptions": [
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 947,
                    "dependentSteps": [
                      2
                    ],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Twister Max Sandwich - Original",
                    "selection_id": 5436,
                    "imageThumbnail": "/imagestemp/110013.png",
                    "sdmId": 110013,
                    "title": "Twister Max Sandwich - Original",
                    "id": 306,
                    "sku": 110013,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 947,
                    "dependentSteps": [
                      2
                    ],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Twister Max Sandwich - Spicy",
                    "selection_id": 5437,
                    "imageThumbnail": "/imagestemp/110014.png",
                    "sdmId": 110014,
                    "title": "Twister Max Sandwich - Spicy",
                    "id": 307,
                    "sku": 110014,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Choice of flavor",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Choice of flavor",
                "type": "radio",
                "title": "Choice of flavor",
                "ingredient": 0,
                "compId": 1
              },
              {
                "isModifier": 1,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "option_id": 948,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 0,
                    "name": "American Cheese",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "sdmId": 810001,
                    "title": "American Cheese",
                    "id": 366,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "option_id": 366,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5438,
                        "sdmId": 810001,
                        "title": "Regular",
                        "selected": 1,
                        "sku": 810001,
                        "id": 364,
                        "modGroupId": 10028,
                        "name": "Regular"
                      },
                      {
                        "option_id": 366,
                        "price": 2,
                        "product_id": 0,
                        "selection_id": 5439,
                        "sdmId": 810001,
                        "title": "Extra",
                        "selected": 0,
                        "sku": 810001,
                        "id": 365,
                        "modGroupId": 10028,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10028,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 948,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 0,
                    "name": "Lettuce",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "sdmId": 811701,
                    "title": "Lettuce",
                    "id": 369,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5440,
                        "sdmId": 811701,
                        "title": "Regular",
                        "selected": 1,
                        "sku": 811701,
                        "id": 367,
                        "modGroupId": 10027,
                        "name": "Regular"
                      },
                      {
                        "option_id": 369,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5441,
                        "sdmId": 811701,
                        "title": "Extra",
                        "selected": 0,
                        "sku": 811701,
                        "id": 368,
                        "modGroupId": 10027,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10027,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 948,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 0,
                    "name": "Tomato",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "sdmId": 811703,
                    "title": "Tomato",
                    "id": 372,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5442,
                        "sdmId": 811703,
                        "title": "Regular",
                        "selected": 1,
                        "sku": 811703,
                        "id": 370,
                        "modGroupId": 10027,
                        "name": "Regular"
                      },
                      {
                        "option_id": 372,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 5443,
                        "sdmId": 811703,
                        "title": "Extra",
                        "selected": 0,
                        "sku": 811703,
                        "id": 371,
                        "modGroupId": 10027,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10027,
                    "selected": 1
                  }
                ],
                "name": "Add Some Cheese",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 1,
                "maximumQty": 0,
                "subtitle": "Add Some Cheese",
                "type": "checkbox",
                "title": "Add Some Cheese",
                "ingredient": 1,
                "compId": 1
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Large Fries",
                    "selection_id": 5444,
                    "imageThumbnail": "/imagestemp/510006.png",
                    "sdmId": 510006,
                    "title": "Large Fries",
                    "id": 269,
                    "sku": 510006,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 5446,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 257,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Large Fries Spicy",
                    "selection_id": 5445,
                    "imageThumbnail": "/imagestemp/510013.png",
                    "sdmId": 510013,
                    "title": "Large Fries Spicy",
                    "id": 272,
                    "sku": 510013,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Large Dipper Fries",
                    "selection_id": 5448,
                    "imageThumbnail": "/imagestemp/510073.png",
                    "sdmId": 510073,
                    "title": "Large Dipper Fries",
                    "id": 279,
                    "sku": 510073,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 5447,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 266,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id": 5450,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "sdmId": 510079,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "id": 291,
                    "sku": 510079,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Cheese Potato Dipper",
                    "selection_id": 5449,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "sdmId": 510075,
                    "title": "Cheese Potato Dipper",
                    "id": 290,
                    "sku": 510075,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 949,
                    "dependentSteps": [],
                    "position": 8,
                    "selectionQty": 1,
                    "name": "Supreme Loaded Fries",
                    "selection_id": 5451,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "sdmId": 510085,
                    "title": "Supreme Loaded Fries",
                    "id": 241,
                    "sku": 510085,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Choice of side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Choice of side item",
                "type": "radio",
                "title": "Choice of side item",
                "ingredient": 0,
                "compId": 2
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Pepsi Large",
                    "selection_id": 5452,
                    "imageThumbnail": "/imagestemp/600004.png",
                    "sdmId": 600004,
                    "title": "Pepsi Large",
                    "id": 244,
                    "sku": 600004,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mirinda Large",
                    "selection_id": 5453,
                    "imageThumbnail": "/imagestemp/600010.png",
                    "sdmId": 600010,
                    "title": "Mirinda Large",
                    "id": 256,
                    "sku": 600010,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "7Up Large",
                    "selection_id": 5454,
                    "imageThumbnail": "/imagestemp/600017.png",
                    "sdmId": 600017,
                    "title": "7Up Large",
                    "id": 248,
                    "sku": 600017,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Diet Pepsi Large",
                    "selection_id": 5455,
                    "imageThumbnail": "/imagestemp/600007.png",
                    "sdmId": 600007,
                    "title": "Diet Pepsi Large",
                    "id": 247,
                    "sku": 600007,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Mountain Dew Large",
                    "selection_id": 5456,
                    "imageThumbnail": "/imagestemp/600014.png",
                    "sdmId": 600014,
                    "title": "Mountain Dew Large",
                    "id": 253,
                    "sku": 600014,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Small Aquafina",
                    "selection_id": 5458,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "sdmId": 610011,
                    "title": "Small Aquafina",
                    "id": 292,
                    "sku": 610011,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Pepsi 500ML",
                    "selection_id": 5461,
                    "imageThumbnail": "/imagestemp/610000.png",
                    "sdmId": 610000,
                    "title": "Pepsi 500ML",
                    "id": 302,
                    "sku": 610000,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 8,
                    "selectionQty": 1,
                    "name": "Pepsi Can",
                    "selection_id": 5462,
                    "imageThumbnail": "/imagestemp/600001.png",
                    "sdmId": 600001,
                    "title": "Pepsi Can",
                    "id": 301,
                    "sku": 600001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 9,
                    "selectionQty": 1,
                    "name": "Lemon Mint Ice Tea",
                    "selection_id": 5460,
                    "imageThumbnail": "/imagestemp/610019.png",
                    "sdmId": 610019,
                    "title": "Lemon Mint Ice Tea",
                    "id": 294,
                    "sku": 610019,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 10,
                    "selectionQty": 1,
                    "name": "Mojito Krusher",
                    "selection_id": 5457,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "sdmId": 610021,
                    "title": "Mojito Krusher",
                    "id": 237,
                    "sku": 610021,
                    "subOptions": [],
                    "price": 7.5,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 950,
                    "dependentSteps": [],
                    "position": 11,
                    "selectionQty": 1,
                    "name": "Fresh Orange Juice",
                    "selection_id": 5459,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "sdmId": 610020,
                    "title": "Fresh Orange Juice",
                    "id": 236,
                    "sku": 610020,
                    "subOptions": [],
                    "price": 8.5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Choice of Beverages",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Choice of Beverages",
                "type": "radio",
                "title": "Choice of Beverages",
                "ingredient": 0,
                "compId": 3
              }
            ],
            "visibility": 4,
            "finalPrice": 28.5,
            "virtualGroup": 0,
            "typeId": "bundle",
            "sdmId": 24,
            "sel3Value": -1,
            "sel2Value": -1,
            "sel1Value": 16286,
            "image": "/d/u/dummy-product.png",
            "description": "",
            "sku": 900024,
            "title": "Twister Max Meal - Large",
            "taxClassId": 2,
            "id": 394,
            "associative": 0,
            "imageThumbnail": "/imagestemp/900024.png",
            "inSide": 1
          }
        ],
        "baseSpecialPrice": 0,
        "metaKeyword": [
          "Twister Max Meal - Medium"
        ],
        "originalTypeId": "bundle_group",
        "configurableProductOptions": [
          {
            "position": 1,
            "name": "",
            "subtitle": "Choice of Size",
            "id": 144,
            "options": [
              {
                "isSelected": 0,
                "position": 1,
                "name": "Medium",
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 1,
                "position": 2,
                "name": "Large",
                "title": "Large",
                "id": 16286
              }
            ],
            "title": "Choice of Size",
            "selIndex": 1
          }
        ],
        "position": 13,
        "promoId": 24,
        "name": "Twister Max Meal",
        "selectedItem": 900024,
        "specialPrice": 28.5,
        "catId": 0,
        "visibility": 4,
        "finalPrice": 28.5,
        "virtualGroup": 0,
        "typeId": "bundle_group",
        "qty": 1,
        "sdmId": 23,
        "originalPrice": 28.5,
        "sellingPrice": 28.5,
        "menuId": 0,
        "id": 22,
        "description": "Twister Max Sandwich, Fries & Drink",
        "sku": 900023,
        "bundleProductOptions": [
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 1,
            "productLinks": [
              {
                "default": 1,
                "option_id": 943,
                "dependentSteps": [
                  2
                ],
                "position": 1,
                "selectionQty": 1,
                "name": "Twister Max Sandwich - Original",
                "selection_id": 5409,
                "imageThumbnail": "/imagestemp/110013.png",
                "sdmId": 110013,
                "title": "Twister Max Sandwich - Original",
                "id": 306,
                "sku": 110013,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 943,
                "dependentSteps": [
                  2
                ],
                "position": 2,
                "selectionQty": 1,
                "name": "Twister Max Sandwich - Spicy",
                "selection_id": 5410,
                "imageThumbnail": "/imagestemp/110014.png",
                "sdmId": 110014,
                "title": "Twister Max Sandwich - Spicy",
                "id": 307,
                "sku": 110014,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Choice of flavor",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Choice of flavor",
            "type": "radio",
            "title": "Choice of flavor",
            "ingredient": 0,
            "compId": 1
          },
          {
            "isModifier": 1,
            "minimumQty": 0,
            "position": 2,
            "productLinks": [
              {
                "default": 0,
                "option_id": 944,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 0,
                "name": "American Cheese",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/810001.png",
                "sdmId": 810001,
                "title": "American Cheese",
                "id": 366,
                "sku": 810001,
                "subOptions": [
                  {
                    "option_id": 366,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 5411,
                    "sdmId": 810001,
                    "title": "Regular",
                    "selected": 1,
                    "sku": 810001,
                    "id": 364,
                    "modGroupId": 10028,
                    "name": "Regular"
                  },
                  {
                    "option_id": 366,
                    "price": 2,
                    "product_id": 0,
                    "selection_id": 5412,
                    "sdmId": 810001,
                    "title": "Extra",
                    "selected": 0,
                    "sku": 810001,
                    "id": 365,
                    "modGroupId": 10028,
                    "name": "Extra"
                  }
                ],
                "price": 0,
                "modGroupId": 10028,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 944,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 0,
                "name": "Lettuce",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811701.png",
                "sdmId": 811701,
                "title": "Lettuce",
                "id": 369,
                "sku": 811701,
                "subOptions": [
                  {
                    "option_id": 369,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 5413,
                    "sdmId": 811701,
                    "title": "Regular",
                    "selected": 1,
                    "sku": 811701,
                    "id": 367,
                    "modGroupId": 10027,
                    "name": "Regular"
                  },
                  {
                    "option_id": 369,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 5414,
                    "sdmId": 811701,
                    "title": "Extra",
                    "selected": 0,
                    "sku": 811701,
                    "id": 368,
                    "modGroupId": 10027,
                    "name": "Extra"
                  }
                ],
                "price": 0,
                "modGroupId": 10027,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 944,
                "dependentSteps": [],
                "position": 4,
                "selectionQty": 0,
                "name": "Tomato",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811703.png",
                "sdmId": 811703,
                "title": "Tomato",
                "id": 372,
                "sku": 811703,
                "subOptions": [
                  {
                    "option_id": 372,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 5415,
                    "sdmId": 811703,
                    "title": "Regular",
                    "selected": 1,
                    "sku": 811703,
                    "id": 370,
                    "modGroupId": 10027,
                    "name": "Regular"
                  },
                  {
                    "option_id": 372,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 5416,
                    "sdmId": 811703,
                    "title": "Extra",
                    "selected": 0,
                    "sku": 811703,
                    "id": 371,
                    "modGroupId": 10027,
                    "name": "Extra"
                  }
                ],
                "price": 0,
                "modGroupId": 10027,
                "selected": 1
              }
            ],
            "name": "Add Some Cheese",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 1,
            "maximumQty": 0,
            "subtitle": "Add Some Cheese",
            "type": "checkbox",
            "title": "Add Some Cheese",
            "ingredient": 1,
            "compId": 1
          },
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 3,
            "productLinks": [
              {
                "default": 1,
                "option_id": 945,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "Medium Fries",
                "selection_id": 5417,
                "imageThumbnail": "/imagestemp/510050.png",
                "sdmId": 510050,
                "title": "Medium Fries",
                "id": 271,
                "sku": 510050,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 945,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Coleslaw Salad Small",
                "selection_id": 5419,
                "imageThumbnail": "/imagestemp/510001.png",
                "sdmId": 510001,
                "title": "Coleslaw Salad Small",
                "id": 257,
                "sku": 510001,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 945,
                "dependentSteps": [],
                "position": 3,
                "selectionQty": 1,
                "name": "Medium Fries Spicy",
                "selection_id": 5418,
                "imageThumbnail": "/imagestemp/510051.png",
                "sdmId": 510051,
                "title": "Medium Fries Spicy",
                "id": 275,
                "sku": 510051,
                "subOptions": [],
                "price": 1,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 945,
                "dependentSteps": [],
                "position": 4,
                "selectionQty": 1,
                "name": "Medium Dipper Fries",
                "selection_id": 5421,
                "imageThumbnail": "/imagestemp/510072.png",
                "sdmId": 510072,
                "title": "Medium Dipper Fries",
                "id": 278,
                "sku": 510072,
                "subOptions": [],
                "price": 1,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 945,
                "dependentSteps": [],
                "position": 5,
                "selectionQty": 1,
                "name": "Loaded Fries Regular",
                "selection_id": 5420,
                "imageThumbnail": "/imagestemp/510036.png",
                "sdmId": 510036,
                "title": "Loaded Fries Regular",
                "id": 266,
                "sku": 510036,
                "subOptions": [],
                "price": 3,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 945,
                "dependentSteps": [],
                "position": 6,
                "selectionQty": 1,
                "name": "Regular Loaded Fries Pepper - Chili Sauce",
                "selection_id": 5423,
                "imageThumbnail": "/imagestemp/510079.png",
                "sdmId": 510079,
                "title": "Regular Loaded Fries Pepper - Chili Sauce",
                "id": 291,
                "sku": 510079,
                "subOptions": [],
                "price": 3,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 945,
                "dependentSteps": [],
                "position": 7,
                "selectionQty": 1,
                "name": "Cheese Potato Dipper",
                "selection_id": 5422,
                "imageThumbnail": "/imagestemp/510075.png",
                "sdmId": 510075,
                "title": "Cheese Potato Dipper",
                "id": 290,
                "sku": 510075,
                "subOptions": [],
                "price": 5,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 945,
                "dependentSteps": [],
                "position": 8,
                "selectionQty": 1,
                "name": "Supreme Loaded Fries",
                "selection_id": 5424,
                "imageThumbnail": "/imagestemp/510085.png",
                "sdmId": 510085,
                "title": "Supreme Loaded Fries",
                "id": 241,
                "sku": 510085,
                "subOptions": [],
                "price": 5,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Choice of side item",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Choice of side item",
            "type": "radio",
            "title": "Choice of side item",
            "ingredient": 0,
            "compId": 2
          },
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 4,
            "productLinks": [
              {
                "default": 1,
                "option_id": 946,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "Pepsi Medium",
                "selection_id": 5425,
                "imageThumbnail": "/imagestemp/600003.png",
                "sdmId": 600003,
                "title": "Pepsi Medium",
                "id": 243,
                "sku": 600003,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Mirinda Medium",
                "selection_id": 5426,
                "imageThumbnail": "/imagestemp/600009.png",
                "sdmId": 600009,
                "title": "Mirinda Medium",
                "id": 255,
                "sku": 600009,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 3,
                "selectionQty": 1,
                "name": "7Up Medium",
                "selection_id": 5427,
                "imageThumbnail": "/imagestemp/600016.png",
                "sdmId": 600016,
                "title": "7Up Medium",
                "id": 250,
                "sku": 600016,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 4,
                "selectionQty": 1,
                "name": "Diet Pepsi Medium",
                "selection_id": 5428,
                "imageThumbnail": "/imagestemp/600006.png",
                "sdmId": 600006,
                "title": "Diet Pepsi Medium",
                "id": 245,
                "sku": 600006,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 5,
                "selectionQty": 1,
                "name": "Mountain Dew Medium",
                "selection_id": 5429,
                "imageThumbnail": "/imagestemp/600013.png",
                "sdmId": 600013,
                "title": "Mountain Dew Medium",
                "id": 252,
                "sku": 600013,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 6,
                "selectionQty": 1,
                "name": "Small Aquafina",
                "selection_id": 5431,
                "imageThumbnail": "/imagestemp/610011.png",
                "sdmId": 610011,
                "title": "Small Aquafina",
                "id": 292,
                "sku": 610011,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 7,
                "selectionQty": 1,
                "name": "Pepsi 500ML",
                "selection_id": 5434,
                "imageThumbnail": "/imagestemp/610000.png",
                "sdmId": 610000,
                "title": "Pepsi 500ML",
                "id": 302,
                "sku": 610000,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 8,
                "selectionQty": 1,
                "name": "Pepsi Can",
                "selection_id": 5435,
                "imageThumbnail": "/imagestemp/600001.png",
                "sdmId": 600001,
                "title": "Pepsi Can",
                "id": 301,
                "sku": 600001,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 9,
                "selectionQty": 1,
                "name": "Lemon Mint Ice Tea",
                "selection_id": 5433,
                "imageThumbnail": "/imagestemp/610019.png",
                "sdmId": 610019,
                "title": "Lemon Mint Ice Tea",
                "id": 294,
                "sku": 610019,
                "subOptions": [],
                "price": 3,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 10,
                "selectionQty": 1,
                "name": "Mojito Krusher",
                "selection_id": 5430,
                "imageThumbnail": "/imagestemp/610021.png",
                "sdmId": 610021,
                "title": "Mojito Krusher",
                "id": 237,
                "sku": 610021,
                "subOptions": [],
                "price": 7.5,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 946,
                "dependentSteps": [],
                "position": 11,
                "selectionQty": 1,
                "name": "Fresh Orange Juice",
                "selection_id": 5432,
                "imageThumbnail": "/imagestemp/610020.png",
                "sdmId": 610020,
                "title": "Fresh Orange Juice",
                "id": 236,
                "sku": 610020,
                "subOptions": [],
                "price": 8.5,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Choice of Beverages",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Choice of Beverages",
            "type": "radio",
            "title": "Choice of Beverages",
            "ingredient": 0,
            "compId": 3
          }
        ],
        "imageThumbnail": "/imagestemp/900023.png",
        "taxClassId": 2,
        "baseFinalPrice": 27,
        "associative": 0,
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
                              if (so.sdmId) {
                                if (so.is_sdm_default != undefined) {
                                  if (so.is_sdm_default == 0)
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
                                  if (so.is_sdm_default == 0)
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
                                  else
                                    obj.Entries.CEntry.push({
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
                                          if (dspl.subOptions && dspl.subOptions.length > 0) {
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.sdmId && dsplso.selected == 1) {
                                                if (dsplso.title == "None") {
                                                }
                                                else if (dsplso.title == "Regular") {
                                                  if (dsplso.sdmId) {
                                                    if (dsplso.is_sdm_default != undefined) {
                                                      if (dsplso.is_sdm_default == 0)
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
                                                      if (dsplso.is_sdm_default == 0)
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
                                                      else
                                                        obj.Entries.CEntry.push({
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
                                bpopl.subOptions.forEach(bpoplso => {
                                  if (bpoplso.sdmId && bpoplso.selected == 1) {
                                    if (bpoplso.title == "None") { }
                                    else if (bpoplso.title == "Regular") {
                                      if (bpoplso.sdmId) {
                                        if (bpoplso.is_sdm_default != undefined) {
                                          if (bpoplso.is_sdm_default == 0)
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
                                          if (bpoplso.is_sdm_default == 0)
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
                                          else
                                            lastProductAddedInCentry.Entries.CEntry.push({
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