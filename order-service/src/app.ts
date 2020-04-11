if (process.env.NODE_ENV == 'staging')
  require('newrelic');
process.env.ALLOW_CONFIG_MUTATIONS = "true";
global.healthcheck = {}
global.configSync = {
  general: 0,
  kafka: 0,
  orderStatus: 0,
  payment: 0,
  shipment: 0,
  countrySpecific: 0,
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
        "items": [
          {
            "metaKeyword": [
              "Mozzarella Burger Box - Regular"
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
                    "name": "Regular",
                    "title": "Regular",
                    "id": 16285
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 3,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ],
                "title": "Choice of Size",
                "selIndex": 1
              }
            ],
            "position": 1,
            "promoId": 328,
            "name": "Mozzarella Burger Box - Regular",
            "imageSmall": "no_selection",
            "selectedItem": 0,
            "specialPrice": 34,
            "bundleProductOptions": [
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 827,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Box",
                    "selection_id": 3919,
                    "imageThumbnail": "/imagestemp/911524.png",
                    "sdmId": 911524,
                    "title": "Mozzarella Burger Box",
                    "id": 93,
                    "sku": 911524,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  }
                ],
                "name": "Mozzarella Burger Box - Regular",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Mozzarella Burger Box - Regular",
                "type": "radio",
                "title": "Mozzarella Burger Box - Regular",
                "ingredient": 0,
                "compId": 1
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 828,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Chicken Pc - Original",
                    "selection_id": 3920,
                    "imageThumbnail": "/imagestemp/910001.png",
                    "sdmId": 910001,
                    "title": "Chicken Pc - Original",
                    "id": 86,
                    "sku": 910001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 828,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Chicken Pc - Spicy",
                    "selection_id": 3921,
                    "imageThumbnail": "/imagestemp/910002.png",
                    "sdmId": 910002,
                    "title": "Chicken Pc - Spicy",
                    "id": 87,
                    "sku": 910002,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite flavor",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite flavor",
                "type": "radio",
                "title": "Select your favorite flavor",
                "ingredient": 0,
                "compId": 2
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 829,
                    "dependentSteps": [
                      4
                    ],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Sandwich Zinger",
                    "selection_id": 3922,
                    "imageThumbnail": "/imagestemp/110035.png",
                    "sdmId": 110035,
                    "title": "Mozzarella Burger Sandwich Zinger",
                    "id": 27,
                    "sku": 110035,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 829,
                    "dependentSteps": [
                      4
                    ],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Sandwich Fillet",
                    "selection_id": 3923,
                    "imageThumbnail": "/imagestemp/110036.png",
                    "sdmId": 110036,
                    "title": "Mozzarella Burger Sandwich Fillet",
                    "id": 28,
                    "sku": 110036,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select Your favorite Sandwich",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select Your favorite Sandwich",
                "type": "radio",
                "title": "Select Your favorite Sandwich",
                "ingredient": 0,
                "compId": 3
              },
              {
                "isModifier": 1,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 0,
                    "option_id": 830,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 0,
                    "name": "American Cheese",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "sdmId": 810001,
                    "title": "American Cheese",
                    "id": 10,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "option_id": 10,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3924,
                        "sdmId": 810001,
                        "title": "Regular",
                        "id": 8,
                        "sku": 810001,
                        "modGroupId": 10028,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 10,
                        "price": 2,
                        "product_id": 0,
                        "selection_id": 3925,
                        "sdmId": 810001,
                        "title": "Extra",
                        "id": 9,
                        "sku": 810001,
                        "modGroupId": 10028,
                        "is_sdm_default": 0,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10028,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 830,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 0,
                    "name": "Lettuce",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "sdmId": 811701,
                    "title": "Lettuce",
                    "id": 13,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "option_id": 13,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3926,
                        "sdmId": 811701,
                        "title": "Regular",
                        "id": 11,
                        "sku": 811701,
                        "modGroupId": 10027,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 13,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3927,
                        "sdmId": 811701,
                        "title": "Extra",
                        "id": 12,
                        "sku": 811701,
                        "modGroupId": 10027,
                        "is_sdm_default": 0,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10027,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 830,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 0,
                    "name": "Tomato",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "sdmId": 811703,
                    "title": "Tomato",
                    "id": 16,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "option_id": 16,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3928,
                        "sdmId": 811703,
                        "title": "Regular",
                        "id": 14,
                        "sku": 811703,
                        "modGroupId": 10027,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 16,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3929,
                        "sdmId": 811703,
                        "title": "Extra",
                        "id": 15,
                        "sku": 811703,
                        "modGroupId": 10027,
                        "is_sdm_default": 0,
                        "selected": 0,
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
                "compId": 3
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 5,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 831,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Regular Fries",
                    "selection_id": 3930,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "sdmId": 510004,
                    "title": "Regular Fries",
                    "id": 65,
                    "sku": 510004,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 831,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 3932,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 49,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 831,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Regular Fries Spicy",
                    "selection_id": 3931,
                    "imageThumbnail": "/imagestemp/510012.png",
                    "sdmId": 510012,
                    "title": "Regular Fries Spicy",
                    "id": 72,
                    "sku": 510012,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 831,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Potato Dipper- Regular",
                    "selection_id": 3934,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "sdmId": 510071,
                    "title": "Potato Dipper- Regular",
                    "id": 76,
                    "sku": 510071,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 831,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 3933,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 62,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 831,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id": 3935,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "sdmId": 510079,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "id": 80,
                    "sku": 510079,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 831,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Supreme Loaded Fries",
                    "selection_id": 3936,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "sdmId": 510085,
                    "title": "Supreme Loaded Fries",
                    "id": 6,
                    "sku": 510085,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite side item",
                "type": "radio",
                "title": "Select your favorite side item",
                "ingredient": 0,
                "compId": 4
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 6,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 832,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 3937,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 49,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 832,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Regular Fries",
                    "selection_id": 3938,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "sdmId": 510004,
                    "title": "Regular Fries",
                    "id": 65,
                    "sku": 510004,
                    "subOptions": [],
                    "price": 2,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 832,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Regular Fries Spicy",
                    "selection_id": 3939,
                    "imageThumbnail": "/imagestemp/510012.png",
                    "sdmId": 510012,
                    "title": "Regular Fries Spicy",
                    "id": 72,
                    "sku": 510012,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 832,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Potato Dipper- Regular",
                    "selection_id": 3941,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "sdmId": 510071,
                    "title": "Potato Dipper- Regular",
                    "id": 76,
                    "sku": 510071,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 832,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 3940,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 62,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite side item",
                "type": "radio",
                "title": "Select your favorite side item",
                "ingredient": 0,
                "compId": 5
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 7,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Pepsi Regular",
                    "selection_id": 3942,
                    "imageThumbnail": "/imagestemp/600002.png",
                    "sdmId": 600002,
                    "title": "Pepsi Regular",
                    "id": 29,
                    "sku": 600002,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mirinda Regular",
                    "selection_id": 3943,
                    "imageThumbnail": "/imagestemp/600008.png",
                    "sdmId": 600008,
                    "title": "Mirinda Regular",
                    "id": 45,
                    "sku": 600008,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "7Up Regular",
                    "selection_id": 3944,
                    "imageThumbnail": "/imagestemp/600015.png",
                    "sdmId": 600015,
                    "title": "7Up Regular",
                    "id": 38,
                    "sku": 600015,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Diet Pepsi Regular",
                    "selection_id": 3945,
                    "imageThumbnail": "/imagestemp/600005.png",
                    "sdmId": 600005,
                    "title": "Diet Pepsi Regular",
                    "id": 34,
                    "sku": 600005,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Mountain Dew Regular",
                    "selection_id": 3946,
                    "imageThumbnail": "/imagestemp/600012.png",
                    "sdmId": 600012,
                    "title": "Mountain Dew Regular",
                    "id": 41,
                    "sku": 600012,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Small Aquafina",
                    "selection_id": 3948,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "sdmId": 610011,
                    "title": "Small Aquafina",
                    "id": 81,
                    "sku": 610011,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Mojito Krusher",
                    "selection_id": 3947,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "sdmId": 610021,
                    "title": "Mojito Krusher",
                    "id": 2,
                    "sku": 610021,
                    "subOptions": [],
                    "price": 7.5,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 833,
                    "dependentSteps": [],
                    "position": 8,
                    "selectionQty": 1,
                    "name": "Fresh Orange Juice",
                    "selection_id": 3949,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "sdmId": 610020,
                    "title": "Fresh Orange Juice",
                    "id": 1,
                    "sku": 610020,
                    "subOptions": [],
                    "price": 8.5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite beverage",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite beverage",
                "type": "radio",
                "title": "Select your favorite beverage",
                "ingredient": 0,
                "compId": 6
              }
            ],
            "visibility": 4,
            "finalPrice": 34,
            "virtualGroup": 0,
            "typeId": "bundle",
            "sdmId": 145,
            "sel3Value": -1,
            "sel2Value": -1,
            "sel1Value": 16285,
            "image": "no_selection",
            "description": "Mozzarella Burger Sandwich + 1pc Chicken + Fries + Coleslaw + Drink",
            "sku": 900145,
            "title": "Mozzarella Burger Box - Regular",
            "taxClassId": 2,
            "id": 94,
            "associative": 0,
            "imageThumbnail": "/imagestemp/900145.png",
            "inSide": 1
          },
          {
            "metaKeyword": [
              "Mozzarella Burger Box - Medium"
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
                    "name": "Regular",
                    "title": "Regular",
                    "id": 16285
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 3,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ],
                "title": "Choice of Size",
                "selIndex": 1
              }
            ],
            "position": 1,
            "promoId": 328,
            "name": "Mozzarella Burger Box - Medium",
            "imageSmall": "no_selection",
            "selectedItem": 0,
            "specialPrice": 37,
            "bundleProductOptions": [
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 813,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Box",
                    "selection_id": 3857,
                    "imageThumbnail": "/imagestemp/911524.png",
                    "sdmId": 911524,
                    "title": "Mozzarella Burger Box",
                    "id": 93,
                    "sku": 911524,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  }
                ],
                "name": "Mozzarella Burger Box - Medium",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Mozzarella Burger Box - Medium",
                "type": "radio",
                "title": "Mozzarella Burger Box - Medium",
                "ingredient": 0,
                "compId": 1
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 814,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Chicken Pc - Original",
                    "selection_id": 3858,
                    "imageThumbnail": "/imagestemp/910001.png",
                    "sdmId": 910001,
                    "title": "Chicken Pc - Original",
                    "id": 86,
                    "sku": 910001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 814,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Chicken Pc - Spicy",
                    "selection_id": 3859,
                    "imageThumbnail": "/imagestemp/910002.png",
                    "sdmId": 910002,
                    "title": "Chicken Pc - Spicy",
                    "id": 87,
                    "sku": 910002,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite flavor",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite flavor",
                "type": "radio",
                "title": "Select your favorite flavor",
                "ingredient": 0,
                "compId": 2
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 815,
                    "dependentSteps": [
                      4
                    ],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Sandwich Zinger",
                    "selection_id": 3860,
                    "imageThumbnail": "/imagestemp/110035.png",
                    "sdmId": 110035,
                    "title": "Mozzarella Burger Sandwich Zinger",
                    "id": 27,
                    "sku": 110035,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 815,
                    "dependentSteps": [
                      4
                    ],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Sandwich Fillet",
                    "selection_id": 3861,
                    "imageThumbnail": "/imagestemp/110036.png",
                    "sdmId": 110036,
                    "title": "Mozzarella Burger Sandwich Fillet",
                    "id": 28,
                    "sku": 110036,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select Your favorite Sandwich",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select Your favorite Sandwich",
                "type": "radio",
                "title": "Select Your favorite Sandwich",
                "ingredient": 0,
                "compId": 3
              },
              {
                "isModifier": 1,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 0,
                    "option_id": 816,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 0,
                    "name": "American Cheese",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "sdmId": 810001,
                    "title": "American Cheese",
                    "id": 10,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "option_id": 10,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3862,
                        "sdmId": 810001,
                        "title": "Regular",
                        "id": 8,
                        "sku": 810001,
                        "modGroupId": 10028,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 10,
                        "price": 2,
                        "product_id": 0,
                        "selection_id": 3863,
                        "sdmId": 810001,
                        "title": "Extra",
                        "id": 9,
                        "sku": 810001,
                        "modGroupId": 10028,
                        "is_sdm_default": 0,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10028,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 816,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 0,
                    "name": "Lettuce",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "sdmId": 811701,
                    "title": "Lettuce",
                    "id": 13,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "option_id": 13,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3864,
                        "sdmId": 811701,
                        "title": "Regular",
                        "id": 11,
                        "sku": 811701,
                        "modGroupId": 10027,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 13,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3865,
                        "sdmId": 811701,
                        "title": "Extra",
                        "id": 12,
                        "sku": 811701,
                        "modGroupId": 10027,
                        "is_sdm_default": 0,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10027,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 816,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 0,
                    "name": "Tomato",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "sdmId": 811703,
                    "title": "Tomato",
                    "id": 16,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "option_id": 16,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3866,
                        "sdmId": 811703,
                        "title": "Regular",
                        "id": 14,
                        "sku": 811703,
                        "modGroupId": 10027,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 16,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3867,
                        "sdmId": 811703,
                        "title": "Extra",
                        "id": 15,
                        "sku": 811703,
                        "modGroupId": 10027,
                        "is_sdm_default": 0,
                        "selected": 0,
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
                "compId": 3
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 5,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 817,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Medium Fries",
                    "selection_id": 3868,
                    "imageThumbnail": "/imagestemp/510050.png",
                    "sdmId": 510050,
                    "title": "Medium Fries",
                    "id": 68,
                    "sku": 510050,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 817,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 3870,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 49,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 817,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Medium Fries Spicy",
                    "selection_id": 3869,
                    "imageThumbnail": "/imagestemp/510051.png",
                    "sdmId": 510051,
                    "title": "Medium Fries Spicy",
                    "id": 73,
                    "sku": 510051,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 817,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Medium Dipper Fries",
                    "selection_id": 3872,
                    "imageThumbnail": "/imagestemp/510072.png",
                    "sdmId": 510072,
                    "title": "Medium Dipper Fries",
                    "id": 77,
                    "sku": 510072,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 817,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 3871,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 62,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 817,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id": 3873,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "sdmId": 510079,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "id": 80,
                    "sku": 510079,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 817,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Supreme Loaded Fries",
                    "selection_id": 3874,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "sdmId": 510085,
                    "title": "Supreme Loaded Fries",
                    "id": 6,
                    "sku": 510085,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite side item",
                "type": "radio",
                "title": "Select your favorite side item",
                "ingredient": 0,
                "compId": 4
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 6,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 818,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 3875,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 49,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 818,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Regular Fries",
                    "selection_id": 3876,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "sdmId": 510004,
                    "title": "Regular Fries",
                    "id": 65,
                    "sku": 510004,
                    "subOptions": [],
                    "price": 2,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 818,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Regular Fries Spicy",
                    "selection_id": 3877,
                    "imageThumbnail": "/imagestemp/510012.png",
                    "sdmId": 510012,
                    "title": "Regular Fries Spicy",
                    "id": 72,
                    "sku": 510012,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 818,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Potato Dipper- Regular",
                    "selection_id": 3879,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "sdmId": 510071,
                    "title": "Potato Dipper- Regular",
                    "id": 76,
                    "sku": 510071,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 818,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 3878,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 62,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite side item",
                "type": "radio",
                "title": "Select your favorite side item",
                "ingredient": 0,
                "compId": 5
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 7,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Pepsi Medium",
                    "selection_id": 3880,
                    "imageThumbnail": "/imagestemp/600003.png",
                    "sdmId": 600003,
                    "title": "Pepsi Medium",
                    "id": 30,
                    "sku": 600003,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mirinda Medium",
                    "selection_id": 3881,
                    "imageThumbnail": "/imagestemp/600009.png",
                    "sdmId": 600009,
                    "title": "Mirinda Medium",
                    "id": 46,
                    "sku": 600009,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "7Up Medium",
                    "selection_id": 3882,
                    "imageThumbnail": "/imagestemp/600016.png",
                    "sdmId": 600016,
                    "title": "7Up Medium",
                    "id": 39,
                    "sku": 600016,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Diet Pepsi Medium",
                    "selection_id": 3883,
                    "imageThumbnail": "/imagestemp/600006.png",
                    "sdmId": 600006,
                    "title": "Diet Pepsi Medium",
                    "id": 33,
                    "sku": 600006,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Mountain Dew Medium",
                    "selection_id": 3884,
                    "imageThumbnail": "/imagestemp/600013.png",
                    "sdmId": 600013,
                    "title": "Mountain Dew Medium",
                    "id": 42,
                    "sku": 600013,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Small Aquafina",
                    "selection_id": 3886,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "sdmId": 610011,
                    "title": "Small Aquafina",
                    "id": 81,
                    "sku": 610011,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Mojito Krusher",
                    "selection_id": 3885,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "sdmId": 610021,
                    "title": "Mojito Krusher",
                    "id": 2,
                    "sku": 610021,
                    "subOptions": [],
                    "price": 7.5,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 819,
                    "dependentSteps": [],
                    "position": 8,
                    "selectionQty": 1,
                    "name": "Fresh Orange Juice",
                    "selection_id": 3887,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "sdmId": 610020,
                    "title": "Fresh Orange Juice",
                    "id": 1,
                    "sku": 610020,
                    "subOptions": [],
                    "price": 8.5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite beverage",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite beverage",
                "type": "radio",
                "title": "Select your favorite beverage",
                "ingredient": 0,
                "compId": 6
              }
            ],
            "visibility": 4,
            "finalPrice": 37,
            "virtualGroup": 0,
            "typeId": "bundle",
            "sdmId": 146,
            "sel3Value": -1,
            "sel2Value": -1,
            "sel1Value": 16287,
            "image": "no_selection",
            "description": "Mozzarella Burger Sandwich + 1pc Chicken + Fries + Coleslaw + Drink",
            "sku": 900146,
            "title": "Mozzarella Burger Box - Medium",
            "taxClassId": 2,
            "id": 95,
            "associative": 0,
            "imageThumbnail": "/imagestemp/900146.png",
            "inSide": 1
          },
          {
            "metaKeyword": [
              "Mozzarella Burger Box - Large"
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
                    "name": "Regular",
                    "title": "Regular",
                    "id": 16285
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 3,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ],
                "title": "Choice of Size",
                "selIndex": 1
              }
            ],
            "position": 1,
            "promoId": 328,
            "name": "Mozzarella Burger Box - Large",
            "imageSmall": "no_selection",
            "selectedItem": 0,
            "specialPrice": 38.5,
            "bundleProductOptions": [
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 820,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Box",
                    "selection_id": 3888,
                    "imageThumbnail": "/imagestemp/911524.png",
                    "sdmId": 911524,
                    "title": "Mozzarella Burger Box",
                    "id": 93,
                    "sku": 911524,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  }
                ],
                "name": "Mozzarella Burger Box - Large",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Mozzarella Burger Box - Large",
                "type": "radio",
                "title": "Mozzarella Burger Box - Large",
                "ingredient": 0,
                "compId": 1
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 821,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Chicken Pc - Original",
                    "selection_id": 3889,
                    "imageThumbnail": "/imagestemp/910001.png",
                    "sdmId": 910001,
                    "title": "Chicken Pc - Original",
                    "id": 86,
                    "sku": 910001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 821,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Chicken Pc - Spicy",
                    "selection_id": 3890,
                    "imageThumbnail": "/imagestemp/910002.png",
                    "sdmId": 910002,
                    "title": "Chicken Pc - Spicy",
                    "id": 87,
                    "sku": 910002,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite flavor",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite flavor",
                "type": "radio",
                "title": "Select your favorite flavor",
                "ingredient": 0,
                "compId": 2
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 822,
                    "dependentSteps": [
                      4
                    ],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Sandwich Zinger",
                    "selection_id": 3891,
                    "imageThumbnail": "/imagestemp/110035.png",
                    "sdmId": 110035,
                    "title": "Mozzarella Burger Sandwich Zinger",
                    "id": 27,
                    "sku": 110035,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 822,
                    "dependentSteps": [
                      4
                    ],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mozzarella Burger Sandwich Fillet",
                    "selection_id": 3892,
                    "imageThumbnail": "/imagestemp/110036.png",
                    "sdmId": 110036,
                    "title": "Mozzarella Burger Sandwich Fillet",
                    "id": 28,
                    "sku": 110036,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select Your favorite Sandwich",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select Your favorite Sandwich",
                "type": "radio",
                "title": "Select Your favorite Sandwich",
                "ingredient": 0,
                "compId": 3
              },
              {
                "isModifier": 1,
                "minimumQty": 0,
                "position": 4,
                "productLinks": [
                  {
                    "default": 0,
                    "option_id": 823,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 0,
                    "name": "American Cheese",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "sdmId": 810001,
                    "title": "American Cheese",
                    "id": 10,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "option_id": 10,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3893,
                        "sdmId": 810001,
                        "title": "Regular",
                        "id": 8,
                        "sku": 810001,
                        "modGroupId": 10028,
                        "is_sdm_default": 1,
                        "selected": 0,
                        "name": "Regular"
                      },
                      {
                        "option_id": 10,
                        "price": 2,
                        "product_id": 0,
                        "selection_id": 3894,
                        "sdmId": 810001,
                        "title": "Extra",
                        "id": 9,
                        "sku": 810001,
                        "modGroupId": 10028,
                        "is_sdm_default": 0,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10028,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 823,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 0,
                    "name": "Lettuce",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "sdmId": 811701,
                    "title": "Lettuce",
                    "id": 13,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "option_id": 13,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3895,
                        "sdmId": 811701,
                        "title": "Regular",
                        "id": 11,
                        "sku": 811701,
                        "modGroupId": 10027,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 13,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3896,
                        "sdmId": 811701,
                        "title": "Extra",
                        "id": 12,
                        "sku": 811701,
                        "modGroupId": 10027,
                        "is_sdm_default": 0,
                        "selected": 0,
                        "name": "Extra"
                      }
                    ],
                    "price": 0,
                    "modGroupId": 10027,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 823,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 0,
                    "name": "Tomato",
                    "selection_id": 0,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "sdmId": 811703,
                    "title": "Tomato",
                    "id": 16,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "option_id": 16,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3897,
                        "sdmId": 811703,
                        "title": "Regular",
                        "id": 14,
                        "sku": 811703,
                        "modGroupId": 10027,
                        "is_sdm_default": 1,
                        "selected": 1,
                        "name": "Regular"
                      },
                      {
                        "option_id": 16,
                        "price": 0,
                        "product_id": 0,
                        "selection_id": 3898,
                        "sdmId": 811703,
                        "title": "Extra",
                        "id": 15,
                        "sku": 811703,
                        "modGroupId": 10027,
                        "is_sdm_default": 0,
                        "selected": 0,
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
                "compId": 3
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 5,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 824,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Large Fries",
                    "selection_id": 3899,
                    "imageThumbnail": "/imagestemp/510006.png",
                    "sdmId": 510006,
                    "title": "Large Fries",
                    "id": 66,
                    "sku": 510006,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 824,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 3901,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 49,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 824,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Large Fries Spicy",
                    "selection_id": 3900,
                    "imageThumbnail": "/imagestemp/510013.png",
                    "sdmId": 510013,
                    "title": "Large Fries Spicy",
                    "id": 70,
                    "sku": 510013,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 824,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Large Dipper Fries",
                    "selection_id": 3903,
                    "imageThumbnail": "/imagestemp/510073.png",
                    "sdmId": 510073,
                    "title": "Large Dipper Fries",
                    "id": 78,
                    "sku": 510073,
                    "subOptions": [],
                    "price": 1,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 824,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 3902,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 62,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 824,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Regular Loaded Fries Pepper - Chili Sauce",
                    "selection_id": 3904,
                    "imageThumbnail": "/imagestemp/510079.png",
                    "sdmId": 510079,
                    "title": "Regular Loaded Fries Pepper - Chili Sauce",
                    "id": 80,
                    "sku": 510079,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 824,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Supreme Loaded Fries",
                    "selection_id": 3905,
                    "imageThumbnail": "/imagestemp/510085.png",
                    "sdmId": 510085,
                    "title": "Supreme Loaded Fries",
                    "id": 6,
                    "sku": 510085,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite side item",
                "type": "radio",
                "title": "Select your favorite side item",
                "ingredient": 0,
                "compId": 4
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 6,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 825,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Coleslaw Salad Small",
                    "selection_id": 3906,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "sdmId": 510001,
                    "title": "Coleslaw Salad Small",
                    "id": 49,
                    "sku": 510001,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 825,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Regular Fries",
                    "selection_id": 3907,
                    "imageThumbnail": "/imagestemp/510004.png",
                    "sdmId": 510004,
                    "title": "Regular Fries",
                    "id": 65,
                    "sku": 510004,
                    "subOptions": [],
                    "price": 2,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 825,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "Regular Fries Spicy",
                    "selection_id": 3908,
                    "imageThumbnail": "/imagestemp/510012.png",
                    "sdmId": 510012,
                    "title": "Regular Fries Spicy",
                    "id": 72,
                    "sku": 510012,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 825,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Potato Dipper- Regular",
                    "selection_id": 3910,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "sdmId": 510071,
                    "title": "Potato Dipper- Regular",
                    "id": 76,
                    "sku": 510071,
                    "subOptions": [],
                    "price": 3,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 825,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Loaded Fries Regular",
                    "selection_id": 3909,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "sdmId": 510036,
                    "title": "Loaded Fries Regular",
                    "id": 62,
                    "sku": 510036,
                    "subOptions": [],
                    "price": 5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite side item",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite side item",
                "type": "radio",
                "title": "Select your favorite side item",
                "ingredient": 0,
                "compId": 5
              },
              {
                "isModifier": 0,
                "minimumQty": 0,
                "position": 7,
                "productLinks": [
                  {
                    "default": 1,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 1,
                    "selectionQty": 1,
                    "name": "Pepsi Large",
                    "selection_id": 3911,
                    "imageThumbnail": "/imagestemp/600004.png",
                    "sdmId": 600004,
                    "title": "Pepsi Large",
                    "id": 31,
                    "sku": 600004,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 1
                  },
                  {
                    "default": 0,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 2,
                    "selectionQty": 1,
                    "name": "Mirinda Large",
                    "selection_id": 3912,
                    "imageThumbnail": "/imagestemp/600010.png",
                    "sdmId": 600010,
                    "title": "Mirinda Large",
                    "id": 47,
                    "sku": 600010,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 3,
                    "selectionQty": 1,
                    "name": "7Up Large",
                    "selection_id": 3913,
                    "imageThumbnail": "/imagestemp/600017.png",
                    "sdmId": 600017,
                    "title": "7Up Large",
                    "id": 37,
                    "sku": 600017,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 4,
                    "selectionQty": 1,
                    "name": "Diet Pepsi Large",
                    "selection_id": 3914,
                    "imageThumbnail": "/imagestemp/600007.png",
                    "sdmId": 600007,
                    "title": "Diet Pepsi Large",
                    "id": 35,
                    "sku": 600007,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 5,
                    "selectionQty": 1,
                    "name": "Mountain Dew Large",
                    "selection_id": 3915,
                    "imageThumbnail": "/imagestemp/600014.png",
                    "sdmId": 600014,
                    "title": "Mountain Dew Large",
                    "id": 43,
                    "sku": 600014,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 6,
                    "selectionQty": 1,
                    "name": "Small Aquafina",
                    "selection_id": 3917,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "sdmId": 610011,
                    "title": "Small Aquafina",
                    "id": 81,
                    "sku": 610011,
                    "subOptions": [],
                    "price": 0,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 7,
                    "selectionQty": 1,
                    "name": "Mojito Krusher",
                    "selection_id": 3916,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "sdmId": 610021,
                    "title": "Mojito Krusher",
                    "id": 2,
                    "sku": 610021,
                    "subOptions": [],
                    "price": 7.5,
                    "modGroupId": -1,
                    "selected": 0
                  },
                  {
                    "default": 0,
                    "option_id": 826,
                    "dependentSteps": [],
                    "position": 8,
                    "selectionQty": 1,
                    "name": "Fresh Orange Juice",
                    "selection_id": 3918,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "sdmId": 610020,
                    "title": "Fresh Orange Juice",
                    "id": 1,
                    "sku": 610020,
                    "subOptions": [],
                    "price": 8.5,
                    "modGroupId": -1,
                    "selected": 0
                  }
                ],
                "name": "Select your favorite beverage",
                "imageThumbnail": "/imagestemp/0.png",
                "isDependent": 0,
                "maximumQty": 0,
                "subtitle": "Select your favorite beverage",
                "type": "radio",
                "title": "Select your favorite beverage",
                "ingredient": 0,
                "compId": 6
              }
            ],
            "visibility": 4,
            "finalPrice": 38.5,
            "virtualGroup": 0,
            "typeId": "bundle",
            "sdmId": 147,
            "sel3Value": -1,
            "sel2Value": -1,
            "sel1Value": 16286,
            "image": "no_selection",
            "description": "Mozzarella Burger Sandwich + 1pc Chicken + Fries + Coleslaw + Drink",
            "sku": 900147,
            "title": "Mozzarella Burger Box - Large",
            "taxClassId": 2,
            "id": 96,
            "associative": 0,
            "imageThumbnail": "/imagestemp/900147.png",
            "inSide": 1
          }
        ],
        "baseSpecialPrice": 0,
        "baseFinalPrice": 34,
        "originalTypeId": "bundle_group",
        "taxClassId": 2,
        "position": 1,
        "promoId": 328,
        "name": "Mozzarella Burger Box",
        "imageSmall": "no_selection",
        "selectedItem": 900147,
        "specialPrice": 38.5,
        "associative": 0,
        "visibility": 4,
        "finalPrice": 38.5,
        "virtualGroup": 0,
        "typeId": "bundle_group",
        "qty": 1,
        "sdmId": 145,
        "originalPrice": 38.5,
        "sellingPrice": 38.5,
        "menuId": 1,
        "id": 777740,
        "description": "Mozzarella Burger Sandwich + fries + Pepsi + coleslaw + 1 Piece chicken",
        "sku": 900145,
        "bundleProductOptions": [
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 1,
            "productLinks": [
              {
                "default": 1,
                "option_id": 827,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "Mozzarella Burger Box",
                "selection_id": 3919,
                "imageThumbnail": "/imagestemp/911524.png",
                "sdmId": 911524,
                "title": "Mozzarella Burger Box",
                "id": 93,
                "sku": 911524,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              }
            ],
            "name": "Mozzarella Burger Box - Regular",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Mozzarella Burger Box - Regular",
            "type": "radio",
            "title": "Mozzarella Burger Box - Regular",
            "ingredient": 0,
            "compId": 1
          },
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 2,
            "productLinks": [
              {
                "default": 1,
                "option_id": 828,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "Chicken Pc - Original",
                "selection_id": 3920,
                "imageThumbnail": "/imagestemp/910001.png",
                "sdmId": 910001,
                "title": "Chicken Pc - Original",
                "id": 86,
                "sku": 910001,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 828,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Chicken Pc - Spicy",
                "selection_id": 3921,
                "imageThumbnail": "/imagestemp/910002.png",
                "sdmId": 910002,
                "title": "Chicken Pc - Spicy",
                "id": 87,
                "sku": 910002,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Select your favorite flavor",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Select your favorite flavor",
            "type": "radio",
            "title": "Select your favorite flavor",
            "ingredient": 0,
            "compId": 2
          },
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 3,
            "productLinks": [
              {
                "default": 1,
                "option_id": 829,
                "dependentSteps": [
                  4
                ],
                "position": 1,
                "selectionQty": 1,
                "name": "Mozzarella Burger Sandwich Zinger",
                "selection_id": 3922,
                "imageThumbnail": "/imagestemp/110035.png",
                "sdmId": 110035,
                "title": "Mozzarella Burger Sandwich Zinger",
                "id": 27,
                "sku": 110035,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 829,
                "dependentSteps": [
                  4
                ],
                "position": 2,
                "selectionQty": 1,
                "name": "Mozzarella Burger Sandwich Fillet",
                "selection_id": 3923,
                "imageThumbnail": "/imagestemp/110036.png",
                "sdmId": 110036,
                "title": "Mozzarella Burger Sandwich Fillet",
                "id": 28,
                "sku": 110036,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Select Your favorite Sandwich",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Select Your favorite Sandwich",
            "type": "radio",
            "title": "Select Your favorite Sandwich",
            "ingredient": 0,
            "compId": 3
          },
          {
            "isModifier": 1,
            "minimumQty": 0,
            "position": 4,
            "productLinks": [
              {
                "default": 0,
                "option_id": 830,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 0,
                "name": "American Cheese",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/810001.png",
                "sdmId": 810001,
                "title": "American Cheese",
                "id": 10,
                "sku": 810001,
                "subOptions": [
                  {
                    "option_id": 10,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 3924,
                    "sdmId": 810001,
                    "title": "Regular",
                    "id": 8,
                    "sku": 810001,
                    "modGroupId": 10028,
                    "is_sdm_default": 1,
                    "selected": 1,
                    "name": "Regular"
                  },
                  {
                    "option_id": 10,
                    "price": 2,
                    "product_id": 0,
                    "selection_id": 3925,
                    "sdmId": 810001,
                    "title": "Extra",
                    "id": 9,
                    "sku": 810001,
                    "modGroupId": 10028,
                    "is_sdm_default": 0,
                    "selected": 0,
                    "name": "Extra"
                  }
                ],
                "price": 0,
                "modGroupId": 10028,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 830,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 0,
                "name": "Lettuce",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811701.png",
                "sdmId": 811701,
                "title": "Lettuce",
                "id": 13,
                "sku": 811701,
                "subOptions": [
                  {
                    "option_id": 13,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 3926,
                    "sdmId": 811701,
                    "title": "Regular",
                    "id": 11,
                    "sku": 811701,
                    "modGroupId": 10027,
                    "is_sdm_default": 1,
                    "selected": 1,
                    "name": "Regular"
                  },
                  {
                    "option_id": 13,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 3927,
                    "sdmId": 811701,
                    "title": "Extra",
                    "id": 12,
                    "sku": 811701,
                    "modGroupId": 10027,
                    "is_sdm_default": 0,
                    "selected": 0,
                    "name": "Extra"
                  }
                ],
                "price": 0,
                "modGroupId": 10027,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 830,
                "dependentSteps": [],
                "position": 4,
                "selectionQty": 0,
                "name": "Tomato",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811703.png",
                "sdmId": 811703,
                "title": "Tomato",
                "id": 16,
                "sku": 811703,
                "subOptions": [
                  {
                    "option_id": 16,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 3928,
                    "sdmId": 811703,
                    "title": "Regular",
                    "id": 14,
                    "sku": 811703,
                    "modGroupId": 10027,
                    "is_sdm_default": 1,
                    "selected": 1,
                    "name": "Regular"
                  },
                  {
                    "option_id": 16,
                    "price": 0,
                    "product_id": 0,
                    "selection_id": 3929,
                    "sdmId": 811703,
                    "title": "Extra",
                    "id": 15,
                    "sku": 811703,
                    "modGroupId": 10027,
                    "is_sdm_default": 0,
                    "selected": 0,
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
            "compId": 3
          },
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 5,
            "productLinks": [
              {
                "default": 1,
                "option_id": 831,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "Regular Fries",
                "selection_id": 3930,
                "imageThumbnail": "/imagestemp/510004.png",
                "sdmId": 510004,
                "title": "Regular Fries",
                "id": 65,
                "sku": 510004,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 831,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Coleslaw Salad Small",
                "selection_id": 3932,
                "imageThumbnail": "/imagestemp/510001.png",
                "sdmId": 510001,
                "title": "Coleslaw Salad Small",
                "id": 49,
                "sku": 510001,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 831,
                "dependentSteps": [],
                "position": 3,
                "selectionQty": 1,
                "name": "Regular Fries Spicy",
                "selection_id": 3931,
                "imageThumbnail": "/imagestemp/510012.png",
                "sdmId": 510012,
                "title": "Regular Fries Spicy",
                "id": 72,
                "sku": 510012,
                "subOptions": [],
                "price": 1,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 831,
                "dependentSteps": [],
                "position": 4,
                "selectionQty": 1,
                "name": "Potato Dipper- Regular",
                "selection_id": 3934,
                "imageThumbnail": "/imagestemp/510071.png",
                "sdmId": 510071,
                "title": "Potato Dipper- Regular",
                "id": 76,
                "sku": 510071,
                "subOptions": [],
                "price": 1,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 831,
                "dependentSteps": [],
                "position": 5,
                "selectionQty": 1,
                "name": "Loaded Fries Regular",
                "selection_id": 3933,
                "imageThumbnail": "/imagestemp/510036.png",
                "sdmId": 510036,
                "title": "Loaded Fries Regular",
                "id": 62,
                "sku": 510036,
                "subOptions": [],
                "price": 3,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 831,
                "dependentSteps": [],
                "position": 6,
                "selectionQty": 1,
                "name": "Regular Loaded Fries Pepper - Chili Sauce",
                "selection_id": 3935,
                "imageThumbnail": "/imagestemp/510079.png",
                "sdmId": 510079,
                "title": "Regular Loaded Fries Pepper - Chili Sauce",
                "id": 80,
                "sku": 510079,
                "subOptions": [],
                "price": 3,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 831,
                "dependentSteps": [],
                "position": 7,
                "selectionQty": 1,
                "name": "Supreme Loaded Fries",
                "selection_id": 3936,
                "imageThumbnail": "/imagestemp/510085.png",
                "sdmId": 510085,
                "title": "Supreme Loaded Fries",
                "id": 6,
                "sku": 510085,
                "subOptions": [],
                "price": 5,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Select your favorite side item",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Select your favorite side item",
            "type": "radio",
            "title": "Select your favorite side item",
            "ingredient": 0,
            "compId": 4
          },
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 6,
            "productLinks": [
              {
                "default": 1,
                "option_id": 832,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "Coleslaw Salad Small",
                "selection_id": 3937,
                "imageThumbnail": "/imagestemp/510001.png",
                "sdmId": 510001,
                "title": "Coleslaw Salad Small",
                "id": 49,
                "sku": 510001,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 832,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Regular Fries",
                "selection_id": 3938,
                "imageThumbnail": "/imagestemp/510004.png",
                "sdmId": 510004,
                "title": "Regular Fries",
                "id": 65,
                "sku": 510004,
                "subOptions": [],
                "price": 2,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 832,
                "dependentSteps": [],
                "position": 3,
                "selectionQty": 1,
                "name": "Regular Fries Spicy",
                "selection_id": 3939,
                "imageThumbnail": "/imagestemp/510012.png",
                "sdmId": 510012,
                "title": "Regular Fries Spicy",
                "id": 72,
                "sku": 510012,
                "subOptions": [],
                "price": 3,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 832,
                "dependentSteps": [],
                "position": 4,
                "selectionQty": 1,
                "name": "Potato Dipper- Regular",
                "selection_id": 3941,
                "imageThumbnail": "/imagestemp/510071.png",
                "sdmId": 510071,
                "title": "Potato Dipper- Regular",
                "id": 76,
                "sku": 510071,
                "subOptions": [],
                "price": 3,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 832,
                "dependentSteps": [],
                "position": 5,
                "selectionQty": 1,
                "name": "Loaded Fries Regular",
                "selection_id": 3940,
                "imageThumbnail": "/imagestemp/510036.png",
                "sdmId": 510036,
                "title": "Loaded Fries Regular",
                "id": 62,
                "sku": 510036,
                "subOptions": [],
                "price": 5,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Select your favorite side item",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Select your favorite side item",
            "type": "radio",
            "title": "Select your favorite side item",
            "ingredient": 0,
            "compId": 5
          },
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 7,
            "productLinks": [
              {
                "default": 1,
                "option_id": 833,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "Pepsi Regular",
                "selection_id": 3942,
                "imageThumbnail": "/imagestemp/600002.png",
                "sdmId": 600002,
                "title": "Pepsi Regular",
                "id": 29,
                "sku": 600002,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 1
              },
              {
                "default": 0,
                "option_id": 833,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Mirinda Regular",
                "selection_id": 3943,
                "imageThumbnail": "/imagestemp/600008.png",
                "sdmId": 600008,
                "title": "Mirinda Regular",
                "id": 45,
                "sku": 600008,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 833,
                "dependentSteps": [],
                "position": 3,
                "selectionQty": 1,
                "name": "7Up Regular",
                "selection_id": 3944,
                "imageThumbnail": "/imagestemp/600015.png",
                "sdmId": 600015,
                "title": "7Up Regular",
                "id": 38,
                "sku": 600015,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 833,
                "dependentSteps": [],
                "position": 4,
                "selectionQty": 1,
                "name": "Diet Pepsi Regular",
                "selection_id": 3945,
                "imageThumbnail": "/imagestemp/600005.png",
                "sdmId": 600005,
                "title": "Diet Pepsi Regular",
                "id": 34,
                "sku": 600005,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 833,
                "dependentSteps": [],
                "position": 5,
                "selectionQty": 1,
                "name": "Mountain Dew Regular",
                "selection_id": 3946,
                "imageThumbnail": "/imagestemp/600012.png",
                "sdmId": 600012,
                "title": "Mountain Dew Regular",
                "id": 41,
                "sku": 600012,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 833,
                "dependentSteps": [],
                "position": 6,
                "selectionQty": 1,
                "name": "Small Aquafina",
                "selection_id": 3948,
                "imageThumbnail": "/imagestemp/610011.png",
                "sdmId": 610011,
                "title": "Small Aquafina",
                "id": 81,
                "sku": 610011,
                "subOptions": [],
                "price": 0,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 833,
                "dependentSteps": [],
                "position": 7,
                "selectionQty": 1,
                "name": "Mojito Krusher",
                "selection_id": 3947,
                "imageThumbnail": "/imagestemp/610021.png",
                "sdmId": 610021,
                "title": "Mojito Krusher",
                "id": 2,
                "sku": 610021,
                "subOptions": [],
                "price": 7.5,
                "modGroupId": -1,
                "selected": 0
              },
              {
                "default": 0,
                "option_id": 833,
                "dependentSteps": [],
                "position": 8,
                "selectionQty": 1,
                "name": "Fresh Orange Juice",
                "selection_id": 3949,
                "imageThumbnail": "/imagestemp/610020.png",
                "sdmId": 610020,
                "title": "Fresh Orange Juice",
                "id": 1,
                "sku": 610020,
                "subOptions": [],
                "price": 8.5,
                "modGroupId": -1,
                "selected": 0
              }
            ],
            "name": "Select your favorite beverage",
            "imageThumbnail": "/imagestemp/0.png",
            "isDependent": 0,
            "maximumQty": 0,
            "subtitle": "Select your favorite beverage",
            "type": "radio",
            "title": "Select your favorite beverage",
            "ingredient": 0,
            "compId": 6
          }
        ],
        "imageThumbnail": "/imagestemp/900145.png",
        "catId": 4,
        "image": "no_selection",
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
                "name": "Regular",
                "title": "Regular",
                "id": 16285
              },
              {
                "isSelected": 0,
                "position": 2,
                "name": "Medium",
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 1,
                "position": 3,
                "name": "Large",
                "title": "Large",
                "id": 16286
              }
            ],
            "title": "Choice of Size",
            "selIndex": 1
          }
        ],
        "metaKeyword": [
          "Mozzarella Burger Box - Regular"
        ],
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
                    if (pl.subOptions && pl.subOptions.length > 0) {
                      let plDefaultSdm = false
                      pl.subOptions.forEach(dsplso => {
                        if (dsplso.is_sdm_default == 1)
                          plDefaultSdm = true
                      })
                      if (pl.selected == 1) {
                        pl.subOptions.forEach(so => {
                          if (so.selected == 1) {
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
                      } else {
                        if (plDefaultSdm)
                          obj.Entries.CEntry.push({
                            ID: 0,
                            ItemID: pl.subOptions[0].sdmId,
                            ModCode: "NO",
                            ModgroupID: pl.subOptions[0].modGroupId ? pl.subOptions[0].modGroupId : -1,
                            Name: pl.name,
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
                                            let plDefaultSdm = false
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.is_sdm_default == 1)
                                                plDefaultSdm = true
                                            })
                                            if (dspl.selected) {
                                              console.log("plDefaultSdm", plDefaultSdm)
                                              dspl.subOptions.forEach(dsplso => {
                                                if (dsplso.sdmId && dsplso.selected == 1) {
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
                                            } else {
                                              if (plDefaultSdm)
                                                obj.Entries.CEntry.push({
                                                  ID: 0,
                                                  ItemID: dspl.subOptions[0].sdmId,
                                                  ModCode: "NO",
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
                              if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                let plDefaultSdm = false
                                bpopl.subOptions.forEach(dsplso => {
                                  if (dsplso.is_sdm_default == 1)
                                    plDefaultSdm = true
                                })
                                if (bpopl.selected) {
                                  bpopl.subOptions.forEach(bpoplso => {
                                    if (bpoplso.sdmId && bpoplso.selected == 1) {
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
                                } else {
                                  if (plDefaultSdm)
                                    lastProductAddedInCentry.Entries.CEntry.push({
                                      ID: 0,
                                      ItemID: bpopl.subOptions[0].sdmId,
                                      ModCode: "NO",
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
        "AddressID": 10522817,
        "ConceptID": 3,
        "CountryID": 1,
        "CustomerID": 7703721,
        "DeliveryChargeID": 279,
        "DistrictID": -1,
        "Entries": Entries,
        "Notes": {
          CNote: [{
            NT_FREE_TEXT: "Test Orders - Appinventiv",
            NT_ID: new Date().getTime()
          }]
        },
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
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 49192451, language: "En", country: "UAE" })
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