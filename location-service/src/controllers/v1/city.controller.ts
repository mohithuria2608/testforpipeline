
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class CityController {

    constructor() { }

    /**
     * @method POST
     * @description : Post bulk city data
     * */
    async post() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/city.json', 'utf-8');
            let outlet = JSON.parse(rawdata);
            for (const iterator of outlet) {
                ENTITY.CountryE.post(iterator)
            }
            return {}
        } catch (err) {
            consolelog("post city", err, false)
            return Promise.reject(err)
        }
    }
}

export const cityController = new CityController();
