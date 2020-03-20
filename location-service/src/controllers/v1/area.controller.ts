import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import * as Utils from "../../utils";
import { Aerospike } from '../../aerospike'

export class AreaController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk area data
     * */
    async bootstrapArea() {
        try {
            let jsonPostfix = config.get("sdm.type")
            consolelog(process.cwd(), "area jsonPostfix", jsonPostfix, true)
            await Aerospike.truncate({ set: ENTITY.AreaE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + `/../../../model/area_${jsonPostfix}.json`, 'utf-8');
            let areas = JSON.parse(rawdata);
            for (const area of areas) {
                await ENTITY.AreaE.bootstrapArea(area)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapArea", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /** post on CMS */
    async postOnCMS() {
        let areaData = await ENTITY.SyncAreaE.getList();
        await Utils.sendRequestToCMS('SYNC_AREA', areaData);
    }

    /** sync to aerospike */
    async syncToAS(payload) {
        for (let area of payload) {
            area.id = `1_${area.cityId}_${area.sdmAreaId}`;
            await ENTITY.AreaE.saveData(area);
        }
    }
}

export const areaController = new AreaController();
