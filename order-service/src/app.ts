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
      "cartId": "5e4d99b98a99527940bbca52",
      "couponCode": "",
      "curMenuId": 1,
      "items": [
        {
          "id": 16,
          "position": 4,
          "name": "Mighty Twist",
          "description": "Mighty Zinger + Twister + Fries + Pepsi",
          "inSide": 1,
          "finalPrice": 28,
          "specialPrice": 0,
          "catId": 21,
          "promoId": 65,
          "metaKeyword": [
            "Mighty Twist - Medium"
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
                  "imageThumbnail": "\/i\/t\/itm45_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1616,
                      "selection_id": 12278,
                      "price": 0,
                      "id": 1659,
                      "name": "Mighty Zinger",
                      "title": "Mighty Zinger",
                      "imageThumbnail": "\/imagestemp\/itm110005.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 110005,
                      "sdmId": 110005,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": [
                        2
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
                  "compId": 1,
                  "isModifier": 1,
                  "imageThumbnail": "\/i\/t\/itm45_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1438,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1719,
                      "name": "American Cheese",
                      "title": "American Cheese",
                      "imageThumbnail": "\/imagestemp\/itm810001.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1719,
                          "selection_id": 12467,
                          "price": 2,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1717,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        },
                        {
                          "option_id": 1719,
                          "selection_id": 12468,
                          "price": 4,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1718,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        }
                      ],
                      "selected": 1,
                      "sku": 810001,
                      "sdmId": 810001,
                      "default": 0,
                      "modGroupId": 10028,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1438,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1723,
                      "name": "Lettuce",
                      "title": "Lettuce",
                      "imageThumbnail": "\/imagestemp\/itm811701.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1723,
                          "selection_id": 12469,
                          "price": 0,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1721,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1723,
                          "selection_id": 12470,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1722,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 1,
                      "sku": 811701,
                      "sdmId": 811701,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1438,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1727,
                      "name": "Tomato",
                      "title": "Tomato",
                      "imageThumbnail": "\/imagestemp\/itm811703.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1727,
                          "selection_id": 12471,
                          "price": 0,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1725,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1727,
                          "selection_id": 12472,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1726,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 1,
                      "sku": 811703,
                      "sdmId": 811703,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    }
                  ],
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "isDependent": 1
                },
                {
                  "position": 3,
                  "name": "Choice of Second Sandwich",
                  "title": "Choice of Second Sandwich",
                  "subtitle": "Choice of Second Sandwich",
                  "ingredient": 0,
                  "type": "radio",
                  "compId": 2,
                  "isModifier": 0,
                  "imageThumbnail": "\/i\/t\/itm45_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1439,
                      "selection_id": 11208,
                      "price": 0,
                      "id": 1648,
                      "name": "Twister Sandwich - Original",
                      "title": "Twister Sandwich - Original",
                      "imageThumbnail": "\/imagestemp\/itm110003.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 110003,
                      "sdmId": 110003,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": [
                        4
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
                      "imageThumbnail": "\/imagestemp\/itm110002.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 110002,
                      "sdmId": 110002,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": [
                        4
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
                  "ingredient": 1,
                  "type": "checkbox",
                  "compId": 2,
                  "isModifier": 1,
                  "imageThumbnail": "\/i\/t\/itm45_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1614,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1719,
                      "name": "American Cheese",
                      "title": "American Cheese",
                      "imageThumbnail": "\/imagestemp\/itm810001.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1719,
                          "selection_id": 12473,
                          "price": 2,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1717,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        },
                        {
                          "option_id": 1719,
                          "selection_id": 12474,
                          "price": 4,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1718,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        }
                      ],
                      "selected": 1,
                      "sku": 810001,
                      "sdmId": 810001,
                      "default": 0,
                      "modGroupId": 10028,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1614,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1723,
                      "name": "Lettuce",
                      "title": "Lettuce",
                      "imageThumbnail": "\/imagestemp\/itm811701.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1723,
                          "selection_id": 12475,
                          "price": 0,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1721,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1723,
                          "selection_id": 12476,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1722,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 1,
                      "sku": 811701,
                      "sdmId": 811701,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1614,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1727,
                      "name": "Tomato",
                      "title": "Tomato",
                      "imageThumbnail": "\/imagestemp\/itm811703.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1727,
                          "selection_id": 12477,
                          "price": 0,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1725,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1727,
                          "selection_id": 12478,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1726,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 1,
                      "sku": 811703,
                      "sdmId": 811703,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    }
                  ],
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "isDependent": 1
                },
                {
                  "position": 5,
                  "name": "Choice of side item",
                  "title": "Choice of side item",
                  "subtitle": "Choice of side item",
                  "ingredient": 0,
                  "type": "radio",
                  "compId": 3,
                  "isModifier": 0,
                  "imageThumbnail": "\/i\/t\/itm45_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1440,
                      "selection_id": 11210,
                      "price": 0,
                      "id": 1633,
                      "name": "Medium Fries",
                      "title": "Medium Fries",
                      "imageThumbnail": "\/imagestemp\/itm510050.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 510050,
                      "sdmId": 510050,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 2,
                      "option_id": 1440,
                      "selection_id": 11211,
                      "price": 1,
                      "id": 1637,
                      "name": "Medium Fries Spicy",
                      "title": "Medium Fries Spicy",
                      "imageThumbnail": "\/imagestemp\/itm510051.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510051,
                      "sdmId": 510051,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1440,
                      "selection_id": 11212,
                      "price": 0,
                      "id": 1619,
                      "name": "Coleslaw Salad Small",
                      "title": "Coleslaw Salad Small",
                      "imageThumbnail": "\/imagestemp\/itm510001.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510001,
                      "sdmId": 510001,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 4,
                      "option_id": 1440,
                      "selection_id": 11213,
                      "price": 3,
                      "id": 1628,
                      "name": "Loaded Fries Regular",
                      "title": "Loaded Fries Regular",
                      "imageThumbnail": "\/imagestemp\/itm510036.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510036,
                      "sdmId": 510036,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1440,
                      "selection_id": 11214,
                      "price": 1,
                      "id": 1639,
                      "name": "Potato Dipper- Regular",
                      "title": "Potato Dipper- Regular",
                      "imageThumbnail": "\/imagestemp\/itm510071.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510071,
                      "sdmId": 510071,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 6,
                      "option_id": 1440,
                      "selection_id": 11215,
                      "price": 5,
                      "id": 1650,
                      "name": "Cheese Potato Dipper",
                      "title": "Cheese Potato Dipper",
                      "imageThumbnail": "\/imagestemp\/itm510075.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510075,
                      "sdmId": 510075,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 7,
                      "option_id": 1440,
                      "selection_id": 11216,
                      "price": 3,
                      "id": 1651,
                      "name": "Loaded Fries P.Chili Reg",
                      "title": "Loaded Fries P.Chili Reg",
                      "imageThumbnail": "\/imagestemp\/itm510079.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510079,
                      "sdmId": 510079,
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
                  "imageThumbnail": "\/i\/t\/itm45_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1441,
                      "selection_id": 11217,
                      "price": 0,
                      "id": 1605,
                      "name": "Pepsi Medium",
                      "title": "Pepsi Medium",
                      "imageThumbnail": "\/imagestemp\/itm600003.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 600003,
                      "sdmId": 600003,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 2,
                      "option_id": 1441,
                      "selection_id": 11218,
                      "price": 0,
                      "id": 1617,
                      "name": "Mirinda Medium",
                      "title": "Mirinda Medium",
                      "imageThumbnail": "\/imagestemp\/itm600009.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600009,
                      "sdmId": 600009,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1441,
                      "selection_id": 11219,
                      "price": 0,
                      "id": 1612,
                      "name": "7Up Medium",
                      "title": "7Up Medium",
                      "imageThumbnail": "\/imagestemp\/itm600016.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600016,
                      "sdmId": 600016,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 4,
                      "option_id": 1441,
                      "selection_id": 11220,
                      "price": 0,
                      "id": 1607,
                      "name": "Diet Pepsi Medium",
                      "title": "Diet Pepsi Medium",
                      "imageThumbnail": "\/imagestemp\/itm600006.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600006,
                      "sdmId": 600006,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1441,
                      "selection_id": 11221,
                      "price": 0,
                      "id": 1614,
                      "name": "Mountain Dew Medium",
                      "title": "Mountain Dew Medium",
                      "imageThumbnail": "\/imagestemp\/itm600013.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600013,
                      "sdmId": 600013,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 6,
                      "option_id": 1441,
                      "selection_id": 11222,
                      "price": 5.5,
                      "id": 1600,
                      "name": "Mojito Krusher",
                      "title": "Mojito Krusher",
                      "imageThumbnail": "\/imagestemp\/itm610021.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610021,
                      "sdmId": 610021,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 7,
                      "option_id": 1441,
                      "selection_id": 11223,
                      "price": 0,
                      "id": 1652,
                      "name": "Small Aquafina",
                      "title": "Small Aquafina",
                      "imageThumbnail": "\/imagestemp\/itm610011.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610011,
                      "sdmId": 610011,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 8,
                      "option_id": 1441,
                      "selection_id": 11224,
                      "price": 8.5,
                      "id": 1599,
                      "name": "Fresh Orange Juice",
                      "title": "Fresh Orange Juice",
                      "imageThumbnail": "\/imagestemp\/itm610020.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610020,
                      "sdmId": 610020,
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
              "items": [],
              "sku": 900070,
              "sdmId": 70,
              "imageSmall": "\/i\/t\/itm45_1.png",
              "imageThumbnail": "\/i\/t\/itm45_1.png",
              "image": "\/i\/t\/itm45_1.png",
              "taxClassId": 2,
              "virtualGroup": 16298,
              "visibility": 4,
              "sel1Value": 16287,
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
                  "imageThumbnail": "\/i\/t\/itm44_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1617,
                      "selection_id": 12279,
                      "price": 0,
                      "id": 1659,
                      "name": "Mighty Zinger",
                      "title": "Mighty Zinger",
                      "imageThumbnail": "\/imagestemp\/itm110005.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 110005,
                      "sdmId": 110005,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": [
                        2
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
                  "compId": 1,
                  "isModifier": 1,
                  "imageThumbnail": "\/i\/t\/itm44_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1442,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1719,
                      "name": "American Cheese",
                      "title": "American Cheese",
                      "imageThumbnail": "\/imagestemp\/itm810001.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1719,
                          "selection_id": 12461,
                          "price": 2,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1717,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        },
                        {
                          "option_id": 1719,
                          "selection_id": 12462,
                          "price": 4,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1718,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        }
                      ],
                      "selected": 1,
                      "sku": 810001,
                      "sdmId": 810001,
                      "default": 0,
                      "modGroupId": 10028,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1442,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1723,
                      "name": "Lettuce",
                      "title": "Lettuce",
                      "imageThumbnail": "\/imagestemp\/itm811701.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1723,
                          "selection_id": 12463,
                          "price": 0,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1721,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1723,
                          "selection_id": 12464,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1722,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 1,
                      "sku": 811701,
                      "sdmId": 811701,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1442,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1727,
                      "name": "Tomato",
                      "title": "Tomato",
                      "imageThumbnail": "\/imagestemp\/itm811703.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1727,
                          "selection_id": 12465,
                          "price": 0,
                          "selected": 1,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1725,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1727,
                          "selection_id": 12466,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1726,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 1,
                      "sku": 811703,
                      "sdmId": 811703,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    }
                  ],
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "isDependent": 1
                },
                {
                  "position": 3,
                  "name": "Choice of Second Sandwich",
                  "title": "Choice of Second Sandwich",
                  "subtitle": "Choice of Second Sandwich",
                  "ingredient": 0,
                  "type": "radio",
                  "compId": 2,
                  "isModifier": 0,
                  "imageThumbnail": "\/i\/t\/itm44_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1443,
                      "selection_id": 11234,
                      "price": 0,
                      "id": 1648,
                      "name": "Twister Sandwich - Original",
                      "title": "Twister Sandwich - Original",
                      "imageThumbnail": "\/imagestemp\/itm110003.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 110003,
                      "sdmId": 110003,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": [
                        4
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
                      "imageThumbnail": "\/imagestemp\/itm110002.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 110002,
                      "sdmId": 110002,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": [
                        4
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
                  "compId": 2,
                  "isModifier": 1,
                  "imageThumbnail": "\/i\/t\/itm44_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1615,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1719,
                      "name": "American Cheese",
                      "title": "American Cheese",
                      "imageThumbnail": "\/imagestemp\/itm810001.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1719,
                          "selection_id": 12479,
                          "price": 2,
                          "selected": 0,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1717,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        },
                        {
                          "option_id": 1719,
                          "selection_id": 12480,
                          "price": 4,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1718,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        }
                      ],
                      "selected": 1,
                      "sku": 810001,
                      "sdmId": 810001,
                      "default": 0,
                      "modGroupId": 10028,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1615,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1723,
                      "name": "Lettuce",
                      "title": "Lettuce",
                      "imageThumbnail": "\/imagestemp\/itm811701.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1723,
                          "selection_id": 12481,
                          "price": 0,
                          "selected": 0,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1721,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1723,
                          "selection_id": 12482,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1722,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 0,
                      "sku": 811701,
                      "sdmId": 811701,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1615,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1727,
                      "name": "Tomato",
                      "title": "Tomato",
                      "imageThumbnail": "\/imagestemp\/itm811703.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1727,
                          "selection_id": 12483,
                          "price": 0,
                          "selected": 0,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1725,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1727,
                          "selection_id": 12484,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1726,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 0,
                      "sku": 811703,
                      "sdmId": 811703,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    }
                  ],
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "isDependent": 1
                },
                {
                  "position": 5,
                  "name": "Choice of side item",
                  "title": "Choice of side item",
                  "subtitle": "Choice of side item",
                  "ingredient": 0,
                  "type": "radio",
                  "compId": 3,
                  "isModifier": 0,
                  "imageThumbnail": "\/i\/t\/itm44_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1444,
                      "selection_id": 11236,
                      "price": 0,
                      "id": 1631,
                      "name": "Large Fries",
                      "title": "Large Fries",
                      "imageThumbnail": "\/imagestemp\/itm510006.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 510006,
                      "sdmId": 510006,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 2,
                      "option_id": 1444,
                      "selection_id": 11237,
                      "price": 1,
                      "id": 1634,
                      "name": "Large Fries Spicy",
                      "title": "Large Fries Spicy",
                      "imageThumbnail": "\/imagestemp\/itm510013.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510013,
                      "sdmId": 510013,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1444,
                      "selection_id": 11238,
                      "price": 0,
                      "id": 1619,
                      "name": "Coleslaw Salad Small",
                      "title": "Coleslaw Salad Small",
                      "imageThumbnail": "\/imagestemp\/itm510001.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510001,
                      "sdmId": 510001,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 4,
                      "option_id": 1444,
                      "selection_id": 11239,
                      "price": 3,
                      "id": 1628,
                      "name": "Loaded Fries Regular",
                      "title": "Loaded Fries Regular",
                      "imageThumbnail": "\/imagestemp\/itm510036.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510036,
                      "sdmId": 510036,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1444,
                      "selection_id": 11240,
                      "price": 1,
                      "id": 1639,
                      "name": "Potato Dipper- Regular",
                      "title": "Potato Dipper- Regular",
                      "imageThumbnail": "\/imagestemp\/itm510071.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510071,
                      "sdmId": 510071,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 6,
                      "option_id": 1444,
                      "selection_id": 11241,
                      "price": 5,
                      "id": 1650,
                      "name": "Cheese Potato Dipper",
                      "title": "Cheese Potato Dipper",
                      "imageThumbnail": "\/imagestemp\/itm510075.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510075,
                      "sdmId": 510075,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 7,
                      "option_id": 1444,
                      "selection_id": 11242,
                      "price": 3,
                      "id": 1651,
                      "name": "Loaded Fries P.Chili Reg",
                      "title": "Loaded Fries P.Chili Reg",
                      "imageThumbnail": "\/imagestemp\/itm510079.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510079,
                      "sdmId": 510079,
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
                  "imageThumbnail": "\/i\/t\/itm44_1.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1445,
                      "selection_id": 11243,
                      "price": 0,
                      "id": 1606,
                      "name": "Pepsi Large",
                      "title": "Pepsi Large",
                      "imageThumbnail": "\/imagestemp\/itm600004.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 600004,
                      "sdmId": 600004,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 2,
                      "option_id": 1445,
                      "selection_id": 11244,
                      "price": 0,
                      "id": 1618,
                      "name": "Mirinda Large",
                      "title": "Mirinda Large",
                      "imageThumbnail": "\/imagestemp\/itm600010.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600010,
                      "sdmId": 600010,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1445,
                      "selection_id": 11245,
                      "price": 0,
                      "id": 1610,
                      "name": "7Up Large",
                      "title": "7Up Large",
                      "imageThumbnail": "\/imagestemp\/itm600017.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600017,
                      "sdmId": 600017,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 4,
                      "option_id": 1445,
                      "selection_id": 11246,
                      "price": 0,
                      "id": 1609,
                      "name": "Diet Pepsi Large",
                      "title": "Diet Pepsi Large",
                      "imageThumbnail": "\/imagestemp\/itm600007.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600007,
                      "sdmId": 600007,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1445,
                      "selection_id": 11247,
                      "price": 0,
                      "id": 1615,
                      "name": "Mountain Dew Large",
                      "title": "Mountain Dew Large",
                      "imageThumbnail": "\/imagestemp\/itm600014.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600014,
                      "sdmId": 600014,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 6,
                      "option_id": 1445,
                      "selection_id": 11248,
                      "price": 5.5,
                      "id": 1600,
                      "name": "Mojito Krusher",
                      "title": "Mojito Krusher",
                      "imageThumbnail": "\/imagestemp\/itm610021.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610021,
                      "sdmId": 610021,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 7,
                      "option_id": 1445,
                      "selection_id": 11249,
                      "price": 0,
                      "id": 1652,
                      "name": "Small Aquafina",
                      "title": "Small Aquafina",
                      "imageThumbnail": "\/imagestemp\/itm610011.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610011,
                      "sdmId": 610011,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 8,
                      "option_id": 1445,
                      "selection_id": 11250,
                      "price": 8.5,
                      "id": 1599,
                      "name": "Fresh Orange Juice",
                      "title": "Fresh Orange Juice",
                      "imageThumbnail": "\/imagestemp\/itm610020.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610020,
                      "sdmId": 610020,
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
              "items": [],
              "sku": 900071,
              "sdmId": 71,
              "imageSmall": "\/i\/t\/itm44_1.png",
              "imageThumbnail": "\/i\/t\/itm44_1.png",
              "image": "\/i\/t\/itm44_1.png",
              "taxClassId": 2,
              "virtualGroup": 16298,
              "visibility": 4,
              "sel1Value": 16286,
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
                  "imageThumbnail": "\/i\/t\/itm15.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1458,
                      "selection_id": 11327,
                      "price": 0,
                      "id": 1648,
                      "name": "Twister Sandwich - Original",
                      "title": "Twister Sandwich - Original",
                      "imageThumbnail": "\/imagestemp\/itm110003.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 110003,
                      "sdmId": 110003,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": [
                        2
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
                      "imageThumbnail": "\/imagestemp\/itm110002.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 110002,
                      "sdmId": 110002,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": [
                        2
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
                  "compId": 1,
                  "isModifier": 1,
                  "imageThumbnail": "\/i\/t\/itm15.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1459,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1719,
                      "name": "American Cheese",
                      "title": "American Cheese",
                      "imageThumbnail": "\/imagestemp\/itm810001.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1719,
                          "selection_id": 12491,
                          "price": 2,
                          "selected": 0,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1717,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        },
                        {
                          "option_id": 1719,
                          "selection_id": 12492,
                          "price": 4,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1718,
                          "sku": 810001,
                          "sdmId": 810001,
                          "modGroupId": 10028
                        }
                      ],
                      "selected": 1,
                      "sku": 810001,
                      "sdmId": 810001,
                      "default": 0,
                      "modGroupId": 10028,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1459,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1723,
                      "name": "Lettuce",
                      "title": "Lettuce",
                      "imageThumbnail": "\/imagestemp\/itm811701.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1723,
                          "selection_id": 12493,
                          "price": 0,
                          "selected": 0,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1721,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1723,
                          "selection_id": 12494,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1722,
                          "sku": 811701,
                          "sdmId": 811701,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 0,
                      "sku": 811701,
                      "sdmId": 811701,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1459,
                      "selection_id": 0,
                      "price": 0,
                      "id": 1727,
                      "name": "Tomato",
                      "title": "Tomato",
                      "imageThumbnail": "\/imagestemp\/itm811703.png",
                      "selectionQty": 1,
                      "subOptions": [
                        {
                          "option_id": 1727,
                          "selection_id": 12495,
                          "price": 0,
                          "selected": 0,
                          "name": "Regular",
                          "title": "Regular",
                          "id": 1725,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        },
                        {
                          "option_id": 1727,
                          "selection_id": 12496,
                          "price": 0,
                          "selected": 0,
                          "name": "Extra",
                          "title": "Extra",
                          "id": 1726,
                          "sku": 811703,
                          "sdmId": 811703,
                          "modGroupId": 10027
                        }
                      ],
                      "selected": 0,
                      "sku": 811703,
                      "sdmId": 811703,
                      "default": 0,
                      "modGroupId": 10027,
                      "dependentSteps": []
                    }
                  ],
                  "maximumQty": 0,
                  "minimumQty": 0,
                  "isDependent": 1
                },
                {
                  "position": 3,
                  "name": "Choice of side item",
                  "title": "Choice of side item",
                  "subtitle": "Choice of side item",
                  "ingredient": 0,
                  "type": "radio",
                  "compId": 2,
                  "isModifier": 0,
                  "imageThumbnail": "\/i\/t\/itm15.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1460,
                      "selection_id": 11335,
                      "price": 0,
                      "id": 1631,
                      "name": "Large Fries",
                      "title": "Large Fries",
                      "imageThumbnail": "\/imagestemp\/itm510006.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 510006,
                      "sdmId": 510006,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 2,
                      "option_id": 1460,
                      "selection_id": 11336,
                      "price": 1,
                      "id": 1634,
                      "name": "Large Fries Spicy",
                      "title": "Large Fries Spicy",
                      "imageThumbnail": "\/imagestemp\/itm510013.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510013,
                      "sdmId": 510013,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1460,
                      "selection_id": 11337,
                      "price": 0,
                      "id": 1619,
                      "name": "Coleslaw Salad Small",
                      "title": "Coleslaw Salad Small",
                      "imageThumbnail": "\/imagestemp\/itm510001.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510001,
                      "sdmId": 510001,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 4,
                      "option_id": 1460,
                      "selection_id": 11338,
                      "price": 3,
                      "id": 1628,
                      "name": "Loaded Fries Regular",
                      "title": "Loaded Fries Regular",
                      "imageThumbnail": "\/imagestemp\/itm510036.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510036,
                      "sdmId": 510036,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1460,
                      "selection_id": 11339,
                      "price": 1,
                      "id": 1641,
                      "name": "Large Dipper Fries",
                      "title": "Large Dipper Fries",
                      "imageThumbnail": "\/imagestemp\/itm510073.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510073,
                      "sdmId": 510073,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 6,
                      "option_id": 1460,
                      "selection_id": 11340,
                      "price": 5,
                      "id": 1650,
                      "name": "Cheese Potato Dipper",
                      "title": "Cheese Potato Dipper",
                      "imageThumbnail": "\/imagestemp\/itm510075.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510075,
                      "sdmId": 510075,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 7,
                      "option_id": 1460,
                      "selection_id": 11341,
                      "price": 3,
                      "id": 1651,
                      "name": "Loaded Fries P.Chili Reg",
                      "title": "Loaded Fries P.Chili Reg",
                      "imageThumbnail": "\/imagestemp\/itm510079.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 510079,
                      "sdmId": 510079,
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
                  "position": 4,
                  "name": "Choice of Beverages",
                  "title": "Choice of Beverages",
                  "subtitle": "Choice of Beverages",
                  "ingredient": 0,
                  "type": "radio",
                  "compId": 3,
                  "isModifier": 0,
                  "imageThumbnail": "\/i\/t\/itm15.png",
                  "productLinks": [
                    {
                      "position": 1,
                      "option_id": 1461,
                      "selection_id": 11342,
                      "price": 0,
                      "id": 1606,
                      "name": "Pepsi Large",
                      "title": "Pepsi Large",
                      "imageThumbnail": "\/imagestemp\/itm600004.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 1,
                      "sku": 600004,
                      "sdmId": 600004,
                      "default": 1,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 2,
                      "option_id": 1461,
                      "selection_id": 11343,
                      "price": 0,
                      "id": 1618,
                      "name": "Mirinda Large",
                      "title": "Mirinda Large",
                      "imageThumbnail": "\/imagestemp\/itm600010.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600010,
                      "sdmId": 600010,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 3,
                      "option_id": 1461,
                      "selection_id": 11344,
                      "price": 0,
                      "id": 1610,
                      "name": "7Up Large",
                      "title": "7Up Large",
                      "imageThumbnail": "\/imagestemp\/itm600017.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600017,
                      "sdmId": 600017,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 4,
                      "option_id": 1461,
                      "selection_id": 11345,
                      "price": 0,
                      "id": 1609,
                      "name": "Diet Pepsi Large",
                      "title": "Diet Pepsi Large",
                      "imageThumbnail": "\/imagestemp\/itm600007.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600007,
                      "sdmId": 600007,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 5,
                      "option_id": 1461,
                      "selection_id": 11346,
                      "price": 0,
                      "id": 1615,
                      "name": "Mountain Dew Large",
                      "title": "Mountain Dew Large",
                      "imageThumbnail": "\/imagestemp\/itm600014.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600014,
                      "sdmId": 600014,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 6,
                      "option_id": 1461,
                      "selection_id": 11347,
                      "price": 7.5,
                      "id": 1600,
                      "name": "Mojito Krusher",
                      "title": "Mojito Krusher",
                      "imageThumbnail": "\/imagestemp\/itm610021.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610021,
                      "sdmId": 610021,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 7,
                      "option_id": 1461,
                      "selection_id": 11348,
                      "price": 0,
                      "id": 1652,
                      "name": "Small Aquafina",
                      "title": "Small Aquafina",
                      "imageThumbnail": "\/imagestemp\/itm610011.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610011,
                      "sdmId": 610011,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 8,
                      "option_id": 1461,
                      "selection_id": 11349,
                      "price": 8.5,
                      "id": 1599,
                      "name": "Fresh Orange Juice",
                      "title": "Fresh Orange Juice",
                      "imageThumbnail": "\/imagestemp\/itm610020.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610020,
                      "sdmId": 610020,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 9,
                      "option_id": 1461,
                      "selection_id": 11350,
                      "price": 3,
                      "id": 1655,
                      "name": "Lemon Mint Ice Tea",
                      "title": "Lemon Mint Ice Tea",
                      "imageThumbnail": "\/imagestemp\/itm610019.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610019,
                      "sdmId": 610019,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 10,
                      "option_id": 1461,
                      "selection_id": 11351,
                      "price": 0,
                      "id": 1656,
                      "name": "Pepsi Can",
                      "title": "Pepsi Can",
                      "imageThumbnail": "\/imagestemp\/itm600001.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 600001,
                      "sdmId": 600001,
                      "default": 0,
                      "modGroupId": -1,
                      "dependentSteps": []
                    },
                    {
                      "position": 11,
                      "option_id": 1461,
                      "selection_id": 11352,
                      "price": 0,
                      "id": 1657,
                      "name": "Pepsi 500ML",
                      "title": "Pepsi 500ML",
                      "imageThumbnail": "\/imagestemp\/itm610000.png",
                      "selectionQty": 1,
                      "subOptions": [],
                      "selected": 0,
                      "sku": 610000,
                      "sdmId": 610000,
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
              "items": [],
              "sku": 900015,
              "sdmId": 15,
              "imageSmall": "\/i\/t\/itm15.png",
              "imageThumbnail": "\/i\/t\/itm15.png",
              "image": "\/i\/t\/itm15.png",
              "taxClassId": 2,
              "virtualGroup": 16298,
              "visibility": 4,
              "sel1Value": 16286,
              "sel2Value": -1,
              "sel3Value": -1,
              "associative": 0
            }
          ],
          "sku": 900070,
          "sdmId": 70,
          "imageSmall": "\/i\/t\/itm45_1.png",
          "imageThumbnail": "\/i\/t\/itm45_1.png",
          "image": "\/i\/t\/itm45_1.png",
          "taxClassId": 2,
          "virtualGroup": 16298,
          "visibility": 4,
          "associative": 0
        }],
      "lat": 0,
      "lng": 0,
      "menuUpdatedAt": 1579911326000
    }, { cmsUserRef: 12 })


    let stock: any = []
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
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910001,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Original",
                    "QCComponent": 1,
                    "QCInstanceID": 702,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 302,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 302,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 302,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 302,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 302,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 302,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 910002,
                    "ModCode": "NONE",
                    "Name": "Chicken Pc - Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 302,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511001,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Original",
                    "QCComponent": 1,
                    "QCInstanceID": 759,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511001,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Original",
                    "QCComponent": 1,
                    "QCInstanceID": 759,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511001,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Original",
                    "QCComponent": 1,
                    "QCInstanceID": 759,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511002,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 124,
                    "QCLevel": 0,
                    "QCProID": 31
                  },
                  {
                    "DealID": 0,
                    "ID": 0,
                    "ItemID": 511002,
                    "ModCode": "NONE",
                    "Name": "Crispy Strips Spicy",
                    "QCComponent": 1,
                    "QCInstanceID": 124,
                    "QCLevel": 0,
                    "QCProID": 31
                  }
                ]
              },
              "ID": 0,
              "ItemID": 410012,
              "ModCode": "NONE",
              "Name": "15 Pcs Super Bucket",
              "QCComponent": 1,
              "QCInstanceID": 854,
              "QCLevel": 0,
              "QCProID": 31
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510002,
              "ModCode": "NONE",
              "Name": "Coleslaw Salad Large",
              "QCComponent": 3,
              "QCInstanceID": 854,
              "QCLevel": 0,
              "QCProID": 31
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510005,
              "ModCode": "NONE",
              "Name": "Family Fries",
              "QCComponent": 2,
              "QCInstanceID": 854,
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
              "QCInstanceID": 854,
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
  } catch (error) {
    console.error(error)
  }
})()
