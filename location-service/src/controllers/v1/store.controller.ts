import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class StoreController {

    constructor() { }

    /**
     * @method POST
     * @description : Post bulk store data
     * */
    async post() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/store.json', 'utf-8');
            let stores = JSON.parse(rawdata);
            for (const store of stores) {
                ENTITY.StoreE.postStore(store)
            }
            return stores
        } catch (err) {
            consolelog(process.cwd(),"post store", err, false)
            return Promise.reject(err)
        }
    }
}

export const storeController = new StoreController();
