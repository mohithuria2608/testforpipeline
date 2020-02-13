import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as SDM from './sdm';
import * as ENTITY from './entity';

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    // let a: IMenuGrpcRequest.IFetchMenuRes

    let cI = {
      "cartId": "5e43eb735684ed0de28d6563",
      "couponCode": "",
      "curMenuId": 1,
      "items": [
        {
          "qty": 1,
          "id": 1770,
          "position": 4,
          "name": "9 Pcs Super Bucket",
          "description": "9 chicken pcs + 5 crispy strips + 1 family fries + 1 family coleslaw + 3 buns + 1 L drink",
          "inSide": 1,
          "finalPrice": 79,
          "specialPrice": 79,
          "sellingPrice": 79,
          "catId": 35,
          "promoId": 17,
          "metaKeyword": [
            "9 Pcs Super Bucket"
          ],
          "bundleProductOptions": [
            {
              "position": 1,
              "name": "Choose your favourite flavour",
              "title": "Choose your favourite flavour",
              "subtitle": "Choose your favourite flavour",
              "ingredient": 0,
              "type": "radio",
              "compId": 1,
              "isModifier": 0,
              "imageThumbnail": "/v/r/vrg5000089.png",
              "productLinks": [
                {
                  "position": 1,
                  "option_id": 1631,
                  "selection_id": 12303,
                  "price": 0,
                  "id": 1781,
                  "name": "9  Pcs Super Bucket",
                  "title": "9  Pcs Super Bucket",
                  "imageThumbnail": "/i/t/itm410011.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 1,
                  "sku": 410011,
                  "sdmId": 410011,
                  "default": 1,
                  "modGroupId": -1,
                  "dependentSteps": [2, 3]
                }
              ],
              "maximumQty": 0,
              "minimumQty": 0,
              "isDependent": 0
            },
            {
              "position": 2,
              "name": "Choice your chicken",
              "title": "Choice your chicken",
              "subtitle": "Choice your chicken",
              "ingredient": 0,
              "type": "stepper",
              "compId": 1,
              "isModifier": 1,
              "imageThumbnail": "/v/r/vrg5000089.png",
              "productLinks": [
                {
                  "position": 1,
                  "option_id": 1609,
                  "selection_id": 12242,
                  "price": 0,
                  "id": 1644,
                  "name": "Chicken Pc - Original",
                  "title": "Chicken Pc - Original",
                  "imageThumbnail": "/imagestemp/itm910001.png",
                  "selectionQty": 5,
                  "subOptions": [],
                  "selected": 1,
                  "sku": 910001,
                  "sdmId": 910001,
                  "default": 0,
                  "modGroupId": 10200,
                  "dependentSteps": []
                },
                {
                  "position": 2,
                  "option_id": 1609,
                  "selection_id": 12243,
                  "price": 0,
                  "id": 1645,
                  "name": "Chicken Pc - Spicy",
                  "title": "Chicken Pc - Spicy",
                  "imageThumbnail": "/imagestemp/itm910002.png",
                  "selectionQty": 4,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 910002,
                  "sdmId": 910002,
                  "default": 0,
                  "modGroupId": 10200,
                  "dependentSteps": []
                }
              ],
              "maximumQty": 9,
              "minimumQty": 9,
              "isDependent": 1
            },
            {
              "position": 3,
              "name": "Choice of Strips",
              "title": "Choice of Strips",
              "subtitle": "Choice of Strips",
              "ingredient": 0,
              "type": "stepper",
              "compId": 1,
              "isModifier": 1,
              "imageThumbnail": "/v/r/vrg5000089.png",
              "productLinks": [
                {
                  "position": 1,
                  "option_id": 1610,
                  "selection_id": 12244,
                  "price": 0,
                  "id": 1664,
                  "name": "Crispy Strips Original",
                  "title": "Crispy Strips Original",
                  "imageThumbnail": "/imagestemp/itm511001.png",
                  "selectionQty": 3,
                  "subOptions": [],
                  "selected": 1,
                  "sku": 511001,
                  "sdmId": 511001,
                  "default": 1,
                  "modGroupId": 10208,
                  "dependentSteps": []
                },
                {
                  "position": 2,
                  "option_id": 1610,
                  "selection_id": 12245,
                  "price": 0,
                  "id": 1665,
                  "name": "Crispy Strips Spicy",
                  "title": "Crispy Strips Spicy",
                  "imageThumbnail": "/imagestemp/itm511002.png",
                  "selectionQty": 2,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 511002,
                  "sdmId": 511002,
                  "default": 0,
                  "modGroupId": 10208,
                  "dependentSteps": []
                }
              ],
              "maximumQty": 5,
              "minimumQty": 5,
              "isDependent": 1
            },
            {
              "position": 4,
              "name": "Choice of first side item",
              "title": "Choice of first side item",
              "subtitle": "Choice of first side item",
              "ingredient": 0,
              "type": "radio",
              "compId": 2,
              "isModifier": 0,
              "imageThumbnail": "/v/r/vrg5000089.png",
              "productLinks": [
                {
                  "position": 1,
                  "option_id": 1612,
                  "selection_id": 12254,
                  "price": 0,
                  "id": 1620,
                  "name": "Coleslaw Salad Large",
                  "title": "Coleslaw Salad Large",
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 1,
                  "sku": 510002,
                  "sdmId": 510002,
                  "default": 1,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 2,
                  "option_id": 1612,
                  "selection_id": 12255,
                  "price": 3,
                  "id": 1632,
                  "name": "Family Fries",
                  "title": "Family Fries",
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510005,
                  "sdmId": 510005,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 3,
                  "option_id": 1612,
                  "selection_id": 12256,
                  "price": 6,
                  "id": 1635,
                  "name": "Family Fries Spicy",
                  "title": "Family Fries Spicy",
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510014,
                  "sdmId": 510014,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 4,
                  "option_id": 1612,
                  "selection_id": 12257,
                  "price": 8,
                  "id": 1629,
                  "name": "Loaded Fries Family",
                  "title": "Loaded Fries Family",
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510030,
                  "sdmId": 510030,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 5,
                  "option_id": 1612,
                  "selection_id": 12258,
                  "price": 9,
                  "id": 1638,
                  "name": "Family Dipper Fries",
                  "title": "Family Dipper Fries",
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510074,
                  "sdmId": 510074,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 6,
                  "option_id": 1612,
                  "selection_id": 12259,
                  "price": 15,
                  "id": 1646,
                  "name": "Cheese Potato Dipper Fami",
                  "title": "Cheese Potato Dipper Fami",
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510076,
                  "sdmId": 510076,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                }
              ],
              "maximumQty": 0,
              "minimumQty": 0,
              "isDependent": 0
            },
            {
              "position": 5,
              "name": "Choice of second side item",
              "title": "Choice of second side item",
              "subtitle": "Choice of second side item",
              "ingredient": 0,
              "type": "radio",
              "compId": 3,
              "isModifier": 0,
              "imageThumbnail": "/v/r/vrg5000089.png",
              "productLinks": [
                {
                  "position": 1,
                  "option_id": 1611,
                  "selection_id": 12246,
                  "price": 0,
                  "id": 1632,
                  "name": "Family Fries",
                  "title": "Family Fries",
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 1,
                  "sku": 510005,
                  "sdmId": 510005,
                  "default": 1,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 2,
                  "option_id": 1611,
                  "selection_id": 12247,
                  "price": 3,
                  "id": 1635,
                  "name": "Family Fries Spicy",
                  "title": "Family Fries Spicy",
                  "imageThumbnail": "/imagestemp/itm510014.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510014,
                  "sdmId": 510014,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 3,
                  "option_id": 1611,
                  "selection_id": 12248,
                  "price": 0,
                  "id": 1620,
                  "name": "Coleslaw Salad Large",
                  "title": "Coleslaw Salad Large",
                  "imageThumbnail": "/imagestemp/itm510002.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510002,
                  "sdmId": 510002,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 4,
                  "option_id": 1611,
                  "selection_id": 12249,
                  "price": 5,
                  "id": 1629,
                  "name": "Loaded Fries Family",
                  "title": "Loaded Fries Family",
                  "imageThumbnail": "/imagestemp/itm510030.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510030,
                  "sdmId": 510030,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 5,
                  "option_id": 1611,
                  "selection_id": 12250,
                  "price": 0,
                  "id": 1680,
                  "name": "Chips Large Catering",
                  "title": "Chips Large Catering",
                  "imageThumbnail": "/imagestemp/itm510068.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510068,
                  "sdmId": 510068,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 6,
                  "option_id": 1611,
                  "selection_id": 12251,
                  "price": 6,
                  "id": 1638,
                  "name": "Family Dipper Fries",
                  "title": "Family Dipper Fries",
                  "imageThumbnail": "/imagestemp/itm510074.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510074,
                  "sdmId": 510074,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 7,
                  "option_id": 1611,
                  "selection_id": 12252,
                  "price": 12,
                  "id": 1646,
                  "name": "Cheese Potato Dipper Fami",
                  "title": "Cheese Potato Dipper Fami",
                  "imageThumbnail": "/imagestemp/itm510076.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510076,
                  "sdmId": 510076,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 8,
                  "option_id": 1611,
                  "selection_id": 12253,
                  "price": 5,
                  "id": 1647,
                  "name": "Loaded Fries P.Chili Fami",
                  "title": "Loaded Fries P.Chili Fami",
                  "imageThumbnail": "/imagestemp/itm510080.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 510080,
                  "sdmId": 510080,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                }
              ],
              "maximumQty": 0,
              "minimumQty": 0,
              "isDependent": 0
            },
            {
              "position": 6,
              "name": "Choice of Beverages",
              "title": "Choice of Beverages",
              "subtitle": "Choice of Beverages",
              "ingredient": 0,
              "type": "radio",
              "compId": 4,
              "isModifier": 0,
              "imageThumbnail": "/v/r/vrg5000089.png",
              "productLinks": [
                {
                  "position": 1,
                  "option_id": 1613,
                  "selection_id": 12260,
                  "price": 0,
                  "id": 1681,
                  "name": "Pepsi 2x500ML",
                  "title": "Pepsi 2x500ML",
                  "imageThumbnail": "/imagestemp/itm600040.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 1,
                  "sku": 600040,
                  "sdmId": 600040,
                  "default": 1,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 2,
                  "option_id": 1613,
                  "selection_id": 12261,
                  "price": 0,
                  "id": 1682,
                  "name": "D.Pepsi 2x500ML",
                  "title": "D.Pepsi 2x500ML",
                  "imageThumbnail": "/imagestemp/itm600041.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 600041,
                  "sdmId": 600041,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 3,
                  "option_id": 1613,
                  "selection_id": 12262,
                  "price": 0,
                  "id": 1683,
                  "name": "Mirinda 2x500ML",
                  "title": "Mirinda 2x500ML",
                  "imageThumbnail": "/imagestemp/itm600042.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 600042,
                  "sdmId": 600042,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 4,
                  "option_id": 1613,
                  "selection_id": 12263,
                  "price": 0,
                  "id": 1684,
                  "name": "Mountain Dew 2x500ML",
                  "title": "Mountain Dew 2x500ML",
                  "imageThumbnail": "/imagestemp/itm600043.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 600043,
                  "sdmId": 600043,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 5,
                  "option_id": 1613,
                  "selection_id": 12264,
                  "price": 0,
                  "id": 1685,
                  "name": "7up 2x500ML",
                  "title": "7up 2x500ML",
                  "imageThumbnail": "/imagestemp/itm600044.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 600044,
                  "sdmId": 600044,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                },
                {
                  "position": 6,
                  "option_id": 1613,
                  "selection_id": 12265,
                  "price": 21,
                  "id": 1686,
                  "name": "Orange Juice 1L",
                  "title": "Orange Juice 1L",
                  "imageThumbnail": "/imagestemp/itm610033.png",
                  "selectionQty": 1,
                  "subOptions": [],
                  "selected": 0,
                  "sku": 610033,
                  "sdmId": 610033,
                  "default": 0,
                  "modGroupId": -1,
                  "dependentSteps": []
                }
              ],
              "maximumQty": 0,
              "minimumQty": 0,
              "isDependent": 0
            }
          ],
          "selectedItem": 0,
          "configurableProductOptions": [],
          "typeId": "bundle",
          "originalTypeId": "bundle",
          "items": [],
          "sku": 900058,
          "sdmId": 58,
          "imageSmall": "/d/u/dummy-product.png",
          "imageThumbnail": "/d/u/dummy-product.png",
          "image": "/d/u/dummy-product.png",
          "taxClassId": 2,
          "virtualGroup": 16298,
          "visibility": 4,
          "associative": 0
        }
      ],
      "lat": 0,
      "lng": 0,
      "menuUpdatedAt": 1579911326000,
      "paymentMethodId": 0
    }
    // let a = await ENTITY.CartE.createCartOnCMS(cI)



















    let stock: any = [
      {
        "id": 1770,
        "position": 4,
        "name": "9 Pcs Super Bucket",
        "description": "9 chicken pcs + 5 crispy strips + 1 family fries + 1 family coleslaw + 3 buns + 1 L drink",
        "inSide": 1,
        "finalPrice": 79,
        "specialPrice": 79,
        "catId": 35,
        "promoId": 17,
        "metaKeyword": [
          "9 Pcs Super Bucket"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "name": "Choose your favourite flavour",
            "title": "Choose your favourite flavour",
            "subtitle": "Choose your favourite flavour",
            "ingredient": 0,
            "type": "radio",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/v/r/vrg5000089.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1631,
                "selection_id": 12303,
                "price": 0,
                "id": 1781,
                "name": "9  Pcs Super Bucket",
                "title": "9  Pcs Super Bucket",
                "imageThumbnail": "/i/t/itm410011.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 1,
                "sku": 410011,
                "sdmId": 410011,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 2,
            "name": "Choice your chicken",
            "title": "Choice your chicken",
            "subtitle": "Choice your chicken",
            "ingredient": 0,
            "type": "stepper",
            "compId": 1,
            "isModifier": 1,
            "imageThumbnail": "/v/r/vrg5000089.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1609,
                "selection_id": 12242,
                "price": 0,
                "id": 1644,
                "name": "Chicken Pc - Original",
                "title": "Chicken Pc - Original",
                "imageThumbnail": "/imagestemp/itm910001.png",
                "selectionQty": 5,
                "subOptions": [],
                "selected": 1,
                "sku": 910001,
                "sdmId": 910001,
                "default": 0,
                "modGroupId": 10200,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1609,
                "selection_id": 12243,
                "price": 0,
                "id": 1645,
                "name": "Chicken Pc - Spicy",
                "title": "Chicken Pc - Spicy",
                "imageThumbnail": "/imagestemp/itm910002.png",
                "selectionQty": 4,
                "subOptions": [],
                "selected": 0,
                "sku": 910002,
                "sdmId": 910002,
                "default": 0,
                "modGroupId": 10200,
                "dependentSteps": []
              }
            ],
            "maximumQty": 9,
            "minimumQty": 9,
            "isDependent": 1
          },
          {
            "position": 3,
            "name": "Choice of Strips",
            "title": "Choice of Strips",
            "subtitle": "Choice of Strips",
            "ingredient": 0,
            "type": "stepper",
            "compId": 1,
            "isModifier": 1,
            "imageThumbnail": "/v/r/vrg5000089.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1610,
                "selection_id": 12244,
                "price": 0,
                "id": 1664,
                "name": "Crispy Strips Original",
                "title": "Crispy Strips Original",
                "imageThumbnail": "/imagestemp/itm511001.png",
                "selectionQty": 3,
                "subOptions": [],
                "selected": 1,
                "sku": 511001,
                "sdmId": 511001,
                "default": 1,
                "modGroupId": 10208,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1610,
                "selection_id": 12245,
                "price": 0,
                "id": 1665,
                "name": "Crispy Strips Spicy",
                "title": "Crispy Strips Spicy",
                "imageThumbnail": "/imagestemp/itm511002.png",
                "selectionQty": 2,
                "subOptions": [],
                "selected": 0,
                "sku": 511002,
                "sdmId": 511002,
                "default": 0,
                "modGroupId": 10208,
                "dependentSteps": []
              }
            ],
            "maximumQty": 5,
            "minimumQty": 5,
            "isDependent": 1
          },
          {
            "position": 4,
            "name": "Choice of first side item",
            "title": "Choice of first side item",
            "subtitle": "Choice of first side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 2,
            "isModifier": 0,
            "imageThumbnail": "/v/r/vrg5000089.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1612,
                "selection_id": 12254,
                "price": 0,
                "id": 1620,
                "name": "Coleslaw Salad Large",
                "title": "Coleslaw Salad Large",
                "imageThumbnail": "/imagestemp/itm510002.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 1,
                "sku": 510002,
                "sdmId": 510002,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1612,
                "selection_id": 12255,
                "price": 3,
                "id": 1632,
                "name": "Family Fries",
                "title": "Family Fries",
                "imageThumbnail": "/imagestemp/itm510005.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510005,
                "sdmId": 510005,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 3,
                "option_id": 1612,
                "selection_id": 12256,
                "price": 6,
                "id": 1635,
                "name": "Family Fries Spicy",
                "title": "Family Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510014.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510014,
                "sdmId": 510014,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 4,
                "option_id": 1612,
                "selection_id": 12257,
                "price": 8,
                "id": 1629,
                "name": "Loaded Fries Family",
                "title": "Loaded Fries Family",
                "imageThumbnail": "/imagestemp/itm510030.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510030,
                "sdmId": 510030,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 5,
                "option_id": 1612,
                "selection_id": 12258,
                "price": 9,
                "id": 1638,
                "name": "Family Dipper Fries",
                "title": "Family Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510074.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510074,
                "sdmId": 510074,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 6,
                "option_id": 1612,
                "selection_id": 12259,
                "price": 15,
                "id": 1646,
                "name": "Cheese Potato Dipper Fami",
                "title": "Cheese Potato Dipper Fami",
                "imageThumbnail": "/imagestemp/itm510076.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510076,
                "sdmId": 510076,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 5,
            "name": "Choice of second side item",
            "title": "Choice of second side item",
            "subtitle": "Choice of second side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 3,
            "isModifier": 0,
            "imageThumbnail": "/v/r/vrg5000089.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1611,
                "selection_id": 12246,
                "price": 0,
                "id": 1632,
                "name": "Family Fries",
                "title": "Family Fries",
                "imageThumbnail": "/imagestemp/itm510005.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 1,
                "sku": 510005,
                "sdmId": 510005,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1611,
                "selection_id": 12247,
                "price": 3,
                "id": 1635,
                "name": "Family Fries Spicy",
                "title": "Family Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510014.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510014,
                "sdmId": 510014,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 3,
                "option_id": 1611,
                "selection_id": 12248,
                "price": 0,
                "id": 1620,
                "name": "Coleslaw Salad Large",
                "title": "Coleslaw Salad Large",
                "imageThumbnail": "/imagestemp/itm510002.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510002,
                "sdmId": 510002,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 4,
                "option_id": 1611,
                "selection_id": 12249,
                "price": 5,
                "id": 1629,
                "name": "Loaded Fries Family",
                "title": "Loaded Fries Family",
                "imageThumbnail": "/imagestemp/itm510030.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510030,
                "sdmId": 510030,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 5,
                "option_id": 1611,
                "selection_id": 12250,
                "price": 0,
                "id": 1680,
                "name": "Chips Large Catering",
                "title": "Chips Large Catering",
                "imageThumbnail": "/imagestemp/itm510068.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510068,
                "sdmId": 510068,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 6,
                "option_id": 1611,
                "selection_id": 12251,
                "price": 6,
                "id": 1638,
                "name": "Family Dipper Fries",
                "title": "Family Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510074.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510074,
                "sdmId": 510074,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 7,
                "option_id": 1611,
                "selection_id": 12252,
                "price": 12,
                "id": 1646,
                "name": "Cheese Potato Dipper Fami",
                "title": "Cheese Potato Dipper Fami",
                "imageThumbnail": "/imagestemp/itm510076.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510076,
                "sdmId": 510076,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 8,
                "option_id": 1611,
                "selection_id": 12253,
                "price": 5,
                "id": 1647,
                "name": "Loaded Fries P.Chili Fami",
                "title": "Loaded Fries P.Chili Fami",
                "imageThumbnail": "/imagestemp/itm510080.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 510080,
                "sdmId": 510080,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 6,
            "name": "Choice of Beverages",
            "title": "Choice of Beverages",
            "subtitle": "Choice of Beverages",
            "ingredient": 0,
            "type": "radio",
            "compId": 4,
            "isModifier": 0,
            "imageThumbnail": "/v/r/vrg5000089.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1613,
                "selection_id": 12260,
                "price": 0,
                "id": 1681,
                "name": "Pepsi 2x500ML",
                "title": "Pepsi 2x500ML",
                "imageThumbnail": "/imagestemp/itm600040.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 1,
                "sku": 600040,
                "sdmId": 600040,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 2,
                "option_id": 1613,
                "selection_id": 12261,
                "price": 0,
                "id": 1682,
                "name": "D.Pepsi 2x500ML",
                "title": "D.Pepsi 2x500ML",
                "imageThumbnail": "/imagestemp/itm600041.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 600041,
                "sdmId": 600041,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 3,
                "option_id": 1613,
                "selection_id": 12262,
                "price": 0,
                "id": 1683,
                "name": "Mirinda 2x500ML",
                "title": "Mirinda 2x500ML",
                "imageThumbnail": "/imagestemp/itm600042.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 600042,
                "sdmId": 600042,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 4,
                "option_id": 1613,
                "selection_id": 12263,
                "price": 0,
                "id": 1684,
                "name": "Mountain Dew 2x500ML",
                "title": "Mountain Dew 2x500ML",
                "imageThumbnail": "/imagestemp/itm600043.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 600043,
                "sdmId": 600043,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 5,
                "option_id": 1613,
                "selection_id": 12264,
                "price": 0,
                "id": 1685,
                "name": "7up 2x500ML",
                "title": "7up 2x500ML",
                "imageThumbnail": "/imagestemp/itm600044.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 600044,
                "sdmId": 600044,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              },
              {
                "position": 6,
                "option_id": 1613,
                "selection_id": 12265,
                "price": 21,
                "id": 1686,
                "name": "Orange Juice 1L",
                "title": "Orange Juice 1L",
                "imageThumbnail": "/imagestemp/itm610033.png",
                "selectionQty": 1,
                "subOptions": [],
                "selected": 0,
                "sku": 610033,
                "sdmId": 610033,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": []
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          }
        ],
        "selectedItem": 0,
        "configurableProductOptions": [],
        "typeId": "bundle",
        "originalTypeId": "bundle",
        "items": [],
        "sku": 900058,
        "sdmId": 58,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      }
    ]
    let Entries = {
      CEntry: []
    }

    // let items: any = [stock[0]]
    stock.forEach(product => {
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
                              for (let i = 0; i < plbpopl.selectionQty; i++) {
                                obj.Entries.CEntry.push({
                                  DealID: 0,
                                  ID: 0,
                                  ItemID: plbpopl.sdmId,
                                  ModCode: "NONE",
                                  Name: plbpopl.name,
                                  QCComponent: QCComponent,
                                  QCInstanceID: instanceId,
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
    })


    console.log("Entries", JSON.stringify(Entries))

    await bootstrap(server)

    let order = {
      "AddressID": "10512054",
      "AreaID": "16",
      "BackupStoreID": "2",
      "ConceptID": "3",
      "CustomerID": "7694143",
      "Entries": Entries,
      "OrderMode": "1",
      "OriginalStoreID": "1219",
      "PaidOnline": "0",
      "ServiceCharge": "0.25",
      "Source": "4",
      "Status": "0",
      "StoreID": "1219",
      "SubTotal": "2.75",
      "Total": "3.0",
      "ValidateStore": "1"
    }

    // await SDM.OrderSDME.createOrder(order)

  } catch (error) {
    console.error(error)
  }
})()