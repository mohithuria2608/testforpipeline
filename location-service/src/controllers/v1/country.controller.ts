import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import * as Utils from "../../utils";
import { Aerospike } from '../../aerospike'

export class CountryController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk country data
     * */
    async bootstrapCountry() {
        try {
            let jsonPostfix = config.get("sdm.type")
            consolelog(process.cwd(), "country jsonPostfix", jsonPostfix, true)
            await Aerospike.truncate({ set: ENTITY.CountryE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + `/../../../model/country_${jsonPostfix}.json`, 'utf-8');
            let countries = JSON.parse(rawdata);
            for (const country of countries) {
                await ENTITY.CountryE.bootstrapCountry(country)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapCountry", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /** post on CMS */
    async postOnCMS() {
        let countryData = await ENTITY.SyncCountryE.getList();
        await Utils.sendRequestToCMS('SYNC_COUNTRY', countryData);
    }

    /** sync to aerospike */
    async syncToAS(payload) {
        await ENTITY.CountryE.saveData(payload);
    }
}

export const countryController = new CountryController();
