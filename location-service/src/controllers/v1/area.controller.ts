
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class AreaController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk area data
     * */
    async bootstrapArea() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/area.json', 'utf-8');
            let areas = JSON.parse(rawdata);
            for (const area of areas) {
                await ENTITY.AreaE.bootstrapArea(area)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(),"bootstrapArea", error, false)
            return Promise.reject(error)
        }
    }
}

export const areaController = new AreaController();
