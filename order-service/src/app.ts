import * as config from "config"
import * as Koa from 'koa'
require('./grpc/server')
import { bootstrap, consolelog } from './utils'
import middleware from './middlewares'
import route from './route'
import * as ENTITY from './entity'
import * as SDM from './sdm';

const app = new Koa()


app.use(middleware());
app.use(route());

export const start = (async () => {
  try {
    const port = config.get("server.order.port")
    const server = app.listen(port)

    let a: IMenuGrpcRequest.IFetchMenuRes

    //   Entries: {
    //     "CEntry": [
    //         {
    //             "ItemID": "110002",
    //             "Level": "0",
    //             "ModCode": "NONE",
    //             "Name": "Kids Chicken Meal",
    //             "OrdrMode": "OM_SAVED",
    //             "Price": "13",
    //             "Status": "NOTAPPLIED"
    //         },
    //         {
    //             "ItemID": "110002",
    //             "Level": "0",
    //             "ModCode": "NONE",
    //             "Name": "Kids Chicken Meal",
    //             "OrdrMode": "OM_SAVED",
    //             "Price": "13",
    //             "Status": "NOTAPPLIED"
    //         },
    //         {
    //             "ItemID": "110002",
    //             "Level": "0",
    //             "ModCode": "NONE",
    //             "Name": "Kids Chicken Meal",
    //             "OrdrMode": "OM_SAVED",
    //             "Price": "13",
    //             "Status": "NOTAPPLIED"
    //         }
    //     ]
    // },

    // let product = {
    //   "id": 35,
    //   "position": 1,
    //   "name": "21 Pcs Super Bucket",
    //   "description": "21 chicken pcs + 5 crispy strips + 2 family fries + 2 family coleslaw +7 bun + 2.25 L drink",
    //   "inSide": 1,
    //   "finalPrice": 135,
    //   "specialPrice": 135,
    //   "catId": 35,
    //   "metaKeyword": [
    //     "21 Pcs Super Bucket"
    //   ],
    //   "bundleProductOptions": [
    //     {
    //       "position": 1,
    //       "name": "Choice Of Chicken",
    //       "title": "Choice Of Chicken",
    //       "subtitle": "Select 21 Pieces of your favorite flavor",
    //       "compId": 1,
    //       "ingredient": 0,
    //       "type": "stepper",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": 1599,
    //           "selection_id": 12180,
    //           "price": 0,
    //           "id": 1644,
    //           "name": "Chicken Pc - Original",
    //           "title": "Chicken Pc - Original",
    //           "imageThumbnail": "/imagestemp/itm910001.png",
    //           "modGroupId": 10202,
    //           "selectionQty": 11,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 2,
    //           "option_id": 1599,
    //           "selection_id": 12181,
    //           "price": 0,
    //           "id": 1645,
    //           "name": "Chicken Pc - Spicy",
    //           "title": "Chicken Pc - Spicy",
    //           "imageThumbnail": "/imagestemp/itm910002.png",
    //           "modGroupId": 10202,
    //           "selectionQty": 10,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 21,
    //       "minimumQty": 21,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 2,
    //       "name": "Choice of Strips",
    //       "title": "Choice of Strips",
    //       "subtitle": "Choose 5 Strips",
    //       "compId": 1,
    //       "ingredient": 0,
    //       "type": "stepper",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": 1600,
    //           "selection_id": 12182,
    //           "price": 0,
    //           "id": 1664,
    //           "modGroupId": 10208,
    //           "name": "Crispy Strips Original",
    //           "title": "Crispy Strips Original",
    //           "imageThumbnail": "/imagestemp/itm511001.png",
    //           "selectionQty": 3,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 2,
    //           "option_id": 1600,
    //           "selection_id": 12183,
    //           "price": 0,
    //           "id": 1665,
    //           "modGroupId": 10208,
    //           "name": "Crispy Strips Spicy",
    //           "title": "Crispy Strips Spicy",
    //           "imageThumbnail": "/imagestemp/itm511002.png",
    //           "selectionQty": 2,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 5,
    //       "minimumQty": 5,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 3,
    //       "name": "Choice of first side item",
    //       "title": "Choice of first side item",
    //       "subtitle": "Choice of first side item",
    //       "modGroupId": 10208,
    //       "compId": 2,
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": 1601,
    //           "selection_id": 12184,
    //           "price": 0,
    //           "id": 1632,
    //           "name": "Family Fries",
    //           "title": "Family Fries",
    //           "imageThumbnail": "/imagestemp/itm510005.png",
    //           "selectionQty": 1,
    //           "modGroupId": -1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 2,
    //           "option_id": 1601,
    //           "selection_id": 12185,
    //           "price": 3,
    //           "id": 1635,
    //           "name": "Family Fries Spicy",
    //           "title": "Family Fries Spicy",
    //           "imageThumbnail": "/imagestemp/itm510014.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 3,
    //           "option_id": 1601,
    //           "selection_id": 12186,
    //           "price": 0,
    //           "id": 1620,
    //           "name": "Coleslaw Salad Large",
    //           "title": "Coleslaw Salad Large",
    //           "imageThumbnail": "/imagestemp/itm510002.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 4,
    //           "option_id": 1601,
    //           "selection_id": 12187,
    //           "price": 5,
    //           "id": 1629,
    //           "name": "Loaded Fries Family",
    //           "title": "Loaded Fries Family",
    //           "imageThumbnail": "/imagestemp/itm510030.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 6,
    //           "option_id": 1601,
    //           "selection_id": 12189,
    //           "price": 6,
    //           "id": 1638,
    //           "name": "Family Dipper Fries",
    //           "title": "Family Dipper Fries",
    //           "imageThumbnail": "/imagestemp/itm510074.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 4,
    //       "name": "Choice of second side item",
    //       "title": "Choice of second side item",
    //       "subtitle": "Choice of second side item",
    //       "compId": 3,
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": 1601,
    //           "selection_id": 12184,
    //           "price": 0,
    //           "id": 1632,
    //           "name": "Family Fries",
    //           "title": "Family Fries",
    //           "imageThumbnail": "/imagestemp/itm510005.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 2,
    //           "option_id": 1601,
    //           "selection_id": 12185,
    //           "price": 3,
    //           "id": 1635,
    //           "name": "Family Fries Spicy",
    //           "title": "Family Fries Spicy",
    //           "imageThumbnail": "/imagestemp/itm510014.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 3,
    //           "option_id": 1601,
    //           "selection_id": 12186,
    //           "price": 0,
    //           "id": 1620,
    //           "name": "Coleslaw Salad Large",
    //           "title": "Coleslaw Salad Large",
    //           "imageThumbnail": "/imagestemp/itm510002.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 4,
    //           "option_id": 1601,
    //           "selection_id": 12187,
    //           "price": 5,
    //           "id": 1629,
    //           "name": "Loaded Fries Family",
    //           "title": "Loaded Fries Family",
    //           "imageThumbnail": "/imagestemp/itm510030.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 6,
    //           "option_id": 1601,
    //           "selection_id": 12189,
    //           "price": 6,
    //           "id": 1638,
    //           "name": "Family Dipper Fries",
    //           "title": "Family Dipper Fries",
    //           "imageThumbnail": "/imagestemp/itm510074.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     },
    //     {
    //       "position": 5,
    //       "name": "Choice of Beverages",
    //       "title": "Choice of Beverages",
    //       "subtitle": "Choice of Beverages",
    //       "compId": 6,
    //       "ingredient": 0,
    //       "type": "radio",
    //       "imageThumbnail": "/d/u/dummy-product.png",
    //       "productLinks": [
    //         {
    //           "position": 1,
    //           "option_id": 1603,
    //           "selection_id": 12212,
    //           "price": 0,
    //           "id": 1689,
    //           "name": "Pepsi 2.25",
    //           "title": "Pepsi 2.25",
    //           "imageThumbnail": "/imagestemp/itm610034.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 1,
    //           "default": 1,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 2,
    //           "option_id": 1603,
    //           "selection_id": 12213,
    //           "price": 0,
    //           "id": 1690,
    //           "name": "7Up 2.25",
    //           "title": "7Up 2.25",
    //           "imageThumbnail": "/imagestemp/itm610035.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 3,
    //           "option_id": 1603,
    //           "selection_id": 12214,
    //           "price": 0,
    //           "id": 1691,
    //           "name": "Mountain Dew 2.25",
    //           "title": "Mountain Dew 2.25",
    //           "imageThumbnail": "/imagestemp/itm610036.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 4,
    //           "option_id": 1603,
    //           "selection_id": 12215,
    //           "price": 0,
    //           "id": 1692,
    //           "name": "Diet Pepsi 2.25",
    //           "title": "Diet Pepsi 2.25",
    //           "imageThumbnail": "/imagestemp/itm610037.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 5,
    //           "option_id": 1603,
    //           "selection_id": 12216,
    //           "price": 0,
    //           "id": 1693,
    //           "name": "Mirinda 2.25",
    //           "title": "Mirinda 2.25",
    //           "imageThumbnail": "/imagestemp/itm610038.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         },
    //         {
    //           "position": 6,
    //           "option_id": 1603,
    //           "selection_id": 12217,
    //           "price": 21,
    //           "id": 1686,
    //           "name": "Orange Juice 1L",
    //           "title": "Orange Juice 1L",
    //           "imageThumbnail": "/imagestemp/itm610033.png",
    //           "modGroupId": -1,
    //           "selectionQty": 1,
    //           "subOptions": [],
    //           "selected": 0,
    //           "default": 0,
    //           "dependentSteps": []
    //         }
    //       ],
    //       "maximumQty": 0,
    //       "minimumQty": 0,
    //       "isDependent": 0
    //     }
    //   ],
    //   "selectedItem": 900118,
    //   "typeId": "bundle",
    //   "originalTypeId": "bundle_group",
    //   "sku": 900118,
    //   "promoId": 32,
    //   "imageSmall": "/imagestemp/itm410006.png",
    //   "imageThumbnail": "/imagestemp/itm410006.png",
    //   "image": "/imagestemp/itm410006.png",
    //   "taxClassId": 2,
    //   "virtualGroup": 16298,
    //   "visibility": 4,
    //   "associative": 0
    // }

    // let entry = {}


    // product.bundleProductOptions.forEach(bpo => {
    //   if (bpo.type == "stepper") {
    //     console.log("111111111111")


    //     bpo.productLinks.forEach(pl => {
    //       let CEntryObj = {}
    //       CEntryObj['DealID'] = 0
    //       let CEntryArr = []
    //       if (pl.selectionQty > 0) {
    //         for (let i = 0; i < pl.selectionQty; i++) {
    //           CEntryArr.push({
    //             ID: 0,
    //             ItemID: pl.id,
    //             ModCode: "NONE",
    //             ModgroupID: 1,
    //             Name: pl.name,
    //             OrdrMode: "OM_SAVED",
    //             Weight: 0,
    //           })
    //         }
    //         CEntryObj['Entries'] = { CEntry: CEntryArr }
    //         CEntryObj['ID'] = 0
    //         CEntryObj['ItemID'] =
    //           CEntryObj['ModCode'] =
    //           CEntryObj['Name'] =
    //           CEntryObj['QCComponent'] =
    //           CEntryObj['QCInstanceID'] =
    //           CEntryObj['QCLevel'] =
    //           CEntryObj['QCProID'] = 
    //       }
    //     })
    //   } else {

    //   }
    //   entry['CEntry'] = CEntry
    // })
    // console.log("entry", entry)


    await bootstrap(server)

    // await SDM.OrderSDME.getOrderDetail({})

  } catch (error) {
    console.error(error)
  }
})()