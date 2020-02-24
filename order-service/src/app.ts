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

    await ENTITY.CartE.createCartOnCMS({
      "cartId": "5e53a52d8771550813aad701",
      "couponCode": "",
      "curMenuId": 1,
      "items": [
        {
          "qty": 1,
          "associative": 0,
          "bundleProductOptions": [
            {
              "compId": 1,
              "imageThumbnail": "/m/e/menumightytwist_1.png",
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
                  "id": 1659,
                  "imageThumbnail": "/m/e/menumightyzingerfilletboth.png",
                  "modGroupId": -1,
                  "name": "Mighty Zinger",
                  "option_id": 1616,
                  "position": 1,
                  "price": 0,
                  "sdmId": 110005,
                  "selected": 1,
                  "selection_id": 12278,
                  "selectionQty": 1,
                  "sku": 110005,
                  "subOptions": [

                  ],
                  "title": "Mighty Zinger"
                }
              ],
              "subtitle": "Select Your favorite Sandwich",
              "title": "Select Your favorite Sandwich",
              "type": "radio"
            },
            {
              "compId": 1,
              "imageThumbnail": "/m/e/menumightytwist_1.png",
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
                  "id": 1719,
                  "imageThumbnail": "/m/e/menuamericancheese.png",
                  "modGroupId": 10028,
                  "name": "American Cheese",
                  "option_id": 1438,
                  "position": 1,
                  "price": 0,
                  "sdmId": 810001,
                  "selected": 1,
                  "selection_id": 0,
                  "selectionQty": 0,
                  "sku": 810001,
                  "subOptions": [
                    {
                      "id": 1717,
                      "modGroupId": 10028,
                      "name": "Regular",
                      "option_id": 1719,
                      "price": 0,
                      "product_id": 0,
                      "sdmId": 810001,
                      "selected": 0,
                      "selection_id": 12467,
                      "sku": 810001,
                      "title": "Regular"
                    },
                    {
                      "id": 1718,
                      "modGroupId": 10028,
                      "name": "Extra",
                      "option_id": 1719,
                      "price": 2,
                      "product_id": 0,
                      "sdmId": 810001,
                      "selected": 0,
                      "selection_id": 12468,
                      "sku": 810001,
                      "title": "Extra"
                    }
                  ],
                  "title": "American Cheese"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1723,
                  "imageThumbnail": "/m/e/menulettuce.png",
                  "modGroupId": 10027,
                  "name": "Lettuce",
                  "option_id": 1438,
                  "position": 2,
                  "price": 0,
                  "sdmId": 811701,
                  "selected": 0,
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
                      "selected": 0,
                      "selection_id": 12469,
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
                      "selection_id": 12470,
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
                  "imageThumbnail": "/imagestemp/itm811703.png",
                  "modGroupId": 10027,
                  "name": "Tomato",
                  "option_id": 1438,
                  "position": 4,
                  "price": 0,
                  "sdmId": 811703,
                  "selected": 0,
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
                      "selected": 0,
                      "selection_id": 12471,
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
                      "selection_id": 12472,
                      "sku": 811703,
                      "title": "Extra"
                    }
                  ],
                  "title": "Tomato"
                }
              ],
              "subtitle": "Choose Your Condiments",
              "title": "Choose Your Condiments",
              "type": "checkbox"
            },
            {
              "compId": 2,
              "imageThumbnail": "/m/e/menumightytwist_1.png",
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
                    4
                  ],
                  "id": 1648,
                  "imageThumbnail": "/m/e/menutwistersandwichoriginal.png",
                  "modGroupId": -1,
                  "name": "Twister Sandwich - Original",
                  "option_id": 1439,
                  "position": 1,
                  "price": 0,
                  "sdmId": 110003,
                  "selected": 1,
                  "selection_id": 11208,
                  "selectionQty": 1,
                  "sku": 110003,
                  "subOptions": [

                  ],
                  "title": "Twister Sandwich - Original"
                },
                {
                  "default": 0,
                  "dependentSteps": [
                    4
                  ],
                  "id": 1649,
                  "imageThumbnail": "/m/e/menutwistersandwichoriginal_1.png",
                  "modGroupId": -1,
                  "name": "Twister Sandwich - Spicy",
                  "option_id": 1439,
                  "position": 2,
                  "price": 0,
                  "sdmId": 110002,
                  "selected": 0,
                  "selection_id": 11209,
                  "selectionQty": 1,
                  "sku": 110002,
                  "subOptions": [

                  ],
                  "title": "Twister Sandwich - Spicy"
                }
              ],
              "subtitle": "Select Your Second Sandwich",
              "title": "Select Your Second Sandwich",
              "type": "radio"
            },
            {
              "compId": 2,
              "imageThumbnail": "/m/e/menumightytwist_1.png",
              "ingredient": 1,
              "isDependent": 1,
              "isModifier": 1,
              "maximumQty": 0,
              "minimumQty": 0,
              "position": 4,
              "productLinks": [
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1719,
                  "imageThumbnail": "/m/e/menuamericancheese.png",
                  "modGroupId": 10028,
                  "name": "American Cheese",
                  "option_id": 1614,
                  "position": 1,
                  "price": 0,
                  "sdmId": 810001,
                  "selected": 1,
                  "selection_id": 0,
                  "selectionQty": 0,
                  "sku": 810001,
                  "subOptions": [
                    {
                      "id": 1717,
                      "modGroupId": 10028,
                      "name": "Regular",
                      "option_id": 1719,
                      "price": 0,
                      "product_id": 0,
                      "sdmId": 810001,
                      "selected": 0,
                      "selection_id": 12473,
                      "sku": 810001,
                      "title": "Regular"
                    },
                    {
                      "id": 1718,
                      "modGroupId": 10028,
                      "name": "Extra",
                      "option_id": 1719,
                      "price": 2,
                      "product_id": 0,
                      "sdmId": 810001,
                      "selected": 0,
                      "selection_id": 12474,
                      "sku": 810001,
                      "title": "Extra"
                    }
                  ],
                  "title": "American Cheese"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1723,
                  "imageThumbnail": "/m/e/menulettuce.png",
                  "modGroupId": 10027,
                  "name": "Lettuce",
                  "option_id": 1614,
                  "position": 2,
                  "price": 0,
                  "sdmId": 811701,
                  "selected": 0,
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
                      "selected": 0,
                      "selection_id": 12475,
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
                      "selection_id": 12476,
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
                  "imageThumbnail": "/imagestemp/itm811703.png",
                  "modGroupId": 10027,
                  "name": "Tomato",
                  "option_id": 1614,
                  "position": 4,
                  "price": 0,
                  "sdmId": 811703,
                  "selected": 0,
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
                      "selected": 0,
                      "selection_id": 12477,
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
                      "selection_id": 12478,
                      "sku": 811703,
                      "title": "Extra"
                    }
                  ],
                  "title": "Tomato"
                }
              ],
              "subtitle": "Choose Your Condiments",
              "title": "Choose Your Condiments",
              "type": "checkbox"
            },
            {
              "compId": 3,
              "imageThumbnail": "/m/e/menumightytwist_1.png",
              "ingredient": 0,
              "isDependent": 0,
              "isModifier": 0,
              "maximumQty": 0,
              "minimumQty": 0,
              "position": 5,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1633,
                  "imageThumbnail": "/m/e/menufries_4.png",
                  "modGroupId": -1,
                  "name": "Medium Fries",
                  "option_id": 1440,
                  "position": 1,
                  "price": 0,
                  "sdmId": 510050,
                  "selected": 1,
                  "selection_id": 11210,
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
                  "imageThumbnail": "/imagestemp/itm510001.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Small",
                  "option_id": 1440,
                  "position": 2,
                  "price": 0,
                  "sdmId": 510001,
                  "selected": 0,
                  "selection_id": 11212,
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
                  "imageThumbnail": "/m/e/menufries_5.png",
                  "modGroupId": -1,
                  "name": "Medium Fries Spicy",
                  "option_id": 1440,
                  "position": 3,
                  "price": 1,
                  "sdmId": 510051,
                  "selected": 0,
                  "selection_id": 11211,
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
                  "id": 1639,
                  "imageThumbnail": "/m/e/menupotatodipper.png",
                  "modGroupId": -1,
                  "name": "Potato Dipper- Regular",
                  "option_id": 1440,
                  "position": 4,
                  "price": 1,
                  "sdmId": 510071,
                  "selected": 0,
                  "selection_id": 11214,
                  "selectionQty": 1,
                  "sku": 510071,
                  "subOptions": [

                  ],
                  "title": "Potato Dipper- Regular"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1628,
                  "imageThumbnail": "/m/e/menuloadedfries_1.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Regular",
                  "option_id": 1440,
                  "position": 5,
                  "price": 3,
                  "sdmId": 510036,
                  "selected": 0,
                  "selection_id": 11213,
                  "selectionQty": 1,
                  "sku": 510036,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Regular"
                }
              ],
              "subtitle": "Select your favorite side item",
              "title": "Select your favorite side item",
              "type": "radio"
            },
            {
              "compId": 4,
              "imageThumbnail": "/m/e/menumightytwist_1.png",
              "ingredient": 0,
              "isDependent": 0,
              "isModifier": 0,
              "maximumQty": 0,
              "minimumQty": 0,
              "position": 6,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1605,
                  "imageThumbnail": "/m/e/menupepsi_1.png",
                  "modGroupId": -1,
                  "name": "Pepsi Medium",
                  "option_id": 1441,
                  "position": 1,
                  "price": 0,
                  "sdmId": 600003,
                  "selected": 1,
                  "selection_id": 11217,
                  "selectionQty": 1,
                  "sku": 600003,
                  "subOptions": [

                  ],
                  "title": "Pepsi Medium"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1617,
                  "imageThumbnail": "/m/e/menumirinda_1.png",
                  "modGroupId": -1,
                  "name": "Mirinda Medium",
                  "option_id": 1441,
                  "position": 2,
                  "price": 0,
                  "sdmId": 600009,
                  "selected": 0,
                  "selection_id": 11218,
                  "selectionQty": 1,
                  "sku": 600009,
                  "subOptions": [

                  ],
                  "title": "Mirinda Medium"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1612,
                  "imageThumbnail": "/m/e/menu7up_1.png",
                  "modGroupId": -1,
                  "name": "7Up Medium",
                  "option_id": 1441,
                  "position": 3,
                  "price": 0,
                  "sdmId": 600016,
                  "selected": 0,
                  "selection_id": 11219,
                  "selectionQty": 1,
                  "sku": 600016,
                  "subOptions": [

                  ],
                  "title": "7Up Medium"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1607,
                  "imageThumbnail": "/imagestemp/itm600006.png",
                  "modGroupId": -1,
                  "name": "Diet Pepsi Medium",
                  "option_id": 1441,
                  "position": 4,
                  "price": 0,
                  "sdmId": 600006,
                  "selected": 0,
                  "selection_id": 11220,
                  "selectionQty": 1,
                  "sku": 600006,
                  "subOptions": [

                  ],
                  "title": "Diet Pepsi Medium"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1614,
                  "imageThumbnail": "/m/e/menumountaindew_2.png",
                  "modGroupId": -1,
                  "name": "Mountain Dew Medium",
                  "option_id": 1441,
                  "position": 5,
                  "price": 0,
                  "sdmId": 600013,
                  "selected": 0,
                  "selection_id": 11221,
                  "selectionQty": 1,
                  "sku": 600013,
                  "subOptions": [

                  ],
                  "title": "Mountain Dew Medium"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1652,
                  "imageThumbnail": "/m/e/menusmallaquafina.png",
                  "modGroupId": -1,
                  "name": "Small Aquafina",
                  "option_id": 1441,
                  "position": 6,
                  "price": 0,
                  "sdmId": 610011,
                  "selected": 0,
                  "selection_id": 11223,
                  "selectionQty": 1,
                  "sku": 610011,
                  "subOptions": [

                  ],
                  "title": "Small Aquafina"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1600,
                  "imageThumbnail": "/m/e/menuclassicmojito.png",
                  "modGroupId": -1,
                  "name": "Mojito Krusher",
                  "option_id": 1441,
                  "position": 7,
                  "price": 5.5,
                  "sdmId": 610021,
                  "selected": 0,
                  "selection_id": 11222,
                  "selectionQty": 1,
                  "sku": 610021,
                  "subOptions": [

                  ],
                  "title": "Mojito Krusher"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1599,
                  "imageThumbnail": "/m/e/menufreshorangejuice.png",
                  "modGroupId": -1,
                  "name": "Fresh Orange Juice",
                  "option_id": 1441,
                  "position": 8,
                  "price": 8.5,
                  "sdmId": 610020,
                  "selected": 0,
                  "selection_id": 11224,
                  "selectionQty": 1,
                  "sku": 610020,
                  "subOptions": [

                  ],
                  "title": "Fresh Orange Juice"
                }
              ],
              "subtitle": "Select your favorite beverage",
              "title": "Select your favorite beverage",
              "type": "radio"
            }
          ],
          "catId": 21,
          "configurableProductOptions": [
            {
              "id": 144,
              "options": [
                {
                  "id": 16287,
                  "isSelected": 0,
                  "position": 1,
                  "title": "Medium"
                },
                {
                  "id": 16286,
                  "isSelected": 1,
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
          "description": "Mighty Zinger + Twister + Fries + Pepsi",
          "finalPrice": 28,
          "id": 16,
          "image": "/m/e/menumightytwist_1.png",
          "imageSmall": "/m/e/menumightytwist_1.png",
          "imageThumbnail": "/m/e/menumightytwist_1.png",
          "inSide": 1,
          "items": [
            {
              "associative": 0,
              "bundleProductOptions": [
                {
                  "compId": 1,
                  "imageThumbnail": "/m/e/menumightytwist_1.png",
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
                      "id": 1659,
                      "imageThumbnail": "/m/e/menumightyzingerfilletboth.png",
                      "modGroupId": -1,
                      "name": "Mighty Zinger",
                      "option_id": 1616,
                      "position": 1,
                      "price": 0,
                      "sdmId": 110005,
                      "selected": 1,
                      "selection_id": 12278,
                      "selectionQty": 1,
                      "sku": 110005,
                      "subOptions": [

                      ],
                      "title": "Mighty Zinger"
                    }
                  ],
                  "subtitle": "Select Your favorite Sandwich",
                  "title": "Select Your favorite Sandwich",
                  "type": "radio"
                },
                {
                  "compId": 1,
                  "imageThumbnail": "/m/e/menumightytwist_1.png",
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
                      "id": 1719,
                      "imageThumbnail": "/m/e/menuamericancheese.png",
                      "modGroupId": 10028,
                      "name": "American Cheese",
                      "option_id": 1438,
                      "position": 1,
                      "price": 0,
                      "sdmId": 810001,
                      "selected": 1,
                      "selection_id": 0,
                      "selectionQty": 0,
                      "sku": 810001,
                      "subOptions": [
                        {
                          "id": 1717,
                          "modGroupId": 10028,
                          "name": "Regular",
                          "option_id": 1719,
                          "price": 0,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12467,
                          "sku": 810001,
                          "title": "Regular"
                        },
                        {
                          "id": 1718,
                          "modGroupId": 10028,
                          "name": "Extra",
                          "option_id": 1719,
                          "price": 2,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12468,
                          "sku": 810001,
                          "title": "Extra"
                        }
                      ],
                      "title": "American Cheese"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1723,
                      "imageThumbnail": "/m/e/menulettuce.png",
                      "modGroupId": 10027,
                      "name": "Lettuce",
                      "option_id": 1438,
                      "position": 2,
                      "price": 0,
                      "sdmId": 811701,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12469,
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
                          "selection_id": 12470,
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
                      "imageThumbnail": "/imagestemp/itm811703.png",
                      "modGroupId": 10027,
                      "name": "Tomato",
                      "option_id": 1438,
                      "position": 4,
                      "price": 0,
                      "sdmId": 811703,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12471,
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
                          "selection_id": 12472,
                          "sku": 811703,
                          "title": "Extra"
                        }
                      ],
                      "title": "Tomato"
                    }
                  ],
                  "subtitle": "Choose Your Condiments",
                  "title": "Choose Your Condiments",
                  "type": "checkbox"
                },
                {
                  "compId": 2,
                  "imageThumbnail": "/m/e/menumightytwist_1.png",
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
                        4
                      ],
                      "id": 1648,
                      "imageThumbnail": "/m/e/menutwistersandwichoriginal.png",
                      "modGroupId": -1,
                      "name": "Twister Sandwich - Original",
                      "option_id": 1439,
                      "position": 1,
                      "price": 0,
                      "sdmId": 110003,
                      "selected": 1,
                      "selection_id": 11208,
                      "selectionQty": 1,
                      "sku": 110003,
                      "subOptions": [

                      ],
                      "title": "Twister Sandwich - Original"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [
                        4
                      ],
                      "id": 1649,
                      "imageThumbnail": "/m/e/menutwistersandwichoriginal_1.png",
                      "modGroupId": -1,
                      "name": "Twister Sandwich - Spicy",
                      "option_id": 1439,
                      "position": 2,
                      "price": 0,
                      "sdmId": 110002,
                      "selected": 0,
                      "selection_id": 11209,
                      "selectionQty": 1,
                      "sku": 110002,
                      "subOptions": [

                      ],
                      "title": "Twister Sandwich - Spicy"
                    }
                  ],
                  "subtitle": "Select Your Second Sandwich",
                  "title": "Select Your Second Sandwich",
                  "type": "radio"
                },
                {
                  "compId": 2,
                  "imageThumbnail": "/m/e/menumightytwist_1.png",
                  "ingredient": 1,
                  "isDependent": 1,
                  "isModifier": 1,
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "position": 4,
                  "productLinks": [
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1719,
                      "imageThumbnail": "/m/e/menuamericancheese.png",
                      "modGroupId": 10028,
                      "name": "American Cheese",
                      "option_id": 1614,
                      "position": 1,
                      "price": 0,
                      "sdmId": 810001,
                      "selected": 1,
                      "selection_id": 0,
                      "selectionQty": 0,
                      "sku": 810001,
                      "subOptions": [
                        {
                          "id": 1717,
                          "modGroupId": 10028,
                          "name": "Regular",
                          "option_id": 1719,
                          "price": 0,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12473,
                          "sku": 810001,
                          "title": "Regular"
                        },
                        {
                          "id": 1718,
                          "modGroupId": 10028,
                          "name": "Extra",
                          "option_id": 1719,
                          "price": 2,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12474,
                          "sku": 810001,
                          "title": "Extra"
                        }
                      ],
                      "title": "American Cheese"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1723,
                      "imageThumbnail": "/m/e/menulettuce.png",
                      "modGroupId": 10027,
                      "name": "Lettuce",
                      "option_id": 1614,
                      "position": 2,
                      "price": 0,
                      "sdmId": 811701,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12475,
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
                          "selection_id": 12476,
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
                      "imageThumbnail": "/imagestemp/itm811703.png",
                      "modGroupId": 10027,
                      "name": "Tomato",
                      "option_id": 1614,
                      "position": 4,
                      "price": 0,
                      "sdmId": 811703,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12477,
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
                          "selection_id": 12478,
                          "sku": 811703,
                          "title": "Extra"
                        }
                      ],
                      "title": "Tomato"
                    }
                  ],
                  "subtitle": "Choose Your Condiments",
                  "title": "Choose Your Condiments",
                  "type": "checkbox"
                },
                {
                  "compId": 3,
                  "imageThumbnail": "/m/e/menumightytwist_1.png",
                  "ingredient": 0,
                  "isDependent": 0,
                  "isModifier": 0,
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "position": 5,
                  "productLinks": [
                    {
                      "default": 1,
                      "dependentSteps": [

                      ],
                      "id": 1633,
                      "imageThumbnail": "/m/e/menufries_4.png",
                      "modGroupId": -1,
                      "name": "Medium Fries",
                      "option_id": 1440,
                      "position": 1,
                      "price": 0,
                      "sdmId": 510050,
                      "selected": 1,
                      "selection_id": 11210,
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
                      "imageThumbnail": "/imagestemp/itm510001.png",
                      "modGroupId": -1,
                      "name": "Coleslaw Salad Small",
                      "option_id": 1440,
                      "position": 2,
                      "price": 0,
                      "sdmId": 510001,
                      "selected": 0,
                      "selection_id": 11212,
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
                      "imageThumbnail": "/m/e/menufries_5.png",
                      "modGroupId": -1,
                      "name": "Medium Fries Spicy",
                      "option_id": 1440,
                      "position": 3,
                      "price": 1,
                      "sdmId": 510051,
                      "selected": 0,
                      "selection_id": 11211,
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
                      "id": 1639,
                      "imageThumbnail": "/m/e/menupotatodipper.png",
                      "modGroupId": -1,
                      "name": "Potato Dipper- Regular",
                      "option_id": 1440,
                      "position": 4,
                      "price": 1,
                      "sdmId": 510071,
                      "selected": 0,
                      "selection_id": 11214,
                      "selectionQty": 1,
                      "sku": 510071,
                      "subOptions": [

                      ],
                      "title": "Potato Dipper- Regular"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1628,
                      "imageThumbnail": "/m/e/menuloadedfries_1.png",
                      "modGroupId": -1,
                      "name": "Loaded Fries Regular",
                      "option_id": 1440,
                      "position": 5,
                      "price": 3,
                      "sdmId": 510036,
                      "selected": 0,
                      "selection_id": 11213,
                      "selectionQty": 1,
                      "sku": 510036,
                      "subOptions": [

                      ],
                      "title": "Loaded Fries Regular"
                    }
                  ],
                  "subtitle": "Select your favorite side item",
                  "title": "Select your favorite side item",
                  "type": "radio"
                },
                {
                  "compId": 4,
                  "imageThumbnail": "/m/e/menumightytwist_1.png",
                  "ingredient": 0,
                  "isDependent": 0,
                  "isModifier": 0,
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "position": 6,
                  "productLinks": [
                    {
                      "default": 1,
                      "dependentSteps": [

                      ],
                      "id": 1605,
                      "imageThumbnail": "/m/e/menupepsi_1.png",
                      "modGroupId": -1,
                      "name": "Pepsi Medium",
                      "option_id": 1441,
                      "position": 1,
                      "price": 0,
                      "sdmId": 600003,
                      "selected": 1,
                      "selection_id": 11217,
                      "selectionQty": 1,
                      "sku": 600003,
                      "subOptions": [

                      ],
                      "title": "Pepsi Medium"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1617,
                      "imageThumbnail": "/m/e/menumirinda_1.png",
                      "modGroupId": -1,
                      "name": "Mirinda Medium",
                      "option_id": 1441,
                      "position": 2,
                      "price": 0,
                      "sdmId": 600009,
                      "selected": 0,
                      "selection_id": 11218,
                      "selectionQty": 1,
                      "sku": 600009,
                      "subOptions": [

                      ],
                      "title": "Mirinda Medium"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1612,
                      "imageThumbnail": "/m/e/menu7up_1.png",
                      "modGroupId": -1,
                      "name": "7Up Medium",
                      "option_id": 1441,
                      "position": 3,
                      "price": 0,
                      "sdmId": 600016,
                      "selected": 0,
                      "selection_id": 11219,
                      "selectionQty": 1,
                      "sku": 600016,
                      "subOptions": [

                      ],
                      "title": "7Up Medium"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1607,
                      "imageThumbnail": "/imagestemp/itm600006.png",
                      "modGroupId": -1,
                      "name": "Diet Pepsi Medium",
                      "option_id": 1441,
                      "position": 4,
                      "price": 0,
                      "sdmId": 600006,
                      "selected": 0,
                      "selection_id": 11220,
                      "selectionQty": 1,
                      "sku": 600006,
                      "subOptions": [

                      ],
                      "title": "Diet Pepsi Medium"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1614,
                      "imageThumbnail": "/m/e/menumountaindew_2.png",
                      "modGroupId": -1,
                      "name": "Mountain Dew Medium",
                      "option_id": 1441,
                      "position": 5,
                      "price": 0,
                      "sdmId": 600013,
                      "selected": 0,
                      "selection_id": 11221,
                      "selectionQty": 1,
                      "sku": 600013,
                      "subOptions": [

                      ],
                      "title": "Mountain Dew Medium"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1652,
                      "imageThumbnail": "/m/e/menusmallaquafina.png",
                      "modGroupId": -1,
                      "name": "Small Aquafina",
                      "option_id": 1441,
                      "position": 6,
                      "price": 0,
                      "sdmId": 610011,
                      "selected": 0,
                      "selection_id": 11223,
                      "selectionQty": 1,
                      "sku": 610011,
                      "subOptions": [

                      ],
                      "title": "Small Aquafina"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1600,
                      "imageThumbnail": "/m/e/menuclassicmojito.png",
                      "modGroupId": -1,
                      "name": "Mojito Krusher",
                      "option_id": 1441,
                      "position": 7,
                      "price": 5.5,
                      "sdmId": 610021,
                      "selected": 0,
                      "selection_id": 11222,
                      "selectionQty": 1,
                      "sku": 610021,
                      "subOptions": [

                      ],
                      "title": "Mojito Krusher"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1599,
                      "imageThumbnail": "/m/e/menufreshorangejuice.png",
                      "modGroupId": -1,
                      "name": "Fresh Orange Juice",
                      "option_id": 1441,
                      "position": 8,
                      "price": 8.5,
                      "sdmId": 610020,
                      "selected": 0,
                      "selection_id": 11224,
                      "selectionQty": 1,
                      "sku": 610020,
                      "subOptions": [

                      ],
                      "title": "Fresh Orange Juice"
                    }
                  ],
                  "subtitle": "Select your favorite beverage",
                  "title": "Select your favorite beverage",
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
              "finalPrice": 28,
              "id": 1729,
              "image": "/m/e/menumightytwist_1.png",
              "imageSmall": "/m/e/menumightytwist_1.png",
              "imageThumbnail": "/m/e/menumightytwist_1.png",
              "inSide": 1,
              "metaKeyword": [
                "Mighty Twist - Medium"
              ],
              "name": "Mighty Twist - Medium",
              "position": 4,
              "promoId": 65,
              "sdmId": 70,
              "sel1Value": 16287,
              "sel2Value": -1,
              "sel3Value": -1,
              "selectedItem": 0,
              "sku": 900070,
              "specialPrice": 28,
              "taxClassId": 2,
              "title": "Mighty Twist - Medium",
              "typeId": "bundle",
              "virtualGroup": 16298,
              "visibility": 4
            },
            {
              "associative": 0,
              "bundleProductOptions": [
                {
                  "compId": 1,
                  "imageThumbnail": "/m/e/menumightytwist.png",
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
                      "id": 1659,
                      "imageThumbnail": "/m/e/menumightyzingerfilletboth.png",
                      "modGroupId": -1,
                      "name": "Mighty Zinger",
                      "option_id": 1617,
                      "position": 1,
                      "price": 0,
                      "sdmId": 110005,
                      "selected": 1,
                      "selection_id": 12279,
                      "selectionQty": 1,
                      "sku": 110005,
                      "subOptions": [

                      ],
                      "title": "Mighty Zinger"
                    }
                  ],
                  "subtitle": "Select Your favorite Sandwich",
                  "title": "Select Your favorite Sandwich",
                  "type": "radio"
                },
                {
                  "compId": 1,
                  "imageThumbnail": "/m/e/menumightytwist.png",
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
                      "id": 1719,
                      "imageThumbnail": "/m/e/menuamericancheese.png",
                      "modGroupId": 10028,
                      "name": "American Cheese",
                      "option_id": 1442,
                      "position": 1,
                      "price": 0,
                      "sdmId": 810001,
                      "selected": 1,
                      "selection_id": 0,
                      "selectionQty": 0,
                      "sku": 810001,
                      "subOptions": [
                        {
                          "id": 1717,
                          "modGroupId": 10028,
                          "name": "Regular",
                          "option_id": 1719,
                          "price": 0,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12461,
                          "sku": 810001,
                          "title": "Regular"
                        },
                        {
                          "id": 1718,
                          "modGroupId": 10028,
                          "name": "Extra",
                          "option_id": 1719,
                          "price": 2,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12462,
                          "sku": 810001,
                          "title": "Extra"
                        }
                      ],
                      "title": "American Cheese"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1723,
                      "imageThumbnail": "/m/e/menulettuce.png",
                      "modGroupId": 10027,
                      "name": "Lettuce",
                      "option_id": 1442,
                      "position": 2,
                      "price": 0,
                      "sdmId": 811701,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12463,
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
                          "selection_id": 12464,
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
                      "imageThumbnail": "/imagestemp/itm811703.png",
                      "modGroupId": 10027,
                      "name": "Tomato",
                      "option_id": 1442,
                      "position": 4,
                      "price": 0,
                      "sdmId": 811703,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12465,
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
                          "selection_id": 12466,
                          "sku": 811703,
                          "title": "Extra"
                        }
                      ],
                      "title": "Tomato"
                    }
                  ],
                  "subtitle": "Choose your condiments",
                  "title": "Choose your condiments",
                  "type": "checkbox"
                },
                {
                  "compId": 2,
                  "imageThumbnail": "/m/e/menumightytwist.png",
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
                        4
                      ],
                      "id": 1648,
                      "imageThumbnail": "/m/e/menutwistersandwichoriginal.png",
                      "modGroupId": -1,
                      "name": "Twister Sandwich - Original",
                      "option_id": 1443,
                      "position": 1,
                      "price": 0,
                      "sdmId": 110003,
                      "selected": 1,
                      "selection_id": 11234,
                      "selectionQty": 1,
                      "sku": 110003,
                      "subOptions": [

                      ],
                      "title": "Twister Sandwich - Original"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [
                        4
                      ],
                      "id": 1649,
                      "imageThumbnail": "/m/e/menutwistersandwichoriginal_1.png",
                      "modGroupId": -1,
                      "name": "Twister Sandwich - Spicy",
                      "option_id": 1443,
                      "position": 2,
                      "price": 0,
                      "sdmId": 110002,
                      "selected": 0,
                      "selection_id": 11235,
                      "selectionQty": 1,
                      "sku": 110002,
                      "subOptions": [

                      ],
                      "title": "Twister Sandwich - Spicy"
                    }
                  ],
                  "subtitle": "Select Your Second Sandwich",
                  "title": "Select Your Second Sandwich",
                  "type": "radio"
                },
                {
                  "compId": 2,
                  "imageThumbnail": "/m/e/menumightytwist.png",
                  "ingredient": 1,
                  "isDependent": 1,
                  "isModifier": 1,
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "position": 4,
                  "productLinks": [
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1719,
                      "imageThumbnail": "/m/e/menuamericancheese.png",
                      "modGroupId": 10028,
                      "name": "American Cheese",
                      "option_id": 1615,
                      "position": 1,
                      "price": 0,
                      "sdmId": 810001,
                      "selected": 1,
                      "selection_id": 0,
                      "selectionQty": 0,
                      "sku": 810001,
                      "subOptions": [
                        {
                          "id": 1717,
                          "modGroupId": 10028,
                          "name": "Regular",
                          "option_id": 1719,
                          "price": 0,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12479,
                          "sku": 810001,
                          "title": "Regular"
                        },
                        {
                          "id": 1718,
                          "modGroupId": 10028,
                          "name": "Extra",
                          "option_id": 1719,
                          "price": 2,
                          "product_id": 0,
                          "sdmId": 810001,
                          "selected": 0,
                          "selection_id": 12480,
                          "sku": 810001,
                          "title": "Extra"
                        }
                      ],
                      "title": "American Cheese"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1723,
                      "imageThumbnail": "/m/e/menulettuce.png",
                      "modGroupId": 10027,
                      "name": "Lettuce",
                      "option_id": 1615,
                      "position": 2,
                      "price": 0,
                      "sdmId": 811701,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12481,
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
                          "selection_id": 12482,
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
                      "imageThumbnail": "/imagestemp/itm811703.png",
                      "modGroupId": 10027,
                      "name": "Tomato",
                      "option_id": 1615,
                      "position": 4,
                      "price": 0,
                      "sdmId": 811703,
                      "selected": 0,
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
                          "selected": 0,
                          "selection_id": 12483,
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
                          "selection_id": 12484,
                          "sku": 811703,
                          "title": "Extra"
                        }
                      ],
                      "title": "Tomato"
                    }
                  ],
                  "subtitle": "Choose your condiments",
                  "title": "Choose your condiments",
                  "type": "checkbox"
                },
                {
                  "compId": 3,
                  "imageThumbnail": "/m/e/menumightytwist.png",
                  "ingredient": 0,
                  "isDependent": 0,
                  "isModifier": 0,
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "position": 5,
                  "productLinks": [
                    {
                      "default": 1,
                      "dependentSteps": [

                      ],
                      "id": 1631,
                      "imageThumbnail": "/m/e/menufries.png",
                      "modGroupId": -1,
                      "name": "Large Fries",
                      "option_id": 1444,
                      "position": 1,
                      "price": 0,
                      "sdmId": 510006,
                      "selected": 1,
                      "selection_id": 11236,
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
                      "imageThumbnail": "/imagestemp/itm510001.png",
                      "modGroupId": -1,
                      "name": "Coleslaw Salad Small",
                      "option_id": 1444,
                      "position": 2,
                      "price": 0,
                      "sdmId": 510001,
                      "selected": 0,
                      "selection_id": 11238,
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
                      "imageThumbnail": "/m/e/menufries_1.png",
                      "modGroupId": -1,
                      "name": "Large Fries Spicy",
                      "option_id": 1444,
                      "position": 3,
                      "price": 1,
                      "sdmId": 510013,
                      "selected": 0,
                      "selection_id": 11237,
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
                      "id": 1639,
                      "imageThumbnail": "/m/e/menupotatodipper.png",
                      "modGroupId": -1,
                      "name": "Potato Dipper- Regular",
                      "option_id": 1444,
                      "position": 4,
                      "price": 1,
                      "sdmId": 510071,
                      "selected": 0,
                      "selection_id": 11240,
                      "selectionQty": 1,
                      "sku": 510071,
                      "subOptions": [

                      ],
                      "title": "Potato Dipper- Regular"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1628,
                      "imageThumbnail": "/m/e/menuloadedfries_1.png",
                      "modGroupId": -1,
                      "name": "Loaded Fries Regular",
                      "option_id": 1444,
                      "position": 5,
                      "price": 3,
                      "sdmId": 510036,
                      "selected": 0,
                      "selection_id": 11239,
                      "selectionQty": 1,
                      "sku": 510036,
                      "subOptions": [

                      ],
                      "title": "Loaded Fries Regular"
                    }
                  ],
                  "subtitle": "Select your favorite side item",
                  "title": "Select your favorite side item",
                  "type": "radio"
                },
                {
                  "compId": 4,
                  "imageThumbnail": "/m/e/menumightytwist.png",
                  "ingredient": 0,
                  "isDependent": 0,
                  "isModifier": 0,
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "position": 6,
                  "productLinks": [
                    {
                      "default": 1,
                      "dependentSteps": [

                      ],
                      "id": 1606,
                      "imageThumbnail": "/m/e/menupepsi.png",
                      "modGroupId": -1,
                      "name": "Pepsi Large",
                      "option_id": 1445,
                      "position": 1,
                      "price": 0,
                      "sdmId": 600004,
                      "selected": 1,
                      "selection_id": 11243,
                      "selectionQty": 1,
                      "sku": 600004,
                      "subOptions": [

                      ],
                      "title": "Pepsi Large"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1618,
                      "imageThumbnail": "/m/e/menumirinda.png",
                      "modGroupId": -1,
                      "name": "Mirinda Large",
                      "option_id": 1445,
                      "position": 2,
                      "price": 0,
                      "sdmId": 600010,
                      "selected": 0,
                      "selection_id": 11244,
                      "selectionQty": 1,
                      "sku": 600010,
                      "subOptions": [

                      ],
                      "title": "Mirinda Large"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1610,
                      "imageThumbnail": "/m/e/menu7up_2.png",
                      "modGroupId": -1,
                      "name": "7Up Large",
                      "option_id": 1445,
                      "position": 3,
                      "price": 0,
                      "sdmId": 600017,
                      "selected": 0,
                      "selection_id": 11245,
                      "selectionQty": 1,
                      "sku": 600017,
                      "subOptions": [

                      ],
                      "title": "7Up Large"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1609,
                      "imageThumbnail": "/imagestemp/itm600007.png",
                      "modGroupId": -1,
                      "name": "Diet Pepsi Large",
                      "option_id": 1445,
                      "position": 4,
                      "price": 0,
                      "sdmId": 600007,
                      "selected": 0,
                      "selection_id": 11246,
                      "selectionQty": 1,
                      "sku": 600007,
                      "subOptions": [

                      ],
                      "title": "Diet Pepsi Large"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1615,
                      "imageThumbnail": "/m/e/menumountaindew.png",
                      "modGroupId": -1,
                      "name": "Mountain Dew Large",
                      "option_id": 1445,
                      "position": 5,
                      "price": 0,
                      "sdmId": 600014,
                      "selected": 0,
                      "selection_id": 11247,
                      "selectionQty": 1,
                      "sku": 600014,
                      "subOptions": [

                      ],
                      "title": "Mountain Dew Large"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1652,
                      "imageThumbnail": "/m/e/menusmallaquafina.png",
                      "modGroupId": -1,
                      "name": "Small Aquafina",
                      "option_id": 1445,
                      "position": 6,
                      "price": 0,
                      "sdmId": 610011,
                      "selected": 0,
                      "selection_id": 11249,
                      "selectionQty": 1,
                      "sku": 610011,
                      "subOptions": [

                      ],
                      "title": "Small Aquafina"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1600,
                      "imageThumbnail": "/m/e/menuclassicmojito.png",
                      "modGroupId": -1,
                      "name": "Mojito Krusher",
                      "option_id": 1445,
                      "position": 7,
                      "price": 5.5,
                      "sdmId": 610021,
                      "selected": 0,
                      "selection_id": 11248,
                      "selectionQty": 1,
                      "sku": 610021,
                      "subOptions": [

                      ],
                      "title": "Mojito Krusher"
                    },
                    {
                      "default": 0,
                      "dependentSteps": [

                      ],
                      "id": 1599,
                      "imageThumbnail": "/m/e/menufreshorangejuice.png",
                      "modGroupId": -1,
                      "name": "Fresh Orange Juice",
                      "option_id": 1445,
                      "position": 8,
                      "price": 8.5,
                      "sdmId": 610020,
                      "selected": 0,
                      "selection_id": 11250,
                      "selectionQty": 1,
                      "sku": 610020,
                      "subOptions": [

                      ],
                      "title": "Fresh Orange Juice"
                    }
                  ],
                  "subtitle": "Select your favorite beverage",
                  "title": "Select your favorite beverage",
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
              "id": 1730,
              "image": "/m/e/menumightytwist.png",
              "imageSmall": "/m/e/menumightytwist.png",
              "imageThumbnail": "/m/e/menumightytwist.png",
              "inSide": 1,
              "metaKeyword": [
                "Mighty Twist - Large"
              ],
              "name": "Mighty Twist - Large",
              "position": 5,
              "promoId": 65,
              "sdmId": 71,
              "sel1Value": 16286,
              "sel2Value": -1,
              "sel3Value": -1,
              "selectedItem": 0,
              "sku": 900071,
              "specialPrice": 29.5,
              "taxClassId": 2,
              "title": "Mighty Twist - Large",
              "typeId": "bundle",
              "virtualGroup": 16298,
              "visibility": 4
            }
          ],
          "langMenuId": "En#1",
          "langMenuIdCatId": "En#1#21",
          "langMenuIdCatIdProductId": "En#1#21#16",
          "langMenuIdProductId": "En#1#16",
          "language": "En",
          "menuId": 1,
          "metaKeyword": [
            "Mighty Twist - Medium"
          ],
          "name": "Mighty Twist",
          "originalTypeId": "bundle_group",
          "position": 4,
          "promoId": 65,
          "sdmId": 70,
          "selectedItem": 900015,
          "sellingPrice": 20.5,
          "sku": 900070,
          "specialPrice": 0,
          "taxClassId": 2,
          "typeId": "bundle_group",
          "viewIdentifier": 0,
          "virtualGroup": 16298,
          "visibility": 4
        }
      ],
      "lat": 28.606043,
      "lng": 77.361946,
      "menuUpdatedAt": 15799113260023
    }, { cmsUserRef: 12 })


    let stock: any = [
      {
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [
          {
            "compId": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "ingredient": 1,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 1,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 73,
                "imageThumbnail": "/d/u/dummy-product.png",
                "modGroupId": 10028,
                "name": "American Cheese",
                "option_id": 0,
                "position": 1,
                "price": 0,
                "sdmId": 0,
                "selected": 0,
                "selection_id": 0,
                "selectionQty": 1,
                "sku": 810001,
                "subOptions": [
                  {
                    "id": 218,
                    "modGroupId": 0,
                    "name": "Regular",
                    "option_id": 0,
                    "price": 2,
                    "product_id": 1719,
                    "sdmId": 810001,
                    "selected": 1,
                    "selection_id": 0,
                    "sku": 810001,
                    "title": "Regular"
                  },
                  {
                    "id": 219,
                    "modGroupId": 0,
                    "name": "Extra",
                    "option_id": 0,
                    "price": 4,
                    "product_id": 1719,
                    "sdmId": 810001,
                    "selected": 0,
                    "selection_id": 0,
                    "sku": 810001,
                    "title": "Extra"
                  }
                ],
                "title": "American Cheese"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 74,
                "imageThumbnail": "/d/u/dummy-product.png",
                "modGroupId": 10027,
                "name": "Lettuce",
                "option_id": 0,
                "position": 2,
                "price": 0,
                "sdmId": 0,
                "selected": 1,
                "selection_id": 0,
                "selectionQty": 1,
                "sku": 811701,
                "subOptions": [
                  {
                    "id": 221,
                    "modGroupId": 0,
                    "name": "Regular",
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1723,
                    "sdmId": 811701,
                    "selected": 1,
                    "selection_id": 0,
                    "sku": 811701,
                    "title": "Regular"
                  },
                  {
                    "id": 222,
                    "modGroupId": 0,
                    "name": "Extra",
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1723,
                    "sdmId": 811701,
                    "selected": 0,
                    "selection_id": 0,
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
                "id": 75,
                "imageThumbnail": "/d/u/dummy-product.png",
                "modGroupId": 10027,
                "name": "Tomato",
                "option_id": 0,
                "position": 3,
                "price": 0,
                "sdmId": 0,
                "selected": 0,
                "selection_id": 0,
                "selectionQty": 1,
                "sku": 811703,
                "subOptions": [
                  {
                    "id": 224,
                    "modGroupId": 0,
                    "name": "Regular",
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1727,
                    "sdmId": 811703,
                    "selected": 1,
                    "selection_id": 0,
                    "sku": 811703,
                    "title": "Regular"
                  },
                  {
                    "id": 225,
                    "modGroupId": 0,
                    "name": "Extra",
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1727,
                    "sdmId": 811703,
                    "selected": 0,
                    "selection_id": 0,
                    "sku": 811703,
                    "title": "Extra"
                  }
                ],
                "title": "Tomato"
              }
            ],
            "subtitle": "Choose Your Condiments",
            "title": "Choose Your Condiments",
            "type": "checkbox"
          }
        ],
        "catId": 34,
        "configurableProductOptions": [

        ],
        "description": "",
        "finalPrice": 20,
        "id": 1676,
        "image": "/imagestemp/itm110031.png",
        "imageSmall": "/imagestemp/itm110031.png",
        "imageThumbnail": "/imagestemp/itm110031.png",
        "inSide": 0,
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#34",
        "langMenuIdCatIdProductId": "En#1#34#1676",
        "langMenuIdProductId": "En#1#1676",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "KENTUCKY BURGER ZINGER"
        ],
        "name": "KENTUCKY BURGER ZINGER",
        "originalTypeId": "simple",
        "position": 6,
        "promoId": -1,
        "sdmId": 110031,
        "selectedItem": 0,
        "sellingPrice": 20,
        "sku": 110031,
        "specialPrice": 20,
        "taxClassId": 2,
        "typeId": "bundle",
        "viewIdentifier": 0,
        "virtualGroup": 16298,
        "visibility": 4
      }
    ]
    let Entries = {
      CEntry: []
    }

    stock.forEach(product => {
      let instanceId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      for (let i = 0; i < product.qty; i++) {
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
                  ItemID: 600002,// i.sdmId,
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

    // console.log("Entries", JSON.stringify(Entries))

    await bootstrap(server)
    //   <sdm:Comps>
    //   <arr:KeyValueOfdecimalCCompkckD9yn_P>
    //   <arr:Key>7193</arr:Key>
    //   <arr:Value>
    //              <psor:Amount>{10 percent of the subtotal}</psor:Amount>
    //              <psor:CompID>7193</psor:CompID>
    //  <psor:EnterAmount>{10 percent of the subtotal}</psor:EnterAmount>
    //              <psor:Name>10% W.F. Discount</psor:Name>
    //    </arr:Value>
    //    </arr:KeyValueOfdecimalCCompkckD9yn_P>
    //    </sdm:Comps>
    let order = {
      "licenseCode": "AmericanaWeb",
      "conceptID": 3,
      "order": {
        "AddressID": "10512559",
        "Comps": {
          "KeyValueOfdecimalCCompkckD9yn_P": {
            Key: 7193,
            Value: {
              Amount: "4",
              CompID: 7193,
              EnterAmount: "4",
              Name: "10% W.F. Discount"
            }
          }
        },
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
                    "ItemID": 811701,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Regular",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110031,
              "ModCode": "NONE",
              "Name": "KENTUCKY BURGER ZINGER",
              "QCComponent": -1,
              "QCInstanceID": 191,
              "QCLevel": 0,
              "QCProID": -1
            },
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [
                  {
                    "ID": 0,
                    "ItemID": 811701,
                    "ModCode": "WITH",
                    "ModgroupID": 10027,
                    "Name": "Regular",
                    "OrdrMode": "OM_SAVED",
                    "Weight": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 110031,
              "ModCode": "NONE",
              "Name": "KENTUCKY BURGER ZINGER",
              "QCComponent": -1,
              "QCInstanceID": 191,
              "QCLevel": 0,
              "QCProID": -1
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
    let orderPlaced = await SDM.OrderSDME.createOrder(order)
  } catch (error) {
    console.error(error)
  }
})()
