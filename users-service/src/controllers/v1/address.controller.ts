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
            let store: IStoreGrpcRequest.IStore[] = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
            if (store && store.length) {
                return await ENTITY.AddressE.addAddress(userData, "delivery", payload, store[0])
            } else
                return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE

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
            return await ENTITY.AddressE.updateAddress(payload, "delivery", userData, false)
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
            let address: IAddressRequest.IAddressModel[] = await ENTITY.AddressE.getAddress({ userId: userData.id, bin: "delivery" })
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
            return await ENTITY.AddressE.updateAddress({ addressId: payload.addressId }, "delivery", userData, true)
        } catch (error) {
            consolelog(process.cwd(), "deleteAddressById", error, false)
            return Promise.reject(error)
        }
    }
}

export const addressController = new AddressController();