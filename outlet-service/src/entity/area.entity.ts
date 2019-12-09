'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class AreaEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    protected set: SetNames;
    constructor() {
        super('area')
    }

    async postArea(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog("postArea", error, false)
            return Promise.reject(error)
        }
    }

    async getArea() {
        try {
            return await Aerospike.scan(this.set)
        } catch (error) {
            consolelog("getArea", error, false)
            return Promise.reject(error)
        }
    }
}

export const AreaE = new AreaEntity()
