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
    // let a = await ENTITY.CartE.createCartOnCMS({
    //   "cartId": "5e467d6f334ac2a2017c75e1",
    //   "couponCode": "",
    //   "curMenuId": 1,
    //   "items": [
    //     {
    //       "qty": 1,
    //       "associative": 0,
    //       "bundleProductOptions": [
    //         {
    //           "compId": 1,
    //           "imageThumbnail": "/i/t/itm114.png",
    //           "ingredient": 0,
    //           "isDependent": 0,
    //           "isModifier": 0,
    //           "maximumQty": 0,
    //           "minimumQty": 0,
    //           "position": 1,
    //           "productLinks": [
    //             {
    //               "default": 1,
    //               "dependentSteps": [
    //                 2
    //               ],
    //               "id": 1676,
    //               "imageThumbnail": "/imagestemp/itm110031.png",
    //               "modGroupId": -1,
    //               "name": "KENTUCKY BURGER ZINGER",
    //               "option_id": 1569,
    //               "position": 1,
    //               "price": 0,
    //               "sdmId": 110031,
    //               "selected": 1,
    //               "selection_id": 12003,
    //               "selectionQty": 1,
    //               "sku": 110031,
    //               "subOptions": [

    //               ],
    //               "title": "KENTUCKY BURGER ZINGER"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [
    //                 2
    //               ],
    //               "id": 1677,
    //               "imageThumbnail": "/imagestemp/itm110032.png",
    //               "modGroupId": -1,
    //               "name": "KENTUCKY BURGER FILLET",
    //               "option_id": 1569,
    //               "position": 2,
    //               "price": 0,
    //               "sdmId": 110032,
    //               "selected": 0,
    //               "selection_id": 12004,
    //               "selectionQty": 1,
    //               "sku": 110032,
    //               "subOptions": [

    //               ],
    //               "title": "KENTUCKY BURGER FILLET"
    //             }
    //           ],
    //           "subtitle": "Choice of side item",
    //           "title": "Choice of side item",
    //           "type": "radio"
    //         },
    //         {
    //           "compId": 1,
    //           "imageThumbnail": "/i/t/itm114.png",
    //           "ingredient": 1,
    //           "isDependent": 1,
    //           "isModifier": 1,
    //           "maximumQty": 0,
    //           "minimumQty": 0,
    //           "position": 2,
    //           "productLinks": [
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1719,
    //               "imageThumbnail": "/imagestemp/itm810001.png",
    //               "modGroupId": 10028,
    //               "name": "American Cheese",
    //               "option_id": 1570,
    //               "position": 1,
    //               "price": 2,
    //               "sdmId": 810001,
    //               "selected": 1,
    //               "selection_id": 12005,
    //               "selectionQty": 1,
    //               "sku": 810001,
    //               "subOptions": [
    //                 {
    //                   "id": 1716,
    //                   "modGroupId": -1,
    //                   "name": "None",
    //                   "option_id": 1719,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8100011,
    //                   "selected": 1,
    //                   "selection_id": 0,
    //                   "sku": 8100011,
    //                   "title": "None"
    //                 },
    //                 {
    //                   "id": 1717,
    //                   "modGroupId": -1,
    //                   "name": "Regular",
    //                   "option_id": 1719,
    //                   "price": 2,
    //                   "product_id": 0,
    //                   "sdmId": 8100012,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8100012,
    //                   "title": "Regular"
    //                 },
    //                 {
    //                   "id": 1718,
    //                   "modGroupId": -1,
    //                   "name": "Extra",
    //                   "option_id": 1719,
    //                   "price": 4,
    //                   "product_id": 0,
    //                   "sdmId": 8100013,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8100013,
    //                   "title": "Extra"
    //                 }
    //               ],
    //               "title": "American Cheese"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1723,
    //               "imageThumbnail": "/imagestemp/itm811701.png",
    //               "modGroupId": 10027,
    //               "name": "Lettuce",
    //               "option_id": 1570,
    //               "position": 2,
    //               "price": 0,
    //               "sdmId": 811701,
    //               "selected": 0,
    //               "selection_id": 12006,
    //               "selectionQty": 1,
    //               "sku": 811701,
    //               "subOptions": [
    //                 {
    //                   "id": 1720,
    //                   "modGroupId": -1,
    //                   "name": "None",
    //                   "option_id": 1723,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117011,
    //                   "selected": 1,
    //                   "selection_id": 0,
    //                   "sku": 8117011,
    //                   "title": "None"
    //                 },
    //                 {
    //                   "id": 1721,
    //                   "modGroupId": -1,
    //                   "name": "Regular",
    //                   "option_id": 1723,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117012,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117012,
    //                   "title": "Regular"
    //                 },
    //                 {
    //                   "id": 1722,
    //                   "modGroupId": -1,
    //                   "name": "Extra",
    //                   "option_id": 1723,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117013,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117013,
    //                   "title": "Extra"
    //                 }
    //               ],
    //               "title": "Lettuce"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1727,
    //               "imageThumbnail": "/imagestemp/itm811703.png",
    //               "modGroupId": 10027,
    //               "name": "Tomato",
    //               "option_id": 1570,
    //               "position": 3,
    //               "price": 0,
    //               "sdmId": 811703,
    //               "selected": 0,
    //               "selection_id": 12007,
    //               "selectionQty": 1,
    //               "sku": 811703,
    //               "subOptions": [
    //                 {
    //                   "id": 1724,
    //                   "modGroupId": -1,
    //                   "name": "None",
    //                   "option_id": 1727,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117031,
    //                   "selected": 1,
    //                   "selection_id": 0,
    //                   "sku": 8117031,
    //                   "title": "None"
    //                 },
    //                 {
    //                   "id": 1725,
    //                   "modGroupId": -1,
    //                   "name": "Regular",
    //                   "option_id": 1727,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117032,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117032,
    //                   "title": "Regular"
    //                 },
    //                 {
    //                   "id": 1726,
    //                   "modGroupId": -1,
    //                   "name": "Extra",
    //                   "option_id": 1727,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117033,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117033,
    //                   "title": "Extra"
    //                 }
    //               ],
    //               "title": "Tomato"
    //             },
    //             {
    //               "default": 1,
    //               "dependentSteps": [

    //               ],
    //               "id": 1719,
    //               "imageThumbnail": "/imagestemp/itm810001.png",
    //               "modGroupId": -1,
    //               "name": "American Cheese",
    //               "option_id": 1570,
    //               "position": 4,
    //               "price": 2,
    //               "sdmId": 810001,
    //               "selected": 0,
    //               "selection_id": 12008,
    //               "selectionQty": 1,
    //               "sku": 810001,
    //               "subOptions": [
    //                 {
    //                   "id": 1716,
    //                   "modGroupId": -1,
    //                   "name": "None",
    //                   "option_id": 1719,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8100011,
    //                   "selected": 1,
    //                   "selection_id": 0,
    //                   "sku": 8100011,
    //                   "title": "None"
    //                 },
    //                 {
    //                   "id": 1717,
    //                   "modGroupId": -1,
    //                   "name": "Regular",
    //                   "option_id": 1719,
    //                   "price": 2,
    //                   "product_id": 0,
    //                   "sdmId": 8100012,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8100012,
    //                   "title": "Regular"
    //                 },
    //                 {
    //                   "id": 1718,
    //                   "modGroupId": -1,
    //                   "name": "Extra",
    //                   "option_id": 1719,
    //                   "price": 4,
    //                   "product_id": 0,
    //                   "sdmId": 8100013,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8100013,
    //                   "title": "Extra"
    //                 }
    //               ],
    //               "title": "American Cheese"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1723,
    //               "imageThumbnail": "/imagestemp/itm811701.png",
    //               "modGroupId": -1,
    //               "name": "Lettuce",
    //               "option_id": 1570,
    //               "position": 5,
    //               "price": 0,
    //               "sdmId": 811701,
    //               "selected": 0,
    //               "selection_id": 12009,
    //               "selectionQty": 1,
    //               "sku": 811701,
    //               "subOptions": [
    //                 {
    //                   "id": 1720,
    //                   "modGroupId": -1,
    //                   "name": "None",
    //                   "option_id": 1723,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117011,
    //                   "selected": 1,
    //                   "selection_id": 0,
    //                   "sku": 8117011,
    //                   "title": "None"
    //                 },
    //                 {
    //                   "id": 1721,
    //                   "modGroupId": -1,
    //                   "name": "Regular",
    //                   "option_id": 1723,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117012,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117012,
    //                   "title": "Regular"
    //                 },
    //                 {
    //                   "id": 1722,
    //                   "modGroupId": -1,
    //                   "name": "Extra",
    //                   "option_id": 1723,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117013,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117013,
    //                   "title": "Extra"
    //                 }
    //               ],
    //               "title": "Lettuce"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1727,
    //               "imageThumbnail": "/imagestemp/itm811703.png",
    //               "modGroupId": -1,
    //               "name": "Tomato",
    //               "option_id": 1570,
    //               "position": 6,
    //               "price": 0,
    //               "sdmId": 811703,
    //               "selected": 0,
    //               "selection_id": 12010,
    //               "selectionQty": 1,
    //               "sku": 811703,
    //               "subOptions": [
    //                 {
    //                   "id": 1724,
    //                   "modGroupId": -1,
    //                   "name": "None",
    //                   "option_id": 1727,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117031,
    //                   "selected": 1,
    //                   "selection_id": 0,
    //                   "sku": 8117031,
    //                   "title": "None"
    //                 },
    //                 {
    //                   "id": 1725,
    //                   "modGroupId": -1,
    //                   "name": "Regular",
    //                   "option_id": 1727,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117032,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117032,
    //                   "title": "Regular"
    //                 },
    //                 {
    //                   "id": 1726,
    //                   "modGroupId": -1,
    //                   "name": "Extra",
    //                   "option_id": 1727,
    //                   "price": 0,
    //                   "product_id": 0,
    //                   "sdmId": 8117033,
    //                   "selected": 0,
    //                   "selection_id": 0,
    //                   "sku": 8117033,
    //                   "title": "Extra"
    //                 }
    //               ],
    //               "title": "Tomato"
    //             }
    //           ],
    //           "subtitle": "Cheese",
    //           "title": "Cheese",
    //           "type": "checkbox"
    //         },
    //         {
    //           "compId": 2,
    //           "imageThumbnail": "/i/t/itm114.png",
    //           "ingredient": 0,
    //           "isDependent": 0,
    //           "isModifier": 0,
    //           "maximumQty": 0,
    //           "minimumQty": 0,
    //           "position": 3,
    //           "productLinks": [
    //             {
    //               "default": 1,
    //               "dependentSteps": [

    //               ],
    //               "id": 1631,
    //               "imageThumbnail": "/imagestemp/itm510006.png",
    //               "modGroupId": -1,
    //               "name": "Large Fries",
    //               "option_id": 1571,
    //               "position": 1,
    //               "price": 0,
    //               "sdmId": 510006,
    //               "selected": 1,
    //               "selection_id": 12011,
    //               "selectionQty": 1,
    //               "sku": 510006,
    //               "subOptions": [

    //               ],
    //               "title": "Large Fries"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1634,
    //               "imageThumbnail": "/imagestemp/itm510013.png",
    //               "modGroupId": -1,
    //               "name": "Large Fries Spicy",
    //               "option_id": 1571,
    //               "position": 2,
    //               "price": 1,
    //               "sdmId": 510013,
    //               "selected": 0,
    //               "selection_id": 12012,
    //               "selectionQty": 1,
    //               "sku": 510013,
    //               "subOptions": [

    //               ],
    //               "title": "Large Fries Spicy"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1619,
    //               "imageThumbnail": "/imagestemp/itm510001.png",
    //               "modGroupId": -1,
    //               "name": "Coleslaw Salad Small",
    //               "option_id": 1571,
    //               "position": 3,
    //               "price": 0,
    //               "sdmId": 510001,
    //               "selected": 0,
    //               "selection_id": 12013,
    //               "selectionQty": 1,
    //               "sku": 510001,
    //               "subOptions": [

    //               ],
    //               "title": "Coleslaw Salad Small"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1628,
    //               "imageThumbnail": "/imagestemp/itm510036.png",
    //               "modGroupId": -1,
    //               "name": "Loaded Fries Regular",
    //               "option_id": 1571,
    //               "position": 4,
    //               "price": 3,
    //               "sdmId": 510036,
    //               "selected": 0,
    //               "selection_id": 12014,
    //               "selectionQty": 1,
    //               "sku": 510036,
    //               "subOptions": [

    //               ],
    //               "title": "Loaded Fries Regular"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1641,
    //               "imageThumbnail": "/imagestemp/itm510073.png",
    //               "modGroupId": -1,
    //               "name": "Large Dipper Fries",
    //               "option_id": 1571,
    //               "position": 5,
    //               "price": 1,
    //               "sdmId": 510073,
    //               "selected": 0,
    //               "selection_id": 12015,
    //               "selectionQty": 1,
    //               "sku": 510073,
    //               "subOptions": [

    //               ],
    //               "title": "Large Dipper Fries"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1650,
    //               "imageThumbnail": "/imagestemp/itm510075.png",
    //               "modGroupId": -1,
    //               "name": "Cheese Potato Dipper",
    //               "option_id": 1571,
    //               "position": 6,
    //               "price": 5,
    //               "sdmId": 510075,
    //               "selected": 0,
    //               "selection_id": 12016,
    //               "selectionQty": 1,
    //               "sku": 510075,
    //               "subOptions": [

    //               ],
    //               "title": "Cheese Potato Dipper"
    //             },
    //             {
    //               "default": 0,
    //               "dependentSteps": [

    //               ],
    //               "id": 1651,
    //               "imageThumbnail": "/imagestemp/itm510079.png",
    //               "modGroupId": -1,
    //               "name": "Loaded Fries P.Chili Reg",
    //               "option_id": 1571,
    //               "position": 7,
    //               "price": 3,
    //               "sdmId": 510079,
    //               "selected": 0,
    //               "selection_id": 12017,
    //               "selectionQty": 1,
    //               "sku": 510079,
    //               "subOptions": [

    //               ],
    //               "title": "Loaded Fries P.Chili Reg"
    //             }
    //           ],
    //           "subtitle": "Choice of Beverages",
    //           "title": "Choice of Beverages",
    //           "type": "radio"
    //         }
    //       ],
    //       "catId": 34,
    //       "configurableProductOptions": [
    //         {
    //           "id": 144,
    //           "options": [
    //             {
    //               "id": 16287,
    //               "isSelected": 0,
    //               "position": 1,
    //               "title": "Medium"
    //             },
    //             {
    //               "id": 16286,
    //               "isSelected": 1,
    //               "position": 2,
    //               "title": "Large"
    //             }
    //           ],
    //           "position": 1,
    //           "selIndex": 1,
    //           "subtitle": "Choice of Size",
    //           "title": "Choice of Size"
    //         }
    //       ],
    //       "description": "New Kentucky Burger + fries + Drink",
    //       "finalPrice": 29,
    //       "id": 30,
    //       "image": "/i/t/itm114.png",
    //       "imageSmall": "/i/t/itm114.png",
    //       "imageThumbnail": "/i/t/itm114.png",
    //       "inSide": 1,
    //       "items": [
    //         {
    //           "associative": 0,
    //           "bundleProductOptions": [
    //             {
    //               "compId": 1,
    //               "imageThumbnail": "/i/t/itm114.png",
    //               "ingredient": 0,
    //               "isDependent": 0,
    //               "isModifier": 0,
    //               "maximumQty": 0,
    //               "minimumQty": 0,
    //               "position": 1,
    //               "productLinks": [
    //                 {
    //                   "default": 1,
    //                   "dependentSteps": [
    //                     2
    //                   ],
    //                   "id": 1676,
    //                   "imageThumbnail": "/imagestemp/itm110031.png",
    //                   "modGroupId": -1,
    //                   "name": "KENTUCKY BURGER ZINGER",
    //                   "option_id": 1569,
    //                   "position": 1,
    //                   "price": 0,
    //                   "sdmId": 110031,
    //                   "selected": 1,
    //                   "selection_id": 12003,
    //                   "selectionQty": 1,
    //                   "sku": 110031,
    //                   "subOptions": [

    //                   ],
    //                   "title": "KENTUCKY BURGER ZINGER"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [
    //                     2
    //                   ],
    //                   "id": 1677,
    //                   "imageThumbnail": "/imagestemp/itm110032.png",
    //                   "modGroupId": -1,
    //                   "name": "KENTUCKY BURGER FILLET",
    //                   "option_id": 1569,
    //                   "position": 2,
    //                   "price": 0,
    //                   "sdmId": 110032,
    //                   "selected": 0,
    //                   "selection_id": 12004,
    //                   "selectionQty": 1,
    //                   "sku": 110032,
    //                   "subOptions": [

    //                   ],
    //                   "title": "KENTUCKY BURGER FILLET"
    //                 }
    //               ],
    //               "subtitle": "Choice of side item",
    //               "title": "Choice of side item",
    //               "type": "radio"
    //             },
    //             {
    //               "compId": 1,
    //               "imageThumbnail": "/i/t/itm114.png",
    //               "ingredient": 1,
    //               "isDependent": 1,
    //               "isModifier": 1,
    //               "maximumQty": 0,
    //               "minimumQty": 0,
    //               "position": 2,
    //               "productLinks": [
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1719,
    //                   "imageThumbnail": "/imagestemp/itm810001.png",
    //                   "modGroupId": 10028,
    //                   "name": "American Cheese",
    //                   "option_id": 1570,
    //                   "position": 1,
    //                   "price": 2,
    //                   "sdmId": 810001,
    //                   "selected": 1,
    //                   "selection_id": 12005,
    //                   "selectionQty": 1,
    //                   "sku": 810001,
    //                   "subOptions": [
    //                     {
    //                       "id": 1716,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1719,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8100011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8100011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1717,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1719,
    //                       "price": 2,
    //                       "product_id": 0,
    //                       "sdmId": 8100012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1718,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1719,
    //                       "price": 4,
    //                       "product_id": 0,
    //                       "sdmId": 8100013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "American Cheese"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1723,
    //                   "imageThumbnail": "/imagestemp/itm811701.png",
    //                   "modGroupId": 10027,
    //                   "name": "Lettuce",
    //                   "option_id": 1570,
    //                   "position": 2,
    //                   "price": 0,
    //                   "sdmId": 811701,
    //                   "selected": 0,
    //                   "selection_id": 12006,
    //                   "selectionQty": 1,
    //                   "sku": 811701,
    //                   "subOptions": [
    //                     {
    //                       "id": 1720,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1721,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1722,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Lettuce"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1727,
    //                   "imageThumbnail": "/imagestemp/itm811703.png",
    //                   "modGroupId": 10027,
    //                   "name": "Tomato",
    //                   "option_id": 1570,
    //                   "position": 3,
    //                   "price": 0,
    //                   "sdmId": 811703,
    //                   "selected": 0,
    //                   "selection_id": 12007,
    //                   "selectionQty": 1,
    //                   "sku": 811703,
    //                   "subOptions": [
    //                     {
    //                       "id": 1724,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117031,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117031,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1725,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117032,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117032,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1726,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117033,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117033,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Tomato"
    //                 },
    //                 {
    //                   "default": 1,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1719,
    //                   "imageThumbnail": "/imagestemp/itm810001.png",
    //                   "modGroupId": -1,
    //                   "name": "American Cheese",
    //                   "option_id": 1570,
    //                   "position": 4,
    //                   "price": 2,
    //                   "sdmId": 810001,
    //                   "selected": 0,
    //                   "selection_id": 12008,
    //                   "selectionQty": 1,
    //                   "sku": 810001,
    //                   "subOptions": [
    //                     {
    //                       "id": 1716,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1719,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8100011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8100011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1717,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1719,
    //                       "price": 2,
    //                       "product_id": 0,
    //                       "sdmId": 8100012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1718,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1719,
    //                       "price": 4,
    //                       "product_id": 0,
    //                       "sdmId": 8100013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "American Cheese"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1723,
    //                   "imageThumbnail": "/imagestemp/itm811701.png",
    //                   "modGroupId": -1,
    //                   "name": "Lettuce",
    //                   "option_id": 1570,
    //                   "position": 5,
    //                   "price": 0,
    //                   "sdmId": 811701,
    //                   "selected": 0,
    //                   "selection_id": 12009,
    //                   "selectionQty": 1,
    //                   "sku": 811701,
    //                   "subOptions": [
    //                     {
    //                       "id": 1720,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1721,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1722,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Lettuce"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1727,
    //                   "imageThumbnail": "/imagestemp/itm811703.png",
    //                   "modGroupId": -1,
    //                   "name": "Tomato",
    //                   "option_id": 1570,
    //                   "position": 6,
    //                   "price": 0,
    //                   "sdmId": 811703,
    //                   "selected": 0,
    //                   "selection_id": 12010,
    //                   "selectionQty": 1,
    //                   "sku": 811703,
    //                   "subOptions": [
    //                     {
    //                       "id": 1724,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117031,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117031,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1725,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117032,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117032,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1726,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117033,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117033,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Tomato"
    //                 }
    //               ],
    //               "subtitle": "Cheese",
    //               "title": "Cheese",
    //               "type": "checkbox"
    //             },
    //             {
    //               "compId": 2,
    //               "imageThumbnail": "/i/t/itm114.png",
    //               "ingredient": 0,
    //               "isDependent": 0,
    //               "isModifier": 0,
    //               "maximumQty": 0,
    //               "minimumQty": 0,
    //               "position": 3,
    //               "productLinks": [
    //                 {
    //                   "default": 1,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1631,
    //                   "imageThumbnail": "/imagestemp/itm510006.png",
    //                   "modGroupId": -1,
    //                   "name": "Large Fries",
    //                   "option_id": 1571,
    //                   "position": 1,
    //                   "price": 0,
    //                   "sdmId": 510006,
    //                   "selected": 1,
    //                   "selection_id": 12011,
    //                   "selectionQty": 1,
    //                   "sku": 510006,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Large Fries"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1634,
    //                   "imageThumbnail": "/imagestemp/itm510013.png",
    //                   "modGroupId": -1,
    //                   "name": "Large Fries Spicy",
    //                   "option_id": 1571,
    //                   "position": 2,
    //                   "price": 1,
    //                   "sdmId": 510013,
    //                   "selected": 0,
    //                   "selection_id": 12012,
    //                   "selectionQty": 1,
    //                   "sku": 510013,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Large Fries Spicy"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1619,
    //                   "imageThumbnail": "/imagestemp/itm510001.png",
    //                   "modGroupId": -1,
    //                   "name": "Coleslaw Salad Small",
    //                   "option_id": 1571,
    //                   "position": 3,
    //                   "price": 0,
    //                   "sdmId": 510001,
    //                   "selected": 0,
    //                   "selection_id": 12013,
    //                   "selectionQty": 1,
    //                   "sku": 510001,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Coleslaw Salad Small"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1628,
    //                   "imageThumbnail": "/imagestemp/itm510036.png",
    //                   "modGroupId": -1,
    //                   "name": "Loaded Fries Regular",
    //                   "option_id": 1571,
    //                   "position": 4,
    //                   "price": 3,
    //                   "sdmId": 510036,
    //                   "selected": 0,
    //                   "selection_id": 12014,
    //                   "selectionQty": 1,
    //                   "sku": 510036,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Loaded Fries Regular"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1641,
    //                   "imageThumbnail": "/imagestemp/itm510073.png",
    //                   "modGroupId": -1,
    //                   "name": "Large Dipper Fries",
    //                   "option_id": 1571,
    //                   "position": 5,
    //                   "price": 1,
    //                   "sdmId": 510073,
    //                   "selected": 0,
    //                   "selection_id": 12015,
    //                   "selectionQty": 1,
    //                   "sku": 510073,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Large Dipper Fries"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1650,
    //                   "imageThumbnail": "/imagestemp/itm510075.png",
    //                   "modGroupId": -1,
    //                   "name": "Cheese Potato Dipper",
    //                   "option_id": 1571,
    //                   "position": 6,
    //                   "price": 5,
    //                   "sdmId": 510075,
    //                   "selected": 0,
    //                   "selection_id": 12016,
    //                   "selectionQty": 1,
    //                   "sku": 510075,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Cheese Potato Dipper"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1651,
    //                   "imageThumbnail": "/imagestemp/itm510079.png",
    //                   "modGroupId": -1,
    //                   "name": "Loaded Fries P.Chili Reg",
    //                   "option_id": 1571,
    //                   "position": 7,
    //                   "price": 3,
    //                   "sdmId": 510079,
    //                   "selected": 0,
    //                   "selection_id": 12017,
    //                   "selectionQty": 1,
    //                   "sku": 510079,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Loaded Fries P.Chili Reg"
    //                 }
    //               ],
    //               "subtitle": "Choice of Beverages",
    //               "title": "Choice of Beverages",
    //               "type": "radio"
    //             }
    //           ],
    //           "catId": 0,
    //           "configurableProductOptions": [
    //             {
    //               "id": 144,
    //               "options": [
    //                 {
    //                   "id": 16287,
    //                   "isSelected": 1,
    //                   "position": 1,
    //                   "title": "Medium"
    //                 },
    //                 {
    //                   "id": 16286,
    //                   "isSelected": 0,
    //                   "position": 2,
    //                   "title": "Large"
    //                 }
    //               ],
    //               "position": 1,
    //               "selIndex": 1,
    //               "subtitle": "Choice of Size",
    //               "title": "Choice of Size"
    //             }
    //           ],
    //           "description": "",
    //           "finalPrice": 31,
    //           "id": 1761,
    //           "image": "/i/t/itm114.png",
    //           "imageSmall": "/i/t/itm114.png",
    //           "imageThumbnail": "/i/t/itm114.png",
    //           "inSide": 1,
    //           "metaKeyword": [
    //             "Kentucky Burger Meal - Large"
    //           ],
    //           "name": "Kentucky Burger Meal - Large",
    //           "position": 1,
    //           "promoId": 310,
    //           "sdmId": 114,
    //           "sel1Value": 16286,
    //           "sel2Value": -1,
    //           "sel3Value": -1,
    //           "selectedItem": 0,
    //           "sku": 900114,
    //           "specialPrice": 31,
    //           "taxClassId": 2,
    //           "title": "Kentucky Burger Meal - Large",
    //           "typeId": "bundle",
    //           "virtualGroup": 16298,
    //           "visibility": 4
    //         },
    //         {
    //           "associative": 0,
    //           "bundleProductOptions": [
    //             {
    //               "compId": 2,
    //               "imageThumbnail": "/i/t/itm113.png",
    //               "ingredient": 0,
    //               "isDependent": 0,
    //               "isModifier": 0,
    //               "maximumQty": 0,
    //               "minimumQty": 0,
    //               "position": 1,
    //               "productLinks": [
    //                 {
    //                   "default": 1,
    //                   "dependentSteps": [
    //                     2
    //                   ],
    //                   "id": 1676,
    //                   "imageThumbnail": "/imagestemp/itm110031.png",
    //                   "modGroupId": -1,
    //                   "name": "KENTUCKY BURGER ZINGER",
    //                   "option_id": 1572,
    //                   "position": 1,
    //                   "price": 0,
    //                   "sdmId": 110031,
    //                   "selected": 1,
    //                   "selection_id": 12018,
    //                   "selectionQty": 1,
    //                   "sku": 110031,
    //                   "subOptions": [

    //                   ],
    //                   "title": "KENTUCKY BURGER ZINGER"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [
    //                     2
    //                   ],
    //                   "id": 1677,
    //                   "imageThumbnail": "/imagestemp/itm110032.png",
    //                   "modGroupId": -1,
    //                   "name": "KENTUCKY BURGER FILLET",
    //                   "option_id": 1572,
    //                   "position": 2,
    //                   "price": 0,
    //                   "sdmId": 110032,
    //                   "selected": 0,
    //                   "selection_id": 12019,
    //                   "selectionQty": 1,
    //                   "sku": 110032,
    //                   "subOptions": [

    //                   ],
    //                   "title": "KENTUCKY BURGER FILLET"
    //                 }
    //               ],
    //               "subtitle": "Choice of side item",
    //               "title": "Choice of side item",
    //               "type": "radio"
    //             },
    //             {
    //               "compId": 2,
    //               "imageThumbnail": "/i/t/itm113.png",
    //               "ingredient": 1,
    //               "isDependent": 1,
    //               "isModifier": 1,
    //               "maximumQty": 0,
    //               "minimumQty": 0,
    //               "position": 2,
    //               "productLinks": [
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1719,
    //                   "imageThumbnail": "/imagestemp/itm810001.png",
    //                   "modGroupId": 10028,
    //                   "name": "American Cheese",
    //                   "option_id": 1573,
    //                   "position": 1,
    //                   "price": 2,
    //                   "sdmId": 810001,
    //                   "selected": 1,
    //                   "selection_id": 12020,
    //                   "selectionQty": 1,
    //                   "sku": 810001,
    //                   "subOptions": [
    //                     {
    //                       "id": 1716,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1719,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8100011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8100011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1717,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1719,
    //                       "price": 2,
    //                       "product_id": 0,
    //                       "sdmId": 8100012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1718,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1719,
    //                       "price": 4,
    //                       "product_id": 0,
    //                       "sdmId": 8100013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "American Cheese"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1723,
    //                   "imageThumbnail": "/imagestemp/itm811701.png",
    //                   "modGroupId": 10027,
    //                   "name": "Lettuce",
    //                   "option_id": 1573,
    //                   "position": 2,
    //                   "price": 0,
    //                   "sdmId": 811701,
    //                   "selected": 0,
    //                   "selection_id": 12021,
    //                   "selectionQty": 1,
    //                   "sku": 811701,
    //                   "subOptions": [
    //                     {
    //                       "id": 1720,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1721,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1722,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Lettuce"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1727,
    //                   "imageThumbnail": "/imagestemp/itm811703.png",
    //                   "modGroupId": 10027,
    //                   "name": "Tomato",
    //                   "option_id": 1573,
    //                   "posi tion": 3,
    //                   "price": 0,
    //                   "sdmId": 811703,
    //                   "selected": 0,
    //                   "selection_id": 12022,
    //                   "selectionQty": 1,
    //                   "sku": 811703,
    //                   "subOptions": [
    //                     {
    //                       "id": 1724,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117031,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117031,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1725,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117032,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117032,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1726,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117033,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117033,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Tomato"
    //                 },
    //                 {
    //                   "default": 1,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1719,
    //                   "imageThumbnail": "/imagestemp/itm810001.png",
    //                   "modGroupId": -1,
    //                   "name": "American Cheese",
    //                   "option_id": 1573,
    //                   "position": 4,
    //                   "price": 2,
    //                   "sdmId": 810001,
    //                   "selected": 0,
    //                   "selection_id": 12023,
    //                   "selectionQty": 1,
    //                   "sku": 810001,
    //                   "subOptions": [
    //                     {
    //                       "id": 1716,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1719,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8100011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8100011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1717,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1719,
    //                       "price": 2,
    //                       "product_id": 0,
    //                       "sdmId": 8100012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1718,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1719,
    //                       "price": 4,
    //                       "product_id": 0,
    //                       "sdmId": 8100013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8100013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "American Cheese"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1723,
    //                   "imageThumbnail": "/imagestemp/itm811701.png",
    //                   "modGroupId": -1,
    //                   "name": "Lettuce",
    //                   "option_id": 1573,
    //                   "position": 5,
    //                   "price": 0,
    //                   "sdmId": 811701,
    //                   "selected": 0,
    //                   "selection_id": 12024,
    //                   "selectionQty": 1,
    //                   "sku": 811701,
    //                   "subOptions": [
    //                     {
    //                       "id": 1720,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117011,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117011,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1721,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117012,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117012,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1722,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1723,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117013,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117013,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Lettuce"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1727,
    //                   "imageThumbnail": "/imagestemp/itm811703.png",
    //                   "modGroupId": -1,
    //                   "name": "Tomato",
    //                   "option_id": 1573,
    //                   "position": 6,
    //                   "price": 0,
    //                   "sdmId": 811703,
    //                   "selected": 0,
    //                   "selection_id": 12025,
    //                   "selectionQty": 1,
    //                   "sku": 811703,
    //                   "subOptions": [
    //                     {
    //                       "id": 1724,
    //                       "modGroupId": -1,
    //                       "name": "None",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117031,
    //                       "selected": 1,
    //                       "selection_id": 0,
    //                       "sku": 8117031,
    //                       "title": "None"
    //                     },
    //                     {
    //                       "id": 1725,
    //                       "modGroupId": -1,
    //                       "name": "Regular",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117032,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117032,
    //                       "title": "Regular"
    //                     },
    //                     {
    //                       "id": 1726,
    //                       "modGroupId": -1,
    //                       "name": "Extra",
    //                       "option_id": 1727,
    //                       "price": 0,
    //                       "product_id": 0,
    //                       "sdmId": 8117033,
    //                       "selected": 0,
    //                       "selection_id": 0,
    //                       "sku": 8117033,
    //                       "title": "Extra"
    //                     }
    //                   ],
    //                   "title": "Tomato"
    //                 }
    //               ],
    //               "subtitle": "Cheese",
    //               "title": "Cheese",
    //               "type": "checkbox"
    //             },
    //             {
    //               "compId": 3,
    //               "imageThumbnail": "/i/t/itm113.png",
    //               "ingredient": 0,
    //               "isDependent": 0,
    //               "isModifier": 0,
    //               "maximumQty": 0,
    //               "minimumQty": 0,
    //               "position": 3,
    //               "productLinks": [
    //                 {
    //                   "default": 1,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1633,
    //                   "imageThumbnail": "/imagestemp/itm510050.png",
    //                   "modGroupId": -1,
    //                   "name": "Medium Fries",
    //                   "option_id": 1574,
    //                   "position": 1,
    //                   "price": 0,
    //                   "sdmId": 510050,
    //                   "selected": 1,
    //                   "selection_id": 12026,
    //                   "selectionQty": 1,
    //                   "sku": 510050,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Medium Fries"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1637,
    //                   "imageThumbnail": "/imagestemp/itm510051.png",
    //                   "modGroupId": -1,
    //                   "name": "Medium Fries Spicy",
    //                   "option_id": 1574,
    //                   "position": 2,
    //                   "price": 1,
    //                   "sdmId": 510051,
    //                   "selected": 0,
    //                   "selection_id": 12027,
    //                   "selectionQty": 1,
    //                   "sku": 510051,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Medium Fries Spicy"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1619,
    //                   "imageThumbnail": "/imagestemp/itm510001.png",
    //                   "modGroupId": -1,
    //                   "name": "Coleslaw Salad Small",
    //                   "option_id": 1574,
    //                   "position": 3,
    //                   "price": 0,
    //                   "sdmId": 510001,
    //                   "selected": 0,
    //                   "selection_id": 12028,
    //                   "selectionQty": 1,
    //                   "sku": 510001,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Coleslaw Salad Small"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1628,
    //                   "imageThumbnail": "/imagestemp/itm510036.png",
    //                   "modGroupId": -1,
    //                   "name": "Loaded Fries Regular",
    //                   "option_id": 1574,
    //                   "position": 4,
    //                   "price": 3,
    //                   "sdmId": 510036,
    //                   "selected": 0,
    //                   "selection_id": 12029,
    //                   "selectionQty": 1,
    //                   "sku": 510036,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Loaded Fries Regular"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1640,
    //                   "imageThumbnail": "/imagestemp/itm510072.png",
    //                   "modGroupId": -1,
    //                   "name": "Medium Dipper Fries",
    //                   "option_id": 1574,
    //                   "position": 5,
    //                   "price": 1,
    //                   "sdmId": 510072,
    //                   "selected": 0,
    //                   "selection_id": 12030,
    //                   "selectionQty": 1,
    //                   "sku": 510072,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Medium Dipper Fries"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1650,
    //                   "imageThumbnail": "/imagestemp/itm510075.png",
    //                   "modGroupId": -1,
    //                   "name": "Cheese Potato Dipper",
    //                   "option_id": 1574,
    //                   "position": 6,
    //                   "price": 5,
    //                   "sdmId": 510075,
    //                   "selected": 0,
    //                   "selection_id": 12031,
    //                   "selectionQty": 1,
    //                   "sku": 510075,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Cheese Potato Dipper"
    //                 },
    //                 {
    //                   "default": 0,
    //                   "dependentSteps": [

    //                   ],
    //                   "id": 1651,
    //                   "imageThumbnail": "/imagestemp/itm510079.png",
    //                   "modGroupId": -1,
    //                   "name": "Loaded Fries P.Chili Reg",
    //                   "option_id": 1574,
    //                   "position": 7,
    //                   "price": 3,
    //                   "sdmId": 510079,
    //                   "selected": 0,
    //                   "selection_id": 12032,
    //                   "selectionQty": 1,
    //                   "sku": 510079,
    //                   "subOptions": [

    //                   ],
    //                   "title": "Loaded Fries P.Chili Reg"
    //                 }
    //               ],
    //               "subtitle": "Choice of Beverages",
    //               "title": "Choice of Beverages",
    //               "type": "radio"
    //             }
    //           ],
    //           "catId": 0,
    //           "configurableProductOptions": [
    //             {
    //               "id": 144,
    //               "options": [
    //                 {
    //                   "id": 16287,
    //                   "isSelected": 1,
    //                   "position": 1,
    //                   "title": "Medium"
    //                 },
    //                 {
    //                   "id": 16286,
    //                   "isSelected": 0,
    //                   "position": 2,
    //                   "title": "Large"
    //                 }
    //               ],
    //               "position": 1,
    //               "selIndex": 1,
    //               "subtitle": "Choice of Size",
    //               "title": "Choice of Size"
    //             }
    //           ],
    //           "description": "",
    //           "finalPrice": 29.5,
    //           "id": 1762,
    //           "image": "/i/t/itm113.png",
    //           "imageSmall": "/i/t/itm113.png",
    //           "imageThumbnail": "/i/t/itm113.png",
    //           "inSide": 1,
    //           "metaKeyword": [
    //             "Kentucky Burger Meal - Medium"
    //           ],
    //           "name": "Kentucky Burger Meal - Medium",
    //           "position": 2,
    //           "promoId": 310,
    //           "sdmId": 113,
    //           "sel1Value": 16287,
    //           "sel2Value": -1,
    //           "sel3Value": -1,
    //           "selectedItem": 0,
    //           "sku": 900113,
    //           "specialPrice": 29.5,
    //           "taxClassId": 2,
    //           "title": "Kentucky Burger Meal - Medium",
    //           "typeId": "bundle",
    //           "virtualGroup": 16298,
    //           "visibility": 4
    //         }
    //       ],
    //       "langMenuId": "En#1",
    //       "langMenuIdCatId": "En#1#34",
    //       "langMenuIdCatIdProductId": "En#1#34#30",
    //       "langMenuIdProductId": "En#1#30",
    //       "language": "En",
    //       "menuId": 1,
    //       "metaKeyword": [
    //         "Kentucky Burger Meal - Large"
    //       ],
    //       "name": "Kentucky Burger Meal",
    //       "originalTypeId": "bundle_group",
    //       "position": 1,
    //       "selectedItem": 900114,
    //       "sellingPrice": 31,
    //       "sku": 900114,
    //       "specialPrice": 0,
    //       "taxClassId": 2,
    //       "typeId": "bundle_group",
    //       "viewIdentifier": 0,
    //       "virtualGroup": 16298,
    //       "visibility": 4
    //     }
    //   ],
    //   "lat": 28.606035,
    //   "lng": 77.36189,
    //   "menuUpdatedAt": 1579911326000
    // })



    await bootstrap(server)
    let stock: any = [{
      "qty": 1,
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
      "AddressID": "10512271",// "10512054",
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
    let orderPlaced = await SDM.OrderSDME.createOrder(order)
    await SDM.OrderSDME.getOrderDetail({ sdmOrderRef: orderPlaced })

  } catch (error) {
    console.error(error)
  }
})()