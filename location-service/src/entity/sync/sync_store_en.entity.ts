'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from '../base.entity'
import * as Constant from '../../constant'
import { consolelog, generateRandomString } from '../../utils'
import { Aerospike } from '../../aerospike'
const aerospike = require('aerospike');

export class StoreEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'menuId',
            index: 'idx_' + this.set + '_' + 'menuId',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'storeId',
            index: 'idx_' + this.set + '_' + 'storeId',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'geoFence',
            index: 'idx_' + this.set + '_' + 'geoFence',
            type: "GEO2DSPHERE"
        }
    ]
    constructor() {
        super(Constant.SET_NAME.SYNC_STORE_EN)
    }


    /** posts the stores in aerospike database */
    async postStores(data) {
        let langWiseStore = this.storeForLang(data);
        for (let store of langWiseStore) {
            let putArg: IAerospike.Put = {
                bins: store,
                set: this.set,
                key: store._id,
                createOrReplace: true,
            }
            await Aerospike.put(putArg);
        }
        return {};
    }

    /* generates stores data for language */
    storeForLang(data) {
        let storeDataEn: any = { _id: generateRandomString(16), lang: Constant.DATABASE.LANGUAGE.EN, name: data.name_en, address: data.address_en };
        let storeDataAr: any = { _id: generateRandomString(16), lang: Constant.DATABASE.LANGUAGE.AR, name: data.name_ar, address: data.address_ar };
        delete data.name_en; delete data.name_ar;
        delete data.address_en; delete data.address_ar;
        storeDataEn = Object.assign(storeDataEn, data);
        storeDataAr = Object.assign(storeDataAr, data);
        return [storeDataEn, storeDataAr];
    }
}

export const StoreE = new StoreEntity()
