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
        "promoId": -1,
        "originalTypeId": "simple",
        "image": "/imagestemp/110032.png",
        "langMenuIdCatIdProductId": "En#1#34#1677",
        "qty": 1,
        "imageThumbnail": "/imagestemp/110032.png",
        "orignalPrice": 20,
        "catId": 34,
        "langMenuIdCatId": "En#1#34",
        "inSide": 0,
        "name": "Kentucky Burger Fillet",
        "position": 5,
        "language": "En",
        "metaKeyword": [
          "KENTUCKY BURGER FILLET"
        ],
        "associative": 0,
        "taxClassId": 2,
        "id": 1677,
        "bundleProductOptions": [
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 1,
            "productLinks": [
              {
                "default": 0,
                "option_id": 0,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "American Cheese",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/810001.png",
                "sdmId": 0,
                "modGroupId": 10028,
                "id": 76,
                "sku": 810001,
                "subOptions": [
                  {
                    "option_id": 0,
                    "price": 2,
                    "product_id": 1717,
                    "selection_id": 0,
                    "sdmId": 810001,
                    "modGroupId": 0,
                    "id": 227,
                    "sku": 810001,
                    "name": "Regular",
                    "selected": 1,
                    "title": "Regular"
                  },
                  {
                    "option_id": 0,
                    "price": 4,
                    "product_id": 1718,
                    "selection_id": 0,
                    "sdmId": 810001,
                    "modGroupId": 0,
                    "id": 228,
                    "sku": 810001,
                    "name": "Extra",
                    "selected": 0,
                    "title": "Extra"
                  }
                ],
                "price": 0,
                "selected": 0,
                "title": "American Cheese"
              },
              {
                "default": 0,
                "option_id": 0,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Lettuce",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811701.png",
                "sdmId": 0,
                "modGroupId": 10027,
                "id": 77,
                "sku": 811701,
                "subOptions": [
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1721,
                    "selection_id": 0,
                    "sdmId": 811701,
                    "modGroupId": 0,
                    "id": 230,
                    "sku": 811701,
                    "name": "Regular",
                    "selected": 1,
                    "title": "Regular"
                  },
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1722,
                    "selection_id": 0,
                    "sdmId": 811701,
                    "modGroupId": 0,
                    "id": 231,
                    "sku": 811701,
                    "name": "Extra",
                    "selected": 0,
                    "title": "Extra"
                  }
                ],
                "price": 0,
                "selected": 0,
                "title": "Lettuce"
              },
              {
                "default": 0,
                "option_id": 0,
                "dependentSteps": [],
                "position": 3,
                "selectionQty": 1,
                "name": "Tomato",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811703.png",
                "sdmId": 0,
                "modGroupId": 10027,
                "id": 78,
                "sku": 811703,
                "subOptions": [
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1725,
                    "selection_id": 0,
                    "sdmId": 811703,
                    "modGroupId": 0,
                    "id": 233,
                    "sku": 811703,
                    "name": "Regular",
                    "selected": 1,
                    "title": "Regular"
                  },
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1726,
                    "selection_id": 0,
                    "sdmId": 811703,
                    "modGroupId": 0,
                    "id": 234,
                    "sku": 811703,
                    "name": "Extra",
                    "selected": 0,
                    "title": "Extra"
                  }
                ],
                "price": 0,
                "selected": 0,
                "title": "Tomato"
              }
            ],
            "ingredient": 1,
            "isDependent": 0,
            "maximumQty": 0,
            "title": "Choose Your Condiments",
            "type": "checkbox",
            "imageThumbnail": "/imagestemp/110032.png",
            "subtitle": "Choose Your Condiments",
            "compId": 0
          }
        ],
        "description": "New Kentucky Burger with double chicken patty, potato chips, Turkey ham and melting cheese putting ...",
        "tempBundleProductOptions": [
          {
            "isModifier": 0,
            "minimumQty": 0,
            "position": 1,
            "productLinks": [
              {
                "default": 0,
                "option_id": 0,
                "dependentSteps": [],
                "position": 1,
                "selectionQty": 1,
                "name": "American Cheese",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/810001.png",
                "sdmId": 0,
                "modGroupId": 10028,
                "id": 76,
                "sku": 810001,
                "subOptions": [
                  {
                    "option_id": 0,
                    "price": 2,
                    "product_id": 1717,
                    "selection_id": 0,
                    "sdmId": 810001,
                    "modGroupId": 0,
                    "id": 227,
                    "sku": 810001,
                    "name": "Regular",
                    "selected": 1,
                    "title": "Regular"
                  },
                  {
                    "option_id": 0,
                    "price": 4,
                    "product_id": 1718,
                    "selection_id": 0,
                    "sdmId": 810001,
                    "modGroupId": 0,
                    "id": 228,
                    "sku": 810001,
                    "name": "Extra",
                    "selected": 0,
                    "title": "Extra"
                  }
                ],
                "price": 0,
                "selected": 0,
                "title": "American Cheese"
              },
              {
                "default": 0,
                "option_id": 0,
                "dependentSteps": [],
                "position": 2,
                "selectionQty": 1,
                "name": "Lettuce",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811701.png",
                "sdmId": 0,
                "modGroupId": 10027,
                "id": 77,
                "sku": 811701,
                "subOptions": [
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1721,
                    "selection_id": 0,
                    "sdmId": 811701,
                    "modGroupId": 0,
                    "id": 230,
                    "sku": 811701,
                    "name": "Regular",
                    "selected": 1,
                    "title": "Regular"
                  },
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1722,
                    "selection_id": 0,
                    "sdmId": 811701,
                    "modGroupId": 0,
                    "id": 231,
                    "sku": 811701,
                    "name": "Extra",
                    "selected": 0,
                    "title": "Extra"
                  }
                ],
                "price": 0,
                "selected": 0,
                "title": "Lettuce"
              },
              {
                "default": 0,
                "option_id": 0,
                "dependentSteps": [],
                "position": 3,
                "selectionQty": 1,
                "name": "Tomato",
                "selection_id": 0,
                "imageThumbnail": "/imagestemp/811703.png",
                "sdmId": 0,
                "modGroupId": 10027,
                "id": 78,
                "sku": 811703,
                "subOptions": [
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1725,
                    "selection_id": 0,
                    "sdmId": 811703,
                    "modGroupId": 0,
                    "id": 233,
                    "sku": 811703,
                    "name": "Regular",
                    "selected": 1,
                    "title": "Regular"
                  },
                  {
                    "option_id": 0,
                    "price": 0,
                    "product_id": 1726,
                    "selection_id": 0,
                    "sdmId": 811703,
                    "modGroupId": 0,
                    "id": 234,
                    "sku": 811703,
                    "name": "Extra",
                    "selected": 0,
                    "title": "Extra"
                  }
                ],
                "price": 0,
                "selected": 0,
                "title": "Tomato"
              }
            ],
            "ingredient": 1,
            "isDependent": 0,
            "maximumQty": 0,
            "title": "Choose Your Condiments",
            "type": "checkbox",
            "imageThumbnail": "/imagestemp/110032.png",
            "subtitle": "Choose Your Condiments",
            "compId": 0
          }
        ],
        "configurableProductOptions": [],
        "finalPrice": 20,
        "imageSmall": "/imagestemp/110032.png",
        "langMenuId": "En#1",
        "langMenuIdProductId": "En#1#1677",
        "menuId": 1,
        "sdmId": 110032,
        "selectedItem": 0,
        "sellingPrice": 20,
        "sku": 110032,
        "specialPrice": 20,
        "typeId": "bundle",
        "viewIdentifier": 0,
        "virtualGroup": 16298,
        "visibility": 4
      },
      {
        "configurableProductOptions": [
          {
            "position": 1,
            "tempOptions": [
              {
                "isSelected": 0,
                "position": 1,
                "title": "Regular",
                "id": 16285
              },
              {
                "isSelected": 0,
                "position": 2,
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 0,
                "position": 3,
                "title": "Large",
                "id": 16286
              },
              {
                "isSelected": 1,
                "position": 4,
                "title": "Family",
                "id": 16294
              }
            ],
            "subtitle": "Choice of Size",
            "id": 144,
            "options": [
              {
                "isSelected": 0,
                "position": 1,
                "title": "Regular",
                "id": 16285
              },
              {
                "isSelected": 0,
                "position": 2,
                "title": "Medium",
                "id": 16287
              },
              {
                "isSelected": 0,
                "position": 3,
                "title": "Large",
                "id": 16286
              },
              {
                "isSelected": 1,
                "position": 4,
                "title": "Family",
                "id": 16294
              }
            ],
            "selIndex": 1,
            "title": "Choice of Size"
          }
        ],
        "tempItemList": [
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Potato Dipper- Regular",
            "selectedItem": 0,
            "specialPrice": 8.5,
            "imageThumbnail": "/imagestemp/510071.png",
            "visibility": 0,
            "finalPrice": 8.5,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510071,
            "title": "Potato Dipper- Regular",
            "sel2Value": -1,
            "sel1Value": 16285,
            "id": 1639,
            "description": "",
            "sku": 510071,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          },
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Medium Dipper Fries",
            "selectedItem": 0,
            "specialPrice": 9.5,
            "imageThumbnail": "/imagestemp/510072.png",
            "visibility": 0,
            "finalPrice": 9.5,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510072,
            "title": "Medium Dipper Fries",
            "sel2Value": -1,
            "sel1Value": 16287,
            "id": 1640,
            "description": "",
            "sku": 510072,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          },
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Large Dipper Fries",
            "selectedItem": 0,
            "specialPrice": 10.5,
            "imageThumbnail": "/imagestemp/510073.png",
            "visibility": 0,
            "finalPrice": 10.5,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510073,
            "title": "Large Dipper Fries",
            "sel2Value": -1,
            "sel1Value": 16286,
            "id": 1641,
            "description": "",
            "sku": 510073,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          },
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Family Dipper Fries",
            "selectedItem": 0,
            "specialPrice": 15,
            "imageThumbnail": "/imagestemp/510074.png",
            "visibility": 0,
            "finalPrice": 15,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510074,
            "title": "Family Dipper Fries",
            "sel2Value": -1,
            "sel1Value": 16294,
            "id": 1638,
            "description": "",
            "sku": 510074,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          }
        ],
        "originalTypeId": "configurable",
        "langMenuId": "En#1",
        "imageThumbnail": "/imagestemp/5000083.png",
        "qty": 4,
        "id": 1708,
        "bundleProductOptions": [],
        "visibility": 4,
        "specialPrice": 9.5,
        "position": 1,
        "finalPrice": 9.5,
        "inSide": 0,
        "typeId": "configurable",
        "viewIdentifier": 0,
        "name": "Dipper Fries",
        "catId": 36,
        "menuId": 1,
        "imageSmall": "/imagestemp/5000083.png",
        "langMenuIdProductId": "En#1#1708",
        "associative": 0,
        "image": "/imagestemp/5000083.png",
        "description": "",
        "langMenuIdCatId": "En#1#36",
        "promoId": -1,
        "sdmId": 5000083,
        "items": [
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Potato Dipper- Regular",
            "selectedItem": 0,
            "specialPrice": 8.5,
            "imageThumbnail": "/imagestemp/510071.png",
            "visibility": 0,
            "finalPrice": 8.5,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510071,
            "title": "Potato Dipper- Regular",
            "sel2Value": -1,
            "sel1Value": 16285,
            "id": 1639,
            "description": "",
            "sku": 510071,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          },
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Medium Dipper Fries",
            "selectedItem": 0,
            "specialPrice": 9.5,
            "imageThumbnail": "/imagestemp/510072.png",
            "visibility": 0,
            "finalPrice": 9.5,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510072,
            "title": "Medium Dipper Fries",
            "sel2Value": -1,
            "sel1Value": 16287,
            "id": 1640,
            "description": "",
            "sku": 510072,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          },
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Large Dipper Fries",
            "selectedItem": 0,
            "specialPrice": 10.5,
            "imageThumbnail": "/imagestemp/510073.png",
            "visibility": 0,
            "finalPrice": 10.5,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510073,
            "title": "Large Dipper Fries",
            "sel2Value": -1,
            "sel1Value": 16286,
            "id": 1641,
            "description": "",
            "sku": 510073,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          },
          {
            "metaKeyword": [],
            "taxClassId": 0,
            "position": 0,
            "promoId": 0,
            "name": "Family Dipper Fries",
            "selectedItem": 0,
            "specialPrice": 15,
            "imageThumbnail": "/imagestemp/510074.png",
            "visibility": 0,
            "finalPrice": 15,
            "virtualGroup": 0,
            "typeId": "simple",
            "sdmId": 510074,
            "title": "Family Dipper Fries",
            "sel2Value": -1,
            "sel1Value": 16294,
            "id": 1638,
            "description": "",
            "sku": 510074,
            "catId": 0,
            "associative": 0,
            "inSide": 0,
            "sel3Value": -1
          }
        ],
        "langMenuIdCatIdProductId": "En#1#36#1708",
        "language": "En",
        "metaKeyword": [
          "Dipper Fries"
        ],
        "orignalPrice": 60,
        "selectedItem": 510074,
        "sellingPrice": 60,
        "sku": 5000083,
        "taxClassId": 2,
        "virtualGroup": 16298
      },
      {
        "items": [],
        "metaKeyword": [
          "Chicken Pc - Spicy"
        ],
        "originalTypeId": "simple",
        "configurableProductOptions": [],
        "position": 0,
        "promoId": -1,
        "name": "Chicken Pc - Spicy",
        "imageSmall": "/m/e/menuchickenpc.png",
        "selectedItem": 0,
        "specialPrice": 0,
        "catId": 38,
        "visibility": 4,
        "finalPrice": 0,
        "virtualGroup": 0,
        "typeId": "simple",
        "qty": 1,
        "sdmId": 910002,
        "id": 1645,
        "description": "",
        "sku": 910002,
        "imageThumbnail": "/imagestemp/910002.png",
        "associative": 0,
        "bundleProductOptions": [],
        "image": "/m/e/menuchickenpc.png",
        "inSide": 0,
        "taxClassId": 2
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
              "Entries": {
                "CEntry": [

                ]
              },
              "ID": 0,
              "ItemID": 110032,
              "ModCode": "NONE",
              "Name": "Kentucky Burger Fillet",
              "QCComponent": -1,
              "QCInstanceID": 137,
              "QCLevel": 0,
              "QCProID": -1
            },
            {
              "ItemID": 510074,
              "Level": 0,
              "ModCode": "NONE",
              "Name": "Family Dipper Fries",
              "OrdrMode": "OM_SAVED",
              "Price": 15,
              "Status": "NOTAPPLIED"
            },
            {
              "ItemID": 510074,
              "Level": 0,
              "ModCode": "NONE",
              "Name": "Family Dipper Fries",
              "OrdrMode": "OM_SAVED",
              "Price": 15,
              "Status": "NOTAPPLIED"
            },
            {
              "ItemID": 510074,
              "Level": 0,
              "ModCode": "NONE",
              "Name": "Family Dipper Fries",
              "OrdrMode": "OM_SAVED",
              "Price": 15,
              "Status": "NOTAPPLIED"
            },
            {
              "ItemID": 510074,
              "Level": 0,
              "ModCode": "NONE",
              "Name": "Family Dipper Fries",
              "OrdrMode": "OM_SAVED",
              "Price": 15,
              "Status": "NOTAPPLIED"
            },
            {
              "ItemID": 910002,
              "Level": 0,
              "ModCode": "NONE",
              "Name": "Chicken Pc - Spicy",
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
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 39838613, language: "En" })
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