'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'
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
        super('store')
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

    async postStore(data) {
        try {
            let GeoJSON = aerospike.GeoJSON;
            data['geoFence'] = new GeoJSON(data['geoFence'])
            consolelog(process.cwd(), "id", data.id, true)
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }

            await Aerospike.put(putArg)
        } catch (error) {
            consolelog(process.cwd(), "postStore", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL/GRPC
    * @param {string} storeId : sdm store id
    * */
    async fetchStore(payload: IStoreRequest.IFetchStore) {
        try {
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "storeId",
                    value: payload.storeId
                },
                set: this.set,
                background: false,
            }
            let store: IStoreRequest.IStore[] = await Aerospike.query(queryArg)
            if (store && store.length > 0) {
                return store[0]
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.STORE_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "fetchStore", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {number=} lat : latitude
     * @param {number=} lng : longitude
     * */
    async validateCoords(payload: IStoreRequest.IValidateCoordinates): Promise<IStoreRequest.IStore[]> {
        try {
            let geoWithinArg: IAerospike.Query = {
                set: this.set,
                geoWithin: {
                    bin: 'geoFence',
                    lat: parseFloat(payload.lat.toString()),
                    lng: parseFloat(payload.lng.toString()),
                }
            }
            let res = await Aerospike.query(geoWithinArg)
            return res
        } catch (error) {
            consolelog(process.cwd(), "validateCoords", error, false)
            return Promise.reject(error)
        }
    }
}

export const StoreE = new StoreEntity()
