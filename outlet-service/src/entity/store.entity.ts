'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class StoreEntity extends BaseEntity {
    protected set: SetNames;
    constructor() {
        super('store')
    }

    async postStore(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog("postStore", error, false)
            return Promise.reject(error)
        }
    }
}

export const StoreE = new StoreEntity()
