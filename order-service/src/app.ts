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
      "cartId": "5e4a8b2e82ce3b192c96c08c",
      "couponCode": "",
      "curMenuId": 1,
      "items": [
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
                  "selected": 1,
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
                      "product_id": 1717,
                      "sdmId": 8100012,
                      "selected": 1,
                      "selection_id": 0,
                      "sku": 8100012,
                      "title": "Regular"
                    },
                    {
                      "id": 219,
                      "modGroupId": 0,
                      "name": "Extra",
                      "option_id": 0,
                      "price": 4,
                      "product_id": 1718,
                      "sdmId": 8100013,
                      "selected": 0,
                      "selection_id": 0,
                      "sku": 8100013,
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
                      "product_id": 0,
                      "sdmId": 8117012,
                      "selected": 1,
                      "selection_id": 0,
                      "sku": 8117012,
                      "title": "Regular"
                    },
                    {
                      "id": 222,
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
                  "selected": 1,
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
                      "product_id": 1725,
                      "sdmId": 8117032,
                      "selected": 1,
                      "selection_id": 0,
                      "sku": 8117032,
                      "title": "Regular"
                    },
                    {
                      "id": 225,
                      "modGroupId": 0,
                      "name": "Extra",
                      "option_id": 0,
                      "price": 0,
                      "product_id": 1726,
                      "sdmId": 8117033,
                      "selected": 0,
                      "selection_id": 0,
                      "sku": 8117033,
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
          "selectedItem": 0,
          "sellingPrice": 22,
          "sku": 110031,
          "specialPrice": 20,
          "taxClassId": 2,
          "typeId": "bundle",
          "viewIdentifier": 0,
          "virtualGroup": 16298,
          "visibility": 4
        }
      ],
      "lat": 28.606058,
      "lng": 77.362,
      "menuUpdatedAt": 1579911326000
    })



    let stock: any = [{
      "qty": 2,
      "associative": 0,
      "bundleProductOptions": [

      ],
      "catId": 36,
      "configurableProductOptions": [

      ],
      "description": "",
      "finalPrice": 9.5,
      "id": 1602,
      "image": "/d/u/dummy-product.png",
      "imageSmall": "/d/u/dummy-product.png",
      "imageThumbnail": "/d/u/dummy-product.png",
      "inSide": 0,
      "langMenuId": "En#1",
      "langMenuIdCatId": "En#1#36",
      "langMenuIdCatIdProductId": "En#1#36#1602",
      "langMenuIdProductId": "En#1#1602",
      "language": "En",
      "menuId": 1,
      "metaKeyword": [
        "Cheese Cake"
      ],
      "name": "Cheese Cake",
      "originalTypeId": "simple",
      "position": 8,
      "selectedItem": 0,
      "sellingPrice": 9.5,
      "sku": 710001,
      "sdmId": 710001,
      "specialPrice": 9.5,
      "taxClassId": 2,
      "typeId": "simple",
      "viewIdentifier": 0,
      "virtualGroup": 0,
      "visibility": 4
    }]
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