import * as Constant from '../../constant'
import { consolelog, cryptData } from '../../utils'
import { userService, locationService, kafkaService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class OrderController {

    constructor() { }

    /**
    * @description sync user to cms and sdm coming from KAFKA
    * @param {IKafkaGrpcRequest.IKafkaBody} payload 
    */
    async syncOrderFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update) {

                }
                if (payload.as.update) {

                }
            }
            if (payload.cms.create || payload.cms.update || payload.cms.get) {
                if (payload.cms.create) {

                }
            }
            if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
                if (payload.sdm.create)
                    ENTITY.OrderE.createSdmOrder(data)
                if (payload.sdm.get)
                    ENTITY.OrderE.getSdmOrder(data)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }


    /**
     * @method POST
     * @param {string} addressId
     * @param {string} cartId
     * */
    async postOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IPostOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            auth.userData = await userService.fetchUser({ userId: auth.id })
            let getAddress: IUserGrpcRequest.IFetchAddressRes = await userService.fetchAddress({ userId: auth.userData.id, addressId: payload.addressId, bin: "delivery" })
            if (!getAddress.hasOwnProperty("id"))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)

            let getStore: IStoreGrpcRequest.IStore = await locationService.fetchStore({ storeId: getAddress.sdmStoreRef })
            if (!getStore.hasOwnProperty("id"))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_STORE)

            let cartData = await ENTITY.CartE.getCart({ cartId: payload.cartId })

            ENTITY.OrderE.syncOrder(cartData)

            cartData['status'] = Constant.DATABASE.STATUS.ORDER.PENDING.MONGO
            cartData['updatedAt'] = new Date().getTime()
            await ENTITY.OrderE.createOneEntityMdb(cartData)
            let newCartId = ENTITY.OrderE.DAOManager.ObjectId().toString()
            await ENTITY.CartE.assignNewCart(newCartId, auth.id)
            // let asUserChange = {
            //     set: Constant.SET_NAME.USER,
            //     as: {
            //         update: true,
            //         argv: JSON.stringify({ userId: auth.id, cartId: newCartId })
            //     }
            // }
            // await kafkaService.kafkaSync(asUserChange)
            Aerospike.remove({ set: ENTITY.CartE.set, key: payload.cartId })

            ENTITY.OrderE.getSdmOrder({ cartId: payload.cartId, sdmOrderRef: 0, timeInterval: Constant.KAFKA.SDM.ORDER.INTERVAL.GET_STATUS, status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO })
            return { cartId: newCartId }
        } catch (err) {
            consolelog(process.cwd(), "postOrder", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GET
     * @param {number} page
     * */
    async orderHistory(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IOrderHistory, auth: ICommonRequest.AuthorizationObj) {
        try {
            // let getOrderHistory: IOrderRequest.IOrderData[] = await ENTITY.OrderE.getMultipleMdb({ userId: auth.id }, {})
            // if (getOrderHistory && getOrderHistory.length > 0) {
            //     getOrderHistory.map(obj => { return obj['isPreviousOrder'] = true })
            // } else {
            let getOrderHistory = [
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
                {
                    "_id": "5e2422631f66da1fa13402f1",
                    "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                    "cmsCartRef": 0,
                    "sdmOrderRef": 0,
                    "cmsOrderRef": 0,
                    "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                    "orderId": "UAE-1",
                    "status": "PENDING",
                    "createdAt": 1578558475844,
                    "updatedAt": 1578558475844,
                    "items": [
                        {
                            "id": 1,
                            "position": 1,
                            "name": "Chocolate Chip Cookie",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 5.5,
                            "specialPrice": 4.5,
                            "typeId": "simple",
                            "catId": 21,
                            "metaKeyword": [
                                "Chocolate Chip Cookie"
                            ],
                            "bundleProductOptions": [],
                            "selectedItem": 0,
                            "configurableProductOptions": [],
                            "items": [],
                            "sku": 710003,
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 0,
                            "visibility": 4,
                            "associative": 0
                        }
                    ],
                    "amount": [
                        {
                            "type": "SUB_TOTAL",
                            "name": "Sub Total",
                            "code": "SUB_TOTAL",
                            "amount": 30.25,
                            "sequence": 1

                        },
                        {
                            "type": "DISCOUNT",
                            "name": "Discount",
                            "code": "KFC 10",
                            "amount": 2,
                            "sequence": 2
                        },
                        {
                            "type": "TAX",
                            "name": "VAT",
                            "code": "VAT",
                            "amount": 0.26,
                            "sequence": 3
                        },
                        {
                            "type": "SHIPPING",
                            "name": "Free Delivery",
                            "code": "FLAT",
                            "amount": 7.5,
                            "sequence": 4
                        },
                        {
                            "type": "TOTAL",
                            "name": "Total",
                            "code": "TOTAL",
                            "amount": 30.25,
                            "sequence": 5
                        }],
                    "address": {
                        "areaId": 520,
                        "addressId": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                        "storeId": 0,
                        "sdmAddressRef": 0,
                        "cmsAddressRef": 0,
                        "tag": "HOME",
                        "bldgName": "Peru",
                        "description": "Peru society, street 2",
                        "flatNum": "35",
                        "addressType": "DELIVERY",
                        "lat": 50.322,
                        "lng": 20.322
                    },
                    "store": {
                        "sdmStoreRef": 28,
                        "lat": 50.322,
                        "lng": 20.322,
                        "address": "store is open address"
                    },
                    "isPreviousOrder": true
                },
            ]
            // }

            let nextPage = (getOrderHistory[((parseInt(payload.page.toString()) * 10) + 1)] !== undefined) ? parseInt(parseInt(payload.page.toString()).toString()) + 1 : -1
            getOrderHistory = getOrderHistory.slice(((parseInt(payload.page.toString()) - 1) * 10), (parseInt(payload.page.toString()) * 10))

            return {
                list: getOrderHistory,
                nextPage: nextPage,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (err) {
            consolelog(process.cwd(), "orderHistory", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GET
     * @param {string} cCode
     * @param {string} phnNo
     * @param {number} orderId
     * */
    async trackOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.ITrackOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            // let trackOrder: IOrderRequest.IOrderData = await ENTITY.OrderE.getOneEntityMdb({ $or: [{ _id: payload.orderId }, { orderId: payload.orderId }] },
            //     {
            //         orderId: 1,
            //         userId: 1,
            //         status: 1,
            //         createdAt: 1,
            //         updatedAt: 1
            //     })
            // if (trackOrder && trackOrder._id) {
            //     return trackOrder
            // } else {
            return {
                "_id": "5e2422631f66da1fa13402f1",
                "orderId": "UAE-1",
                "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                "status": "PENDING",
                "createdAt": 1578558475844,
                "updatedAt": 1578558475844,
            }
            // }
        } catch (err) {
            consolelog(process.cwd(), "trackOrder", err, false)
            return Promise.reject(err)
        }
    }
}

export const orderController = new OrderController();