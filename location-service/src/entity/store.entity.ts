'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
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

    async saveStore(data) {
        try {
            let GeoJSON = aerospike.GeoJSON;
            if (data.location) {
                if (data.location.latitude && data.location.latitude != "")
                    data.location.latitude = parseFloat(data.location.latitude)
                else
                    data.location.latitude = 0
                if (data.location.longitude && data.location.longitude != "")
                    data.location.longitude = parseFloat(data.location.longitude)
                else
                    data.location.longitude = 0
            }
            data['geoFence'] = new GeoJSON(data['geoFence'])
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.storeIdAs,
                createOrReplace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "data.storeId", data.storeId, false)
            consolelog(process.cwd(), "data.mapId", data.mapId, false)
            consolelog(process.cwd(), "error", error, false)
            return {}
        }
    }

    async getAllStores() {
        try {
            return Aerospike.scan({ set: this.set });
        } catch (err) {
            consolelog(process.cwd(), "error", err, false)
        }
    }

    createGeoFence(lats, longs) {
        let coords: any = [];
        lats = lats.split(',');
        longs = longs.split(',');
        for (let i = 0; i < lats.length; i++) {
            coords.push([parseFloat(longs[i]), parseFloat(lats[i])]);
        }
        coords.push(coords[0]);
        return {
            type: 'Polygon',
            coordinates: [coords]
        }
    }
}

export const StoreE = new StoreEntity()
