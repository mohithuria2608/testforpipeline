import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class CountryController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk country data
     * */
    async bootstrapCountry() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/country.json', 'utf-8');
            let countries = JSON.parse(rawdata);
            for (const country of countries) {
                await ENTITY.CountryE.bootstrapCountry(country)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(),"bootstrapCountry", err, false)
            return Promise.reject(err)
        }
    }
}

export const countryController = new CountryController();
