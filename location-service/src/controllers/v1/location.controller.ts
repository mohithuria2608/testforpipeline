import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { storeController } from './store.controller'
export class LocationController {

    constructor() { }

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
                store[0]['isOnline'] = true
                delete store[0]['geoFence']
                return store[0]
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
            let self = this
            let preSelectedStore: IStoreRequest.IStore
            if (payload.lat && payload.lng) {
                let temp = await storeController.validateCoords(payload)
                if (temp && temp.length > 0)
                    preSelectedStore = temp[0]
            }
            // const promise = await Promise.all([,, ])
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
                    let areaCollection = []
                    if (area && area.length > 0) {
                        for (const a of area) {
                            if (a.cityId == c.cityId) {
                                let storeCollection = []
                                if (store && store.length > 0) {
                                    for (const s of store) {
                                        delete s.geoFence
                                        if (s.areaId == a.areaId) {
                                            c['isSelected'] = (preSelectedStore && preSelectedStore.areaId && (preSelectedStore.areaId == a.areaId)) ? true : false
                                            a['isSelected'] = (preSelectedStore && preSelectedStore.areaId && (preSelectedStore.areaId == a.areaId)) ? true : false
                                            s['isSelected'] = (preSelectedStore && preSelectedStore.storeId && (preSelectedStore.storeId == s.storeId)) ? true : false
                                            storeCollection.push(s)
                                        }
                                    }
                                }
                                storeCollection.sort(compare)
                                a['store'] = storeCollection
                                areaCollection.push(a)
                            }
                        }
                    }
                    areaCollection.sort(compare)
                    c['area'] = areaCollection
                    res.push(c)
                }
            }
            res.sort(compare)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getPickupList", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const locationController = new LocationController();
