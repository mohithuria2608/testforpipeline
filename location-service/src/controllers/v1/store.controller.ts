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
    async bootstrapStore(sdmType?: string) {
        try {
            let jsonPostfix = sdmType ? sdmType : config.get("sdm.type")
            consolelog(process.cwd(), "store jsonPostfix", jsonPostfix, true)
            await Aerospike.truncate({ set: ENTITY.StoreE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + `/../../../model/store_${jsonPostfix}.json`, 'utf-8');
            let stores = JSON.parse(rawdata);
            for (const store of stores) {
                await ENTITY.StoreE.saveStore(store)
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
            if (store && store.length > 0 && store[0].active) {
                if (store[0]['services'][payload.serviceType]) {
                    store[0]['isOnline'] = checkOnlineStore(store[0].startTime, store[0].endTime, store[0].nextday)
                    return store[0]
                } else
                    return
            } else
                return
        } catch (error) {
            consolelog(process.cwd(), "fetchStore", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {number=} lat : latitude
     * @param {number=} lng : longitude
     * @param {number=} serviceType : din/del/tak
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
            let store = await Aerospike.query(geoWithinArg)
            if (store && store.length > 0 && store[0].active) {
                if (store[0]['services'][payload.serviceType]) {
                    store[0]['isOnline'] = checkOnlineStore(store[0].startTime, store[0].endTime, store[0].nextday)
                    return store[0]
                } else
                    return
            }
            else
                return
        } catch (error) {
            consolelog(process.cwd(), "validateCoords", JSON.stringify(error), false)
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
            await Aerospike.truncate({ set: ENTITY.StoreE.set, before_nanos: 0 });
            console.log("Number of stores synced -> ", payload.length);
            for (let store of payload) {
                store.menuTempId = 17; //@TODO -remove when it will come from CMS
                if (store.geoFence && store.geoFence.length) {
                    for (let fence of store.geoFence) {
                        let storeData = { ...store, ...fence };
                        storeData.geoFence = ENTITY.StoreE.createGeoFence(storeData.latitude, storeData.longitude);
                        delete storeData.latitude; delete storeData.longitude;
                        storeData.storeIdAs = storeData.storeId + "_" + storeData.areaId;
                        await ENTITY.StoreE.saveStore(storeData);
                    }
                } else {
                    store.storeIdAs = store.storeId + "_-1";
                    store.geoFence = { "type": "Polygon", "coordinates": [] };
                    await ENTITY.StoreE.saveStore(store);
                }
            }
        } catch (error) {
            consolelog(process.cwd(), "syncToAS", JSON.stringify(error), false)
            return Promise.reject(error);
        }
    }

    /**
     * @method GRPC
     * syncs location data from CMS
     */
    async syncStoreStatus(payload): Promise<any> {
        try {
            let storeStatusList = JSON.parse(payload.as.argv)['data'];
            let storesList = await ENTITY.StoreE.getAllStores();
            let storesToSyncWithCMS = [];
            let storesToSyncWithCMSHash = {};

            for (let store of storesList) {
                for (let i = 0; i < storeStatusList.length; i++) {
                    if (
                        store.storeId === storeStatusList[i].sdmStoreId
                        && store.active !== storeStatusList[i].active
                    ) {
                        store.active = storeStatusList[i].active;
                        await ENTITY.StoreE.saveStore(store);
                        if (!storesToSyncWithCMSHash[store.sdmStoreId]) {
                            storesToSyncWithCMS.push({ restaurant_id: store.id, id: store.id, sdmStoreId: store.storeId, active: store.active });
                            storesToSyncWithCMSHash[store.sdmStoreId] = true;
                        }
                    }
                }
            }
            console.log("UPDATING STORES STATUS FOR COUNT ->", storesToSyncWithCMS.length);
            if (storesToSyncWithCMS.length) await Utils.sendRequestToCMS('SYNC_STORE_STATUS', storesToSyncWithCMS);
        } catch (error) {
            consolelog(process.cwd(), "syncStoreStatus", JSON.stringify(error), false)
            return Promise.reject(error);
        }
    }

    async nearestStore(headers: ICommonRequest.IHeaders, payload: IStoreRequest.IGetNearestStore) {
        try {
            let geoWithinArg: IAerospike.Query = {
                set: ENTITY.StoreE.set,
                geoWithin: {
                    bin: 'geoFence',
                    lat: parseFloat(payload.lat.toString()),
                    lng: parseFloat(payload.lng.toString()),
                }
            }
            let store: IStoreRequest.IStore[] = await Aerospike.query(geoWithinArg)
            if (store && store.length > 0) {
                if (store[0].active) {
                    if (store[0]['services'][Constant.DATABASE.TYPE.STORE_SERVICE.CARHOP]) {
                        let checkStoreOnline = checkOnlineStore(store[0].startTime, store[0].endTime, store[0].nextday)
                        if (checkStoreOnline) {
                            return {
                                cityId: store[0].cityId,
                                areaId: store[0].areaId,
                                storeId: store[0].storeId
                            }
                        } else {
                            return {
                                cityId: store[0].cityId,
                                areaId: store[0].areaId,
                                storeId: 0
                            }
                        }
                    } else {

                    }
                } else {
                    return {
                        cityId: store[0].cityId,
                        areaId: store[0].areaId,
                        storeId: 0
                    }
                }
            }
            else
                return {
                    cityId: 0,
                    areaId: 0,
                    storeId: 0
                }
        } catch (error) {
            consolelog(process.cwd(), "nearestStore", JSON.stringify(error), false)
            return Promise.reject(error);
        }
    }
}

export const storeController = new StoreController();