'use strict';
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class CityEntity extends BaseEntity {
    protected set: SetNames;
    constructor() {
        super('city')
    }

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
            consolelog("postCity", error, false)
            return Promise.reject(error)
        }
    }
}

export const CityE = new CityEntity()
