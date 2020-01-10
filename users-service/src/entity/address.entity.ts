'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class AddressEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    constructor() {
        super('address')
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
        pickup: Joi.array().items(this.subSddressSchema)
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
            consolelog(process.cwd(), "getAddress", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * */
    async addAddress(userData: IUserRequest.IUserData, bin: string, addressData: IAddressRequest.IRegisterAddress, store: IStoreGrpcRequest.IStore): Promise<IUserRequest.IUserData> {
        try {
            let id = this.uuidv1();
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
                sdmAddressRef: 0,
                cmsAddressRef: 0,
                sdmStoreRef: store.storeId
            };
            let listAppendArg: IAerospike.ListOperation = {
                order: true,
                bins: deliveryAddress,
                set: this.set,
                key: userData.id,
                bin: bin,
                append: true
            }
            await Aerospike.listOperations(listAppendArg)
            let listDeliveryAddress = await this.getAddress({ userId: userData.id, bin: bin })

            if (listDeliveryAddress && listDeliveryAddress.length > 6) {
                let listRemoveByIndexArg: IAerospike.ListOperation = {
                    order: true,
                    set: this.set,
                    key: userData.id,
                    bin: bin,
                    remByIndex: true,
                    index: 0
                }
                await Aerospike.listOperations(listRemoveByIndexArg)
                listDeliveryAddress = listDeliveryAddress.slice(1)
            }
            return listDeliveryAddress
        } catch (err) {
            consolelog(process.cwd(), "addAddress", err, false)
            return Promise.reject(err)
        }
    }

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
        } catch (err) {
            consolelog(process.cwd(), "updateAddress", err, false)
            return Promise.reject(err)
        }
    }
}

export const AddressE = new AddressEntity()
