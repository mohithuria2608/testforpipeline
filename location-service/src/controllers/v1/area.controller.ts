
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import { Aerospike } from '../../aerospike'

export class AreaController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk area data
     * */
    async bootstrapArea() {
        try {
            await Aerospike.truncate({ set: ENTITY.AreaE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/area.json', 'utf-8');
            let areas = JSON.parse(rawdata);
            for (const area of areas) {
                await ENTITY.AreaE.bootstrapArea(area)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(),"bootstrapArea", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const areaController = new AreaController();
