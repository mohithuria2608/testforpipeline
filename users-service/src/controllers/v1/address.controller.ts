import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import * as ENTITY from '../../entity'
import { stream } from 'winston'

export class AddressController {
    constructor() { }

    /**
    * @method POST
    * @description REGISTER USER ADDRESS BY ID
    * */
    async registerAddress(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IRegisterAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let store: IStoreGrpcRequest.IStore = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
            if (store && store.id) {
                // let area = await ENTITY.UserE.getAreaByStoreId(parseInt(store.id))
                // if (area && area.id) {
                await ENTITY.UserE.addAddress(headers.deviceid, auth.userData, payload, store)
                let userObj = await ENTITY.UserE.getById({ id: auth.userData.id })
                return formatUserData(userObj, headers.deviceid)
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