import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import { Aerospike } from '../../databases/aerospike'
import * as ENTITY from '../../entity'

export class AddressController {
    constructor() { }

    /**
    * @method POST
    * @description REGISTER USER ADDRESS BY ID
    * */
    async registerAddress(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IRegisterAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let store = await ENTITY.UserE.validateAddres(payload.lat, payload.lng)
            await ENTITY.UserE.addAddress(auth.userData, payload)
            let userObj = await ENTITY.UserE.getById({ id: auth.userData.id })
            return formatUserData(userObj, headers.deviceid)
        } catch (err) {
            consolelog("registerAddress", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @description UPDATE USER ADDRESS BY ID
    * */
    async updateAddressById(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IUpdateAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            await ENTITY.UserE.updateAddress(auth.userData, payload)
            let userObj = await ENTITY.UserE.getById({ id: auth.userData.id })
            return formatUserData(userObj, headers.deviceid)
        } catch (err) {
            consolelog("updateAddressById", err, false)
            return Promise.reject(err)
        }
    }
}

export const addressController = new AddressController();