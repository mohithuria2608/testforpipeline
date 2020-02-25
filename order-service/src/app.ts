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
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [

        ],
        "catId": 36,
        "configurableProductOptions": [
          {
            "id": 144,
            "options": [
              {
                "id": 16285,
                "isSelected": 1,
                "position": 1,
                "title": "Regular"
              },
              {
                "id": 16287,
                "isSelected": 0,
                "position": 2,
                "title": "Medium"
              },
              {
                "id": 16286,
                "isSelected": 0,
                "position": 3,
                "title": "Large"
              },
              {
                "id": 16294,
                "isSelected": 0,
                "position": 4,
                "title": "Family"
              }
            ],
            "position": 1,
            "selIndex": 1,
            "subtitle": "Choice of Size",
            "title": "Choice of Size"
          }
        ],
        "description": "",
        "finalPrice": 9.5,
        "id": 1708,
        "image": "/v/r/vrg5000083.png",
        "imageSmall": "/v/r/vrg5000083.png",
        "imageThumbnail": "/v/r/vrg5000083.png",
        "inSide": 0,
        "items": [
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 8.5,
            "id": 1639,
            "imageThumbnail": "/m/e/menupotatodipper.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Potato Dipper- Regular",
            "position": 0,
            "promoId": 0,
            "sdmId": 510071,
            "sel1Value": 16285,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510071,
            "specialPrice": 8.5,
            "taxClassId": 0,
            "title": "Potato Dipper- Regular",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 9.5,
            "id": 1640,
            "imageThumbnail": "/imagestemp/itm510072.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Medium Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510072,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510072,
            "specialPrice": 9.5,
            "taxClassId": 0,
            "title": "Medium Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 10.5,
            "id": 1641,
            "imageThumbnail": "/imagestemp/itm510073.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Large Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510073,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510073,
            "specialPrice": 10.5,
            "taxClassId": 0,
            "title": "Large Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 15,
            "id": 1638,
            "imageThumbnail": "/imagestemp/itm510074.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Family Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510074,
            "sel1Value": 16294,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510074,
            "specialPrice": 15,
            "taxClassId": 0,
            "title": "Family Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          }
        ],
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#36",
        "langMenuIdCatIdProductId": "En#1#36#1708",
        "langMenuIdProductId": "En#1#1708",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "Dipper Fries"
        ],
        "name": "Dipper Fries",
        "originalTypeId": "configurable",
        "position": 1,
        "promoId": -1,
        "sdmId": 5000083,
        "selectedItem": 510071,
        "sellingPrice": 8.5,
        "sku": 5000083,
        "specialPrice": 9.5,
        "taxClassId": 2,
        "typeId": "configurable",
        "viewIdentifier": 0,
        "virtualGroup": 16298,
        "visibility": 4
      },
      {
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [

        ],
        "catId": 36,
        "configurableProductOptions": [
          {
            "id": 144,
            "options": [
              {
                "id": 16285,
                "isSelected": 0,
                "position": 1,
                "title": "Regular"
              },
              {
                "id": 16287,
                "isSelected": 1,
                "position": 2,
                "title": "Medium"
              },
              {
                "id": 16286,
                "isSelected": 0,
                "position": 3,
                "title": "Large"
              },
              {
                "id": 16294,
                "isSelected": 0,
                "position": 4,
                "title": "Family"
              }
            ],
            "position": 1,
            "selIndex": 1,
            "subtitle": "Choice of Size",
            "title": "Choice of Size"
          }
        ],
        "description": "",
        "finalPrice": 9.5,
        "id": 1708,
        "image": "/v/r/vrg5000083.png",
        "imageSmall": "/v/r/vrg5000083.png",
        "imageThumbnail": "/v/r/vrg5000083.png",
        "inSide": 0,
        "items": [
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 8.5,
            "id": 1639,
            "imageThumbnail": "/m/e/menupotatodipper.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Potato Dipper- Regular",
            "position": 0,
            "promoId": 0,
            "sdmId": 510071,
            "sel1Value": 16285,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510071,
            "specialPrice": 8.5,
            "taxClassId": 0,
            "title": "Potato Dipper- Regular",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 9.5,
            "id": 1640,
            "imageThumbnail": "/imagestemp/itm510072.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Medium Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510072,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510072,
            "specialPrice": 9.5,
            "taxClassId": 0,
            "title": "Medium Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 10.5,
            "id": 1641,
            "imageThumbnail": "/imagestemp/itm510073.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Large Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510073,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510073,
            "specialPrice": 10.5,
            "taxClassId": 0,
            "title": "Large Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 15,
            "id": 1638,
            "imageThumbnail": "/imagestemp/itm510074.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Family Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510074,
            "sel1Value": 16294,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510074,
            "specialPrice": 15,
            "taxClassId": 0,
            "title": "Family Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          }
        ],
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#36",
        "langMenuIdCatIdProductId": "En#1#36#1708",
        "langMenuIdProductId": "En#1#1708",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "Dipper Fries"
        ],
        "name": "Dipper Fries",
        "originalTypeId": "configurable",
        "position": 1,
        "promoId": -1,
        "sdmId": 5000083,
        "selectedItem": 510072,
        "sellingPrice": 9.5,
        "sku": 5000083,
        "specialPrice": 9.5,
        "taxClassId": 2,
        "typeId": "configurable",
        "viewIdentifier": 0,
        "virtualGroup": 16298,
        "visibility": 4
      },
      {
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [

        ],
        "catId": 36,
        "configurableProductOptions": [
          {
            "id": 144,
            "options": [
              {
                "id": 16285,
                "isSelected": 0,
                "position": 1,
                "title": "Regular"
              },
              {
                "id": 16287,
                "isSelected": 0,
                "position": 2,
                "title": "Medium"
              },
              {
                "id": 16286,
                "isSelected": 1,
                "position": 3,
                "title": "Large"
              },
              {
                "id": 16294,
                "isSelected": 0,
                "position": 4,
                "title": "Family"
              }
            ],
            "position": 1,
            "selIndex": 1,
            "subtitle": "Choice of Size",
            "title": "Choice of Size"
          }
        ],
        "description": "",
        "finalPrice": 9.5,
        "id": 1708,
        "image": "/v/r/vrg5000083.png",
        "imageSmall": "/v/r/vrg5000083.png",
        "imageThumbnail": "/v/r/vrg5000083.png",
        "inSide": 0,
        "items": [
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 8.5,
            "id": 1639,
            "imageThumbnail": "/m/e/menupotatodipper.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Potato Dipper- Regular",
            "position": 0,
            "promoId": 0,
            "sdmId": 510071,
            "sel1Value": 16285,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510071,
            "specialPrice": 8.5,
            "taxClassId": 0,
            "title": "Potato Dipper- Regular",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 9.5,
            "id": 1640,
            "imageThumbnail": "/imagestemp/itm510072.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Medium Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510072,
            "sel1Value": 16287,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510072,
            "specialPrice": 9.5,
            "taxClassId": 0,
            "title": "Medium Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 10.5,
            "id": 1641,
            "imageThumbnail": "/imagestemp/itm510073.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Large Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510073,
            "sel1Value": 16286,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510073,
            "specialPrice": 10.5,
            "taxClassId": 0,
            "title": "Large Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          },
          {
            "associative": 0,
            "catId": 0,
            "description": "",
            "finalPrice": 15,
            "id": 1638,
            "imageThumbnail": "/imagestemp/itm510074.png",
            "inSide": 0,
            "metaKeyword": [

            ],
            "name": "Family Dipper Fries",
            "position": 0,
            "promoId": 0,
            "sdmId": 510074,
            "sel1Value": 16294,
            "sel2Value": -1,
            "sel3Value": -1,
            "selectedItem": 0,
            "sku": 510074,
            "specialPrice": 15,
            "taxClassId": 0,
            "title": "Family Dipper Fries",
            "typeId": "simple",
            "virtualGroup": 0,
            "visibility": 0
          }
        ],
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#36",
        "langMenuIdCatIdProductId": "En#1#36#1708",
        "langMenuIdProductId": "En#1#1708",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "Dipper Fries"
        ],
        "name": "Dipper Fries",
        "originalTypeId": "configurable",
        "position": 1,
        "promoId": -1,
        "sdmId": 5000083,
        "selectedItem": 510073,
        "sellingPrice": 10.5,
        "sku": 5000083,
        "specialPrice": 9.5,
        "taxClassId": 2,
        "typeId": "configurable",
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
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    //  let detail =  await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 39787090 })
    console.log("detail")
  } catch (error) {
    console.error(error)
  }
})()
