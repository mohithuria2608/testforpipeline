import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class LocationController {

    constructor() { }

    /**
     * @method GET
     * @param {number} lat : latitue
     * @param {number} lng : longitude
     * */
    async validateLocation(headers: ICommonRequest.IHeaders, payload: ILocationRequest.IValidateLocation) {
        try {
            let store: IStoreRequest.IStore[] = await ENTITY.StoreE.validateCoords(payload)
            if (store && store.length > 0)
                return { menuId: store[0].menuId }
            else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.SERVICE_UNAVAILABLE)
        } catch (err) {
            consolelog(process.cwd(), "validateLocation", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @description get nested pickup list
    * */
    async getPickupList(headers: ICommonRequest.IHeaders, payload: ILocationRequest.IPickupLocation) {
        try {
            let preSelectedStore: IStoreRequest.IStore
            if (payload.lat && payload.lng) {
                let temp = await ENTITY.StoreE.validateCoords(payload)
                if (temp && temp.length > 0)
                    preSelectedStore = temp[0]
            }
            const promise = await Promise.all([ENTITY.CityE.scanAerospike(), ENTITY.AreaE.scanAerospike(), ENTITY.StoreE.scanAerospike()])
            const city: ICityRequest.ICity[] = promise[0]
            const area: IAreaRequest.IArea[] = promise[1]
            const store: IStoreRequest.IStore[] = promise[2]

            consolelog(process.cwd(), "city", city.length, true)
            consolelog(process.cwd(), "area", area.length, true)
            consolelog(process.cwd(), "store", store.length, true)
            let res = []
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
                                a['store'] = storeCollection
                                areaCollection.push(a)
                            }
                        }
                    }
                    c['area'] = areaCollection
                    res.push(c)
                }
            }
            return res
        } catch (err) {
            consolelog(process.cwd(), "getPickupList", err, false)
            return Promise.reject(err)
        }
    }
}

export const locationController = new LocationController();
