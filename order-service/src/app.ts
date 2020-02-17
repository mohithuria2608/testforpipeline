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
          "associative": 0,
          "bundleProductOptions": [
            {
              "imageThumbnail": "/d/u/dummy-product.png",
              "ingredient": 0,
              "isDependent": 0,
              "maximumQty": 12,
              "minimumQty": 12,
              "position": 1,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1642,
                  "imageThumbnail": "/imagestemp/itm413002.png",
                  "name": "Super Mega Deal - Original",
                  "option_id": 1436,
                  "position": 1,
                  "price": 0,
                  "selected": 1,
                  "selection_id": 11190,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Super Mega Deal - Original"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1643,
                  "imageThumbnail": "/imagestemp/itm413003.png",
                  "name": "Super Mega Deal - Spicy",
                  "option_id": 1436,
                  "position": 2,
                  "price": 0,
                  "selected": 0,
                  "selection_id": 11191,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Super Mega Deal - Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [
                    2
                  ],
                  "id": 1709,
                  "imageThumbnail": "/imagestemp/itm413004.png",
                  "name": "Super Mega Deal - Mix",
                  "option_id": 1436,
                  "position": 3,
                  "price": 0,
                  "selected": 0,
                  "selection_id": 11192,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Super Mega Deal - Mix"
                }
              ],
              "subtitle": "Choice of flavor",
              "title": "Choice of flavor",
              "type": "radio"
            },
            {
              "imageThumbnail": "/imagestemp/itm413004.png",
              "ingredient": 0,
              "isDependent": 1,
              "maximumQty": 12,
              "minimumQty": 12,
              "position": 2,
              "productLinks": [
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1644,
                  "name": "Chicken Pc - Original",
                  "option_id": 1437,
                  "position": 0,
                  "price": 0,
                  "selected": 1,
                  "selection_id": 0,
                  "selectionQty": 6,
                  "title": "Chicken Pc - Original"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1645,
                  "name": "Chicken Pc - Spicy",
                  "option_id": 1437,
                  "position": 0,
                  "price": 0,
                  "selected": 0,
                  "selection_id": 0,
                  "selectionQty": 6,
                  "title": "Chicken Pc - Spicy"
                }
              ],
              "subtitle": "Super Mega Deal - Mix",
              "title": "Super Mega Deal - Mix",
              "type": "stepper"
            },
            {
              "imageThumbnail": "/d/u/dummy-product.png",
              "ingredient": 0,
              "isDependent": 0,
              "maximumQty": 0,
              "minimumQty": 0,
              "position": 3,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "name": "Family Fries",
                  "option_id": 1437,
                  "position": 1,
                  "price": 0,
                  "selected": 1,
                  "selection_id": 11193,
                  "selectionQty": 1,
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
                  "name": "Family Fries Spicy",
                  "option_id": 1437,
                  "position": 2,
                  "price": 3,
                  "selected": 0,
                  "selection_id": 11194,
                  "selectionQty": 1,
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
                  "name": "Loaded Fries Family",
                  "option_id": 1437,
                  "position": 3,
                  "price": 5,
                  "selected": 0,
                  "selection_id": 11195,
                  "selectionQty": 1,
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
                  "name": "Family Dipper Fries",
                  "option_id": 1437,
                  "position": 4,
                  "price": 6,
                  "selected": 0,
                  "selection_id": 11196,
                  "selectionQty": 1,
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
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1437,
                  "position": 5,
                  "price": 12,
                  "selected": 0,
                  "selection_id": 11197,
                  "selectionQty": 1,
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
                  "name": "Loaded Fries P.Chili Fami",
                  "option_id": 1437,
                  "position": 6,
                  "price": 5,
                  "selected": 0,
                  "selection_id": 11198,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries P.Chili Fami"
                }
              ],
              "subtitle": "Choice of side item",
              "title": "Choice of side item",
              "type": "radio"
            }
          ],
          "catId": 21,
          "configurableProductOptions": [

          ],
          "description": "12 chicken pcs & Family fries",
          "finalPrice": 49,
          "id": 1728,
          "image": "/d/u/dummy-product.png",
          "imageSmall": "/d/u/dummy-product.png",
          "imageThumbnail": "/d/u/dummy-product.png",
          "inSide": 1,
          "langMenuId": "En#1",
          "langMenuIdCatId": "En#1#21",
          "langMenuIdCatIdProductId": "En#1#21#1728",
          "langMenuIdProductId": "En#1#1728",
          "language": "En",
          "localId": 1,
          "menuId": 1,
          "metaKeyword": [
            "Super Mega Deal"
          ],
          "name": "Super Mega Deal",
          "originalTypeId": "bundle",
          "position": 3,
          "selectedItem": 0,
          "sellingPrice": 49,
          "sku": 900067,
          "specialPrice": 49,
          "taxClassId": 2,
          "tempBundleProductOptions": [
            {
              "imageThumbnail": "/d/u/dummy-product.png",
              "ingredient": 0,
              "isDependent": 0,
              "maximumQty": 12,
              "minimumQty": 12,
              "position": 1,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1642,
                  "imageThumbnail": "/imagestemp/itm413002.png",
                  "name": "Super Mega Deal - Original",
                  "option_id": 1436,
                  "position": 1,
                  "price": 0,
                  "selected": 1,
                  "selection_id": 11190,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Super Mega Deal - Original"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1643,
                  "imageThumbnail": "/imagestemp/itm413003.png",
                  "name": "Super Mega Deal - Spicy",
                  "option_id": 1436,
                  "position": 2,
                  "price": 0,
                  "selected": 0,
                  "selection_id": 11191,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Super Mega Deal - Spicy"
                },
                {
                  "default": 0,
                  "dependentSteps": [
                    2
                  ],
                  "id": 1709,
                  "imageThumbnail": "/imagestemp/itm413004.png",
                  "name": "Super Mega Deal - Mix",
                  "option_id": 1436,
                  "position": 3,
                  "price": 0,
                  "selected": 0,
                  "selection_id": 11192,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Super Mega Deal - Mix"
                }
              ],
              "subtitle": "Choice of flavor",
              "title": "Choice of flavor",
              "type": "radio"
            },
            {
              "imageThumbnail": "/imagestemp/itm413004.png",
              "ingredient": 0,
              "isDependent": 1,
              "maximumQty": 12,
              "minimumQty": 12,
              "position": 2,
              "productLinks": [
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1644,
                  "name": "Chicken Pc - Original",
                  "option_id": 1437,
                  "position": 0,
                  "price": 0,
                  "selected": 1,
                  "selection_id": 0,
                  "selectionQty": 6,
                  "title": "Chicken Pc - Original"
                },
                {
                  "default": 0,
                  "dependentSteps": [

                  ],
                  "id": 1645,
                  "name": "Chicken Pc - Spicy",
                  "option_id": 1437,
                  "position": 0,
                  "price": 0,
                  "selected": 0,
                  "selection_id": 0,
                  "selectionQty": 6,
                  "title": "Chicken Pc - Spicy"
                }
              ],
              "subtitle": "Super Mega Deal - Mix",
              "title": "Super Mega Deal - Mix",
              "type": "stepper"
            },
            {
              "imageThumbnail": "/d/u/dummy-product.png",
              "ingredient": 0,
              "isDependent": 0,
              "maximumQty": 0,
              "minimumQty": 0,
              "position": 3,
              "productLinks": [
                {
                  "default": 1,
                  "dependentSteps": [

                  ],
                  "id": 1632,
                  "imageThumbnail": "/imagestemp/itm510005.png",
                  "name": "Family Fries",
                  "option_id": 1437,
                  "position": 1,
                  "price": 0,
                  "selected": 1,
                  "selection_id": 11193,
                  "selectionQty": 1,
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
                  "name": "Family Fries Spicy",
                  "option_id": 1437,
                  "position": 2,
                  "price": 3,
                  "selected": 0,
                  "selection_id": 11194,
                  "selectionQty": 1,
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
                  "name": "Loaded Fries Family",
                  "option_id": 1437,
                  "position": 3,
                  "price": 5,
                  "selected": 0,
                  "selection_id": 11195,
                  "selectionQty": 1,
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
                  "name": "Family Dipper Fries",
                  "option_id": 1437,
                  "position": 4,
                  "price": 6,
                  "selected": 0,
                  "selection_id": 11196,
                  "selectionQty": 1,
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
                  "name": "Cheese Potato Dipper Fami",
                  "option_id": 1437,
                  "position": 5,
                  "price": 12,
                  "selected": 0,
                  "selection_id": 11197,
                  "selectionQty": 1,
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
                  "name": "Loaded Fries P.Chili Fami",
                  "option_id": 1437,
                  "position": 6,
                  "price": 5,
                  "selected": 0,
                  "selection_id": 11198,
                  "selectionQty": 1,
                  "subOptions": [

                  ],
                  "title": "Loaded Fries P.Chili Fami"
                }
              ],
              "subtitle": "Choice of side item",
              "title": "Choice of side item",
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
      "menuUpdatedAt": 1579911326000,
      "paymentMethodId": 0
    }
    // let a = await ENTITY.CartE.createCartOnCMS(cI)



















    let stock: any = [
      {
        "id": 1658,
        "position": 16,
        "name": "Mighty Original",
        "description": "2 chicken breast fillets with KFC’s, cheese, lettuce, spicy mayo in a round bun",
        "inSide": 0,
        "finalPrice": 18,
        "specialPrice": 18,
        "catId": 34,
        "promoId": -1,
        "metaKeyword": [
          "Mighty Original"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "maximumQty": 0,
            "minimumQty": 0,
            "title": "Choose Your Condiments",
            "name": "Choose Your Condiments",
            "subtitle": "Choose Your Condiments",
            "ingredient": 1,
            "type": "checkbox",
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 0,
                "selection_id": 0,
                "price": 0,
                "id": 79,
                "name": "American Cheese",
                "title": "American Cheese",
                "imageThumbnail": "/d/u/dummy-product.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 0,
                    "selection_id": 0,
                    "price": 2,
                    "selected": 1,
                    "product_id": 1717,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 236,
                    "sku": 8100012,
                    "sdmId": 810001
                  },
                  {
                    "option_id": 0,
                    "selection_id": 0,
                    "price": 4,
                    "selected": 0,
                    "product_id": 1718,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 237,
                    "sku": 8100013,
                    "sdmId": 8100013
                  }
                ],
                modGroupId: 10028,
                "selected": 1,
                "default": 0,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 0,
                "selection_id": 0,
                "price": 0,
                "id": 80,
                "name": "Lettuce",
                "title": "Lettuce",
                "imageThumbnail": "/d/u/dummy-product.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 0,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "product_id": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 239,
                    "sku": 811702,
                    "sdmId": 811702
                  },
                  {
                    "option_id": 0,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "product_id": 1727,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 240,
                    "sku": 811703,
                    "sdmId": 811703
                  }
                ],
                modGroupId: 10027,
                "selected": 1,
                "default": 0,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 0,
                "selection_id": 0,
                "price": 0,
                "id": 81,
                "name": "Tomato",
                "title": "Tomato",
                "imageThumbnail": "/d/u/dummy-product.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 0,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "product_id": 1725,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 242,
                    "sku": 8117032,
                    "sdmId": 811703
                  },
                  {
                    "option_id": 0,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "product_id": 1726,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 243,
                    "sku": 8117033,
                    "sdmId": 811703
                  }
                ],
                modGroupId: 10027,
                "selected": 1,
                "default": 0,
                "dependentSteps": [

                ]
              }
            ],
            "isDependent": 0
          }
        ],
        "selectedItem": 0,
        "configurableProductOptions": [],
        "typeId": "bundle",
        "originalTypeId": "simple",
        "items": [

        ],
        "sku": 110025,
        "sdmId": 110025,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      },

      {
        "id": 1728,
        "position": 3,
        "name": "Super Mega Deal",
        "description": "12 chicken pcs & Family fries",
        "inSide": 1,
        "finalPrice": 49,
        "specialPrice": 49,
        "catId": 21,
        "promoId": -1,
        "metaKeyword": [
          "Super Mega Deal"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "name": "Choice of flavor",
            "title": "Choice of flavor",
            "subtitle": "Choice of flavor",
            "ingredient": 0,
            "type": "radio",
            "compId": -1,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1436,
                "selection_id": 11190,
                "price": 0,
                "id": 1642,
                "name": "Super Mega Deal - Original",
                "title": "Super Mega Deal - Original",
                "imageThumbnail": "/imagestemp/itm413002.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 413002,
                "sdmId": 413002,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1436,
                "selection_id": 11191,
                "price": 0,
                "id": 1643,
                "name": "Super Mega Deal - Spicy",
                "title": "Super Mega Deal - Spicy",
                "imageThumbnail": "/imagestemp/itm413003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 413003,
                "sdmId": 413003,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1436,
                "selection_id": 11192,
                "price": 0,
                "id": 1709,
                "name": "Super Mega Deal - Mix",
                "title": "Super Mega Deal - Mix",
                "imageThumbnail": "/imagestemp/itm413004.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 413004,
                "sdmId": 413004,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [
                  2
                ]
              }
            ],
            "maximumQty": 12,
            "minimumQty": 12,
            "isDependent": 0
          },
          {
            "position": 2,
            "name": "Choice Of Chicken",
            "title": "Choice Of Chicken",
            "subtitle": "Choice Of Chicken",
            "ingredient": 0,
            "type": "stepper",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1628,
                "selection_id": 12288,
                "price": 0,
                "id": 1645,
                "name": "Chicken Pc - Spicy",
                "title": "Chicken Pc - Spicy",
                "imageThumbnail": "/imagestemp/itm910002.png",
                "selectionQty": 6,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 910002,
                "sdmId": 910002,
                "default": 0,
                "modGroupId": 10217,
                "dependentSteps": [
                ]
              },
              {
                "position": 2,
                "option_id": 1628,
                "selection_id": 12289,
                "price": 0,
                "id": 1644,
                "name": "Chicken Pc - Original",
                "title": "Chicken Pc - Original",
                "imageThumbnail": "/imagestemp/itm910001.png",
                "selectionQty": 6,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 910001,
                "sdmId": 910001,
                "default": 0,
                "modGroupId": 10217,
                "dependentSteps": [
                ]
              }
            ],
            "maximumQty": 12,
            "minimumQty": 12,
            "isDependent": 1
          },
          {
            "position": 4,
            "name": "Choice of side item",
            "title": "Choice of side item",
            "subtitle": "Choice of side item",
            "ingredient": 0,
            "type": "radio",
            "compId": -1,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1437,
                "selection_id": 11193,
                "price": 0,
                "id": 1632,
                "name": "Family Fries",
                "title": "Family Fries",
                "imageThumbnail": "/imagestemp/itm510005.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 510005,
                "sdmId": 510005,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1437,
                "selection_id": 11194,
                "price": 3,
                "id": 1635,
                "name": "Family Fries Spicy",
                "title": "Family Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510014.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510014,
                "sdmId": 510014,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1437,
                "selection_id": 11195,
                "price": 5,
                "id": 1629,
                "name": "Loaded Fries Family",
                "title": "Loaded Fries Family",
                "imageThumbnail": "/imagestemp/itm510030.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510030,
                "sdmId": 510030,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1437,
                "selection_id": 11196,
                "price": 6,
                "id": 1638,
                "name": "Family Dipper Fries",
                "title": "Family Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510074.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510074,
                "sdmId": 510074,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1437,
                "selection_id": 11197,
                "price": 12,
                "id": 1646,
                "name": "Cheese Potato Dipper Fami",
                "title": "Cheese Potato Dipper Fami",
                "imageThumbnail": "/imagestemp/itm510076.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510076,
                "sdmId": 510076,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1437,
                "selection_id": 11198,
                "price": 5,
                "id": 1647,
                "name": "Loaded Fries P.Chili Fami",
                "title": "Loaded Fries P.Chili Fami",
                "imageThumbnail": "/imagestemp/itm510080.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510080,
                "sdmId": 510080,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          }
        ],
        "selectedItem": 0,
        "configurableProductOptions": [

        ],
        "typeId": "bundle",
        "originalTypeId": "bundle",
        "items": [

        ],
        "sku": 900067,
        "sdmId": 67,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      },

      {
        "id": 1599,
        "position": 14,
        "name": "Fresh Orange Juice",
        "description": "",
        "inSide": 0,
        "finalPrice": 13,
        "specialPrice": 13,
        "catId": 36,
        "promoId": -1,
        "metaKeyword": [
          "Fresh Orange Juice"
        ],
        "bundleProductOptions": [

        ],
        "selectedItem": 0,
        "configurableProductOptions": [

        ],
        "typeId": "simple",
        "originalTypeId": "simple",
        "items": [

        ],
        "sku": 610020,
        "sdmId": 610020,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 0,
        "visibility": 4,
        "associative": 0
      },

      {
        "id": 18,
        "position": 21,
        "name": "Twister Meal",
        "description": "Twister Sandwich, Fries & Drink",
        "inSide": 1,
        "finalPrice": 18,
        "specialPrice": 0,
        "catId": 0,
        "promoId": -1,
        "metaKeyword": [
          "Twister Meal - Medium"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "name": "Choice of flavor",
            "title": "Choice of flavor",
            "subtitle": "Choice of flavor",
            "ingredient": 0,
            "type": "radio",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1454,
                "selection_id": 11301,
                "price": 0,
                "id": 1648,
                "name": "Twister Sandwich - Original",
                "title": "Twister Sandwich - Original",
                "imageThumbnail": "/imagestemp/itm110003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 110003,
                "sdmId": 110003,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1454,
                "selection_id": 11302,
                "price": 0,
                "id": 1649,
                "name": "Twister Sandwich - Spicy",
                "title": "Twister Sandwich - Spicy",
                "imageThumbnail": "/imagestemp/itm110002.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 110002,
                "sdmId": 110002,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 2,
            "name": "Cheese",
            "title": "Cheese",
            "subtitle": "Cheese",
            "ingredient": 1,
            "type": "checkbox",
            "compId": 2,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1455,
                "selection_id": 11303,
                "price": 2,
                "id": 1719,
                "name": "American Cheese",
                "title": "American Cheese",
                "imageThumbnail": "/imagestemp/itm810001.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1716,
                    "sku": 8100011,
                    "sdmId": 810001,
                    "modGroupId": 10028
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 2,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1717,
                    "sku": 8100012,
                    "sdmId": 810001,
                    "modGroupId": 10028
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 4,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1718,
                    "sku": 8100013,
                    "sdmId": 810001,
                    "modGroupId": 10028
                  }
                ],
                "selected": 1,
                "sku": 810001,
                "sdmId": 810001,
                "default": 0,
                "modGroupId": 10028,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1455,
                "selection_id": 11304,
                "price": 0,
                "id": 1723,
                "name": "Lettuce",
                "title": "Lettuce",
                "imageThumbnail": "/imagestemp/itm811701.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1720,
                    "sku": 8117011,
                    "sdmId": 8117011,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1721,
                    "sku": 8117012,
                    "sdmId": 8117012,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1722,
                    "sku": 8117013,
                    "sdmId": 8117013,
                    "modGroupId": 10027
                  }
                ],
                "selected": 0,
                "sku": 811701,
                "sdmId": 811701,
                "default": 0,
                "modGroupId": 10027,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1455,
                "selection_id": 11305,
                "price": 0,
                "id": 1727,
                "name": "Tomato",
                "title": "Tomato",
                "imageThumbnail": "/imagestemp/itm811703.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1724,
                    "sku": 8117031,
                    "sdmId": 8117031,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1725,
                    "sku": 8117032,
                    "sdmId": 8117032,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1726,
                    "sku": 8117033,
                    "sdmId": 8117033,
                    "modGroupId": 10027
                  }
                ],
                "selected": 0,
                "sku": 811703,
                "sdmId": 811703,
                "default": 0,
                "modGroupId": 10027,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 3,
            "name": "Choice of side item",
            "title": "Choice of side item",
            "subtitle": "Choice of side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 3,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1456,
                "selection_id": 11309,
                "price": 0,
                "id": 1633,
                "name": "Medium Fries",
                "title": "Medium Fries",
                "imageThumbnail": "/imagestemp/itm510050.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 510050,
                "sdmId": 510050,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1456,
                "selection_id": 11310,
                "price": 1,
                "id": 1637,
                "name": "Medium Fries Spicy",
                "title": "Medium Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510051.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510051,
                "sdmId": 510051,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1456,
                "selection_id": 11311,
                "price": 0,
                "id": 1619,
                "name": "Coleslaw Salad Small",
                "title": "Coleslaw Salad Small",
                "imageThumbnail": "/imagestemp/itm510001.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510001,
                "sdmId": 510001,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1456,
                "selection_id": 11312,
                "price": 3,
                "id": 1628,
                "name": "Loaded Fries Regular",
                "title": "Loaded Fries Regular",
                "imageThumbnail": "/imagestemp/itm510036.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510036,
                "sdmId": 510036,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1456,
                "selection_id": 11313,
                "price": 1,
                "id": 1640,
                "name": "Medium Dipper Fries",
                "title": "Medium Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510072.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510072,
                "sdmId": 510072,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1456,
                "selection_id": 11314,
                "price": 5,
                "id": 1650,
                "name": "Cheese Potato Dipper",
                "title": "Cheese Potato Dipper",
                "imageThumbnail": "/imagestemp/itm510075.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510075,
                "sdmId": 510075,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 7,
                "option_id": 1456,
                "selection_id": 11315,
                "price": 3,
                "id": 1651,
                "name": "Loaded Fries P.Chili Reg",
                "title": "Loaded Fries P.Chili Reg",
                "imageThumbnail": "/imagestemp/itm510079.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510079,
                "sdmId": 510079,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 4,
            "name": "Choice of Beverages",
            "title": "Choice of Beverages",
            "subtitle": "Choice of Beverages",
            "ingredient": 0,
            "type": "radio",
            "compId": 4,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1457,
                "selection_id": 11316,
                "price": 0,
                "id": 1605,
                "name": "Pepsi Medium",
                "title": "Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 600003,
                "sdmId": 600003,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1457,
                "selection_id": 11317,
                "price": 0,
                "id": 1617,
                "name": "Mirinda Medium",
                "title": "Mirinda Medium",
                "imageThumbnail": "/imagestemp/itm600009.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600009,
                "sdmId": 600009,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1457,
                "selection_id": 11318,
                "price": 0,
                "id": 1612,
                "name": "7Up Medium",
                "title": "7Up Medium",
                "imageThumbnail": "/imagestemp/itm600016.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600016,
                "sdmId": 600016,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1457,
                "selection_id": 11319,
                "price": 0,
                "id": 1607,
                "name": "Diet Pepsi Medium",
                "title": "Diet Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600006.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600006,
                "sdmId": 600006,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1457,
                "selection_id": 11320,
                "price": 0,
                "id": 1614,
                "name": "Mountain Dew Medium",
                "title": "Mountain Dew Medium",
                "imageThumbnail": "/imagestemp/itm600013.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600013,
                "sdmId": 600013,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1457,
                "selection_id": 11321,
                "price": 7.5,
                "id": 1600,
                "name": "Mojito Krusher",
                "title": "Mojito Krusher",
                "imageThumbnail": "/imagestemp/itm610021.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610021,
                "sdmId": 610021,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 7,
                "option_id": 1457,
                "selection_id": 11322,
                "price": 0,
                "id": 1652,
                "name": "Small Aquafina",
                "title": "Small Aquafina",
                "imageThumbnail": "/imagestemp/itm610011.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610011,
                "sdmId": 610011,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 8,
                "option_id": 1457,
                "selection_id": 11323,
                "price": 8.5,
                "id": 1599,
                "name": "Fresh Orange Juice",
                "title": "Fresh Orange Juice",
                "imageThumbnail": "/imagestemp/itm610020.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610020,
                "sdmId": 610020,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 9,
                "option_id": 1457,
                "selection_id": 11324,
                "price": 3,
                "id": 1655,
                "name": "Lemon Mint Ice Tea",
                "title": "Lemon Mint Ice Tea",
                "imageThumbnail": "/imagestemp/itm610019.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610019,
                "sdmId": 610019,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 10,
                "option_id": 1457,
                "selection_id": 11325,
                "price": 0,
                "id": 1656,
                "name": "Pepsi Can",
                "title": "Pepsi Can",
                "imageThumbnail": "/imagestemp/itm600001.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600001,
                "sdmId": 600001,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 11,
                "option_id": 1457,
                "selection_id": 11326,
                "price": 0,
                "id": 1657,
                "name": "Pepsi 500ML",
                "title": "Pepsi 500ML",
                "imageThumbnail": "/imagestemp/itm610000.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610000,
                "sdmId": 610000,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          }
        ],
        "selectedItem": 900014,
        "configurableProductOptions": [
          {
            "id": 144,
            "position": 1,
            "title": "Choice of Size",
            "subtitle": "Choice of Size",
            "selIndex": 1,
            "options": [
              {
                "isSelected": 1,
                "position": 1,
                "name": "Medium",
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 0,
                "position": 2,
                "name": "Large",
                "title": "Large",
                "id": 16286
              }
            ]
          }
        ],
        "typeId": "bundle_group",
        "originalTypeId": "bundle_group",
        "items": [
          {
            "id": 1733,
            "promoId": 19,
            "position": 21,
            "name": "Twister Meal - Medium",
            "title": "Twister Meal - Medium",
            "description": "",
            "inSide": 1,
            "finalPrice": 18,
            "specialPrice": 18,
            "metaKeyword": [
              "Twister Meal - Medium"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of flavor",
                "title": "Choice of flavor",
                "subtitle": "Choice of flavor",
                "ingredient": 0,
                "type": "radio",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1454,
                    "selection_id": 11301,
                    "price": 0,
                    "id": 1648,
                    "name": "Twister Sandwich - Original",
                    "title": "Twister Sandwich - Original",
                    "imageThumbnail": "/imagestemp/itm110003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 110003,
                    "sdmId": 110003,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1454,
                    "selection_id": 11302,
                    "price": 0,
                    "id": 1649,
                    "name": "Twister Sandwich - Spicy",
                    "title": "Twister Sandwich - Spicy",
                    "imageThumbnail": "/imagestemp/itm110002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 110002,
                    "sdmId": 110002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Cheese",
                "title": "Cheese",
                "subtitle": "Cheese",
                "ingredient": 1,
                "type": "checkbox",
                "compId": 2,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1455,
                    "selection_id": 11303,
                    "price": 2,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1716,
                        "sku": 8100011,
                        "sdmId": 810001,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012,
                        "sdmId": 810001,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013,
                        "sdmId": 810001,
                        "modGroupId": 10028
                      }
                    ],
                    "selected": 1,
                    "sku": 810001,
                    "sdmId": 810001,
                    "default": 0,
                    "modGroupId": 10028,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1455,
                    "selection_id": 11304,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1720,
                        "sku": 8117011,
                        "sdmId": 811701,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012,
                        "sdmId": 811701,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013,
                        "sdmId": 811701,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811701,
                    "sdmId": 811701,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1455,
                    "selection_id": 11305,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1724,
                        "sku": 8117031,
                        "sdmId": 811703,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032,
                        "sdmId": 811703,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033,
                        "sdmId": 811703,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811703,
                    "sdmId": 811703,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 3,
                "name": "Choice of side item",
                "title": "Choice of side item",
                "subtitle": "Choice of side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 3,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1456,
                    "selection_id": 11309,
                    "price": 0,
                    "id": 1633,
                    "name": "Medium Fries",
                    "title": "Medium Fries",
                    "imageThumbnail": "/imagestemp/itm510050.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510050,
                    "sdmId": 510050,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1456,
                    "selection_id": 11310,
                    "price": 1,
                    "id": 1637,
                    "name": "Medium Fries Spicy",
                    "title": "Medium Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510051.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510051,
                    "sdmId": 510051,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1456,
                    "selection_id": 11311,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1456,
                    "selection_id": 11312,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1456,
                    "selection_id": 11313,
                    "price": 1,
                    "id": 1640,
                    "name": "Medium Dipper Fries",
                    "title": "Medium Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510072.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510072,
                    "sdmId": 510072,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1456,
                    "selection_id": 11314,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1456,
                    "selection_id": 11315,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510079,
                    "sdmId": 510079,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choice of Beverages",
                "title": "Choice of Beverages",
                "subtitle": "Choice of Beverages",
                "ingredient": 0,
                "type": "radio",
                "compId": 4,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1457,
                    "selection_id": 11316,
                    "price": 0,
                    "id": 1605,
                    "name": "Pepsi Medium",
                    "title": "Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 600003,
                    "sdmId": 600003,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1457,
                    "selection_id": 11317,
                    "price": 0,
                    "id": 1617,
                    "name": "Mirinda Medium",
                    "title": "Mirinda Medium",
                    "imageThumbnail": "/imagestemp/itm600009.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600009,
                    "sdmId": 600009,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1457,
                    "selection_id": 11318,
                    "price": 0,
                    "id": 1612,
                    "name": "7Up Medium",
                    "title": "7Up Medium",
                    "imageThumbnail": "/imagestemp/itm600016.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600016,
                    "sdmId": 600016,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1457,
                    "selection_id": 11319,
                    "price": 0,
                    "id": 1607,
                    "name": "Diet Pepsi Medium",
                    "title": "Diet Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600006.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600006,
                    "sdmId": 600006,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1457,
                    "selection_id": 11320,
                    "price": 0,
                    "id": 1614,
                    "name": "Mountain Dew Medium",
                    "title": "Mountain Dew Medium",
                    "imageThumbnail": "/imagestemp/itm600013.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600013,
                    "sdmId": 600013,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1457,
                    "selection_id": 11321,
                    "price": 7.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610021,
                    "sdmId": 610021,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1457,
                    "selection_id": 11322,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610011,
                    "sdmId": 610011,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 8,
                    "option_id": 1457,
                    "selection_id": 11323,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610020,
                    "sdmId": 610020,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 9,
                    "option_id": 1457,
                    "selection_id": 11324,
                    "price": 3,
                    "id": 1655,
                    "name": "Lemon Mint Ice Tea",
                    "title": "Lemon Mint Ice Tea",
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610019,
                    "sdmId": 610019,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 10,
                    "option_id": 1457,
                    "selection_id": 11325,
                    "price": 0,
                    "id": 1656,
                    "name": "Pepsi Can",
                    "title": "Pepsi Can",
                    "imageThumbnail": "/imagestemp/itm600001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600001,
                    "sdmId": 600001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 11,
                    "option_id": 1457,
                    "selection_id": 11326,
                    "price": 0,
                    "id": 1657,
                    "name": "Pepsi 500ML",
                    "title": "Pepsi 500ML",
                    "imageThumbnail": "/imagestemp/itm610000.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610000,
                    "sdmId": 610000,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "position": 1,
                "title": "Choice of Size",
                "subtitle": "Choice of Size",
                "selIndex": 1,
                "options": [
                  {
                    "isSelected": 1,
                    "position": 1,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ]
              }
            ],
            "items": [

            ],
            "sku": 900014,
            "sdmId": 14,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": -1,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          },
          {
            "id": 1734,
            "promoId": 19,
            "position": 22,
            "name": "Twister Meal - Large",
            "title": "Twister Meal - Large",
            "description": "",
            "inSide": 1,
            "finalPrice": 19.5,
            "specialPrice": 19.5,
            "metaKeyword": [
              "Twister Meal - Large"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of flavor",
                "title": "Choice of flavor",
                "subtitle": "Choice of flavor",
                "ingredient": 0,
                "type": "radio",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1458,
                    "selection_id": 11327,
                    "price": 0,
                    "id": 1648,
                    "name": "Twister Sandwich - Original",
                    "title": "Twister Sandwich - Original",
                    "imageThumbnail": "/imagestemp/itm110003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 110003,
                    "sdmId": 110003,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1458,
                    "selection_id": 11328,
                    "price": 0,
                    "id": 1649,
                    "name": "Twister Sandwich - Spicy",
                    "title": "Twister Sandwich - Spicy",
                    "imageThumbnail": "/imagestemp/itm110002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 110002,
                    "sdmId": 110002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Cheese",
                "title": "Cheese",
                "subtitle": "Cheese",
                "ingredient": 1,
                "type": "checkbox",
                "compId": 2,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1459,
                    "selection_id": 11329,
                    "price": 2,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1716,
                        "sku": 8100011,
                        "sdmId": 8100011,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012,
                        "sdmId": 8100012,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013,
                        "sdmId": 8100013,
                        "modGroupId": 10028
                      }
                    ],
                    "selected": 1,
                    "sku": 810001,
                    "sdmId": 810001,
                    "default": 0,
                    "modGroupId": 10028,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1459,
                    "selection_id": 11330,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1720,
                        "sku": 8117011,
                        "sdmId": 8117011,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012,
                        "sdmId": 8117012,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013,
                        "sdmId": 8117013,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811701,
                    "sdmId": 811701,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1459,
                    "selection_id": 11331,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1724,
                        "sku": 8117031,
                        "sdmId": 8117031,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032,
                        "sdmId": 8117032,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033,
                        "sdmId": 8117033,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811703,
                    "sdmId": 811703,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 3,
                "name": "Choice of side item",
                "title": "Choice of side item",
                "subtitle": "Choice of side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 3,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1460,
                    "selection_id": 11335,
                    "price": 0,
                    "id": 1631,
                    "name": "Large Fries",
                    "title": "Large Fries",
                    "imageThumbnail": "/imagestemp/itm510006.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510006,
                    "sdmId": 510006,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1460,
                    "selection_id": 11336,
                    "price": 1,
                    "id": 1634,
                    "name": "Large Fries Spicy",
                    "title": "Large Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510013.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510013,
                    "sdmId": 510013,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1460,
                    "selection_id": 11337,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1460,
                    "selection_id": 11338,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1460,
                    "selection_id": 11339,
                    "price": 1,
                    "id": 1641,
                    "name": "Large Dipper Fries",
                    "title": "Large Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510073.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510073,
                    "sdmId": 510073,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1460,
                    "selection_id": 11340,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1460,
                    "selection_id": 11341,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510079,
                    "sdmId": 510079,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choice of Beverages",
                "title": "Choice of Beverages",
                "subtitle": "Choice of Beverages",
                "ingredient": 0,
                "type": "radio",
                "compId": 4,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1461,
                    "selection_id": 11342,
                    "price": 0,
                    "id": 1606,
                    "name": "Pepsi Large",
                    "title": "Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600004.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 600004,
                    "sdmId": 600004,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1461,
                    "selection_id": 11343,
                    "price": 0,
                    "id": 1618,
                    "name": "Mirinda Large",
                    "title": "Mirinda Large",
                    "imageThumbnail": "/imagestemp/itm600010.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600010,
                    "sdmId": 600010,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1461,
                    "selection_id": 11344,
                    "price": 0,
                    "id": 1610,
                    "name": "7Up Large",
                    "title": "7Up Large",
                    "imageThumbnail": "/imagestemp/itm600017.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600017,
                    "sdmId": 600017,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1461,
                    "selection_id": 11345,
                    "price": 0,
                    "id": 1609,
                    "name": "Diet Pepsi Large",
                    "title": "Diet Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600007.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600007,
                    "sdmId": 600007,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1461,
                    "selection_id": 11346,
                    "price": 0,
                    "id": 1615,
                    "name": "Mountain Dew Large",
                    "title": "Mountain Dew Large",
                    "imageThumbnail": "/imagestemp/itm600014.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600014,
                    "sdmId": 600014,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1461,
                    "selection_id": 11347,
                    "price": 7.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610021,
                    "sdmId": 610021,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1461,
                    "selection_id": 11348,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610011,
                    "sdmId": 610011,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 8,
                    "option_id": 1461,
                    "selection_id": 11349,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610020,
                    "sdmId": 610020,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 9,
                    "option_id": 1461,
                    "selection_id": 11350,
                    "price": 3,
                    "id": 1655,
                    "name": "Lemon Mint Ice Tea",
                    "title": "Lemon Mint Ice Tea",
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610019,
                    "sdmId": 610019,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 10,
                    "option_id": 1461,
                    "selection_id": 11351,
                    "price": 0,
                    "id": 1656,
                    "name": "Pepsi Can",
                    "title": "Pepsi Can",
                    "imageThumbnail": "/imagestemp/itm600001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600001,
                    "sdmId": 600001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 11,
                    "option_id": 1461,
                    "selection_id": 11352,
                    "price": 0,
                    "id": 1657,
                    "name": "Pepsi 500ML",
                    "title": "Pepsi 500ML",
                    "imageThumbnail": "/imagestemp/itm610000.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610000,
                    "sdmId": 610000,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "position": 1,
                "title": "Choice of Size",
                "subtitle": "Choice of Size",
                "selIndex": 1,
                "options": [
                  {
                    "isSelected": 1,
                    "position": 1,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ]
              }
            ],
            "items": [

            ],
            "sku": 900015,
            "sdmId": 15,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": -1,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          }
        ],
        "sku": 900014,
        "sdmId": 14,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      },

      {
        "id": 16,
        "position": 4,
        "name": "Mighty Twist",
        "description": "Mighty Zinger + Twister + Fries + Pepsi",
        "inSide": 1,
        "finalPrice": 28,
        "specialPrice": 0,
        "catId": 21,
        "promoId": -1,
        "metaKeyword": [
          "Mighty Twist - Medium"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "name": "Choice of Sandwich",
            "title": "Choice of Sandwich",
            "subtitle": "Choice of Sandwich",
            "ingredient": 0,
            "type": "radio",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1616,
                "selection_id": 12278,
                "price": 0,
                "id": 1659,
                "name": "Mighty Zinger",
                "title": "Mighty Zinger",
                "imageThumbnail": "/imagestemp/itm110005.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 110005,
                "sdmId": 110005,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 2,
            "name": "Cheese",
            "title": "Cheese",
            "subtitle": "Cheese",
            "ingredient": 1,
            "type": "checkbox",
            "compId": 2,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1438,
                "selection_id": 11199,
                "price": 0,
                "id": 1719,
                "name": "American Cheese",
                "title": "American Cheese",
                "imageThumbnail": "/imagestemp/itm810001.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1716,
                    "sku": 8100011,
                    "sdmId": 810001,
                    "modGroupId": 10028
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 2,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1717,
                    "sku": 8100012,
                    "sdmId": 810001,
                    "modGroupId": 10028
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 4,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1718,
                    "sku": 8100013,
                    "sdmId": 810001,
                    "modGroupId": 10028
                  }
                ],
                "selected": 1,
                "sku": 810001,
                "sdmId": 810001,
                "default": 0,
                "modGroupId": 10028,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1438,
                "selection_id": 11200,
                "price": 0,
                "id": 1723,
                "name": "Lettuce",
                "title": "Lettuce",
                "imageThumbnail": "/imagestemp/itm811701.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1720,
                    "sku": 8117011,
                    "sdmId": 811701,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1721,
                    "sku": 8117012,
                    "sdmId": 811701,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1722,
                    "sku": 8117013,
                    "sdmId": 811701,
                    "modGroupId": 10027
                  }
                ],
                "selected": 0,
                "sku": 811701,
                "sdmId": 811701,
                "default": 0,
                "modGroupId": 10027,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1438,
                "selection_id": 11201,
                "price": 0,
                "id": 1727,
                "name": "Tomato",
                "title": "Tomato",
                "imageThumbnail": "/imagestemp/itm811703.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1724,
                    "sku": 8117031,
                    "sdmId": 811703,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1725,
                    "sku": 8117032,
                    "sdmId": 811703,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1726,
                    "sku": 8117033,
                    "sdmId": 811703,
                    "modGroupId": 10027
                  }
                ],
                "selected": 0,
                "sku": 811703,
                "sdmId": 811703,
                "default": 0,
                "modGroupId": 10027,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 3,
            "name": "Choice of Second Sandwich",
            "title": "Choice of Second Sandwich",
            "subtitle": "Choice of Second Sandwich",
            "ingredient": 0,
            "type": "radio",
            "compId": 3,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1439,
                "selection_id": 11208,
                "price": 0,
                "id": 1648,
                "name": "Twister Sandwich - Original",
                "title": "Twister Sandwich - Original",
                "imageThumbnail": "/imagestemp/itm110003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 110003,
                "sdmId": 110003,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1439,
                "selection_id": 11209,
                "price": 0,
                "id": 1649,
                "name": "Twister Sandwich - Spicy",
                "title": "Twister Sandwich - Spicy",
                "imageThumbnail": "/imagestemp/itm110002.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 110002,
                "sdmId": 110002,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 4,
            "name": "Choose Your Condiments",
            "title": "Choose Your Condiments",
            "subtitle": "Choose Your Condiments",
            "ingredient": 0,
            "type": "checkbox",
            "compId": 4,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1614,
                "selection_id": 12268,
                "price": 0,
                "id": 1719,
                "name": "American Cheese",
                "title": "American Cheese",
                "imageThumbnail": "/imagestemp/itm810001.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1716,
                    "sku": 8100011,
                    "sdmId": 8100011,
                    "modGroupId": 10028
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 2,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1717,
                    "sku": 8100012,
                    "sdmId": 8100012,
                    "modGroupId": 10028
                  },
                  {
                    "option_id": 1719,
                    "selection_id": 0,
                    "price": 4,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1718,
                    "sku": 8100013,
                    "sdmId": 8100013,
                    "modGroupId": 10028
                  }
                ],
                "selected": 1,
                "sku": 810001,
                "sdmId": 810001,
                "default": 0,
                "modGroupId": 10028,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1614,
                "selection_id": 12266,
                "price": 0,
                "id": 1727,
                "name": "Tomato",
                "title": "Tomato",
                "imageThumbnail": "/imagestemp/itm811703.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1724,
                    "sku": 8117031,
                    "sdmId": 8117031,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1725,
                    "sku": 8117032,
                    "sdmId": 8117032,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1727,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1726,
                    "sku": 8117033,
                    "sdmId": 8117033,
                    "modGroupId": 10027
                  }
                ],
                "selected": 0,
                "sku": 811703,
                "sdmId": 811703,
                "default": 0,
                "modGroupId": 10027,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1614,
                "selection_id": 12267,
                "price": 0,
                "id": 1723,
                "name": "Lettuce",
                "title": "Lettuce",
                "imageThumbnail": "/imagestemp/itm811701.png",
                "selectionQty": 1,
                "subOptions": [
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "None",
                    "title": "None",
                    "id": 1720,
                    "sku": 8117011,
                    "sdmId": 8117011,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Regular",
                    "title": "Regular",
                    "id": 1721,
                    "sku": 8117012,
                    "sdmId": 8117012,
                    "modGroupId": 10027
                  },
                  {
                    "option_id": 1723,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Extra",
                    "title": "Extra",
                    "id": 1722,
                    "sku": 8117013,
                    "sdmId": 8117013,
                    "modGroupId": 10027
                  }
                ],
                "selected": 0,
                "sku": 811701,
                "sdmId": 811701,
                "default": 0,
                "modGroupId": 10027,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 5,
            "name": "Choice of side item",
            "title": "Choice of side item",
            "subtitle": "Choice of side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 5,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1440,
                "selection_id": 11210,
                "price": 0,
                "id": 1633,
                "name": "Medium Fries",
                "title": "Medium Fries",
                "imageThumbnail": "/imagestemp/itm510050.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 510050,
                "sdmId": 510050,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1440,
                "selection_id": 11211,
                "price": 1,
                "id": 1637,
                "name": "Medium Fries Spicy",
                "title": "Medium Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510051.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510051,
                "sdmId": 510051,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1440,
                "selection_id": 11212,
                "price": 0,
                "id": 1619,
                "name": "Coleslaw Salad Small",
                "title": "Coleslaw Salad Small",
                "imageThumbnail": "/imagestemp/itm510001.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510001,
                "sdmId": 510001,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1440,
                "selection_id": 11213,
                "price": 3,
                "id": 1628,
                "name": "Loaded Fries Regular",
                "title": "Loaded Fries Regular",
                "imageThumbnail": "/imagestemp/itm510036.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510036,
                "sdmId": 510036,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1440,
                "selection_id": 11214,
                "price": 1,
                "id": 1639,
                "name": "Potato Dipper- Regular",
                "title": "Potato Dipper- Regular",
                "imageThumbnail": "/imagestemp/itm510071.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510071,
                "sdmId": 510071,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1440,
                "selection_id": 11215,
                "price": 5,
                "id": 1650,
                "name": "Cheese Potato Dipper",
                "title": "Cheese Potato Dipper",
                "imageThumbnail": "/imagestemp/itm510075.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510075,
                "sdmId": 510075,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 7,
                "option_id": 1440,
                "selection_id": 11216,
                "price": 3,
                "id": 1651,
                "name": "Loaded Fries P.Chili Reg",
                "title": "Loaded Fries P.Chili Reg",
                "imageThumbnail": "/imagestemp/itm510079.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510079,
                "sdmId": 510079,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
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
            "compId": 6,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1441,
                "selection_id": 11217,
                "price": 0,
                "id": 1605,
                "name": "Pepsi Medium",
                "title": "Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 600003,
                "sdmId": 600003,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1441,
                "selection_id": 11218,
                "price": 0,
                "id": 1617,
                "name": "Mirinda Medium",
                "title": "Mirinda Medium",
                "imageThumbnail": "/imagestemp/itm600009.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600009,
                "sdmId": 600009,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1441,
                "selection_id": 11219,
                "price": 0,
                "id": 1612,
                "name": "7Up Medium",
                "title": "7Up Medium",
                "imageThumbnail": "/imagestemp/itm600016.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600016,
                "sdmId": 600016,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1441,
                "selection_id": 11220,
                "price": 0,
                "id": 1607,
                "name": "Diet Pepsi Medium",
                "title": "Diet Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600006.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600006,
                "sdmId": 600006,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1441,
                "selection_id": 11221,
                "price": 0,
                "id": 1614,
                "name": "Mountain Dew Medium",
                "title": "Mountain Dew Medium",
                "imageThumbnail": "/imagestemp/itm600013.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600013,
                "sdmId": 600013,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1441,
                "selection_id": 11222,
                "price": 5.5,
                "id": 1600,
                "name": "Mojito Krusher",
                "title": "Mojito Krusher",
                "imageThumbnail": "/imagestemp/itm610021.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610021,
                "sdmId": 610021,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 7,
                "option_id": 1441,
                "selection_id": 11223,
                "price": 0,
                "id": 1652,
                "name": "Small Aquafina",
                "title": "Small Aquafina",
                "imageThumbnail": "/imagestemp/itm610011.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610011,
                "sdmId": 610011,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 8,
                "option_id": 1441,
                "selection_id": 11224,
                "price": 8.5,
                "id": 1599,
                "name": "Fresh Orange Juice",
                "title": "Fresh Orange Juice",
                "imageThumbnail": "/imagestemp/itm610020.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610020,
                "sdmId": 610020,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          }
        ],
        "selectedItem": 900070,
        "configurableProductOptions": [
          {
            "id": 144,
            "position": 1,
            "title": "Choice of Size",
            "subtitle": "Choice of Size",
            "selIndex": 1,
            "options": [
              {
                "isSelected": 1,
                "position": 1,
                "name": "Medium",
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 0,
                "position": 2,
                "name": "Large",
                "title": "Large",
                "id": 16286
              }
            ]
          }
        ],
        "typeId": "bundle_group",
        "originalTypeId": "bundle_group",
        "items": [
          {
            "id": 1729,
            "promoId": 65,
            "position": 4,
            "name": "Mighty Twist - Medium",
            "title": "Mighty Twist - Medium",
            "description": "",
            "inSide": 1,
            "finalPrice": 28,
            "specialPrice": 28,
            "metaKeyword": [
              "Mighty Twist - Medium"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of Sandwich",
                "title": "Choice of Sandwich",
                "subtitle": "Choice of Sandwich",
                "ingredient": 0,
                "type": "radio",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1616,
                    "selection_id": 12278,
                    "price": 0,
                    "id": 1659,
                    "name": "Mighty Zinger",
                    "title": "Mighty Zinger",
                    "imageThumbnail": "/imagestemp/itm110005.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 110005,
                    "sdmId": 110005,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Cheese",
                "title": "Cheese",
                "subtitle": "Cheese",
                "ingredient": 1,
                "type": "checkbox",
                "compId": 2,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1438,
                    "selection_id": 11199,
                    "price": 0,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1716,
                        "sku": 8100011,
                        "sdmId": 810001,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012,
                        "sdmId": 810001,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013,
                        "sdmId": 810001,
                        "modGroupId": 10028
                      }
                    ],
                    "selected": 1,
                    "sku": 810001,
                    "sdmId": 810001,
                    "default": 0,
                    "modGroupId": 10028,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1438,
                    "selection_id": 11200,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1720,
                        "sku": 8117011,
                        "sdmId": 811701,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012,
                        "sdmId": 811701,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013,
                        "sdmId": 811701,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811701,
                    "sdmId": 811701,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1438,
                    "selection_id": 11201,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1724,
                        "sku": 8117031,
                        "sdmId": 811703,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032,
                        "sdmId": 811703,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033,
                        "sdmId": 811703,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811703,
                    "sdmId": 811703,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 3,
                "name": "Choice of Second Sandwich",
                "title": "Choice of Second Sandwich",
                "subtitle": "Choice of Second Sandwich",
                "ingredient": 0,
                "type": "radio",
                "compId": 3,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1439,
                    "selection_id": 11208,
                    "price": 0,
                    "id": 1648,
                    "name": "Twister Sandwich - Original",
                    "title": "Twister Sandwich - Original",
                    "imageThumbnail": "/imagestemp/itm110003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 110003,
                    "sdmId": 110003,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1439,
                    "selection_id": 11209,
                    "price": 0,
                    "id": 1649,
                    "name": "Twister Sandwich - Spicy",
                    "title": "Twister Sandwich - Spicy",
                    "imageThumbnail": "/imagestemp/itm110002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 110002,
                    "sdmId": 110002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choose Your Condiments",
                "title": "Choose Your Condiments",
                "subtitle": "Choose Your Condiments",
                "ingredient": 0,
                "type": "checkbox",
                "compId": 4,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1614,
                    "selection_id": 12268,
                    "price": 0,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1716,
                        "sku": 8100011,
                        "sdmId": 8100011,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012,
                        "sdmId": 8100012,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013,
                        "sdmId": 8100013,
                        "modGroupId": 10028
                      }
                    ],
                    "selected": 1,
                    "sku": 810001,
                    "sdmId": 810001,
                    "default": 0,
                    "modGroupId": 10028,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1614,
                    "selection_id": 12266,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1724,
                        "sku": 8117031,
                        "sdmId": 8117031,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032,
                        "sdmId": 8117032,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033,
                        "sdmId": 8117033,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811703,
                    "sdmId": 811703,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1614,
                    "selection_id": 12267,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1720,
                        "sku": 8117011,
                        "sdmId": 8117011,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012,
                        "sdmId": 8117012,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013,
                        "sdmId": 8117013,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811701,
                    "sdmId": 811701,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 5,
                "name": "Choice of side item",
                "title": "Choice of side item",
                "subtitle": "Choice of side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 5,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1440,
                    "selection_id": 11210,
                    "price": 0,
                    "id": 1633,
                    "name": "Medium Fries",
                    "title": "Medium Fries",
                    "imageThumbnail": "/imagestemp/itm510050.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510050,
                    "sdmId": 510050,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1440,
                    "selection_id": 11211,
                    "price": 1,
                    "id": 1637,
                    "name": "Medium Fries Spicy",
                    "title": "Medium Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510051.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510051,
                    "sdmId": 510051,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1440,
                    "selection_id": 11212,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1440,
                    "selection_id": 11213,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1440,
                    "selection_id": 11214,
                    "price": 1,
                    "id": 1639,
                    "name": "Potato Dipper- Regular",
                    "title": "Potato Dipper- Regular",
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510071,
                    "sdmId": 510071,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1440,
                    "selection_id": 11215,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1440,
                    "selection_id": 11216,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510079,
                    "sdmId": 510079,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
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
                "compId": 6,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1441,
                    "selection_id": 11217,
                    "price": 0,
                    "id": 1605,
                    "name": "Pepsi Medium",
                    "title": "Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 600003,
                    "sdmId": 600003,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1441,
                    "selection_id": 11218,
                    "price": 0,
                    "id": 1617,
                    "name": "Mirinda Medium",
                    "title": "Mirinda Medium",
                    "imageThumbnail": "/imagestemp/itm600009.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600009,
                    "sdmId": 600009,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1441,
                    "selection_id": 11219,
                    "price": 0,
                    "id": 1612,
                    "name": "7Up Medium",
                    "title": "7Up Medium",
                    "imageThumbnail": "/imagestemp/itm600016.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600016,
                    "sdmId": 600016,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1441,
                    "selection_id": 11220,
                    "price": 0,
                    "id": 1607,
                    "name": "Diet Pepsi Medium",
                    "title": "Diet Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600006.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600006,
                    "sdmId": 600006,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1441,
                    "selection_id": 11221,
                    "price": 0,
                    "id": 1614,
                    "name": "Mountain Dew Medium",
                    "title": "Mountain Dew Medium",
                    "imageThumbnail": "/imagestemp/itm600013.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600013,
                    "sdmId": 600013,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1441,
                    "selection_id": 11222,
                    "price": 5.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610021,
                    "sdmId": 610021,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1441,
                    "selection_id": 11223,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610011,
                    "sdmId": 610011,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 8,
                    "option_id": 1441,
                    "selection_id": 11224,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610020,
                    "sdmId": 610020,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "position": 1,
                "title": "Choice of Size",
                "subtitle": "Choice of Size",
                "selIndex": 1,
                "options": [
                  {
                    "isSelected": 1,
                    "position": 1,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ]
              }
            ],
            "items": [

            ],
            "sku": 900070,
            "sdmId": 70,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": -1,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          },
          {
            "id": 1730,
            "promoId": 65,
            "position": 5,
            "name": "Mighty Twist - Large",
            "title": "Mighty Twist - Large",
            "description": "",
            "inSide": 1,
            "finalPrice": 29.5,
            "specialPrice": 29.5,
            "metaKeyword": [
              "Mighty Twist - Large"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of Sandwich",
                "title": "Choice of Sandwich",
                "subtitle": "Choice of Sandwich",
                "ingredient": 0,
                "type": "radio",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1617,
                    "selection_id": 12279,
                    "price": 0,
                    "id": 1659,
                    "name": "Mighty Zinger",
                    "title": "Mighty Zinger",
                    "imageThumbnail": "/imagestemp/itm110005.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 110005,
                    "sdmId": 110005,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Cheese",
                "title": "Cheese",
                "subtitle": "Cheese",
                "ingredient": 1,
                "type": "checkbox",
                "compId": 2,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1442,
                    "selection_id": 11225,
                    "price": 2,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1716,
                        "sku": 8100011,
                        "sdmId": 8100011,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012,
                        "sdmId": 8100012,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013,
                        "sdmId": 8100013,
                        "modGroupId": 10028
                      }
                    ],
                    "selected": 1,
                    "sku": 810001,
                    "sdmId": 810001,
                    "default": 0,
                    "modGroupId": 10028,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1442,
                    "selection_id": 11226,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1720,
                        "sku": 8117011,
                        "sdmId": 8117011,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012,
                        "sdmId": 8117012,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013,
                        "sdmId": 8117013,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811701,
                    "sdmId": 811701,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1442,
                    "selection_id": 11227,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1724,
                        "sku": 8117031,
                        "sdmId": 8117031,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032,
                        "sdmId": 8117032,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033,
                        "sdmId": 8117033,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811703,
                    "sdmId": 811703,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 3,
                "name": "Choice of Second Sandwich",
                "title": "Choice of Second Sandwich",
                "subtitle": "Choice of Second Sandwich",
                "ingredient": 0,
                "type": "radio",
                "compId": 3,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1443,
                    "selection_id": 11234,
                    "price": 0,
                    "id": 1648,
                    "name": "Twister Sandwich - Original",
                    "title": "Twister Sandwich - Original",
                    "imageThumbnail": "/imagestemp/itm110003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 110003,
                    "sdmId": 110003,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1443,
                    "selection_id": 11235,
                    "price": 0,
                    "id": 1649,
                    "name": "Twister Sandwich - Spicy",
                    "title": "Twister Sandwich - Spicy",
                    "imageThumbnail": "/imagestemp/itm110002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 110002,
                    "sdmId": 110002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Cheese",
                "title": "Cheese",
                "subtitle": "Cheese",
                "ingredient": 1,
                "type": "checkbox",
                "compId": 4,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1615,
                    "selection_id": 12271,
                    "price": 2,
                    "id": 1719,
                    "name": "American Cheese",
                    "title": "American Cheese",
                    "imageThumbnail": "/imagestemp/itm810001.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1716,
                        "sku": 8100011,
                        "sdmId": 8100011,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 2,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1717,
                        "sku": 8100012,
                        "sdmId": 8100012,
                        "modGroupId": 10028
                      },
                      {
                        "option_id": 1719,
                        "selection_id": 0,
                        "price": 4,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1718,
                        "sku": 8100013,
                        "sdmId": 8100013,
                        "modGroupId": 10028
                      }
                    ],
                    "selected": 1,
                    "sku": 810001,
                    "sdmId": 810001,
                    "default": 0,
                    "modGroupId": 10028,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1615,
                    "selection_id": 12269,
                    "price": 0,
                    "id": 1727,
                    "name": "Tomato",
                    "title": "Tomato",
                    "imageThumbnail": "/imagestemp/itm811703.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1724,
                        "sku": 8117031,
                        "sdmId": 8117031,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1725,
                        "sku": 8117032,
                        "sdmId": 8117032,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1727,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1726,
                        "sku": 8117033,
                        "sdmId": 8117033,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811703,
                    "sdmId": 811703,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1615,
                    "selection_id": 12270,
                    "price": 0,
                    "id": 1723,
                    "name": "Lettuce",
                    "title": "Lettuce",
                    "imageThumbnail": "/imagestemp/itm811701.png",
                    "selectionQty": 1,
                    "subOptions": [
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 1,
                        "name": "None",
                        "title": "None",
                        "id": 1720,
                        "sku": 8117011,
                        "sdmId": 8117011,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Regular",
                        "title": "Regular",
                        "id": 1721,
                        "sku": 8117012,
                        "sdmId": 8117012,
                        "modGroupId": 10027
                      },
                      {
                        "option_id": 1723,
                        "selection_id": 0,
                        "price": 0,
                        "selected": 0,
                        "name": "Extra",
                        "title": "Extra",
                        "id": 1722,
                        "sku": 8117013,
                        "sdmId": 8117013,
                        "modGroupId": 10027
                      }
                    ],
                    "selected": 0,
                    "sku": 811701,
                    "sdmId": 811701,
                    "default": 0,
                    "modGroupId": 10027,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 5,
                "name": "Choice of side item",
                "title": "Choice of side item",
                "subtitle": "Choice of side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 5,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1444,
                    "selection_id": 11236,
                    "price": 0,
                    "id": 1631,
                    "name": "Large Fries",
                    "title": "Large Fries",
                    "imageThumbnail": "/imagestemp/itm510006.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510006,
                    "sdmId": 510006,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1444,
                    "selection_id": 11237,
                    "price": 1,
                    "id": 1634,
                    "name": "Large Fries Spicy",
                    "title": "Large Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510013.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510013,
                    "sdmId": 510013,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1444,
                    "selection_id": 11238,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1444,
                    "selection_id": 11239,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1444,
                    "selection_id": 11240,
                    "price": 1,
                    "id": 1639,
                    "name": "Potato Dipper- Regular",
                    "title": "Potato Dipper- Regular",
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510071,
                    "sdmId": 510071,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1444,
                    "selection_id": 11241,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1444,
                    "selection_id": 11242,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510079,
                    "sdmId": 510079,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
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
                "compId": 6,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1445,
                    "selection_id": 11243,
                    "price": 0,
                    "id": 1606,
                    "name": "Pepsi Large",
                    "title": "Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600004.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 600004,
                    "sdmId": 600004,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1445,
                    "selection_id": 11244,
                    "price": 0,
                    "id": 1618,
                    "name": "Mirinda Large",
                    "title": "Mirinda Large",
                    "imageThumbnail": "/imagestemp/itm600010.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600010,
                    "sdmId": 600010,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1445,
                    "selection_id": 11245,
                    "price": 0,
                    "id": 1610,
                    "name": "7Up Large",
                    "title": "7Up Large",
                    "imageThumbnail": "/imagestemp/itm600017.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600017,
                    "sdmId": 600017,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1445,
                    "selection_id": 11246,
                    "price": 0,
                    "id": 1609,
                    "name": "Diet Pepsi Large",
                    "title": "Diet Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600007.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600007,
                    "sdmId": 600007,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1445,
                    "selection_id": 11247,
                    "price": 0,
                    "id": 1615,
                    "name": "Mountain Dew Large",
                    "title": "Mountain Dew Large",
                    "imageThumbnail": "/imagestemp/itm600014.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600014,
                    "sdmId": 600014,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1445,
                    "selection_id": 11248,
                    "price": 5.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610021,
                    "sdmId": 610021,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1445,
                    "selection_id": 11249,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610011,
                    "sdmId": 610011,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 8,
                    "option_id": 1445,
                    "selection_id": 11250,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610020,
                    "sdmId": 610020,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "position": 1,
                "title": "Choice of Size",
                "subtitle": "Choice of Size",
                "selIndex": 1,
                "options": [
                  {
                    "isSelected": 1,
                    "position": 1,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ]
              }
            ],
            "items": [

            ],
            "sku": 900071,
            "sdmId": 71,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": -1,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          }
        ],
        "sku": 900070,
        "sdmId": 70,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      },

      {
        "id": 17,
        "position": 10,
        "name": "Dinner Meal",
        "description": "3 chicken pcs., fries, coleslaw, bun & a drink",
        "inSide": 1,
        "finalPrice": 28,
        "specialPrice": 0,
        "catId": 0,
        "promoId": -1,
        "metaKeyword": [
          "Dinner Meal - Medium"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "name": "Choice of flavor",
            "title": "Choice of flavor",
            "subtitle": "Choice of flavor",
            "ingredient": 0,
            "type": "radio",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1446,
                "selection_id": 11251,
                "price": 0,
                "id": 1653,
                "name": "Dinner Meal - Original",
                "title": "Dinner Meal - Original",
                "imageThumbnail": "/imagestemp/itm310001.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 310001,
                "sdmId": 310001,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1446,
                "selection_id": 11252,
                "price": 0,
                "id": 1654,
                "name": "Dinner Meal - Spicy",
                "title": "Dinner Meal - Spicy",
                "imageThumbnail": "/imagestemp/itm310002.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 310002,
                "sdmId": 310002,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1446,
                "selection_id": 11253,
                "price": 0,
                "id": 1710,
                "name": "Dinner Meal - Mix",
                "title": "Dinner Meal - Mix",
                "imageThumbnail": "/imagestemp/itm310003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 310003,
                "sdmId": 310003,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [
                  2
                ]
              }
            ],
            "maximumQty": 3,
            "minimumQty": 3,
            "isDependent": 0
          },
          {
            "position": 2,
            "name": "Dinner Meal - Mix",
            "title": "Dinner Meal - Mix",
            "subtitle": "Dinner Meal - Mix",
            "ingredient": 0,
            "type": "stepper",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/imagestemp/itm310003.png",
            "productLinks": [
              {
                "option_id": 1448,
                "selection_id": 0,
                "price": 0,
                "selected": 1,
                "name": "Chicken Pc - Original",
                "title": "Chicken Pc - Original",
                "id": 1644,
                "sku": 910001,
                "sdmId": 910001,
                "modGroupId": 10205,
                "selectionQty": 2
              },
              {
                "option_id": 1448,
                "selection_id": 0,
                "price": 0,
                "selected": 0,
                "name": "Chicken Pc - Spicy",
                "title": "Chicken Pc - Spicy",
                "id": 1645,
                "sku": 910002,
                "sdmId": 910002,
                "modGroupId": 10205,
                "selectionQty": 1
              }
            ],
            "maximumQty": 3,
            "minimumQty": 3,
            "isDependent": 1
          },
          {
            "position": 3,
            "name": "Choice of first side item",
            "title": "Choice of first side item",
            "subtitle": "Choice of first side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 2,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1448,
                "selection_id": 11261,
                "price": 0,
                "id": 1619,
                "name": "Coleslaw Salad Small",
                "title": "Coleslaw Salad Small",
                "imageThumbnail": "/imagestemp/itm510001.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 510001,
                "sdmId": 510001,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1448,
                "selection_id": 11262,
                "price": 2,
                "id": 1630,
                "name": "Regular Fries",
                "title": "Regular Fries",
                "imageThumbnail": "/imagestemp/itm510004.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510004,
                "sdmId": 510004,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1448,
                "selection_id": 11263,
                "price": 3,
                "id": 1636,
                "name": "Regular Fries Spicy",
                "title": "Regular Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510012.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510012,
                "sdmId": 510012,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1448,
                "selection_id": 11264,
                "price": 5,
                "id": 1628,
                "name": "Loaded Fries Regular",
                "title": "Loaded Fries Regular",
                "imageThumbnail": "/imagestemp/itm510036.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510036,
                "sdmId": 510036,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1448,
                "selection_id": 11265,
                "price": 3,
                "id": 1639,
                "name": "Potato Dipper- Regular",
                "title": "Potato Dipper- Regular",
                "imageThumbnail": "/imagestemp/itm510071.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510071,
                "sdmId": 510071,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1448,
                "selection_id": 11266,
                "price": 7,
                "id": 1650,
                "name": "Cheese Potato Dipper",
                "title": "Cheese Potato Dipper",
                "imageThumbnail": "/imagestemp/itm510075.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510075,
                "sdmId": 510075,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 4,
            "name": "Choice of second side item",
            "title": "Choice of second side item",
            "subtitle": "Choice of second side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 3,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1447,
                "selection_id": 11254,
                "price": 0,
                "id": 1633,
                "name": "Medium Fries",
                "title": "Medium Fries",
                "imageThumbnail": "/imagestemp/itm510050.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 510050,
                "sdmId": 510050,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1447,
                "selection_id": 11255,
                "price": 1,
                "id": 1637,
                "name": "Medium Fries Spicy",
                "title": "Medium Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510051.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510051,
                "sdmId": 510051,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1447,
                "selection_id": 11256,
                "price": 0,
                "id": 1619,
                "name": "Coleslaw Salad Small",
                "title": "Coleslaw Salad Small",
                "imageThumbnail": "/imagestemp/itm510001.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510001,
                "sdmId": 510001,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1447,
                "selection_id": 11257,
                "price": 3,
                "id": 1628,
                "name": "Loaded Fries Regular",
                "title": "Loaded Fries Regular",
                "imageThumbnail": "/imagestemp/itm510036.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510036,
                "sdmId": 510036,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1447,
                "selection_id": 11258,
                "price": 1,
                "id": 1640,
                "name": "Medium Dipper Fries",
                "title": "Medium Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510072.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510072,
                "sdmId": 510072,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1447,
                "selection_id": 11259,
                "price": 5,
                "id": 1650,
                "name": "Cheese Potato Dipper",
                "title": "Cheese Potato Dipper",
                "imageThumbnail": "/imagestemp/itm510075.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510075,
                "sdmId": 510075,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 7,
                "option_id": 1447,
                "selection_id": 11260,
                "price": 3,
                "id": 1651,
                "name": "Loaded Fries P.Chili Reg",
                "title": "Loaded Fries P.Chili Reg",
                "imageThumbnail": "/imagestemp/itm510079.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510079,
                "sdmId": 510079,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 5,
            "name": "Choice of Beverages",
            "title": "Choice of Beverages",
            "subtitle": "Choice of Beverages",
            "ingredient": 0,
            "type": "radio",
            "compId": 4,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1449,
                "selection_id": 11267,
                "price": 0,
                "id": 1605,
                "name": "Pepsi Medium",
                "title": "Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 600003,
                "sdmId": 600003,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1449,
                "selection_id": 11268,
                "price": 0,
                "id": 1617,
                "name": "Mirinda Medium",
                "title": "Mirinda Medium",
                "imageThumbnail": "/imagestemp/itm600009.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600009,
                "sdmId": 600009,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1449,
                "selection_id": 11269,
                "price": 0,
                "id": 1612,
                "name": "7Up Medium",
                "title": "7Up Medium",
                "imageThumbnail": "/imagestemp/itm600016.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600016,
                "sdmId": 600016,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1449,
                "selection_id": 11270,
                "price": 0,
                "id": 1607,
                "name": "Diet Pepsi Medium",
                "title": "Diet Pepsi Medium",
                "imageThumbnail": "/imagestemp/itm600006.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600006,
                "sdmId": 600006,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1449,
                "selection_id": 11271,
                "price": 0,
                "id": 1614,
                "name": "Mountain Dew Medium",
                "title": "Mountain Dew Medium",
                "imageThumbnail": "/imagestemp/itm600013.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 600013,
                "sdmId": 600013,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1449,
                "selection_id": 11272,
                "price": 7.5,
                "id": 1600,
                "name": "Mojito Krusher",
                "title": "Mojito Krusher",
                "imageThumbnail": "/imagestemp/itm610021.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610021,
                "sdmId": 610021,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 7,
                "option_id": 1449,
                "selection_id": 11273,
                "price": 0,
                "id": 1652,
                "name": "Small Aquafina",
                "title": "Small Aquafina",
                "imageThumbnail": "/imagestemp/itm610011.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610011,
                "sdmId": 610011,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 8,
                "option_id": 1449,
                "selection_id": 11274,
                "price": 8.5,
                "id": 1599,
                "name": "Fresh Orange Juice",
                "title": "Fresh Orange Juice",
                "imageThumbnail": "/imagestemp/itm610020.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610020,
                "sdmId": 610020,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 9,
                "option_id": 1449,
                "selection_id": 11275,
                "price": 3,
                "id": 1655,
                "name": "Lemon Mint Ice Tea",
                "title": "Lemon Mint Ice Tea",
                "imageThumbnail": "/imagestemp/itm610019.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610019,
                "sdmId": 610019,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          }
        ],
        "selectedItem": 900007,
        "configurableProductOptions": [
          {
            "id": 144,
            "position": 1,
            "title": "Choice of Size",
            "subtitle": "Choice of Size",
            "selIndex": 1,
            "options": [
              {
                "isSelected": 1,
                "position": 1,
                "name": "Medium",
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 0,
                "position": 2,
                "name": "Large",
                "title": "Large",
                "id": 16286
              }
            ]
          }
        ],
        "typeId": "bundle_group",
        "originalTypeId": "bundle_group",
        "items": [
          {
            "id": 1731,
            "promoId": 39,
            "position": 10,
            "name": "Dinner Meal - Medium",
            "title": "Dinner Meal - Medium",
            "description": "",
            "inSide": 1,
            "finalPrice": 28,
            "specialPrice": 28,
            "metaKeyword": [
              "Dinner Meal - Medium"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of flavor",
                "title": "Choice of flavor",
                "subtitle": "Choice of flavor",
                "ingredient": 0,
                "type": "radio",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1446,
                    "selection_id": 11251,
                    "price": 0,
                    "id": 1653,
                    "name": "Dinner Meal - Original",
                    "title": "Dinner Meal - Original",
                    "imageThumbnail": "/imagestemp/itm310001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 310001,
                    "sdmId": 310001,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1446,
                    "selection_id": 11252,
                    "price": 0,
                    "id": 1654,
                    "name": "Dinner Meal - Spicy",
                    "title": "Dinner Meal - Spicy",
                    "imageThumbnail": "/imagestemp/itm310002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 310002,
                    "sdmId": 310002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1446,
                    "selection_id": 11253,
                    "price": 0,
                    "id": 1710,
                    "name": "Dinner Meal - Mix",
                    "title": "Dinner Meal - Mix",
                    "imageThumbnail": "/imagestemp/itm310003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 310003,
                    "sdmId": 310003,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [
                      2
                    ]
                  }
                ],
                "maximumQty": 3,
                "minimumQty": 3,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Dinner Meal - Mix",
                "title": "Dinner Meal - Mix",
                "subtitle": "Dinner Meal - Mix",
                "ingredient": 0,
                "type": "stepper",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/imagestemp/itm310003.png",
                "productLinks": [
                  {
                    "option_id": 1448,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "Chicken Pc - Original",
                    "title": "Chicken Pc - Original",
                    "id": 1644,
                    "sku": 910001,
                    "sdmId": 910001,
                    "modGroupId": 10205,
                    "selectionQty": 2
                  },
                  {
                    "option_id": 1448,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Chicken Pc - Spicy",
                    "title": "Chicken Pc - Spicy",
                    "id": 1645,
                    "sku": 910002,
                    "sdmId": 910002,
                    "modGroupId": 10205,
                    "selectionQty": 1
                  }
                ],
                "maximumQty": 3,
                "minimumQty": 3,
                "isDependent": 1
              },
              {
                "position": 3,
                "name": "Choice of first side item",
                "title": "Choice of first side item",
                "subtitle": "Choice of first side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 2,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1448,
                    "selection_id": 11261,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1448,
                    "selection_id": 11262,
                    "price": 2,
                    "id": 1630,
                    "name": "Regular Fries",
                    "title": "Regular Fries",
                    "imageThumbnail": "/imagestemp/itm510004.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510004,
                    "sdmId": 510004,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1448,
                    "selection_id": 11263,
                    "price": 3,
                    "id": 1636,
                    "name": "Regular Fries Spicy",
                    "title": "Regular Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510012.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510012,
                    "sdmId": 510012,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1448,
                    "selection_id": 11264,
                    "price": 5,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1448,
                    "selection_id": 11265,
                    "price": 3,
                    "id": 1639,
                    "name": "Potato Dipper- Regular",
                    "title": "Potato Dipper- Regular",
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510071,
                    "sdmId": 510071,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1448,
                    "selection_id": 11266,
                    "price": 7,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choice of second side item",
                "title": "Choice of second side item",
                "subtitle": "Choice of second side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 3,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1447,
                    "selection_id": 11254,
                    "price": 0,
                    "id": 1633,
                    "name": "Medium Fries",
                    "title": "Medium Fries",
                    "imageThumbnail": "/imagestemp/itm510050.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510050,
                    "sdmId": 510050,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1447,
                    "selection_id": 11255,
                    "price": 1,
                    "id": 1637,
                    "name": "Medium Fries Spicy",
                    "title": "Medium Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510051.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510051,
                    "sdmId": 510051,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1447,
                    "selection_id": 11256,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1447,
                    "selection_id": 11257,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1447,
                    "selection_id": 11258,
                    "price": 1,
                    "id": 1640,
                    "name": "Medium Dipper Fries",
                    "title": "Medium Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510072.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510072,
                    "sdmId": 510072,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1447,
                    "selection_id": 11259,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1447,
                    "selection_id": 11260,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510079,
                    "sdmId": 510079,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 5,
                "name": "Choice of Beverages",
                "title": "Choice of Beverages",
                "subtitle": "Choice of Beverages",
                "ingredient": 0,
                "type": "radio",
                "compId": 4,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1449,
                    "selection_id": 11267,
                    "price": 0,
                    "id": 1605,
                    "name": "Pepsi Medium",
                    "title": "Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 600003,
                    "sdmId": 600003,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1449,
                    "selection_id": 11268,
                    "price": 0,
                    "id": 1617,
                    "name": "Mirinda Medium",
                    "title": "Mirinda Medium",
                    "imageThumbnail": "/imagestemp/itm600009.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600009,
                    "sdmId": 600009,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1449,
                    "selection_id": 11269,
                    "price": 0,
                    "id": 1612,
                    "name": "7Up Medium",
                    "title": "7Up Medium",
                    "imageThumbnail": "/imagestemp/itm600016.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600016,
                    "sdmId": 600016,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1449,
                    "selection_id": 11270,
                    "price": 0,
                    "id": 1607,
                    "name": "Diet Pepsi Medium",
                    "title": "Diet Pepsi Medium",
                    "imageThumbnail": "/imagestemp/itm600006.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600006,
                    "sdmId": 600006,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1449,
                    "selection_id": 11271,
                    "price": 0,
                    "id": 1614,
                    "name": "Mountain Dew Medium",
                    "title": "Mountain Dew Medium",
                    "imageThumbnail": "/imagestemp/itm600013.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600013,
                    "sdmId": 600013,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1449,
                    "selection_id": 11272,
                    "price": 7.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610021,
                    "sdmId": 610021,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1449,
                    "selection_id": 11273,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610011,
                    "sdmId": 610011,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 8,
                    "option_id": 1449,
                    "selection_id": 11274,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610020,
                    "sdmId": 610020,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 9,
                    "option_id": 1449,
                    "selection_id": 11275,
                    "price": 3,
                    "id": 1655,
                    "name": "Lemon Mint Ice Tea",
                    "title": "Lemon Mint Ice Tea",
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610019,
                    "sdmId": 610019,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "position": 1,
                "title": "Choice of Size",
                "subtitle": "Choice of Size",
                "selIndex": 1,
                "options": [
                  {
                    "isSelected": 1,
                    "position": 1,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ]
              }
            ],
            "items": [

            ],
            "sku": 900007,
            "sdmId": 7,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": -1,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          },
          {
            "id": 1732,
            "promoId": 39,
            "position": 11,
            "name": "Dinner Meal - Large",
            "title": "Dinner Meal - Large",
            "description": "",
            "inSide": 1,
            "finalPrice": 29.5,
            "specialPrice": 29.5,
            "metaKeyword": [
              "Dinner Meal - Large"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of flavor",
                "title": "Choice of flavor",
                "subtitle": "Choice of flavor",
                "ingredient": 0,
                "type": "radio",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1450,
                    "selection_id": 11276,
                    "price": 0,
                    "id": 1653,
                    "name": "Dinner Meal - Original",
                    "title": "Dinner Meal - Original",
                    "imageThumbnail": "/imagestemp/itm310001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 310001,
                    "sdmId": 310001,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1450,
                    "selection_id": 11277,
                    "price": 0,
                    "id": 1654,
                    "name": "Dinner Meal - Spicy",
                    "title": "Dinner Meal - Spicy",
                    "imageThumbnail": "/imagestemp/itm310002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 310002,
                    "sdmId": 310002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1450,
                    "selection_id": 11278,
                    "price": 0,
                    "id": 1710,
                    "name": "Dinner Meal - Mix",
                    "title": "Dinner Meal - Mix",
                    "imageThumbnail": "/imagestemp/itm310003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 310003,
                    "sdmId": 310003,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [
                      2
                    ]
                  }
                ],
                "maximumQty": 3,
                "minimumQty": 3,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Dinner Meal - Mix",
                "title": "Dinner Meal - Mix",
                "subtitle": "Dinner Meal - Mix",
                "ingredient": 0,
                "type": "stepper",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/imagestemp/itm310003.png",
                "productLinks": [
                  {
                    "option_id": 1452,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "Chicken Pc - Original",
                    "title": "Chicken Pc - Original",
                    "id": 1644,
                    "sku": 910001,
                    "sdmId": 910001,
                    "modGroupId": 10205,
                    "selectionQty": 2
                  },
                  {
                    "option_id": 1452,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Chicken Pc - Spicy",
                    "title": "Chicken Pc - Spicy",
                    "id": 1645,
                    "sku": 910002,
                    "sdmId": 910002,
                    "modGroupId": 10205,
                    "selectionQty": 1
                  }
                ],
                "maximumQty": 3,
                "minimumQty": 3,
                "isDependent": 1
              },
              {
                "position": 3,
                "name": "Choice of first side item",
                "title": "Choice of first side item",
                "subtitle": "Choice of first side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 2,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1452,
                    "selection_id": 11286,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1452,
                    "selection_id": 11287,
                    "price": 2,
                    "id": 1630,
                    "name": "Regular Fries",
                    "title": "Regular Fries",
                    "imageThumbnail": "/imagestemp/itm510004.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510004,
                    "sdmId": 510004,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1452,
                    "selection_id": 11288,
                    "price": 3,
                    "id": 1636,
                    "name": "Regular Fries Spicy",
                    "title": "Regular Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510012.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510012,
                    "sdmId": 510012,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1452,
                    "selection_id": 11289,
                    "price": 5,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1452,
                    "selection_id": 11290,
                    "price": 2,
                    "id": 1639,
                    "name": "Potato Dipper- Regular",
                    "title": "Potato Dipper- Regular",
                    "imageThumbnail": "/imagestemp/itm510071.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510071,
                    "sdmId": 510071,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1452,
                    "selection_id": 11291,
                    "price": 7,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choice of second side item",
                "title": "Choice of second side item",
                "subtitle": "Choice of second side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 3,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1451,
                    "selection_id": 11279,
                    "price": 0,
                    "id": 1631,
                    "name": "Large Fries",
                    "title": "Large Fries",
                    "imageThumbnail": "/imagestemp/itm510006.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510006,
                    "sdmId": 510006,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1451,
                    "selection_id": 11280,
                    "price": 1,
                    "id": 1634,
                    "name": "Large Fries Spicy",
                    "title": "Large Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510013.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510013,
                    "sdmId": 510013,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1451,
                    "selection_id": 11281,
                    "price": 0,
                    "id": 1619,
                    "name": "Coleslaw Salad Small",
                    "title": "Coleslaw Salad Small",
                    "imageThumbnail": "/imagestemp/itm510001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510001,
                    "sdmId": 510001,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1451,
                    "selection_id": 11282,
                    "price": 3,
                    "id": 1628,
                    "name": "Loaded Fries Regular",
                    "title": "Loaded Fries Regular",
                    "imageThumbnail": "/imagestemp/itm510036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510036,
                    "sdmId": 510036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1451,
                    "selection_id": 11283,
                    "price": 1,
                    "id": 1641,
                    "name": "Large Dipper Fries",
                    "title": "Large Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510073.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510073,
                    "sdmId": 510073,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1451,
                    "selection_id": 11284,
                    "price": 5,
                    "id": 1650,
                    "name": "Cheese Potato Dipper",
                    "title": "Cheese Potato Dipper",
                    "imageThumbnail": "/imagestemp/itm510075.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510075,
                    "sdmId": 510075,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1451,
                    "selection_id": 11285,
                    "price": 3,
                    "id": 1651,
                    "name": "Loaded Fries P.Chili Reg",
                    "title": "Loaded Fries P.Chili Reg",
                    "imageThumbnail": "/imagestemp/itm510079.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510079,
                    "sdmId": 510079,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 5,
                "name": "Choice of Beverages",
                "title": "Choice of Beverages",
                "subtitle": "Choice of Beverages",
                "ingredient": 0,
                "type": "radio",
                "compId": 4,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1453,
                    "selection_id": 11292,
                    "price": 0,
                    "id": 1606,
                    "name": "Pepsi Large",
                    "title": "Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600004.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 600004,
                    "sdmId": 600004,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1453,
                    "selection_id": 11293,
                    "price": 0,
                    "id": 1618,
                    "name": "Mirinda Large",
                    "title": "Mirinda Large",
                    "imageThumbnail": "/imagestemp/itm600010.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600010,
                    "sdmId": 600010,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1453,
                    "selection_id": 11294,
                    "price": 0,
                    "id": 1610,
                    "name": "7Up Large",
                    "title": "7Up Large",
                    "imageThumbnail": "/imagestemp/itm600017.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600017,
                    "sdmId": 600017,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1453,
                    "selection_id": 11295,
                    "price": 0,
                    "id": 1609,
                    "name": "Diet Pepsi Large",
                    "title": "Diet Pepsi Large",
                    "imageThumbnail": "/imagestemp/itm600007.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600007,
                    "sdmId": 600007,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1453,
                    "selection_id": 11296,
                    "price": 0,
                    "id": 1615,
                    "name": "Mountain Dew Large",
                    "title": "Mountain Dew Large",
                    "imageThumbnail": "/imagestemp/itm600014.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 600014,
                    "sdmId": 600014,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1453,
                    "selection_id": 11297,
                    "price": 7.5,
                    "id": 1600,
                    "name": "Mojito Krusher",
                    "title": "Mojito Krusher",
                    "imageThumbnail": "/imagestemp/itm610021.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610021,
                    "sdmId": 610021,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1453,
                    "selection_id": 11298,
                    "price": 0,
                    "id": 1652,
                    "name": "Small Aquafina",
                    "title": "Small Aquafina",
                    "imageThumbnail": "/imagestemp/itm610011.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610011,
                    "sdmId": 610011,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 8,
                    "option_id": 1453,
                    "selection_id": 11299,
                    "price": 8.5,
                    "id": 1599,
                    "name": "Fresh Orange Juice",
                    "title": "Fresh Orange Juice",
                    "imageThumbnail": "/imagestemp/itm610020.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610020,
                    "sdmId": 610020,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 9,
                    "option_id": 1453,
                    "selection_id": 11300,
                    "price": 3,
                    "id": 1655,
                    "name": "Lemon Mint Ice Tea",
                    "title": "Lemon Mint Ice Tea",
                    "imageThumbnail": "/imagestemp/itm610019.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610019,
                    "sdmId": 610019,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "configurableProductOptions": [
              {
                "id": 144,
                "position": 1,
                "title": "Choice of Size",
                "subtitle": "Choice of Size",
                "selIndex": 1,
                "options": [
                  {
                    "isSelected": 1,
                    "position": 1,
                    "name": "Medium",
                    "title": "Medium",
                    "id": 16287
                  },
                  {
                    "isSelected": 0,
                    "position": 2,
                    "name": "Large",
                    "title": "Large",
                    "id": 16286
                  }
                ]
              }
            ],
            "items": [

            ],
            "sku": 900008,
            "sdmId": 8,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": -1,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          }
        ],
        "sku": 900007,
        "sdmId": 7,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      },

      {
        "id": 33,
        "position": 6,
        "name": "15 Pcs Meal",
        "description": "15 chicken pcs., family size coleslaw, family size fries,5 buns & 2.25 liters drink",
        "inSide": 1,
        "finalPrice": 90,
        "specialPrice": 0,
        "catId": 0,
        "promoId": 2,
        "metaKeyword": [
          "Bucket 15 Pcs"
        ],
        "bundleProductOptions": [
          {
            "position": 1,
            "name": "Choice of flavor",
            "title": "Choice of flavor",
            "subtitle": "Choice of flavor",
            "ingredient": 0,
            "type": "radio",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1591,
                "selection_id": 12120,
                "price": 0,
                "id": 1687,
                "name": "Bucket 15 Pcs - Original",
                "title": "Bucket 15 Pcs - Original",
                "imageThumbnail": "/imagestemp/itm410001.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 410001,
                "sdmId": 410001,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1591,
                "selection_id": 12121,
                "price": 0,
                "id": 1688,
                "name": "Bucket 15 Pcs - Spicy",
                "title": "Bucket 15 Pcs - Spicy",
                "imageThumbnail": "/imagestemp/itm410002.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 410002,
                "sdmId": 410002,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1591,
                "selection_id": 12122,
                "price": 0,
                "id": 1714,
                "name": "Bucket 15 Pcs - Mix",
                "title": "Bucket 15 Pcs - Mix",
                "imageThumbnail": "/imagestemp/itm410003.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 410003,
                "sdmId": 410003,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [
                  2
                ]
              }
            ],
            "maximumQty": 15,
            "minimumQty": 15,
            "isDependent": 0
          },
          {
            "position": 2,
            "name": "Bucket 15 Pcs - Mix",
            "title": "Bucket 15 Pcs - Mix",
            "subtitle": "Bucket 15 Pcs - Mix",
            "ingredient": 0,
            "type": "stepper",
            "compId": 1,
            "isModifier": 0,
            "imageThumbnail": "/imagestemp/itm410003.png",
            "productLinks": [
              {
                "option_id": 1592,
                "selection_id": 0,
                "price": 0,
                "selected": 1,
                "name": "Chicken Pc - Original",
                "title": "Chicken Pc - Original",
                "id": 1644,
                "sku": 910001,
                "sdmId": 910001,
                "modGroupId": 10200,
                "selectionQty": 8
              },
              {
                "option_id": 1592,
                "selection_id": 0,
                "price": 0,
                "selected": 0,
                "name": "Chicken Pc - Spicy",
                "title": "Chicken Pc - Spicy",
                "id": 1645,
                "sku": 910002,
                "sdmId": 910002,
                "modGroupId": 10200,
                "selectionQty": 7
              }
            ],
            "maximumQty": 15,
            "minimumQty": 15,
            "isDependent": 1
          },
          {
            "position": 3,
            "name": "Choice of first side item",
            "title": "Choice of first side item",
            "subtitle": "Choice of first side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 2,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1592,
                "selection_id": 12123,
                "price": 0,
                "id": 1632,
                "name": "Family Fries",
                "title": "Family Fries",
                "imageThumbnail": "/imagestemp/itm510005.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 510005,
                "sdmId": 510005,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1592,
                "selection_id": 12124,
                "price": 3,
                "id": 1635,
                "name": "Family Fries Spicy",
                "title": "Family Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510014.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510014,
                "sdmId": 510014,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1592,
                "selection_id": 12125,
                "price": 5,
                "id": 1629,
                "name": "Loaded Fries Family",
                "title": "Loaded Fries Family",
                "imageThumbnail": "/imagestemp/itm510030.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510030,
                "sdmId": 510030,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1592,
                "selection_id": 12126,
                "price": 0,
                "id": 1620,
                "name": "Coleslaw Salad Large",
                "title": "Coleslaw Salad Large",
                "imageThumbnail": "/imagestemp/itm510002.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510002,
                "sdmId": 510002,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1592,
                "selection_id": 12127,
                "price": 0,
                "id": 1680,
                "name": "Chips Large Catering",
                "title": "Chips Large Catering",
                "imageThumbnail": "/imagestemp/itm510068.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510068,
                "sdmId": 510068,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1592,
                "selection_id": 12128,
                "price": 6,
                "id": 1638,
                "name": "Family Dipper Fries",
                "title": "Family Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510074.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510074,
                "sdmId": 510074,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 7,
                "option_id": 1592,
                "selection_id": 12129,
                "price": 12,
                "id": 1646,
                "name": "Cheese Potato Dipper Fami",
                "title": "Cheese Potato Dipper Fami",
                "imageThumbnail": "/imagestemp/itm510076.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510076,
                "sdmId": 510076,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 8,
                "option_id": 1592,
                "selection_id": 12130,
                "price": 5,
                "id": 1647,
                "name": "Loaded Fries P.Chili Fami",
                "title": "Loaded Fries P.Chili Fami",
                "imageThumbnail": "/imagestemp/itm510080.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510080,
                "sdmId": 510080,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 4,
            "name": "Choice of second side item",
            "title": "Choice of second side item",
            "subtitle": "Choice of second side item",
            "ingredient": 0,
            "type": "radio",
            "compId": 3,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1593,
                "selection_id": 12131,
                "price": 0,
                "id": 1620,
                "name": "Coleslaw Salad Large",
                "title": "Coleslaw Salad Large",
                "imageThumbnail": "/imagestemp/itm510002.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 510002,
                "sdmId": 510002,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1593,
                "selection_id": 12132,
                "price": 3,
                "id": 1632,
                "name": "Family Fries",
                "title": "Family Fries",
                "imageThumbnail": "/imagestemp/itm510005.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510005,
                "sdmId": 510005,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1593,
                "selection_id": 12133,
                "price": 6,
                "id": 1635,
                "name": "Family Fries Spicy",
                "title": "Family Fries Spicy",
                "imageThumbnail": "/imagestemp/itm510014.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510014,
                "sdmId": 510014,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1593,
                "selection_id": 12134,
                "price": 8,
                "id": 1629,
                "name": "Loaded Fries Family",
                "title": "Loaded Fries Family",
                "imageThumbnail": "/imagestemp/itm510030.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510030,
                "sdmId": 510030,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1593,
                "selection_id": 12135,
                "price": 9,
                "id": 1638,
                "name": "Family Dipper Fries",
                "title": "Family Dipper Fries",
                "imageThumbnail": "/imagestemp/itm510074.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510074,
                "sdmId": 510074,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1593,
                "selection_id": 12136,
                "price": 15,
                "id": 1646,
                "name": "Cheese Potato Dipper Fami",
                "title": "Cheese Potato Dipper Fami",
                "imageThumbnail": "/imagestemp/itm510076.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 510076,
                "sdmId": 510076,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          },
          {
            "position": 5,
            "name": "Choice of Beverages",
            "title": "Choice of Beverages",
            "subtitle": "Choice of Beverages",
            "ingredient": 0,
            "type": "radio",
            "compId": 4,
            "isModifier": 0,
            "imageThumbnail": "/d/u/dummy-product.png",
            "productLinks": [
              {
                "position": 1,
                "option_id": 1594,
                "selection_id": 12137,
                "price": 0,
                "id": 1689,
                "name": "Pepsi 2.25",
                "title": "Pepsi 2.25",
                "imageThumbnail": "/imagestemp/itm610034.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 1,
                "sku": 610034,
                "sdmId": 610034,
                "default": 1,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 2,
                "option_id": 1594,
                "selection_id": 12138,
                "price": 0,
                "id": 1690,
                "name": "7Up  2.25",
                "title": "7Up  2.25",
                "imageThumbnail": "/imagestemp/itm610035.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610035,
                "sdmId": 610035,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 3,
                "option_id": 1594,
                "selection_id": 12139,
                "price": 0,
                "id": 1691,
                "name": "Mountain Dew 2.25",
                "title": "Mountain Dew 2.25",
                "imageThumbnail": "/imagestemp/itm610036.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610036,
                "sdmId": 610036,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 4,
                "option_id": 1594,
                "selection_id": 12140,
                "price": 0,
                "id": 1692,
                "name": "Diet Pepsi 2.25",
                "title": "Diet Pepsi 2.25",
                "imageThumbnail": "/imagestemp/itm610037.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610037,
                "sdmId": 610037,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 5,
                "option_id": 1594,
                "selection_id": 12141,
                "price": 0,
                "id": 1693,
                "name": "Mirinda 2.25",
                "title": "Mirinda 2.25",
                "imageThumbnail": "/imagestemp/itm610038.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610038,
                "sdmId": 610038,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              },
              {
                "position": 6,
                "option_id": 1594,
                "selection_id": 12142,
                "price": 21,
                "id": 1686,
                "name": "Orange Juice 1L",
                "title": "Orange Juice 1L",
                "imageThumbnail": "/imagestemp/itm610033.png",
                "selectionQty": 1,
                "subOptions": [

                ],
                "selected": 0,
                "sku": 610033,
                "sdmId": 610033,
                "default": 0,
                "modGroupId": -1,
                "dependentSteps": [

                ]
              }
            ],
            "maximumQty": 0,
            "minimumQty": 0,
            "isDependent": 0
          }
        ],
        "selectedItem": 900056,
        "configurableProductOptions": [

        ],
        "typeId": "bundle",
        "originalTypeId": "bundle_group",
        "items": [
          {
            "id": 1766,
            "promoId": -1,
            "position": 6,
            "name": "Bucket 15 Pcs",
            "title": "Bucket 15 Pcs",
            "description": "15 chicken pcs., family size coleslaw, family size fries,5 buns & 2.25 liters drink",
            "inSide": 1,
            "finalPrice": 90,
            "specialPrice": 90,
            "metaKeyword": [
              "Bucket 15 Pcs"
            ],
            "bundleProductOptions": [
              {
                "position": 1,
                "name": "Choice of flavor",
                "title": "Choice of flavor",
                "subtitle": "Choice of flavor",
                "ingredient": 0,
                "type": "radio",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1591,
                    "selection_id": 12120,
                    "price": 0,
                    "id": 1687,
                    "name": "Bucket 15 Pcs - Original",
                    "title": "Bucket 15 Pcs - Original",
                    "imageThumbnail": "/imagestemp/itm410001.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 410001,
                    "sdmId": 410001,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1591,
                    "selection_id": 12121,
                    "price": 0,
                    "id": 1688,
                    "name": "Bucket 15 Pcs - Spicy",
                    "title": "Bucket 15 Pcs - Spicy",
                    "imageThumbnail": "/imagestemp/itm410002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 410002,
                    "sdmId": 410002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1591,
                    "selection_id": 12122,
                    "price": 0,
                    "id": 1714,
                    "name": "Bucket 15 Pcs - Mix",
                    "title": "Bucket 15 Pcs - Mix",
                    "imageThumbnail": "/imagestemp/itm410003.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 410003,
                    "sdmId": 410003,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [
                      2
                    ]
                  }
                ],
                "maximumQty": 15,
                "minimumQty": 15,
                "isDependent": 0
              },
              {
                "position": 2,
                "name": "Bucket 15 Pcs - Mix",
                "title": "Bucket 15 Pcs - Mix",
                "subtitle": "Bucket 15 Pcs - Mix",
                "ingredient": 0,
                "type": "stepper",
                "compId": 1,
                "isModifier": 0,
                "imageThumbnail": "/imagestemp/itm410003.png",
                "productLinks": [
                  {
                    "option_id": 1592,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 1,
                    "name": "Chicken Pc - Original",
                    "title": "Chicken Pc - Original",
                    "id": 1644,
                    "sku": 910001,
                    "sdmId": 910001,
                    "modGroupId": 10201,
                    "selectionQty": 8
                  },
                  {
                    "option_id": 1592,
                    "selection_id": 0,
                    "price": 0,
                    "selected": 0,
                    "name": "Chicken Pc - Spicy",
                    "title": "Chicken Pc - Spicy",
                    "id": 1645,
                    "sku": 910002,
                    "sdmId": 910002,
                    "modGroupId": 10201,
                    "selectionQty": 7
                  }
                ],
                "maximumQty": 15,
                "minimumQty": 15,
                "isDependent": 1
              },
              {
                "position": 3,
                "name": "Choice of first side item",
                "title": "Choice of first side item",
                "subtitle": "Choice of first side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 2,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1592,
                    "selection_id": 12123,
                    "price": 0,
                    "id": 1632,
                    "name": "Family Fries",
                    "title": "Family Fries",
                    "imageThumbnail": "/imagestemp/itm510005.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510005,
                    "sdmId": 510005,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1592,
                    "selection_id": 12124,
                    "price": 3,
                    "id": 1635,
                    "name": "Family Fries Spicy",
                    "title": "Family Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510014.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510014,
                    "sdmId": 510014,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1592,
                    "selection_id": 12125,
                    "price": 5,
                    "id": 1629,
                    "name": "Loaded Fries Family",
                    "title": "Loaded Fries Family",
                    "imageThumbnail": "/imagestemp/itm510030.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510030,
                    "sdmId": 510030,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1592,
                    "selection_id": 12126,
                    "price": 0,
                    "id": 1620,
                    "name": "Coleslaw Salad Large",
                    "title": "Coleslaw Salad Large",
                    "imageThumbnail": "/imagestemp/itm510002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510002,
                    "sdmId": 510002,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1592,
                    "selection_id": 12127,
                    "price": 0,
                    "id": 1680,
                    "name": "Chips Large Catering",
                    "title": "Chips Large Catering",
                    "imageThumbnail": "/imagestemp/itm510068.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510068,
                    "sdmId": 510068,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1592,
                    "selection_id": 12128,
                    "price": 6,
                    "id": 1638,
                    "name": "Family Dipper Fries",
                    "title": "Family Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510074.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510074,
                    "sdmId": 510074,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 7,
                    "option_id": 1592,
                    "selection_id": 12129,
                    "price": 12,
                    "id": 1646,
                    "name": "Cheese Potato Dipper Fami",
                    "title": "Cheese Potato Dipper Fami",
                    "imageThumbnail": "/imagestemp/itm510076.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510076,
                    "sdmId": 510076,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 8,
                    "option_id": 1592,
                    "selection_id": 12130,
                    "price": 5,
                    "id": 1647,
                    "name": "Loaded Fries P.Chili Fami",
                    "title": "Loaded Fries P.Chili Fami",
                    "imageThumbnail": "/imagestemp/itm510080.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510080,
                    "sdmId": 510080,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 4,
                "name": "Choice of second side item",
                "title": "Choice of second side item",
                "subtitle": "Choice of second side item",
                "ingredient": 0,
                "type": "radio",
                "compId": 3,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1593,
                    "selection_id": 12131,
                    "price": 0,
                    "id": 1620,
                    "name": "Coleslaw Salad Large",
                    "title": "Coleslaw Salad Large",
                    "imageThumbnail": "/imagestemp/itm510002.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 510002,
                    "sdmId": 510002,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1593,
                    "selection_id": 12132,
                    "price": 3,
                    "id": 1632,
                    "name": "Family Fries",
                    "title": "Family Fries",
                    "imageThumbnail": "/imagestemp/itm510005.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510005,
                    "sdmId": 510005,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1593,
                    "selection_id": 12133,
                    "price": 6,
                    "id": 1635,
                    "name": "Family Fries Spicy",
                    "title": "Family Fries Spicy",
                    "imageThumbnail": "/imagestemp/itm510014.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510014,
                    "sdmId": 510014,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1593,
                    "selection_id": 12134,
                    "price": 8,
                    "id": 1629,
                    "name": "Loaded Fries Family",
                    "title": "Loaded Fries Family",
                    "imageThumbnail": "/imagestemp/itm510030.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510030,
                    "sdmId": 510030,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1593,
                    "selection_id": 12135,
                    "price": 9,
                    "id": 1638,
                    "name": "Family Dipper Fries",
                    "title": "Family Dipper Fries",
                    "imageThumbnail": "/imagestemp/itm510074.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510074,
                    "sdmId": 510074,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1593,
                    "selection_id": 12136,
                    "price": 15,
                    "id": 1646,
                    "name": "Cheese Potato Dipper Fami",
                    "title": "Cheese Potato Dipper Fami",
                    "imageThumbnail": "/imagestemp/itm510076.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 510076,
                    "sdmId": 510076,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              },
              {
                "position": 5,
                "name": "Choice of Beverages",
                "title": "Choice of Beverages",
                "subtitle": "Choice of Beverages",
                "ingredient": 0,
                "type": "radio",
                "compId": 4,
                "isModifier": 0,
                "imageThumbnail": "/d/u/dummy-product.png",
                "productLinks": [
                  {
                    "position": 1,
                    "option_id": 1594,
                    "selection_id": 12137,
                    "price": 0,
                    "id": 1689,
                    "name": "Pepsi 2.25",
                    "title": "Pepsi 2.25",
                    "imageThumbnail": "/imagestemp/itm610034.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 1,
                    "sku": 610034,
                    "sdmId": 610034,
                    "default": 1,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 2,
                    "option_id": 1594,
                    "selection_id": 12138,
                    "price": 0,
                    "id": 1690,
                    "name": "7Up  2.25",
                    "title": "7Up  2.25",
                    "imageThumbnail": "/imagestemp/itm610035.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610035,
                    "sdmId": 610035,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 3,
                    "option_id": 1594,
                    "selection_id": 12139,
                    "price": 0,
                    "id": 1691,
                    "name": "Mountain Dew 2.25",
                    "title": "Mountain Dew 2.25",
                    "imageThumbnail": "/imagestemp/itm610036.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610036,
                    "sdmId": 610036,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 4,
                    "option_id": 1594,
                    "selection_id": 12140,
                    "price": 0,
                    "id": 1692,
                    "name": "Diet Pepsi 2.25",
                    "title": "Diet Pepsi 2.25",
                    "imageThumbnail": "/imagestemp/itm610037.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610037,
                    "sdmId": 610037,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 5,
                    "option_id": 1594,
                    "selection_id": 12141,
                    "price": 0,
                    "id": 1693,
                    "name": "Mirinda 2.25",
                    "title": "Mirinda 2.25",
                    "imageThumbnail": "/imagestemp/itm610038.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610038,
                    "sdmId": 610038,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  },
                  {
                    "position": 6,
                    "option_id": 1594,
                    "selection_id": 12142,
                    "price": 21,
                    "id": 1686,
                    "name": "Orange Juice 1L",
                    "title": "Orange Juice 1L",
                    "imageThumbnail": "/imagestemp/itm610033.png",
                    "selectionQty": 1,
                    "subOptions": [

                    ],
                    "selected": 0,
                    "sku": 610033,
                    "sdmId": 610033,
                    "default": 0,
                    "modGroupId": -1,
                    "dependentSteps": [

                    ]
                  }
                ],
                "maximumQty": 0,
                "minimumQty": 0,
                "isDependent": 0
              }
            ],
            "typeId": "bundle",
            "selectedItem": 0,
            "configurableProductOptions": [

            ],
            "items": [

            ],
            "sku": 900056,
            "sdmId": 56,
            "imageSmall": "/d/u/dummy-product.png",
            "imageThumbnail": "/d/u/dummy-product.png",
            "image": "/d/u/dummy-product.png",
            "taxClassId": 2,
            "virtualGroup": 16298,
            "visibility": 4,
            "sel1Value": -1,
            "sel2Value": -1,
            "sel3Value": -1,
            "associative": 0
          }
        ],
        "sku": 900056,
        "sdmId": 56,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 16298,
        "visibility": 4,
        "associative": 0
      },

      {
        "id": 1696,
        "position": 13,
        "name": "Pepsi",
        "description": "Soft Drink",
        "inSide": 0,
        "finalPrice": 9,
        "specialPrice": 9,
        "catId": 36,
        "promoId": -1,
        "metaKeyword": [
          "Pepsi"
        ],
        "bundleProductOptions": [

        ],
        "selectedItem": 600003,
        "configurableProductOptions": [
          {
            "id": 144,
            "position": 1,
            "name": "Choose your Size",
            "title": "Choose your Size",
            "subtitle": "Choose your Size",
            "selIndex": 1,
            "options": [
              {
                "isSelected": 0,
                "position": 1,
                "name": "Regular",
                "title": "Regular",
                "id": 16285
              },
              {
                "isSelected": 1,
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
            ]
          }
        ],
        "typeId": "configurable",
        "originalTypeId": "configurable",
        "items": [
          {
            "id": 1604,
            "position": 0,
            "name": "Pepsi Regular",
            "title": "Pepsi Regular",
            "description": "",
            "imageThumbnail": "/d/u/dummy-product.png",
            "finalPrice": 8,
            "specialPrice": 8,
            "metaKeyword": [

            ],
            "typeId": "simple",
            "sel1Value": 16285,
            "sel2Value": -1,
            "sel3Value": -1,
            "sku": 600002,
            "sdmId": 600002
          },
          {
            "id": 1605,
            "position": 0,
            "name": "Pepsi Medium",
            "title": "Pepsi Medium",
            "description": "",
            "imageThumbnail": "/d/u/dummy-product.png",
            "finalPrice": 9,
            "specialPrice": 9,
            "metaKeyword": [

            ],
            "typeId": "simple",
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "sku": 600003,
            "sdmId": 600003
          },
          {
            "id": 1606,
            "position": 0,
            "name": "Pepsi Large",
            "title": "Pepsi Large",
            "description": "",
            "imageThumbnail": "/d/u/dummy-product.png",
            "finalPrice": 10,
            "specialPrice": 10,
            "metaKeyword": [

            ],
            "typeId": "simple",
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "sku": 600004,
            "sdmId": 600004
          }
        ],
        "sku": 1,
        "sdmId": 1,
        "imageSmall": "/d/u/dummy-product.png",
        "imageThumbnail": "/d/u/dummy-product.png",
        "image": "/d/u/dummy-product.png",
        "taxClassId": 2,
        "virtualGroup": 0,
        "visibility": 4,
        "associative": 0
      },
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



                // DealID: 0,
                // ID: 0,
                // ItemID: i.sdmId,
                // ModCode: "NONE",
                // Name: i.name,
                // QCComponent: -1,
                // QCInstanceID: instanceId,
                // QCLevel: 0,
                // QCProID: product.promoId,
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
                        QCComponent: pl.compId,
                        QCInstanceID: instanceId,
                        QCLevel: 0,
                        QCProID: product.promoId,
                      }
                      product.bundleProductOptions.forEach(plbpo => {
                        if (plbpo.position == pl.dependentSteps[0]) {
                          if (plbpo.type == "stepper") {
                            plbpo.productLinks.forEach(plbpopl => {
                              for (let i = 0; i < plbpopl.selectionQty; i++) {
                                obj.Entries.CEntry.push({
                                  DealID: 0,
                                  ID: 0,
                                  ItemID: plbpopl.sdmId,
                                  ModCode: "NONE",
                                  Name: plbpopl.name,
                                  QCComponent: plbpopl.compId,
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
                          QCComponent: 0,
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


    // console.log("Entries", JSON.stringify(Entries))

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