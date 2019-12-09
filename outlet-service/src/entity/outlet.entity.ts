'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class OutletEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    protected set: SetNames;
    constructor() {
        super('outlet')
    }

}

export const OutletE = new OutletEntity()
