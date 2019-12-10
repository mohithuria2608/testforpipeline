import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class StoreController {

    constructor() { }

    /**
     * @method POST
     * @description : Post bulk outlet data
     * */
    async postStore() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/store.json', 'utf-8');
            let outlet = JSON.parse(rawdata);
            for (const iterator of outlet) {
                ENTITY.StoreE.postStore(iterator)
            }
            return {}
        } catch (err) {
            consolelog("postStore", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GRPC
     * @param {number=} lat : latitude
     * @param {number=} lng : longitude
     * */
    async validateCoordinates(payload: IStoreRequest.IValidateCoordinates) {
        try {
            let outlet: IStoreRequest.IOutlet = await ENTITY.StoreE.validateCoords(payload)
            console.log("outlet in outlet service", JSON.stringify(outlet))
            if (outlet && outlet.id) {
                return outlet
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.STORE_NOT_FOUND)
        } catch (err) {
            consolelog("validateCoordinates", err, false)
            return Promise.reject(err)
        }
    }
}

export const storeController = new StoreController();
