'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class PickupEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    protected set: SetNames;
    constructor() {
        super('pickup')
    }

    async postPickup(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog("postPickup", error, false)
            return Promise.reject(error)
        }
    }

    async getPickup() {
        try {
            return await Aerospike.scan(this.set)
        } catch (error) {
            consolelog("getPickup", error, false)
            return Promise.reject(error)
        }
    }
}

export const PickupE = new PickupEntity()
