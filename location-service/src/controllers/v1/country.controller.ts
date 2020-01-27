import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import { Aerospike } from '../../aerospike'

export class CountryController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk country data
     * */
    async bootstrapCountry() {
        try {
            await Aerospike.truncate({ set: ENTITY.CountryE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/country.json', 'utf-8');
            let countries = JSON.parse(rawdata);
            for (const country of countries) {
                await ENTITY.CountryE.bootstrapCountry(country)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(),"bootstrapCountry", error, false)
            return Promise.reject(error)
        }
    }
}

export const countryController = new CountryController();
