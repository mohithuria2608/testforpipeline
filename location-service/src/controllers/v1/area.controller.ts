import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as Utils from "../../utils";
import { Aerospike } from '../../aerospike'

export class AreaController {

    constructor() { }

    /** post on CMS */
    async postOnCMS() {
        let areaData = await ENTITY.SyncAreaE.getList();
        await Utils.sendRequestToCMS('SYNC_AREA', areaData);
        return {}
    }

    /** sync to aerospike */
    async syncToAS(payload) {
        await Aerospike.truncate({ set: ENTITY.AreaE.set, before_nanos: 0 });
        for (let area of payload) {
            area.id = `1_${area.cityId}_${area.sdmAreaId}`;
            await ENTITY.AreaE.saveData(area);
        }
        return {}
    }
}

export const areaController = new AreaController();
