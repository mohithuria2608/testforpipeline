import * as fs from 'fs';
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class UpsellController {
    constructor() { }

    /**
    * @method BOOTSTRAP
    * @description : Post bulk upsell data
    * */
    async bootstrapUpsell() {
        try {
            await Aerospike.truncate({ set: ENTITY.UpsellE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/upsell.json', 'utf-8');
            let upsell = JSON.parse(rawdata);
            for (const iterator of upsell) {
                ENTITY.UpsellE.bootstrapUpsell(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapUpsell", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchUpsellProducts(headers: ICommonRequest.IHeaders, payload: IUpsellRequest.IFetchUpsell) {
        try {
            payload['language'] = headers.language
            return await ENTITY.UpsellE.getUpsellProducts(payload)
        } catch (error) {
            consolelog(process.cwd(), "fetchUpsellProducts", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const upsellController = new UpsellController();