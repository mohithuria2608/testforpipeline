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
            let store: IStoreGrpcRequest.IStore = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
            if (store && store.id) {
                // let area = await ENTITY.UserE.getAreaByStoreId(parseInt(store.id))
                // if (area && area.id) {
                return await ENTITY.AddressE.addAddress(headers.deviceid, auth.userData, payload, store)
                // } else
                //     return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_LOCATION)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_LOCATION)

        } catch (err) {
            consolelog("registerAddress", err, false)
            return Promise.reject(err)
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
            return await ENTITY.AddressE.updateAddress(payload)
        } catch (err) {
            consolelog("updateAddressById", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @description Fetch user related address
    * */
    async fetchAddress(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IFetchAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            return []
        } catch (err) {
            consolelog("fetchAddress", err, false)
            return Promise.reject(err)
        }
    }
}

export const addressController = new AddressController();