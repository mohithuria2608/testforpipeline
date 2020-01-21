import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    let items = [{
      "id": 5,
      "position": 2,
      "name": "Pepsi",
      "description": "Pepsi description",
      "inSide": 0,
      "finalPrice": 7.5,
      "specialPrice": 6.5,
      "typeId": "configurable",
      "catId": 21,
      "metaKeyword": [
        "Pepsi"
      ],
      "bundleProductOptions": [],
      "selectedItem": 600002,
      "configurableProductOptions": [
        {
          "id": 144,
          "position": 1,
          "title": "Size",
          "subtitle": "Choice of Size",
          "selIndex": 1,
          "options": [
            {
              "isSelected": 1,
              "position": 1,
              "title": "Regular",
              "id": 16285
            },
            {
              "isSelected": 0,
              "position": 2,
              "title": "Large",
              "id": 16286
            },
            {
              "isSelected": 0,
              "position": 3,
              "title": "Medium",
              "id": 16287
            },
            {
              "isSelected": 0,
              "position": 4,
              "title": "Small",
              "id": 16293
            }
          ]
        }
      ],
      "items": [
        {
          "id": 2,
          "position": 1,
          "title": "Pepsi Regular",
          "description": "Product Description",
          "imageThumbnail": "/d/u/dummy-product.png",
          "finalPrice": 7.5,
          "specialPrice": 6.5,
          "metaKeyword": [
            ""
          ],
          "typeId": "simple",
          "sel1Value": 16285,
          "sel2Value": -1,
          "sel3Value": -1,
          "sku": 600002
        },
        {
          "id": 3,
          "position": 2,
          "title": "Pepsi Large",
          "description": "Product Description",
          "imageThumbnail": "/d/u/dummy-product.png",
          "finalPrice": 9.5,
          "specialPrice": 8.5,
          "metaKeyword": [
            ""
          ],
          "typeId": "simple",
          "sel1Value": 16286,
          "sel2Value": -1,
          "sel3Value": -1,
          "sku": 600004
        },
        {
          "id": 4,
          "position": 3,
          "title": "Pepsi Medium",
          "description": "Product Description",
          "imageThumbnail": "/d/u/dummy-product.png",
          "finalPrice": 8.5,
          "specialPrice": 7.5,
          "metaKeyword": [
            ""
          ],
          "typeId": "simple",
          "sel1Value": 16287,
          "sel2Value": -1,
          "sel3Value": -1,
          "sku": 600003
        },
        {
          "id": 160,
          "position": 4,
          "title": "Pepsi Small",
          "description": "Product Description",
          "imageThumbnail": "/d/u/dummy-product.png",
          "finalPrice": 5.5,
          "specialPrice": 4.5,
          "metaKeyword": [
            ""
          ],
          "typeId": "simple",
          "sel1Value": 16293,
          "sel2Value": -1,
          "sel3Value": -1,
          "sku": 600049
        }
      ],
      "sku": 1,
      "imageSmall": "/d/u/dummy-product.png",
      "imageThumbnail": "/d/u/dummy-product.png",
      "image": "/d/u/dummy-product.png",
      "taxClassId": 2,
      "virtualGroup": 16298,
      "visibility": 4,
      "associative": 0
    }]
    let cart = []
    items.map(sitem => {
      if (sitem['typeId'] == 'simple') {
        cart.push({
          product_id: sitem.id,
          // qty: sitem.qty ? sitem.qty : 1,
          price: sitem.finalPrice,
          type_id: sitem['typeId']
        })
      }
      else if (sitem['typeId'] == 'configurable') {
        let super_attribute = {};
        let price = null;
        if (sitem['items'] && sitem['items'].length > 0) {
          sitem['items'].map(i => {
            if (i['sku'] == sitem['selectedItem']) {
              price = i['finalPrice']
              if (sitem['configurableProductOptions'] && sitem['configurableProductOptions'].length > 0) {
                sitem['configurableProductOptions'].map(co => {
                  let value = null
                  if (co['options'] && co['options'].length > 0) {
                    co['options'].map(o => {
                      if (o['isSelected'] == 1) {
                        value = o['id']
                      }
                    })
                    super_attribute[co['id']] = value
                  }
                })
              }
            }
          })
        }
        cart.push({
          product_id: sitem.id,
          // qty: sitem.qty ? sitem.qty : 1,
          price: price,
          type_id: sitem['typeId'],
          super_attribute: super_attribute
        })
        consolelog(process.cwd(), "super_attribute", JSON.stringify(cart), true)
      }
      else if (sitem['typeId'] == 'bundle') {
        return Promise.reject("Not handled bundle products")
        let bundle_option = {};
        let selection_configurable_option = {};
        let bundle_super_attribute = {};
        sitem['bundleProductOptions'].map(bpo => {
          let bundleOptValue = null
          if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
            bpo['productLinks'].map(pl => {
              if (pl['selected'] == 1) {
                if (pl['subOptions'] && pl['subOptions'].length > 0) {
                  let bundleOptSubValue = {}
                  pl['subOptions'].map(so => {
                    if (so['selected'] == 1)
                      bundleOptSubValue[pl['id']] = so['id']  //@TODO : have to change
                  })
                  bundleOptValue = bundleOptSubValue
                } else {
                  bundleOptValue = pl['position']
                }
              }
            })
          }
          bundle_option[bpo['id']] = bundleOptValue
        })
        cart.push({
          product_id: sitem.id,
          // qty: sitem.qty,
          price: sitem.finalPrice,
          type_id: sitem['typeId'],
          bundle_option: bundle_option,
          selection_configurable_option: selection_configurable_option,
          bundle_super_attribute: bundle_super_attribute,
        })
      }
      else if (sitem['typeId'] == 'bundle_group') {
        return Promise.reject("Not handled bundle group products")
        cart.push({
          product_id: sitem.id,
          // qty: sitem.qty,
          price: sitem.finalPrice,
          type_id: "bundle"
        })
      } else {
        return Promise.reject("Unhandled  products")
      }
    })
    await bootstrap(server)
  } catch (err) {
    console.error(err)
  }
})()