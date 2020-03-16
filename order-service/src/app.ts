if (process.env.NODE_ENV == 'staging')
  require('newrelic');
process.env.ALLOW_CONFIG_MUTATIONS = "true";
global.healthcheck = {}
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
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [
          {
            "compId": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 2,
            "minimumQty": 2,
            "position": 1,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1642,
                "imageThumbnail": "/imagestemp/413002.png",
                "modGroupId": -1,
                "name": "Super Mega Deal - Original",
                "option_id": 1436,
                "position": 1,
                "price": 0,
                "sdmId": 413002,
                "selected": 1,
                "selection_id": 11190,
                "selectionQty": 1,
                "sku": 413002,
                "subOptions": [

                ],
                "title": "Super Mega Deal - Original"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1643,
                "imageThumbnail": "/imagestemp/413003.png",
                "modGroupId": -1,
                "name": "Super Mega Deal - Spicy",
                "option_id": 1436,
                "position": 2,
                "price": 0,
                "sdmId": 413003,
                "selected": 0,
                "selection_id": 11191,
                "selectionQty": 1,
                "sku": 413003,
                "subOptions": [

                ],
                "title": "Super Mega Deal - Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [
                  2
                ],
                "id": 1772,
                "imageThumbnail": "/imagestemp/413004.png",
                "modGroupId": -1,
                "name": "Super Mega Deal - Mix",
                "option_id": 1436,
                "position": 3,
                "price": 0,
                "sdmId": 413004,
                "selected": 0,
                "selection_id": 12342,
                "selectionQty": 1,
                "sku": 413004,
                "subOptions": [

                ],
                "title": "Super Mega Deal - Mix"
              }
            ],
            "subtitle": "Choose Your Favorite Flavor",
            "title": "Choose Your Favorite Flavor",
            "type": "radio"
          },
          {
            "compId": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "isDependent": 1,
            "isModifier": 1,
            "maximumQty": 12,
            "minimumQty": 12,
            "position": 2,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1645,
                "imageThumbnail": "/imagestemp/910002.png",
                "modGroupId": 10217,
                "name": "Chicken Pc - Spicy",
                "option_id": 1628,
                "position": 1,
                "price": 0,
                "sdmId": 910002,
                "selected": 1,
                "selection_id": 12288,
                "selectionQty": 6,
                "sku": 910002,
                "subOptions": [

                ],
                "title": "Chicken Pc - Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1644,
                "imageThumbnail": "/imagestemp/910001.png",
                "modGroupId": 10217,
                "name": "Chicken Pc - Original",
                "option_id": 1628,
                "position": 2,
                "price": 0,
                "sdmId": 910001,
                "selected": 0,
                "selection_id": 12289,
                "selectionQty": 6,
                "sku": 910001,
                "subOptions": [

                ],
                "title": "Chicken Pc - Original"
              }
            ],
            "subtitle": "Select 12 Pieces Of Your Favorite Flavor",
            "title": "Select 12 Pieces Of Your Favorite Flavor",
            "type": "stepper"
          },
          {
            "compId": 2,
            "imageThumbnail": "/imagestemp/0.png",
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

                ],
                "id": 1632,
                "imageThumbnail": "/imagestemp/510005.png",
                "modGroupId": -1,
                "name": "Family Fries",
                "option_id": 1437,
                "position": 1,
                "price": 0,
                "sdmId": 510005,
                "selected": 1,
                "selection_id": 11193,
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
                "imageThumbnail": "/imagestemp/510014.png",
                "modGroupId": -1,
                "name": "Family Fries Spicy",
                "option_id": 1437,
                "position": 2,
                "price": 3,
                "sdmId": 510014,
                "selected": 0,
                "selection_id": 11194,
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
                "imageThumbnail": "/imagestemp/510030.png",
                "modGroupId": -1,
                "name": "Loaded Fries Family",
                "option_id": 1437,
                "position": 3,
                "price": 5,
                "sdmId": 510030,
                "selected": 0,
                "selection_id": 11195,
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
                "imageThumbnail": "/imagestemp/510074.png",
                "modGroupId": -1,
                "name": "Family Dipper Fries",
                "option_id": 1437,
                "position": 4,
                "price": 6,
                "sdmId": 510074,
                "selected": 0,
                "selection_id": 11196,
                "selectionQty": 1,
                "sku": 510074,
                "subOptions": [

                ],
                "title": "Family Dipper Fries"
              }
            ],
            "subtitle": " Select Your Favorite Side Item",
            "title": " Select Your Favorite Side Item",
            "type": "radio"
          }
        ],
        "catId": 21,
        "configurableProductOptions": [

        ],
        "description": "12 chicken pcs & Family fries",
        "finalPrice": 49,
        "id": 1728,
        "image": "/imagestemp/900067.png",
        "imageSmall": "/imagestemp/900067.png",
        "imageThumbnail": "/imagestemp/900067.png",
        "inSide": 1,
        "langMenuId": "En#1",
        "langMenuIdCatId": "En#1#21",
        "langMenuIdCatIdProductId": "En#1#21#1728",
        "langMenuIdProductId": "En#1#1728",
        "language": "En",
        "menuId": 1,
        "metaKeyword": [
          "Super Mega Deal"
        ],
        "name": "Super Mega Deal",
        "originalTypeId": "bundle",
        "orignalPrice": 49,
        "position": 3,
        "promoId": 55,
        "sdmId": 67,
        "selectedItem": 0,
        "sellingPrice": 49,
        "sku": 900067,
        "specialPrice": 49,
        "taxClassId": 2,
        "tempBundleProductOptions": [
          {
            "compId": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "isDependent": 0,
            "isModifier": 0,
            "maximumQty": 2,
            "minimumQty": 2,
            "position": 1,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1642,
                "imageThumbnail": "/imagestemp/413002.png",
                "modGroupId": -1,
                "name": "Super Mega Deal - Original",
                "option_id": 1436,
                "position": 1,
                "price": 0,
                "sdmId": 413002,
                "selected": 1,
                "selection_id": 11190,
                "selectionQty": 1,
                "sku": 413002,
                "subOptions": [

                ],
                "title": "Super Mega Deal - Original"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1643,
                "imageThumbnail": "/imagestemp/413003.png",
                "modGroupId": -1,
                "name": "Super Mega Deal - Spicy",
                "option_id": 1436,
                "position": 2,
                "price": 0,
                "sdmId": 413003,
                "selected": 0,
                "selection_id": 11191,
                "selectionQty": 1,
                "sku": 413003,
                "subOptions": [

                ],
                "title": "Super Mega Deal - Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [
                  2
                ],
                "id": 1772,
                "imageThumbnail": "/imagestemp/413004.png",
                "modGroupId": -1,
                "name": "Super Mega Deal - Mix",
                "option_id": 1436,
                "position": 3,
                "price": 0,
                "sdmId": 413004,
                "selected": 0,
                "selection_id": 12342,
                "selectionQty": 1,
                "sku": 413004,
                "subOptions": [

                ],
                "title": "Super Mega Deal - Mix"
              }
            ],
            "subtitle": "Choose Your Favorite Flavor",
            "title": "Choose Your Favorite Flavor",
            "type": "radio"
          },
          {
            "compId": 1,
            "imageThumbnail": "/imagestemp/0.png",
            "ingredient": 0,
            "isDependent": 1,
            "isModifier": 1,
            "maximumQty": 12,
            "minimumQty": 12,
            "position": 2,
            "productLinks": [
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1645,
                "imageThumbnail": "/imagestemp/910002.png",
                "modGroupId": 10217,
                "name": "Chicken Pc - Spicy",
                "option_id": 1628,
                "position": 1,
                "price": 0,
                "sdmId": 910002,
                "selected": 1,
                "selection_id": 12288,
                "selectionQty": 6,
                "sku": 910002,
                "subOptions": [

                ],
                "title": "Chicken Pc - Spicy"
              },
              {
                "default": 0,
                "dependentSteps": [

                ],
                "id": 1644,
                "imageThumbnail": "/imagestemp/910001.png",
                "modGroupId": 10217,
                "name": "Chicken Pc - Original",
                "option_id": 1628,
                "position": 2,
                "price": 0,
                "sdmId": 910001,
                "selected": 0,
                "selection_id": 12289,
                "selectionQty": 6,
                "sku": 910001,
                "subOptions": [

                ],
                "title": "Chicken Pc - Original"
              }
            ],
            "subtitle": "Select 12 Pieces Of Your Favorite Flavor",
            "title": "Select 12 Pieces Of Your Favorite Flavor",
            "type": "stepper"
          },
          {
            "compId": 2,
            "imageThumbnail": "/imagestemp/0.png",
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

                ],
                "id": 1632,
                "imageThumbnail": "/imagestemp/510005.png",
                "modGroupId": -1,
                "name": "Family Fries",
                "option_id": 1437,
                "position": 1,
                "price": 0,
                "sdmId": 510005,
                "selected": 1,
                "selection_id": 11193,
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
                "imageThumbnail": "/imagestemp/510014.png",
                "modGroupId": -1,
                "name": "Family Fries Spicy",
                "option_id": 1437,
                "position": 2,
                "price": 3,
                "sdmId": 510014,
                "selected": 0,
                "selection_id": 11194,
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
                "imageThumbnail": "/imagestemp/510030.png",
                "modGroupId": -1,
                "name": "Loaded Fries Family",
                "option_id": 1437,
                "position": 3,
                "price": 5,
                "sdmId": 510030,
                "selected": 0,
                "selection_id": 11195,
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
                "imageThumbnail": "/imagestemp/510074.png",
                "modGroupId": -1,
                "name": "Family Dipper Fries",
                "option_id": 1437,
                "position": 4,
                "price": 6,
                "sdmId": 510074,
                "selected": 0,
                "selection_id": 11196,
                "selectionQty": 1,
                "sku": 510074,
                "subOptions": [

                ],
                "title": "Family Dipper Fries"
              }
            ],
            "subtitle": " Select Your Favorite Side Item",
            "title": " Select Your Favorite Side Item",
            "type": "radio"
          }
        ],
        "typeId": "bundle",
        "viewIdentifier": 0,
        "virtualGroup": 16298,
        "visibility": 4
      },
      {
        "qty": 1,
        "associative": 0,
        "bundleProductOptions": [

        ],
        "catId": 38,
        "configurableProductOptions": [

        ],
        "description": "",
        "finalPrice": 0,
        "id": 1645,
        "image": "/m/e/menuchickenpc.png",
        "imageSmall": "/m/e/menuchickenpc.png",
        "imageThumbnail": "/imagestemp/910002.png",
        "inSide": 0,
        "items": [

        ],
        "metaKeyword": [
          "Chicken Pc - Spicy"
        ],
        "name": "Chicken Pc - Spicy",
        "originalTypeId": "simple",
        "position": 0,
        "promoId": -1,
        "sdmId": 910002,
        "selectedItem": 0,
        "sku": 910002,
        "specialPrice": 0,
        "taxClassId": 2,
        "typeId": "simple",
        "virtualGroup": 0,
        "visibility": 4
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
              "ItemID": 110005,
              "ModCode": "NONE",
              "Name": "Mighty Zinger",
              "QCComponent": 1,
              "QCInstanceID": 329,
              "QCLevel": 0,
              "QCProID": 65
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
              "ItemID": 110003,
              "ModCode": "NONE",
              "Name": "Twister Sandwich - Original",
              "QCComponent": 2,
              "QCInstanceID": 329,
              "QCLevel": 0,
              "QCProID": 65
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510050,
              "ModCode": "NONE",
              "Name": "Medium Fries",
              "QCComponent": 3,
              "QCInstanceID": 329,
              "QCLevel": 0,
              "QCProID": 65
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 600003,
              "ModCode": "NONE",
              "Name": "Pepsi Medium",
              "QCComponent": 4,
              "QCInstanceID": 329,
              "QCLevel": 0,
              "QCProID": 65
            },
            {
              "DealID": 0,
              "Entries": {
                "CEntry": [

                ]
              },
              "ID": 0,
              "ItemID": 910010,
              "ModCode": "NONE",
              "Name": "Chicken Pc (S) Ges",
              "QCComponent": -1,
              "QCInstanceID": 594,
              "QCLevel": 0,
              "QCProID": -1
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
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 39838313 })
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