'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from '../base.entity'
import * as Constant from '../../constant'
import { consolelog, generateRandomString } from '../../utils'
import { Aerospike } from '../../aerospike'
const aerospike = require('aerospike');

export class SyncStoreEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.SYNC_STORE)
    }

    /** gets the list */
    async getList() {
        return Aerospike.scan({ set: this.set });
    }
}

export const SyncStoreE = new SyncStoreEntity();
