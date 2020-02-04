import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class AddressController {
    constructor() { }

    /**
    * @method POST
    * @description Register user address
    * @param {number} lat
    * @param {number} lng
    * @param {string} bldgName
    * @param {string} description
    * @param {string} flatNum
    * @param {string} tag
    * */
    async registerAddress(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IRegisterAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let type = ""
            let store: IStoreGrpcRequest.IStore[]
            if (payload.storeId) {
                store = await ENTITY.UserE.fetchStore(payload.storeId)
                if (store && store.length) {
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                    payload['lat'] = store[0].location.latitude
                    payload['lng'] = store[0].location.longitude
                    payload['bldgName'] = ""
                    payload['description'] = ""
                    payload['flatNum'] = ""
                    payload['tag'] = Constant.DATABASE.TYPE.TAG.OTHER
                } else
                    return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE
            } else if (payload.lat && payload.lng) {
                store = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
                if (store && store.length) {
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                } else
                    return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE
            } else
                return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE

            return await ENTITY.AddressE.addAddress(userData, type, payload, store[0])
        } catch (error) {
            consolelog(process.cwd(), "registerAddress", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @description Update user address by addressId
    * @param {string} addressId
    * @param {string=} bldgName
    * @param {string=} description
    * @param {string=} flatNum
    * @param {string=} tag
    * */
    async updateAddressById(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IUpdateAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            if (payload.lat && payload.lng) {
                let store: IStoreGrpcRequest.IStore[] = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
                if (store && store.length) {

                } else
                    return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE
            }
            return await ENTITY.AddressE.updateAddress(payload, Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY, userData, false)
        } catch (error) {
            consolelog(process.cwd(), "updateAddressById", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @description Fetch user related address
    * */
    async fetchAddress(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IFetchAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let address: IAddressRequest.IAddressModel[] = await ENTITY.AddressE.getAddress({ userId: userData.id, bin: Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY })
            return address
        } catch (error) {
            consolelog(process.cwd(), "fetchAddress", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method DELETE
    * @description Delete address by id
    * */
    async deleteAddressById(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IDeleteAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            return await ENTITY.AddressE.updateAddress({ addressId: payload.addressId }, Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY, userData, true)
        } catch (error) {
            consolelog(process.cwd(), "deleteAddressById", error, false)
            return Promise.reject(error)
        }
    }
}

export const addressController = new AddressController();