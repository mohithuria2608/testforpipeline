import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { userService, locationService, kafkaService } from '../../grpc/client'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class OrderController {

    constructor() { }

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
            let putArg: IAerospike.Put = {
                bins: {
                    createdAt: new Date().getTime(),
                    address: {
                        addressId: getAddress.id,
                        sdmAddressRef: getAddress.sdmAddressRef,
                        cmsAddressRef: getAddress.cmsAddressRef,
                        tag: getAddress.tag,
                        bldgName: getAddress.bldgName,
                        description: getAddress.description,
                        flatNum: getAddress.flatNum,
                        addressType: getAddress.addressType,
                        lat: getAddress.lat,
                        lng: getAddress.lng
                    },
                    store: {
                        sdmStoreRef: getStore.storeId,
                        lat: getStore.location.latitude,
                        lng: getStore.location.longitude,
                        address: getStore.address_en
                    },
                    status: Constant.DATABASE.STATUS.ORDER.PENDING.AS
                },
                set: ENTITY.OrderE.set,
                key: payload.cartId,
                update: true,
            }
            await Aerospike.put(putArg)
            ENTITY.OrderE.getSdmOrder({ cartId: payload.cartId, sdmOrderRef: 0, timeInterval: Constant.KAFKA.SDM.ORDER.INTERVAL.GET_STATUS, status: Constant.DATABASE.STATUS.ORDER.PENDING.AS })
            return {}
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
            auth.userData = await userService.fetchUser({ userId: auth.id })
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "userId",
                    value: auth.userData.id
                },
                set: ENTITY.OrderE.set,
                background: false,
            }
            let getOrderHistory: IOrderRequest.IOrderModel[] = await Aerospike.query(queryArg)
            if (getOrderHistory && getOrderHistory.length > 0) {
                getOrderHistory.map(obj => { return obj['isPreviousOrder'] = true })
            }
            getOrderHistory = [
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                },
                {
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
                            "metaKeyword": [
                                "Cheesecake"
                            ],
                            "taxClassId": "2",
                            "position": 0,
                            "name": "Cheesecake",
                            "imageSmall": "null",
                            "selectedItem": 0,
                            "specialPrice": 9.5,
                            "bundleProductOptions": [

                            ],
                            "visibility": 4,
                            "finalPrice": 9.5,
                            "virtualGroup": 0,
                            "typeId": "simple",
                            "qty": 2,
                            "image": "null",
                            "description": "adff",
                            "sku": "710001",
                            "id": 58,
                            "inSide": "0",
                            "configurableProductOptions": [

                            ],
                            "products": [

                            ],
                            "imageThumbnail": "null",
                            "associative": "0"
                        }
                    ],
                    "subTotal": 30.25,
                    "total": 30.25,
                    "tax": [
                        {
                            "name": "VAT",
                            "value": 0.26
                        }
                    ],
                    "shipping": [
                        {
                            "name": "FLAT DELIVERY",
                            "code": "FLAT",
                            "value": 7.5
                        }
                    ],
                    "coupon": [],
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
                        sdmStoreRef: 28,
                        lat: 50.322,
                        lng: 20.322,
                        address: "store is open address"
                    },
                    "isPreviousOrder": false
                }
            ]

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
     * @param {number} orderId
     * */
    async trackOrder(headers: ICommonRequest.IHeaders, payload: IOrderRequest.ITrackOrder, auth: ICommonRequest.AuthorizationObj) {
        try {
            return {
                "orderId": "UAE-1",
                "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                "status": "PENDING",
                "createdAt": 1578558475844,
                "updatedAt": 1578558475844,
            }
        } catch (err) {
            consolelog(process.cwd(), "orderHistory", err, false)
            return Promise.reject(err)
        }
    }
}

export const orderController = new OrderController();