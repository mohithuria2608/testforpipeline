import * as fs from 'fs';
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class UpsellController {
    constructor() { }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchUpsellProducts(headers: ICommonRequest.IHeaders, payload: IMenuRequest.IFetchMenu) {
        try {
            return await ENTITY.UpsellE.getUpsellProducts()
        } catch (err) {
            consolelog(process.cwd(), "fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const upsellController = new UpsellController();