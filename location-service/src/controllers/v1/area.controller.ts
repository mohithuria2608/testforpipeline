
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class AreaController {

    constructor() { }

    /**
     * @method POST
     * @description : Post bulk area data
     * */
    async post() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/area.json', 'utf-8');
            let areas = JSON.parse(rawdata);
            for (const area of areas) {
                ENTITY.AreaE.postArea(area)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(),"post area", err, false)
            return Promise.reject(err)
        }
    }
}

export const areaController = new AreaController();
