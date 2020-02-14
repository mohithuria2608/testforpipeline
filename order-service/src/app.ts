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

    let cI = {}
    // let a = await ENTITY.CartE.createCartOnCMS(cI)




    await CMS.CartCMSE.createCart({
      "cms_user_id": 17,
      "website_id": 1,
      "category_id": 20,
      "cart_items": [
        {
          "product_id": 1730,
          "qty": 7,
          "price": 227.5,
          "type_id": "bundle",
          "bundle_option": {
            "1442": {
              "1719": 11225,
              "1723": 11226,
              "1727": 11227
            },
            "1443": 11235,
            "1444": 11239,
            "1445": 11243,
            "1617": 12279
          },
          "selection_configurable_option": {
            "11225": 1716,
            "11226": 1720,
            "11227": 1724,
            "11234": 1723,
            "11235": 1723,
            "12279": 1727
          }
        },
        {
          "product_id": 1601,
          "qty": 2,
          "type_id": "simple",
          "price": 19,
          "option": {

          }
        },
        {
          "product_id": 1600,
          "qty": 2,
          "type_id": "simple",
          "price": 25,
          "option": {

          }
        },
        {
          "product_id": 1599,
          "qty": 1,
          "type_id": "simple",
          "price": 13,
          "option": {

          }
        },
        {
          "product_id": 1717,
          "qty": 3,
          "type_id": "simple",
          "price": 2,
          "final_price": true
        },
        {
          "product_id": 0,
          "qty": 3,
          "type_id": "simple",
          "price": 0,
          "final_price": true
        },
        {
          "product_id": 1725,
          "qty": 3,
          "type_id": "simple",
          "price": 0,
          "final_price": true
        },
        {
          "product_id": 1659,
          "qty": 3,
          "type_id": "simple",
          "price": 60,
          "option": {
            "55": 164,
            "56": 167,
            "57": 170
          }
        },
        {
          "product_id": 36,
          "qty": 1,
          "price": 100,
          "type_id": "bundle",
          "bundle_option": {
            "1604": 12218,
            "1605": 12220,
            "1606": 12222,
            "1607": 12230,
            "1608": 12236
          },
          "selection_configurable_option": {

          }
        },
        {
          "product_id": 36,
          "qty": 2,
          "price": 200,
          "type_id": "bundle",
          "bundle_option": {
            "1604": 12218,
            "1605": 12220,
            "1606": 12222,
            "1607": 12230,
            "1608": 12236
          },
          "selection_configurable_option": {

          }
        },
        {
          "product_id": 1761,
          "qty": 1,
          "price": 29,
          "type_id": "bundle",
          "bundle_option": {
            "1569": 12003,
            "1570": {
              "1719": 12005
            },
            "1571": 12011
          },
          "selection_configurable_option": {
            "12003": "",
            "12004": "",
            "12005": 1716
          }
        },
        {
          "product_id": 1761,
          "qty": 4,
          "price": 116,
          "type_id": "bundle",
          "bundle_option": {
            "1569": 12003,
            "1570": {
              "1719": 12005
            },
            "1571": 12011
          },
          "selection_configurable_option": {
            "12003": "",
            "12004": "",
            "12005": 1716
          }
        },
        {
          "product_id": 1763,
          "qty": 1,
          "price": 37,
          "type_id": "bundle",
          "bundle_option": {
            "1575": 12033,
            "1576": 12035,
            "1577": {
              "1719": 12037
            },
            "1578": 12043,
            "1579": 12050,
            "1580": 12056
          },
          "selection_configurable_option": {
            "12035": "",
            "12036": "",
            "12037": 1716
          }
        },
        {
          "product_id": 1763,
          "qty": 5,
          "price": 185,
          "type_id": "bundle",
          "bundle_option": {
            "1575": 12033,
            "1576": 12035,
            "1577": {
              "1719": 12037
            },
            "1578": 12043,
            "1579": 12050,
            "1580": 12056
          },
          "selection_configurable_option": {
            "12035": "",
            "12036": "",
            "12037": 1716
          }
        },
        {
          "product_id": 1677,
          "qty": 1,
          "type_id": "simple",
          "price": 20,
          "option": {

          }
        },
        {
          "product_id": 1677,
          "qty": 3,
          "type_id": "simple",
          "price": 60,
          "option": {

          }
        },
        {
          "product_id": 1677,
          "qty": 7,
          "type_id": "simple",
          "price": 140,
          "option": {

          }
        },
        {
          "product_id": 1728,
          "qty": 1,
          "price": 49,
          "type_id": "bundle",
          "bundle_option": {
            "1436": 11190,
            "1437": 11193
          },
          "selection_configurable_option": {

          }
        },
        {
          "product_id": 1728,
          "qty": 2,
          "price": 98,
          "type_id": "bundle",
          "bundle_option": {
            "1436": 11190,
            "1437": 11193
          },
          "selection_configurable_option": {

          }
        },
        {
          "product_id": 1728,
          "qty": 5,
          "price": 245,
          "type_id": "bundle",
          "bundle_option": {
            "1436": 11190,
            "1437": 11193
          },
          "selection_configurable_option": {

          }
        },
        {
          "product_id": 1730,
          "qty": 1,
          "price": 38.5,
          "type_id": "bundle",
          "bundle_option": {
            "1442": {
              "1719": 11225,
              "1723": 11226,
              "1727": 11227
            },
            "1443": 11235,
            "1444": 11239,
            "1445": 11243,
            "1617": 12279
          },
          "selection_configurable_option": {
            "11225": 1717,
            "11226": 1721,
            "11227": 1725,
            "11234": 1723,
            "11235": 1723,
            "12279": 1727
          }
        },
        {
          "product_id": 1753,
          "qty": 1,
          "price": 35,
          "type_id": "bundle",
          "bundle_option": {
            "1531": {
              "1719": 11769
            },
            "1532": 11778,
            "1533": 11780,
            "1534": 11782,
            "1535": 11789,
            "1536": 11797,
            "1645": 12335
          },
          "selection_configurable_option": {
            "11769": 1716,
            "12335": ""
          }
        },
        {
          "product_id": 1753,
          "qty": 2,
          "price": 70,
          "type_id": "bundle",
          "bundle_option": {
            "1531": {
              "1719": 11769
            },
            "1532": 11778,
            "1533": 11780,
            "1534": 11782,
            "1535": 11789,
            "1536": 11797,
            "1645": 12335
          },
          "selection_configurable_option": {
            "11769": 1716,
            "12335": ""
          }
        },
        {
          "product_id": 1739,
          "qty": 1,
          "price": 27,
          "type_id": "bundle",
          "bundle_option": {
            "1474": 11433,
            "1475": {
              "1719": 11435
            },
            "1476": 11441,
            "1477": 11448
          },
          "selection_configurable_option": {
            "11433": "",
            "11434": "",
            "11435": 1716
          }
        },
        {
          "product_id": 1739,
          "qty": 2,
          "price": 54,
          "type_id": "bundle",
          "bundle_option": {
            "1474": 11433,
            "1475": {
              "1719": 11435
            },
            "1476": 11441,
            "1477": 11448
          },
          "selection_configurable_option": {
            "11433": "",
            "11434": "",
            "11435": 1716
          }
        },
        {
          "product_id": 1658,
          "qty": 2,
          "type_id": "simple",
          "price": 36,
          "option": {

          }
        },
        {
          "product_id": 1731,
          "qty": 1,
          "price": 28,
          "type_id": "bundle",
          "bundle_option": {
            "1446": 11251,
            "1447": 11254,
            "1448": 11261,
            "1449": 11267,
            "1629": 12298
          },
          "selection_configurable_option": {
            "12297": ""
          }
        },
        {
          "product_id": 1747,
          "qty": 1,
          "price": 31,
          "type_id": "bundle",
          "bundle_option": {
            "1506": 11617,
            "1507": 11620,
            "1508": 11627,
            "1509": 11633,
            "1642": 12326
          },
          "selection_configurable_option": {
            "12324": ""
          }
        },
        {
          "product_id": 1747,
          "qty": 2,
          "price": 62,
          "type_id": "bundle",
          "bundle_option": {
            "1506": 11617,
            "1507": 11620,
            "1508": 11627,
            "1509": 11633,
            "1642": 12326
          },
          "selection_configurable_option": {
            "12324": ""
          }
        },
        {
          "product_id": 1731,
          "qty": 2,
          "price": 56,
          "type_id": "bundle",
          "bundle_option": {
            "1446": 11251,
            "1447": 11254,
            "1448": 11261,
            "1449": 11267,
            "1629": 12298
          },
          "selection_configurable_option": {
            "12297": ""
          }
        },
        {
          "product_id": 1700,
          "qty": 1,
          "price": 9,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1700,
          "qty": 2,
          "price": 18,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1699,
          "qty": 1,
          "price": 9,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1699,
          "qty": 3,
          "price": 27,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1708,
          "qty": 1,
          "price": 9.5,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1708,
          "qty": 2,
          "price": 19,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1708,
          "qty": 4,
          "price": 38,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1708,
          "qty": 8,
          "price": 76,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1708,
          "qty": 9,
          "price": 85.5,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1708,
          "qty": 10,
          "price": 95,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1702,
          "qty": 15,
          "price": 127.5,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16285
          }
        },
        {
          "product_id": 1706,
          "qty": 1,
          "price": 7.5,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16285
          }
        },
        {
          "product_id": 1706,
          "qty": 2,
          "price": 15,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16285
          }
        },
        {
          "product_id": 1706,
          "qty": 3,
          "price": 22.5,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16285
          }
        },
        {
          "product_id": 1703,
          "qty": 1,
          "price": 11,
          "type_id": "configurable",
          "super_attribute": {
            "165": 16307
          }
        },
        {
          "product_id": 1703,
          "qty": 2,
          "price": 22,
          "type_id": "configurable",
          "super_attribute": {
            "165": 16307
          }
        },
        {
          "product_id": 1705,
          "qty": 1,
          "price": 10,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16285
          }
        },
        {
          "product_id": 1705,
          "qty": 2,
          "price": 20,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16285
          }
        },
        {
          "product_id": 1705,
          "qty": 3,
          "price": 30,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16285
          }
        },
        {
          "product_id": 35,
          "qty": 1,
          "price": 135,
          "type_id": "bundle",
          "bundle_option": {
            "1599": 12180,
            "1600": 12182,
            "1601": 12184,
            "1602": 12198,
            "1603": 12212
          },
          "selection_configurable_option": {

          }
        },
        {
          "product_id": 1768,
          "qty": 1,
          "price": 135,
          "type_id": "bundle",
          "bundle_option": {
            "1599": {
              "1644": 12180,
              "1645": 12181
            },
            "1601": 12184,
            "1602": 12198,
            "1603": 12212,
            "1633": 12305
          },
          "selection_configurable_option": {
            "12305": 1645
          }
        },
        {
          "product_id": 1697,
          "qty": 1,
          "price": 9,
          "type_id": "configurable",
          "super_attribute": {
            "144": 16287
          }
        },
        {
          "product_id": 1733,
          "qty": 1,
          "price": 18,
          "type_id": "bundle",
          "bundle_option": {
            "1454": 11301,
            "1455": {
              "1719": 11303
            },
            "1456": 11309,
            "1457": 11316
          },
          "selection_configurable_option": {
            "11301": "",
            "11302": "",
            "11303": 1716
          }
        },
        {
          "product_id": 1733,
          "qty": 2,
          "price": 36,
          "type_id": "bundle",
          "bundle_option": {
            "1454": 11301,
            "1455": {
              "1719": 11303
            },
            "1456": 11309,
            "1457": 11316
          },
          "selection_configurable_option": {
            "11301": "",
            "11302": "",
            "11303": 1716
          }
        },
        {
          "product_id": 1733,
          "qty": 3,
          "price": 54,
          "type_id": "bundle",
          "bundle_option": {
            "1454": 11301,
            "1455": {
              "1719": 11303
            },
            "1456": 11309,
            "1457": 11316
          },
          "selection_configurable_option": {
            "11301": "",
            "11302": "",
            "11303": 1716
          }
        },
        {
          "product_id": 1733,
          "qty": 4,
          "price": 72,
          "type_id": "bundle",
          "bundle_option": {
            "1454": 11301,
            "1455": {
              "1719": 11303
            },
            "1456": 11309,
            "1457": 11316
          },
          "selection_configurable_option": {
            "11301": "",
            "11302": "",
            "11303": 1716
          }
        },
        {
          "product_id": 1733,
          "qty": 7,
          "price": 126,
          "type_id": "bundle",
          "bundle_option": {
            "1454": 11301,
            "1455": {
              "1719": 11303
            },
            "1456": 11309,
            "1457": 11316
          },
          "selection_configurable_option": {
            "11301": "",
            "11302": "",
            "11303": 1716
          }
        },
        {
          "product_id": 1649,
          "qty": 1,
          "type_id": "simple",
          "price": 9,
          "option": {

          }
        },
        {
          "product_id": 1649,
          "qty": 2,
          "type_id": "simple",
          "price": 18,
          "option": {

          }
        },
        {
          "product_id": 1648,
          "qty": 1,
          "type_id": "simple",
          "price": 9,
          "option": {

          }
        },
        {
          "product_id": 1648,
          "qty": 1,
          "type_id": "simple",
          "price": 9,
          "option": {

          }
        }
      ],
      "coupon_code": "KFCTEST10"
    })


    await bootstrap(server)
    let stock: any = []
    let Entries = {
      CEntry: []
    }

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