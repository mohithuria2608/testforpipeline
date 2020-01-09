import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { userService } from '../../grpc/client'
import { sendSuccess } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'

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
                getOrderHistory.map(obj => { return obj['isPreviousOrder'] = 1 })
            }
            return getOrderHistory
        } catch (err) {
            consolelog(process.cwd(), "orderHistory", err, false)
            return Promise.reject(err)
        }
    }
}

export const orderController = new OrderController();