'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import * as CMS from "../cms"
import { Aerospike } from '../aerospike'
import { kafkaService, paymentService } from '../grpc/client';


export class OrderClass extends BaseEntity {
    constructor() {
        super('order')
    }
    /**
    * @method INTERNAL
    */
    async syncOrder(payload) {
        try {
            let sdmOrderChange = {
                set: this.set,
                sdm: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            kafkaService.kafkaSync(sdmOrderChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncOrder", error, false)
            return Promise.reject(error)
        }
    }

    async createOrderOnCMS(payload) {
        try {
            let cmsOrder = await CMS.OrderCMSE.createOrder({})
            return cmsOrder
        } catch (error) {
            consolelog(process.cwd(), "createOrderOnCMS", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * */
    async createSdmOrder(payload: IOrderRequest.ICreateSdmOrder) {
        try {

            return {}
        } catch (error) {
            consolelog(process.cwd(), "createSdmOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} orderId : order id
    * @param {string} status : order status
    * @param {string} sdmOrderRef : sdm order id
    * @param {string} timeInterval : set timeout interval
    * */
    async getSdmOrder(payload: IOrderRequest.IGetSdmOrder) {
        try {
            setTimeout(async () => {
                let order = await this.updateOneEntityMdb({ cartId: payload.cartId }, {
                    status: payload.status,
                    updatedAt: new Date().getTime()
                }, { new: true })
                if (order && order.sdmOrderRef) {
                    if (payload.status == Constant.DATABASE.STATUS.ORDER.CLOSED.SDM ||
                        payload.status == Constant.DATABASE.STATUS.ORDER.CANCELED.SDM ||
                        payload.status == Constant.DATABASE.STATUS.ORDER.FAILURE.SDM) {

                    } else {
                        if (payload.status == Constant.DATABASE.STATUS.ORDER.IN_KITCHEN.SDM) {
                            /**
                             * @description step 1 create transaction log on CMS for initiating capture
                             * @description step 2 capture payment on noonpay
                             * @description step 3 create transaction log on CMS for capture
                             */
                            this.updateOneEntityMdb({ cartId: payload.cartId }, {
                                $addToSet: {
                                    transLogs: {
                                        noonpayOrderId: 1,
                                        orderId: "string",
                                        amount: 100,
                                        storeCode: "string",
                                        createdAt: new Date().getTime()
                                    }
                                }
                            })
                            let paymentCapturedObj = await paymentService.capturePayment({
                                noonpayOrderId: 1,
                                orderId: "string",
                                amount: 100,
                                storeCode: "string"
                            })
                            this.updateOneEntityMdb({ cartId: payload.cartId }, {
                                $addToSet: {
                                    transLogs: { ...paymentCapturedObj, createdAt: new Date().getTime() }
                                }
                            })
                        }
                        let orderChange = {
                            set: this.set,
                            sdm: {
                                get: true,
                                argv: JSON.stringify(payload)
                            }
                        }
                        kafkaService.kafkaSync(orderChange)
                    }
                } else {
                    let orderChange = {
                        set: this.set,
                        sdm: {
                            get: true,
                            argv: JSON.stringify(payload)
                        }
                    }
                    kafkaService.kafkaSync(orderChange)
                }
            }, payload.timeInterval)

            return {}
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method AGGREGATE
    * @param {number} page : page number
    * */
    async getOrderHistory(payload: IOrderRequest.IOrderHistory, auth: ICommonRequest.AuthorizationObj) {
        try {
            let nextPage
            let limit = 11
            let skip = (limit * (payload.page - 1));
            let pipeline = [
                {
                    $match: {
                        userId: this.DAOManager.ObjectId(auth.id)
                    }
                },
                {
                    $addFields: {
                        isPreviousOrder: true
                    }
                },
                { $sort: { isPreviousOrder: 1 } },
                { $skip: skip },
                { $limit: limit }
            ]
            let getOrderHistory: IOrderRequest.IOrderData[] = await this.aggregateMdb(pipeline, { lean: true })
            if (getOrderHistory && getOrderHistory.length > 0) {
                nextPage = (getOrderHistory.length == limit) ? (payload.page + 1) : -1
            } else {
                getOrderHistory = [
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
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
                            "address": "store is open address",
                            "name_en": "ABU KADRA - DUBAI",
                            "name_ar": "كنتاكى أبو خضرة  - دبى",
                        },
                        "isPreviousOrder": false
                    }
                ]
                nextPage = (getOrderHistory[((parseInt(payload.page.toString()) * 10) + 1)] !== undefined) ? parseInt(parseInt(payload.page.toString()).toString()) + 1 : -1
                getOrderHistory = getOrderHistory.slice(((parseInt(payload.page.toString()) - 1) * 10), (parseInt(payload.page.toString()) * 10))
            }
            return {
                list: getOrderHistory,
                nextPage: nextPage,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (error) {
            consolelog(process.cwd(), "getOrderHistory", error, false)
            return Promise.reject(error)
        }
    }
}

export const OrderE = new OrderClass()
