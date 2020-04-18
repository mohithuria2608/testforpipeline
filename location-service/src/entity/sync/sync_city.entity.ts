'use strict';
import { BaseEntity } from '../base.entity'
import * as Constant from '../../constant'
import { Aerospike } from '../../aerospike'

export class CityEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'countryId',
            index: 'idx_' + this.set + '_' + 'countryId',
            type: "NUMERIC"
        }
    ]
    constructor() {
        super(Constant.SET_NAME.SYNC_CITY);
    }


    /** gets the cities list */
    async getList() {
        return Aerospike.scan({ set: this.set });
    }

}

export const SyncCityE = new CityEntity()
