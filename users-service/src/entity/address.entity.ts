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
        flatNum: Joi.number(),
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
        createdBy: Joi.string(),
        updatedBy: Joi.string()
    })

    /**
    * @method INTERNAL
    * @param {string} id : user id
    * */
    async getById(payload: IUserRequest.IId) {
        try {
            consolelog(process.cwd(), "getById", payload.id, true)
            let getArg: IAerospike.Get = {
                set: this.set,
                key: payload.id
            }
            let user: IUserRequest.IUserData = await Aerospike.get(getArg)
            if (user && user.id) {
                return user
            } else
                return Promise.reject(Constant.STATUS_MSG.SUCCESS.S204.USER_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getById", error, false)
            return Promise.reject(error)
        }
    }

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
            };
            let putArg: IAerospike.Put = {
                bins: address,
                set: this.set,
                key: address.id,
                create: true,
            }
            await Aerospike.put(putArg)
            return await this.getById({ id: address.id })
        } catch (err) {
            consolelog(process.cwd(), "addAddress", err, false)
            return Promise.reject(err)
        }
    }

    async updateAddress(addressUpdate: IAddressRequest.IUpdateAddress): Promise<IUserRequest.IUserData> {
        try {
            let bins = {};
            if (addressUpdate.bldgName)
                bins['bldgName'] = addressUpdate.bldgName
            if (addressUpdate.description)
                bins['description'] = addressUpdate.description
            if (addressUpdate.flatNum)
                bins['flatNum'] = addressUpdate.flatNum
            if (addressUpdate.tag)
                bins['tag'] = addressUpdate.tag
            let putArg: IAerospike.Put = {
                bins: bins,
                set: this.set,
                key: addressUpdate.addressId,
                update: true,
            }
            await Aerospike.put(putArg)
            return await this.getById({ id: addressUpdate.addressId })
        } catch (err) {
            consolelog(process.cwd(), "updateAddress", err, false)
            return Promise.reject(err)
        }
    }
}

export const AddressE = new AddressEntity()
