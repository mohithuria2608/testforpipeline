import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { userService } from '../../grpc/client'
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
            auth.userData = await userService.fetchUserById({ id: auth.id })
            let getAddress: IUserGrpcRequest.IFetchAddressByIdRes = await userService.fetchAddressById({ userId: auth.userData.id, addressId: payload.addressId })
            if (!getAddress.hasOwnProperty("id"))
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_ADDRESS)

            let putArg: IAerospike.Put = {
                bins: {
                    address: {
                        id: getAddress.id,
                        sdmAddressRef: getAddress.sdmAddressRef,
                        cmsAddressRef: getAddress.cmsAddressRef,
                        areaId: getAddress.areaId,
                        storeId: getAddress.storeId,
                        tag: getAddress.tag,
                        bldgName: getAddress.bldgName,
                        description: getAddress.description,
                        flatNum: getAddress.flatNum,
                        addressType: getAddress.addressType
                    },
                    status: Constant.DATABASE.STATUS.ORDER.PENDING
                },
                set: ENTITY.OrderE.set,
                key: payload.cartId,
                update: true,
            }
            await Aerospike.put(putArg)
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
            auth.userData = await userService.fetchUserById({ id: auth.id })
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "userId",
                    value: auth.userData.id
                },
                set: ENTITY.OrderE.set,
                background: false,
            }
            let getOrderHistory: IOrderRequest.IOrderData[] = await Aerospike.query(queryArg)
            if (getOrderHistory && getOrderHistory.length > 0) {
                getOrderHistory.map(obj => { return obj['isPreviousOrder'] = true })
            }
            let page = -1;
            return {
                "list": [
                    {
                        "cartId": "aad04f8b5fd63bafd0e26c52731eb4a5ad4ac50f5c22c4c5424cdb35988e09c9",
                        "cmsCartRef": 0,
                        "sdmOrderRef": 0,
                        "cmsOrderRef": 0,
                        "userId": "d234b6b0-32b9-11ea-ad4b-376448739c79",
                        "orderId": "UAE-1",
                        "status": "CART",
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
                        "subTotal": 0,
                        "total": 0,
                        "tax": [
                            {
                                "name": "VAT",
                                "value": 0.26
                            }
                        ],
                        "shipping": [
                            {
                                "name": "VAT",
                                "code": "FREE",
                                "value": 7.5
                            }
                        ],
                        "coupon": [

                        ],
                        "address": {
                            "areaId": 520,
                            "id": "4c0c6cd0-32ba-11ea-ad4b-376448739c79",
                            "storeId": 0,
                            "sdmAddressRef": 0,
                            "cmsAddressRef": 0
                        }
                    }
                ],
                "nextPage": -1,
                currentPage: payload.page
            }
        } catch (err) {
            consolelog(process.cwd(), "orderHistory", err, false)
            return Promise.reject(err)
        }
    }
}

export const orderController = new OrderController();