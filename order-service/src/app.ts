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
        "sdmId": 132,
        "description": "4 Pcs Chicken + 4 Pcs Strips + 2 Fries + 2 Coleslaw + 2 Drinks + 2 cookies",
        "position": 1,
        "sku": 900132,
        "bundleProductOptions": [
          {
            "subtitle": "Better Together Meal - Medium",
            "position": 1,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Better Together Meal - Medium",
            "productLinks": [
              {
                "id": 293,
                "sdmId": 410030,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/410030.png",
                "default": 1,
                "sku": 410030,
                "option_id": 847,
                "price": 0,
                "selection_id": 4782,
                "title": "Better together",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  2,
                  3
                ],
                "selected": 1,
                "name": "Better together"
              }
            ],
            "isModifier": 0,
            "compId": 1,
            "maximumQty": 0,
            "name": "Better Together Meal - Medium"
          },
          {
            "subtitle": "Choice of Chicken",
            "position": 2,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 4,
            "type": "stepper",
            "title": "Choice of Chicken",
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
                "option_id": 848,
                "price": 0,
                "selection_id": 4783,
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
                "option_id": 848,
                "price": 0,
                "selection_id": 4784,
                "title": "Chicken Pc - Spicy",
                "modGroupId": 10206,
                "selectionQty": 2,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Chicken Pc - Spicy"
              }
            ],
            "isModifier": 1,
            "compId": 1,
            "maximumQty": 4,
            "name": "Choice of Chicken"
          },
          {
            "subtitle": "4 PCS Strips",
            "position": 3,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 4,
            "type": "stepper",
            "title": "4 PCS Strips",
            "productLinks": [
              {
                "id": 311,
                "sdmId": 511001,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/511001.png",
                "default": 1,
                "sku": 511001,
                "option_id": 849,
                "price": 0,
                "selection_id": 4785,
                "title": "Crispy Strips Original",
                "modGroupId": 10209,
                "selectionQty": 2,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Crispy Strips Original"
              },
              {
                "id": 312,
                "sdmId": 511002,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/511002.png",
                "default": 1,
                "sku": 511002,
                "option_id": 849,
                "price": 0,
                "selection_id": 4786,
                "title": "Crispy Strips Spicy",
                "modGroupId": 10209,
                "selectionQty": 2,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Crispy Strips Spicy"
              }
            ],
            "isModifier": 1,
            "compId": 1,
            "maximumQty": 4,
            "name": "4 PCS Strips"
          },
          {
            "subtitle": "First Cookie",
            "position": 4,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "First Cookie",
            "productLinks": [
              {
                "id": 240,
                "sdmId": 710003,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/710003.png",
                "default": 1,
                "sku": 710003,
                "option_id": 850,
                "price": 0,
                "selection_id": 4787,
                "title": "Chocolate Chip Cookie",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Chocolate Chip Cookie"
              }
            ],
            "isModifier": 0,
            "compId": 2,
            "maximumQty": 0,
            "name": "First Cookie"
          },
          {
            "subtitle": "Second Cookie",
            "position": 5,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Second Cookie",
            "productLinks": [
              {
                "id": 240,
                "sdmId": 710003,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/710003.png",
                "default": 1,
                "sku": 710003,
                "option_id": 851,
                "price": 0,
                "selection_id": 4788,
                "title": "Chocolate Chip Cookie",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Chocolate Chip Cookie"
              }
            ],
            "isModifier": 0,
            "compId": 3,
            "maximumQty": 0,
            "name": "Second Cookie"
          },
          {
            "subtitle": "Choice of first side item",
            "position": 6,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of first side item",
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
                "option_id": 852,
                "price": 0,
                "selection_id": 4789,
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
                "option_id": 852,
                "price": 0,
                "selection_id": 4791,
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
                "option_id": 852,
                "price": 1,
                "selection_id": 4790,
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
                "option_id": 852,
                "price": 1,
                "selection_id": 4793,
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
                "option_id": 852,
                "price": 3,
                "selection_id": 4792,
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
                "option_id": 852,
                "price": 3,
                "selection_id": 4795,
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
                "option_id": 852,
                "price": 5,
                "selection_id": 4794,
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
                "option_id": 852,
                "price": 5,
                "selection_id": 4796,
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
            "compId": 4,
            "maximumQty": 0,
            "name": "Choice of first side item"
          },
          {
            "subtitle": "Choice of second side item",
            "position": 7,
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
                "option_id": 853,
                "price": 0,
                "selection_id": 4797,
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
                "option_id": 853,
                "price": 0,
                "selection_id": 4799,
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
                "option_id": 853,
                "price": 1,
                "selection_id": 4798,
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
                "option_id": 853,
                "price": 1,
                "selection_id": 4801,
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
                "option_id": 853,
                "price": 3,
                "selection_id": 4800,
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
                "option_id": 853,
                "price": 3,
                "selection_id": 4803,
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
                "option_id": 853,
                "price": 5,
                "selection_id": 4802,
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
                "option_id": 853,
                "price": 5,
                "selection_id": 4804,
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
            "compId": 5,
            "maximumQty": 0,
            "name": "Choice of second side item"
          },
          {
            "subtitle": "Choice of first side item",
            "position": 8,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "stepper",
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
                "option_id": 854,
                "price": 0,
                "selection_id": 4805,
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
                "option_id": 854,
                "price": 2,
                "selection_id": 4806,
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
                "option_id": 854,
                "price": 2,
                "selection_id": 4809,
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
                "option_id": 854,
                "price": 3,
                "selection_id": 4807,
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
                "option_id": 854,
                "price": 5,
                "selection_id": 4808,
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
                "option_id": 854,
                "price": 7,
                "selection_id": 4810,
                "title": "Cheese Potato Dipper",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Cheese Potato Dipper"
              }
            ],
            "isModifier": 1,
            "compId": 6,
            "maximumQty": 0,
            "name": "Choice of first side item"
          },
          {
            "subtitle": "Choice of second side item",
            "position": 9,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "stepper",
            "title": "Choice of second side item",
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
                "option_id": 855,
                "price": 0,
                "selection_id": 4811,
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
                "option_id": 855,
                "price": 2,
                "selection_id": 4812,
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
                "option_id": 855,
                "price": 2,
                "selection_id": 4815,
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
                "option_id": 855,
                "price": 3,
                "selection_id": 4813,
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
                "option_id": 855,
                "price": 5,
                "selection_id": 4814,
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
                "option_id": 855,
                "price": 7,
                "selection_id": 4816,
                "title": "Cheese Potato Dipper",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Cheese Potato Dipper"
              }
            ],
            "isModifier": 1,
            "compId": 7,
            "maximumQty": 0,
            "name": "Choice of second side item"
          },
          {
            "subtitle": "Choice of first Beverage",
            "position": 10,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "stepper",
            "title": "Choice of first Beverage",
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
                "option_id": 856,
                "price": 0,
                "selection_id": 4817,
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
                "option_id": 856,
                "price": 0,
                "selection_id": 4818,
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
                "option_id": 856,
                "price": 0,
                "selection_id": 4819,
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
                "option_id": 856,
                "price": 0,
                "selection_id": 4820,
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
                "option_id": 856,
                "price": 0,
                "selection_id": 4821,
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
                "option_id": 856,
                "price": 0,
                "selection_id": 4823,
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
                "option_id": 856,
                "price": 3,
                "selection_id": 4825,
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
                "option_id": 856,
                "price": 7.5,
                "selection_id": 4822,
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
                "option_id": 856,
                "price": 8.5,
                "selection_id": 4824,
                "title": "Fresh Orange Juice",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Fresh Orange Juice"
              }
            ],
            "isModifier": 1,
            "compId": 8,
            "maximumQty": 0,
            "name": "Choice of first Beverage"
          },
          {
            "subtitle": "Choice of second Beverage",
            "position": 11,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "stepper",
            "title": "Choice of second Beverage",
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
                "option_id": 857,
                "price": 0,
                "selection_id": 4826,
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
                "option_id": 857,
                "price": 0,
                "selection_id": 4827,
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
                "option_id": 857,
                "price": 0,
                "selection_id": 4828,
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
                "option_id": 857,
                "price": 0,
                "selection_id": 4829,
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
                "option_id": 857,
                "price": 0,
                "selection_id": 4830,
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
                "option_id": 857,
                "price": 0,
                "selection_id": 4832,
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
                "option_id": 857,
                "price": 3,
                "selection_id": 4834,
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
                "option_id": 857,
                "price": 7.5,
                "selection_id": 4831,
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
                "option_id": 857,
                "price": 8.5,
                "selection_id": 4833,
                "title": "Fresh Orange Juice",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Fresh Orange Juice"
              }
            ],
            "isModifier": 1,
            "compId": 9,
            "maximumQty": 0,
            "name": "Choice of second Beverage"
          }
        ],
        "originalPrice": 55,
        "items": [
          {
            "sdmId": 132,
            "description": "",
            "position": 1,
            "sku": 900132,
            "title": "Better Together Meal - Medium",
            "bundleProductOptions": [
              {
                "subtitle": "Better Together Meal - Medium",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Better Together Meal - Medium",
                "productLinks": [
                  {
                    "id": 293,
                    "sdmId": 410030,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/410030.png",
                    "default": 1,
                    "sku": 410030,
                    "option_id": 847,
                    "price": 0,
                    "selection_id": 4782,
                    "title": "Better together",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2,
                      3
                    ],
                    "selected": 1,
                    "name": "Better together"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Better Together Meal - Medium"
              },
              {
                "subtitle": "Choice of Chicken",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 4,
                "type": "stepper",
                "title": "Choice of Chicken",
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
                    "option_id": 848,
                    "price": 0,
                    "selection_id": 4783,
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
                    "option_id": 848,
                    "price": 0,
                    "selection_id": 4784,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": 10206,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Chicken Pc - Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 4,
                "name": "Choice of Chicken"
              },
              {
                "subtitle": "4 PCS Strips",
                "position": 3,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 4,
                "type": "stepper",
                "title": "4 PCS Strips",
                "productLinks": [
                  {
                    "id": 311,
                    "sdmId": 511001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/511001.png",
                    "default": 1,
                    "sku": 511001,
                    "option_id": 849,
                    "price": 0,
                    "selection_id": 4785,
                    "title": "Crispy Strips Original",
                    "modGroupId": 10209,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Crispy Strips Original"
                  },
                  {
                    "id": 312,
                    "sdmId": 511002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/511002.png",
                    "default": 1,
                    "sku": 511002,
                    "option_id": 849,
                    "price": 0,
                    "selection_id": 4786,
                    "title": "Crispy Strips Spicy",
                    "modGroupId": 10209,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Crispy Strips Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 4,
                "name": "4 PCS Strips"
              },
              {
                "subtitle": "First Cookie",
                "position": 4,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "First Cookie",
                "productLinks": [
                  {
                    "id": 240,
                    "sdmId": 710003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/710003.png",
                    "default": 1,
                    "sku": 710003,
                    "option_id": 850,
                    "price": 0,
                    "selection_id": 4787,
                    "title": "Chocolate Chip Cookie",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chocolate Chip Cookie"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "First Cookie"
              },
              {
                "subtitle": "Second Cookie",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Second Cookie",
                "productLinks": [
                  {
                    "id": 240,
                    "sdmId": 710003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/710003.png",
                    "default": 1,
                    "sku": 710003,
                    "option_id": 851,
                    "price": 0,
                    "selection_id": 4788,
                    "title": "Chocolate Chip Cookie",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chocolate Chip Cookie"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Second Cookie"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 6,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of first side item",
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
                    "option_id": 852,
                    "price": 0,
                    "selection_id": 4789,
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
                    "option_id": 852,
                    "price": 0,
                    "selection_id": 4791,
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
                    "option_id": 852,
                    "price": 1,
                    "selection_id": 4790,
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
                    "option_id": 852,
                    "price": 1,
                    "selection_id": 4793,
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
                    "option_id": 852,
                    "price": 3,
                    "selection_id": 4792,
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
                    "option_id": 852,
                    "price": 3,
                    "selection_id": 4795,
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
                    "option_id": 852,
                    "price": 5,
                    "selection_id": 4794,
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
                    "option_id": 852,
                    "price": 5,
                    "selection_id": 4796,
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
                "compId": 4,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 7,
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
                    "option_id": 853,
                    "price": 0,
                    "selection_id": 4797,
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
                    "option_id": 853,
                    "price": 0,
                    "selection_id": 4799,
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
                    "option_id": 853,
                    "price": 1,
                    "selection_id": 4798,
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
                    "option_id": 853,
                    "price": 1,
                    "selection_id": 4801,
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
                    "option_id": 853,
                    "price": 3,
                    "selection_id": 4800,
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
                    "option_id": 853,
                    "price": 3,
                    "selection_id": 4803,
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
                    "option_id": 853,
                    "price": 5,
                    "selection_id": 4802,
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
                    "option_id": 853,
                    "price": 5,
                    "selection_id": 4804,
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
                "compId": 5,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 8,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
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
                    "option_id": 854,
                    "price": 0,
                    "selection_id": 4805,
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
                    "option_id": 854,
                    "price": 2,
                    "selection_id": 4806,
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
                    "option_id": 854,
                    "price": 2,
                    "selection_id": 4809,
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
                    "option_id": 854,
                    "price": 3,
                    "selection_id": 4807,
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
                    "option_id": 854,
                    "price": 5,
                    "selection_id": 4808,
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
                    "option_id": 854,
                    "price": 7,
                    "selection_id": 4810,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  }
                ],
                "isModifier": 1,
                "compId": 6,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 9,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
                "title": "Choice of second side item",
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
                    "option_id": 855,
                    "price": 0,
                    "selection_id": 4811,
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
                    "option_id": 855,
                    "price": 2,
                    "selection_id": 4812,
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
                    "option_id": 855,
                    "price": 2,
                    "selection_id": 4815,
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
                    "option_id": 855,
                    "price": 3,
                    "selection_id": 4813,
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
                    "option_id": 855,
                    "price": 5,
                    "selection_id": 4814,
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
                    "option_id": 855,
                    "price": 7,
                    "selection_id": 4816,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  }
                ],
                "isModifier": 1,
                "compId": 7,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first Beverage",
                "position": 10,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
                "title": "Choice of first Beverage",
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
                    "option_id": 856,
                    "price": 0,
                    "selection_id": 4817,
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
                    "option_id": 856,
                    "price": 0,
                    "selection_id": 4818,
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
                    "option_id": 856,
                    "price": 0,
                    "selection_id": 4819,
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
                    "option_id": 856,
                    "price": 0,
                    "selection_id": 4820,
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
                    "option_id": 856,
                    "price": 0,
                    "selection_id": 4821,
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
                    "option_id": 856,
                    "price": 0,
                    "selection_id": 4823,
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
                    "option_id": 856,
                    "price": 3,
                    "selection_id": 4825,
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
                    "option_id": 856,
                    "price": 7.5,
                    "selection_id": 4822,
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
                    "option_id": 856,
                    "price": 8.5,
                    "selection_id": 4824,
                    "title": "Fresh Orange Juice",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Fresh Orange Juice"
                  }
                ],
                "isModifier": 1,
                "compId": 8,
                "maximumQty": 0,
                "name": "Choice of first Beverage"
              },
              {
                "subtitle": "Choice of second Beverage",
                "position": 11,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
                "title": "Choice of second Beverage",
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
                    "option_id": 857,
                    "price": 0,
                    "selection_id": 4826,
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
                    "option_id": 857,
                    "price": 0,
                    "selection_id": 4827,
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
                    "option_id": 857,
                    "price": 0,
                    "selection_id": 4828,
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
                    "option_id": 857,
                    "price": 0,
                    "selection_id": 4829,
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
                    "option_id": 857,
                    "price": 0,
                    "selection_id": 4830,
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
                    "option_id": 857,
                    "price": 0,
                    "selection_id": 4832,
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
                    "option_id": 857,
                    "price": 3,
                    "selection_id": 4834,
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
                    "option_id": 857,
                    "price": 7.5,
                    "selection_id": 4831,
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
                    "option_id": 857,
                    "price": 8.5,
                    "selection_id": 4833,
                    "title": "Fresh Orange Juice",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Fresh Orange Juice"
                  }
                ],
                "isModifier": 1,
                "compId": 9,
                "maximumQty": 0,
                "name": "Choice of second Beverage"
              }
            ],
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "sel1Value": 16287,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 83,
            "taxClassId": 2,
            "name": "Better Together Meal - Medium",
            "id": 377,
            "specialPrice": 61,
            "configurableProductOptions": [
              {
                "position": 1,
                "subtitle": "Choice of Size",
                "id": 144,
                "title": "Choice of Size",
                "options": [
                  {
                    "isSelected": 1,
                    "id": 16285,
                    "title": "Regular",
                    "name": "Regular",
                    "position": 1
                  },
                  {
                    "isSelected": 0,
                    "id": 16287,
                    "title": "Medium",
                    "name": "Medium",
                    "position": 2
                  },
                  {
                    "isSelected": 0,
                    "id": 16286,
                    "title": "Large",
                    "name": "Large",
                    "position": 3
                  }
                ],
                "name": "",
                "selIndex": 1
              }
            ],
            "associative": 0,
            "metaKeyword": [
              "Better Together Meal - Medium"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900132.png",
            "finalPrice": 61,
            "virtualGroup": 0,
            "inSide": 1
          },
          {
            "sdmId": 133,
            "description": "",
            "position": 3,
            "sku": 900133,
            "title": "Better Together Meal - Large",
            "bundleProductOptions": [
              {
                "subtitle": "Better Together Meal - Large",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Better Together Meal - Large",
                "productLinks": [
                  {
                    "id": 293,
                    "sdmId": 410030,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/410030.png",
                    "default": 1,
                    "sku": 410030,
                    "option_id": 858,
                    "price": 0,
                    "selection_id": 4835,
                    "title": "Better together",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2,
                      3
                    ],
                    "selected": 1,
                    "name": "Better together"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Better Together Meal - Large"
              },
              {
                "subtitle": "Choice of Chicken",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 4,
                "type": "stepper",
                "title": "Choice of Chicken",
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
                    "option_id": 859,
                    "price": 0,
                    "selection_id": 4836,
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
                    "option_id": 859,
                    "price": 0,
                    "selection_id": 4837,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": 10206,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Chicken Pc - Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 4,
                "name": "Choice of Chicken"
              },
              {
                "subtitle": "4 PCS Strips",
                "position": 3,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 4,
                "type": "stepper",
                "title": "4 PCS Strips",
                "productLinks": [
                  {
                    "id": 311,
                    "sdmId": 511001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/511001.png",
                    "default": 1,
                    "sku": 511001,
                    "option_id": 860,
                    "price": 0,
                    "selection_id": 4838,
                    "title": "Crispy Strips Original",
                    "modGroupId": 10209,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Crispy Strips Original"
                  },
                  {
                    "id": 312,
                    "sdmId": 511002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/511002.png",
                    "default": 1,
                    "sku": 511002,
                    "option_id": 860,
                    "price": 0,
                    "selection_id": 4839,
                    "title": "Crispy Strips Spicy",
                    "modGroupId": 10209,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Crispy Strips Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 4,
                "name": "4 PCS Strips"
              },
              {
                "subtitle": "First Cookie",
                "position": 4,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "First Cookie",
                "productLinks": [
                  {
                    "id": 240,
                    "sdmId": 710003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/710003.png",
                    "default": 1,
                    "sku": 710003,
                    "option_id": 861,
                    "price": 0,
                    "selection_id": 4840,
                    "title": "Chocolate Chip Cookie",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chocolate Chip Cookie"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "First Cookie"
              },
              {
                "subtitle": "Second Cookie",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Second Cookie",
                "productLinks": [
                  {
                    "id": 240,
                    "sdmId": 710003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/710003.png",
                    "default": 1,
                    "sku": 710003,
                    "option_id": 862,
                    "price": 0,
                    "selection_id": 4841,
                    "title": "Chocolate Chip Cookie",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chocolate Chip Cookie"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Second Cookie"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 6,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of first side item",
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
                    "option_id": 863,
                    "price": 0,
                    "selection_id": 4842,
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
                    "option_id": 863,
                    "price": 0,
                    "selection_id": 4844,
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
                    "option_id": 863,
                    "price": 1,
                    "selection_id": 4843,
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
                    "option_id": 863,
                    "price": 1,
                    "selection_id": 4846,
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
                    "option_id": 863,
                    "price": 3,
                    "selection_id": 4845,
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
                    "option_id": 863,
                    "price": 3,
                    "selection_id": 4848,
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
                    "option_id": 863,
                    "price": 5,
                    "selection_id": 4847,
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
                    "option_id": 863,
                    "price": 5,
                    "selection_id": 4849,
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
                "compId": 4,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 7,
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
                    "option_id": 864,
                    "price": 0,
                    "selection_id": 4850,
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
                    "option_id": 864,
                    "price": 0,
                    "selection_id": 4852,
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
                    "option_id": 864,
                    "price": 1,
                    "selection_id": 4851,
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
                    "option_id": 864,
                    "price": 1,
                    "selection_id": 4854,
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
                    "option_id": 864,
                    "price": 3,
                    "selection_id": 4853,
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
                    "option_id": 864,
                    "price": 3,
                    "selection_id": 4856,
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
                    "option_id": 864,
                    "price": 5,
                    "selection_id": 4855,
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
                    "option_id": 864,
                    "price": 5,
                    "selection_id": 4857,
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
                "compId": 5,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 8,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
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
                    "option_id": 865,
                    "price": 0,
                    "selection_id": 4858,
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
                    "option_id": 865,
                    "price": 2,
                    "selection_id": 4859,
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
                    "option_id": 865,
                    "price": 2,
                    "selection_id": 4862,
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
                    "option_id": 865,
                    "price": 3,
                    "selection_id": 4860,
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
                    "option_id": 865,
                    "price": 5,
                    "selection_id": 4861,
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
                    "option_id": 865,
                    "price": 7,
                    "selection_id": 4863,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  }
                ],
                "isModifier": 1,
                "compId": 6,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 9,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
                "title": "Choice of second side item",
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
                    "option_id": 866,
                    "price": 0,
                    "selection_id": 4864,
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
                    "option_id": 866,
                    "price": 2,
                    "selection_id": 4865,
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
                    "option_id": 866,
                    "price": 2,
                    "selection_id": 4868,
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
                    "option_id": 866,
                    "price": 3,
                    "selection_id": 4866,
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
                    "option_id": 866,
                    "price": 5,
                    "selection_id": 4867,
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
                    "option_id": 866,
                    "price": 7,
                    "selection_id": 4869,
                    "title": "Cheese Potato Dipper",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Cheese Potato Dipper"
                  }
                ],
                "isModifier": 1,
                "compId": 7,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first Beverages",
                "position": 10,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
                "title": "Choice of first Beverages",
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
                    "option_id": 867,
                    "price": 0,
                    "selection_id": 4870,
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
                    "option_id": 867,
                    "price": 0,
                    "selection_id": 4871,
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
                    "option_id": 867,
                    "price": 0,
                    "selection_id": 4872,
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
                    "option_id": 867,
                    "price": 0,
                    "selection_id": 4873,
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
                    "option_id": 867,
                    "price": 0,
                    "selection_id": 4874,
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
                    "option_id": 867,
                    "price": 0,
                    "selection_id": 4876,
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
                    "option_id": 867,
                    "price": 3,
                    "selection_id": 4878,
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
                    "option_id": 867,
                    "price": 7.5,
                    "selection_id": 4875,
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
                    "option_id": 867,
                    "price": 8.5,
                    "selection_id": 4877,
                    "title": "Fresh Orange Juice",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Fresh Orange Juice"
                  }
                ],
                "isModifier": 1,
                "compId": 8,
                "maximumQty": 0,
                "name": "Choice of first Beverages"
              },
              {
                "subtitle": "Choice of second Beverages",
                "position": 11,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "stepper",
                "title": "Choice of second Beverages",
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
                    "option_id": 868,
                    "price": 0,
                    "selection_id": 4879,
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
                    "option_id": 868,
                    "price": 0,
                    "selection_id": 4880,
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
                    "option_id": 868,
                    "price": 0,
                    "selection_id": 4881,
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
                    "option_id": 868,
                    "price": 0,
                    "selection_id": 4882,
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
                    "option_id": 868,
                    "price": 0,
                    "selection_id": 4883,
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
                    "option_id": 868,
                    "price": 0,
                    "selection_id": 4885,
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
                    "option_id": 868,
                    "price": 3,
                    "selection_id": 4887,
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
                    "option_id": 868,
                    "price": 7.5,
                    "selection_id": 4884,
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
                    "option_id": 868,
                    "price": 8.5,
                    "selection_id": 4886,
                    "title": "Fresh Orange Juice",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Fresh Orange Juice"
                  }
                ],
                "isModifier": 1,
                "compId": 9,
                "maximumQty": 0,
                "name": "Choice of second Beverages"
              }
            ],
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "sel1Value": 16286,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 83,
            "taxClassId": 2,
            "name": "Better Together Meal - Large",
            "id": 378,
            "specialPrice": 64,
            "configurableProductOptions": [
              {
                "position": 1,
                "subtitle": "Choice of Size",
                "id": 144,
                "title": "Choice of Size",
                "options": [
                  {
                    "isSelected": 1,
                    "id": 16285,
                    "title": "Regular",
                    "name": "Regular",
                    "position": 1
                  },
                  {
                    "isSelected": 0,
                    "id": 16287,
                    "title": "Medium",
                    "name": "Medium",
                    "position": 2
                  },
                  {
                    "isSelected": 0,
                    "id": 16286,
                    "title": "Large",
                    "name": "Large",
                    "position": 3
                  }
                ],
                "name": "",
                "selIndex": 1
              }
            ],
            "associative": 0,
            "metaKeyword": [
              "Better Together Meal - Large"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900133.png",
            "finalPrice": 64,
            "virtualGroup": 0,
            "inSide": 1
          },
          {
            "sdmId": 134,
            "description": "",
            "position": 2,
            "sku": 900134,
            "title": "Better Together Meal - Regular",
            "bundleProductOptions": [
              {
                "subtitle": "Better Together Meal - Regular",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Better Together Meal - Regular",
                "productLinks": [
                  {
                    "id": 293,
                    "sdmId": 410030,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/410030.png",
                    "default": 1,
                    "sku": 410030,
                    "option_id": 869,
                    "price": 0,
                    "selection_id": 4888,
                    "title": "Better together",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2,
                      3
                    ],
                    "selected": 1,
                    "name": "Better together"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Better Together Meal - Regular"
              },
              {
                "subtitle": "Choice of Chicken",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 4,
                "type": "stepper",
                "title": "Choice of Chicken",
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
                    "option_id": 870,
                    "price": 0,
                    "selection_id": 4889,
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
                    "option_id": 870,
                    "price": 0,
                    "selection_id": 4890,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": 10206,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Chicken Pc - Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 4,
                "name": "Choice of Chicken"
              },
              {
                "subtitle": "4 PCS Strips",
                "position": 3,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 4,
                "type": "stepper",
                "title": "4 PCS Strips",
                "productLinks": [
                  {
                    "id": 311,
                    "sdmId": 511001,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/511001.png",
                    "default": 1,
                    "sku": 511001,
                    "option_id": 871,
                    "price": 0,
                    "selection_id": 4891,
                    "title": "Crispy Strips Original",
                    "modGroupId": 10209,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Crispy Strips Original"
                  },
                  {
                    "id": 312,
                    "sdmId": 511002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/511002.png",
                    "default": 1,
                    "sku": 511002,
                    "option_id": 871,
                    "price": 0,
                    "selection_id": 4892,
                    "title": "Crispy Strips Spicy",
                    "modGroupId": 10209,
                    "selectionQty": 2,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Crispy Strips Spicy"
                  }
                ],
                "isModifier": 1,
                "compId": 1,
                "maximumQty": 4,
                "name": "4 PCS Strips"
              },
              {
                "subtitle": "First Cookie",
                "position": 4,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "First Cookie",
                "productLinks": [
                  {
                    "id": 240,
                    "sdmId": 710003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/710003.png",
                    "default": 1,
                    "sku": 710003,
                    "option_id": 872,
                    "price": 0,
                    "selection_id": 4893,
                    "title": "Chocolate Chip Cookie",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chocolate Chip Cookie"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "First Cookie"
              },
              {
                "subtitle": "Second Cookie",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Second Cookie",
                "productLinks": [
                  {
                    "id": 240,
                    "sdmId": 710003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/710003.png",
                    "default": 1,
                    "sku": 710003,
                    "option_id": 873,
                    "price": 0,
                    "selection_id": 4894,
                    "title": "Chocolate Chip Cookie",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Chocolate Chip Cookie"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Second Cookie"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 6,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of first side item",
                "productLinks": [
                  {
                    "id": 268,
                    "sdmId": 510004,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "default": 1,
                    "sku": 510004,
                    "option_id": 874,
                    "price": 0,
                    "selection_id": 4895,
                    "title": "Regular Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Regular Fries"
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
                    "option_id": 874,
                    "price": 0,
                    "selection_id": 4897,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Coleslaw Salad Small"
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
                    "option_id": 874,
                    "price": 1,
                    "selection_id": 4896,
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
                    "option_id": 874,
                    "price": 1,
                    "selection_id": 4899,
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
                    "option_id": 874,
                    "price": 3,
                    "selection_id": 4898,
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
                    "option_id": 874,
                    "price": 3,
                    "selection_id": 4901,
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
                    "option_id": 874,
                    "price": 5,
                    "selection_id": 4900,
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
                    "option_id": 874,
                    "price": 5,
                    "selection_id": 4902,
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
                "compId": 4,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 7,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of second side item",
                "productLinks": [
                  {
                    "id": 268,
                    "sdmId": 510004,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "default": 1,
                    "sku": 510004,
                    "option_id": 875,
                    "price": 0,
                    "selection_id": 4903,
                    "title": "Regular Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Regular Fries"
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
                    "option_id": 875,
                    "price": 0,
                    "selection_id": 4905,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Coleslaw Salad Small"
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
                    "option_id": 875,
                    "price": 1,
                    "selection_id": 4904,
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
                    "option_id": 875,
                    "price": 1,
                    "selection_id": 4907,
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
                    "option_id": 875,
                    "price": 3,
                    "selection_id": 4906,
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
                    "option_id": 875,
                    "price": 3,
                    "selection_id": 4909,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps ": [

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
                    "option_id": 875,
                    "price": 5,
                    "selection_id": 4908,
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
                    "option_id": 875,
                    "price": 5,
                    "selection_id": 4910,
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
                "compId": 5,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 8,
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
                    "option_id": 876,
                    "price": 0,
                    "selection_id": 4911,
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
                    "option_id": 876,
                    "price": 2,
                    "selection_id": 4912,
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
                    "option_id": 876,
                    "price": 3,
                    "selection_id": 4913,
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
                    "option_id": 876,
                    "price": 3,
                    "selection_id": 4915,
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
                    "option_id": 876,
                    "price": 5,
                    "selection_id": 4914,
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
                    "option_id": 876,
                    "price": 7,
                    "selection_id": 4916,
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
                "compId": 6,
                "maximumQty": 0,
                "name": "Choice of first side item"
              },
              {
                "subtitle": "Choice of second side item",
                "position": 9,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of second side item",
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
                    "option_id": 877,
                    "price": 0,
                    "selection_id": 4917,
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
                    "option_id": 877,
                    "price": 2,
                    "selection_id": 4918,
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
                    "option_id": 877,
                    "price": 3,
                    "selection_id": 4919,
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
                    "option_id": 877,
                    "price": 3,
                    "selection_id": 4921,
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
                    "option_id": 877,
                    "price": 5,
                    "selection_id": 4920,
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
                    "option_id": 877,
                    "price": 7,
                    "selection_id": 4922,
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
                "compId": 7,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of first Beverage",
                "position": 10,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of first Beverage",
                "productLinks": [
                  {
                    "id": 242,
                    "sdmId": 600002,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/600002.png",
                    "default": 1,
                    "sku": 600002,
                    "option_id": 878,
                    "price": 0,
                    "selection_id": 4923,
                    "title": "Pepsi Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Pepsi Regular"
                  },
                  {
                    "id": 254,
                    "sdmId": 600008,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600008.png",
                    "default": 0,
                    "sku": 600008,
                    "option_id": 878,
                    "price": 0,
                    "selection_id": 4924,
                    "title": "Mirinda Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mirinda Regular"
                  },
                  {
                    "id": 249,
                    "sdmId": 600015,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600015.png",
                    "default": 0,
                    "sku": 600015,
                    "option_id": 878,
                    "price": 0,
                    "selection_id": 4925,
                    "title": "7Up Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "7Up Regular"
                  },
                  {
                    "id": 246,
                    "sdmId": 600005,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600005.png",
                    "default": 0,
                    "sku": 600005,
                    "option_id": 878,
                    "price": 0,
                    "selection_id": 4926,
                    "title": "Diet Pepsi Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Regular"
                  },
                  {
                    "id": 251,
                    "sdmId": 600012,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/600012.png",
                    "default": 0,
                    "sku": 600012,
                    "option_id": 878,
                    "price": 0,
                    "selection_id": 4927,
                    "title": "Mountain Dew Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mountain Dew Regular"
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
                    "option_id": 878,
                    "price": 0,
                    "selection_id": 4929,
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
                    "option_id": 878,
                    "price": 3,
                    "selection_id": 4931,
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
                    "option_id": 878,
                    "price": 7.5,
                    "selection_id": 4928,
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
                    "option_id": 878,
                    "price": 8.5,
                    "selection_id": 4930,
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
                "compId": 8,
                "maximumQty": 0,
                "name": "Choice of first Beverage"
              },
              {
                "subtitle": "Choice of second Beverage",
                "position": 11,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of second Beverage",
                "productLinks": [
                  {
                    "id": 242,
                    "sdmId": 600002,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/600002.png",
                    "default": 1,
                    "sku": 600002,
                    "option_id": 879,
                    "price": 0,
                    "selection_id": 4932,
                    "title": "Pepsi Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Pepsi Regular"
                  },
                  {
                    "id": 254,
                    "sdmId": 600008,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600008.png",
                    "default": 0,
                    "sku": 600008,
                    "option_id": 879,
                    "price": 0,
                    "selection_id": 4933,
                    "title": "Mirinda Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mirinda Regular"
                  },
                  {
                    "id": 249,
                    "sdmId": 600015,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600015.png",
                    "default": 0,
                    "sku": 600015,
                    "option_id": 879,
                    "price": 0,
                    "selection_id": 4934,
                    "title": "7Up Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "7Up Regular"
                  },
                  {
                    "id": 246,
                    "sdmId": 600005,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600005.png",
                    "default": 0,
                    "sku": 600005,
                    "option_id": 879,
                    "price": 0,
                    "selection_id": 4935,
                    "title": "Diet Pepsi Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Regular"
                  },
                  {
                    "id": 251,
                    "sdmId": 600012,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/600012.png",
                    "default": 0,
                    "sku": 600012,
                    "option_id": 879,
                    "price": 0,
                    "selection_id": 4936,
                    "title": "Mountain Dew Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mountain Dew Regular"
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
                    "option_id": 879,
                    "price": 0,
                    "selection_id": 4938,
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
                    "option_id": 879,
                    "price": 3,
                    "selection_id": 4940,
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
                    "option_id": 879,
                    "price": 7.5,
                    "selection_id": 4937,
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
                    "option_id": 879,
                    "price": 8.5,
                    "selection_id": 4939,
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
                "compId": 9,
                "maximumQty": 0,
                "name": "Choice of second Beverage"
              }
            ],
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "sel1Value": 16285,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 83,
            "taxClassId": 2,
            "name": "Better Together Meal - Regular",
            "id": 379,
            "specialPrice": 55,
            "configurableProductOptions": [
              {
                "position": 1,
                "subtitle": "Choice of Size",
                "id": 144,
                "title": "Choice of Size",
                "options": [
                  {
                    "isSelected": 1,
                    "id": 16285,
                    "title": "Regular",
                    "name": "Regular",
                    "position": 1
                  },
                  {
                    "isSelected": 0,
                    "id": 16287,
                    "title": "Medium",
                    "name": "Medium",
                    "position": 2
                  },
                  {
                    "isSelected": 0,
                    "id": 16286,
                    "title": "Large",
                    "name": "Large",
                    "position": 3
                  }
                ],
                "name": "",
                "selIndex": 1
              }
            ],
            "associative": 0,
            "metaKeyword": [
              "Better Together Meal - Regular"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900134.png",
            "finalPrice": 55,
            "virtualGroup": 0,
            "inSide": 1
          }
        ],
        "baseFinalPrice": 55,
        "catId": 13,
        "visibility": 4,
        "promoId": 83,
        "taxClassId": 2,
        "name": "Better Together Meal",
        "baseSpecialPrice": 0,
        "id": 39,
        "specialPrice": 0,
        "configurableProductOptions": [
          {
            "position": 1,
            "subtitle": "Choice of Size",
            "id": 144,
            "title": "Choice of Size",
            "options": [
              {
                "isSelected": 1,
                "id": 16285,
                "title": "Regular",
                "name": "Regular",
                "position": 1
              },
              {
                "isSelected": 0,
                "id": 16287,
                "title": "Medium",
                "name": "Medium",
                "position": 2
              },
              {
                "isSelected": 0,
                "id": 16286,
                "title": "Large",
                "name": "Large",
                "position": 3
              }
            ],
            "name": "",
            "selIndex": 1
          }
        ],
        "qty": 1,
        "sellingPrice": 55,
        "originalTypeId": "bundle_group",
        "associative": 0,
        "menuId": 1,
        "metaKeyword": [
          "Better Together Meal - Medium"
        ],
        "typeId": "bundle_group",
        "selectedItem": 900134,
        "imageThumbnail": "/imagestemp/900132.png",
        "virtualGroup": 0,
        "finalPrice": 55,
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
                    i.bundleProductOptions.forEach(bpo => {
                      let QCComponent = bpo.compId
                      if (bpo.isDependent == 0 && bpo.productLinks && bpo.productLinks.length > 0) {
                        if (bpo.ingredient == 0) {
                          bpo.productLinks.forEach(pl => {
                            if (pl.selected == 1) {
                              console.log("11111111111111111")
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
                                    } else {
                                      /**
                                       * @description (ingredient == 1) :  "name": "Twister Meal"
                                       * @description (isModifier == 1) :  "name": "Mighty Twist"
                                       */
                                      if (plbpo.productLinks && plbpo.productLinks.length > 0) {
                                        console.log("444444444444444444444444444")
                                        plbpo.productLinks.forEach(dspl => {
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
                                  }
                                })
                                Entries.CEntry.push(obj)
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