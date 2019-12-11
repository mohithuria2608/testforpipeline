import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class PickupController {

    constructor() { }

    /**
     * @method POST
     * @description : Post bulk city and corresponding area list and their stores
     * */
    async post() {
        try {
            let rawdata = await fs.readFileSync(__dirname + '/../../../model/pickup.json', 'utf-8');
            let area = JSON.parse(rawdata);

            for (const iterator of area) {
                ENTITY.PickupE.postPickup(iterator)
            }
            return {}
        } catch (err) {
            consolelog("post pickup", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GET
     * @description : Get all pickup list
     * */
    async getPickupList(headers: ICommonRequest.IHeaders) {
        try {
            return await ENTITY.PickupE.getPickup()
        } catch (err) {
            consolelog("getPickupList", err, false)
            return Promise.reject(err)
        }
    }
}

export const pickupController = new PickupController();