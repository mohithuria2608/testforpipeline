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
    async bootstrapPickup(grpc?: boolean) {
        try {
            if (!grpc)
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
                                                if (s && s.active == 1) {
                                                    if (s.areaId == a.areaId) {
                                                        delete s.phone2
                                                        delete s.provinceId
                                                        delete s.countryId
                                                        delete s.mapId
                                                        delete s.areaId
                                                        delete s.streetId
                                                        delete s.districtId
                                                        delete s.geoFence
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
            if (!grpc) {
                await ENTITY.PickupE.bootstrapPickup(res)
                await uploadService.uploadToBlob({ name: "pickup.json", json: JSON.stringify(res) })
            }

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
            let store: IStoreRequest.IStore = await storeController.validateCoords(payload)
            consolelog(process.cwd(), "store", JSON.stringify(store), true)
            if (store && store.id && store.id != "") {
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
                                    s['isOnline'] = checkOnlineStore(s.startTime, s.endTime, s.nextDay)
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
     * syncs location data from CMS
     */
    async syncLocationFromCMS(payload): Promise<any> {
        try {
            let syncData = JSON.parse(payload.as.argv)['data'];
            switch (syncData.type) {
                case 'city': await cityController.syncToAS(syncData.data);
                case 'country': await countryController.syncToAS(syncData.data);
                case 'area': await areaController.syncToAS(syncData.data);
                case 'store': await storeController.syncToAS(syncData.data);
            }
        } catch (error) {
            consolelog(process.cwd(), "syncLocationFromCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async fetchPickup(payload: IStoreGrpcRequest.IFetchPickup) {
        try {
            let pickupData = await this.bootstrapPickup(true)
            return pickupData
        } catch (error) {
            consolelog(process.cwd(), "fetchPickup", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const locationController = new LocationController();
