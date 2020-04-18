'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
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
                createOrReplace: true,
            }
            return Aerospike.put(putArg)
        } catch (error) {
            return {}
        }
    }
}

export const CityE = new CityEntity()
