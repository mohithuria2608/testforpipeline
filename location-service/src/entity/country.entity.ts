'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
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

export const CountryE = new CountryEntity()
