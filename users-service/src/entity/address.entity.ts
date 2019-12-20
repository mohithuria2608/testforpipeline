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
            let getArg: IAerospike.Get = {
                set: this.set,
                key: payload.id,
                bins: bins
            }
            let user: IUserRequest.IUserData = await Aerospike.get(getArg)
            if (user && user.id) {
                return user
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.USER_NOT_FOUND)
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
            };
            let putArg: IAerospike.Put = {
                bins: address,
                set: this.set,
                key: address.id,
                create: true,
            }
            await Aerospike.put(putArg)
            return await this.getById({ id: address.id }, ["id", "lat", "lng", "bldgName", "description", "flatNum", "tag", "isActive"])
        } catch (err) {
            consolelog(process.cwd(), "addAddress", err, false)
            return Promise.reject(err)
        }
    }

    async updateAddress(addressUpdate: IAddressRequest.IUpdateAddress, returnRes: boolean) {
        try {
            let bins = {};
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
            let putArg: IAerospike.Put = {
                bins: bins,
                set: this.set,
                key: addressUpdate.addressId,
                update: true,
            }
            await Aerospike.put(putArg)
            if (returnRes)
                return await this.getById({ id: addressUpdate.addressId }, ["id", "lat", "lng", "bldgName", "description", "flatNum", "tag", "isActive"])
            else
                return {}
        } catch (err) {
            consolelog(process.cwd(), "updateAddress", err, false)
            return Promise.reject(err)
        }
    }
}

export const AddressE = new AddressEntity()
