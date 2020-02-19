import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class AddressController {
    constructor() { }

    /**
     * @description sync address to cms and sdm coming from KAFKA
     * @param {IKafkaGrpcRequest.IKafkaBody} payload 
     */
    async syncAddress(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.sync)) {
                let data = JSON.parse(payload.as.argv)
                if (payload.as.create) {

                }
            }
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.sync)) {
                let data = JSON.parse(payload.cms.argv)
                if (payload.cms.create) {

                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.sync)) {
                let data = JSON.parse(payload.sdm.argv)
                if (payload.sdm.create) {

                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncAddress", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

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

            let addressData = await ENTITY.AddressE.addAddress(userData, type, payload, store[0])
            kafkaService.sync()
            return addressData
        } catch (error) {
            consolelog(process.cwd(), "registerAddress", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * @description Sync old address
    * @param {string} sdmStoreRef
    * @param {number} lat
    * @param {number} lng
    * @param {string} bldgName
    * @param {string} description
    * @param {string} flatNum
    * @param {string} tag
    * */
    async syncOldAddress(userData: IUserRequest.IUserData, payload: IAddressRequest.ISyncOldAddress) {
        try {
            userData = await ENTITY.UserE.getUser({ userId: userData.id })
            let type = ""
            let store: IStoreGrpcRequest.IStore[]
            if (payload.sdmStoreRef) {
                store = await ENTITY.UserE.fetchStore(payload.sdmStoreRef)
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
            consolelog(process.cwd(), "syncOldAddress", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "updateAddressById", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "fetchAddress", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "deleteAddressById", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const addressController = new AddressController();