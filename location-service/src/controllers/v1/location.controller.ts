import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

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
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.STORE_NOT_FOUND)
        } catch (err) {
            consolelog("validateLocation", err, false)
            return Promise.reject(err)
        }
    }
}

export const locationController = new LocationController();
