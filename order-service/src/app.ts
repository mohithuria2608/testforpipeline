if (process.env.NODE_ENV == 'staging')
  require('newrelic');
process.env.ALLOW_CONFIG_MUTATIONS = "true";
global.healthcheck = {}
global.configSync = {
  general: 0,
  kafka: 0,
  orderStatus: 0,
  payment: 0,
  shipment: 0
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

    let stock: any = [
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
                    let plDefaultSdm = false
                    if (pl.selected == 1) {
                      if (pl.subOptions && pl.subOptions.length > 0) {
                        pl.subOptions.forEach(dsplso => {
                          if (dsplso.is_sdm_default == 1)
                            plDefaultSdm = true
                        })
                        let checkSendNone = false
                        pl.subOptions.forEach(so => {
                          if (so.selected == 1) {
                            checkSendNone = true
                            if (so.title == "None") { }
                            else if (so.title == "Regular") {
                              if (so.sdmId) {
                                if (so.is_sdm_default != undefined) {
                                  if (!plDefaultSdm)
                                    obj.Entries.CEntry.push({
                                      ID: 0,
                                      ItemID: so.sdmId,
                                      ModCode: "WITH",
                                      ModgroupID: pl.modGroupId ? pl.modGroupId : -1,
                                      Name: so.name,
                                      OrdrMode: "OM_SAVED",
                                      Weight: 0,
                                    })
                                }
                              }
                            } else if (so.title == "Extra") {
                              if (so.sdmId) {
                                if (so.is_sdm_default != undefined) {
                                  if (plDefaultSdm)
                                    obj.Entries.CEntry.push({
                                      ID: 0,
                                      ItemID: so.sdmId,
                                      ModCode: "WITH",
                                      ModgroupID: pl.modGroupId,
                                      Name: so.name,
                                      OrdrMode: "OM_SAVED",
                                      Weight: 0,
                                    })
                                  else
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
                                } else {
                                  obj.Entries.CEntry.push({
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
                            }
                          }
                        })
                        if (plDefaultSdm && !checkSendNone) {
                          obj.Entries.CEntry.push({
                            ID: 0,
                            ItemID: pl.subOptions[0].sdmId,
                            ModCode: "NONE",
                            ModgroupID: pl.subOptions[0].modGroupId ? pl.subOptions[0].modGroupId : -1,
                            Name: pl.name,
                            OrdrMode: "OM_SAVED",
                            Weight: 0,
                          })
                        }
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
                                i.bundleProductOptions.forEach(plbpo => {
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
                                    } else {
                                      /**
                                       * @description (ingredient == 1) :  "name": "Twister Meal"
                                       * @description (isModifier == 1) :  "name": "Mighty Twist"
                                       */
                                      if (plbpo.productLinks && plbpo.productLinks.length > 0) {
                                        plbpo.productLinks.forEach(dspl => {
                                          console.log("product name", dspl)

                                          let plDefaultSdm = false
                                          if (dspl.subOptions && dspl.subOptions.length > 0) {
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.is_sdm_default == 1)
                                                plDefaultSdm = true
                                            })
                                            console.log("plDefaultSdm", plDefaultSdm)
                                            let checkSendNone = false
                                            dspl.subOptions.forEach(dsplso => {
                                              if (dsplso.sdmId && dsplso.selected == 1) {
                                                checkSendNone = true
                                                console.log("product name", dspl.name)
                                                if (dsplso.title == "None") {
                                                }
                                                else if (dsplso.title == "Regular") {
                                                  if (dsplso.sdmId) {
                                                    if (dsplso.is_sdm_default != undefined) {
                                                      if (!plDefaultSdm)
                                                        obj.Entries.CEntry.push({
                                                          ID: 0,
                                                          ItemID: dsplso.sdmId,
                                                          ModCode: "WITH",
                                                          ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                          Name: dspl.name,
                                                          OrdrMode: "OM_SAVED",
                                                          Weight: 0,
                                                        })
                                                    }
                                                  }
                                                } else if (dsplso.title == "Extra") {
                                                  if (dsplso.sdmId) {
                                                    if (dsplso.is_sdm_default != undefined) {
                                                      if (plDefaultSdm)
                                                        obj.Entries.CEntry.push({
                                                          ID: 0,
                                                          ItemID: dsplso.sdmId,
                                                          ModCode: "WITH",
                                                          ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                          Name: dspl.name,
                                                          OrdrMode: "OM_SAVED",
                                                          Weight: 0,
                                                        })
                                                      else
                                                        obj.Entries.CEntry.push({
                                                          ID: 0,
                                                          ItemID: dsplso.sdmId,
                                                          ModCode: "WITH",
                                                          ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                          Name: dspl.name,
                                                          OrdrMode: "OM_SAVED",
                                                          Weight: 0,
                                                        }, {
                                                          ID: 0,
                                                          ItemID: dsplso.sdmId,
                                                          ModCode: "WITH",
                                                          ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                          Name: dspl.name,
                                                          OrdrMode: "OM_SAVED",
                                                          Weight: 0,
                                                        })
                                                    } else {
                                                      obj.Entries.CEntry.push({
                                                        ID: 0,
                                                        ItemID: dsplso.sdmId,
                                                        ModCode: "WITH",
                                                        ModgroupID: dspl.modGroupId ? dspl.modGroupId : -1,
                                                        Name: dspl.name,
                                                        OrdrMode: "OM_SAVED",
                                                        Weight: 0,
                                                      })
                                                    }
                                                  }
                                                }
                                              }
                                            })
                                            if (plDefaultSdm && !checkSendNone) {
                                              obj.Entries.CEntry.push({
                                                ID: 0,
                                                ItemID: dspl.subOptions[0].sdmId,
                                                ModCode: "NONE",
                                                ModgroupID: dspl.subOptions[0].modGroupId ? dspl.subOptions[0].modGroupId : -1,
                                                Name: dspl.name,
                                                OrdrMode: "OM_SAVED",
                                                Weight: 0,
                                              })
                                            }
                                          }
                                        })
                                      }
                                    }
                                  }
                                })
                                Entries.CEntry.push(obj)
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
                              let plDefaultSdm = false
                              if (bpopl.subOptions && bpopl.subOptions.length > 0) {
                                bpopl.subOptions.forEach(dsplso => {
                                  if (dsplso.is_sdm_default == 1)
                                    plDefaultSdm = true
                                })
                                let checkSendNone = false
                                bpopl.subOptions.forEach(bpoplso => {
                                  if (bpoplso.sdmId && bpoplso.selected == 1) {
                                    checkSendNone = true
                                    if (bpoplso.title == "None") { }
                                    else if (bpoplso.title == "Regular") {
                                      if (bpoplso.sdmId) {
                                        if (bpoplso.is_sdm_default != undefined) {
                                          if (!plDefaultSdm)
                                            lastProductAddedInCentry.Entries.CEntry.push({
                                              ID: 0,
                                              ItemID: bpoplso.sdmId,
                                              ModCode: "WITH",
                                              ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                              Name: bpopl.name,
                                              OrdrMode: "OM_SAVED",
                                              Weight: 0,
                                            })
                                        }
                                      }
                                    } else if (bpoplso.title == "Extra") {
                                      if (bpoplso.sdmId) {
                                        if (bpoplso.is_sdm_default != undefined) {
                                          if (plDefaultSdm)
                                            lastProductAddedInCentry.Entries.CEntry.push({
                                              ID: 0,
                                              ItemID: bpoplso.sdmId,
                                              ModCode: "WITH",
                                              ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                              Name: bpopl.name,
                                              OrdrMode: "OM_SAVED",
                                              Weight: 0,
                                            })
                                          else
                                            lastProductAddedInCentry.Entries.CEntry.push({
                                              ID: 0,
                                              ItemID: bpoplso.sdmId,
                                              ModCode: "WITH",
                                              ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                              Name: bpopl.name,
                                              OrdrMode: "OM_SAVED",
                                              Weight: 0,
                                            }, {
                                              ID: 0,
                                              ItemID: bpoplso.sdmId,
                                              ModCode: "WITH",
                                              ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                              Name: bpopl.name,
                                              OrdrMode: "OM_SAVED",
                                              Weight: 0,
                                            })

                                        } else {
                                          lastProductAddedInCentry.Entries.CEntry.push({
                                            ID: 0,
                                            ItemID: bpoplso.sdmId,
                                            ModCode: "WITH",
                                            ModgroupID: bpopl.modGroupId ? bpopl.modGroupId : -1,
                                            Name: bpopl.name,
                                            OrdrMode: "OM_SAVED",
                                            Weight: 0,
                                          })
                                        }
                                      }
                                    }
                                  }
                                })
                                if (plDefaultSdm && !checkSendNone) {
                                  lastProductAddedInCentry.Entries.CEntry.push({
                                    ID: 0,
                                    ItemID: bpopl.subOptions[0].sdmId,
                                    ModCode: "NONE",
                                    ModgroupID: bpopl.subOptions[0].modGroupId ? bpopl.subOptions[0].modGroupId : -1,
                                    Name: bpopl.name,
                                    OrdrMode: "OM_SAVED",
                                    Weight: 0,
                                  })
                                }
                              }
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
      "licenseCode": "PizzaHutApp",
      "language": "en",
      "conceptID": 3,
      "order": {
        "AddressID": 13359185,
        "ConceptID": 3,
        "CountryID": 1,
        "CustomerID": 8587479,
        "DeliveryChargeID": 279,
        "DistrictID": -1,
        "Entries": {
          "CEntry": [
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 413002,
              "ModCode": "NONE",
              "Name": "Super Mega Deal - Original",
              "QCComponent": 1,
              "QCInstanceID": 907,
              "QCLevel": 0,
              "QCProID": 55
            },
            {
              "DealID": 0,
              "ID": 0,
              "ItemID": 510005,
              "ModCode": "NONE",
              "Name": "Family Fries",
              "QCComponent": 2,
              "QCInstanceID": 907,
              "QCLevel": 0,
              "QCProID": 55
            }
          ]
        },
        "OrderID": 0,
        "OrderMode": 1,
        "OrderType": 0,
        "ProvinceID": 7,
        "ServiceCharge": 0,
        "StoreID": 97,
        "StreetID": 315
      },
      "autoApprove": true,
      "useBackupStoreIfAvailable": true,
      "orderNotes1": "Test Orders - Appinventiv 674",
      "orderNotes2": "Test Orders - Appinventiv 5e7cab3b85b358e76e3071fc",
      "creditCardPaymentbool": false,
      "isSuspended": false,
      "menuTemplateID": 17
    }
    // let orderPlaced = await SDM.OrderSDME.createOrder(order)
    // let detail = await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: 48714070, language: "En" })
    // await SDM.OrderSDME.cancelOrder({
    //   language: "en",
    //   sdmOrderRef: 48698051,
    //   voidReason: 1,
    //   validationRemarks: "TEST ORDER",// Constant.STATUS_MSG.SDM_ORDER_VALIDATION.MAX_PENDING_TIME_REACHED
    // })
  } catch (error) {
    console.error(error)
  }
})()