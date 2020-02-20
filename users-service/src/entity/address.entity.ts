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
        lat: Joi.number().required(),
        lng: Joi.number().required(),
        bldgName: Joi.string(),
        flatNum: Joi.string(),
        tag: Joi.string().valid(
            Constant.DATABASE.TYPE.TAG.HOME,
            Constant.DATABASE.TYPE.TAG.OFFICE,
            Constant.DATABASE.TYPE.TAG.HOTEL,
            Constant.DATABASE.TYPE.TAG.OTHER),
        addressType: Joi.string().valid(
            Constant.DATABASE.TYPE.ADDRESS.PICKUP,
            Constant.DATABASE.TYPE.ADDRESS.DELIVERY),
        createdAt: Joi.number().required(),
        updatedAt: Joi.number().required(),
        /**
         * @usage : Reference
         */
        sdmAddressRef: Joi.number(),
        cmsAddressRef: Joi.number(),
        sdmStoreRef: Joi.number().required(),
        sdmCountryRef: Joi.number().required(),
        sdmAreaRef: Joi.number().required(),
        sdmCityRef: Joi.number().required(),
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
    async addAddress(userData: IUserRequest.IUserData, bin: string, addressData: IAddressRequest.IRegisterAddress, store: IStoreGrpcRequest.IStore) {
        try {
            const id = addressData.addressId ? addressData.addressId : this.ObjectId().toString();
            let deliveryAddress = {
                id: id,
                lat: addressData.lat,
                lng: addressData.lng,
                bldgName: addressData.bldgName,
                description: addressData.description,
                flatNum: addressData.flatNum,
                tag: addressData.tag,
                addressType: Constant.DATABASE.TYPE.ADDRESS.DELIVERY,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                sdmAddressRef: 0,// (sdmAddress && sdmAddress['ADDR_ID']) ? parseInt(sdmAddress['ADDR_ID']) : 0,
                cmsAddressRef: 0,
                sdmCountryRef: 1, //store.countryId
                sdmStoreRef: 1219,// store.storeId
                sdmAreaRef: 16,// store.areaId
                sdmCityRef: 17,// store.cityId
            };
            consolelog(process.cwd(), "deliveryAddress", JSON.stringify(deliveryAddress), false)

            if (bin == Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY) {
                let listAppendArg: IAerospike.ListOperation = {
                    order: true,
                    bins: deliveryAddress,
                    set: this.set,
                    key: userData.id,
                    bin: bin,
                    append: true
                }
                await Aerospike.listOperations(listAppendArg)
            } else {
                deliveryAddress['addressType'] = Constant.DATABASE.TYPE.ADDRESS.PICKUP
                let dataToUpdate = {
                    pickup: [deliveryAddress]
                }
                let oldAdd: IAddressRequest.IAddress[] = await this.getAddress({ userId: userData.id, bin: Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP })
                if (oldAdd && oldAdd.length > 0) {
                    if (deliveryAddress.sdmStoreRef == store.storeId) {
                        return oldAdd[0]
                    }
                }
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: this.set,
                    key: userData.id,
                    createOrReplace: true
                }
                consolelog(process.cwd(), "putArg", JSON.stringify(putArg), false)
                await Aerospike.put(putArg)
            }

            return deliveryAddress
        } catch (error) {
            consolelog(process.cwd(), "addAddress", JSON.stringify(error), false)
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
    async updateAddress(addressUpdate: IAddressRequest.IUpdateAddress, bin: string, userData: IUserRequest.IUserData, isDelete: boolean) {
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
            if (isDelete)
                return {}
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
    async addAddressOnSdm(userData: IUserRequest.IUserData) {
        try {
            consolelog(process.cwd(), "going to add adddress on sdm", JSON.stringify(userData.asAddress), false)
            let addressSdmData = {
                licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                language: "En",
                customerRegistrationID: userData.sdmCorpRef,
                address: {
                    ADDR_AREAID: 16,// 1786,
                    ADDR_BLDGNAME: userData.asAddress[0].bldgName,
                    ADDR_BLDGNUM: userData.asAddress[0].bldgName,
                    ADDR_CITYID: 17,
                    ADDR_CLASSID: -1,
                    ADDR_COUNTRYID: 1,
                    ADDR_CUSTID: userData.sdmUserRef,
                    ADDR_DESC: userData.asAddress[0].description,
                    ADDR_DISTRICTID: 1008,// 1021,
                    ADDR_FLATNUM: userData.asAddress[0].flatNum,
                    ADDR_FLOOR: userData.asAddress[0].flatNum,
                    ADDR_MAPCODE: {
                        X: userData.asAddress[0].lat,
                        Y: userData.asAddress[0].lng
                    },
                    ADDR_PHONEAREACODE: userData.phnNo.slice(0, 2),
                    ADDR_PHONECOUNTRYCODE: userData.cCode.replace('+', ''),
                    ADDR_PHONELOOKUP: userData.phnNo,
                    ADDR_PHONENUMBER: userData.phnNo.slice(2),
                    ADDR_PHONETYPE: 2,
                    ADDR_PROVINCEID: 7,
                    ADDR_SKETCH: userData.asAddress[0].description,
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
                    WADDR_AREAID: 16,// 1786,
                    WADDR_BUILD_NAME: userData.asAddress[0].bldgName,
                    WADDR_BUILD_NUM: userData.asAddress[0].bldgName,
                    WADDR_BUILD_TYPE: -1,
                    WADDR_CITYID: 17,
                    WADDR_conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                    WADDR_COUNTRYID: 1,
                    WADDR_DIRECTIONS: userData.asAddress[0].description,
                    WADDR_DISTRICTID: 1008,// 1021,
                    WADDR_DISTRICT_TEXT: "Default",
                    WADDR_MNUID: 4,
                    WADDR_PROVINCEID: 7,
                    WADDR_STATUS: 2,
                    WADDR_STREETID: 1,
                    WADDR_TYPE: 1,
                }
            }

            let sdmAdd = await SDM.AddressSDME.createAddress(addressSdmData)
            let bin = userData.asAddress[0].addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY ? Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY : Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
            let asAddr = await this.updateAddress({ addressId: userData.asAddress[0].id, sdmAddressRef: parseInt(sdmAdd.ADDR_ID) }, bin, userData, false)
            if (asAddr.cmsAddressRef) {
                userData.asAddress = [asAddr]
                kafkaService.kafkaSync({
                    set: this.set,
                    cms: {
                        update: true,
                        argv: JSON.stringify(userData)
                    }
                })
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "addAddressOnSdm", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDM
    * @description Add address on SDM
    * */
    async updateAddressOnSdm(userData: IUserRequest.IUserData) {
        try {
            consolelog(process.cwd(), "going to update adddress on sdm", JSON.stringify(userData.asAddress), false)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "updateAddressOnSdm", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method SDM
     * @description Add address on SDM
     * */
    async addAddressOnCms(userData: IUserRequest.IUserData) {
        try {
            consolelog(process.cwd(), "going to add adddress on cms", JSON.stringify(userData.asAddress), false)
            let res = await CMS.AddressCMSE.createAddresssOnCms(userData)
            if (res && res.customer_id) {
                if (res.address_ids && res.address_ids.length > 0) {
                    for (const iterator of res.address_ids) {
                        let updateAddressOnAs: IAddressRequest.IUpdateAddress = {
                            addressId: iterator.id,
                            cmsAddressRef: parseInt(iterator.address_id),
                        }
                        let bin = ""
                        userData.asAddress.forEach(obj => {
                            if (obj.id == iterator.id)
                                bin = obj.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY ? Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY : Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
                        })
                        if (bin != "")
                            await this.updateAddress(updateAddressOnAs, bin, userData, false)
                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "addAddressOnCms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDM
    * @description Add address on SDM
    * */
    async updateAddressOnCms(userData: IUserRequest.IUserData) {
        try {
            consolelog(process.cwd(), "going to update adddress on cms", JSON.stringify(userData.asAddress), false)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "updateAddressOnCms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const AddressE = new AddressEntity()
