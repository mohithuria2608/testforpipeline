import * as Constant from '../../constant'
import { consolelog, checkStoreOnline } from '../../utils'
import * as ENTITY from '../../entity'
import { storeController } from './store.controller'
import { cityController } from './city.controller';
import { areaController } from './area.controller';
import { countryController } from './country.controller';
import { Aerospike } from '../../aerospike';
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
                                                if (s) {
                                                    delete s.geoFence
                                                    if (s.areaId == a.areaId) {
                                                        c['isSelected'] = false
                                                        a['isSelected'] = false
                                                        s['isSelected'] = false
                                                        s['isOnline'] = checkStoreOnline(s.startTime, s.endTime)
                                                        storeCollection.push(s)
                                                    }
                                                }
                                            }
                                        }
                                        if (storeCollection && storeCollection.length > 0) {
                                            storeCollection.sort(compare)
                                            a['store'] = storeCollection
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
            console.log("ressssssssss", JSON.stringify(res))
            await ENTITY.PickupE.bootstrapPickup(res)
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
            let store: IStoreRequest.IStore[] = await storeController.validateCoords(payload)
            consolelog(process.cwd(), "store", JSON.stringify(store), true)
            if (store && store.length > 0) {
                let res = {
                    menuId: store[0].menuId,
                    store: {
                        storeId: store[0].storeId,
                        countryId: store[0].countryId,
                        areaId: store[0].areaId,
                        cityId: store[0].cityId,
                        location: store[0].location,
                        address_en: store[0].address_en,
                        address_ar: store[0].address_ar,
                        name_en: store[0].name_en,
                        name_ar: store[0].name_ar,
                    },
                    // isOnline: checkStoreOnline(store[0].startTime, store[0].endTime)
                    isOnline: store[0].isOnline
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
            if (pickup && pickup.pickup && pickup.pickup.length > 0)
                return pickup.pickup
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
                cityController.postOnCMS(),
                areaController.postOnCMS(),
                // storeController.postOnCMS(),
                // countryController.postOnCMS()
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
            let syncData = JSON.parse(payload.as.argv);
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
}

export const locationController = new LocationController();
