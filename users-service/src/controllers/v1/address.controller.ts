import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'

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
            let store: IStoreGrpcRequest.IStore[] = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
            if (store && store.length) {
                return await ENTITY.AddressE.addAddress(headers.deviceid, auth.userData, payload, store[0])
            } else
                return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE

        } catch (err) {
            consolelog(process.cwd(), "registerAddress", err, false)
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
            return await ENTITY.AddressE.updateAddress(payload, true)
        } catch (err) {
            consolelog(process.cwd(), "updateAddressById", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @description Fetch user related address
    * */
    async fetchAddress(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IFetchAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let queryArg: IAerospike.Query = {
                bins: ["id", "lat", "lng", "bldgName", "description", "flatNum", "tag", "isActive"],
                equal: {
                    bin: "userId",
                    value: auth.userData.id
                },
                set: ENTITY.AddressE.set,
                background: false,
            }
            let addres: IAddressRequest.IAddress[] = await Aerospike.query(queryArg)
            return addres
        } catch (err) {
            consolelog(process.cwd(), "fetchAddress", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method DELETE
    * @description Delete address by id
    * */
    async deleteAddressById(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IDeleteAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.AddressE.updateAddress({ addressId: payload.addressId, isActive: 0 }, false)
        } catch (err) {
            consolelog(process.cwd(), "deleteAddressById", err, false)
            return Promise.reject(err)
        }
    }
}

export const addressController = new AddressController();