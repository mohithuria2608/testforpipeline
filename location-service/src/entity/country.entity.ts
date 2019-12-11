'use strict';
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class CountryEntity extends BaseEntity {
    protected set: SetNames;
    constructor() {
        super('country')
    }

    async postCountry(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog("postCountry", error, false)
            return Promise.reject(error)
        }
    }
}

export const CountryE = new CountryEntity()
