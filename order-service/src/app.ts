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
        "sdmId": 45,
        "description": "Twister Box description",
        "position": 9,
        "sku": 900045,
        "originalPrice": 30.5,
        "items": [
          {
            "sdmId": 45,
            "description": "",
            "position": 9,
            "sku": 900045,
            "title": "Twister Box - Large",
            "bundleProductOptions": [
              {
                "subtitle": "Twister Box",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Twister Box",
                "productLinks": [
                  {
                    "id": 320,
                    "sdmId": 911503,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/911503.png",
                    "default": 1,
                    "sku": 911503,
                    "option_id": 989,
                    "price": 0,
                    "selection_id": 5659,
                    "title": "Twister Box",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Twister Box"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Twister Box"
              },
              {
                "subtitle": "Choice of Chicken",
                "position": 2,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
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
                    "option_id": 990,
                    "price": 0,
                    "selection_id": 5660,
                    "title": "Chicken Pc - Original",
                    "modGroupId": 10217,
                    "selectionQty": 1,
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
                    "option_id": 990,
                    "price": 0,
                    "selection_id": 5661,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": 10217,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Chicken Pc - Spicy"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "Choice of Chicken"
              },
              {
                "subtitle": "Choice of Sandwich",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choice of Sandwich",
                "productLinks": [
                  {
                    "id": 289,
                    "sdmId": 110002,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110002.png",
                    "default": 1,
                    "sku": 110002,
                    "option_id": 991,
                    "price": 0,
                    "selection_id": 5662,
                    "title": "Twister Sandwich - Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 1,
                    "name": "Twister Sandwich - Spicy"
                  },
                  {
                    "id": 288,
                    "sdmId": 110003,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/110003.png",
                    "default": 0,
                    "sku": 110003,
                    "option_id": 991,
                    "price": 0,
                    "selection_id": 5663,
                    "title": "Twister Sandwich - Original",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 0,
                    "name": "Twister Sandwich - Original"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Choice of Sandwich"
              },
              {
                "subtitle": "Add Some Cheese",
                "position": 4,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 1,
                "minimumQty": 0,
                "type": "checkbox",
                "title": "Add Some Cheese",
                "productLinks": [
                  {
                    "id": 369,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 5666,
                        "sku": 811701,
                        "id": 367,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 369
                      },
                      {
                        "product_id": 0,
                        "selection_id": 5667,
                        "sku": 811701,
                        "id": 368,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 369
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 992,
                    "price": 0,
                    "selection_id": 0,
                    "title": "Lettuce",
                    "modGroupId": 10027,
                    "selectionQty": 0,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Lettuce"
                  },
                  {
                    "id": 372,
                    "sdmId": 811703,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 5668,
                        "sku": 811703,
                        "id": 370,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 372
                      },
                      {
                        "product_id": 0,
                        "selection_id": 5669,
                        "sku": 811703,
                        "id": 371,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 372
                      }
                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 992,
                    "price": 0,
                    "selection_id": 0,
                    "title": "Tomato",
                    "modGroupId": 10027,
                    "selectionQty": 0,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Tomato"
                  },
                  {
                    "id": 366,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 5664,
                        "sku": 810001,
                        "id": 364,
                        "price": 2,
                        "selected": 0,
                        "title": "Regular",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 366
                      },
                      {
                        "product_id": 0,
                        "selection_id": 5665,
                        "sku": 810001,
                        "id": 365,
                        "price": 4,
                        "selected": 1,
                        "title": "Extra",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 366
                      }
                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 992,
                    "price": 0,
                    "selection_id": 0,
                    "title": "American Cheese",
                    "modGroupId": 10028,
                    "selectionQty": 0,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "American Cheese"
                  }
                ],
                "isModifier": 1,
                "compId": 3,
                "maximumQty": 0,
                "name": "Add Some Cheese"
              },
              {
                "subtitle": "Choice of first side item",
                "position": 5,
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
                    "option_id": 993,
                    "price": 0,
                    "selection_id": 5670,
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
                    "option_id": 993,
                    "price": 0,
                    "selection_id": 5672,
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
                    "option_id": 993,
                    "price": 1,
                    "selection_id": 5671,
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
                    "option_id": 993,
                    "price": 1,
                    "selection_id": 5674,
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
                    "option_id": 993,
                    "price": 3,
                    "selection_id": 5673,
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
                    "option_id": 993,
                    "price": 3,
                    "selection_id": 5676,
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
                    "option_id": 993,
                    "price": 5,
                    "selection_id": 5675,
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
                    "option_id": 993,
                    "price": 5,
                    "selection_id": 5677,
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
                "position": 6,
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
                    "option_id": 994,
                    "price": 0,
                    "selection_id": 5678,
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
                    "option_id": 994,
                    "price": 2,
                    "selection_id": 5679,
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
                    "option_id": 994,
                    "price": 2,
                    "selection_id": 5682,
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
                    "option_id": 994,
                    "price": 3,
                    "selection_id": 5680,
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
                    "option_id": 994,
                    "price": 5,
                    "selection_id": 5681,
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
                    "option_id": 994,
                    "price": 7,
                    "selection_id": 5683,
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
                "compId": 5,
                "maximumQty": 0,
                "name": "Choice of second side item"
              },
              {
                "subtitle": "Choice of Beverages",
                "position": 7,
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
                    "option_id": 995,
                    "price": 0,
                    "selection_id": 5684,
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
                    "option_id": 995,
                    "price": 0,
                    "selection_id": 5685,
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
                    "option_id": 995,
                    "price": 0,
                    "selection_id": 5686,
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
                    "option_id": 995,
                    "price": 0,
                    "selection_id": 5687,
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
                    "option_id": 995,
                    "price": 0,
                    "selection_id": 5688,
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
                    "option_id": 995,
                    "price": 0,
                    "selection_id": 5690,
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
                    "option_id": 995,
                    "price": 3,
                    "selection_id": 5692,
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
                    "option_id": 995,
                    "price": 7.5,
                    "selection_id": 5689,
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
                    "option_id": 995,
                    "price": 8.5,
                    "selection_id": 5691,
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
                "compId": 6,
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
            "promoId": 27,
            "taxClassId": 2,
            "name": "Twister Box - Large",
            "id": 403,
            "specialPrice": 26.5,
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
              "Twister Box - Large"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900045.png",
            "finalPrice": 26.5,
            "virtualGroup": 0,
            "inSide": 1
          }
        ],
        "baseFinalPrice": 25,
        "catId": 21,
        "visibility": 4,
        "promoId": 27,
        "taxClassId": 2,
        "name": "Twister Box",
        "baseSpecialPrice": 0,
        "id": 14,
        "specialPrice": 30.5,
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
        "sellingPrice": 30.5,
        "originalTypeId": "bundle_group",
        "associative": 0,
        "menuId": 0,
        "metaKeyword": [
          "Twister Box - Large"
        ],
        "typeId": "bundle_group",
        "selectedItem": 900045,
        "imageThumbnail": "/imagestemp/900045.png",
        "virtualGroup": 0,
        "finalPrice": 30.5,
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
                                        console.log("444444444444444444444444444")
                                        plbpo.productLinks.forEach(dspl => {
                                          console.log("55555555555555555555555555555", dspl)
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