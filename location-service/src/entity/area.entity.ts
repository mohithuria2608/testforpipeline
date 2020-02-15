'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class AreaEntity extends BaseEntity {
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
        super(Constant.SET_NAME.AREA)
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

    async bootstrapArea(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            return {}
        }
    }
}

export const AreaE = new AreaEntity()
