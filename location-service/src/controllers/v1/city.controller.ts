import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as Utils from "../../utils";
import { Aerospike } from '../../aerospike'

export class CityController {

    constructor() { }

    /** post on CMS */
    async postOnCMS() {
        let cityData = await ENTITY.SyncCityE.getList();
        await Utils.sendRequestToCMS('SYNC_CITY', cityData);
        return {}
    }

    /** sync to aerospike */
    async syncToAS(payload) {
        await Aerospike.truncate({ set: ENTITY.CityE.set, before_nanos: 0 });
        for (let city of payload) {
            city.id = `1_${city.sdmCityId}`;
            await ENTITY.CityE.saveData(city);
        }
        return {}
    }
}

export const cityController = new CityController();