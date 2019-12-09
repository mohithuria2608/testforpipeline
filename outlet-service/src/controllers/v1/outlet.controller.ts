import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class OutletController {

    constructor() { }

    /**
     * @method POST
     * @description : Post bulk outlet data
     * */
    async postOutletList() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/storeList.json', 'utf-8');
            let outlet = JSON.parse(rawdata);
            for (const iterator of outlet) {
                ENTITY.OutletE.postOutlet(iterator)
            }
            return {}
        } catch (err) {
            consolelog("postOutletList", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GET
     * @description :Get outlet info from storeId (secondary key)
     * */
    async getOutletByStoreId(headers: ICommonRequest.IHeaders, payload: IOutletRequest.IGetOutletStoreId, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.OutletE.getOutletByStoreId(payload)
        } catch (err) {
            consolelog("getOutletByStoreId", err, false)
            return Promise.reject(err)
        }
    }
}

export const outletController = new OutletController();