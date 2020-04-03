import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import * as Utils from "../../utils";
import { Aerospike } from '../../aerospike'

export class CityController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk city data
     * */
    async bootstrapCity(sdmType?: string) {
        try {
            let jsonPostfix = sdmType ? sdmType : config.get("sdm.type")
            consolelog(process.cwd(), "city jsonPostfix", jsonPostfix, true)
            await Aerospike.truncate({ set: ENTITY.CityE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + `/../../../model/city_${jsonPostfix}.json`, 'utf-8');
            let cities = JSON.parse(rawdata);
            for (const city of cities) {
                await ENTITY.CityE.bootstrapCity(city)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapCity", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /** post on CMS */
    async postOnCMS() {
        let cityData = await ENTITY.SyncCityE.getList();
        await Utils.sendRequestToCMS('SYNC_CITY', cityData);
    }

    /** sync to aerospike */
    async syncToAS(payload) {
        await Aerospike.truncate({ set: ENTITY.AreaE.set, before_nanos: 0 });
        for (let city of payload) {
            city.id = `1_${city.sdmCityId}`;
            await ENTITY.CityE.saveData(city);
        }
    }
}

export const cityController = new CityController();