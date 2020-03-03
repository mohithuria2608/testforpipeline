import * as fs from 'fs';
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class HiddenController {
    constructor() { }

    /**
    * @method BOOTSTRAP
    * @description : Post bulk hidden data
    * */
    async bootstrapHidden() {
        try {
            await Aerospike.truncate({ set: ENTITY.HiddenE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/hidden.json', 'utf-8');
            let hidden = JSON.parse(rawdata);
            for (const iterator of hidden) {
                ENTITY.HiddenE.bootstrapHidden(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapHidden", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchHiddenProducts(headers: ICommonRequest.IHeaders, payload: IHiddenRequest.IFetchHidden) {
        try {
            payload['language'] = headers.language
            return await ENTITY.HiddenE.getHiddenProducts(payload)
        } catch (error) {
            consolelog(process.cwd(), "fetchHiddenProducts", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} type  enum[menu, hidden]
    * @param {string} data  actuall array of menu or hidden
    * */
    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv);
            await ENTITY.HiddenE.postHiddenMenu(data.data[0]);
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const hiddenController = new HiddenController();