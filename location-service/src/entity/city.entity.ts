'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class CityEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'cityId',
            index: 'idx_' + this.set + '_' + 'cityId',
            type: "NUMERIC"
        }
    ]
    constructor() {
        super(Constant.SET_NAME.CITY)
    }
    
    public citySchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        cityId: Joi.number().required().description("sk NUMERIC"),
        countryId: Joi.number().required(),
        name_en: Joi.string().trim().required(),
        name_ar: Joi.string().trim().required()
    });

    async bootstrapCity(data) {
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

    async saveData(data) {
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

export const CityE = new CityEntity()
