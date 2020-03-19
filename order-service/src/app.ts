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
        "qty": 4,
        "associative": 0,
        "bundleProductOptions": [
          {
            "compId": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 1,
            "minimumQty": 1,
            "position": 1,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [
                  
                ],
                "id": 1791,
                "imageThumbnail": "/imagestemp/210022.png",
                "modGroupId": -1,
                "name": "Meal",
                "option_id": 1657,
                "position": 1,
                "price": 0,
                "sdmId": 210022,
                "selected": 1,
                "selection_id": 12544,
                "selectionQty": 1,
                "sku": 210022,
                "subOptions": [
                  
                ],
                "title": "Meal"
              }
            ],
            "subtitle": "Choose Your Favorite Flavor",
            "title": "Choose Your Favorite Flavor",
            "type": "radio"
          },
          {
            "compId": 2,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 2,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [
                  3
                ],
                "id": 1676,
                "imageThumbnail": "/imagestemp/110031.png",
                "modGroupId": -1,
                "name": "Kentucky Burger Zinger",
                "option_id": 1569,
                "position": 1,
                "price": 0,
                "sdmId": 110031,
                "selected": 1,
                "selection_id": 12003,
                "selectionQty": 1,
                "sku": 110031,
                "subOptions": [
                  
                ],
                "title": "Kentucky Burger Zinger"
              },
              {
                "default": 0,
                "dependentSteps": [
                  3
                ],
                "id": 1677,
                "imageThumbnail": "/imagestemp/110032.png",
                "modGroupId": -1,
                "name": "Kentucky Burger Fillet",
                "option_id": 1569,
                "position": 2,
                "price": 0,
                "sdmId": 110032,
                "selected": 0,
                "selection_id": 12004,
                "selectionQty": 1,
                "sku": 110032,
                "subOptions": [
                  
                ],
                "title": "Kentucky Burger Fillet"
              }
            ],
            "subtitle": "Select Your Favorite Side Item",
            "title": "Select Your Favorite Side Item",
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
            "position": 3,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [
                  
                ],
                "id": 1723,
                "imageThumbnail": "/imagestemp/811701.png",
                "modGroupId": 10027,
                "name": "Lettuce",
                "option_id": 1570,
                "position": 1,
                "price": 0,
                "sdmId": 811701,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 811701,
                "subOptions": [
                  {
                    "id": 1721,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 1723,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 12364,
                    "sku": 811701,
                    "title": "Regular"
                  },
                  {
                    "id": 1722,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 1723,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811701,
                    "selected": 0,
                    "selection_id": 12365,
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
                "id": 1727,
                "imageThumbnail": "/imagestemp/811703.png",
                "modGroupId": 10027,
                "name": "Tomato",
                "option_id": 1570,
                "position": 3,
                "price": 0,
                "sdmId": 811703,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 811703,
                "subOptions": [
                  {
                    "id": 1725,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 1727,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 12366,
                    "sku": 811703,
                    "title": "Regular"
                  },
                  {
                    "id": 1726,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 1727,
                    "price": 0,
                    "product_id": 0,
                    "sdmId": 811703,
                    "selected": 0,
                    "selection_id": 12367,
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
                "id": 1719,
                "imageThumbnail": "/imagestemp/810001.png",
                "modGroupId": 10028,
                "name": "American Cheese",
                "option_id": 1570,
                "position": 5,
                "price": 0,
                "sdmId": 810001,
                "selected": 0,
                "selection_id": 0,
                "selectionQty": 0,
                "sku": 810001,
                "subOptions": [
                  {
                    "id": 1717,
                    "modGroupId": 10028,
                    "name": "Regular",
                    "option_id": 1719,
                    "price": 2,
                    "product_id": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 12362,
                    "sku": 810001,
                    "title": "Regular"
                  },
                  {
                    "id": 1718,
                    "modGroupId": 10028,
                    "name": "Extra",
                    "option_id": 1719,
                    "price": 4,
                    "product_id": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 12363,
                    "sku": 810001,
                    "title": "Extra"
                  }
                ],
                "title": "American Cheese"
              }
            ],
            "subtitle": "Choose Your Condiments",
            "title": "Choose Your Condiments",
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
            "position": 4,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [
                  
                ],
                "id": 1631,
                "imageThumbnail": "/imagestemp/510006.png",
                "modGroupId": -1,
                "name": "Large Fries",
                "option_id": 1571,
                "position": 1,
                "price": 0,
                "sdmId": 510006,
                "selected": 1,
                "selection_id": 12011,
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
                "id": 1619,
                "imageThumbnail": "/imagestemp/510001.png",
                "modGroupId": -1,
                "name": "Coleslaw Salad Small",
                "option_id": 1571,
                "position": 2,
                "price": 0,
                "sdmId": 510001,
                "selected": 0,
                "selection_id": 12013,
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
                "id": 1634,
                "imageThumbnail": "/imagestemp/510013.png",
                "modGroupId": -1,
                "name": "Large Fries Spicy",
                "option_id": 1571,
                "position": 3,
                "price": 1,
                "sdmId": 510013,
                "selected": 0,
                "selection_id": 12012,
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
                "id": 1641,
                "imageThumbnail": "/imagestemp/510073.png",
                "modGroupId": -1,
                "name": "Large Dipper Fries",
                "option_id": 1571,
                "position": 4,
                "price": 1,
                "sdmId": 510073,
                "selected": 0,
                "selection_id": 12015,
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
                "id": 1628,
                "imageThumbnail": "/imagestemp/510036.png",
                "modGroupId": -1,
                "name": "Loaded Fries Regular",
                "option_id": 1571,
                "position": 5,
                "price": 3,
                "sdmId": 510036,
                "selected": 0,
                "selection_id": 12014,
                "selectionQty": 1,
                "sku": 510036,
                "subOptions": [
                  
                ],
                "title": "Loaded Fries Regular"
              }
            ],
            "subtitle": "Select Your Favorite Beverage",
            "title": "Select Your Favorite Beverage",
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
        "description": "New Kentucky Burger + fries + Drink",
        "finalPrice": 29.5,
        "id": 30,
        "image": "imagestemp/900114.png",
        "imageSmall": "imagestemp/900114.png",
        "imageThumbnail": "imagestemp/900114.png",
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
                "maximumQty": 1,
                "minimumQty": 1,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      
                    ],
                    "id": 1791,
                    "imageThumbnail": "/imagestemp/210022.png",
                    "modGroupId": -1,
                    "name": "Meal",
                    "option_id": 1657,
                    "position": 1,
                    "price": 0,
                    "sdmId": 210022,
                    "selected": 1,
                    "selection_id": 12544,
                    "selectionQty": 1,
                    "sku": 210022,
                    "subOptions": [
                      
                    ],
                    "title": "Meal"
                  }
                ],
                "subtitle": "Choose Your Favorite Flavor",
                "title": "Choose Your Favorite Flavor",
                "type": "radio"
              },
              {
                "compId": 2,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      3
                    ],
                    "id": 1676,
                    "imageThumbnail": "/imagestemp/110031.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Zinger",
                    "option_id": 1569,
                    "position": 1,
                    "price": 0,
                    "sdmId": 110031,
                    "selected": 1,
                    "selection_id": 12003,
                    "selectionQty": 1,
                    "sku": 110031,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Zinger"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      3
                    ],
                    "id": 1677,
                    "imageThumbnail": "/imagestemp/110032.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Fillet",
                    "option_id": 1569,
                    "position": 2,
                    "price": 0,
                    "sdmId": 110032,
                    "selected": 0,
                    "selection_id": 12004,
                    "selectionQty": 1,
                    "sku": 110032,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Fillet"
                  }
                ],
                "subtitle": "Select Your Favorite Side Item",
                "title": "Select Your Favorite Side Item",
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
                "position": 3,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1723,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "modGroupId": 10027,
                    "name": "Lettuce",
                    "option_id": 1570,
                    "position": 1,
                    "price": 0,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "id": 1721,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 1,
                        "selection_id": 12364,
                        "sku": 811701,
                        "title": "Regular"
                      },
                      {
                        "id": 1722,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 0,
                        "selection_id": 12365,
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
                    "id": 1727,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "modGroupId": 10027,
                    "name": "Tomato",
                    "option_id": 1570,
                    "position": 3,
                    "price": 0,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "id": 1725,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 1,
                        "selection_id": 12366,
                        "sku": 811703,
                        "title": "Regular"
                      },
                      {
                        "id": 1726,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 0,
                        "selection_id": 12367,
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
                    "id": 1719,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "modGroupId": 10028,
                    "name": "American Cheese",
                    "option_id": 1570,
                    "position": 5,
                    "price": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "id": 1717,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719,
                        "price": 2,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12362,
                        "sku": 810001,
                        "title": "Regular"
                      },
                      {
                        "id": 1718,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719,
                        "price": 4,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12363,
                        "sku": 810001,
                        "title": "Extra"
                      }
                    ],
                    "title": "American Cheese"
                  }
                ],
                "subtitle": "Choose Your Condiments",
                "title": "Choose Your Condiments",
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
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      
                    ],
                    "id": 1631,
                    "imageThumbnail": "/imagestemp/510006.png",
                    "modGroupId": -1,
                    "name": "Large Fries",
                    "option_id": 1571,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510006,
                    "selected": 1,
                    "selection_id": 12011,
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
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1571,
                    "position": 2,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 12013,
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
                    "id": 1634,
                    "imageThumbnail": "/imagestemp/510013.png",
                    "modGroupId": -1,
                    "name": "Large Fries Spicy",
                    "option_id": 1571,
                    "position": 3,
                    "price": 1,
                    "sdmId": 510013,
                    "selected": 0,
                    "selection_id": 12012,
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
                    "id": 1641,
                    "imageThumbnail": "/imagestemp/510073.png",
                    "modGroupId": -1,
                    "name": "Large Dipper Fries",
                    "option_id": 1571,
                    "position": 4,
                    "price": 1,
                    "sdmId": 510073,
                    "selected": 0,
                    "selection_id": 12015,
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
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1571,
                    "position": 5,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 12014,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [
                      
                    ],
                    "title": "Loaded Fries Regular"
                  }
                ],
                "subtitle": "Select Your Favorite Beverage",
                "title": "Select Your Favorite Beverage",
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
            "finalPrice": 31,
            "id": 1761,
            "image": "/m/e/menukentuckyburgermeal.png",
            "imageSmall": "/m/e/menukentuckyburgermeal.png",
            "imageThumbnail": "/imagestemp/900114.png",
            "inSide": 1,
            "metaKeyword": [
              "Kentucky Burger Meal - Large"
            ],
            "name": "Kentucky Burger Meal - Large",
            "position": 1,
            "promoId": 310,
            "sdmId": 114,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900114,
            "specialPrice": 31,
            "taxClassId": 2,
            "title": "Kentucky Burger Meal - Large",
            "typeId": "bundle",
            "virtualGroup": 16298,
            "visibility": 4
          },
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 2,
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
                    "id": 1676,
                    "imageThumbnail": "/imagestemp/110031.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Zinger",
                    "option_id": 1572,
                    "position": 1,
                    "price": 0,
                    "sdmId": 110031,
                    "selected": 1,
                    "selection_id": 12018,
                    "selectionQty": 1,
                    "sku": 110031,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Zinger"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      2
                    ],
                    "id": 1677,
                    "imageThumbnail": "/imagestemp/110032.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Fillet",
                    "option_id": 1572,
                    "position": 2,
                    "price": 0,
                    "sdmId": 110032,
                    "selected": 0,
                    "selection_id": 12019,
                    "selectionQty": 1,
                    "sku": 110032,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Fillet"
                  }
                ],
                "subtitle": "Choice Of Side Item",
                "title": "Choice Of Side Item",
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
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1727,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "modGroupId": 10027,
                    "name": "Tomato",
                    "option_id": 1573,
                    "position": 1,
                    "price": 0,
                    "sdmId": 811703,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "id": 1726,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 0,
                        "selection_id": 12356,
                        "sku": 811703,
                        "title": "Extra"
                      },
                      {
                        "id": 1725,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 1,
                        "selection_id": 12357,
                        "sku": 811703,
                        "title": "Regular"
                      }
                    ],
                    "title": "Tomato"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1723,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "modGroupId": 10027,
                    "name": "Lettuce",
                    "option_id": 1573,
                    "position": 3,
                    "price": 0,
                    "sdmId": 811701,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "id": 1722,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 0,
                        "selection_id": 12358,
                        "sku": 811701,
                        "title": "Extra"
                      },
                      {
                        "id": 1721,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 1,
                        "selection_id": 12359,
                        "sku": 811701,
                        "title": "Regular"
                      }
                    ],
                    "title": "Lettuce"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1719,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "modGroupId": 10028,
                    "name": "American Cheese",
                    "option_id": 1573,
                    "position": 5,
                    "price": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "id": 1717,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719,
                        "price": 2,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12361,
                        "sku": 810001,
                        "title": "Regular"
                      },
                      {
                        "id": 1718,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719,
                        "price": 4,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12360,
                        "sku": 810001,
                        "title": "Extra"
                      }
                    ],
                    "title": "American Cheese"
                  }
                ],
                "subtitle": "Choose Your Condiments",
                "title": "Choose Your Condiments",
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
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      
                    ],
                    "id": 1633,
                    "imageThumbnail": "/imagestemp/510050.png",
                    "modGroupId": -1,
                    "name": "Medium Fries",
                    "option_id": 1574,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510050,
                    "selected": 1,
                    "selection_id": 12026,
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
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1574,
                    "position": 2,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 12028,
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
                    "id": 1637,
                    "imageThumbnail": "/imagestemp/510051.png",
                    "modGroupId": -1,
                    "name": "Medium Fries Spicy",
                    "option_id": 1574,
                    "position": 3,
                    "price": 1,
                    "sdmId": 510051,
                    "selected": 0,
                    "selection_id": 12027,
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
                    "id": 1640,
                    "imageThumbnail": "/imagestemp/510072.png",
                    "modGroupId": -1,
                    "name": "Medium Dipper Fries",
                    "option_id": 1574,
                    "position": 4,
                    "price": 1,
                    "sdmId": 510072,
                    "selected": 0,
                    "selection_id": 12030,
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
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1574,
                    "position": 5,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 12029,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [
                      
                    ],
                    "title": "Loaded Fries Regular"
                  }
                ],
                "subtitle": "Choice Of Beverages",
                "title": "Choice Of Beverages",
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
            "id": 1762,
            "image": "/m/e/menukentuckyburgermeal_1.png",
            "imageSmall": "/m/e/menukentuckyburgermeal_1.png",
            "imageThumbnail": "/imagestemp/900113.png",
            "inSide": 1,
            "metaKeyword": [
              "Kentucky Burger Meal - Medium"
            ],
            "name": "Kentucky Burger Meal - Medium",
            "position": 2,
            "promoId": 310,
            "sdmId": 113,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900113,
            "specialPrice": 29.5,
            "taxClassId": 2,
            "title": "Kentucky Burger Meal - Medium",
            "typeId": "bundle",
            "virtualGroup": 16298,
            "visibility": 4
          }
        ],
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#34",
        "langMenuIdCatIdProductId": "En#1#34#30",
        "langMenuIdProductId": "En#1#30",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "Kentucky Burger Meal - Large"
        ],
        "name": "Kentucky Burger Meal",
        "originalTypeId": "bundle_group",
        "orignalPrice": 0,
        "position": 1,
        "promoId": 310,
        "sdmId": 114,
        "selectedItem": 900113,
        "sellingPrice": 118,
        "sku": 900114,
        "specialPrice": 0,
        "taxClassId": 2,
        "tempItemList": [
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 1,
                "minimumQty": 1,
                "position": 1,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      
                    ],
                    "id": 1791,
                    "imageThumbnail": "/imagestemp/210022.png",
                    "modGroupId": -1,
                    "name": "Meal",
                    "option_id": 1657,
                    "position": 1,
                    "price": 0,
                    "sdmId": 210022,
                    "selected": 1,
                    "selection_id": 12544,
                    "selectionQty": 1,
                    "sku": 210022,
                    "subOptions": [
                      
                    ],
                    "title": "Meal"
                  }
                ],
                "subtitle": "Choose Your Favorite Flavor",
                "title": "Choose Your Favorite Flavor",
                "type": "radio"
              },
              {
                "compId": 2,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "isDependent": 0,
                "isModifier": 0,
                "maximumQty": 0,
                "minimumQty": 0,
                "position": 2,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      3
                    ],
                    "id": 1676,
                    "imageThumbnail": "/imagestemp/110031.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Zinger",
                    "option_id": 1569,
                    "position": 1,
                    "price": 0,
                    "sdmId": 110031,
                    "selected": 1,
                    "selection_id": 12003,
                    "selectionQty": 1,
                    "sku": 110031,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Zinger"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      3
                    ],
                    "id": 1677,
                    "imageThumbnail": "/imagestemp/110032.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Fillet",
                    "option_id": 1569,
                    "position": 2,
                    "price": 0,
                    "sdmId": 110032,
                    "selected": 0,
                    "selection_id": 12004,
                    "selectionQty": 1,
                    "sku": 110032,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Fillet"
                  }
                ],
                "subtitle": "Select Your Favorite Side Item",
                "title": "Select Your Favorite Side Item",
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
                "position": 3,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1723,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "modGroupId": 10027,
                    "name": "Lettuce",
                    "option_id": 1570,
                    "position": 1,
                    "price": 0,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "id": 1721,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 1,
                        "selection_id": 12364,
                        "sku": 811701,
                        "title": "Regular"
                      },
                      {
                        "id": 1722,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 0,
                        "selection_id": 12365,
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
                    "id": 1727,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "modGroupId": 10027,
                    "name": "Tomato",
                    "option_id": 1570,
                    "position": 3,
                    "price": 0,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "id": 1725,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 1,
                        "selection_id": 12366,
                        "sku": 811703,
                        "title": "Regular"
                      },
                      {
                        "id": 1726,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 0,
                        "selection_id": 12367,
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
                    "id": 1719,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "modGroupId": 10028,
                    "name": "American Cheese",
                    "option_id": 1570,
                    "position": 5,
                    "price": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "id": 1717,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719,
                        "price": 2,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12362,
                        "sku": 810001,
                        "title": "Regular"
                      },
                      {
                        "id": 1718,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719,
                        "price": 4,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12363,
                        "sku": 810001,
                        "title": "Extra"
                      }
                    ],
                    "title": "American Cheese"
                  }
                ],
                "subtitle": "Choose Your Condiments",
                "title": "Choose Your Condiments",
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
                "position": 4,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      
                    ],
                    "id": 1631,
                    "imageThumbnail": "/imagestemp/510006.png",
                    "modGroupId": -1,
                    "name": "Large Fries",
                    "option_id": 1571,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510006,
                    "selected": 1,
                    "selection_id": 12011,
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
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1571,
                    "position": 2,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 12013,
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
                    "id": 1634,
                    "imageThumbnail": "/imagestemp/510013.png",
                    "modGroupId": -1,
                    "name": "Large Fries Spicy",
                    "option_id": 1571,
                    "position": 3,
                    "price": 1,
                    "sdmId": 510013,
                    "selected": 0,
                    "selection_id": 12012,
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
                    "id": 1641,
                    "imageThumbnail": "/imagestemp/510073.png",
                    "modGroupId": -1,
                    "name": "Large Dipper Fries",
                    "option_id": 1571,
                    "position": 4,
                    "price": 1,
                    "sdmId": 510073,
                    "selected": 0,
                    "selection_id": 12015,
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
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1571,
                    "position": 5,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 12014,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [
                      
                    ],
                    "title": "Loaded Fries Regular"
                  }
                ],
                "subtitle": "Select Your Favorite Beverage",
                "title": "Select Your Favorite Beverage",
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
            "finalPrice": 31,
            "id": 1761,
            "image": "/m/e/menukentuckyburgermeal.png",
            "imageSmall": "/m/e/menukentuckyburgermeal.png",
            "imageThumbnail": "/imagestemp/900114.png",
            "inSide": 1,
            "metaKeyword": [
              "Kentucky Burger Meal - Large"
            ],
            "name": "Kentucky Burger Meal - Large",
            "position": 1,
            "promoId": 310,
            "sdmId": 114,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900114,
            "specialPrice": 31,
            "taxClassId": 2,
            "title": "Kentucky Burger Meal - Large",
            "typeId": "bundle",
            "virtualGroup": 16298,
            "visibility": 4
          },
          {
            "associative": 0,
            "bundleProductOptions": [
              {
                "compId": 2,
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
                    "id": 1676,
                    "imageThumbnail": "/imagestemp/110031.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Zinger",
                    "option_id": 1572,
                    "position": 1,
                    "price": 0,
                    "sdmId": 110031,
                    "selected": 1,
                    "selection_id": 12018,
                    "selectionQty": 1,
                    "sku": 110031,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Zinger"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      2
                    ],
                    "id": 1677,
                    "imageThumbnail": "/imagestemp/110032.png",
                    "modGroupId": -1,
                    "name": "Kentucky Burger Fillet",
                    "option_id": 1572,
                    "position": 2,
                    "price": 0,
                    "sdmId": 110032,
                    "selected": 0,
                    "selection_id": 12019,
                    "selectionQty": 1,
                    "sku": 110032,
                    "subOptions": [
                      
                    ],
                    "title": "Kentucky Burger Fillet"
                  }
                ],
                "subtitle": "Choice Of Side Item",
                "title": "Choice Of Side Item",
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
                "position": 2,
                "productLinks": [
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1727,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "modGroupId": 10027,
                    "name": "Tomato",
                    "option_id": 1573,
                    "position": 1,
                    "price": 0,
                    "sdmId": 811703,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811703,
                    "subOptions": [
                      {
                        "id": 1726,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 0,
                        "selection_id": 12356,
                        "sku": 811703,
                        "title": "Extra"
                      },
                      {
                        "id": 1725,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811703,
                        "selected": 1,
                        "selection_id": 12357,
                        "sku": 811703,
                        "title": "Regular"
                      }
                    ],
                    "title": "Tomato"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1723,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "modGroupId": 10027,
                    "name": "Lettuce",
                    "option_id": 1573,
                    "position": 3,
                    "price": 0,
                    "sdmId": 811701,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 811701,
                    "subOptions": [
                      {
                        "id": 1722,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 0,
                        "selection_id": 12358,
                        "sku": 811701,
                        "title": "Extra"
                      },
                      {
                        "id": 1721,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723,
                        "price": 0,
                        "product_id": 0,
                        "sdmId": 811701,
                        "selected": 1,
                        "selection_id": 12359,
                        "sku": 811701,
                        "title": "Regular"
                      }
                    ],
                    "title": "Lettuce"
                  },
                  {
                    "default": 0,
                    "dependentSteps": [
                      
                    ],
                    "id": 1719,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "modGroupId": 10028,
                    "name": "American Cheese",
                    "option_id": 1573,
                    "position": 5,
                    "price": 0,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 0,
                    "selectionQty": 0,
                    "sku": 810001,
                    "subOptions": [
                      {
                        "id": 1717,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719,
                        "price": 2,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12361,
                        "sku": 810001,
                        "title": "Regular"
                      },
                      {
                        "id": 1718,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719,
                        "price": 4,
                        "product_id": 0,
                        "sdmId": 810001,
                        "selected": 0,
                        "selection_id": 12360,
                        "sku": 810001,
                        "title": "Extra"
                      }
                    ],
                    "title": "American Cheese"
                  }
                ],
                "subtitle": "Choose Your Condiments",
                "title": "Choose Your Condiments",
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
                "position": 3,
                "productLinks": [
                  {
                    "default": 1,
                    "dependentSteps": [
                      
                    ],
                    "id": 1633,
                    "imageThumbnail": "/imagestemp/510050.png",
                    "modGroupId": -1,
                    "name": "Medium Fries",
                    "option_id": 1574,
                    "position": 1,
                    "price": 0,
                    "sdmId": 510050,
                    "selected": 1,
                    "selection_id": 12026,
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
                    "id": 1619,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "modGroupId": -1,
                    "name": "Coleslaw Salad Small",
                    "option_id": 1574,
                    "position": 2,
                    "price": 0,
                    "sdmId": 510001,
                    "selected": 0,
                    "selection_id": 12028,
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
                    "id": 1637,
                    "imageThumbnail": "/imagestemp/510051.png",
                    "modGroupId": -1,
                    "name": "Medium Fries Spicy",
                    "option_id": 1574,
                    "position": 3,
                    "price": 1,
                    "sdmId": 510051,
                    "selected": 0,
                    "selection_id": 12027,
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
                    "id": 1640,
                    "imageThumbnail": "/imagestemp/510072.png",
                    "modGroupId": -1,
                    "name": "Medium Dipper Fries",
                    "option_id": 1574,
                    "position": 4,
                    "price": 1,
                    "sdmId": 510072,
                    "selected": 0,
                    "selection_id": 12030,
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
                    "id": 1628,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "modGroupId": -1,
                    "name": "Loaded Fries Regular",
                    "option_id": 1574,
                    "position": 5,
                    "price": 3,
                    "sdmId": 510036,
                    "selected": 0,
                    "selection_id": 12029,
                    "selectionQty": 1,
                    "sku": 510036,
                    "subOptions": [
                      
                    ],
                    "title": "Loaded Fries Regular"
                  }
                ],
                "subtitle": "Choice Of Beverages",
                "title": "Choice Of Beverages",
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
            "id": 1762,
            "image": "/m/e/menukentuckyburgermeal_1.png",
            "imageSmall": "/m/e/menukentuckyburgermeal_1.png",
            "imageThumbnail": "/imagestemp/900113.png",
            "inSide": 1,
            "metaKeyword": [
              "Kentucky Burger Meal - Medium"
            ],
            "name": "Kentucky Burger Meal - Medium",
            "position": 2,
            "promoId": 310,
            "sdmId": 113,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 900113,
            "specialPrice": 29.5,
            "taxClassId": 2,
            "title": "Kentucky Burger Meal - Medium",
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
                                      let ItemID = 0
                                      if (dspl.subOptions && dspl.subOptions.length > 0) {
                                        dspl.subOptions.forEach(dsplso => {
                                          if (dsplso.selected == 1)
                                            ItemID = dsplso.sdmId
                                        })
                                      }
                                      if (ItemID)
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
                                  console.log("mongo", bpoplso)
                                  if (bpoplso.selected == 1)
                                    ItemID = bpoplso.sdmId
                                })
                              }
                              if (ItemID)
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
        "Entries":{
          "CEntry": [
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [
                  {
                    "ID": 0,
                    "ItemID": 811703,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Tomato",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  },
                  {
                    "ID": 0,
                    "ItemID": 811701,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Lettuce",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110031,
              "ModCode": "NONE",
              "Name": "Kentucky Burger Zinger",
              "QCComponent": 2,
              "QCInstanceID": 666,
              "QCLevel": 0,
              "QCProID": 310
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 3,
              "QCInstanceID": 666,
              "QCLevel": 0,
              "QCProID": 310
            },
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [
                  {
                    "ID": 0,
                    "ItemID": 811703,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Tomato",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  },
                  {
                    "ID": 0,
                    "ItemID": 811701,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Lettuce",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110031,
              "ModCode": "NONE",
              "Name": "Kentucky Burger Zinger",
              "QCComponent": 2,
              "QCInstanceID": 299,
              "QCLevel": 0,
              "QCProID": 310
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 3,
              "QCInstanceID": 299,
              "QCLevel": 0,
              "QCProID": 310
            },
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [
                  {
                    "ID": 0,
                    "ItemID": 811703,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Tomato",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  },
                  {
                    "ID": 0,
                    "ItemID": 811701,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Lettuce",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110031,
              "ModCode": "NONE",
              "Name": "Kentucky Burger Zinger",
              "QCComponent": 2,
              "QCInstanceID": 480,
              "QCLevel": 0,
              "QCProID": 310
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 3,
              "QCInstanceID": 480,
              "QCLevel": 0,
              "QCProID": 310
            },
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [
                  {
                    "ID": 0,
                    "ItemID": 811703,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Tomato",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  },
                  {
                    "ID": 0,
                    "ItemID": 811701,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Lettuce",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110031,
              "ModCode": "NONE",
              "Name": "Kentucky Burger Zinger",
              "QCComponent": 2,
              "QCInstanceID": 281,
              "QCLevel": 0,
              "QCProID": 310
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 3,
              "QCInstanceID": 281,
              "QCLevel": 0,
              "QCProID": 310
            }
          ]
        },
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
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 39838630, language: "En" })
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