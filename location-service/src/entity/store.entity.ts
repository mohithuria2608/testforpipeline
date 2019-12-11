'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'
const aerospike = require('aerospike');

export class StoreEntity extends BaseEntity {
    protected set: SetNames;
    constructor() {
        super('store')
    }

    async post(data) {
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
        } catch (error) {
            consolelog("postStore", error, false)
            return Promise.reject(error)
        }
    }


    /**
     * @method GRPC
     * @param {number=} lat : latitude
     * @param {number=} lng : longitude
     * */
    async validateCoords(payload: IStoreRequest.IValidateCoordinates) {
        try {
            let geoWithinArg: IAerospike.Query = {
                set: this.set,
                geoWithin: {
                    key: 'geoFence',
                    lat: parseFloat(payload.lat.toString()),
                    lng: parseFloat(payload.lng.toString()),
                }
            }
            let res = await Aerospike.query(geoWithinArg)
            console.log("res", res)
            if (res && res.length > 0) {
                return res
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.STORE_NOT_FOUND)
        } catch (error) {
            consolelog("validateCoords", error, false)
            return Promise.reject(error)
        }
    }
}

export const StoreE = new StoreEntity()
