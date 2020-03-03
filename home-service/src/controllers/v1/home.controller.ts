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
            await Aerospike.truncate({ set: ENTITY.HomeEnE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/home.json', 'utf-8');
            let home = JSON.parse(rawdata);
            for (const iterator of home) {
                ENTITY.HomeEnE.postHome(iterator)
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
            switch (headers.language) {
                case Constant.DATABASE.LANGUAGE.EN: await ENTITY.HomeEnE.getHome({ countryId: 1 }); break;
                case Constant.DATABASE.LANGUAGE.AR: await ENTITY.HomeArE.getHome({ countryId: 1 }); break;
            }
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
            let data = JSON.parse(payload.as.argv)[0];
            switch (data.language) {
                case Constant.DATABASE.LANGUAGE.EN: await ENTITY.HomeEnE.postHome(data); break;
                case Constant.DATABASE.LANGUAGE.AR: await ENTITY.HomeArE.postHome(data); break;
            }
            return {};
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const homeController = new HomeController();