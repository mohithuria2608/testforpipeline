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
        "promoId" : 65,
        "originalTypeId" : "bundle_group",
        "image" : "/imagestemp/900070.png",
        "langMenuIdCatIdProductId" : "En#1#4#16",
        "qty" : 1,
        "items" : [
          {
            "metaKeyword" : [
              "Mighty Twist - Medium"
            ],
            "configurableProductOptions" : [
              {
                "position" : 1,
                "selIndex" : 1,
                "id" : 144,
                "options" : [
                  {
                    "isSelected" : 1,
                    "position" : 1,
                    "title" : "Regular",
                    "id" : 16285
                  },
                  {
                    "isSelected" : 0,
                    "position" : 2,
                    "title" : "Medium",
                    "id" : 16287
                  },
                  {
                    "isSelected" : 0,
                    "position" : 3,
                    "title" : "Large",
                    "id" : 16286
                  }
                ],
                "subtitle" : "Choice of Size",
                "title" : "Choice of Size"
              }
            ],
            "position" : 7,
            "promoId" : 65,
            "name" : "Mighty Twist - Medium",
            "imageSmall" : "/d/u/dummy-product.png",
            "selectedItem" : 0,
            "specialPrice" : 28,
            "bundleProductOptions" : [
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 1,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 829,
                    "dependentSteps" : [
                      1
                    ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Mighty Zinger",
                    "selection_id" : 4689,
                    "imageThumbnail" : "/imagestemp/110005.png",
                    "sdmId" : 110005,
                    "modGroupId" : -1,
                    "id" : 287,
                    "sku" : 110005,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Mighty Zinger"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select Your favorite Sandwich",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select Your favorite Sandwich",
                "compId" : 1
              },
              {
                "isModifier" : 1,
                "minimumQty" : 0,
                "position" : 2,
                "productLinks" : [
                  {
                    "default" : 0,
                    "option_id" : 830,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 0,
                    "name" : "Lettuce",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811701.png",
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 369,
                    "sku" : 811701,
                    "subOptions" : [
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4692,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 367,
                        "sku" : 811701,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4693,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 368,
                        "sku" : 811701,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Lettuce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 830,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 0,
                    "name" : "Tomato",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811703.png",
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 372,
                    "sku" : 811703,
                    "subOptions" : [
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4694,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 370,
                        "sku" : 811703,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4695,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 371,
                        "sku" : 811703,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Tomato"
                  },
                  {
                    "default" : 0,
                    "option_id" : 830,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 0,
                    "name" : "American Cheese",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/810001.png",
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 366,
                    "sku" : 810001,
                    "subOptions" : [
                      {
                        "option_id" : 366,
                        "price" : 2,
                        "product_id" : 0,
                        "selection_id" : 4690,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 364,
                        "sku" : 810001,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 366,
                        "price" : 4,
                        "product_id" : 0,
                        "selection_id" : 4691,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 365,
                        "sku" : 810001,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "American Cheese"
                  }
                ],
                "ingredient" : 1,
                "isDependent" : 1,
                "maximumQty" : 0,
                "title" : "Add Some Cheese",
                "type" : "checkbox",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Add Some Cheese",
                "compId" : 1
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 3,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 831,
                    "dependentSteps" : [
                      4
                    ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Twister Sandwich - Original",
                    "selection_id" : 4696,
                    "imageThumbnail" : "/imagestemp/110003.png",
                    "sdmId" : 110003,
                    "modGroupId" : -1,
                    "id" : 288,
                    "sku" : 110003,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Twister Sandwich - Original"
                  },
                  {
                    "default" : 0,
                    "option_id" : 831,
                    "dependentSteps" : [
                      4
                    ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Twister Sandwich - Spicy",
                    "selection_id" : 4697,
                    "imageThumbnail" : "/imagestemp/110002.png",
                    "sdmId" : 110002,
                    "modGroupId" : -1,
                    "id" : 289,
                    "sku" : 110002,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Twister Sandwich - Spicy"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select Your Second Sandwich",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select Your Second Sandwich",
                "compId" : 2
              },
              {
                "isModifier" : 1,
                "minimumQty" : 0,
                "position" : 4,
                "productLinks" : [
                  {
                    "default" : 0,
                    "option_id" : 832,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 0,
                    "name" : "Lettuce",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811701.png",
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 369,
                    "sku" : 811701,
                    "subOptions" : [
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4700,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 367,
                        "sku" : 811701,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4701,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 368,
                        "sku" : 811701,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Lettuce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 832,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 0,
                    "name" : "Tomato",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811703.png",
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 372,
                    "sku" : 811703,
                    "subOptions" : [
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4702,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 370,
                        "sku" : 811703,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4703,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 371,
                        "sku" : 811703,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Tomato"
                  },
                  {
                    "default" : 0,
                    "option_id" : 832,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 0,
                    "name" : "American Cheese",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/810001.png",
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 366,
                    "sku" : 810001,
                    "subOptions" : [
                      {
                        "option_id" : 366,
                        "price" : 2,
                        "product_id" : 0,
                        "selection_id" : 4698,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 364,
                        "sku" : 810001,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 366,
                        "price" : 4,
                        "product_id" : 0,
                        "selection_id" : 4699,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 365,
                        "sku" : 810001,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "American Cheese"
                  }
                ],
                "ingredient" : 1,
                "isDependent" : 1,
                "maximumQty" : 0,
                "title" : "Add Some Cheese",
                "type" : "checkbox",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Add Some Cheese",
                "compId" : 2
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 5,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Medium Fries",
                    "selection_id" : 4704,
                    "imageThumbnail" : "/imagestemp/510050.png",
                    "sdmId" : 510050,
                    "modGroupId" : -1,
                    "id" : 271,
                    "sku" : 510050,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Medium Fries"
                  },
                  {
                    "default" : 0,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Coleslaw Salad Small",
                    "selection_id" : 4706,
                    "imageThumbnail" : "/imagestemp/510001.png",
                    "sdmId" : 510001,
                    "modGroupId" : -1,
                    "id" : 257,
                    "sku" : 510001,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Coleslaw Salad Small"
                  },
                  {
                    "default" : 0,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 1,
                    "name" : "Medium Fries Spicy",
                    "selection_id" : 4705,
                    "imageThumbnail" : "/imagestemp/510051.png",
                    "sdmId" : 510051,
                    "modGroupId" : -1,
                    "id" : 275,
                    "sku" : 510051,
                    "subOptions" : [ ],
                    "price" : 1,
                    "selected" : 0,
                    "title" : "Medium Fries Spicy"
                  },
                  {
                    "default" : 0,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 4,
                    "selectionQty" : 1,
                    "name" : "Potato Dipper- Regular",
                    "selection_id" : 4708,
                    "imageThumbnail" : "/imagestemp/510071.png",
                    "sdmId" : 510071,
                    "modGroupId" : -1,
                    "id" : 277,
                    "sku" : 510071,
                    "subOptions" : [ ],
                    "price" : 1,
                    "selected" : 0,
                    "title" : "Potato Dipper- Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 1,
                    "name" : "Loaded Fries Regular",
                    "selection_id" : 4707,
                    "imageThumbnail" : "/imagestemp/510036.png",
                    "sdmId" : 510036,
                    "modGroupId" : -1,
                    "id" : 266,
                    "sku" : 510036,
                    "subOptions" : [ ],
                    "price" : 3,
                    "selected" : 0,
                    "title" : "Loaded Fries Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 6,
                    "selectionQty" : 1,
                    "name" : "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id" : 4710,
                    "imageThumbnail" : "/imagestemp/510079.png",
                    "sdmId" : 510079,
                    "modGroupId" : -1,
                    "id" : 291,
                    "sku" : 510079,
                    "subOptions" : [ ],
                    "price" : 3,
                    "selected" : 0,
                    "title" : "Regular Loaded Fries Pepper - Chili Sauce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 7,
                    "selectionQty" : 1,
                    "name" : "Cheese Potato Dipper",
                    "selection_id" : 4709,
                    "imageThumbnail" : "/imagestemp/510075.png",
                    "sdmId" : 510075,
                    "modGroupId" : -1,
                    "id" : 290,
                    "sku" : 510075,
                    "subOptions" : [ ],
                    "price" : 5,
                    "selected" : 0,
                    "title" : "Cheese Potato Dipper"
                  },
                  {
                    "default" : 0,
                    "option_id" : 833,
                    "dependentSteps" : [ ],
                    "position" : 8,
                    "selectionQty" : 1,
                    "name" : "Supreme Loaded Fries",
                    "selection_id" : 4711,
                    "imageThumbnail" : "/imagestemp/510085.png",
                    "sdmId" : 510085,
                    "modGroupId" : -1,
                    "id" : 241,
                    "sku" : 510085,
                    "subOptions" : [ ],
                    "price" : 5,
                    "selected" : 0,
                    "title" : "Supreme Loaded Fries"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select your favorite side item",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select your favorite side item",
                "compId" : 3
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 6,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Pepsi Medium",
                    "selection_id" : 4712,
                    "imageThumbnail" : "/imagestemp/600003.png",
                    "sdmId" : 600003,
                    "modGroupId" : -1,
                    "id" : 243,
                    "sku" : 600003,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Pepsi Medium"
                  },
                  {
                    "default" : 0,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Mirinda Medium",
                    "selection_id" : 4713,
                    "imageThumbnail" : "/imagestemp/600009.png",
                    "sdmId" : 600009,
                    "modGroupId" : -1,
                    "id" : 255,
                    "sku" : 600009,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Mirinda Medium"
                  },
                  {
                    "default" : 0,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 1,
                    "name" : "7Up Medium",
                    "selection_id" : 4714,
                    "imageThumbnail" : "/imagestemp/600016.png",
                    "sdmId" : 600016,
                    "modGroupId" : -1,
                    "id" : 250,
                    "sku" : 600016,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "7Up Medium"
                  },
                  {
                    "default" : 0,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 4,
                    "selectionQty" : 1,
                    "name" : "Diet Pepsi Medium",
                    "selection_id" : 4715,
                    "imageThumbnail" : "/imagestemp/600006.png",
                    "sdmId" : 600006,
                    "modGroupId" : -1,
                    "id" : 245,
                    "sku" : 600006,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Diet Pepsi Medium"
                  },
                  {
                    "default" : 0,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 1,
                    "name" : "Mountain Dew Medium",
                    "selection_id" : 4716,
                    "imageThumbnail" : "/imagestemp/600013.png",
                    "sdmId" : 600013,
                    "modGroupId" : -1,
                    "id" : 252,
                    "sku" : 600013,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Mountain Dew Medium"
                  },
                  {
                    "default" : 0,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 6,
                    "selectionQty" : 1,
                    "name" : "Small Aquafina",
                    "selection_id" : 4718,
                    "imageThumbnail" : "/imagestemp/610011.png",
                    "sdmId" : 610011,
                    "modGroupId" : -1,
                    "id" : 292,
                    "sku" : 610011,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Small Aquafina"
                  },
                  {
                    "default" : 0,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 7,
                    "selectionQty" : 1,
                    "name" : "Mojito Krusher",
                    "selection_id" : 4717,
                    "imageThumbnail" : "/imagestemp/610021.png",
                    "sdmId" : 610021,
                    "modGroupId" : -1,
                    "id" : 237,
                    "sku" : 610021,
                    "subOptions" : [ ],
                    "price" : 5.5,
                    "selected" : 0,
                    "title" : "Mojito Krusher"
                  },
                  {
                    "default" : 0,
                    "option_id" : 834,
                    "dependentSteps" : [ ],
                    "position" : 8,
                    "selectionQty" : 1,
                    "name" : "Fresh Orange Juice",
                    "selection_id" : 4719,
                    "imageThumbnail" : "/imagestemp/610020.png",
                    "sdmId" : 610020,
                    "modGroupId" : -1,
                    "id" : 236,
                    "sku" : 610020,
                    "subOptions" : [ ],
                    "price" : 8.5,
                    "selected" : 0,
                    "title" : "Fresh Orange Juice"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select your favorite beverage",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select your favorite beverage",
                "compId" : 4
              }
            ],
            "visibility" : 4,
            "finalPrice" : 28,
            "virtualGroup" : 0,
            "typeId" : "bundle",
            "sdmId" : 70,
            "sel3Value" : -1,
            "sel2Value" : -1,
            "sel1Value" : 16287,
            "image" : "/d/u/dummy-product.png",
            "description" : "",
            "sku" : 900070,
            "associative" : 0,
            "catId" : 0,
            "inSide" : 1,
            "imageThumbnail" : "/imagestemp/900070.png",
            "id" : 374,
            "taxClassId" : 2,
            "title" : "Mighty Twist - Medium"
          },
          {
            "metaKeyword" : [
              "Mighty Twist - Large"
            ],
            "configurableProductOptions" : [
              {
                "position" : 1,
                "selIndex" : 1,
                "id" : 144,
                "options" : [
                  {
                    "isSelected" : 1,
                    "position" : 1,
                    "title" : "Regular",
                    "id" : 16285
                  },
                  {
                    "isSelected" : 0,
                    "position" : 2,
                    "title" : "Medium",
                    "id" : 16287
                  },
                  {
                    "isSelected" : 0,
                    "position" : 3,
                    "title" : "Large",
                    "id" : 16286
                  }
                ],
                "subtitle" : "Choice of Size",
                "title" : "Choice of Size"
              }
            ],
            "position" : 8,
            "promoId" : 65,
            "name" : "Mighty Twist - Large",
            "imageSmall" : "/d/u/dummy-product.png",
            "selectedItem" : 0,
            "specialPrice" : 29.5,
            "bundleProductOptions" : [
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 1,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 835,
                    "dependentSteps" : [
                      1
                    ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Mighty Zinger",
                    "selection_id" : 4720,
                    "imageThumbnail" : "/imagestemp/110005.png",
                    "sdmId" : 110005,
                    "modGroupId" : -1,
                    "id" : 287,
                    "sku" : 110005,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Mighty Zinger"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select Your favorite Sandwich",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select Your favorite Sandwich",
                "compId" : 1
              },
              {
                "isModifier" : 1,
                "minimumQty" : 0,
                "position" : 2,
                "productLinks" : [
                  {
                    "default" : 0,
                    "option_id" : 836,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 0,
                    "name" : "Lettuce",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811701.png",
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 369,
                    "sku" : 811701,
                    "subOptions" : [
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4723,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 367,
                        "sku" : 811701,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4724,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 368,
                        "sku" : 811701,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Lettuce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 836,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 0,
                    "name" : "Tomato",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811703.png",
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 372,
                    "sku" : 811703,
                    "subOptions" : [
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4725,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 370,
                        "sku" : 811703,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4726,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 371,
                        "sku" : 811703,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Tomato"
                  },
                  {
                    "default" : 0,
                    "option_id" : 836,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 0,
                    "name" : "American Cheese",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/810001.png",
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 366,
                    "sku" : 810001,
                    "subOptions" : [
                      {
                        "option_id" : 366,
                        "price" : 2,
                        "product_id" : 0,
                        "selection_id" : 4721,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 364,
                        "sku" : 810001,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 366,
                        "price" : 4,
                        "product_id" : 0,
                        "selection_id" : 4722,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 365,
                        "sku" : 810001,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "American Cheese"
                  }
                ],
                "ingredient" : 1,
                "isDependent" : 1,
                "maximumQty" : 0,
                "title" : "Add Some Cheese",
                "type" : "checkbox",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Add Some Cheese",
                "compId" : 1
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 3,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 837,
                    "dependentSteps" : [
                      4
                    ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Twister Sandwich - Original",
                    "selection_id" : 4727,
                    "imageThumbnail" : "/imagestemp/110003.png",
                    "sdmId" : 110003,
                    "modGroupId" : -1,
                    "id" : 288,
                    "sku" : 110003,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Twister Sandwich - Original"
                  },
                  {
                    "default" : 0,
                    "option_id" : 837,
                    "dependentSteps" : [
                      4
                    ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Twister Sandwich - Spicy",
                    "selection_id" : 4728,
                    "imageThumbnail" : "/imagestemp/110002.png",
                    "sdmId" : 110002,
                    "modGroupId" : -1,
                    "id" : 289,
                    "sku" : 110002,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Twister Sandwich - Spicy"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select Your Second Sandwich",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select Your Second Sandwich",
                "compId" : 2
              },
              {
                "isModifier" : 1,
                "minimumQty" : 0,
                "position" : 4,
                "productLinks" : [
                  {
                    "default" : 0,
                    "option_id" : 838,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 0,
                    "name" : "Lettuce",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811701.png",
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 369,
                    "sku" : 811701,
                    "subOptions" : [
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4731,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 367,
                        "sku" : 811701,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4732,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 368,
                        "sku" : 811701,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Lettuce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 838,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 0,
                    "name" : "Tomato",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811703.png",
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 372,
                    "sku" : 811703,
                    "subOptions" : [
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4733,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 370,
                        "sku" : 811703,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4734,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 371,
                        "sku" : 811703,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Tomato"
                  },
                  {
                    "default" : 0,
                    "option_id" : 838,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 0,
                    "name" : "American Cheese",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/810001.png",
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 366,
                    "sku" : 810001,
                    "subOptions" : [
                      {
                        "option_id" : 366,
                        "price" : 2,
                        "product_id" : 0,
                        "selection_id" : 4729,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 364,
                        "sku" : 810001,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 366,
                        "price" : 4,
                        "product_id" : 0,
                        "selection_id" : 4730,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 365,
                        "sku" : 810001,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "American Cheese"
                  }
                ],
                "ingredient" : 1,
                "isDependent" : 1,
                "maximumQty" : 0,
                "title" : "Add Some Cheese",
                "type" : "checkbox",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Add Some Cheese",
                "compId" : 2
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 5,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Large Fries",
                    "selection_id" : 4735,
                    "imageThumbnail" : "/imagestemp/510006.png",
                    "sdmId" : 510006,
                    "modGroupId" : -1,
                    "id" : 269,
                    "sku" : 510006,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Large Fries"
                  },
                  {
                    "default" : 0,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Coleslaw Salad Small",
                    "selection_id" : 4737,
                    "imageThumbnail" : "/imagestemp/510001.png",
                    "sdmId" : 510001,
                    "modGroupId" : -1,
                    "id" : 257,
                    "sku" : 510001,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Coleslaw Salad Small"
                  },
                  {
                    "default" : 0,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 1,
                    "name" : "Large Fries Spicy",
                    "selection_id" : 4736,
                    "imageThumbnail" : "/imagestemp/510013.png",
                    "sdmId" : 510013,
                    "modGroupId" : -1,
                    "id" : 272,
                    "sku" : 510013,
                    "subOptions" : [ ],
                    "price" : 1,
                    "selected" : 0,
                    "title" : "Large Fries Spicy"
                  },
                  {
                    "default" : 0,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 4,
                    "selectionQty" : 1,
                    "name" : "Potato Dipper- Regular",
                    "selection_id" : 4739,
                    "imageThumbnail" : "/imagestemp/510071.png",
                    "sdmId" : 510071,
                    "modGroupId" : -1,
                    "id" : 277,
                    "sku" : 510071,
                    "subOptions" : [ ],
                    "price" : 1,
                    "selected" : 0,
                    "title" : "Potato Dipper- Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 1,
                    "name" : "Loaded Fries Regular",
                    "selection_id" : 4738,
                    "imageThumbnail" : "/imagestemp/510036.png",
                    "sdmId" : 510036,
                    "modGroupId" : -1,
                    "id" : 266,
                    "sku" : 510036,
                    "subOptions" : [ ],
                    "price" : 3,
                    "selected" : 0,
                    "title" : "Loaded Fries Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 6,
                    "selectionQty" : 1,
                    "name" : "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id" : 4741,
                    "imageThumbnail" : "/imagestemp/510079.png",
                    "sdmId" : 510079,
                    "modGroupId" : -1,
                    "id" : 291,
                    "sku" : 510079,
                    "subOptions" : [ ],
                    "price" : 3,
                    "selected" : 0,
                    "title" : "Regular Loaded Fries Pepper - Chili Sauce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 7,
                    "selectionQty" : 1,
                    "name" : "Cheese Potato Dipper",
                    "selection_id" : 4740,
                    "imageThumbnail" : "/imagestemp/510075.png",
                    "sdmId" : 510075,
                    "modGroupId" : -1,
                    "id" : 290,
                    "sku" : 510075,
                    "subOptions" : [ ],
                    "price" : 5,
                    "selected" : 0,
                    "title" : "Cheese Potato Dipper"
                  },
                  {
                    "default" : 0,
                    "option_id" : 839,
                    "dependentSteps" : [ ],
                    "position" : 8,
                    "selectionQty" : 1,
                    "name" : "Supreme Loaded Fries",
                    "selection_id" : 4742,
                    "imageThumbnail" : "/imagestemp/510085.png",
                    "sdmId" : 510085,
                    "modGroupId" : -1,
                    "id" : 241,
                    "sku" : 510085,
                    "subOptions" : [ ],
                    "price" : 5,
                    "selected" : 0,
                    "title" : "Supreme Loaded Fries"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select your favorite side item",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select your favorite side item",
                "compId" : 3
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 6,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Pepsi Large",
                    "selection_id" : 4743,
                    "imageThumbnail" : "/imagestemp/600004.png",
                    "sdmId" : 600004,
                    "modGroupId" : -1,
                    "id" : 244,
                    "sku" : 600004,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Pepsi Large"
                  },
                  {
                    "default" : 0,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Mirinda Large",
                    "selection_id" : 4744,
                    "imageThumbnail" : "/imagestemp/600010.png",
                    "sdmId" : 600010,
                    "modGroupId" : -1,
                    "id" : 256,
                    "sku" : 600010,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Mirinda Large"
                  },
                  {
                    "default" : 0,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 1,
                    "name" : "7Up Large",
                    "selection_id" : 4745,
                    "imageThumbnail" : "/imagestemp/600017.png",
                    "sdmId" : 600017,
                    "modGroupId" : -1,
                    "id" : 248,
                    "sku" : 600017,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "7Up Large"
                  },
                  {
                    "default" : 0,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 4,
                    "selectionQty" : 1,
                    "name" : "Diet Pepsi Large",
                    "selection_id" : 4746,
                    "imageThumbnail" : "/imagestemp/600007.png",
                    "sdmId" : 600007,
                    "modGroupId" : -1,
                    "id" : 247,
                    "sku" : 600007,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Diet Pepsi Large"
                  },
                  {
                    "default" : 0,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 1,
                    "name" : "Mountain Dew Large",
                    "selection_id" : 4747,
                    "imageThumbnail" : "/imagestemp/600014.png",
                    "sdmId" : 600014,
                    "modGroupId" : -1,
                    "id" : 253,
                    "sku" : 600014,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Mountain Dew Large"
                  },
                  {
                    "default" : 0,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 6,
                    "selectionQty" : 1,
                    "name" : "Small Aquafina",
                    "selection_id" : 4749,
                    "imageThumbnail" : "/imagestemp/610011.png",
                    "sdmId" : 610011,
                    "modGroupId" : -1,
                    "id" : 292,
                    "sku" : 610011,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Small Aquafina"
                  },
                  {
                    "default" : 0,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 7,
                    "selectionQty" : 1,
                    "name" : "Mojito Krusher",
                    "selection_id" : 4748,
                    "imageThumbnail" : "/imagestemp/610021.png",
                    "sdmId" : 610021,
                    "modGroupId" : -1,
                    "id" : 237,
                    "sku" : 610021,
                    "subOptions" : [ ],
                    "price" : 5.5,
                    "selected" : 0,
                    "title" : "Mojito Krusher"
                  },
                  {
                    "default" : 0,
                    "option_id" : 840,
                    "dependentSteps" : [ ],
                    "position" : 8,
                    "selectionQty" : 1,
                    "name" : "Fresh Orange Juice",
                    "selection_id" : 4750,
                    "imageThumbnail" : "/imagestemp/610020.png",
                    "sdmId" : 610020,
                    "modGroupId" : -1,
                    "id" : 236,
                    "sku" : 610020,
                    "subOptions" : [ ],
                    "price" : 8.5,
                    "selected" : 0,
                    "title" : "Fresh Orange Juice"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select your favorite beverage",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select your favorite beverage",
                "compId" : 4
              }
            ],
            "visibility" : 4,
            "finalPrice" : 29.5,
            "virtualGroup" : 0,
            "typeId" : "bundle",
            "sdmId" : 71,
            "sel3Value" : -1,
            "sel2Value" : -1,
            "sel1Value" : 16286,
            "image" : "/d/u/dummy-product.png",
            "description" : "",
            "sku" : 900071,
            "associative" : 0,
            "catId" : 0,
            "inSide" : 1,
            "imageThumbnail" : "/imagestemp/900071.png",
            "id" : 375,
            "taxClassId" : 2,
            "title" : "Mighty Twist - Large"
          },
          {
            "metaKeyword" : [
              "Mighty Twist - Regular"
            ],
            "configurableProductOptions" : [
              {
                "position" : 1,
                "selIndex" : 1,
                "id" : 144,
                "options" : [
                  {
                    "isSelected" : 1,
                    "position" : 1,
                    "title" : "Regular",
                    "id" : 16285
                  },
                  {
                    "isSelected" : 0,
                    "position" : 2,
                    "title" : "Medium",
                    "id" : 16287
                  },
                  {
                    "isSelected" : 0,
                    "position" : 3,
                    "title" : "Large",
                    "id" : 16286
                  }
                ],
                "subtitle" : "Choice of Size",
                "title" : "Choice of Size"
              }
            ],
            "position" : 9,
            "promoId" : 65,
            "name" : "Mighty Twist - Regular",
            "imageSmall" : "/d/u/dummy-product.png",
            "selectedItem" : 0,
            "specialPrice" : 25,
            "bundleProductOptions" : [
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 1,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 841,
                    "dependentSteps" : [
                      1
                    ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Mighty Zinger",
                    "selection_id" : 4751,
                    "imageThumbnail" : "/imagestemp/110005.png",
                    "sdmId" : 110005,
                    "modGroupId" : -1,
                    "id" : 287,
                    "sku" : 110005,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Mighty Zinger"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select Your favorite Sandwich",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select Your favorite Sandwich",
                "compId" : 1
              },
              {
                "isModifier" : 1,
                "minimumQty" : 0,
                "position" : 2,
                "productLinks" : [
                  {
                    "default" : 0,
                    "option_id" : 842,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 0,
                    "name" : "Lettuce",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811701.png",
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 369,
                    "sku" : 811701,
                    "subOptions" : [
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4754,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 367,
                        "sku" : 811701,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4755,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 368,
                        "sku" : 811701,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Lettuce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 842,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 0,
                    "name" : "Tomato",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811703.png",
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 372,
                    "sku" : 811703,
                    "subOptions" : [
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4756,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 370,
                        "sku" : 811703,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4757,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 371,
                        "sku" : 811703,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Tomato"
                  },
                  {
                    "default" : 0,
                    "option_id" : 842,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 0,
                    "name" : "American Cheese",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/810001.png",
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 366,
                    "sku" : 810001,
                    "subOptions" : [
                      {
                        "option_id" : 366,
                        "price" : 2,
                        "product_id" : 0,
                        "selection_id" : 4752,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 364,
                        "sku" : 810001,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 366,
                        "price" : 4,
                        "product_id" : 0,
                        "selection_id" : 4753,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 365,
                        "sku" : 810001,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "American Cheese"
                  }
                ],
                "ingredient" : 1,
                "isDependent" : 1,
                "maximumQty" : 0,
                "title" : "Add Some Cheese",
                "type" : "checkbox",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Add Some Cheese",
                "compId" : 1
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 3,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 843,
                    "dependentSteps" : [
                      4
                    ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Twister Sandwich - Original",
                    "selection_id" : 4758,
                    "imageThumbnail" : "/imagestemp/110003.png",
                    "sdmId" : 110003,
                    "modGroupId" : -1,
                    "id" : 288,
                    "sku" : 110003,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Twister Sandwich - Original"
                  },
                  {
                    "default" : 0,
                    "option_id" : 843,
                    "dependentSteps" : [
                      4
                    ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Twister Sandwich - Spicy",
                    "selection_id" : 4759,
                    "imageThumbnail" : "/imagestemp/110002.png",
                    "sdmId" : 110002,
                    "modGroupId" : -1,
                    "id" : 289,
                    "sku" : 110002,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Twister Sandwich - Spicy"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select Your Second Sandwich",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select Your Second Sandwich",
                "compId" : 2
              },
              {
                "isModifier" : 1,
                "minimumQty" : 0,
                "position" : 4,
                "productLinks" : [
                  {
                    "default" : 0,
                    "option_id" : 844,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 0,
                    "name" : "Lettuce",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811701.png",
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 369,
                    "sku" : 811701,
                    "subOptions" : [
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4762,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 367,
                        "sku" : 811701,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 369,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4763,
                        "sdmId" : 811701,
                        "modGroupId" : 10027,
                        "id" : 368,
                        "sku" : 811701,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Lettuce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 844,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 0,
                    "name" : "Tomato",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/811703.png",
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 372,
                    "sku" : 811703,
                    "subOptions" : [
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4764,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 370,
                        "sku" : 811703,
                        "name" : "Regular",
                        "selected" : 1,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 372,
                        "price" : 0,
                        "product_id" : 0,
                        "selection_id" : 4765,
                        "sdmId" : 811703,
                        "modGroupId" : 10027,
                        "id" : 371,
                        "sku" : 811703,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Tomato"
                  },
                  {
                    "default" : 0,
                    "option_id" : 844,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 0,
                    "name" : "American Cheese",
                    "selection_id" : 0,
                    "imageThumbnail" : "/imagestemp/810001.png",
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 366,
                    "sku" : 810001,
                    "subOptions" : [
                      {
                        "option_id" : 366,
                        "price" : 2,
                        "product_id" : 0,
                        "selection_id" : 4760,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 364,
                        "sku" : 810001,
                        "name" : "Regular",
                        "selected" : 0,
                        "title" : "Regular"
                      },
                      {
                        "option_id" : 366,
                        "price" : 4,
                        "product_id" : 0,
                        "selection_id" : 4761,
                        "sdmId" : 810001,
                        "modGroupId" : 10028,
                        "id" : 365,
                        "sku" : 810001,
                        "name" : "Extra",
                        "selected" : 0,
                        "title" : "Extra"
                      }
                    ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "American Cheese"
                  }
                ],
                "ingredient" : 1,
                "isDependent" : 1,
                "maximumQty" : 0,
                "title" : "Add Some Cheese",
                "type" : "checkbox",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Add Some Cheese",
                "compId" : 2
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 5,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Regular Fries",
                    "selection_id" : 4766,
                    "imageThumbnail" : "/imagestemp/510004.png",
                    "sdmId" : 510004,
                    "modGroupId" : -1,
                    "id" : 268,
                    "sku" : 510004,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Regular Fries"
                  },
                  {
                    "default" : 0,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Coleslaw Salad Small",
                    "selection_id" : 4768,
                    "imageThumbnail" : "/imagestemp/510001.png",
                    "sdmId" : 510001,
                    "modGroupId" : -1,
                    "id" : 257,
                    "sku" : 510001,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Coleslaw Salad Small"
                  },
                  {
                    "default" : 0,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 1,
                    "name" : "Regular Fries Spicy",
                    "selection_id" : 4767,
                    "imageThumbnail" : "/imagestemp/510012.png",
                    "sdmId" : 510012,
                    "modGroupId" : -1,
                    "id" : 274,
                    "sku" : 510012,
                    "subOptions" : [ ],
                    "price" : 1,
                    "selected" : 0,
                    "title" : "Regular Fries Spicy"
                  },
                  {
                    "default" : 0,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 4,
                    "selectionQty" : 1,
                    "name" : "Potato Dipper- Regular",
                    "selection_id" : 4770,
                    "imageThumbnail" : "/imagestemp/510071.png",
                    "sdmId" : 510071,
                    "modGroupId" : -1,
                    "id" : 277,
                    "sku" : 510071,
                    "subOptions" : [ ],
                    "price" : 1,
                    "selected" : 0,
                    "title" : "Potato Dipper- Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 1,
                    "name" : "Loaded Fries Regular",
                    "selection_id" : 4769,
                    "imageThumbnail" : "/imagestemp/510036.png",
                    "sdmId" : 510036,
                    "modGroupId" : -1,
                    "id" : 266,
                    "sku" : 510036,
                    "subOptions" : [ ],
                    "price" : 3,
                    "selected" : 0,
                    "title" : "Loaded Fries Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 6,
                    "selectionQty" : 1,
                    "name" : "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id" : 4772,
                    "imageThumbnail" : "/imagestemp/510079.png",
                    "sdmId" : 510079,
                    "modGroupId" : -1,
                    "id" : 291,
                    "sku" : 510079,
                    "subOptions" : [ ],
                    "price" : 3,
                    "selected" : 0,
                    "title" : "Regular Loaded Fries Pepper - Chili Sauce"
                  },
                  {
                    "default" : 0,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 7,
                    "selectionQty" : 1,
                    "name" : "Cheese Potato Dipper",
                    "selection_id" : 4771,
                    "imageThumbnail" : "/imagestemp/510075.png",
                    "sdmId" : 510075,
                    "modGroupId" : -1,
                    "id" : 290,
                    "sku" : 510075,
                    "subOptions" : [ ],
                    "price" : 5,
                    "selected" : 0,
                    "title" : "Cheese Potato Dipper"
                  },
                  {
                    "default" : 0,
                    "option_id" : 845,
                    "dependentSteps" : [ ],
                    "position" : 8,
                    "selectionQty" : 1,
                    "name" : "Supreme Loaded Fries",
                    "selection_id" : 4773,
                    "imageThumbnail" : "/imagestemp/510085.png",
                    "sdmId" : 510085,
                    "modGroupId" : -1,
                    "id" : 241,
                    "sku" : 510085,
                    "subOptions" : [ ],
                    "price" : 5,
                    "selected" : 0,
                    "title" : "Supreme Loaded Fries"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select your favorite side item",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select your favorite side item",
                "compId" : 3
              },
              {
                "isModifier" : 0,
                "minimumQty" : 0,
                "position" : 6,
                "productLinks" : [
                  {
                    "default" : 1,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 1,
                    "selectionQty" : 1,
                    "name" : "Pepsi Regular",
                    "selection_id" : 4774,
                    "imageThumbnail" : "/imagestemp/600002.png",
                    "sdmId" : 600002,
                    "modGroupId" : -1,
                    "id" : 242,
                    "sku" : 600002,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Pepsi Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 2,
                    "selectionQty" : 1,
                    "name" : "Mirinda Regular",
                    "selection_id" : 4775,
                    "imageThumbnail" : "/imagestemp/600008.png",
                    "sdmId" : 600008,
                    "modGroupId" : -1,
                    "id" : 254,
                    "sku" : 600008,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Mirinda Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 3,
                    "selectionQty" : 1,
                    "name" : "7Up Regular",
                    "selection_id" : 4776,
                    "imageThumbnail" : "/imagestemp/600015.png",
                    "sdmId" : 600015,
                    "modGroupId" : -1,
                    "id" : 249,
                    "sku" : 600015,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "7Up Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 4,
                    "selectionQty" : 1,
                    "name" : "Diet Pepsi Regular",
                    "selection_id" : 4777,
                    "imageThumbnail" : "/imagestemp/600005.png",
                    "sdmId" : 600005,
                    "modGroupId" : -1,
                    "id" : 246,
                    "sku" : 600005,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 1,
                    "title" : "Diet Pepsi Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 5,
                    "selectionQty" : 1,
                    "name" : "Mountain Dew Regular",
                    "selection_id" : 4778,
                    "imageThumbnail" : "/imagestemp/600012.png",
                    "sdmId" : 600012,
                    "modGroupId" : -1,
                    "id" : 251,
                    "sku" : 600012,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Mountain Dew Regular"
                  },
                  {
                    "default" : 0,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 6,
                    "selectionQty" : 1,
                    "name" : "Small Aquafina",
                    "selection_id" : 4780,
                    "imageThumbnail" : "/imagestemp/610011.png",
                    "sdmId" : 610011,
                    "modGroupId" : -1,
                    "id" : 292,
                    "sku" : 610011,
                    "subOptions" : [ ],
                    "price" : 0,
                    "selected" : 0,
                    "title" : "Small Aquafina"
                  },
                  {
                    "default" : 0,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 7,
                    "selectionQty" : 1,
                    "name" : "Mojito Krusher",
                    "selection_id" : 4779,
                    "imageThumbnail" : "/imagestemp/610021.png",
                    "sdmId" : 610021,
                    "modGroupId" : -1,
                    "id" : 237,
                    "sku" : 610021,
                    "subOptions" : [ ],
                    "price" : 5.5,
                    "selected" : 0,
                    "title" : "Mojito Krusher"
                  },
                  {
                    "default" : 0,
                    "option_id" : 846,
                    "dependentSteps" : [ ],
                    "position" : 8,
                    "selectionQty" : 1,
                    "name" : "Fresh Orange Juice",
                    "selection_id" : 4781,
                    "imageThumbnail" : "/imagestemp/610020.png",
                    "sdmId" : 610020,
                    "modGroupId" : -1,
                    "id" : 236,
                    "sku" : 610020,
                    "subOptions" : [ ],
                    "price" : 8.5,
                    "selected" : 0,
                    "title" : "Fresh Orange Juice"
                  }
                ],
                "ingredient" : 0,
                "isDependent" : 0,
                "maximumQty" : 0,
                "title" : "Select your favorite beverage",
                "type" : "radio",
                "imageThumbnail" : "/imagestemp/0.png",
                "subtitle" : "Select your favorite beverage",
                "compId" : 4
              }
            ],
            "visibility" : 4,
            "finalPrice" : 25,
            "virtualGroup" : 0,
            "typeId" : "bundle",
            "sdmId" : 148,
            "sel3Value" : -1,
            "sel2Value" : -1,
            "sel1Value" : 16285,
            "image" : "/d/u/dummy-product.png",
            "description" : "",
            "sku" : 900148,
            "associative" : 0,
            "catId" : 0,
            "inSide" : 1,
            "imageThumbnail" : "/imagestemp/900148.png",
            "id" : 376,
            "taxClassId" : 2,
            "title" : "Mighty Twist - Regular"
          }
        ],
        "imageThumbnail" : "/imagestemp/900070.png",
        "orignalPrice" : 25,
        "catId" : 4,
        "langMenuIdCatId" : "En#1#4",
        "inSide" : 1,
        "name" : "Mighty Twist",
        "position" : 7,
        "language" : "En",
        "metaKeyword" : [
          "Mighty Twist - Medium"
        ],
        "associative" : 0,
        "taxClassId" : 2,
        "id" : 16,
        "bundleProductOptions" : [
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 1,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 829,
                "dependentSteps" : [
                  1
                ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Mighty Zinger",
                "selection_id" : 4689,
                "imageThumbnail" : "/imagestemp/110005.png",
                "sdmId" : 110005,
                "modGroupId" : -1,
                "id" : 287,
                "sku" : 110005,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Mighty Zinger"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Select Your favorite Sandwich",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Select Your favorite Sandwich",
            "compId" : 1
          },
          {
            "isModifier" : 1,
            "minimumQty" : 0,
            "position" : 2,
            "productLinks" : [
              {
                "default" : 0,
                "option_id" : 830,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 0,
                "name" : "Lettuce",
                "selection_id" : 0,
                "imageThumbnail" : "/imagestemp/811701.png",
                "sdmId" : 811701,
                "modGroupId" : 10027,
                "id" : 369,
                "sku" : 811701,
                "subOptions" : [
                  {
                    "option_id" : 369,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4692,
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 367,
                    "sku" : 811701,
                    "name" : "Regular",
                    "selected" : 1,
                    "title" : "Regular"
                  },
                  {
                    "option_id" : 369,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4693,
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 368,
                    "sku" : 811701,
                    "name" : "Extra",
                    "selected" : 0,
                    "title" : "Extra"
                  }
                ],
                "price" : 0,
                "selected" : 1,
                "title" : "Lettuce"
              },
              {
                "default" : 0,
                "option_id" : 830,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 0,
                "name" : "Tomato",
                "selection_id" : 0,
                "imageThumbnail" : "/imagestemp/811703.png",
                "sdmId" : 811703,
                "modGroupId" : 10027,
                "id" : 372,
                "sku" : 811703,
                "subOptions" : [
                  {
                    "option_id" : 372,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4694,
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 370,
                    "sku" : 811703,
                    "name" : "Regular",
                    "selected" : 0,
                    "title" : "Regular"
                  },
                  {
                    "option_id" : 372,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4695,
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 371,
                    "sku" : 811703,
                    "name" : "Extra",
                    "selected" : 0,
                    "title" : "Extra"
                  }
                ],
                "price" : 0,
                "selected" : 0,
                "title" : "Tomato"
              },
              {
                "default" : 0,
                "option_id" : 830,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 0,
                "name" : "American Cheese",
                "selection_id" : 0,
                "imageThumbnail" : "/imagestemp/810001.png",
                "sdmId" : 810001,
                "modGroupId" : 10028,
                "id" : 366,
                "sku" : 810001,
                "subOptions" : [
                  {
                    "option_id" : 366,
                    "price" : 2,
                    "product_id" : 0,
                    "selection_id" : 4690,
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 364,
                    "sku" : 810001,
                    "name" : "Regular",
                    "selected" : 0,
                    "title" : "Regular"
                  },
                  {
                    "option_id" : 366,
                    "price" : 4,
                    "product_id" : 0,
                    "selection_id" : 4691,
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 365,
                    "sku" : 810001,
                    "name" : "Extra",
                    "selected" : 0,
                    "title" : "Extra"
                  }
                ],
                "price" : 0,
                "selected" : 0,
                "title" : "American Cheese"
              }
            ],
            "ingredient" : 1,
            "isDependent" : 1,
            "maximumQty" : 0,
            "title" : "Add Some Cheese",
            "type" : "checkbox",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Add Some Cheese",
            "compId" : 1
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 3,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 831,
                "dependentSteps" : [
                  4
                ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Twister Sandwich - Original",
                "selection_id" : 4696,
                "imageThumbnail" : "/imagestemp/110003.png",
                "sdmId" : 110003,
                "modGroupId" : -1,
                "id" : 288,
                "sku" : 110003,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Twister Sandwich - Original"
              },
              {
                "default" : 0,
                "option_id" : 831,
                "dependentSteps" : [
                  4
                ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Twister Sandwich - Spicy",
                "selection_id" : 4697,
                "imageThumbnail" : "/imagestemp/110002.png",
                "sdmId" : 110002,
                "modGroupId" : -1,
                "id" : 289,
                "sku" : 110002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Twister Sandwich - Spicy"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Select Your Second Sandwich",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Select Your Second Sandwich",
            "compId" : 2
          },
          {
            "isModifier" : 1,
            "minimumQty" : 0,
            "position" : 4,
            "productLinks" : [
              {
                "default" : 0,
                "option_id" : 832,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 0,
                "name" : "Lettuce",
                "selection_id" : 0,
                "imageThumbnail" : "/imagestemp/811701.png",
                "sdmId" : 811701,
                "modGroupId" : 10027,
                "id" : 369,
                "sku" : 811701,
                "subOptions" : [
                  {
                    "option_id" : 369,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4700,
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 367,
                    "sku" : 811701,
                    "name" : "Regular",
                    "selected" : 1,
                    "title" : "Regular"
                  },
                  {
                    "option_id" : 369,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4701,
                    "sdmId" : 811701,
                    "modGroupId" : 10027,
                    "id" : 368,
                    "sku" : 811701,
                    "name" : "Extra",
                    "selected" : 0,
                    "title" : "Extra"
                  }
                ],
                "price" : 0,
                "selected" : 1,
                "title" : "Lettuce"
              },
              {
                "default" : 0,
                "option_id" : 832,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 0,
                "name" : "Tomato",
                "selection_id" : 0,
                "imageThumbnail" : "/imagestemp/811703.png",
                "sdmId" : 811703,
                "modGroupId" : 10027,
                "id" : 372,
                "sku" : 811703,
                "subOptions" : [
                  {
                    "option_id" : 372,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4702,
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 370,
                    "sku" : 811703,
                    "name" : "Regular",
                    "selected" : 1,
                    "title" : "Regular"
                  },
                  {
                    "option_id" : 372,
                    "price" : 0,
                    "product_id" : 0,
                    "selection_id" : 4703,
                    "sdmId" : 811703,
                    "modGroupId" : 10027,
                    "id" : 371,
                    "sku" : 811703,
                    "name" : "Extra",
                    "selected" : 0,
                    "title" : "Extra"
                  }
                ],
                "price" : 0,
                "selected" : 1,
                "title" : "Tomato"
              },
              {
                "default" : 0,
                "option_id" : 832,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 0,
                "name" : "American Cheese",
                "selection_id" : 0,
                "imageThumbnail" : "/imagestemp/810001.png",
                "sdmId" : 810001,
                "modGroupId" : 10028,
                "id" : 366,
                "sku" : 810001,
                "subOptions" : [
                  {
                    "option_id" : 366,
                    "price" : 2,
                    "product_id" : 0,
                    "selection_id" : 4698,
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 364,
                    "sku" : 810001,
                    "name" : "Regular",
                    "selected" : 0,
                    "title" : "Regular"
                  },
                  {
                    "option_id" : 366,
                    "price" : 4,
                    "product_id" : 0,
                    "selection_id" : 4699,
                    "sdmId" : 810001,
                    "modGroupId" : 10028,
                    "id" : 365,
                    "sku" : 810001,
                    "name" : "Extra",
                    "selected" : 0,
                    "title" : "Extra"
                  }
                ],
                "price" : 0,
                "selected" : 0,
                "title" : "American Cheese"
              }
            ],
            "ingredient" : 1,
            "isDependent" : 1,
            "maximumQty" : 0,
            "title" : "Add Some Cheese",
            "type" : "checkbox",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Add Some Cheese",
            "compId" : 2
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 5,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Medium Fries",
                "selection_id" : 4704,
                "imageThumbnail" : "/imagestemp/510050.png",
                "sdmId" : 510050,
                "modGroupId" : -1,
                "id" : 271,
                "sku" : 510050,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Medium Fries"
              },
              {
                "default" : 0,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Small",
                "selection_id" : 4706,
                "imageThumbnail" : "/imagestemp/510001.png",
                "sdmId" : 510001,
                "modGroupId" : -1,
                "id" : 257,
                "sku" : 510001,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Coleslaw Salad Small"
              },
              {
                "default" : 0,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Medium Fries Spicy",
                "selection_id" : 4705,
                "imageThumbnail" : "/imagestemp/510051.png",
                "sdmId" : 510051,
                "modGroupId" : -1,
                "id" : 275,
                "sku" : 510051,
                "subOptions" : [ ],
                "price" : 1,
                "selected" : 0,
                "title" : "Medium Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Potato Dipper- Regular",
                "selection_id" : 4708,
                "imageThumbnail" : "/imagestemp/510071.png",
                "sdmId" : 510071,
                "modGroupId" : -1,
                "id" : 277,
                "sku" : 510071,
                "subOptions" : [ ],
                "price" : 1,
                "selected" : 0,
                "title" : "Potato Dipper- Regular"
              },
              {
                "default" : 0,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Regular",
                "selection_id" : 4707,
                "imageThumbnail" : "/imagestemp/510036.png",
                "sdmId" : 510036,
                "modGroupId" : -1,
                "id" : 266,
                "sku" : 510036,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Loaded Fries Regular"
              },
              {
                "default" : 0,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Regular Loaded Fries Pepper - Chili Sauce",
                "selection_id" : 4710,
                "imageThumbnail" : "/imagestemp/510079.png",
                "sdmId" : 510079,
                "modGroupId" : -1,
                "id" : 291,
                "sku" : 510079,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Regular Loaded Fries Pepper - Chili Sauce"
              },
              {
                "default" : 0,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 7,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper",
                "selection_id" : 4709,
                "imageThumbnail" : "/imagestemp/510075.png",
                "sdmId" : 510075,
                "modGroupId" : -1,
                "id" : 290,
                "sku" : 510075,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Cheese Potato Dipper"
              },
              {
                "default" : 0,
                "option_id" : 833,
                "dependentSteps" : [ ],
                "position" : 8,
                "selectionQty" : 1,
                "name" : "Supreme Loaded Fries",
                "selection_id" : 4711,
                "imageThumbnail" : "/imagestemp/510085.png",
                "sdmId" : 510085,
                "modGroupId" : -1,
                "id" : 241,
                "sku" : 510085,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Supreme Loaded Fries"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Select your favorite side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Select your favorite side item",
            "compId" : 3
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 6,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Pepsi Medium",
                "selection_id" : 4712,
                "imageThumbnail" : "/imagestemp/600003.png",
                "sdmId" : 600003,
                "modGroupId" : -1,
                "id" : 243,
                "sku" : 600003,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Pepsi Medium"
              },
              {
                "default" : 0,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Mirinda Medium",
                "selection_id" : 4713,
                "imageThumbnail" : "/imagestemp/600009.png",
                "sdmId" : 600009,
                "modGroupId" : -1,
                "id" : 255,
                "sku" : 600009,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Mirinda Medium"
              },
              {
                "default" : 0,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "7Up Medium",
                "selection_id" : 4714,
                "imageThumbnail" : "/imagestemp/600016.png",
                "sdmId" : 600016,
                "modGroupId" : -1,
                "id" : 250,
                "sku" : 600016,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "7Up Medium"
              },
              {
                "default" : 0,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Diet Pepsi Medium",
                "selection_id" : 4715,
                "imageThumbnail" : "/imagestemp/600006.png",
                "sdmId" : 600006,
                "modGroupId" : -1,
                "id" : 245,
                "sku" : 600006,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Diet Pepsi Medium"
              },
              {
                "default" : 0,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Mountain Dew Medium",
                "selection_id" : 4716,
                "imageThumbnail" : "/imagestemp/600013.png",
                "sdmId" : 600013,
                "modGroupId" : -1,
                "id" : 252,
                "sku" : 600013,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Mountain Dew Medium"
              },
              {
                "default" : 0,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Small Aquafina",
                "selection_id" : 4718,
                "imageThumbnail" : "/imagestemp/610011.png",
                "sdmId" : 610011,
                "modGroupId" : -1,
                "id" : 292,
                "sku" : 610011,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Small Aquafina"
              },
              {
                "default" : 0,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 7,
                "selectionQty" : 1,
                "name" : "Mojito Krusher",
                "selection_id" : 4717,
                "imageThumbnail" : "/imagestemp/610021.png",
                "sdmId" : 610021,
                "modGroupId" : -1,
                "id" : 237,
                "sku" : 610021,
                "subOptions" : [ ],
                "price" : 5.5,
                "selected" : 0,
                "title" : "Mojito Krusher"
              },
              {
                "default" : 0,
                "option_id" : 834,
                "dependentSteps" : [ ],
                "position" : 8,
                "selectionQty" : 1,
                "name" : "Fresh Orange Juice",
                "selection_id" : 4719,
                "imageThumbnail" : "/imagestemp/610020.png",
                "sdmId" : 610020,
                "modGroupId" : -1,
                "id" : 236,
                "sku" : 610020,
                "subOptions" : [ ],
                "price" : 8.5,
                "selected" : 0,
                "title" : "Fresh Orange Juice"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Select your favorite beverage",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Select your favorite beverage",
            "compId" : 4
          }
        ],
        "description" : "Mighty Zinger + Twister + Fries + Pepsi",
        "viewIdentifier" : 0,
        "configurableProductOptions" : [
          {
            "position" : 1,
            "selIndex" : 1,
            "id" : 144,
            "options" : [
              {
                "isSelected" : 1,
                "position" : 1,
                "title" : "Regular",
                "id" : 16285
              },
              {
                "isSelected" : 0,
                "position" : 2,
                "title" : "Medium",
                "id" : 16287
              },
              {
                "isSelected" : 0,
                "position" : 3,
                "title" : "Large",
                "id" : 16286
              }
            ],
            "subtitle" : "Choice of Size",
            "title" : "Choice of Size"
          }
        ],
        "finalPrice" : 25,
        "imageSmall" : "/imagestemp/900070.png",
        "langMenuId" : "En#1",
        "langMenuIdProductId" : "En#1#16",
        "menuId" : 1,
        "sdmId" : 70,
        "selectedItem" : 900148,
        "sellingPrice" : 25,
        "sku" : 900070,
        "specialPrice" : 0,
        "typeId" : "bundle_group",
        "virtualGroup" : 0,
        "visibility" : 4
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
                                if (dependentSteps.ingredient == 1 || dependentSteps.isModifier == 1) {
                                  /**
                                   * @description (ingredient == 1) :  "name": "Twister Meal"
                                   * @description (isModifier == 1) :  "name": "Mighty Twist"
                                   */
                                  if (dependentSteps.productLinks && dependentSteps.productLinks.length > 0) {
                                    dependentSteps.productLinks.forEach(dspl => {
                                      if (dspl.subOptions && dspl.subOptions.length > 0) {
                                        dspl.subOptions.forEach(dsplso => {
                                          if (dsplso.sdmId && dsplso.selected == 1) {
                                            if (dsplso.title == "None") { }
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


// <a:ItemID>910011</a:ItemID>
// <a:Level>0</a:Level>
// <a:LongName>Chicken Pc (S) Ges</a:LongName>
// <a:LongnameUn/>
// <a:ModCode>NONE</a:ModCode>
// <a:ModgroupID>-1</a:ModgroupID>
// <a:Name>Chicken Pc (S) Ges</a:Name>
// <a:Noun>-1</a:Noun>


// <q247:CEntry>
//    <q247:ID>340143046</q247:ID>
//    <q247:ItemID>910011</q247:ItemID>
//    <q247:ModCode>NONE</q247:ModCode>
//    <q247:Name>Chicken Pc (S) Ges</q247:Name>
//    <q247:QCComponent>0</q247:QCComponent>
//    <q247:QCInstanceID>0</q247:QCInstanceID>
//    <q247:QCLevel>0</q247:QCLevel>
//    <q247:QCProID>0</q247:QCProID>
// </q247:CEntry>