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

    let stock: any =  [
      {
        "promoId" : 32,
        "originalTypeId" : "bundle",
        "image" : "imagestemp/900118.png",
        "langMenuIdCatIdProductId" : "En#1#6#419",
        "qty" : 1,
        "imageThumbnail" : "imagestemp/900118.png",
        "orignalPrice" : 135,
        "catId" : 6,
        "langMenuIdCatId" : "En#1#6",
        "inSide" : 1,
        "name" : "21 Pcs Super Bucket",
        "position" : 1,
        "language" : "En",
        "metaKeyword" : [
          "21 Pcs Super Bucket"
        ],
        "associative" : 0,
        "taxClassId" : 2,
        "id" : 419,
        "bundleProductOptions" : [
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 1,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1081,
                "dependentSteps" : [
                  2,
                  3
                ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "21 Pcs Super Bucket",
                "selection_id" : 6148,
                "imageThumbnail" : "/imagestemp/410013.png",
                "sdmId" : 410013,
                "modGroupId" : -1,
                "id" : 348,
                "sku" : 410013,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "21 Pcs Super Bucket"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of flavor",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of flavor",
            "compId" : 1
          },
          {
            "isModifier" : 1,
            "minimumQty" : 21,
            "position" : 2,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1082,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 11,
                "name" : "Chicken Pc - Original",
                "selection_id" : 6149,
                "imageThumbnail" : "/imagestemp/910001.png",
                "sdmId" : 910001,
                "modGroupId" : 10202,
                "id" : 283,
                "sku" : 910001,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Chicken Pc - Original"
              },
              {
                "default" : 1,
                "option_id" : 1082,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 10,
                "name" : "Chicken Pc - Spicy",
                "selection_id" : 6150,
                "imageThumbnail" : "/imagestemp/910002.png",
                "sdmId" : 910002,
                "modGroupId" : 10202,
                "id" : 284,
                "sku" : 910002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Chicken Pc - Spicy"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 1,
            "maximumQty" : 21,
            "title" : "Choice Of Chicken",
            "type" : "stepper",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice Of Chicken",
            "compId" : 1
          },
          {
            "isModifier" : 1,
            "minimumQty" : 5,
            "position" : 3,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1083,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 3,
                "name" : "Crispy Strips Original",
                "selection_id" : 6151,
                "imageThumbnail" : "/imagestemp/511001.png",
                "sdmId" : 511001,
                "modGroupId" : 10208,
                "id" : 311,
                "sku" : 511001,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Crispy Strips Original"
              },
              {
                "default" : 0,
                "option_id" : 1083,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 2,
                "name" : "Crispy Strips Spicy",
                "selection_id" : 6152,
                "imageThumbnail" : "/imagestemp/511002.png",
                "sdmId" : 511002,
                "modGroupId" : 10208,
                "id" : 312,
                "sku" : 511002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Crispy Strips Spicy"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 1,
            "maximumQty" : 5,
            "title" : "Choice of Strips",
            "type" : "stepper",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of Strips",
            "compId" : 1
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 4,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6153,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6155,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Chips Large Catering",
                "selection_id" : 6157,
                "imageThumbnail" : "/imagestemp/510068.png",
                "sdmId" : 510068,
                "modGroupId" : -1,
                "id" : 330,
                "sku" : 510068,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Chips Large Catering"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6154,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6156,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Family Loaded Fries Pepper - Chili Sauce",
                "selection_id" : 6160,
                "imageThumbnail" : "/imagestemp/510080.png",
                "sdmId" : 510080,
                "modGroupId" : -1,
                "id" : 286,
                "sku" : 510080,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Family Loaded Fries Pepper - Chili Sauce"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 7,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6158,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 8,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6159,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 12,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of first side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of first side item",
            "compId" : 2
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 5,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6161,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6164,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Chips Large Catering",
                "selection_id" : 6165,
                "imageThumbnail" : "/imagestemp/510068.png",
                "sdmId" : 510068,
                "modGroupId" : -1,
                "id" : 330,
                "sku" : 510068,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Chips Large Catering"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6162,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6163,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Family Loaded Fries Pepper - Chili Sauce",
                "selection_id" : 6168,
                "imageThumbnail" : "/imagestemp/510080.png",
                "sdmId" : 510080,
                "modGroupId" : -1,
                "id" : 286,
                "sku" : 510080,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Family Loaded Fries Pepper - Chili Sauce"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 7,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6166,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 8,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6167,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 12,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of second side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of second side item",
            "compId" : 3
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 6,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6169,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6173,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6170,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6171,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6172,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 8,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6174,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 15,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of first side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of first side item",
            "compId" : 4
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 7,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6175,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6179,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6176,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6177,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6178,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 8,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6180,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 15,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of second side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of second side item",
            "compId" : 5
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 8,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Pepsi 2.25",
                "selection_id" : 6181,
                "imageThumbnail" : "/imagestemp/610034.png",
                "sdmId" : 610034,
                "modGroupId" : -1,
                "id" : 340,
                "sku" : 610034,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Pepsi 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "7Up  2.25",
                "selection_id" : 6182,
                "imageThumbnail" : "/imagestemp/610035.png",
                "sdmId" : 610035,
                "modGroupId" : -1,
                "id" : 341,
                "sku" : 610035,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "7Up  2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Mountain Dew 2.25",
                "selection_id" : 6183,
                "imageThumbnail" : "/imagestemp/610036.png",
                "sdmId" : 610036,
                "modGroupId" : -1,
                "id" : 342,
                "sku" : 610036,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Mountain Dew 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Diet Pepsi 2.25",
                "selection_id" : 6184,
                "imageThumbnail" : "/imagestemp/610037.png",
                "sdmId" : 610037,
                "modGroupId" : -1,
                "id" : 343,
                "sku" : 610037,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Diet Pepsi 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Mirinda 2.25",
                "selection_id" : 6185,
                "imageThumbnail" : "/imagestemp/610038.png",
                "sdmId" : 610038,
                "modGroupId" : -1,
                "id" : 344,
                "sku" : 610038,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Mirinda 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Orange Juice 1L",
                "selection_id" : 6186,
                "imageThumbnail" : "/imagestemp/610033.png",
                "sdmId" : 610033,
                "modGroupId" : -1,
                "id" : 336,
                "sku" : 610033,
                "subOptions" : [ ],
                "price" : 21,
                "selected" : 0,
                "title" : "Orange Juice 1L"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of Beverages",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of Beverages",
            "compId" : 6
          }
        ],
        "description" : "21 chicken pcs + 5 crispy strips + 2 family fries + 2 family coleslaw +7 bun + 2.25 L drink",
        "tempBundleProductOptions" : [
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 1,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1081,
                "dependentSteps" : [
                  2,
                  3
                ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "21 Pcs Super Bucket",
                "selection_id" : 6148,
                "imageThumbnail" : "/imagestemp/410013.png",
                "sdmId" : 410013,
                "modGroupId" : -1,
                "id" : 348,
                "sku" : 410013,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "21 Pcs Super Bucket"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of flavor",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of flavor",
            "compId" : 1
          },
          {
            "isModifier" : 1,
            "minimumQty" : 21,
            "position" : 2,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1082,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 11,
                "name" : "Chicken Pc - Original",
                "selection_id" : 6149,
                "imageThumbnail" : "/imagestemp/910001.png",
                "sdmId" : 910001,
                "modGroupId" : 10202,
                "id" : 283,
                "sku" : 910001,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Chicken Pc - Original"
              },
              {
                "default" : 1,
                "option_id" : 1082,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 10,
                "name" : "Chicken Pc - Spicy",
                "selection_id" : 6150,
                "imageThumbnail" : "/imagestemp/910002.png",
                "sdmId" : 910002,
                "modGroupId" : 10202,
                "id" : 284,
                "sku" : 910002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Chicken Pc - Spicy"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 1,
            "maximumQty" : 21,
            "title" : "Choice Of Chicken",
            "type" : "stepper",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice Of Chicken",
            "compId" : 1
          },
          {
            "isModifier" : 1,
            "minimumQty" : 5,
            "position" : 3,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1083,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 3,
                "name" : "Crispy Strips Original",
                "selection_id" : 6151,
                "imageThumbnail" : "/imagestemp/511001.png",
                "sdmId" : 511001,
                "modGroupId" : 10208,
                "id" : 311,
                "sku" : 511001,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Crispy Strips Original"
              },
              {
                "default" : 0,
                "option_id" : 1083,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 2,
                "name" : "Crispy Strips Spicy",
                "selection_id" : 6152,
                "imageThumbnail" : "/imagestemp/511002.png",
                "sdmId" : 511002,
                "modGroupId" : 10208,
                "id" : 312,
                "sku" : 511002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Crispy Strips Spicy"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 1,
            "maximumQty" : 5,
            "title" : "Choice of Strips",
            "type" : "stepper",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of Strips",
            "compId" : 1
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 4,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6153,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6155,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Chips Large Catering",
                "selection_id" : 6157,
                "imageThumbnail" : "/imagestemp/510068.png",
                "sdmId" : 510068,
                "modGroupId" : -1,
                "id" : 330,
                "sku" : 510068,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Chips Large Catering"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6154,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6156,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Family Loaded Fries Pepper - Chili Sauce",
                "selection_id" : 6160,
                "imageThumbnail" : "/imagestemp/510080.png",
                "sdmId" : 510080,
                "modGroupId" : -1,
                "id" : 286,
                "sku" : 510080,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Family Loaded Fries Pepper - Chili Sauce"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 7,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6158,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1084,
                "dependentSteps" : [ ],
                "position" : 8,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6159,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 12,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of first side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of first side item",
            "compId" : 2
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 5,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6161,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6164,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Chips Large Catering",
                "selection_id" : 6165,
                "imageThumbnail" : "/imagestemp/510068.png",
                "sdmId" : 510068,
                "modGroupId" : -1,
                "id" : 330,
                "sku" : 510068,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Chips Large Catering"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6162,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6163,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Family Loaded Fries Pepper - Chili Sauce",
                "selection_id" : 6168,
                "imageThumbnail" : "/imagestemp/510080.png",
                "sdmId" : 510080,
                "modGroupId" : -1,
                "id" : 286,
                "sku" : 510080,
                "subOptions" : [ ],
                "price" : 5,
                "selected" : 0,
                "title" : "Family Loaded Fries Pepper - Chili Sauce"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 7,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6166,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1085,
                "dependentSteps" : [ ],
                "position" : 8,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6167,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 12,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of second side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of second side item",
            "compId" : 3
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 6,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6169,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6173,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6170,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6171,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6172,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 8,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1086,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6174,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 15,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of first side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of first side item",
            "compId" : 4
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 7,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Coleslaw Salad Large",
                "selection_id" : 6175,
                "imageThumbnail" : "/imagestemp/510002.png",
                "sdmId" : 510002,
                "modGroupId" : -1,
                "id" : 258,
                "sku" : 510002,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Coleslaw Salad Large"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "Family Dipper Fries",
                "selection_id" : 6179,
                "imageThumbnail" : "/imagestemp/510074.png",
                "sdmId" : 510074,
                "modGroupId" : -1,
                "id" : 276,
                "sku" : 510074,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Family Dipper Fries"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Family Fries",
                "selection_id" : 6176,
                "imageThumbnail" : "/imagestemp/510005.png",
                "sdmId" : 510005,
                "modGroupId" : -1,
                "id" : 270,
                "sku" : 510005,
                "subOptions" : [ ],
                "price" : 3,
                "selected" : 0,
                "title" : "Family Fries"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Family Fries Spicy",
                "selection_id" : 6177,
                "imageThumbnail" : "/imagestemp/510014.png",
                "sdmId" : 510014,
                "modGroupId" : -1,
                "id" : 273,
                "sku" : 510014,
                "subOptions" : [ ],
                "price" : 6,
                "selected" : 0,
                "title" : "Family Fries Spicy"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Loaded Fries Family",
                "selection_id" : 6178,
                "imageThumbnail" : "/imagestemp/510030.png",
                "sdmId" : 510030,
                "modGroupId" : -1,
                "id" : 267,
                "sku" : 510030,
                "subOptions" : [ ],
                "price" : 8,
                "selected" : 0,
                "title" : "Loaded Fries Family"
              },
              {
                "default" : 0,
                "option_id" : 1087,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Cheese Potato Dipper Fami",
                "selection_id" : 6180,
                "imageThumbnail" : "/imagestemp/510076.png",
                "sdmId" : 510076,
                "modGroupId" : -1,
                "id" : 285,
                "sku" : 510076,
                "subOptions" : [ ],
                "price" : 15,
                "selected" : 0,
                "title" : "Cheese Potato Dipper Fami"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of second side item",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of second side item",
            "compId" : 5
          },
          {
            "isModifier" : 0,
            "minimumQty" : 0,
            "position" : 8,
            "productLinks" : [
              {
                "default" : 1,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 1,
                "selectionQty" : 1,
                "name" : "Pepsi 2.25",
                "selection_id" : 6181,
                "imageThumbnail" : "/imagestemp/610034.png",
                "sdmId" : 610034,
                "modGroupId" : -1,
                "id" : 340,
                "sku" : 610034,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 1,
                "title" : "Pepsi 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 2,
                "selectionQty" : 1,
                "name" : "7Up  2.25",
                "selection_id" : 6182,
                "imageThumbnail" : "/imagestemp/610035.png",
                "sdmId" : 610035,
                "modGroupId" : -1,
                "id" : 341,
                "sku" : 610035,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "7Up  2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 3,
                "selectionQty" : 1,
                "name" : "Mountain Dew 2.25",
                "selection_id" : 6183,
                "imageThumbnail" : "/imagestemp/610036.png",
                "sdmId" : 610036,
                "modGroupId" : -1,
                "id" : 342,
                "sku" : 610036,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Mountain Dew 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 4,
                "selectionQty" : 1,
                "name" : "Diet Pepsi 2.25",
                "selection_id" : 6184,
                "imageThumbnail" : "/imagestemp/610037.png",
                "sdmId" : 610037,
                "modGroupId" : -1,
                "id" : 343,
                "sku" : 610037,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Diet Pepsi 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 5,
                "selectionQty" : 1,
                "name" : "Mirinda 2.25",
                "selection_id" : 6185,
                "imageThumbnail" : "/imagestemp/610038.png",
                "sdmId" : 610038,
                "modGroupId" : -1,
                "id" : 344,
                "sku" : 610038,
                "subOptions" : [ ],
                "price" : 0,
                "selected" : 0,
                "title" : "Mirinda 2.25"
              },
              {
                "default" : 0,
                "option_id" : 1088,
                "dependentSteps" : [ ],
                "position" : 6,
                "selectionQty" : 1,
                "name" : "Orange Juice 1L",
                "selection_id" : 6186,
                "imageThumbnail" : "/imagestemp/610033.png",
                "sdmId" : 610033,
                "modGroupId" : -1,
                "id" : 336,
                "sku" : 610033,
                "subOptions" : [ ],
                "price" : 21,
                "selected" : 0,
                "title" : "Orange Juice 1L"
              }
            ],
            "ingredient" : 0,
            "isDependent" : 0,
            "maximumQty" : 0,
            "title" : "Choice of Beverages",
            "type" : "radio",
            "imageThumbnail" : "/imagestemp/0.png",
            "subtitle" : "Choice of Beverages",
            "compId" : 6
          }
        ],
        "configurableProductOptions" : [ ],
        "finalPrice" : 135,
        "imageSmall" : "imagestemp/900118.png",
        "langMenuId" : "En#1",
        "langMenuIdProductId" : "En#1#419",
        "menuId" : 1,
        "sdmId" : 118,
        "selectedItem" : 0,
        "sellingPrice" : 135,
        "sku" : 900118,
        "specialPrice" : 135,
        "typeId" : "bundle",
        "viewIdentifier" : 0,
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
                                  Entries.CEntry.push(obj)
                                } else if (dependentSteps['type'] == "stepper") {
                                  console.log("666666666666666666666666666666")

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

    // console.log("Entries", JSON.stringify(Entries))


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