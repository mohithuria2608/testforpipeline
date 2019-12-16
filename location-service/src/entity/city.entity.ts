'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class CityEntity extends BaseEntity {
    protected set: SetNames;
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'cityId',
            index: 'idx_' + this.set + '_' + 'cityId',
            type: "NUMERIC"
        }
    ]
    constructor() {
        super('city')
    }
    
    public citySchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        cityId: Joi.number().required().description("sk NUMERIC"),
        countryId: Joi.number().required(),
        name_en: Joi.string().trim().required(),
        name_ar: Joi.string().trim().required()
    });

    async postCity(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog(process.cwd(),"postCity", error, false)
            return Promise.reject(error)
        }
    }
}

export const CityE = new CityEntity()
