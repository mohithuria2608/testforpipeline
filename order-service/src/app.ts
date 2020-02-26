import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as SDM from './sdm';
import * as ENTITY from './entity';
import * as CMS from './cms';

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
        "sdmId": 35,
        "description": "Chicken breast fillet, lettuce, sliced tomatoes & mayonnaise in a round bun",
        "position": 46,
        "sku": 900035,
        "bundleProductOptions": [
          {
            "subtitle": "Choose your favorite flavor",
            "position": 1,
            "isDependent": 0,
            "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choose your favorite flavor",
            "productLinks": [
              {
                "id": 1673,
                "sdmId": 110004,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/m/e/menuchickenfilletsandwich.png",
                "default": 1,
                "sku": 110004,
                "option_id": 1621,
                "price": 0,
                "selection_id": 12283,
                "title": "Chicken Fillet Sandwich",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  2
                ],
                "selected": 1,
                "name": "Chicken Fillet Sandwich"
              }
            ],
            "isModifier": 0,
            "compId": 1,
            "maximumQty": 0,
            "name": "Choose your favorite flavor"
          },
          {
            "subtitle": "Choose your condiments",
            "position": 2,
            "isDependent": 1,
            "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
            "ingredient": 1,
            "minimumQty": 0,
            "type": "checkbox",
            "title": "Choose your condiments",
            "productLinks": [
              {
                "id": 1719,
                "sdmId": 810001,
                "subOptions": [
                  {
                    "product_id": 0,
                    "selection_id": 12509,
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
                    "selection_id": 12510,
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
                "imageThumbnail": "/m/e/menuamericancheese.png",
                "default": 0,
                "sku": 810001,
                "option_id": 1468,
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
                    "selection_id": 12511,
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
                    "selection_id": 12512,
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
                "imageThumbnail": "/m/e/menulettuce.png",
                "default": 0,
                "sku": 811701,
                "option_id": 1468,
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
                    "selection_id": 12513,
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
                    "selection_id": 12514,
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
                "imageThumbnail": "/imagestemp/itm811703.png",
                "default": 0,
                "sku": 811703,
                "option_id": 1468,
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
            "name": "Choose your condiments"
          },
          {
            "subtitle": "Select your favorite side item",
            "position": 3,
            "isDependent": 0,
            "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select your favorite side item",
            "productLinks": [
              {
                "id": 1633,
                "sdmId": 510050,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/m/e/menufries_4.png",
                "default": 1,
                "sku": 510050,
                "option_id": 1469,
                "price": 0,
                "selection_id": 11398,
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
                "imageThumbnail": "/imagestemp/itm510001.png",
                "default": 0,
                "sku": 510001,
                "option_id": 1469,
                "price": 0,
                "selection_id": 11400,
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
                "imageThumbnail": "/m/e/menufries_5.png",
                "default": 0,
                "sku": 510051,
                "option_id": 1469,
                "price": 1,
                "selection_id": 11399,
                "title": "Medium Fries Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Medium Fries Spicy"
              },
              {
                "id": 1640,
                "sdmId": 510072,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/itm510072.png",
                "default": 0,
                "sku": 510072,
                "option_id": 1469,
                "price": 1,
                "selection_id": 11402,
                "title": "Medium Dipper Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Medium Dipper Fries"
              },
              {
                "id": 1628,
                "sdmId": 510036,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/m/e/menuloadedfries_1.png",
                "default": 0,
                "sku": 510036,
                "option_id": 1469,
                "price": 3,
                "selection_id": 11401,
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
            "compId": 2,
            "maximumQty": 0,
            "name": "Select your favorite side item"
          },
          {
            "subtitle": "Select your favorite beverage",
            "position": 4,
            "isDependent": 0,
            "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Select your favorite beverage",
            "productLinks": [
              {
                "id": 1605,
                "sdmId": 600003,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/m/e/menupepsi_1.png",
                "default": 1,
                "sku": 600003,
                "option_id": 1470,
                "price": 0,
                "selection_id": 11405,
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
                "imageThumbnail": "/m/e/menumirinda_1.png",
                "default": 0,
                "sku": 600009,
                "option_id": 1470,
                "price": 0,
                "selection_id": 11406,
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
                "imageThumbnail": "/m/e/menu7up_1.png",
                "default": 0,
                "sku": 600016,
                "option_id": 1470,
                "price": 0,
                "selection_id": 11407,
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
                "imageThumbnail": "/imagestemp/itm600006.png",
                "default": 0,
                "sku": 600006,
                "option_id": 1470,
                "price": 0,
                "selection_id": 11408,
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
                "imageThumbnail": "/m/e/menumountaindew_2.png",
                "default": 0,
                "sku": 600013,
                "option_id": 1470,
                "price": 0,
                "selection_id": 11409,
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
                "imageThumbnail": "/m/e/menusmallaquafina.png",
                "default": 0,
                "sku": 610011,
                "option_id": 1470,
                "price": 0,
                "selection_id": 11411,
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
                "imageThumbnail": "/m/e/menuclassicmojito.png",
                "default": 0,
                "sku": 610021,
                "option_id": 1470,
                "price": 7.5,
                "selection_id": 11410,
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
                "imageThumbnail": "/m/e/menufreshorangejuice.png",
                "default": 0,
                "sku": 610020,
                "option_id": 1470,
                "price": 8.5,
                "selection_id": 11412,
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
            "compId": 3,
            "maximumQty": 0,
            "name": "Select your favorite beverage"
          }
        ],
        "image": "/m/e/menuchickenfilletmeal.png",
        "items": [
          {
            "sdmId": 35,
            "description": "",
            "position": 46,
            "sku": 900035,
            "title": "Chicken Fillet Meal - Medium",
            "bundleProductOptions": [
              {
                "subtitle": "Choose your favorite flavor",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choose your favorite flavor",
                "productLinks": [
                  {
                    "id": 1673,
                    "sdmId": 110004,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/m/e/menuchickenfilletsandwich.png",
                    "default": 1,
                    "sku": 110004,
                    "option_id": 1621,
                    "price": 0,
                    "selection_id": 12283,
                    "title": "Chicken Fillet Sandwich",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 1,
                    "name": "Chicken Fillet Sandwich"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Choose your favorite flavor"
              },
              {
                "subtitle": "Choose your condiments",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
                "ingredient": 1,
                "minimumQty": 0,
                "type": "checkbox",
                "title": "Choose your condiments",
                "productLinks": [
                  {
                    "id": 1719,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12509,
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
                        "selection_id": 12510,
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
                    "imageThumbnail": "/m/e/menuamericancheese.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1468,
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
                        "selection_id": 12511,
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
                        "selection_id": 12512,
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
                    "imageThumbnail": "/m/e/menulettuce.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1468,
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
                        "selection_id": 12513,
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
                        "selection_id": 12514,
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
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1468,
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
                "name": "Choose your condiments"
              },
              {
                "subtitle": "Select your favorite side item",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite side item",
                "productLinks": [
                  {
                    "id": 1633,
                    "sdmId": 510050,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/m/e/menufries_4.png",
                    "default": 1,
                    "sku": 510050,
                    "option_id": 1469,
                    "price": 0,
                    "selection_id": 11398,
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
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "default": 0,
                    "sku": 510001,
                    "option_id": 1469,
                    "price": 0,
                    "selection_id": 11400,
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
                    "imageThumbnail": "/m/e/menufries_5.png",
                    "default": 0,
                    "sku": 510051,
                    "option_id": 1469,
                    "price": 1,
                    "selection_id": 11399,
                    "title": "Medium Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Medium Fries Spicy"
                  },
                  {
                    "id": 1640,
                    "sdmId": 510072,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/itm510072.png",
                    "default": 0,
                    "sku": 510072,
                    "option_id": 1469,
                    "price": 1,
                    "selection_id": 11402,
                    "title": "Medium Dipper Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Medium Dipper Fries"
                  },
                  {
                    "id": 1628,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/m/e/menuloadedfries_1.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 1469,
                    "price": 3,
                    "selection_id": 11401,
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
                "compId": 2,
                "maximumQty": 0,
                "name": "Select your favorite side item"
              },
              {
                "subtitle": "Select your favorite beverage",
                "position": 4,
                "isDependent": 0,
                "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite beverage",
                "productLinks": [
                  {
                    "id": 1605,
                    "sdmId": 600003,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/m/e/menupepsi_1.png",
                    "default": 1,
                    "sku": 600003,
                    "option_id": 1470,
                    "price": 0,
                    "selection_id": 11405,
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
                    "imageThumbnail": "/m/e/menumirinda_1.png",
                    "default": 0,
                    "sku": 600009,
                    "option_id": 1470,
                    "price": 0,
                    "selection_id": 11406,
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
                    "imageThumbnail": "/m/e/menu7up_1.png",
                    "default": 0,
                    "sku": 600016,
                    "option_id": 1470,
                    "price": 0,
                    "selection_id": 11407,
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
                    "imageThumbnail": "/imagestemp/itm600006.png",
                    "default": 0,
                    "sku": 600006,
                    "option_id": 1470,
                    "price": 0,
                    "selection_id": 11408,
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
                    "imageThumbnail": "/m/e/menumountaindew_2.png",
                    "default": 0,
                    "sku": 600013,
                    "option_id": 1470,
                    "price": 0,
                    "selection_id": 11409,
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
                    "imageThumbnail": "/m/e/menusmallaquafina.png",
                    "default": 0,
                    "sku": 610011,
                    "option_id": 1470,
                    "price": 0,
                    "selection_id": 11411,
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
                    "imageThumbnail": "/m/e/menuclassicmojito.png",
                    "default": 0,
                    "sku": 610021,
                    "option_id": 1470,
                    "price": 7.5,
                    "selection_id": 11410,
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
                    "imageThumbnail": "/m/e/menufreshorangejuice.png",
                    "default": 0,
                    "sku": 610020,
                    "option_id": 1470,
                    "price": 8.5,
                    "selection_id": 11412,
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
                "compId": 3,
                "maximumQty": 0,
                "name": "Select your favorite beverage"
              }
            ],
            "image": "/m/e/menuchickenfilletmeal.png",
            "imageSmall": "/m/e/menuchickenfilletmeal.png",
            "sel1Value": 16287,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 21,
            "taxClassId": 2,
            "name": "Chicken Fillet Meal - Medium",
            "id": 1737,
            "specialPrice": 23,
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
              "Chicken Fillet Meal - Medium"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
            "finalPrice": 23,
            "virtualGroup": 16298,
            "inSide": 1
          },
          {
            "sdmId": 36,
            "description": "",
            "position": 45,
            "sku": 900036,
            "title": "Chicken Fillet Meal - Large",
            "bundleProductOptions": [
              {
                "subtitle": "Choose your favorite flavor",
                "position": 1,
                "isDependent": 0,
                "imageThumbnail": "/m/e/menuchickenfilletmeal_1.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Choose your favorite flavor",
                "productLinks": [
                  {
                    "id": 1673,
                    "sdmId": 110004,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/m/e/menuchickenfilletsandwich.png",
                    "default": 1,
                    "sku": 110004,
                    "option_id": 1620,
                    "price": 0,
                    "selection_id": 12282,
                    "title": "Chicken Fillet Sandwich",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [
                      2
                    ],
                    "selected": 1,
                    "name": "Chicken Fillet Sandwich"
                  }
                ],
                "isModifier": 0,
                "compId": 1,
                "maximumQty": 0,
                "name": "Choose your favorite flavor"
              },
              {
                "subtitle": "Choose your condiments",
                "position": 2,
                "isDependent": 1,
                "imageThumbnail": "/m/e/menuchickenfilletmeal_1.png",
                "ingredient": 1,
                "minimumQty": 0,
                "type": "checkbox",
                "title": "Choose your condiments",
                "productLinks": [
                  {
                    "id": 1719,
                    "sdmId": 810001,
                    "subOptions": [
                      {
                        "product_id": 0,
                        "selection_id": 12515,
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
                        "selection_id": 12516,
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
                    "imageThumbnail": "/m/e/menuamericancheese.png",
                    "default": 0,
                    "sku": 810001,
                    "option_id": 1471,
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
                        "selection_id": 12517,
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
                        "selection_id": 12518,
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
                    "imageThumbnail": "/m/e/menulettuce.png",
                    "default": 0,
                    "sku": 811701,
                    "option_id": 1471,
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
                        "selection_id": 12519,
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
                        "selection_id": 12520,
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
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "default": 0,
                    "sku": 811703,
                    "option_id": 1471,
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
                "name": "Choose your condiments"
              },
              {
                "subtitle": "Select your favorite side item",
                "position": 3,
                "isDependent": 0,
                "imageThumbnail": "/m/e/menuchickenfilletmeal_1.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite side item",
                "productLinks": [
                  {
                    "id": 1631,
                    "sdmId": 510006,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/m/e/menufries.png",
                    "default": 1,
                    "sku": 510006,
                    "option_id": 1472,
                    "price": 0,
                    "selection_id": 11417,
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
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "default": 0,
                    "sku": 510001,
                    "option_id": 1472,
                    "price": 0,
                    "selection_id": 11419,
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
                    "imageThumbnail": "/m/e/menufries_1.png",
                    "default": 0,
                    "sku": 510013,
                    "option_id": 1472,
                    "price": 1,
                    "selection_id": 11418,
                    "title": "Large Fries Spicy",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Large Fries Spicy"
                  },
                  {
                    "id": 1641,
                    "sdmId": 510073,
                    "subOptions": [

                    ],
                    "position": 4,
                    "imageThumbnail": "/imagestemp/itm510073.png",
                    "default": 0,
                    "sku": 510073,
                    "option_id": 1472,
                    "price": 1,
                    "selection_id": 11421,
                    "title": "Large Dipper Fries",
                    "modGroupId": -1,
                    "selectionQty": 1,
                    "dependentSteps": [

                    ],
                    "selected": 0,
                    "name": "Large Dipper Fries"
                  },
                  {
                    "id": 1628,
                    "sdmId": 510036,
                    "subOptions": [

                    ],
                    "position": 5,
                    "imageThumbnail": "/m/e/menuloadedfries_1.png",
                    "default": 0,
                    "sku": 510036,
                    "option_id": 1472,
                    "price": 3,
                    "selection_id": 11420,
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
                "compId": 2,
                "maximumQty": 0,
                "name": "Select your favorite side item"
              },
              {
                "subtitle": "Select your favorite beverage",
                "position": 4,
                "isDependent": 0,
                "imageThumbnail": "/m/e/menuchickenfilletmeal_1.png",
                "ingredient": 0,
                "minimumQty": 0,
                "type": "radio",
                "title": "Select your favorite beverage",
                "productLinks": [
                  {
                    "id": 1606,
                    "sdmId": 600004,
                    "subOptions": [

                    ],
                    "position": 1,
                    "imageThumbnail": "/m/e/menupepsi.png",
                    "default": 1,
                    "sku": 600004,
                    "option_id": 1473,
                    "price": 0,
                    "selection_id": 11424,
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
                    "imageThumbnail": "/m/e/menumirinda.png",
                    "default": 0,
                    "sku": 600010,
                    "option_id": 1473,
                    "price": 0,
                    "selection_id": 11425,
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
                    "imageThumbnail": "/m/e/menu7up_2.png",
                    "default": 0,
                    "sku": 600017,
                    "option_id": 1473,
                    "price": 0,
                    "selection_id": 11426,
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
                    "imageThumbnail": "/imagestemp/itm600007.png",
                    "default": 0,
                    "sku": 600007,
                    "option_id": 1473,
                    "price": 0,
                    "selection_id": 11427,
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
                    "imageThumbnail": "/m/e/menumountaindew.png",
                    "default": 0,
                    "sku": 600014,
                    "option_id": 1473,
                    "price": 0,
                    "selection_id": 11428,
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
                    "imageThumbnail": "/m/e/menusmallaquafina.png",
                    "default": 0,
                    "sku": 610011,
                    "option_id": 1473,
                    "price": 0,
                    "selection_id": 11430,
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
                    "imageThumbnail": "/m/e/menuclassicmojito.png",
                    "default": 0,
                    "sku": 610021,
                    "option_id": 1473,
                    "price": 7.5,
                    "selection_id": 11429,
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
                    "imageThumbnail": "/m/e/menufreshorangejuice.png",
                    "default": 0,
                    "sku": 610020,
                    "option_id": 1473,
                    "price": 8.5,
                    "selection_id": 11431,
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
                "compId": 3,
                "maximumQty": 0,
                "name": "Select your favorite beverage"
              }
            ],
            "image": "/m/e/menuchickenfilletmeal_1.png",
            "imageSmall": "/m/e/menuchickenfilletmeal_1.png",
            "sel1Value": 16286,
            "sel2Value": -1,
            "visibility": 4,
            "sel3Value": -1,
            "promoId": 21,
            "taxClassId": 2,
            "name": "Chicken Fillet Meal - Large",
            "id": 1738,
            "specialPrice": 24.5,
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
              "Chicken Fillet Meal - Large"
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "imageThumbnail": "/m/e/menuchickenfilletmeal_1.png",
            "finalPrice": 24.5,
            "virtualGroup": 0,
            "inSide": 1
          }
        ],
        "imageSmall": "/m/e/menuchickenfilletmeal.png",
        "catId": 0,
        "visibility": 4,
        "promoId": 21,
        "taxClassId": 2,
        "name": "Chicken Fillet Meal",
        "id": 20,
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
        "qty": 2,
        "sellingPrice": 46,
        "originalTypeId": "bundle_group",
        "associative": 0,
        "menuId": 0,
        "metaKeyword": [
          "Chicken Fillet Meal - Medium"
        ],
        "typeId": "bundle_group",
        "selectedItem": 900035,
        "imageThumbnail": "/m/e/menuchickenfilletmeal.png",
        "virtualGroup": 16298,
        "finalPrice": 23,
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
                                console.log("dependentSteps", dependentSteps)

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
                                          console.log("dsplso", dsplso)

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
                        console.log("dependentSteps", dependentSteps)
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
      "licenseCode": "AmericanaWeb",
      "conceptID": 3,
      "order": {
        "AddressID": "10512559",
        // "Comps": {
        //   "KeyValueOfdecimalCCompkckD9yn_P": {
        //     Key: 7193,
        //     Value: {
        //       Amount: "11",
        //       CompID: 7193,
        //       EnterAmount: "11",
        //       Name: "10% W.F. Discount"
        //     }
        //   }
        // },
        "ConceptID": "3",
        "CountryID": 1,
        "CustomerID": "7694266",
        "DeliveryChargeID": 279,
        "DistrictID": -1,
        "Entries": {
          "CEntry": [
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [
                  {
                    "ID": 0,
                    "ItemID": 810001,
                    "ModCode": "WITH",
                    "ModgroupID": 10028,
                    "Name": "American Cheese",
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
                  },
                  {
                    "ID": 0,
                    "ItemID": 811703,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Tomato",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110004,
              "ModCode": "NONE",
              "Name": "Chicken Fillet Sandwich",
              "QCComponent": 1,
              "QCInstanceID": 508,
              "QCLevel": 0,
              "QCProID": 21
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 2,
              "QCInstanceID": 508,
              "QCLevel": 0,
              "QCProID": 21
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 600003,
              "ModCode": "NONE",
              "Name": "Pepsi Medium",
              "QCComponent": 3,
              "QCInstanceID": 508,
              "QCLevel": 0,
              "QCProID": 21
            },
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [
                  {
                    "ID": 0,
                    "ItemID": 810001,
                    "ModCode": "WITH",
                    "ModgroupID": 10028,
                    "Name": "American Cheese",
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
                  },
                  {
                    "ID": 0,
                    "ItemID": 811703,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Tomato",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110004,
              "ModCode": "NONE",
              "Name": "Chicken Fillet Sandwich",
              "QCComponent": 1,
              "QCInstanceID": 509,
              "QCLevel": 0,
              "QCProID": 21
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 2,
              "QCInstanceID": 509,
              "QCLevel": 0,
              "QCProID": 21
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 600003,
              "ModCode": "NONE",
              "Name": "Pepsi Medium",
              "QCComponent": 3,
              "QCInstanceID": 509,
              "QCLevel": 0,
              "QCProID": 21
            }
          ]
        },
        "OrderID": 0,
        "OrderMode": "1",
        "OrderType": 0,
        "ProvinceID": 7,
        "StoreID": "1219",
        "StreetID": 315
      },
      "autoApprove": "true",
      "useBackupStoreIfAvailable": "true",
      "creditCardPaymentbool": "false",
      "menuTemplateID": "17"
    }
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    //  let detail =  await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 39787090 })
    console.log("detail")
  } catch (error) {
    console.error(error)
  }
})()
