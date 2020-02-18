'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class CountryEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'countryId',
            index: 'idx_' + this.set + '_' + 'countryId',
            type: "NUMERIC"
        }
    ]
    constructor() {
        super(Constant.SET_NAME.COUNTRY)
    }

    public countrySchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        countryId: Joi.number().required().description("sk NUMERIC"),
        name_en: Joi.string().trim().required(),
        name_ar: Joi.string().trim().required()
    });

    async bootstrapCountry(data) {
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

export const CountryE = new CountryEntity()
