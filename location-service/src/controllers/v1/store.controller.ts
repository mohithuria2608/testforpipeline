import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog, checkOnlineStore } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import * as Utils from "../../utils";
import { Aerospike } from '../../aerospike'

export class StoreController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk store data
     * */
    async bootstrapStore() {
        try {
            let jsonPostfix = config.get("sdm.type")
            consolelog(process.cwd(), "store jsonPostfix", jsonPostfix, true)
            await Aerospike.truncate({ set: ENTITY.StoreE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + `/../../../model/store_${jsonPostfix}.json`, 'utf-8');
            let stores = JSON.parse(rawdata);
            for (const store of stores) {
                await ENTITY.StoreE.bootstrapStore(store)
            }
            return stores
        } catch (error) {
            consolelog(process.cwd(), "bootstrapStore", JSON.stringify(error), false)
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
                set: ENTITY.StoreE.set,
                background: false,
            }
            let store: IStoreRequest.IStore[] = await Aerospike.query(queryArg)
            if (store && store.length > 0) {
                store[0]['isOnline'] = checkOnlineStore(store[0].startTime, store[0].endTime)
                return store[0]
            } else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "fetchStore", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {number=} lat : latitude
     * @param {number=} lng : longitude
     * */
    async validateCoords(payload: IStoreRequest.IValidateCoordinates): Promise<IStoreRequest.IStore> {
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
            if (res && res.length > 0) {
                res[0]['isOnline'] = checkOnlineStore(res[0].startTime, res[0].endTime)
                return res[0]
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "validateCoords", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * syncs stores from CMS to Aerospike
     */
    async syncStores(payload): Promise<any> {
        try {
            let storesList = JSON.parse(payload.as.argv);
            for (let store of storesList.data) {
                await ENTITY.StoreE.postStores(store);
            }
            return {};
        } catch (error) {
            consolelog(process.cwd(), "syncStores", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /** post on CMS */
    async postOnCMS() {
        let storesData = await ENTITY.SyncStoreE.getList();
        await Utils.sendRequestToCMS('SYNC_STORE', storesData);
    }

    /** sync to aerospike */
    async syncToAS(payload) {
        try {
            for (let store of payload) {
                if (store.geoFence && store.geoFence.length) {
                    for (let fence of store.geoFence) {
                        let storeData = { ...store, ...fence };
                        storeData.geoFence = ENTITY.StoreE.createGeoFence(storeData.latitude, storeData.longitude);
                        delete storeData.latitude; delete storeData.longitude;
                        await ENTITY.StoreE.syncStoreData(storeData);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const storeController = new StoreController();