'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, generateRandomString } from '../utils'
import { Aerospike } from '../aerospike'
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
        super(Constant.SET_NAME.STORE)
    }

    public storeSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        storeId: Joi.number().required().description("sk NUMERIC"),
        countryId: Joi.number().required(),
        provinceId: Joi.number().required(),
        areaId: Joi.number().required(),
        streetId: Joi.number().required(),
        districtId: Joi.number().required(),
        mapId: Joi.number().required(),
        menuId: Joi.number().required().description("sk NUMERIC"),
        name_en: Joi.string().trim().required(),
        name_ar: Joi.string().trim().required(),
        phone1: Joi.string().trim().required(),
        phone2: Joi.string().trim().required(),
        services: Joi.object().keys({
            din: Joi.number(),
            del: Joi.number(),
            tak: Joi.number(),
        }),
        active: Joi.number().required(),
        location: Joi.object().keys({
            description: Joi.string(),
            latitude: Joi.number(),
            longitude: Joi.number(),
        }),
        address_en: Joi.string(),
        address_ar: Joi.string(),
        startTime: Joi.string(),
        endTime: Joi.string(),
        geoFence: Joi.object().keys({
            type: Joi.string().valid('Polygon'),
            coordinates: Joi.array().items(Joi.array().items(Joi.number()))
        })
    });

    async bootstrapStore(data) {
        try {
            let GeoJSON = aerospike.GeoJSON;
            data['geoFence'] = new GeoJSON(data['geoFence'])
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

export const StoreE = new StoreEntity()
