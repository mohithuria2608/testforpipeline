import * as fs from 'fs';
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class UpsellController {
    constructor() { }

    /**
    * @method POST
    * @description : Post bulk upsell data
    * */
    async postUpsell() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/upsell.json', 'utf-8');
            let upsell = JSON.parse(rawdata);
            for (const iterator of upsell) {
                ENTITY.UpsellE.postUpsell(iterator)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postUpsell", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchUpsellProducts(headers: ICommonRequest.IHeaders, payload: IUpsellRequest.IFetchUpsell) {
        try {

            return await ENTITY.UpsellE.getUpsellProducts(payload)
        } catch (err) {
            consolelog(process.cwd(), "fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const upsellController = new UpsellController();