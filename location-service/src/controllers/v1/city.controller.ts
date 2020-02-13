
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'
import { Aerospike } from '../../aerospike'

export class CityController {

    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk city data
     * */
    async bootstrapCity() {
        try {
            await Aerospike.truncate({ set: ENTITY.CityE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/city.json', 'utf-8');
            let cities = JSON.parse(rawdata);
            for (const city of cities) {
                await ENTITY.CityE.bootstrapCity(city)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(),"bootstrapCity", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cityController = new CityController();
