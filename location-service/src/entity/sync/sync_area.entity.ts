'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from '../base.entity'
import * as Constant from '../../constant'
import { consolelog, generateRandomString } from '../../utils'
import { Aerospike } from '../../aerospike'
const aerospike = require('aerospike');

export class AreaEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'countryId',
            index: 'idx_' + this.set + '_' + 'countryId',
            type: "NUMERIC"
        }
    ]
    constructor() {
        super(Constant.SET_NAME.SYNC_AREA);
    }


    /** gets the list */
    async getList() {
        return Aerospike.scan({ set: this.set });
    }

}

export const SyncAreaE = new AreaEntity()
