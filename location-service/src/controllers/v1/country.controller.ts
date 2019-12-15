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
            let countries = JSON.parse(rawdata);
            for (const country of countries) {
                ENTITY.CountryE.postCountry(country)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(),"post country", err, false)
            return Promise.reject(err)
        }
    }
}

export const countryController = new CountryController();
