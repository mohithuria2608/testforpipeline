'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
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

export const AreaE = new AreaEntity()
