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
                let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: data.id })
                userData.asAddress = data.asAddress
                if (payload.cms.create) {
                    if (userData.cmsUserRef && userData.cmsUserRef != 0)
                        await ENTITY.AddressE.addAddressOnCms(userData)
                    else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_CMS)
                }
                if (payload.cms.update) {
                    if (userData.cmsUserRef && userData.cmsUserRef != 0)
                        await ENTITY.AddressE.updateAddressOnCms(userData)
                    else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_CMS)
                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.sync)) {
                let data = JSON.parse(payload.sdm.argv)
                let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: data.id })
                userData['asAddress'] = data.asAddress
                userData['headers'] = data.headers
                if (payload.sdm.create) {
                    if (userData.sdmUserRef && userData.sdmUserRef != 0)
                        await ENTITY.AddressE.addAddressOnSdm(userData)
                    else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_SDM)
                }
                if (payload.sdm.update) {
                    if (userData.sdmUserRef && userData.sdmUserRef != 0)
                        await ENTITY.AddressE.updateAddressOnSdm(userData)
                    else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_SDM)
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
                store = await ENTITY.UserE.fetchStore(payload.storeId, headers.language)
                if (store && store.length) {
                    // if (!store[0].isOnline)
                    //     return Promise.reject(Constant.STATUS_MSG.ERROR.E409.STORE_NOT_FOUND)
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                    payload['lat'] = store[0].location.latitude
                    payload['lng'] = store[0].location.longitude
                    payload['bldgName'] = store[0].location.description
                    payload['description'] = store[0].location.description
                    payload['flatNum'] = store[0].location.description
                    payload['tag'] = Constant.DATABASE.TYPE.TAG.OTHER
                } else
                    return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE
            } else if (payload.lat && payload.lng) {
                store = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
                if (store && store.length) {
                    // if (!store[0].isOnline)
                    //     return Promise.reject(Constant.STATUS_MSG.ERROR.E409.STORE_NOT_FOUND)
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                } else
                    return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE
            } else
                return Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE

            let addressData = await ENTITY.AddressE.addAddress(headers, userData, type, payload, store[0])
            if (userData && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST) {
                userData['asAddress'] = [addressData]
                userData['headers'] = headers
                kafkaService.kafkaSync({
                    set: ENTITY.AddressE.set,
                    cms: {
                        create: true,
                        argv: JSON.stringify(userData)
                    },
                    sdm: {
                        create: true,
                        argv: JSON.stringify(userData)
                    },
                    inQ: true
                })
            }
            return addressData
        } catch (error) {
            consolelog(process.cwd(), "registerAddress", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * @description Sync old address
    * @param {string} storeId
    * @param {number} lat
    * @param {number} lng
    * @param {string} bldgName
    * @param {string} description
    * @param {string} flatNum
    * @param {string} tag
    * */
    async syncOldAddress(headers: ICommonRequest.IHeaders, userId: string, payload: IAddressRequest.ISyncOldAddress) {
        try {
            console.log("syncOldAddress", userId, payload)
            let userData = await ENTITY.UserE.getUser({ userId: userId })
            let type = ""
            let store: IStoreGrpcRequest.IStore[]
            if (payload.storeId) {
                store = await ENTITY.UserE.fetchStore(payload.storeId, headers.language)
                if (store && store.length) {
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                    payload['addressId'] = payload.addressId
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

            let addressData = await ENTITY.AddressE.addAddress(headers, userData, type, payload, store[0])
            if (userData && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST) {
                userData['asAddress'] = [addressData]
                userData['headers'] = headers
                kafkaService.kafkaSync({
                    set: ENTITY.AddressE.set,
                    cms: {
                        create: true,
                        argv: JSON.stringify(userData)
                    },
                    sdm: {
                        create: true,
                        argv: JSON.stringify(userData)
                    },
                    inQ: true
                })
            }

            return addressData
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
            let updatedAdd = await ENTITY.AddressE.updateAddress(headers, payload, Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY, userData, false)

            if (updatedAdd.cmsAddressRef && updatedAdd.cmsAddressRef != 0) {
                userData['asAddress'] = [updatedAdd]
                userData['headers'] = headers
                kafkaService.kafkaSync({
                    set: ENTITY.AddressE.set,
                    cms: {
                        update: true,
                        argv: JSON.stringify(userData)
                    },
                    inQ: true
                })
            }

            return updatedAdd
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
            if (auth.isGuest != undefined && auth.isGuest == 0) {
                let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
                let address: IAddressRequest.IAddress[] = await ENTITY.AddressE.getAddress({ userId: userData.id, bin: Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY })
                return address
            } else
                return []
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
            return await ENTITY.AddressE.updateAddress(headers, { addressId: payload.addressId }, Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY, userData, true)
        } catch (error) {
            consolelog(process.cwd(), "deleteAddressById", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const addressController = new AddressController();