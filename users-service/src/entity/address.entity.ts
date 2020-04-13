'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'
import * as SDM from '../sdm';
import * as CMS from "../cms";
import { kafkaService } from '../grpc/client'

export class AddressEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.ADDRESS)
    }

    public subSddressSchema = Joi.object().keys({
        /**
         * @usage : FE
         */
        id: Joi.string().trim().required().description("pk"),
        description: Joi.string(),
        lat: Joi.number().min(-90).max(90).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
        lng: Joi.number().min(-180).max(180).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
        bldgName: Joi.string(),
        flatNum: Joi.string(),
        tag: Joi.string().valid(
            Constant.DATABASE.TYPE.TAG.HOME,
            Constant.DATABASE.TYPE.TAG.OFFICE,
            Constant.DATABASE.TYPE.TAG.HOTEL,
            Constant.DATABASE.TYPE.TAG.OTHER),
        addressType: Joi.string().valid(
            Constant.DATABASE.TYPE.ADDRESS.PICKUP.TYPE,
            Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE),
        createdAt: Joi.number().required(),
        updatedAt: Joi.number().required(),
        /**
         * @usage : Reference
         */
        sdmAddressRef: Joi.number(),
        cmsAddressRef: Joi.number(),
        storeId: Joi.number().required(),
        countryId: Joi.number().required(),
        areaId: Joi.number().required(),
        cityId: Joi.number().required(),
    })

    /**
     * @KEY : userId is used as key for this set
     */
    public addressSchema = Joi.object().keys({
        delivery: Joi.array().items(this.subSddressSchema),
        pickup: Joi.array().items(this.subSddressSchema),
    })


    /**
    * @method GRPC
    * @param {string} userId : user id
    * @param {string} bin : delivery or pickup
    * @param {string=} addressd : address id
    * */
    async getAddress(payload: IAddressRequest.IFetchAddress) {
        try {
            let listGetArg: IAerospike.ListOperation = {
                order: true,
                set: this.set,
                key: payload.userId,
                bin: payload.bin,
                getByIndexRange: true,
                index: 0
            }
            let listaddress = await Aerospike.listOperations(listGetArg)
            if (listaddress && listaddress.bins && listaddress.bins[payload.bin] && listaddress.bins[payload.bin].length > 0) {
                listaddress = listaddress.bins[payload.bin]
            } else
                listaddress = []
            if (payload.addressId) {
                if (listaddress.length > 0) {
                    let addressById = listaddress.filter(obj => {
                        return obj.id == payload.addressId
                    })
                    return (addressById && addressById.length > 0) ? addressById[0] : {}
                } else
                    return {}
            } else
                return listaddress

        } catch (error) {
            consolelog(process.cwd(), "getAddress", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Add address on aerospike
     * @method INTERNAL
     * */
    async addAddress(headers: ICommonRequest.IHeaders, userData: IUserRequest.IUserData, addressData: IAddressRequest.IRegisterAddress, store: IStoreGrpcRequest.IStore) {
        try {
            const id = addressData.addressId ? addressData.addressId : this.ObjectId().toString();
            let address: IAddressRequest.IAddress = {
                id: id,
                addressType: addressData.addressType,
                addressSubType: addressData.addressSubType,
                lat: addressData.lat,
                lng: addressData.lng,
                bldgName: addressData.bldgName,
                description: addressData.description,
                flatNum: addressData.flatNum,
                tag: addressData.tag,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                sdmAddressRef: addressData.sdmAddressRef ? addressData.sdmAddressRef : 0,
                cmsAddressRef: addressData.cmsAddressRef ? addressData.cmsAddressRef : 0,
                countryId: store.countryId,
                storeId: store.storeId,
                areaId: store.areaId,
                cityId: store.cityId,
            };

            if (addressData.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE) {
                consolelog(process.cwd(), "deliveryAddress", JSON.stringify(address), false)
                let checkForMax6Add = await this.getAddress({ userId: userData.id, bin: Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY })
                if (checkForMax6Add && checkForMax6Add.length == 6) {
                    let listRemoveByIndexArg: IAerospike.ListOperation = {
                        order: true,
                        set: this.set,
                        key: userData.id,
                        bin: Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY,
                        remByIndex: true,
                        index: 0
                    }
                    await Aerospike.listOperations(listRemoveByIndexArg)
                    let delCmsAddressRef = checkForMax6Add[0]
                    if (delCmsAddressRef && delCmsAddressRef.cmsAddressRef && delCmsAddressRef.cmsAddressRef != 0)
                        CMS.AddressCMSE.deleteAddresssOnCms({ cmsUserRef: userData.cmsUserRef, cmsAddressRef: delCmsAddressRef.cmsAddressRef })
                }
                let listAppendArg: IAerospike.ListOperation = {
                    order: true,
                    bins: address,
                    set: this.set,
                    key: userData.id,
                    bin: Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY,
                    append: true
                }
                await Aerospike.listOperations(listAppendArg)
            } else {
                address['description'] = store.location.description.substr(0, 10)
                let dataToUpdate = {
                    pickup: [address]
                }
                consolelog(process.cwd(), "pickupAddress", JSON.stringify(address), false)
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: this.set,
                    key: userData.id,
                    createOrReplace: true
                }
                consolelog(process.cwd(), "putArg", JSON.stringify(putArg), false)
                await Aerospike.put(putArg)
            }
            return address
        } catch (error) {
            consolelog(process.cwd(), "addAddress", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Update address on aerospike
     * @param addressUpdate 
     * @param bin 
     * @param userData 
     * @param isDelete 
     */
    async updateAddress(headers: ICommonRequest.IHeaders, addressUpdate: IAddressRequest.IUpdateAddress, bin: string, userData: IUserRequest.IUserData, isDelete: boolean) {
        try {
            let listaddress = await this.getAddress({ userId: userData.id, bin: bin })
            let sdmAddressRef = addressUpdate.sdmAddressRef ? addressUpdate.sdmAddressRef : 0
            let cmsAddressRef = addressUpdate.cmsAddressRef ? addressUpdate.cmsAddressRef : 0
            let index = listaddress.findIndex(x => x.id === addressUpdate.addressId);
            if (index < 0) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ADDRESS_NOT_FOUND)
            } else {
                if (listaddress[index].sdmAddressRef)
                    sdmAddressRef = listaddress[index].sdmAddressRef
                if (listaddress[index].cmsAddressRef)
                    cmsAddressRef = listaddress[index].cmsAddressRef
            }
            let listRemoveByIndexArg: IAerospike.ListOperation = {
                order: true,
                set: this.set,
                key: userData.id,
                bin: bin,
                remByIndex: true,
                index: index
            }
            await Aerospike.listOperations(listRemoveByIndexArg)
            if (isDelete) {
                let deleteAdd = listaddress[index]
                if (deleteAdd.cmsAddressRef && deleteAdd.cmsAddressRef != 0)
                    CMS.AddressCMSE.deleteAddresssOnCms({ cmsUserRef: userData.cmsUserRef, cmsAddressRef: deleteAdd.cmsAddressRef })
                return {}
            }

            let bins = listaddress[index];
            if (addressUpdate.lat)
                bins['lat'] = addressUpdate.lat
            if (addressUpdate.lng)
                bins['lng'] = addressUpdate.lng
            if (addressUpdate.bldgName)
                bins['bldgName'] = addressUpdate.bldgName
            if (addressUpdate.description)
                bins['description'] = addressUpdate.description
            if (addressUpdate.flatNum)
                bins['flatNum'] = addressUpdate.flatNum
            if (addressUpdate.tag)
                bins['tag'] = addressUpdate.tag
            bins['sdmAddressRef'] = sdmAddressRef
            bins['cmsAddressRef'] = cmsAddressRef

            bins['updatedAt'] = new Date().getTime()
            let listAppendArg: IAerospike.ListOperation = {
                order: true,
                bins: bins,
                set: this.set,
                key: userData.id,
                bin: bin,
                append: true
            }
            await Aerospike.listOperations(listAppendArg)
            return bins
        } catch (error) {
            consolelog(process.cwd(), "updateAddress", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
   * @method SDM
   * @description Add address on SDM
   * */
    async addAddressOnSdm(userData: IUserRequest.IUserData, headers: ICommonRequest.IHeaders, asAddress: IAddressRequest.IAddress[]) {
        try {
            if (userData.sdmUserRef && userData.sdmCorpRef) {
                if (asAddress && typeof asAddress == 'string')
                    asAddress = JSON.parse(asAddress)
                if (asAddress[0].addressType == Constant.DATABASE.TYPE.ADDRESS.PICKUP.TYPE) {
                    asAddress[0].bldgName = ""
                    asAddress[0].description = ""
                    asAddress[0].flatNum = ""
                    asAddress[0].addressType = Constant.DATABASE.TYPE.ADDRESS.PICKUP.TYPE
                }
                consolelog(process.cwd(), "going to add adddress on sdm", JSON.stringify(asAddress), false)
                let addressSdmData = {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.LICENSE_CODE,
                    language: headers.language.toLowerCase(),
                    customerRegistrationID: userData.sdmCorpRef,
                    address: {
                        ADDR_AREAID: asAddress[0].areaId,// 1786,//  16
                        ADDR_BLDGNAME: asAddress[0].bldgName,
                        // ADDR_BLDGNUM: asAddress[0].flatNum,//comment test
                        ADDR_CITYID: asAddress[0].cityId,// 17,
                        ADDR_CLASSID: -1,
                        ADDR_COUNTRYID: 1,
                        ADDR_CUSTID: userData.sdmUserRef,
                        ADDR_DESC: asAddress[0].description,
                        ADDR_DISTRICTID: 1021,// 1008
                        ADDR_FLATNUM: asAddress[0].flatNum,
                        // ADDR_FLOOR: asAddress[0].flatNum,//comment test
                        ADDR_MAPCODE: {
                            X: asAddress[0].lat,
                            Y: asAddress[0].lng
                        },
                        ADDR_PHONEAREACODE: userData.phnNo.slice(0, 2),
                        ADDR_PHONECOUNTRYCODE: userData.cCode.replace('+', ''),
                        ADDR_PHONELOOKUP: userData.phnNo,
                        ADDR_PHONENUMBER: userData.phnNo.slice(2),
                        ADDR_PHONETYPE: 2,
                        ADDR_PROVINCEID: 7,
                        ADDR_SKETCH: asAddress[0].description,
                        ADDR_STREETID: 1,
                        Phones: {
                            CC_CUSTOMER_PHONE: {
                                PHONE_AREACODE: userData.phnNo.slice(0, 2),
                                PHONE_COUNTRYCODE: userData.cCode.replace('+', ''),
                                PHONE_CUSTID: userData.sdmUserRef,
                                PHONE_ISDEFAULT: 84,
                                PHONE_LOOKUP: userData.phnNo,
                                PHONE_NUMBER: userData.phnNo.slice(2),
                                PHONE_TYPE: 2,
                            }
                        },
                        WADDR_AREAID: 1786,// 16
                        WADDR_BUILD_NAME: asAddress[0].bldgName,
                        // WADDR_BUILD_NUM: asAddress[0].flatNum,//comment test
                        WADDR_BUILD_TYPE: -1,
                        WADDR_CITYID: 17,
                        WADDR_conceptID: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.CONCEPT_ID,
                        WADDR_COUNTRYID: 1,
                        WADDR_DIRECTIONS: asAddress[0].description,
                        WADDR_DISTRICTID: 1021,// 1008
                        WADDR_DISTRICT_TEXT: "Default",
                        WADDR_MNUID: 4,
                        WADDR_PROVINCEID: 7,
                        WADDR_STATUS: 2,
                        WADDR_STREETID: 1,
                        WADDR_TYPE: 1,
                    }
                }

                let sdmAdd = await SDM.AddressSDME.createAddress(addressSdmData)
                let bin = asAddress[0].addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE ? Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY : Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                let asAddr = await this.updateAddress(headers, { addressId: asAddress[0].id, sdmAddressRef: parseInt(sdmAdd.ADDR_ID) }, bin, userData, false)
                if (asAddr.cmsAddressRef) {
                    kafkaService.kafkaSync({
                        set: this.set,
                        cms: {
                            update: true,
                            argv: JSON.stringify({
                                userData: userData,
                                headers: headers,
                                asAddress: [asAddr]
                            })
                        },
                        inQ: true
                    })
                }
                return {}
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_SDM)
        } catch (error) {
            consolelog(process.cwd(), "addAddressOnSdm", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method SDM
     * @description Add address on SDM
     * */
    async addAddressOnCms(userData: IUserRequest.IUserData, headers: ICommonRequest.IHeaders, asAddress: IAddressRequest.IAddress[]) {
        try {
            if (userData.cmsUserRef) {
                consolelog(process.cwd(), "going to add adddress on cms", JSON.stringify(asAddress), false)
                let res = await CMS.AddressCMSE.createAddresssOnCms(userData, asAddress)
                if (res && res.customerId) {
                    if (res.addressIds && res.addressIds.length > 0) {
                        for (const iterator of res.addressIds) {
                            if (iterator.id && iterator.addressId) {
                                let updateAddressOnAs: IAddressRequest.IUpdateAddress = {
                                    addressId: iterator.id,
                                    cmsAddressRef: parseInt(iterator.addressId),
                                }
                                let bin = ""
                                asAddress.forEach(obj => {
                                    if (obj.id == iterator.id)
                                        bin = obj.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE ? Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY : Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                                })
                                if (bin != "")
                                    await this.updateAddress(headers, updateAddressOnAs, bin, userData, false)
                            }
                        }
                    }
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                return {}
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_CMS)
        } catch (error) {
            consolelog(process.cwd(), "addAddressOnCms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDM
    * @description Add address on SDM
    * */
    async updateAddressOnCms(userData: IUserRequest.IUserData, headers: ICommonRequest.IHeaders, asAddress: IAddressRequest.IAddress[]) {
        try {
            if (userData.cmsUserRef) {
                consolelog(process.cwd(), "going to update adddress on cms", JSON.stringify(userData), false)
                let res = await CMS.AddressCMSE.updateAddresssOnCms(userData, headers, asAddress)
                return {}
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_NOT_CREATED_ON_CMS)
        } catch (error) {
            consolelog(process.cwd(), "updateAddressOnCms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createCmsAddOnAs(headers: ICommonRequest.IHeaders, userData: IUserRequest.IUserData, cmsAddress: IAddressCMSRequest.ICmsAddress[]) {
        try {
            for (const obj of cmsAddress) {
                if (obj.addressId && obj.sdmAddressRef) {
                    if (obj.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE) {
                        let store = await this.validateCoordinate(parseFloat(obj.latitude), parseFloat(obj.longitude), Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY)
                        if (store && store.id) {
                            let add: IAddressRequest.IRegisterAddress = {
                                addressType: obj.addressType,
                                addressSubType: obj.addressSubType,
                                lat: parseFloat(obj.latitude),
                                lng: parseFloat(obj.longitude),
                                bldgName: obj.bldgName,
                                description: obj.description,
                                flatNum: obj.flatNum,
                                tag: obj.addTag,
                                sdmAddressRef: obj.sdmAddressRef ? parseInt(obj.sdmAddressRef) : 0,
                                cmsAddressRef: parseInt(obj.addressId),
                            }
                            let asAdd = await this.addAddress(headers, userData, add, store)
                            if (obj.sdmAddressRef && obj.sdmAddressRef == "0" && userData.sdmCorpRef != 0) {
                                kafkaService.kafkaSync({
                                    set: this.set,
                                    sdm: {
                                        create: true,
                                        argv: JSON.stringify({
                                            userData: userData,
                                            headers: headers,
                                            asAddress: [asAdd]
                                        })
                                    },
                                    inQ: true
                                })
                            }
                        }
                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createCmsAddOnAs", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createSdmAddOnCmsAndAs(headers: ICommonRequest.IHeaders, userData: IUserRequest.IUserData, sdmAddress) {
        try {
            let asAddress = [];
            for (const sdmAddObj of sdmAddress) {
                if (sdmAddObj.WADDR_STATUS && sdmAddObj.WADDR_STATUS == '1') {
                    if (sdmAddObj.ADDR_MAPCODE.X && sdmAddObj.ADDR_MAPCODE.Y) {
                        let store: IStoreGrpcRequest.IStore
                        store = await this.validateCoordinate(parseFloat(sdmAddObj.ADDR_MAPCODE.X), parseFloat(sdmAddObj.ADDR_MAPCODE.Y), Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY)
                        if (store && store.id) {
                            let addressPayload: IAddressRequest.IRegisterAddress = {
                                addressType: Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE,
                                addressSubType: Constant.DATABASE.TYPE.ADDRESS.DELIVERY.SUBTYPE.DELIVERY,
                                lat: parseFloat(sdmAddObj.ADDR_MAPCODE.X),
                                lng: parseFloat(sdmAddObj.ADDR_MAPCODE.Y),
                                bldgName: sdmAddObj.ADDR_BLDGNAME,
                                description: sdmAddObj.ADDR_DESC,
                                flatNum: sdmAddObj.ADDR_FLATNUM,
                                tag: Constant.DATABASE.TYPE.TAG.OTHER,
                                sdmAddressRef: parseInt(sdmAddObj.ADDR_ID)
                            }
                            let addressData = await this.addAddress(headers, userData, addressPayload, store)
                            asAddress.push(addressData)
                        }
                    }
                }
            }
            if (asAddress && asAddress.length > 0) {
                if (userData && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST) {
                    kafkaService.kafkaSync({
                        set: this.set,
                        cms: {
                            create: true,
                            argv: JSON.stringify({
                                userData: userData,
                                headers: headers,
                                asAddress: asAddress
                            })
                        },
                        inQ: true
                    })
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createSdmAddOnCmsAndAs", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const AddressE = new AddressEntity()
