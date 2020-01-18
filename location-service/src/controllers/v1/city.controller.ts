
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class CityController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk city data
     * */
    async bootstrapCity() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/city.json', 'utf-8');
            let cities = JSON.parse(rawdata);
            for (const city of cities) {
                await ENTITY.CityE.bootstrapCity(city)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(),"bootstrapCity", err, false)
            return Promise.reject(err)
        }
    }
}

export const cityController = new CityController();
