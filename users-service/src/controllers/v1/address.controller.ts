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
                userData = await ENTITY.UserE.getUser({ userId: userData.id })
                if (payload.cms.create)
                    await ENTITY.AddressE.addAddressOnCms(userData, headers, asAddress)
                if (payload.cms.update)
                    await ENTITY.AddressE.updateAddressOnCms(userData, headers, asAddress)
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.sync)) {
                let data = JSON.parse(payload.sdm.argv)
                let userData: IUserRequest.IUserData = data.userData
                let headers = data.headers
                let asAddress = data.asAddress
                userData = await ENTITY.UserE.getUser({ userId: userData.id })
                if (payload.sdm.create)
                    await ENTITY.AddressE.addAddressOnSdm(userData, headers, asAddress)
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
            let store: IStoreGrpcRequest.IStore
            if (payload.storeId) {
                // payload.addressType = Constant.DATABASE.TYPE.ADDRESS.PICKUP.TYPE
                // payload.addressSubType = Constant.DATABASE.TYPE.ADDRESS.PICKUP.SUBTYPE.STORE
                let serviceType = (payload.addressSubType == Constant.DATABASE.TYPE.ADDRESS.PICKUP.SUBTYPE.STORE) ? Constant.DATABASE.TYPE.STORE_SERVICE.TAKEAWAY : Constant.DATABASE.TYPE.STORE_SERVICE.CARHOP
                store = await ENTITY.UserE.fetchStore(payload.storeId, headers.language, serviceType)
                if (store && store.id && store.areaId) {
                    if (!store.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                    if (!store.isOnline)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
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
                // payload.addressType = Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE
                // payload.addressSubType = Constant.DATABASE.TYPE.ADDRESS.DELIVERY.SUBTYPE.DELIVERY
                store = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng, Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY)
                if (store && store.id && store.areaId) {
                    if (!store.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                    if (!store.isOnline)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
                }
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)

            let addressData = await ENTITY.AddressE.addAddress(headers, userData, payload, store)
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
    * */
    async syncOldAddress(headers: ICommonRequest.IHeaders, userId: string, payload: IAddressRequest.ISyncOldAddress) {
        try {
            let userData = await ENTITY.UserE.getUser({ userId: userId })
            let store: IStoreGrpcRequest.IStore
            if (payload.storeId) {
                store = await ENTITY.UserE.fetchStore(payload.storeId, headers.language, Constant.DATABASE.TYPE.STORE_SERVICE.TAKEAWAY)
                if (store && store.id) {
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
                let validateStore = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng, Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY)
                if (validateStore && validateStore.id) {
                    if (!validateStore.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
                    if (!validateStore.isOnline)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E411.STORE_NOT_WORKING)
                    store = validateStore
                }
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)

            let addressData = await ENTITY.AddressE.addAddress(headers, userData, payload, store)
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
                let validateStore: IStoreGrpcRequest.IStore = await ENTITY.UserE.validateCoordinate(payload.lat, payload.lng, Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY)
                if (validateStore && validateStore.id) {
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