'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class AddressEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'userId',
            index: 'idx_' + this.set + '_' + 'userId',
            type: "STRING"
        },
    ]
    constructor() {
        super('address')
    }


    public addressSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
        areaId: Joi.number().required(),
        bldgName: Joi.string(),
        bldgNameUn: Joi.string(),
        bldgNum: Joi.string(),
        cityId: Joi.number().required(),
        classId: Joi.number(),
        countryId: Joi.number().required(),
        userId: Joi.number().required(),
        description: Joi.string(),
        districtId: Joi.number().required(),
        flatNum: Joi.string(),
        floor: Joi.string(),
        language: Joi.string(),
        phoneAreaCode: Joi.string(),
        phoneLookup: Joi.string(),
        phoneNumber: Joi.string().required(),
        phoneType: Joi.number(),
        postalCode: Joi.string().required(),
        provinceCode: Joi.number().required(),
        sketch: Joi.string(),
        streetId: Joi.number(),
        useMap: Joi.number(),
        createdAt: Joi.number().required(),
        updatedAt: Joi.number().required(),
        isActive: Joi.number().valid(0, 1),
        createdBy: Joi.string(),
        updatedBy: Joi.string()
    })

    /**
    * @method INTERNAL
    * @param {string} id : user id
    * */
    async getById(payload: IUserRequest.IId, bins: string[]) {
        try {
            consolelog(process.cwd(), "getById", payload.id, true)
            let listGetArg: IAerospike.ListOperation = {
                order: true,
                set: 'address',
                key: payload.id,
                bin: "address",
                getByIndexRange: true,
                index: 0
            }
            let listaddress = await Aerospike.listOperations(listGetArg)
            if (listaddress && listaddress.bins && listaddress.bins['address'] && listaddress.bins['address'].length > 0) {
                return listaddress.bins['address']
            } else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getById", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * */
    async addAddress(
        deviceid: string,
        userData: IUserRequest.IUserData,
        addressData: IAddressRequest.IRegisterAddress,
        store: IStoreGrpcRequest.IStore
    ): Promise<IUserRequest.IUserData> {
        try {
            let id = this.uuidv1();
            let address = {
                id: id,
                lat: addressData.lat,
                lng: addressData.lng,
                bldgName: addressData.bldgName,
                description: addressData.description,
                flatNum: addressData.flatNum,
                tag: addressData.tag,

                //@description = from userData
                phoneAreaCode: userData.cCode,
                phoneLookup: userData.phnNo,
                phoneNumber: userData.phnNo,
                userId: userData.id,
                isActive: 1,

                //@description = from session
                language: "En",// userData.session[deviceid].language,

                //@description = from store
                areaId: store.areaId,
                cityId: 19,
                countryId: store.countryId,
                districtId: store.districtId,
                provinceCode: store.provinceId,
                streetId: store.streetId,

                //@description = default values
                classId: -1,
                bldgNameUn: addressData.bldgName,
                bldgNum: addressData.bldgName,
                floor: addressData.bldgName,
                phoneType: 'Mobile',
                postalCode: addressData.bldgName,
                sketch: addressData.bldgName,
                useMap: 1,
                createdBy: 'APP',
                updatedBy: 'APP',
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
            };
            let listAppendArg: IAerospike.ListOperation = {
                order: true,
                bins: address,
                set: this.set,
                key: userData.id,
                bin: "address",
                append: true
            }
            await Aerospike.listOperations(listAppendArg)
            let listaddress = await this.getById({ id: userData.id }, [])
            consolelog(process.cwd(), "listaddress.length", listaddress.length, false)

            if (listaddress && listaddress.length > 6) {
                let listRemoveByIndexArg: IAerospike.ListOperation = {
                    order: true,
                    set: this.set,
                    key: userData.id,
                    bin: "address",
                    remByIndex: true,
                    index: 0
                }
                await Aerospike.listOperations(listRemoveByIndexArg)
                listaddress = listaddress.slice(1)
            }
            return listaddress
        } catch (err) {
            consolelog(process.cwd(), "addAddress", err, false)
            return Promise.reject(err)
        }
    }

    async updateAddress(addressUpdate: IAddressRequest.IUpdateAddress, returnRes: boolean, userData: IUserRequest.IUserData) {
        try {
            let listaddress = await this.getById({ id: userData.id }, [])
            let index = listaddress.findIndex(x => x.id === addressUpdate.addressId);
            if (index < 0) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ADDRESS_NOT_FOUND)
            }
            let listRemoveByIndexArg: IAerospike.ListOperation = {
                order: true,
                set: this.set,
                key: userData.id,
                bin: "address",
                remByIndex: true,
                index: index
            }
            await Aerospike.listOperations(listRemoveByIndexArg)
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
            if (addressUpdate.isActive != undefined)
                bins['isActive'] = addressUpdate.isActive

            bins['updatedAt'] = new Date().getTime()
            let listAppendArg: IAerospike.ListOperation = {
                order: true,
                bins: bins,
                set: this.set,
                key: userData.id,
                bin: "address",
                append: true
            }
            await Aerospike.listOperations(listAppendArg)
            return bins
        } catch (err) {
            consolelog(process.cwd(), "updateAddress", err, false)
            return Promise.reject(err)
        }
    }
}

export const AddressE = new AddressEntity()
