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
}

export const storeController = new StoreController();
