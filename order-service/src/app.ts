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
      "cartId": "5e4c365e5a99c29e8015045d",
      "couponCode": "",
      "curMenuId": 1,
      "items": [
        {
          "qty": 1,
          "associative": 0,
          "bundleProductOptions": [
            {
              "compId": 1,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                    2,
                    3
                  ],
                  "id": 1785,
                  "imageThumbnail": "/i/t/itm410013.png",
                  "modGroupId": -1,
                  "name": "21 Pcs Super Bucket",
                  "option_id": 1633,
                  "position": 1,
                  "price": 0,
                  "sdmId": 410013,
                  "selected": 1,
                  "selection_id": 12305,
                  "selectionQty": 1,
                  "sku": 410013,
                  "subOptions": [

                  ],
                  "title": "21 Pcs Super Bucket"
                }
              ],
              "subtitle": "Choose your favourite flavour",
              "title": "Choose your favourite flavour",
              "type": "radio"
            },
            {
              "compId": 1,
              "imageThumbnail": "/v/r/vrg5000087.png",
              "ingredient": 0,
              "isDependent": 1,
              "isModifier": 1,
              "maximumQty": 21,
              "minimumQty": 21,
              "position": 2,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1644,
                  "imageThumbnail": "/imagestemp/itm910001.png",
                  "modGroupId": 10208,
                  "name": "Chicken Pc - Original",
                  "option_id": 1599,
                  "position": 1,
                  "price": 0,
                  "sdmId": 910001,
                  "selected": 1,
                  "selection_id": 12180,
                  "selectionQty": 11,
                  "sku": 910001,
                  "subOptions": [

                  ],
                  "title": "Chicken Pc - Original"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1645,
                  "imageThumbnail": "/imagestemp/itm910002.png",
                  "modGroupId": 10208,
                  "name": "Chicken Pc - Spicy",
                  "option_id": 1599,
                  "position": 2,
                  "price": 0,
                  "sdmId": 910002,
                  "selected": 0,
                  "selection_id": 12181,
                  "selectionQty": 10,
                  "sku": 910002,
                  "subOptions": [

                  ],
                  "title": "Chicken Pc - Spicy"
                }
              ],
              "subtitle": "Choice Of Chicken",
              "title": "Choice Of Chicken",
              "type": "stepper"
            },
            {
              "compId": 1,
              "imageThumbnail": "/v/r/vrg5000087.png",
              "ingredient": 0,
              "isDependent": 1,
              "isModifier": 1,
              "maximumQty": 5,
              "minimumQty": 5,
              "position": 3,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1664,
                  "imageThumbnail": "/imagestemp/itm511001.png",
                  "modGroupId": 10202,
                  "name": "Crispy Strips Original",
                  "option_id": 1600,
                  "position": 1,
                  "price": 0,
                  "sdmId": 511001,
                  "selected": 1,
                  "selection_id": 12182,
                  "selectionQty": 3,
                  "sku": 511001,
                  "subOptions": [

                  ],
                  "title": "Crispy Strips Original"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1665,
                  "imageThumbnail": "/imagestemp/itm511002.png",
                  "modGroupId": 10202,
                  "name": "Crispy Strips Spicy",
                  "option_id": 1600,
                  "position": 2,
                  "price": 0,
                  "sdmId": 511002,
                  "selected": 0,
                  "selection_id": 12183,
                  "selectionQty": 2,
                  "sku": 511002,
                  "subOptions": [

                  ],
                  "title": "Crispy Strips Spicy"
                }
              ],
              "subtitle": "Choice of Strips",
              "title": "Choice of Strips",
              "type": "stepper"
            },
            {
              "compId": 2,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1601,
                  "position": 1,
                  "price": 0,
                  "sdmId": 510005,
                  "selected": 1,
                  "selection_id": 12184,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1601,
                  "position": 2,
                  "price": 3,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12185,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1601,
                  "position": 3,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12186,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1601,
                  "position": 4,
                  "price": 5,
                  "sdmId": 510030,
                  "selected": 0,
                  "selection_id": 12187,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1680,
                  "imageThumbnail": "/imagestemp/itm510068.png",
                  "modGroupId": -1,
                  "name": "Chips Large Catering",
                  "option_id": 1601,
                  "position": 5,
                  "price": 0,
                  "sdmId": 510068,
                  "selected": 0,
                  "selection_id": 12188,
                  "selectionQty": 1,
                  "sku": 510068,
                  "subOptions": [

                  ],
                  "title": "Chips Large Catering"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1601,
                  "position": 6,
                  "price": 6,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12189,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1601,
                  "position": 7,
                  "price": 12,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12190,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1647,
                  "imageThumbnail": "/imagestemp/itm510080.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries P.Chili Fami",
                  "option_id": 1601,
                  "position": 8,
                  "price": 5,
                  "sdmId": 510080,
                  "selected": 0,
                  "selection_id": 12191,
                  "selectionQty": 1,
                  "sku": 510080,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries P.Chili Fami"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1601,
                  "position": 9,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12192,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1601,
                  "position": 10,
                  "price": 3,
                  "sdmId": 510005,
                  "selected": 0,
                  "selection_id": 12193,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1601,
                  "position": 11,
                  "price": 6,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12194,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1601,
                  "position": 12,
                  "price": 8,
                  "sdmId": 510030,
                  "selected": 0,
                  "selection_id": 12195,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1601,
                  "position": 13,
                  "price": 0,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12196,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1601,
                  "position": 14,
                  "price": 15,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12197,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                }
              ],
              "subtitle": "Choice of first side item",
              "title": "Choice of first side item",
              "type": "radio"
            },
            {
              "compId": 3,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1602,
                  "position": 1,
                  "price": 5,
                  "sdmId": 510030,
                  "selected": 1,
                  "selection_id": 12198,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1602,
                  "position": 2,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12199,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1680,
                  "imageThumbnail": "/imagestemp/itm510068.png",
                  "modGroupId": -1,
                  "name": "Chips Large Catering",
                  "option_id": 1602,
                  "position": 3,
                  "price": 0,
                  "sdmId": 510068,
                  "selected": 0,
                  "selection_id": 12200,
                  "selectionQty": 1,
                  "sku": 510068,
                  "subOptions": [

                  ],
                  "title": "Chips Large Catering"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1602,
                  "position": 4,
                  "price": 9,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12201,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1602,
                  "position": 5,
                  "price": 12,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12202,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1647,
                  "imageThumbnail": "/imagestemp/itm510080.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries P.Chili Fami",
                  "option_id": 1602,
                  "position": 6,
                  "price": 5,
                  "sdmId": 510080,
                  "selected": 0,
                  "selection_id": 12203,
                  "selectionQty": 1,
                  "sku": 510080,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries P.Chili Fami"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1602,
                  "position": 7,
                  "price": 0,
                  "sdmId": 510005,
                  "selected": 0,
                  "selection_id": 12204,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1602,
                  "position": 8,
                  "price": 3,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12205,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1602,
                  "position": 9,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12206,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1602,
                  "position": 10,
                  "price": 3,
                  "sdmId": 510005,
                  "selected": 0,
                  "selection_id": 12207,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1602,
                  "position": 11,
                  "price": 6,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12208,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1602,
                  "position": 12,
                  "price": 8,
                  "sdmId": 510030,
                  "selected": 0,
                  "selection_id": 12209,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1602,
                  "position": 13,
                  "price": 0,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12210,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1602,
                  "position": 14,
                  "price": 15,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12211,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                }
              ],
              "subtitle": "Choice of second side item",
              "title": "Choice of second side item",
              "type": "radio"
            },
            {
              "compId": 4,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                  "id": 1689,
                  "imageThumbnail": "/imagestemp/itm610034.png",
                  "modGroupId": -1,
                  "name": "Pepsi 2.25",
                  "option_id": 1603,
                  "position": 1,
                  "price": 0,
                  "sdmId": 610034,
                  "selected": 1,
                  "selection_id": 12212,
                  "selectionQty": 1,
                  "sku": 610034,
                  "subOptions": [

                  ],
                  "title": "Pepsi 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1690,
                  "imageThumbnail": "/imagestemp/itm610035.png",
                  "modGroupId": -1,
                  "name": "7Up  2.25",
                  "option_id": 1603,
                  "position": 2,
                  "price": 0,
                  "sdmId": 610035,
                  "selected": 0,
                  "selection_id": 12213,
                  "selectionQty": 1,
                  "sku": 610035,
                  "subOptions": [

                  ],
                  "title": "7Up  2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1691,
                  "imageThumbnail": "/imagestemp/itm610036.png",
                  "modGroupId": -1,
                  "name": "Mountain Dew 2.25",
                  "option_id": 1603,
                  "position": 3,
                  "price": 0,
                  "sdmId": 610036,
                  "selected": 0,
                  "selection_id": 12214,
                  "selectionQty": 1,
                  "sku": 610036,
                  "subOptions": [

                  ],
                  "title": "Mountain Dew 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1692,
                  "imageThumbnail": "/imagestemp/itm610037.png",
                  "modGroupId": -1,
                  "name": "Diet Pepsi 2.25",
                  "option_id": 1603,
                  "position": 4,
                  "price": 0,
                  "sdmId": 610037,
                  "selected": 0,
                  "selection_id": 12215,
                  "selectionQty": 1,
                  "sku": 610037,
                  "subOptions": [

                  ],
                  "title": "Diet Pepsi 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1693,
                  "imageThumbnail": "/imagestemp/itm610038.png",
                  "modGroupId": -1,
                  "name": "Mirinda 2.25",
                  "option_id": 1603,
                  "position": 5,
                  "price": 0,
                  "sdmId": 610038,
                  "selected": 0,
                  "selection_id": 12216,
                  "selectionQty": 1,
                  "sku": 610038,
                  "subOptions": [

                  ],
                  "title": "Mirinda 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1686,
                  "imageThumbnail": "/imagestemp/itm610033.png",
                  "modGroupId": -1,
                  "name": "Orange Juice 1L",
                  "option_id": 1603,
                  "position": 6,
                  "price": 21,
                  "sdmId": 610033,
                  "selected": 0,
                  "selection_id": 12217,
                  "selectionQty": 1,
                  "sku": 610033,
                  "subOptions": [

                  ],
                  "title": "Orange Juice 1L"
                }
              ],
              "subtitle": "Choice of Beverages",
              "title": "Choice of Beverages",
              "type": "radio"
            }
          ],
          "catId": 35,
          "configurableProductOptions": [

          ],
          "description": "21 chicken pcs + 5 crispy strips + 2 family fries + 2 family coleslaw +7 bun + 2.25 L drink",
          "finalPrice": 135,
          "id": 1768,
          "image": "/v/r/vrg5000087.png",
          "imageSmall": "/v/r/vrg5000087.png",
          "imageThumbnail": "/v/r/vrg5000087.png",
          "inSide": 1,
          "langMenuId": "En#1",
          "langMenuIdCatId": "En#1#35",
          "langMenuIdCatIdProductId": "En#1#35#1768",
          "langMenuIdProductId": "En#1#1768",
          "language": "En",
          "menuId": 1,
          "metaKeyword": [
            "21 Pcs Super Bucket"
          ],
          "name": "21 Pcs Super Bucket",
          "originalTypeId": "bundle",
          "position": 1,
          "sdmId": "118",
          "selectedItem": 0,
          "sellingPrice": 135,
          "sku": 900118,
          "specialPrice": 135,
          "taxClassId": 2,
          "tempBundleProductOptions": [
            {
              "compId": 1,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                    2,
                    3
                  ],
                  "id": 1785,
                  "imageThumbnail": "/i/t/itm410013.png",
                  "modGroupId": -1,
                  "name": "21 Pcs Super Bucket",
                  "option_id": 1633,
                  "position": 1,
                  "price": 0,
                  "sdmId": 410013,
                  "selected": 1,
                  "selection_id": 12305,
                  "selectionQty": 1,
                  "sku": 410013,
                  "subOptions": [

                  ],
                  "title": "21 Pcs Super Bucket"
                }
              ],
              "subtitle": "Choose your favourite flavour",
              "title": "Choose your favourite flavour",
              "type": "radio"
            },
            {
              "compId": 1,
              "imageThumbnail": "/v/r/vrg5000087.png",
              "ingredient": 0,
              "isDependent": 1,
              "isModifier": 1,
              "maximumQty": 21,
              "minimumQty": 21,
              "position": 2,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1644,
                  "imageThumbnail": "/imagestemp/itm910001.png",
                  "modGroupId": 10208,
                  "name": "Chicken Pc - Original",
                  "option_id": 1599,
                  "position": 1,
                  "price": 0,
                  "sdmId": 910001,
                  "selected": 1,
                  "selection_id": 12180,
                  "selectionQty": 11,
                  "sku": 910001,
                  "subOptions": [

                  ],
                  "title": "Chicken Pc - Original"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1645,
                  "imageThumbnail": "/imagestemp/itm910002.png",
                  "modGroupId": 10208,
                  "name": "Chicken Pc - Spicy",
                  "option_id": 1599,
                  "position": 2,
                  "price": 0,
                  "sdmId": 910002,
                  "selected": 0,
                  "selection_id": 12181,
                  "selectionQty": 10,
                  "sku": 910002,
                  "subOptions": [

                  ],
                  "title": "Chicken Pc - Spicy"
                }
              ],
              "subtitle": "Choice Of Chicken",
              "title": "Choice Of Chicken",
              "type": "stepper"
            },
            {
              "compId": 1,
              "imageThumbnail": "/v/r/vrg5000087.png",
              "ingredient": 0,
              "isDependent": 1,
              "isModifier": 1,
              "maximumQty": 5,
              "minimumQty": 5,
              "position": 3,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1664,
                  "imageThumbnail": "/imagestemp/itm511001.png",
                  "modGroupId": 10202,
                  "name": "Crispy Strips Original",
                  "option_id": 1600,
                  "position": 1,
                  "price": 0,
                  "sdmId": 511001,
                  "selected": 1,
                  "selection_id": 12182,
                  "selectionQty": 3,
                  "sku": 511001,
                  "subOptions": [

                  ],
                  "title": "Crispy Strips Original"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1665,
                  "imageThumbnail": "/imagestemp/itm511002.png",
                  "modGroupId": 10202,
                  "name": "Crispy Strips Spicy",
                  "option_id": 1600,
                  "position": 2,
                  "price": 0,
                  "sdmId": 511002,
                  "selected": 0,
                  "selection_id": 12183,
                  "selectionQty": 2,
                  "sku": 511002,
                  "subOptions": [

                  ],
                  "title": "Crispy Strips Spicy"
                }
              ],
              "subtitle": "Choice of Strips",
              "title": "Choice of Strips",
              "type": "stepper"
            },
            {
              "compId": 2,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1601,
                  "position": 1,
                  "price": 0,
                  "sdmId": 510005,
                  "selected": 1,
                  "selection_id": 12184,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1601,
                  "position": 2,
                  "price": 3,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12185,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1601,
                  "position": 3,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12186,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1601,
                  "position": 4,
                  "price": 5,
                  "sdmId": 510030,
                  "selected": 0,
                  "selection_id": 12187,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1680,
                  "imageThumbnail": "/imagestemp/itm510068.png",
                  "modGroupId": -1,
                  "name": "Chips Large Catering",
                  "option_id": 1601,
                  "position": 5,
                  "price": 0,
                  "sdmId": 510068,
                  "selected": 0,
                  "selection_id": 12188,
                  "selectionQty": 1,
                  "sku": 510068,
                  "subOptions": [

                  ],
                  "title": "Chips Large Catering"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1601,
                  "position": 6,
                  "price": 6,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12189,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1601,
                  "position": 7,
                  "price": 12,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12190,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1647,
                  "imageThumbnail": "/imagestemp/itm510080.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries P.Chili Fami",
                  "option_id": 1601,
                  "position": 8,
                  "price": 5,
                  "sdmId": 510080,
                  "selected": 0,
                  "selection_id": 12191,
                  "selectionQty": 1,
                  "sku": 510080,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries P.Chili Fami"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1601,
                  "position": 9,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12192,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1601,
                  "position": 10,
                  "price": 3,
                  "sdmId": 510005,
                  "selected": 0,
                  "selection_id": 12193,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1601,
                  "position": 11,
                  "price": 6,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12194,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1601,
                  "position": 12,
                  "price": 8,
                  "sdmId": 510030,
                  "selected": 0,
                  "selection_id": 12195,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1601,
                  "position": 13,
                  "price": 0,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12196,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1601,
                  "position": 14,
                  "price": 15,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12197,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                }
              ],
              "subtitle": "Choice of first side item",
              "title": "Choice of first side item",
              "type": "radio"
            },
            {
              "compId": 3,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1602,
                  "position": 1,
                  "price": 5,
                  "sdmId": 510030,
                  "selected": 1,
                  "selection_id": 12198,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1602,
                  "position": 2,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12199,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1680,
                  "imageThumbnail": "/imagestemp/itm510068.png",
                  "modGroupId": -1,
                  "name": "Chips Large Catering",
                  "option_id": 1602,
                  "position": 3,
                  "price": 0,
                  "sdmId": 510068,
                  "selected": 0,
                  "selection_id": 12200,
                  "selectionQty": 1,
                  "sku": 510068,
                  "subOptions": [

                  ],
                  "title": "Chips Large Catering"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1602,
                  "position": 4,
                  "price": 9,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12201,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1602,
                  "position": 5,
                  "price": 12,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12202,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1647,
                  "imageThumbnail": "/imagestemp/itm510080.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries P.Chili Fami",
                  "option_id": 1602,
                  "position": 6,
                  "price": 5,
                  "sdmId": 510080,
                  "selected": 0,
                  "selection_id": 12203,
                  "selectionQty": 1,
                  "sku": 510080,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries P.Chili Fami"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1602,
                  "position": 7,
                  "price": 0,
                  "sdmId": 510005,
                  "selected": 0,
                  "selection_id": 12204,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1602,
                  "position": 8,
                  "price": 3,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12205,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1620,
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "modGroupId": -1,
                  "name": "Coleslaw Salad Large",
                  "option_id": 1602,
                  "position": 9,
                  "price": 0,
                  "sdmId": 510002,
                  "selected": 0,
                  "selection_id": 12206,
                  "selectionQty": 1,
                  "sku": 510002,
                  "subOptions": [

                  ],
                  "title": "Coleslaw Salad Large"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "modGroupId": -1,
                  "name": "Family Fries",
                  "option_id": 1602,
                  "position": 10,
                  "price": 3,
                  "sdmId": 510005,
                  "selected": 0,
                  "selection_id": 12207,
                  "selectionQty": 1,
                  "sku": 510005,
                  "subOptions": [

                  ],
                  "title": "Family Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1635,
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "modGroupId": -1,
                  "name": "Family Fries Spicy",
                  "option_id": 1602,
                  "position": 11,
                  "price": 6,
                  "sdmId": 510014,
                  "selected": 0,
                  "selection_id": 12208,
                  "selectionQty": 1,
                  "sku": 510014,
                  "subOptions": [

                  ],
                  "title": "Family Fries Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1629,
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "modGroupId": -1,
                  "name": "Loaded Fries Family",
                  "option_id": 1602,
                  "position": 12,
                  "price": 8,
                  "sdmId": 510030,
                  "selected": 0,
                  "selection_id": 12209,
                  "selectionQty": 1,
                  "sku": 510030,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries Family"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1638,
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "modGroupId": -1,
                  "name": "Family Dipper Fries",
                  "option_id": 1602,
                  "position": 13,
                  "price": 0,
                  "sdmId": 510074,
                  "selected": 0,
                  "selection_id": 12210,
                  "selectionQty": 1,
                  "sku": 510074,
                  "subOptions": [

                  ],
                  "title": "Family Dipper Fries"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1646,
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "modGroupId": -1,
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1602,
                  "position": 14,
                  "price": 15,
                  "sdmId": 510076,
                  "selected": 0,
                  "selection_id": 12211,
                  "selectionQty": 1,
                  "sku": 510076,
                  "subOptions": [

                  ],
                  "title": "Cheese Potato Dipper Fami"
                }
              ],
              "subtitle": "Choice of second side item",
              "title": "Choice of second side item",
              "type": "radio"
            },
            {
              "compId": 4,
              "imageThumbnail": "/v/r/vrg5000087.png",
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
                  "id": 1689,
                  "imageThumbnail": "/imagestemp/itm610034.png",
                  "modGroupId": -1,
                  "name": "Pepsi 2.25",
                  "option_id": 1603,
                  "position": 1,
                  "price": 0,
                  "sdmId": 610034,
                  "selected": 1,
                  "selection_id": 12212,
                  "selectionQty": 1,
                  "sku": 610034,
                  "subOptions": [

                  ],
                  "title": "Pepsi 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1690,
                  "imageThumbnail": "/imagestemp/itm610035.png",
                  "modGroupId": -1,
                  "name": "7Up  2.25",
                  "option_id": 1603,
                  "position": 2,
                  "price": 0,
                  "sdmId": 610035,
                  "selected": 0,
                  "selection_id": 12213,
                  "selectionQty": 1,
                  "sku": 610035,
                  "subOptions": [

                  ],
                  "title": "7Up  2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1691,
                  "imageThumbnail": "/imagestemp/itm610036.png",
                  "modGroupId": -1,
                  "name": "Mountain Dew 2.25",
                  "option_id": 1603,
                  "position": 3,
                  "price": 0,
                  "sdmId": 610036,
                  "selected": 0,
                  "selection_id": 12214,
                  "selectionQty": 1,
                  "sku": 610036,
                  "subOptions": [

                  ],
                  "title": "Mountain Dew 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1692,
                  "imageThumbnail": "/imagestemp/itm610037.png",
                  "modGroupId": -1,
                  "name": "Diet Pepsi 2.25",
                  "option_id": 1603,
                  "position": 4,
                  "price": 0,
                  "sdmId": 610037,
                  "selected": 0,
                  "selection_id": 12215,
                  "selectionQty": 1,
                  "sku": 610037,
                  "subOptions": [

                  ],
                  "title": "Diet Pepsi 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1693,
                  "imageThumbnail": "/imagestemp/itm610038.png",
                  "modGroupId": -1,
                  "name": "Mirinda 2.25",
                  "option_id": 1603,
                  "position": 5,
                  "price": 0,
                  "sdmId": 610038,
                  "selected": 0,
                  "selection_id": 12216,
                  "selectionQty": 1,
                  "sku": 610038,
                  "subOptions": [

                  ],
                  "title": "Mirinda 2.25"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1686,
                  "imageThumbnail": "/imagestemp/itm610033.png",
                  "modGroupId": -1,
                  "name": "Orange Juice 1L",
                  "option_id": 1603,
                  "position": 6,
                  "price": 21,
                  "sdmId": 610033,
                  "selected": 0,
                  "selection_id": 12217,
                  "selectionQty": 1,
                  "sku": 610033,
                  "subOptions": [

                  ],
                  "title": "Orange Juice 1L"
                }
              ],
              "subtitle": "Choice of Beverages",
              "title": "Choice of Beverages",
              "type": "radio"
            }
          ],
          "typeId": "bundle",
          "viewIdentifier": 0,
          "virtualGroup": 16298,
          "visibility": 4
        }
      ],
      "lat": 0,
      "lng": 0,
      "menuUpdatedAt": 1579911326000
    })

    let stock: any = [
      {
        "sdmId": 59,
        "description": "15 chicken pcs + 5 crispy strips + 1 family fries + 1 family coleslaw + 5 bun + 2.25 L drink",
        "position": 3,
        "sku": 900059,
        "bundleProductOptions": [
          {
            "subtitle": "Choose your favourite flavour",
            "position": 1,
            "isDependent": 0,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choose your favourite flavour",
            "productLinks": [
              {
                "id": 1783,
                "sdmId": 410012,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/i/t/itm410012.png",
                "default": 0,
                "sku": 410012,
                "option_id": 1632,
                "price": 0,
                "selection_id": 12304,
                "title": "15 Pcs Super Bucket",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [
                  2,
                  3
                ],
                "selected": 1,
                "name": "15 Pcs Super Bucket"
              }
            ],
            "isModifier": 0,
            "compId": 1,
            "maximumQty": 0,
            "name": "Choose your favourite flavour"
          },
          {
            "subtitle": "Choice of Chicken",
            "position": 2,
            "isDependent": 1,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "minimumQty": 15,
            "type": "stepper",
            "title": "Choice of Chicken",
            "productLinks": [
              {
                "id": 1644,
                "sdmId": 910001,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/itm910001.png",
                "default": 1,
                "sku": 910001,
                "option_id": 1604,
                "price": 0,
                "selection_id": 12218,
                "title": "Chicken Pc - Original",
                "modGroupId": 10201,
                "selectionQty": 8,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Chicken Pc - Original"
              },
              {
                "id": 1645,
                "sdmId": 910002,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/itm910002.png",
                "default": 1,
                "sku": 910002,
                "option_id": 1604,
                "price": 0,
                "selection_id": 12219,
                "title": "Chicken Pc - Spicy",
                "modGroupId": 10201,
                "selectionQty": 7,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Chicken Pc - Spicy"
              }
            ],
            "isModifier": 1,
            "compId": 1,
            "maximumQty": 15,
            "name": "Choice of Chicken"
          },
          {
            "subtitle": "Choice of Strips",
            "position": 3,
            "isDependent": 1,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "minimumQty": 5,
            "type": "stepper",
            "title": "Choice of Strips",
            "productLinks": [
              {
                "id": 1664,
                "sdmId": 511001,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/itm511001.png",
                "default": 1,
                "sku": 511001,
                "option_id": 1605,
                "price": 0,
                "selection_id": 12220,
                "title": "Crispy Strips Original",
                "modGroupId": 10208,
                "selectionQty": 3,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Crispy Strips Original"
              },
              {
                "id": 1665,
                "sdmId": 511002,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/itm511002.png",
                "default": 1,
                "sku": 511002,
                "option_id": 1605,
                "price": 0,
                "selection_id": 12221,
                "title": "Crispy Strips Spicy",
                "modGroupId": 10208,
                "selectionQty": 2,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Crispy Strips Spicy"
              }
            ],
            "isModifier": 1,
            "compId": 1,
            "maximumQty": 5,
            "name": "Choice of Strips"
          },
          {
            "subtitle": "Choice of first side item",
            "position": 4,
            "isDependent": 0,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of first side item",
            "productLinks": [
              {
                "id": 1620,
                "sdmId": 510002,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/itm510002.png",
                "default": 1,
                "sku": 510002,
                "option_id": 1607,
                "price": 0,
                "selection_id": 12230,
                "title": "Coleslaw Salad Large",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Coleslaw Salad Large"
              },
              {
                "id": 1632,
                "sdmId": 510005,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/itm510005.png",
                "default": 0,
                "sku": 510005,
                "option_id": 1607,
                "price": 3,
                "selection_id": 12231,
                "title": "Family Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Family Fries"
              },
              {
                "id": 1635,
                "sdmId": 510014,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/itm510014.png",
                "default": 0,
                "sku": 510014,
                "option_id": 1607,
                "price": 6,
                "selection_id": 12232,
                "title": "Family Fries Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Family Fries Spicy"
              },
              {
                "id": 1629,
                "sdmId": 510030,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/itm510030.png",
                "default": 0,
                "sku": 510030,
                "option_id": 1607,
                "price": 8,
                "selection_id": 12233,
                "title": "Loaded Fries Family",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Loaded Fries Family"
              },
              {
                "id": 1638,
                "sdmId": 510074,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/itm510074.png",
                "default": 0,
                "sku": 510074,
                "option_id": 1607,
                "price": 9,
                "selection_id": 12234,
                "title": "Family Dipper Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Family Dipper Fries"
              },
              {
                "id": 1646,
                "sdmId": 510076,
                "subOptions": [

                ],
                "position": 6,
                "imageThumbnail": "/imagestemp/itm510076.png",
                "default": 0,
                "sku": 510076,
                "option_id": 1607,
                "price": 15,
                "selection_id": 12235,
                "title": "Cheese Potato Dipper Fami",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Cheese Potato Dipper Fami"
              }
            ],
            "isModifier": 0,
            "compId": 2,
            "maximumQty": 0,
            "name": "Choice of first side item"
          },
          {
            "subtitle": "Choice of second side item",
            "position": 5,
            "isDependent": 0,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of second side item",
            "productLinks": [
              {
                "id": 1632,
                "sdmId": 510005,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/itm510005.png",
                "default": 1,
                "sku": 510005,
                "option_id": 1606,
                "price": 0,
                "selection_id": 12222,
                "title": "Family Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Family Fries"
              },
              {
                "id": 1635,
                "sdmId": 510014,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/itm510014.png",
                "default": 0,
                "sku": 510014,
                "option_id": 1606,
                "price": 3,
                "selection_id": 12223,
                "title": "Family Fries Spicy",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Family Fries Spicy"
              },
              {
                "id": 1620,
                "sdmId": 510002,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/itm510002.png",
                "default": 0,
                "sku": 510002,
                "option_id": 1606,
                "price": 0,
                "selection_id": 12224,
                "title": "Coleslaw Salad Large",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Coleslaw Salad Large"
              },
              {
                "id": 1629,
                "sdmId": 510030,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/itm510030.png",
                "default": 0,
                "sku": 510030,
                "option_id": 1606,
                "price": 5,
                "selection_id": 12225,
                "title": "Loaded Fries Family",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Loaded Fries Family"
              },
              {
                "id": 1680,
                "sdmId": 510068,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/itm510068.png",
                "default": 0,
                "sku": 510068,
                "option_id": 1606,
                "price": 0,
                "selection_id": 12226,
                "title": "Chips Large Catering",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Chips Large Catering"
              },
              {
                "id": 1638,
                "sdmId": 510074,
                "subOptions": [

                ],
                "position": 6,
                "imageThumbnail": "/imagestemp/itm510074.png",
                "default": 0,
                "sku": 510074,
                "option_id": 1606,
                "price": 6,
                "selection_id": 12227,
                "title": "Family Dipper Fries",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Family Dipper Fries"
              },
              {
                "id": 1646,
                "sdmId": 510076,
                "subOptions": [

                ],
                "position": 7,
                "imageThumbnail": "/imagestemp/itm510076.png",
                "default": 0,
                "sku": 510076,
                "option_id": 1606,
                "price": 12,
                "selection_id": 12228,
                "title": "Cheese Potato Dipper Fami",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Cheese Potato Dipper Fami"
              },
              {
                "id": 1647,
                "sdmId": 510080,
                "subOptions": [

                ],
                "position": 8,
                "imageThumbnail": "/imagestemp/itm510080.png",
                "default": 0,
                "sku": 510080,
                "option_id": 1606,
                "price": 5,
                "selection_id": 12229,
                "title": "Loaded Fries P.Chili Fami",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Loaded Fries P.Chili Fami"
              }
            ],
            "isModifier": 0,
            "compId": 3,
            "maximumQty": 0,
            "name": "Choice of second side item"
          },
          {
            "subtitle": "Choice of Beverages",
            "position": 6,
            "isDependent": 0,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "minimumQty": 0,
            "type": "radio",
            "title": "Choice of Beverages",
            "productLinks": [
              {
                "id": 1689,
                "sdmId": 610034,
                "subOptions": [

                ],
                "position": 1,
                "imageThumbnail": "/imagestemp/itm610034.png",
                "default": 1,
                "sku": 610034,
                "option_id": 1608,
                "price": 0,
                "selection_id": 12236,
                "title": "Pepsi 2.25",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 1,
                "name": "Pepsi 2.25"
              },
              {
                "id": 1690,
                "sdmId": 610035,
                "subOptions": [

                ],
                "position": 2,
                "imageThumbnail": "/imagestemp/itm610035.png",
                "default": 0,
                "sku": 610035,
                "option_id": 1608,
                "price": 0,
                "selection_id": 12237,
                "title": "7Up  2.25",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "7Up  2.25"
              },
              {
                "id": 1691,
                "sdmId": 610036,
                "subOptions": [

                ],
                "position": 3,
                "imageThumbnail": "/imagestemp/itm610036.png",
                "default": 0,
                "sku": 610036,
                "option_id": 1608,
                "price": 0,
                "selection_id": 12238,
                "title": "Mountain Dew 2.25",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mountain Dew 2.25"
              },
              {
                "id": 1692,
                "sdmId": 610037,
                "subOptions": [

                ],
                "position": 4,
                "imageThumbnail": "/imagestemp/itm610037.png",
                "default": 0,
                "sku": 610037,
                "option_id": 1608,
                "price": 0,
                "selection_id": 12239,
                "title": "Diet Pepsi 2.25",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Diet Pepsi 2.25"
              },
              {
                "id": 1693,
                "sdmId": 610038,
                "subOptions": [

                ],
                "position": 5,
                "imageThumbnail": "/imagestemp/itm610038.png",
                "default": 0,
                "sku": 610038,
                "option_id": 1608,
                "price": 0,
                "selection_id": 12240,
                "title": "Mirinda 2.25",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Mirinda 2.25"
              },
              {
                "id": 1686,
                "sdmId": 610033,
                "subOptions": [

                ],
                "position": 6,
                "imageThumbnail": "/imagestemp/itm610033.png",
                "default": 0,
                "sku": 610033,
                "option_id": 1608,
                "price": 21,
                "selection_id": 12241,
                "title": "Orange Juice 1L",
                "modGroupId": -1,
                "selectionQty": 1,
                "dependentSteps": [

                ],
                "selected": 0,
                "name": "Orange Juice 1L"
              }
            ],
            "isModifier": 0,
            "compId": 4,
            "maximumQty": 0,
            "name": "Choice of Beverages"
          }
        ],
        "image": "/v/r/vrg5000086.png",
        "items": [

        ],
        "imageSmall": "/v/r/vrg5000086.png",
        "catId": 35,
        "visibility": 4,
        "promoId": 31,
        "taxClassId": 2,
        "name": "15 Pcs Super Bucket",
        "id": 1769,
        "specialPrice": 100,
        "configurableProductOptions": [

        ],
        "qty": 1,
        "sellingPrice": 100,
        "originalTypeId": "bundle",
        "associative": 0,
        "metaKeyword": [
          "15 Pcs Super Bucket"
        ],
        "typeId": "bundle",
        "selectedItem": 0,
        "imageThumbnail": "/v/r/vrg5000086.png",
        "virtualGroup": 16298,
        "finalPrice": 100,
        "inSide": 1
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
                                          if (dsplso.selected == 1)
                                            ItemID = dsplso.sdmId
                                        })
                                      }
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
                                  if (bpoplso.selected == 1)
                                    ItemID = bpoplso.sdmId
                                })
                              }
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

    let order = {
      "licenseCode": "AmericanaWeb",
      "conceptID": 3,
      "order": {
        "AddressID": "10512559",
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
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511001,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511001,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511001,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Original",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511002,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511002,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 570,
                    "QCLevel": 0
                  }
                ]
              },
              "ID": 0,
              "ItemID": 410012,
              "ModCode": "NONE",
              "Name": "15 Pcs Super Bucket",
              "QCComponent": 1,
              "QCInstanceID": 570,
              "QCLevel": 0,
              "QCProID": 31
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510002,
              "ModCode": "NONE",
              "Name": "Coleslaw Salad Large",
              "QCComponent": 2,
              "QCInstanceID": 570,
              "QCLevel": 0,
              "QCProID": 31
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510005,
              "ModCode": "NONE",
              "Name": "Family Fries",
              "QCComponent": 3,
              "QCInstanceID": 570,
              "QCLevel": 0,
              "QCProID": 31
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 610034,
              "ModCode": "NONE",
              "Name": "Pepsi 2.25",
              "QCComponent": 4,
              "QCInstanceID": 570,
              "QCLevel": 0,
              "QCProID": 31
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
    // await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: orderPlaced })

  } catch (error) {
    console.error(error)
  }
})()
