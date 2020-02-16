'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'
import * as SDM from '../sdm';

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
            let sdmAddress = {}
            if (userData && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                sdmAddress = await this.addAddressOnSdm(userData, bin, addressData, store)
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
                sdmAddressRef: (sdmAddress && sdmAddress['ADDR_ID']) ? parseInt(sdmAddress['ADDR_ID']) : 0,
                cmsAddressRef: 0,
                sdmStoreRef: store.storeId
            };
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
                let oldAdd: IAddressRequest.IAddressModel[] = await this.getAddress({ userId: userData.id, bin: Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP })
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
            let index = listaddress.findIndex(x => x.id === addressUpdate.addressId);
            if (index < 0) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ADDRESS_NOT_FOUND)
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
    async addAddressOnSdm(userData: IUserRequest.IUserData, bin: string, addressData: IAddressRequest.IRegisterAddress, store: IStoreGrpcRequest.IStore) {
        try {
            let addressSdmData = {
                licenseCode: "AmericanaWeb",
                language: "En",
                customerRegistrationID: 7694143,
                address: {
                    ADDR_AREAID: 1786,//16,
                    ADDR_BLDGNAME: addressData.bldgName, //"Al Quoz Comm",
                    ADDR_BLDGNUM: addressData.bldgName,
                    ADDR_CITYID: 17,
                    ADDR_CLASSID: -1,
                    ADDR_COUNTRYID: 1,
                    ADDR_CUSTID: 7694143, //?
                    ADDR_DESC: addressData.description,
                    ADDR_DISTRICTID: 1008,
                    ADDR_FLATNUM: addressData.flatNum,
                    ADDR_FLOOR: addressData.flatNum,
                    ADDR_MAPCODE: {
                        X: addressData.lat,
                        Y: addressData.lng
                    },
                    ADDR_PHONEAREACODE: userData.phnNo.slice(0, 2),
                    ADDR_PHONECOUNTRYCODE: userData.cCode.replace('+', ''),
                    ADDR_PHONELOOKUP: userData.phnNo,
                    ADDR_PHONENUMBER: userData.phnNo.slice(2),
                    ADDR_PHONETYPE: 2,
                    ADDR_PROVINCEID: 7,
                    ADDR_SKETCH: addressData.description,
                    ADDR_STREETID: 1,
                    Phones: {
                        CC_CUSTOMER_PHONE: {
                            PHONE_AREACODE: userData.phnNo.slice(0, 2),
                            PHONE_COUNTRYCODE: userData.cCode.replace('+', ''),
                            PHONE_CUSTID: 7694143,
                            PHONE_ISDEFAULT: 84,
                            PHONE_LOOKUP: userData.phnNo,
                            PHONE_NUMBER: userData.phnNo.slice(2),
                            PHONE_TYPE: 2,
                        }
                    },
                    WADDR_AREAID: 1786,// 16,
                    WADDR_BUILD_NAME: addressData.bldgName,
                    WADDR_BUILD_NUM: addressData.bldgName,
                    WADDR_BUILD_TYPE: -1,
                    WADDR_CITYID: 17,
                    WADDR_CONCEPTID: 3,
                    WADDR_COUNTRYID: 1,
                    WADDR_DIRECTIONS: addressData.description,
                    WADDR_DISTRICTID: 1008,
                    WADDR_DISTRICT_TEXT: "Default",
                    WADDR_MNUID: 4,
                    WADDR_PROVINCEID: 7,
                    WADDR_STATUS: 2,
                    WADDR_STREETID: 1,
                    WADDR_TYPE: 1,
                }
            }
            return await SDM.AddressSDME.createAddress(addressSdmData)
        } catch (error) {
            consolelog(process.cwd(), "addAddressOnSdm", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const AddressE = new AddressEntity()
