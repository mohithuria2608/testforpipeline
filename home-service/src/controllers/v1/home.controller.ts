import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class HomeController {
    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk menu data
     * */
    async bootstrapHome() {
        try {
            await Aerospike.truncate({ set: ENTITY.HomeE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/home.json', 'utf-8');
            let home = JSON.parse(rawdata);
            for (const iterator of home) {
                ENTITY.HomeE.postHome(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapHome", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * */
    async fetchHome(headers: ICommonRequest.IHeaders) {
        try {
            return await ENTITY.HomeE.getHome({ language: headers.language })
        } catch (error) {
            consolelog(process.cwd(), "fetchHome", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} data  actuall array of menu or upsell
    * */
    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update) {

                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const homeController = new HomeController();