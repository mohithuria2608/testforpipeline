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
                let userData: IUserRequest.IUserData = data.userData
                let headers = data.headers
                let asAddress = data.asAddress
                userData = await ENTITY.UserE.getUser({ userId: data.id })
                if (payload.cms.create) {
                    if (userData.cmsUserRef && userData.cmsUserRef != 0)
                        await ENTITY.AddressE.addAddressOnCms(userData, headers, asAddress)
                    else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_CMS)
                }
                if (payload.cms.update) {
                    if (userData.cmsUserRef && userData.cmsUserRef != 0)
                        await ENTITY.AddressE.updateAddressOnCms(userData, headers, asAddress)
                    else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_CMS)
                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.sync)) {
                let data = JSON.parse(payload.sdm.argv)
                let userData: IUserRequest.IUserData = data.userData
                let headers = data.headers
                let asAddress = data.asAddress
                userData = await ENTITY.UserE.getUser({ userId: data.id })
                if (payload.sdm.create) {
                    if (userData.sdmUserRef && userData.sdmUserRef != 0)
                        await ENTITY.AddressE.addAddressOnSdm(userData, headers, asAddress)
                    else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_SDM)
                }
                if (payload.sdm.update) {
                    if (userData.sdmUserRef && userData.sdmUserRef != 0) {
                    }
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
            let store: IStoreGrpcRequest.IStore
            if (payload.storeId) {
                store = await ENTITY.UserE.fetchStore(payload.storeId, headers.language)
                if (store && store.id && store.id != "") {
                    if (!store.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                    if (!store.isOnline)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                    payload['lat'] = store.location.latitude
                    payload['lng'] = store.location.longitude
                    payload['bldgName'] = (headers.language == Constant.DATABASE.LANGUAGE.EN) ? store.name_en : store.name_ar
                    payload['description'] = (headers.language == Constant.DATABASE.LANGUAGE.EN) ? store.address_en : store.address_ar
                    payload['flatNum'] = '0'
                    payload['tag'] = Constant.DATABASE.TYPE.TAG.OTHER
                }
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
            } else if (payload.lat && payload.lng) {
                let validateStore = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
                if (validateStore && validateStore.id && validateStore.id != "") {
                    if (!validateStore.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                    if (!validateStore.isOnline)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
                    store = validateStore
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                }
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)

            let addressData = await ENTITY.AddressE.addAddress(headers, userData, type, payload, store)
            if (userData && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST) {
                kafkaService.kafkaSync({
                    set: ENTITY.AddressE.set,
                    cms: {
                        create: true,
                        argv: JSON.stringify({
                            userData: userData,
                            headers: headers,
                            asAddress: [addressData]
                        })
                    },
                    sdm: {
                        create: true,
                        argv: JSON.stringify({
                            userData: userData,
                            headers: headers,
                            asAddress: [addressData]
                        })
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
            let store: IStoreGrpcRequest.IStore
            if (payload.storeId) {
                store = await ENTITY.UserE.fetchStore(payload.storeId, headers.language)
                if (store && store.id && store.id != "") {
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                    payload['addressId'] = payload.addressId
                    payload['lat'] = store.location.latitude
                    payload['lng'] = store.location.longitude
                    payload['bldgName'] = ""
                    payload['description'] = ""
                    payload['flatNum'] = ""
                    payload['tag'] = Constant.DATABASE.TYPE.TAG.OTHER
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)

            } else if (payload.lat && payload.lng) {
                let validateStore = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
                if (validateStore && validateStore.id && validateStore.id != "") {
                    if (!validateStore.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                    if (!validateStore.isOnline)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
                    store = validateStore
                    type = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                }
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)

            let addressData = await ENTITY.AddressE.addAddress(headers, userData, type, payload, store)
            if (userData && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST) {
                kafkaService.kafkaSync({
                    set: ENTITY.AddressE.set,
                    cms: {
                        create: true,
                        argv: JSON.stringify({
                            userData: userData,
                            headers: headers,
                            asAddress: [addressData]
                        })
                    },
                    sdm: {
                        create: true,
                        argv: JSON.stringify({
                            userData: userData,
                            headers: headers,
                            asAddress: [addressData]
                        })
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
                let validateStore: IStoreGrpcRequest.IStore = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng)
                if (validateStore && validateStore.id && validateStore.id != "") {
                    if (!validateStore.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                    if (!validateStore.isOnline)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
                }
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
            }
            let updatedAdd = await ENTITY.AddressE.updateAddress(headers, payload, Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY, userData, false)

            if (updatedAdd.cmsAddressRef && updatedAdd.cmsAddressRef != 0) {
                kafkaService.kafkaSync({
                    set: ENTITY.AddressE.set,
                    cms: {
                        update: true,
                        argv: JSON.stringify({
                            userData: userData,
                            headers: headers,
                            asAddress: [updatedAdd]
                        })
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