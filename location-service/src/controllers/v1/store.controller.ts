import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import { Aerospike } from '../../aerospike'

export class StoreController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk store data
     * */
    async bootstrapStore() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/store.json', 'utf-8');
            let stores = JSON.parse(rawdata);
            for (const store of stores) {
                await ENTITY.StoreE.bootstrapStore(store)
            }
            return stores
        } catch (err) {
            consolelog(process.cwd(), "bootstrapStore", err, false)
            return Promise.reject(err)
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
                set: ENTITY.StoreE.set,
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
                set: ENTITY.StoreE.set,
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

export const storeController = new StoreController();
