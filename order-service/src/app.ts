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
        "sdmId": 70,
        "description": "Mighty Zinger + Twister + Fries + Pepsi",
        "position": 4,
        "sku": 900070,
        "bundleProductOptions": [
          {
            "subtitle": "Select Your Favorite Sandwich",
            "position": 1,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select Your Favorite Sandwich",
            "productLinks": [
              {
                "id": 1659,
                "sdmId": 110005,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/110005.png",
                "default": 1,
                "sku": 110005,
                "option_id": 1616,
                "price": 0,
                "selection_id": 12278,
                "title": "Mighty Zinger",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  2
                ],
                "selected": 1,
                "name": "Mighty Zinger"
              }
            ],
            "isModifier": 0,
            "compId": 1,
            "maximumQty": 0,
            "name": "Select Your Favorite Sandwich"
          },
          {
            "subtitle": "Choose Your Condiments",
            "position": 2,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 1,
            "minimumQty": 0,
            "type": "checkbox",
            "title": "Choose Your Condiments",
            "productLinks": [
              {
                "id": 1719,
                "sdmId": 810001,
                "subOptions": [
                  {
                    "product_id": 0,
                    "selection_id": 12467,
                    "sku": 810001,
                    "id": 1717,
                    "price": 0,
                    "selected": 1,
                    "title": "Regular",
                    "sdmId": 810001,
                    "modGroupId": 10028,
                    "name": "Regular",
                    "option_id": 1719
                  },
                  {
                    "product_id": 0,
                    "selection_id": 12468,
                    "sku": 810001,
                    "id": 1718,
                    "price": 2,
                    "selected": 0,
                    "title": "Extra",
                    "sdmId": 810001,
                    "modGroupId": 10028,
                    "name": "Extra",
                    "option_id": 1719
                  }
                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/810001.png",
                "default": 0,
                "sku": 810001,
                "option_id": 1438,
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
                "id": 1723,
                "sdmId": 811701,
                "subOptions": [
                  {
                    "product_id": 0,
                    "selection_id": 12469,
                    "sku": 811701,
                    "id": 1721,
                    "price": 0,
                    "selected": 1,
                    "title": "Regular",
                    "sdmId": 811701,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 1723
                  },
                  {
                    "product_id": 0,
                    "selection_id": 12470,
                    "sku": 811701,
                    "id": 1722,
                    "price": 0,
                    "selected": 0,
                    "title": "Extra",
                    "sdmId": 811701,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 1723
                  }
                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/811701.png",
                "default": 0,
                "sku": 811701,
                "option_id": 1438,
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
                "id": 1727,
                "sdmId": 811703,
                "subOptions": [
                  {
                    "product_id": 0,
                    "selection_id": 12471,
                    "sku": 811703,
                    "id": 1725,
                    "price": 0,
                    "selected": 1,
                    "title": "Regular",
                    "sdmId": 811703,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 1727
                  },
                  {
                    "product_id": 0,
                    "selection_id": 12472,
                    "sku": 811703,
                    "id": 1726,
                    "price": 0,
                    "selected": 0,
                    "title": "Extra",
                    "sdmId": 811703,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 1727
                  }
                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/811703.png",
                "default": 0,
                "sku": 811703,
                "option_id": 1438,
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
            "compId": 1,
            "maximumQty": 0,
            "name": "Choose Your Condiments"
          },
          {
            "subtitle": "Select Your Second Sandwich",
            "position": 3,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select Your Second Sandwich",
            "productLinks": [
              {
                "id": 1648,
                "sdmId": 110003,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/110003.png",
                "default": 1,
                "sku": 110003,
                "option_id": 1439,
                "price": 0,
                "selection_id": 11208,
                "title": "Twister Sandwich - Original",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  4
                ],
                "selected": 1,
                "name": "Twister Sandwich - Original"
              },
              {
                "id": 1649,
                "sdmId": 110002,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/110002.png",
                "default": 0,
                "sku": 110002,
                "option_id": 1439,
                "price": 0,
                "selection_id": 11209,
                "title": "Twister Sandwich - Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  4
                ],
                "selected": 0,
                "name": "Twister Sandwich - Spicy"
              }
            ],
            "isModifier": 0,
            "compId": 2,
            "maximumQty": 0,
            "name": "Select Your Second Sandwich"
          },
          {
            "subtitle": "Choose Your Condiments",
            "position": 4,
            "isDependent": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 1,
            "minimumQty": 0,
            "type": "checkbox",
            "title": "Choose Your Condiments",
            "productLinks": [
              {
                "id": 1723,
                "sdmId": 811701,
                "subOptions": [
                  {
                    "product_id": 0,
                    "selection_id": 12475,
                    "sku": 811701,
                    "id": 1721,
                    "price": 0,
                    "selected": 1,
                    "title": "Regular",
                    "sdmId": 811701,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 1723
                  },
                  {
                    "product_id": 0,
                    "selection_id": 12476,
                    "sku": 811701,
                    "id": 1722,
                    "price": 0,
                    "selected": 0,
                    "title": "Extra",
                    "sdmId": 811701,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 1723
                  }
                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/811701.png",
                "default": 0,
                "sku": 811701,
                "option_id": 1614,
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
                "id": 1727,
                "sdmId": 811703,
                "subOptions": [
                  {
                    "product_id": 0,
                    "selection_id": 12477,
                    "sku": 811703,
                    "id": 1725,
                    "price": 0,
                    "selected": 1,
                    "title": "Regular",
                    "sdmId": 811703,
                    "modGroupId": 10027,
                    "name": "Regular",
                    "option_id": 1727
                  },
                  {
                    "product_id": 0,
                    "selection_id": 12478,
                    "sku": 811703,
                    "id": 1726,
                    "price": 0,
                    "selected": 0,
                    "title": "Extra",
                    "sdmId": 811703,
                    "modGroupId": 10027,
                    "name": "Extra",
                    "option_id": 1727
                  }
                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/811703.png",
                "default": 0,
                "sku": 811703,
                "option_id": 1614,
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
                "id": 1719,
                "sdmId": 810001,
                "subOptions": [
                  {
                    "product_id": 0,
                    "selection_id": 12473,
                    "sku": 810001,
                    "id": 1717,
                    "price": 2,
                    "selected": 0,
                    "title": "Regular",
                    "sdmId": 810001,
                    "modGroupId": 10028,
                    "name": "Regular",
                    "option_id": 1719
                  },
                  {
                    "product_id": 0,
                    "selection_id": 12474,
                    "sku": 810001,
                    "id": 1718,
                    "price": 4,
                    "selected": 0,
                    "title": "Extra",
                    "sdmId": 810001,
                    "modGroupId": 10028,
                    "name": "Extra",
                    "option_id": 1719
                  }
                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/810001.png",
                "default": 0,
                "sku": 810001,
                "option_id": 1614,
                "price": 0,
                "selection_id": 0,
                "title": "American Cheese",
                "modGroupId": 10028,
                "selectionQty": 0,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "American Cheese"
              }
            ],
            "isModifier": 1,
            "compId": 2,
            "maximumQty": 0,
            "name": "Choose Your Condiments"
          },
          {
            "subtitle": "Select Your Favorite Side Item",
            "position": 5,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select Your Favorite Side Item",
            "productLinks": [
              {
                "id": 1633,
                "sdmId": 510050,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/510050.png",
                "default": 1,
                "sku": 510050,
                "option_id": 1440,
                "price": 0,
                "selection_id": 11210,
                "title": "Medium Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Medium Fries"
              },
              {
                "id": 1619,
                "sdmId": 510001,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/510001.png",
                "default": 0,
                "sku": 510001,
                "option_id": 1440,
                "price": 0,
                "selection_id": 11212,
                "title": "Coleslaw Salad Small",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Coleslaw Salad Small"
              },
              {
                "id": 1637,
                "sdmId": 510051,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/510051.png",
                "default": 0,
                "sku": 510051,
                "option_id": 1440,
                "price": 1,
                "selection_id": 11211,
                "title": "Medium Fries Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Medium Fries Spicy"
              },
              {
                "id": 1639,
                "sdmId": 510071,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/510071.png",
                "default": 0,
                "sku": 510071,
                "option_id": 1440,
                "price": 1,
                "selection_id": 11214,
                "title": "Potato Dipper- Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Potato Dipper- Regular"
              },
              {
                "id": 1628,
                "sdmId": 510036,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/510036.png",
                "default": 0,
                "sku": 510036,
                "option_id": 1440,
                "price": 3,
                "selection_id": 11213,
                "title": "Loaded Fries Regular",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Loaded Fries Regular"
              }
            ],
            "isModifier": 0,
            "compId": 3,
            "maximumQty": 0,
            "name": "Select Your Favorite Side Item"
          },
          {
            "subtitle": "Select Your Favorite Beverage",
            "position": 6,
            "isDependent": 0,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select Your Favorite Beverage",
            "productLinks": [
              {
                "id": 1605,
                "sdmId": 600003,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/600003.png",
                "default": 1,
                "sku": 600003,
                "option_id": 1441,
                "price": 0,
                "selection_id": 11217,
                "title": "Pepsi Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Pepsi Medium"
              },
              {
                "id": 1617,
                "sdmId": 600009,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/600009.png",
                "default": 0,
                "sku": 600009,
                "option_id": 1441,
                "price": 0,
                "selection_id": 11218,
                "title": "Mirinda Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mirinda Medium"
              },
              {
                "id": 1612,
                "sdmId": 600016,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/600016.png",
                "default": 0,
                "sku": 600016,
                "option_id": 1441,
                "price": 0,
                "selection_id": 11219,
                "title": "7Up Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "7Up Medium"
              },
              {
                "id": 1607,
                "sdmId": 600006,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/600006.png",
                "default": 0,
                "sku": 600006,
                "option_id": 1441,
                "price": 0,
                "selection_id": 11220,
                "title": "Diet Pepsi Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Diet Pepsi Medium"
              },
              {
                "id": 1614,
                "sdmId": 600013,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/600013.png",
                "default": 0,
                "sku": 600013,
                "option_id": 1441,
                "price": 0,
                "selection_id": 11221,
                "title": "Mountain Dew Medium",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mountain Dew Medium"
              },
              {
                "id": 1652,
                "sdmId": 610011,
                "subOptions": [

                ],
                "position": 6,
                "imageThumbnail": "/imagestemp/610011.png",
                "default": 0,
                "sku": 610011,
                "option_id": 1441,
                "price": 0,
                "selection_id": 11223,
                "title": "Small Aquafina",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Small Aquafina"
              },
              {
                "id": 1600,
                "sdmId": 610021,
                "subOptions": [

                ],
                "position": 7,
                "imageThumbnail": "/imagestemp/610021.png",
                "default": 0,
                "sku": 610021,
                "option_id": 1441,
                "price": 5.5,
                "selection_id": 11222,
                "title": "Mojito Krusher",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mojito Krusher"
              },
              {
                "id": 1599,
                "sdmId": 610020,
                "subOptions": [

                ],
                "position": 8,
                "imageThumbnail": "/imagestemp/610020.png",
                "default": 0,
                "sku": 610020,
                "option_id": 1441,
                "price": 8.5,
                "selection_id": 11224,
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
            "name": "Select Your Favorite Beverage"
          }
        ],
        "originalPrice": 28,
        "items": [
          {
            "sdmId": 70,
            "description": "",
            "position": 4,
            "sku": 900070,
            "title": "Mighty Twist - Medium",
            "bundleProductOptions": [
              {
                "subtitle": "Select Your Favorite Sandwich",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Favorite Sandwich",
                "productLinks": [
                  {
                    "id": 1659,
                    "sdmId": 110005,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110005.png",
                    "default": 1,
                    "sku": 110005,
                    "option_id": 1616,
                    "price": 0,
                    "selection_id": 12278,
                    "title": "Mighty Zinger",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 1,
                    "name": "Mighty Zinger"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Select Your Favorite Sandwich"
              },
              {
                "subtitle": "Choose Your Condiments",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 1,
                "minimumQty": 0,
                "type": "checkbox",
                "title": "Choose Your Condiments",
                "productLinks": [
                  {
                    "id": 1719,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12467,
                        "sku": 810001,
                        "id": 1717,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12468,
                        "sku": 810001,
                        "id": 1718,
                        "price": 2,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1438,
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
                    "id": 1723,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12469,
                        "sku": 811701,
                        "id": 1721,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12470,
                        "sku": 811701,
                        "id": 1722,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723
                      }
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1438,
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
                    "id": 1727,
                    "sdmId": 811703,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12471,
                        "sku": 811703,
                        "id": 1725,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12472,
                        "sku": 811703,
                        "id": 1726,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727
                      }
                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1438,
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
                "compId": 1,
                "maximumQty": 0,
                "name": "Choose Your Condiments"
              },
              {
                "subtitle": "Select Your Second Sandwich",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Second Sandwich",
                "productLinks": [
                  {
                    "id": 1648,
                    "sdmId": 110003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110003.png",
                    "default": 1,
                    "sku": 110003,
                    "option_id": 1439,
                    "price": 0,
                    "selection_id": 11208,
                    "title": "Twister Sandwich - Original",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 1,
                    "name": "Twister Sandwich - Original"
                  },
                  {
                    "id": 1649,
                    "sdmId": 110002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/110002.png",
                    "default": 0,
                    "sku": 110002,
                    "option_id": 1439,
                    "price": 0,
                    "selection_id": 11209,
                    "title": "Twister Sandwich - Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 0,
                    "name": "Twister Sandwich - Spicy"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "Select Your Second Sandwich"
              },
              {
                "subtitle": "Choose Your Condiments",
                "position": 4,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 1,
                "minimumQty": 0,
                "type": "checkbox",
                "title": "Choose Your Condiments",
                "productLinks": [
                  {
                    "id": 1723,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12475,
                        "sku": 811701,
                        "id": 1721,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12476,
                        "sku": 811701,
                        "id": 1722,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1614,
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
                    "id": 1727,
                    "sdmId": 811703,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12477,
                        "sku": 811703,
                        "id": 1725,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12478,
                        "sku": 811703,
                        "id": 1726,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727
                      }
                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1614,
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
                    "id": 1719,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12473,
                        "sku": 810001,
                        "id": 1717,
                        "price": 2,
                        "selected": 0,
                        "title": "Regular",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12474,
                        "sku": 810001,
                        "id": 1718,
                        "price": 4,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719
                      }
                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1614,
                    "price": 0,
                    "selection_id": 0,
                    "title": "American Cheese",
                    "modGroupId": 10028,
                    "selectionQty": 0,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "American Cheese"
                  }
                ],
                "isModifier": 1,
                "compId": 2,
                "maximumQty": 0,
                "name": "Choose Your Condiments"
              },
              {
                "subtitle": "Select Your Favorite Side Item",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Favorite Side Item",
                "productLinks": [
                  {
                    "id": 1633,
                    "sdmId": 510050,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510050.png",
                    "default": 1,
                    "sku": 510050,
                    "option_id": 1440,
                    "price": 0,
                    "selection_id": 11210,
                    "title": "Medium Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Medium Fries"
                  },
                  {
                    "id": 1619,
                    "sdmId": 510001,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "default": 0,
                    "sku": 510001,
                    "option_id": 1440,
                    "price": 0,
                    "selection_id": 11212,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Coleslaw Salad Small"
                  },
                  {
                    "id": 1637,
                    "sdmId": 510051,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/510051.png",
                    "default": 0,
                    "sku": 510051,
                    "option_id": 1440,
                    "price": 1,
                    "selection_id": 11211,
                    "title": "Medium Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Medium Fries Spicy"
                  },
                  {
                    "id": 1639,
                    "sdmId": 510071,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "default": 0,
                    "sku": 510071,
                    "option_id": 1440,
                    "price": 1,
                    "selection_id": 11214,
                    "title": "Potato Dipper- Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Potato Dipper- Regular"
                  },
                  {
                    "id": 1628,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 1440,
                    "price": 3,
                    "selection_id": 11213,
                    "title": "Loaded Fries Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Loaded Fries Regular"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Select Your Favorite Side Item"
              },
              {
                "subtitle": "Select Your Favorite Beverage",
                "position": 6,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Favorite Beverage",
                "productLinks": [
                  {
                    "id": 1605,
                    "sdmId": 600003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/600003.png",
                    "default": 1,
                    "sku": 600003,
                    "option_id": 1441,
                    "price": 0,
                    "selection_id": 11217,
                    "title": "Pepsi Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Pepsi Medium"
                  },
                  {
                    "id": 1617,
                    "sdmId": 600009,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600009.png",
                    "default": 0,
                    "sku": 600009,
                    "option_id": 1441,
                    "price": 0,
                    "selection_id": 11218,
                    "title": "Mirinda Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mirinda Medium"
                  },
                  {
                    "id": 1612,
                    "sdmId": 600016,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600016.png",
                    "default": 0,
                    "sku": 600016,
                    "option_id": 1441,
                    "price": 0,
                    "selection_id": 11219,
                    "title": "7Up Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "7Up Medium"
                  },
                  {
                    "id": 1607,
                    "sdmId": 600006,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600006.png",
                    "default": 0,
                    "sku": 600006,
                    "option_id": 1441,
                    "price": 0,
                    "selection_id": 11220,
                    "title": "Diet Pepsi Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Medium"
                  },
                  {
                    "id": 1614,
                    "sdmId": 600013,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/600013.png",
                    "default": 0,
                    "sku": 600013,
                    "option_id": 1441,
                    "price": 0,
                    "selection_id": 11221,
                    "title": "Mountain Dew Medium",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mountain Dew Medium"
                  },
                  {
                    "id": 1652,
                    "sdmId": 610011,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "default": 0,
                    "sku": 610011,
                    "option_id": 1441,
                    "price": 0,
                    "selection_id": 11223,
                    "title": "Small Aquafina",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Small Aquafina"
                  },
                  {
                    "id": 1600,
                    "sdmId": 610021,
                    "subOptions": [

                    ],
                    "position": 7,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "default": 0,
                    "sku": 610021,
                    "option_id": 1441,
                    "price": 5.5,
                    "selection_id": 11222,
                    "title": "Mojito Krusher",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mojito Krusher"
                  },
                  {
                    "id": 1599,
                    "sdmId": 610020,
                    "subOptions": [

                    ],
                    "position": 8,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "default": 0,
                    "sku": 610020,
                    "option_id": 1441,
                    "price": 8.5,
                    "selection_id": 11224,
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
                "name": "Select Your Favorite Beverage"
              }
            ],
            "image": "/m/e/menumightytwist_1.png",
            "imageSmall": "/m/e/menumightytwist_1.png",
            "sel1Value": 16287,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 65,
            "taxClassId": 2,
            "name": "Mighty Twist - Medium",
            "id": 1729,
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
              "Mighty Twist - Medium"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900070.png",
            "finalPrice": 28,
            "virtualGroup": 16298,
            "inSide": 1
          },
          {
            "sdmId": 71,
            "description": "",
            "position": 5,
            "sku": 900071,
            "title": "Mighty Twist - Large",
            "bundleProductOptions": [
              {
                "subtitle": "Select Your Favorite Sandwich",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Favorite Sandwich",
                "productLinks": [
                  {
                    "id": 1659,
                    "sdmId": 110005,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110005.png",
                    "default": 1,
                    "sku": 110005,
                    "option_id": 1617,
                    "price": 0,
                    "selection_id": 12279,
                    "title": "Mighty Zinger",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 1,
                    "name": "Mighty Zinger"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Select Your Favorite Sandwich"
              },
              {
                "subtitle": "Choose Your Condiments",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 1,
                "minimumQty": 0,
                "type": "checkbox",
                "title": "Choose Your Condiments",
                "productLinks": [
                  {
                    "id": 1719,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12461,
                        "sku": 810001,
                        "id": 1717,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12462,
                        "sku": 810001,
                        "id": 1718,
                        "price": 2,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1442,
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
                    "id": 1723,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12463,
                        "sku": 811701,
                        "id": 1721,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12464,
                        "sku": 811701,
                        "id": 1722,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723
                      }
                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1442,
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
                    "id": 1727,
                    "sdmId": 811703,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12465,
                        "sku": 811703,
                        "id": 1725,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12466,
                        "sku": 811703,
                        "id": 1726,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727
                      }
                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1442,
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
                "compId": 1,
                "maximumQty": 0,
                "name": "Choose Your Condiments"
              },
              {
                "subtitle": "Select Your Second Sandwich",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Second Sandwich",
                "productLinks": [
                  {
                    "id": 1648,
                    "sdmId": 110003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/110003.png",
                    "default": 1,
                    "sku": 110003,
                    "option_id": 1443,
                    "price": 0,
                    "selection_id": 11234,
                    "title": "Twister Sandwich - Original",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 1,
                    "name": "Twister Sandwich - Original"
                  },
                  {
                    "id": 1649,
                    "sdmId": 110002,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/110002.png",
                    "default": 0,
                    "sku": 110002,
                    "option_id": 1443,
                    "price": 0,
                    "selection_id": 11235,
                    "title": "Twister Sandwich - Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      4
                    ],
                    "selected": 0,
                    "name": "Twister Sandwich - Spicy"
                  }
                ],
                "isModifier": 0,
                "compId": 2,
                "maximumQty": 0,
                "name": "Select Your Second Sandwich"
              },
              {
                "subtitle": "Choose Your Condiments",
                "position": 4,
                "isDependent": 1,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 1,
                "minimumQty": 0,
                "type": "checkbox",
                "title": "Choose Your Condiments",
                "productLinks": [
                  {
                    "id": 1723,
                    "sdmId": 811701,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12481,
                        "sku": 811701,
                        "id": 1721,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1723
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12482,
                        "sku": 811701,
                        "id": 1722,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811701,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1723
                      }
                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/811701.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1615,
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
                    "id": 1727,
                    "sdmId": 811703,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12483,
                        "sku": 811703,
                        "id": 1725,
                        "price": 0,
                        "selected": 1,
                        "title": "Regular",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Regular",
                        "option_id": 1727
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12484,
                        "sku": 811703,
                        "id": 1726,
                        "price": 0,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 811703,
                        "modGroupId": 10027,
                        "name": "Extra",
                        "option_id": 1727
                      }
                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1615,
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
                    "id": 1719,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12479,
                        "sku": 810001,
                        "id": 1717,
                        "price": 2,
                        "selected": 0,
                        "title": "Regular",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Regular",
                        "option_id": 1719
                      },
                      {
                        "product_id": 0,
                        "selection_id": 12480,
                        "sku": 810001,
                        "id": 1718,
                        "price": 4,
                        "selected": 0,
                        "title": "Extra",
                        "sdmId": 810001,
                        "modGroupId": 10028,
                        "name": "Extra",
                        "option_id": 1719
                      }
                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/810001.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1615,
                    "price": 0,
                    "selection_id": 0,
                    "title": "American Cheese",
                    "modGroupId": 10028,
                    "selectionQty": 0,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "American Cheese"
                  }
                ],
                "isModifier": 1,
                "compId": 2,
                "maximumQty": 0,
                "name": "Choose Your Condiments"
              },
              {
                "subtitle": "Select Your Favorite Side Item",
                "position": 5,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Favorite Side Item",
                "productLinks": [
                  {
                    "id": 1631,
                    "sdmId": 510006,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/510006.png",
                    "default": 1,
                    "sku": 510006,
                    "option_id": 1444,
                    "price": 0,
                    "selection_id": 11236,
                    "title": "Large Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Large Fries"
                  },
                  {
                    "id": 1619,
                    "sdmId": 510001,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/510001.png",
                    "default": 0,
                    "sku": 510001,
                    "option_id": 1444,
                    "price": 0,
                    "selection_id": 11238,
                    "title": "Coleslaw Salad Small",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Coleslaw Salad Small"
                  },
                  {
                    "id": 1634,
                    "sdmId": 510013,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/510013.png",
                    "default": 0,
                    "sku": 510013,
                    "option_id": 1444,
                    "price": 1,
                    "selection_id": 11237,
                    "title": "Large Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Large Fries Spicy"
                  },
                  {
                    "id": 1639,
                    "sdmId": 510071,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/510071.png",
                    "default": 0,
                    "sku": 510071,
                    "option_id": 1444,
                    "price": 1,
                    "selection_id": 11240,
                    "title": "Potato Dipper- Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Potato Dipper- Regular"
                  },
                  {
                    "id": 1628,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/510036.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 1444,
                    "price": 3,
                    "selection_id": 11239,
                    "title": "Loaded Fries Regular",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Loaded Fries Regular"
                  }
                ],
                "isModifier": 0,
                "compId": 3,
                "maximumQty": 0,
                "name": "Select Your Favorite Side Item"
              },
              {
                "subtitle": "Select Your Favorite Beverage",
                "position": 6,
                "isDependent": 0,
                "imageThumbnail": "/imagestemp/0.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select Your Favorite Beverage",
                "productLinks": [
                  {
                    "id": 1606,
                    "sdmId": 600004,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/imagestemp/600004.png",
                    "default": 1,
                    "sku": 600004,
                    "option_id": 1445,
                    "price": 0,
                    "selection_id": 11243,
                    "title": "Pepsi Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 1,
                    "name": "Pepsi Large"
                  },
                  {
                    "id": 1618,
                    "sdmId": 600010,
                    "subOptions": [

                    ],
                    "position": 2,
                    "imageThumbnail": "/imagestemp/600010.png",
                    "default": 0,
                    "sku": 600010,
                    "option_id": 1445,
                    "price": 0,
                    "selection_id": 11244,
                    "title": "Mirinda Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mirinda Large"
                  },
                  {
                    "id": 1610,
                    "sdmId": 600017,
                    "subOptions": [

                    ],
                    "position": 3,
                    "imageThumbnail": "/imagestemp/600017.png",
                    "default": 0,
                    "sku": 600017,
                    "option_id": 1445,
                    "price": 0,
                    "selection_id": 11245,
                    "title": "7Up Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "7Up Large"
                  },
                  {
                    "id": 1609,
                    "sdmId": 600007,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/600007.png",
                    "default": 0,
                    "sku": 600007,
                    "option_id": 1445,
                    "price": 0,
                    "selection_id": 11246,
                    "title": "Diet Pepsi Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Diet Pepsi Large"
                  },
                  {
                    "id": 1615,
                    "sdmId": 600014,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/imagestemp/600014.png",
                    "default": 0,
                    "sku": 600014,
                    "option_id": 1445,
                    "price": 0,
                    "selection_id": 11247,
                    "title": "Mountain Dew Large",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mountain Dew Large"
                  },
                  {
                    "id": 1652,
                    "sdmId": 610011,
                    "subOptions": [

                    ],
                    "position": 6,
                    "imageThumbnail": "/imagestemp/610011.png",
                    "default": 0,
                    "sku": 610011,
                    "option_id": 1445,
                    "price": 0,
                    "selection_id": 11249,
                    "title": "Small Aquafina",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Small Aquafina"
                  },
                  {
                    "id": 1600,
                    "sdmId": 610021,
                    "subOptions": [

                    ],
                    "position": 7,
                    "imageThumbnail": "/imagestemp/610021.png",
                    "default": 0,
                    "sku": 610021,
                    "option_id": 1445,
                    "price": 5.5,
                    "selection_id": 11248,
                    "title": "Mojito Krusher",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Mojito Krusher"
                  },
                  {
                    "id": 1599,
                    "sdmId": 610020,
                    "subOptions": [

                    ],
                    "position": 8,
                    "imageThumbnail": "/imagestemp/610020.png",
                    "default": 0,
                    "sku": 610020,
                    "option_id": 1445,
                    "price": 8.5,
                    "selection_id": 11250,
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
                "name": "Select Your Favorite Beverage"
              }
            ],
            "image": "/m/e/menumightytwist.png",
            "imageSmall": "/m/e/menumightytwist.png",
            "sel1Value": 16286,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 65,
            "taxClassId": 2,
            "name": "Mighty Twist - Large",
            "id": 1730,
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
              "Mighty Twist - Large"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/imagestemp/900071.png",
            "finalPrice": 29.5,
            "virtualGroup": 16298,
            "inSide": 1
          }
        ],
        "image": "/m/e/menumightytwist_1.png",
        "imageSmall": "/m/e/menumightytwist_1.png",
        "baseFinalPrice": 28,
        "catId": 21,
        "visibility": 4,
        "promoId": 65,
        "taxClassId": 2,
        "name": "Mighty Twist",
        "baseSpecialPrice": 0,
        "id": 16,
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
        "qty": 1,
        "sellingPrice": 28,
        "originalTypeId": "bundle_group",
        "associative": 0,
        "menuId": 0,
        "metaKeyword": [
          "Mighty Twist - Medium"
        ],
        "typeId": "bundle_group",
        "selectedItem": 900070,
        "imageThumbnail": "/imagestemp/900070.png",
        "finalPrice": 28,
        "virtualGroup": 16298,
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
        "Entries": {
          "CEntry": [
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 413002,
              "ModCode": "NONE",
              "Name": "Super Mega Deal - Original",
              "QCComponent": 1,
              "QCInstanceID": 119,
              "QCLevel": 0,
              "QCProID": 55
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510005,
              "ModCode": "NONE",
              "Name": "Family Fries",
              "QCComponent": 2,
              "QCInstanceID": 119,
              "QCLevel": 0,
              "QCProID": 55
            },
            {
              "ItemID": 910001,
              "Level": 0,
              "ModCode": "NONE",
              "Name": "Chicken Pc - Original",
              "OrdrMode": "OM_SAVED",
              "Price": 0,
              "Status": "NOTAPPLIED"
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
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 39838815, language: "En" })
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