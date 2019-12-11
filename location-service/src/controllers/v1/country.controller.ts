import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class CountryController {

    constructor() { }

    /**
     * @method POST
     * @description : Post bulk country data
     * */
    async post() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/country.json', 'utf-8');
            let outlet = JSON.parse(rawdata);
            for (const iterator of outlet) {
                ENTITY.CountryE.post(iterator)
            }
            return {}
        } catch (err) {
            consolelog("post country", err, false)
            return Promise.reject(err)
        }
    }
}

export const countryController = new CountryController();
