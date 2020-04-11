import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog, checkOnlineStore } from '../../utils'
import * as ENTITY from '../../entity'
import { storeController } from './store.controller'
import { cityController } from './city.controller';
import { areaController } from './area.controller';
import { countryController } from './country.controller';
import { Aerospike } from '../../aerospike';
import { uploadService } from '../../grpc/client';
export class LocationController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk area data
     * */
    async bootstrapPickup() {
        try {
            await Aerospike.truncate({ set: ENTITY.PickupE.set, before_nanos: 0 })

            const city: ICityRequest.ICity[] = await ENTITY.CityE.scanAerospike()
            const area: IAreaRequest.IArea[] = await ENTITY.AreaE.scanAerospike()
            const store: IStoreRequest.IStore[] = await ENTITY.StoreE.scanAerospike()

            consolelog(process.cwd(), "city", city.length, true)
            consolelog(process.cwd(), "area", area.length, true)
            consolelog(process.cwd(), "store", store.length, true)
            let res = []

            function compare(a, b) {
                // Use toUpperCase() to ignore character casing
                const bandA = a.name_en.toUpperCase();
                const bandB = b.name_en.toUpperCase();

                let comparison = 0;
                if (bandA > bandB) {
                    comparison = 1;
                } else if (bandA < bandB) {
                    comparison = -1;
                }
                return comparison;
            }
            if (city && city.length > 0) {
                for (const c of city) {
                    if (c) {
                        let areaCollection = []
                        if (area && area.length > 0) {
                            for (const a of area) {
                                if (a) {
                                    if (a.cityId == c.cityId) {
                                        let storeCollection = []
                                        if (store && store.length > 0) {
                                            for (const s of store) {
                                                if (s && s.active == 1 && s.services.tak == 1) {
                                                    if (s.areaId == a.areaId) {
                                                        delete s.phone2
                                                        delete s.provinceId
                                                        delete s.countryId
                                                        delete s.mapId
                                                        delete s.areaId
                                                        delete s.streetId
                                                        delete s.districtId
                                                        delete s.geoFence
                                                        delete s.sdmStoreId
                                                        delete s.webMenuId
                                                        delete s.menuTempId
                                                        s.startTime = new Date(+new Date(s.startTime) + Constant.CONF.GENERAL.SDM_STORE_TIME_OFFSET).toISOString().replace(".000Z", "Z");
                                                        s.endTime = new Date(+new Date(s.endTime) + Constant.CONF.GENERAL.SDM_STORE_TIME_OFFSET).toISOString().replace(".000Z", "Z");

                                                        if (!storeCollection.some(ss => ss.storeId === s.storeId))
                                                            storeCollection.push(s)
                                                    }
                                                }
                                            }
                                        }
                                        if (storeCollection && storeCollection.length > 0) {
                                            storeCollection.sort(compare)
                                            a['store'] = storeCollection
                                            delete a.cityId
                                            delete a.areaId
                                            delete a.districtId
                                            delete a.provinceId
                                            delete a.countryId
                                            delete a.streetId
                                            areaCollection.push(a)
                                        }
                                    }
                                }
                            }
                        }
                        if (areaCollection && areaCollection.length > 0) {
                            areaCollection.sort(compare)
                            c['area'] = areaCollection
                            res.push(c)
                        }
                    }
                }
            }
            res.sort(compare)
            await ENTITY.PickupE.bootstrapPickup(res)
            await uploadService.uploadToBlob({ name: "pickup.json", json: JSON.stringify(res) })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapPickup", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {number} lat : latitue
     * @param {number} lng : longitude
     * */
    async validateLocation(headers: ICommonRequest.IHeaders, payload: ILocationRequest.IValidateLocation) {
        try {
            let validateCoordsPayload = {
                serviceType: Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY,
                ...payload
            }
            let store = await storeController.validateCoords(validateCoordsPayload)
            consolelog(process.cwd(), "store", JSON.stringify(store), true)
            if (store && store.id) {
                let res = {
                    menuId: store.menuId,
                    store: {
                        storeId: store.storeId,
                        countryId: store.countryId,
                        areaId: store.areaId,
                        cityId: store.cityId,
                        location: store.location,
                        address_en: store.address_en,
                        address_ar: store.address_ar,
                        name_en: store.name_en,
                        name_ar: store.name_ar,
                        isOnline: store.isOnline
                    }
                }
                return res
            }
            else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
        } catch (error) {
            consolelog(process.cwd(), "validateLocation", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @description get nested pickup list
    * */
    async getPickupList(headers: ICommonRequest.IHeaders, payload: ILocationRequest.IPickupLocation) {
        try {
            let getArgv = {
                set: ENTITY.PickupE.set,
                key: "pickup"
            }
            let pickup = await Aerospike.get(getArgv)
            if (pickup && pickup.pickup && pickup.pickup.length > 0) {
                pickup.pickup.map(c => {
                    c['isSelected'] = false
                    if (c.area && c.area.length > 0) {
                        c.area.map(a => {
                            a['isSelected'] = false
                            if (a.store && a.store.length > 0) {
                                a.store.map(s => {
                                    s['isSelected'] = false
                                    s['isOnline'] = checkOnlineStore(s.startTime, s.endTime, s.nextday)
                                })
                            }
                        })
                    }
                })
                return pickup.pickup
            }
            else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getPickupList", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * syncs stores from CMS to Aerospike
     */
    async postLocationToCMS(payload): Promise<any> {
        try {
            console.log("SYNCING HERE");
            await Promise.all([
                // countryController.postOnCMS(),
                cityController.postOnCMS(),
                areaController.postOnCMS(),
                storeController.postOnCMS()
            ]);
        } catch (error) {
            consolelog(process.cwd(), "postLocationToCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * upload pickup on blob
     */
    async syncLocationFromCMS(payload): Promise<any> {
        try {
            let syncData = JSON.parse(payload.as.argv)['data'];
            switch (syncData.type) {
                case 'city': { await cityController.syncToAS(syncData.data); break; }
                case 'country': { await countryController.syncToAS(syncData.data); break; }
                case 'area': { await areaController.syncToAS(syncData.data); break; }
                case 'store': { await storeController.syncToAS(syncData.data); break; }
                default: return {};
            }
            await this.bootstrapPickup();
        } catch (error) {
            consolelog(process.cwd(), "syncLocationFromCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async uploadPickupOnBlob(payload: IStoreGrpcRequest.IUploadPickupOnBlob) {
        try {
            await countryController.bootstrapCountry(payload.sdm)
            await cityController.bootstrapCity(payload.sdm)
            await areaController.bootstrapArea(payload.sdm)
            await storeController.bootstrapStore(payload.sdm)
            this.bootstrapPickup()
            return {}
        } catch (error) {
            consolelog(process.cwd(), "fetchPickup", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const locationController = new LocationController();
