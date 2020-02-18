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


    let stock: any = [
      {
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [
          {
            "compId": 1,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 0,
            "minimumQty": 0,
            "position": 1,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [
                  2,
                  3
                ],
                "id": 1783,
                "imageThumbnail": "/i/t/itm410012.png",
                "modGroupId": -1,
                "name": "15 Pcs Super Bucket",
                "option_id": 1632,
                "position": 1,
                "price": 0,
                "sdmId": 410012,
                "selected": 1,
                "selection_id": 12304,
                "selectionQty": 1,
                "sku": 410012,
                "subOptions": [

                ],
                "title": "15 Pcs Super Bucket"
              }
            ],
            "subtitle": "Choose your favourite flavour",
            "title": "Choose your favourite flavour",
            "type": "radio"
          },
          {
            "compId": 1,
            "imageThumbnail": "/v/r/vrg5000086.png",
            "ingredient": 0,
            "isDependent": 1,
            "isModifier": 1,
            "maximumQty": 15,
            "minimumQty": 15,
            "position": 2,
            "productLinks": [
              {
                "default": 1,
                "dependentSteps": [

                ],
                "id": 1644,
                "imageThumbnail": "/imagestemp/itm910001.png",
                "modGroupId": 10201,
                "name": "Chicken Pc - Original",
                "option_id": 1604,
                "position": 1,
                "price": 0,
                "sdmId": 910001,
                "selected": 1,
                "selection_id": 12218,
                "selectionQty": 8,
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
                "modGroupId": 10201,
                "name": "Chicken Pc - Spicy",
                "option_id": 1604,
                "position": 2,
                "price": 0,
                "sdmId": 910002,
                "selected": 0,
                "selection_id": 12219,
                "selectionQty": 7,
                "sku": 910002,
                "subOptions": [

                ],
                "title": "Chicken Pc - Spicy"
              }
            ],
            "subtitle": "Choice of Chicken",
            "title": "Choice of Chicken",
            "type": "stepper"
          },
          {
            "compId": 1,
            "imageThumbnail": "/v/r/vrg5000086.png",
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
                "modGroupId": 10208,
                "name": "Crispy Strips Original",
                "option_id": 1605,
                "position": 1,
                "price": 0,
                "sdmId": 511001,
                "selected": 1,
                "selection_id": 12220,
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
                "modGroupId": 10208,
                "name": "Crispy Strips Spicy",
                "option_id": 1605,
                "position": 2,
                "price": 0,
                "sdmId": 511002,
                "selected": 0,
                "selection_id": 12221,
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
            "imageThumbnail": "/v/r/vrg5000086.png",
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
                "id": 1620,
                "imageThumbnail": "/imagestemp/itm510002.png",
                "modGroupId": -1,
                "name": "Coleslaw Salad Large",
                "option_id": 1607,
                "position": 1,
                "price": 0,
                "sdmId": 510002,
                "selected": 1,
                "selection_id": 12230,
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
                "option_id": 1607,
                "position": 2,
                "price": 3,
                "sdmId": 510005,
                "selected": 0,
                "selection_id": 12231,
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
                "option_id": 1607,
                "position": 3,
                "price": 6,
                "sdmId": 510014,
                "selected": 0,
                "selection_id": 12232,
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
                "option_id": 1607,
                "position": 4,
                "price": 8,
                "sdmId": 510030,
                "selected": 0,
                "selection_id": 12233,
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
                "option_id": 1607,
                "position": 5,
                "price": 9,
                "sdmId": 510074,
                "selected": 0,
                "selection_id": 12234,
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
                "option_id": 1607,
                "position": 6,
                "price": 15,
                "sdmId": 510076,
                "selected": 0,
                "selection_id": 12235,
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
            "imageThumbnail": "/v/r/vrg5000086.png",
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
                "id": 1632,
                "imageThumbnail": "/imagestemp/itm510005.png",
                "modGroupId": -1,
                "name": "Family Fries",
                "option_id": 1606,
                "position": 1,
                "price": 0,
                "sdmId": 510005,
                "selected": 1,
                "selection_id": 12222,
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
                "option_id": 1606,
                "position": 2,
                "price": 3,
                "sdmId": 510014,
                "selected": 0,
                "selection_id": 12223,
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
                "option_id": 1606,
                "position": 3,
                "price": 0,
                "sdmId": 510002,
                "selected": 0,
                "selection_id": 12224,
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
                "option_id": 1606,
                "position": 4,
                "price": 5,
                "sdmId": 510030,
                "selected": 0,
                "selection_id": 12225,
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
                "option_id": 1606,
                "position": 5,
                "price": 0,
                "sdmId": 510068,
                "selected": 0,
                "selection_id": 12226,
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
                "option_id": 1606,
                "position": 6,
                "price": 6,
                "sdmId": 510074,
                "selected": 0,
                "selection_id": 12227,
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
                "option_id": 1606,
                "position": 7,
                "price": 12,
                "sdmId": 510076,
                "selected": 0,
                "selection_id": 12228,
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
                "option_id": 1606,
                "position": 8,
                "price": 5,
                "sdmId": 510080,
                "selected": 0,
                "selection_id": 12229,
                "selectionQty": 1,
                "sku": 510080,
                "subOptions": [

                ],
                "title": "Loaded Fries P.Chili Fami"
              }
            ],
            "subtitle": "Choice of second side item",
            "title": "Choice of second side item",
            "type": "radio"
          },
          {
            "compId": 4,
            "imageThumbnail": "/v/r/vrg5000086.png",
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
                "option_id": 1608,
                "position": 1,
                "price": 0,
                "sdmId": 610034,
                "selected": 1,
                "selection_id": 12236,
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
                "option_id": 1608,
                "position": 2,
                "price": 0,
                "sdmId": 610035,
                "selected": 0,
                "selection_id": 12237,
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
                "option_id": 1608,
                "position": 3,
                "price": 0,
                "sdmId": 610036,
                "selected": 0,
                "selection_id": 12238,
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
                "option_id": 1608,
                "position": 4,
                "price": 0,
                "sdmId": 610037,
                "selected": 0,
                "selection_id": 12239,
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
                "option_id": 1608,
                "position": 5,
                "price": 0,
                "sdmId": 610038,
                "selected": 0,
                "selection_id": 12240,
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
                "option_id": 1608,
                "position": 6,
                "price": 21,
                "sdmId": 610033,
                "selected": 0,
                "selection_id": 12241,
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
        "description": "15 chicken pcs + 5 crispy strips + 1 family fries + 1 family coleslaw + 5 bun + 2.25 L drink",
        "finalPrice": 100,
        "id": 1769,
        "image": "/v/r/vrg5000086.png",
        "imageSmall": "/v/r/vrg5000086.png",
        "imageThumbnail": "/v/r/vrg5000086.png",
        "inSide": 1,
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#35",
        "langMenuIdCatIdProductId": "En#1#35#1769",
        "langMenuIdProductId": "En#1#1769",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "15 Pcs Super Bucket"
        ],
        "name": "15 Pcs Super Bucket",
        "originalTypeId": "bundle",
        "position": 3,
        "selectedItem": 0,
        "sellingPrice": 100,
        "sku": 900059,
        "specialPrice": 100,
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
      }
    })

    console.log("Entries", JSON.stringify(Entries))

    await bootstrap(server)

    let order = {
      "AddressID": "10512324",
      "AreaID": "1786",// "16",
      "BackupStoreID": "2",
      "ConceptID": "3",
      "CustomerID": "7694143",
      "Entries": Entries,
      "OrderMode": "1",
      "OriginalStoreID": "1240",
      "PaidOnline": "0",
      "ServiceCharge": "0.25",
      "Source": "4",
      "Status": "0",
      "StoreID": "1240",
      "SubTotal": "2.75",
      "Total": "3.0",
      "ValidateStore": "1"
    }
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    // await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: orderPlaced })

  } catch (error) {
    console.error(error)
  }
})()