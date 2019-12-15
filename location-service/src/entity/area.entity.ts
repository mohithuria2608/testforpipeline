'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class AreaEntity extends BaseEntity {
    protected set: SetNames;
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'areaId',
            index: 'idx_' + this.set + '_' + 'areaId',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'storeId',
            index: 'idx_' + this.set + '_' + 'storeId',
            type: "NUMERIC"
        }
    ]
    constructor() {
        super('area')
    }

    public areaSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        areaId: Joi.number().required().description("sk NUMERIC"),
        storeId: Joi.number().required().description("sk NUMERIC"),
        countryId: Joi.number().required(),
        cityId: Joi.number().required(),
        provinceId: Joi.number().required(),
        streetId: Joi.number().required(),
        districtId: Joi.number().required(),
        name_en: Joi.string().trim().required(),
        name_ar: Joi.string().trim().required()
    });

    async postArea(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog(process.cwd(),"postArea", error, false)
            return Promise.reject(error)
        }
    }

    // async getAreaByStoreId(data: IAreaGrpcRequest.IGetAreaByStoreIdData) {
    //     try {
    //         let queryArg: IAerospike.Query = {
    //             equal: {
    //                 bin: "storeId",
    //                 value: data.storeId
    //             },
    //             set: this.set,
    //             background: false,
    //         }
    //         let area: IAreaRequest.IArea = await Aerospike.query(queryArg)
    //         return area[0]
    //     } catch (error) {
    //         consolelog(process.cwd(),"getAreaByStoreId", error, false)
    //         return Promise.reject(error)
    //     }
    // }
}

export const AreaE = new AreaEntity()
