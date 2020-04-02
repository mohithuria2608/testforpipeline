if (process.env.NODE_ENV == 'staging')
  require('newrelic');
process.env.ALLOW_CONFIG_MUTATIONS = "true";
global.healthcheck = {}
global.configSync = {
  general: 0,
  kafka: 0,
  orderStatus: 0,
  payment: 0,
  shipment: 0
}
import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog, cryptData } from './utils'
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

    let stock: any = [
      {
        "sdmId": 145,
        "description": "Mozzarella Burger Sandwich + fries + Pepsi + coleslaw + 1 Piece chicken",
        "position": 1,
        "sku": 145,
        "bundleProductOptions": [
          {
            "subtitle": "Mozzarella Burger Box",
            "position": 1,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Mozzarella Burger Box",
            "productLinks": [
              {
                "id": 295,
                "sdmId": 911524,
                "subOptions": [
                  
                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/911524.png",
                "default": 1,
                "sku": 911524,
                "option_id": 1108,
                "price": 0,
                "selection_id": 6288,
                "title": "Mozzarella Burger Box",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  
                ],
                "selected": 1,
                "name": "Mozzarella Burger Box"
              }
            ],
            "isModifier": 0,
            "compId": 1,
            "maximumQty": 0,
            "name": "Mozzarella Burger Box"
          },
          {
            "subtitle": "Select your favorite flavor",
            "position": 2,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select your favorite flavor",
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
                "option_id": 1109,
                "price": 0,
                "selection_id": 6289,
                "title": "Chicken Pc - Original",
                "modGroupId": -1,
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
                "option_id": 1109,
                "price": 0,
                "selection_id": 6290,
                "title": "Chicken Pc - Spicy",
                "modGroupId": -1,
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
            "name": "Select your favorite flavor"
          },
          {
            "subtitle": "Select Your favorite Sandwich",
            "position": 3,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select Your favorite Sandwich",
            "productLinks": [
              {
                "id": 297,
                "sdmId": 110036,
                "subOptions": [
                  
                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/110036.png",
                "default": 1,
                "sku": 110036,
                "option_id": 1110,
                "price": 0,
                "selection_id": 6291,
                "title": "Mozzarella Burger Sandwich Fillet",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  4
                ],
                "selected": 1,
                "name": "Mozzarella Burger Sandwich Fillet"
              },
              {
                "id": 296,
                "sdmId": 110035,
                "subOptions": [
                  
                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/110035.png",
                "default": 0,
                "sku": 110035,
                "option_id": 1110,
                "price": 0,
                "selection_id": 6292,
                "title": "Mozzarella Burger Sandwich Zinger",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  4
                ],
                "selected": 0,
                "name": "Mozzarella Burger Sandwich Zinger"
              }
            ],
            "isModifier": 0,
            "compId": 3,
            "maximumQty": 0,
            "name": "Select Your favorite Sandwich"
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
                "id": 366,
                "sdmId": 810001,
                "subOptions": [
                  {
                    "id": 364,
                    "sdmId": 810001,
                    "sku": 810001,
                    "title": "Regular",
                    "price": 0,
                    "modGroupId": 10028,
                    "product_id": 0,
                    "is_sdm_default": 1,
                    "option_id": 366,
                    "selection_id": 6293,
                    "selected": 1,
                    "name": "Regular"
                  },
                  {
                    "id": 365,
                    "sdmId": 810001,
                    "sku": 810001,
                    "title": "Extra",
                    "price": 2,
                    "modGroupId": 10028,
                    "product_id": 0,
                    "is_sdm_default": 0,
                    "option_id": 366,
                    "selection_id": 6294,
                    "selected": 0,
                    "name": "Extra"
                  }
                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/810001.png",
                "default": 0,
                "sku": 810001,
                "option_id": 1111,
                "price": 0,
                "selection_id": 0,
                "title": "American Cheese",
                "modGroupId": 10028,
                "selectionQty": 0,
                "dependentSteps": [
                  
                ],
                "selected": 1,
                "name": "American Cheese"
              },
              {
                "id": 369,
                "sdmId": 811701,
                "subOptions": [
                  {
                    "id": 367,
                    "sdmId": 811701,
                    "sku": 811701,
                    "title": "Regular",
                    "price": 0,
                    "modGroupId": 10027,
                    "product_id": 0,
                    "is_sdm_default": 1,
                    "option_id": 369,
                    "selection_id": 6295,
                    "selected": 1,
                    "name": "Regular"
                  },
                  {
                    "id": 368,
                    "sdmId": 811701,
                    "sku": 811701,
                    "title": "Extra",
                    "price": 0,
                    "modGroupId": 10027,
                    "product_id": 0,
                    "is_sdm_default": 0,
                    "option_id": 369,
                    "selection_id": 6296,
                    "selected": 0,
                    "name": "Extra"
                  }
                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/811701.png",
                "default": 0,
                "sku": 811701,
                "option_id": 1111,
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
                    "id": 370,
                    "sdmId": 811703,
                    "sku": 811703,
                    "title": "Regular",
                    "price": 0,
                    "modGroupId": 10027,
                    "product_id": 0,
                    "is_sdm_default": 1,
                    "option_id": 372,
                    "selection_id": 6297,
                    "selected": 1,
                    "name": "Regular"
                  },
                  {
                    "id": 371,
                    "sdmId": 811703,
                    "sku": 811703,
                    "title": "Extra",
                    "price": 0,
                    "modGroupId": 10027,
                    "product_id": 0,
                    "is_sdm_default": 0,
                    "option_id": 372,
                    "selection_id": 6298,
                    "selected": 0,
                    "name": "Extra"
                  }
                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/811703.png",
                "default": 0,
                "sku": 811703,
                "option_id": 1111,
                "price": 0,
                "selection_id": 0,
                "title": "Tomato",
                "modGroupId": 10027,
                "selectionQty": 0,
                "dependentSteps": [
                  
                ],
                "selected": 1,
                "name": "Tomato"
              }
            ],
            "isModifier": 1,
            "compId": 3,
            "maximumQty": 0,
            "name": "Add Some Cheese"
          },
          {
            "subtitle": "Select your favorite side item",
            "position": 5,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select your favorite side item",
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
                "option_id": 1112,
                "price": 0,
                "selection_id": 6299,
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
                "option_id": 1112,
                "price": 0,
                "selection_id": 6301,
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
                "option_id": 1112,
                "price": 1,
                "selection_id": 6300,
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
                "option_id": 1112,
                "price": 1,
                "selection_id": 6303,
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
                "option_id": 1112,
                "price": 3,
                "selection_id": 6302,
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
                "option_id": 1112,
                "price": 3,
                "selection_id": 6305,
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
                "option_id": 1112,
                "price": 5,
                "selection_id": 6304,
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
                "option_id": 1112,
                "price": 5,
                "selection_id": 6306,
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
            "name": "Select your favorite side item"
          },
          {
            "subtitle": "Select your favorite side item",
            "position": 6,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select your favorite side item",
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
                "option_id": 1113,
                "price": 0,
                "selection_id": 6307,
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
                "option_id": 1113,
                "price": 2,
                "selection_id": 6308,
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
                "option_id": 1113,
                "price": 3,
                "selection_id": 6309,
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
                "option_id": 1113,
                "price": 3,
                "selection_id": 6311,
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
                "option_id": 1113,
                "price": 5,
                "selection_id": 6310,
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
                "option_id": 1113,
                "price": 7,
                "selection_id": 6312,
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
            "name": "Select your favorite side item"
          },
          {
            "subtitle": "Select your favorite beverage",
            "position": 7,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select your favorite beverage",
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
                "option_id": 1114,
                "price": 0,
                "selection_id": 6313,
                "title": "Pepsi Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  
                ],
                "selected": 1,
                "name": "Pepsi Regular"
              },
              {
                "id": 246,
                "sdmId": 600005,
                "subOptions": [
                  
                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/600005.png",
                "default": 0,
                "sku": 600005,
                "option_id": 1114,
                "price": 0,
                "selection_id": 6314,
                "title": "Diet Pepsi Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  
                ],
                "selected": 0,
                "name": "Diet Pepsi Regular"
              },
              {
                "id": 254,
                "sdmId": 600008,
                "subOptions": [
                  
                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/600008.png",
                "default": 0,
                "sku": 600008,
                "option_id": 1114,
                "price": 0,
                "selection_id": 6315,
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
                "position": 4,
                "imageThumbnail": "/imagestemp/600015.png",
                "default": 0,
                "sku": 600015,
                "option_id": 1114,
                "price": 0,
                "selection_id": 6316,
                "title": "7Up Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  
                ],
                "selected": 0,
                "name": "7Up Regular"
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
                "option_id": 1114,
                "price": 0,
                "selection_id": 6317,
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
                "option_id": 1114,
                "price": 0,
                "selection_id": 6319,
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
                "option_id": 1114,
                "price": 3,
                "selection_id": 6321,
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
                "option_id": 1114,
                "price": 7.5,
                "selection_id": 6318,
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
                "option_id": 1114,
                "price": 8.5,
                "selection_id": 6320,
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
            "name": "Select your favorite beverage"
          }
        ],
        "originalPrice": 34,
        "items": [
          {
            "sdmId": 145,
            "description": "",
            "position": 1,
            "sku": 145,
            "title": "Mozzarella Burger Box - Regular",
            "bundleProductOptions": [
              {
                "subtitle": "Mozzarella Burger Box",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Mozzarella Burger Box",
                "productLinks": [
                  {
                    "id": 295,
                    "sdmId": 911524,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/911524.png",
                    "default": 1,
                    "sku": 911524,
                    "option_id": 1108,
                    "price": 0,
                    "selection_id": 6288,
                    "title": "Mozzarella Burger Box",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Mozzarella Burger Box"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Mozzarella Burger Box"
              },
              {
                "subtitle": "Select your favorite flavor",
                "position": 2,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite flavor",
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
                    "option_id": 1109,
                    "price": 0,
                    "selection_id": 6289,
                    "title": "Chicken Pc - Original",
                    "modGroupId": -1,
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
                    "option_id": 1109,
                    "price": 0,
                    "selection_id": 6290,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": -1,
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
                "name": "Select your favorite flavor"
              },
              {
                "subtitle": "Select Your favorite Sandwich",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your favorite Sandwich",
                "productLinks": [
                  {
                    "id": 297,
                    "sdmId": 110036,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110036.png",
                    "default": 1,
                    "sku": 110036,
                    "option_id": 1110,
                    "price": 0,
                    "selection_id": 6291,
                    "title": "Mozzarella Burger Sandwich Fillet",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 1,
                    "name": "Mozzarella Burger Sandwich Fillet"
                  },
                  {
                    "id": 296,
                    "sdmId": 110035,
                    "subOptions": [
                      
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/110035.png",
                    "default": 0,
                    "sku": 110035,
                    "option_id": 1110,
                    "price": 0,
                    "selection_id": 6292,
                    "title": "Mozzarella Burger Sandwich Zinger",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 0,
                    "name": "Mozzarella Burger Sandwich Zinger"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Select Your favorite Sandwich"
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
                    "id": 366,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "id": 364,
                        "sdmId": 810001,
                        "sku": 810001,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10028,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 366,
                        "selection_id": 6293,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 365,
                        "sdmId": 810001,
                        "sku": 810001,
                        "title": "Extra",
                        "price": 2,
                        "modGroupId": 10028,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 366,
                        "selection_id": 6294,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1111,
                    "price": 0,
                    "selection_id": 0,
                    "title": "American Cheese",
                    "modGroupId": 10028,
                    "selectionQty": 0,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "American Cheese"
                  },
                  {
                    "id": 369,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "id": 367,
                        "sdmId": 811701,
                        "sku": 811701,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 369,
                        "selection_id": 6295,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 368,
                        "sdmId": 811701,
                        "sku": 811701,
                        "title": "Extra",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 369,
                        "selection_id": 6296,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1111,
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
                        "id": 370,
                        "sdmId": 811703,
                        "sku": 811703,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 372,
                        "selection_id": 6297,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 371,
                        "sdmId": 811703,
                        "sku": 811703,
                        "title": "Extra",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 372,
                        "selection_id": 6298,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1111,
                    "price": 0,
                    "selection_id": 0,
                    "title": "Tomato",
                    "modGroupId": 10027,
                    "selectionQty": 0,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Tomato"
                  }
                ],
                "isModifier": 1,
                "compId": 3,
                "maximumQty": 0,
                "name": "Add Some Cheese"
              },
              {
                "subtitle": "Select your favorite side item",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite side item",
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
                    "option_id": 1112,
                    "price": 0,
                    "selection_id": 6299,
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
                    "option_id": 1112,
                    "price": 0,
                    "selection_id": 6301,
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
                    "option_id": 1112,
                    "price": 1,
                    "selection_id": 6300,
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
                    "option_id": 1112,
                    "price": 1,
                    "selection_id": 6303,
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
                    "option_id": 1112,
                    "price": 3,
                    "selection_id": 6302,
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
                    "option_id": 1112,
                    "price": 3,
                    "selection_id": 6305,
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
                    "option_id": 1112,
                    "price": 5,
                    "selection_id": 6304,
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
                    "option_id": 1112,
                    "price": 5,
                    "selection_id": 6306,
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
                "name": "Select your favorite side item"
              },
              {
                "subtitle": "Select your favorite side item",
                "position": 6,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite side item",
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
                    "option_id": 1113,
                    "price": 0,
                    "selection_id": 6307,
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
                    "option_id": 1113,
                    "price": 2,
                    "selection_id": 6308,
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
                    "option_id": 1113,
                    "price": 3,
                    "selection_id": 6309,
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
                    "option_id": 1113,
                    "price": 3,
                    "selection_id": 6311,
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
                    "option_id": 1113,
                    "price": 5,
                    "selection_id": 6310,
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
                    "option_id": 1113,
                    "price": 7,
                    "selection_id": 6312,
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
                "name": "Select your favorite side item"
              },
              {
                "subtitle": "Select your favorite beverage",
                "position": 7,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite beverage",
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
                    "option_id": 1114,
                    "price": 0,
                    "selection_id": 6313,
                    "title": "Pepsi Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Pepsi Regular"
                  },
                  {
                    "id": 246,
                    "sdmId": 600005,
                    "subOptions": [
                      
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600005.png",
                    "default": 0,
                    "sku": 600005,
                    "option_id": 1114,
                    "price": 0,
                    "selection_id": 6314,
                    "title": "Diet Pepsi Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Regular"
                  },
                  {
                    "id": 254,
                    "sdmId": 600008,
                    "subOptions": [
                      
                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600008.png",
                    "default": 0,
                    "sku": 600008,
                    "option_id": 1114,
                    "price": 0,
                    "selection_id": 6315,
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
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600015.png",
                    "default": 0,
                    "sku": 600015,
                    "option_id": 1114,
                    "price": 0,
                    "selection_id": 6316,
                    "title": "7Up Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "7Up Regular"
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
                    "option_id": 1114,
                    "price": 0,
                    "selection_id": 6317,
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
                    "option_id": 1114,
                    "price": 0,
                    "selection_id": 6319,
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
                    "option_id": 1114,
                    "price": 3,
                    "selection_id": 6321,
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
                    "option_id": 1114,
                    "price": 7.5,
                    "selection_id": 6318,
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
                    "option_id": 1114,
                    "price": 8.5,
                    "selection_id": 6320,
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
                "name": "Select your favorite beverage"
              }
            ],
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "sel1Value": 16285,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 328,
            "taxClassId": 2,
            "name": "Mozzarella Burger Box - Regular",
            "id": 423,
            "specialPrice": 34,
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
              "Mozzarella Burger Box - Regular"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/145.png",
            "finalPrice": 34,
            "virtualGroup": 0,
            "inSide": 0
          },
          {
            "sdmId": 146,
            "description": "",
            "position": 2,
            "sku": 146,
            "title": "Mozzarella Burger Box - Medium",
            "bundleProductOptions": [
              {
                "subtitle": "Mozzarella Burger Box",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Mozzarella Burger Box",
                "productLinks": [
                  {
                    "id": 295,
                    "sdmId": 911524,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/911524.png",
                    "default": 1,
                    "sku": 911524,
                    "option_id": 1115,
                    "price": 0,
                    "selection_id": 6287,
                    "title": "Mozzarella Burger Box",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Mozzarella Burger Box"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Mozzarella Burger Box"
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
                    "option_id": 1129,
                    "price": 0,
                    "selection_id": 6322,
                    "title": "Chicken Pc - Original",
                    "modGroupId": -1,
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
                    "option_id": 1129,
                    "price": 0,
                    "selection_id": 6323,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": -1,
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
                "subtitle": "Select Your favorite Sandwich",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your favorite Sandwich",
                "productLinks": [
                  {
                    "id": 296,
                    "sdmId": 110035,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110035.png",
                    "default": 1,
                    "sku": 110035,
                    "option_id": 1130,
                    "price": 0,
                    "selection_id": 6324,
                    "title": "Mozzarella Burger Sandwich Zinger",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 1,
                    "name": "Mozzarella Burger Sandwich Zinger"
                  },
                  {
                    "id": 297,
                    "sdmId": 110036,
                    "subOptions": [
                      
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/110036.png",
                    "default": 0,
                    "sku": 110036,
                    "option_id": 1130,
                    "price": 0,
                    "selection_id": 6325,
                    "title": "Mozzarella Burger Sandwich Fillet",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 0,
                    "name": "Mozzarella Burger Sandwich Fillet"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Select Your favorite Sandwich"
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
                    "id": 366,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "id": 364,
                        "sdmId": 810001,
                        "sku": 810001,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10028,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 366,
                        "selection_id": 6326,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 365,
                        "sdmId": 810001,
                        "sku": 810001,
                        "title": "Extra",
                        "price": 2,
                        "modGroupId": 10028,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 366,
                        "selection_id": 6327,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1131,
                    "price": 0,
                    "selection_id": 0,
                    "title": "American Cheese",
                    "modGroupId": 10028,
                    "selectionQty": 0,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "American Cheese"
                  },
                  {
                    "id": 369,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "id": 367,
                        "sdmId": 811701,
                        "sku": 811701,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 369,
                        "selection_id": 6328,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 368,
                        "sdmId": 811701,
                        "sku": 811701,
                        "title": "Extra",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 369,
                        "selection_id": 6329,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1131,
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
                        "id": 370,
                        "sdmId": 811703,
                        "sku": 811703,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 372,
                        "selection_id": 6330,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 371,
                        "sdmId": 811703,
                        "sku": 811703,
                        "title": "Extra",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 372,
                        "selection_id": 6331,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1131,
                    "price": 0,
                    "selection_id": 0,
                    "title": "Tomato",
                    "modGroupId": 10027,
                    "selectionQty": 0,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Tomato"
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
                    "id": 271,
                    "sdmId": 510050,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510050.png",
                    "default": 1,
                    "sku": 510050,
                    "option_id": 1132,
                    "price": 0,
                    "selection_id": 6332,
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
                    "option_id": 1132,
                    "price": 0,
                    "selection_id": 6334,
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
                    "option_id": 1132,
                    "price": 1,
                    "selection_id": 6333,
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
                    "option_id": 1132,
                    "price": 1,
                    "selection_id": 6336,
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
                    "option_id": 1132,
                    "price": 3,
                    "selection_id": 6335,
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
                    "option_id": 1132,
                    "price": 3,
                    "selection_id": 6338,
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
                    "option_id": 1132,
                    "price": 5,
                    "selection_id": 6337,
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
                    "option_id": 1132,
                    "price": 5,
                    "selection_id": 6339,
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
                    "option_id": 1133,
                    "price": 0,
                    "selection_id": 6340,
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
                    "option_id": 1133,
                    "price": 2,
                    "selection_id": 6341,
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
                    "option_id": 1133,
                    "price": 3,
                    "selection_id": 6342,
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
                    "option_id": 1133,
                    "price": 3,
                    "selection_id": 6344,
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
                    "option_id": 1133,
                    "price": 4,
                    "selection_id": 6343,
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
                    "option_id": 1133,
                    "price": 7,
                    "selection_id": 6345,
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
                    "id": 243,
                    "sdmId": 600003,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/600003.png",
                    "default": 1,
                    "sku": 600003,
                    "option_id": 1134,
                    "price": 0,
                    "selection_id": 6346,
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
                    "option_id": 1134,
                    "price": 0,
                    "selection_id": 6347,
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
                    "option_id": 1134,
                    "price": 0,
                    "selection_id": 6348,
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
                    "option_id": 1134,
                    "price": 0,
                    "selection_id": 6349,
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
                    "option_id": 1134,
                    "price": 0,
                    "selection_id": 6350,
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
                    "option_id": 1134,
                    "price": 0,
                    "selection_id": 6352,
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
                    "option_id": 1134,
                    "price": 3,
                    "selection_id": 6354,
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
                    "option_id": 1134,
                    "price": 7.5,
                    "selection_id": 6351,
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
                    "option_id": 1134,
                    "price": 8.5,
                    "selection_id": 6353,
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
            "sel1Value": 16287,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 328,
            "taxClassId": 2,
            "name": "Mozzarella Burger Box - Medium",
            "id": 424,
            "specialPrice": 37,
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
              "Mozzarella Burger Box - Regular"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/146.png",
            "finalPrice": 37,
            "virtualGroup": 0,
            "inSide": 0
          },
          {
            "sdmId": 147,
            "description": "",
            "position": 3,
            "sku": 147,
            "title": "Mozzarella Burger Box - Large",
            "bundleProductOptions": [
              {
                "subtitle": "Mozzarella Burger Box",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Mozzarella Burger Box",
                "productLinks": [
                  {
                    "id": 295,
                    "sdmId": 911524,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/911524.png",
                    "default": 1,
                    "sku": 911524,
                    "option_id": 1122,
                    "price": 0,
                    "selection_id": 6237,
                    "title": "Mozzarella Burger Box",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Mozzarella Burger Box"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Mozzarella Burger Box"
              },
              {
                "subtitle": "Select your favorite flavor",
                "position": 2,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite flavor",
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
                    "option_id": 1123,
                    "price": 0,
                    "selection_id": 6238,
                    "title": "Chicken Pc - Original",
                    "modGroupId": -1,
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
                    "option_id": 1123,
                    "price": 0,
                    "selection_id": 6239,
                    "title": "Chicken Pc - Spicy",
                    "modGroupId": -1,
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
                "name": "Select your favorite flavor"
              },
              {
                "subtitle": "Select Your favorite Sandwich",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your favorite Sandwich",
                "productLinks": [
                  {
                    "id": 296,
                    "sdmId": 110035,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110035.png",
                    "default": 1,
                    "sku": 110035,
                    "option_id": 1124,
                    "price": 0,
                    "selection_id": 6240,
                    "title": "Mozzarella Burger Sandwich Zinger",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 1,
                    "name": "Mozzarella Burger Sandwich Zinger"
                  },
                  {
                    "id": 297,
                    "sdmId": 110036,
                    "subOptions": [
                      
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/110036.png",
                    "default": 0,
                    "sku": 110036,
                    "option_id": 1124,
                    "price": 0,
                    "selection_id": 6241,
                    "title": "Mozzarella Burger Sandwich Fillet",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 0,
                    "name": "Mozzarella Burger Sandwich Fillet"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Select Your favorite Sandwich"
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
                    "id": 366,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "id": 364,
                        "sdmId": 810001,
                        "sku": 810001,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10028,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 366,
                        "selection_id": 6242,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 365,
                        "sdmId": 810001,
                        "sku": 810001,
                        "title": "Extra",
                        "price": 2,
                        "modGroupId": 10028,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 366,
                        "selection_id": 6243,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1125,
                    "price": 0,
                    "selection_id": 0,
                    "title": "American Cheese",
                    "modGroupId": 10028,
                    "selectionQty": 0,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "American Cheese"
                  },
                  {
                    "id": 369,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "id": 367,
                        "sdmId": 811701,
                        "sku": 811701,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 369,
                        "selection_id": 6244,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 368,
                        "sdmId": 811701,
                        "sku": 811701,
                        "title": "Extra",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 369,
                        "selection_id": 6245,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1125,
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
                        "id": 370,
                        "sdmId": 811703,
                        "sku": 811703,
                        "title": "Regular",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 1,
                        "option_id": 372,
                        "selection_id": 6246,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "id": 371,
                        "sdmId": 811703,
                        "sku": 811703,
                        "title": "Extra",
                        "price": 0,
                        "modGroupId": 10027,
                        "product_id": 0,
                        "is_sdm_default": 0,
                        "option_id": 372,
                        "selection_id": 6247,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1125,
                    "price": 0,
                    "selection_id": 0,
                    "title": "Tomato",
                    "modGroupId": 10027,
                    "selectionQty": 0,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Tomato"
                  }
                ],
                "isModifier": 1,
                "compId": 3,
                "maximumQty": 0,
                "name": "Add Some Cheese"
              },
              {
                "subtitle": "Select your favorite side item",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite side item",
                "productLinks": [
                  {
                    "id": 257,
                    "sdmId": 510001,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "default": 0,
                    "sku": 510001,
                    "option_id": 1126,
                    "price": 0,
                    "selection_id": 6249,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Coleslaw Salad Small"
                  },
                  {
                    "id": 269,
                    "sdmId": 510006,
                    "subOptions": [
                      
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/510006.png",
                    "default": 1,
                    "sku": 510006,
                    "option_id": 1126,
                    "price": 0,
                    "selection_id": 6279,
                    "title": "Large Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Large Fries"
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
                    "option_id": 1126,
                    "price": 0,
                    "selection_id": 6280,
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
                    "option_id": 1126,
                    "price": 0,
                    "selection_id": 6281,
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
                    "option_id": 1126,
                    "price": 3,
                    "selection_id": 6250,
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
                    "option_id": 1126,
                    "price": 3,
                    "selection_id": 6255,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce"
                  },
                  {
                    "id": 241,
                    "sdmId": 510085,
                    "subOptions": [
                      
                    ],
                    "position": 7,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "default": 0,
                    "sku": 510085,
                    "option_id": 1126,
                    "price": 5,
                    "selection_id": 6248,
                    "title": "Supreme Loaded Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Supreme Loaded Fries"
                  },
                  {
                    "id": 290,
                    "sdmId": 510075,
                    "subOptions": [
                      
                    ],
                    "position": 8,
                    "imageThumbnail": "/imagestemp/510075.png",
                    "default": 0,
                    "sku": 510075,
                    "option_id": 1126,
                    "price": 5,
                    "selection_id": 6254,
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
                "compId": 4,
                "maximumQty": 0,
                "name": "Select your favorite side item"
              },
              {
                "subtitle": "Select your favorite side item",
                "position": 6,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite side item",
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
                    "option_id": 1127,
                    "price": 0,
                    "selection_id": 6256,
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
                    "option_id": 1127,
                    "price": 2,
                    "selection_id": 6258,
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
                    "option_id": 1127,
                    "price": 3,
                    "selection_id": 6259,
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
                    "option_id": 1127,
                    "price": 3,
                    "selection_id": 6260,
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
                    "option_id": 1127,
                    "price": 5,
                    "selection_id": 6257,
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
                    "option_id": 1127,
                    "price": 7,
                    "selection_id": 6261,
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
                "name": "Select your favorite side item"
              },
              {
                "subtitle": "Select your favorite beverage",
                "position": 7,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite beverage",
                "productLinks": [
                  {
                    "id": 292,
                    "sdmId": 610011,
                    "subOptions": [
                      
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "default": 0,
                    "sku": 610011,
                    "option_id": 1128,
                    "price": 0,
                    "selection_id": 6269,
                    "title": "Small Aquafina",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 1,
                    "name": "Small Aquafina"
                  },
                  {
                    "id": 244,
                    "sdmId": 600004,
                    "subOptions": [
                      
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600004.png",
                    "default": 0,
                    "sku": 600004,
                    "option_id": 1128,
                    "price": 0,
                    "selection_id": 6282,
                    "title": "Pepsi Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Pepsi Large"
                  },
                  {
                    "id": 247,
                    "sdmId": 600007,
                    "subOptions": [
                      
                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600007.png",
                    "default": 0,
                    "sku": 600007,
                    "option_id": 1128,
                    "price": 0,
                    "selection_id": 6283,
                    "title": "Diet Pepsi Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Large"
                  },
                  {
                    "id": 248,
                    "sdmId": 600017,
                    "subOptions": [
                      
                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600017.png",
                    "default": 0,
                    "sku": 600017,
                    "option_id": 1128,
                    "price": 0,
                    "selection_id": 6284,
                    "title": "7Up Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "7Up Large"
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
                    "option_id": 1128,
                    "price": 0,
                    "selection_id": 6285,
                    "title": "Mountain Dew Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Mountain Dew Large"
                  },
                  {
                    "id": 256,
                    "sdmId": 600010,
                    "subOptions": [
                      
                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/600010.png",
                    "default": 0,
                    "sku": 600010,
                    "option_id": 1128,
                    "price": 0,
                    "selection_id": 6286,
                    "title": "Mirinda Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      
                    ],
                    "selected": 0,
                    "name": "Mirinda Large"
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
                    "option_id": 1128,
                    "price": 3,
                    "selection_id": 6270,
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
                    "option_id": 1128,
                    "price": 7.5,
                    "selection_id": 6263,
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
                    "option_id": 1128,
                    "price": 8.5,
                    "selection_id": 6262,
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
                "name": "Select your favorite beverage"
              }
            ],
            "image": "/d/u/dummy-product.png",
            "imageSmall": "/d/u/dummy-product.png",
            "sel1Value": 16286,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 328,
            "taxClassId": 2,
            "name": "Mozzarella Burger Box - Large",
            "id": 425,
            "specialPrice": 38.5,
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
              "Mozzarella Burger Box - Regular"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/147.png",
            "finalPrice": 38.5,
            "virtualGroup": 0,
            "inSide": 0
          }
        ],
        "baseFinalPrice": 34,
        "catId": 4,
        "visibility": 4,
        "promoId": 328,
        "taxClassId": 2,
        "name": "Mozzarella Burger Box",
        "baseSpecialPrice": 0,
        "id": 40,
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
        "sellingPrice": 34,
        "originalTypeId": "bundle_group",
        "associative": 0,
        "menuId": 1,
        "metaKeyword": [
          "Mozzarella Burger Box - Regular"
        ],
        "typeId": "bundle_group",
        "selectedItem": 145,
        "imageThumbnail": "/imagestemp/145.png",
        "virtualGroup": 0,
        "finalPrice": 34,
        "inSide": 0
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
                    let plDefaultSdm = false
                    if (pl.selected == 1) {
                      if (pl.subOptions && pl.subOptions.length > 0) {
                        pl.subOptions.forEach(dsplso => {
                          if (dsplso.is_sdm_default == 1)
                            plDefaultSdm = true
                        })
                        let checkSendNone = false
                        pl.subOptions.forEach(so => {
                          if (so.selected == 1) {
                            checkSendNone = true
                            if (so.title == "None") { }
                            else if (so.title == "Regular") {
                              if (so.sdmId) {
                                if (so.is_sdm_default != undefined) {
                                  if (!plDefaultSdm)
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
                                  if (plDefaultSdm)
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
                        if (plDefaultSdm && !checkSendNone) {
                          obj.Entries.CEntry.push({
                            ID: 0,
                            ItemID: pl.subOptions[0].sdmId,
                            ModCode: "NONE",
                            ModgroupID: pl.subOptions[0].modGroupId ? pl.subOptions[0].modGroupId : -1,
                            Name: pl.name,
                            OrdrMode: "OM_SAVED",
                            Weight: 0,
                          })
                        }
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
                                          let plDefaultSdm = false
                                          if (dspl.subOptions && dspl.subOptions.length > 0) {
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.is_sdm_default == 1)
                                                plDefaultSdm = true
                                            })
                                            console.log("plDefaultSdm", plDefaultSdm)
                                            let checkSendNone = false
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.sdmId && dsplso.selected == 1) {
                                                checkSendNone = true
                                                if (dsplso.title == "None") {
                                                }
                                                else if (dsplso.title == "Regular") {
                                                  if (dsplso.sdmId) {
                                                    if (dsplso.is_sdm_default != undefined) {
                                                      if (!plDefaultSdm)
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
                                                      if (plDefaultSdm)
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
                                            if (plDefaultSdm && !checkSendNone) {
                                              obj.Entries.CEntry.push({
                                                ID: 0,
                                                ItemID: dspl.subOptions[0].sdmId,
                                                ModCode: "NONE",
                                                ModgroupID: dspl.subOptions[0].modGroupId ? dspl.subOptions[0].modGroupId : -1,
                                                Name: dspl.name,
                                                OrdrMode: "OM_SAVED",
                                                Weight: 0,
                                              })
                                            }
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
                              let plDefaultSdm = false
                              if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                bpopl.subOptions.forEach(dsplso => {
                                  if (dsplso.is_sdm_default == 1)
                                    plDefaultSdm = true
                                })
                                let checkSendNone = false
                                bpopl.subOptions.forEach(bpoplso => {
                                  if (bpoplso.sdmId && bpoplso.selected == 1) {
                                    checkSendNone = true
                                    if (bpoplso.title == "None") { }
                                    else if (bpoplso.title == "Regular") {
                                      if (bpoplso.sdmId) {
                                        if (bpoplso.is_sdm_default != undefined) {
                                          if (!plDefaultSdm)
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
                                          if (plDefaultSdm)
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
                                if (plDefaultSdm && !checkSendNone) {
                                  lastProductAddedInCentry.Entries.CEntry.push({
                                    ID: 0,
                                    ItemID: bpopl.subOptions[0].sdmId,
                                    ModCode: "NONE",
                                    ModgroupID: bpopl.subOptions[0].modGroupId ? bpopl.subOptions[0].modGroupId : -1,
                                    Name: bpopl.name,
                                    OrdrMode: "OM_SAVED",
                                    Weight: 0,
                                  })
                                }
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
      "licenseCode": "PizzaHutApp",
      "language": "en",
      "conceptID": 3,
      "order": {
        "AddressID": 13359185,
        "ConceptID": 3,
        "CountryID": 1,
        "CustomerID": 8587479,
        "DeliveryChargeID": 279,
        "DistrictID": -1,
        "Entries": Entries,
        "OrderID": 0,
        "OrderMode": 1,
        "OrderType": 0,
        "ProvinceID": 7,
        "ServiceCharge": 0,
        "StoreID": 97,
        "StreetID": 315
      },
      "autoApprove": true,
      "useBackupStoreIfAvailable": true,
      "orderNotes1": "Test Orders - Appinventiv 674",
      "orderNotes2": "Test Orders - Appinventiv 5e7cab3b85b358e76e3071fc",
      "creditCardPaymentbool": false,
      "isSuspended": false,
      "menuTemplateID": 17
    }
    let orderPlaced = await SDM.OrderSDME.createOrder(order)
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 48714070, language: "En" })
    // await SDM.OrderSDME.cancelOrder({
    //   language: "en",
    //   sdmOrderRef: 48698051,
    //   voidReason: 1,
    //   validationRemarks: "TEST ORDER",// Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED
    // })
  } catch (error) {
    console.error(error)
  }
})()