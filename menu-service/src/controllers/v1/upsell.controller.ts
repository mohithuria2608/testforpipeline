import * as fs from 'fs';
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class UpsellController {
    constructor() { }

    /**
    * @method BOOTSTRAP
    * @description : Post bulk upsell data
    * */
    async bootstrapUpsell() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/upsell.json', 'utf-8');
            let upsell = JSON.parse(rawdata);
            for (const iterator of upsell) {
                ENTITY.UpsellE.bootstrapUpsell(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapUpsell", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchUpsellProducts(headers: ICommonRequest.IHeaders, payload: IUpsellRequest.IFetchUpsell) {
        try {
            return await ENTITY.UpsellE.getUpsellProducts(payload)
        } catch (error) {
            consolelog(process.cwd(), "fetchMenu", error, false)
            return Promise.reject(error)
        }
    }
}

export const upsellController = new UpsellController();