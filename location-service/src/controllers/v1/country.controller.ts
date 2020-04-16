import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as Utils from "../../utils";

export class CountryController {

    constructor() { }

    /** post on CMS */
    async postOnCMS() {
        let countryData = await ENTITY.SyncCountryE.getList();
        await Utils.sendRequestToCMS('SYNC_COUNTRY', countryData);
        return {}
    }

    /** sync to aerospike */
    async syncToAS(payload) {
        await ENTITY.CountryE.saveData(payload);
        return {}
    }
}

export const countryController = new CountryController();
