import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class CmsAppversionController {

    constructor() { }

    /**
    * @method BOOTSTRAP
    * @description : Post bulk appversion data
    * */
    async bootstrapAppversion() {
        try {
            await Aerospike.truncate({ set: ENTITY.AppversionE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/appversion.json', 'utf-8');
            let appversion = JSON.parse(rawdata);
            for (const iterator of appversion) {
                ENTITY.AppversionE.postAppversion(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapAppversion", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string=} type
     * @param {number=} isActive
     * @description Get appversion from as 
     */
    async getAppversion(payload: IAppversionRequest.IFetchAppversion) {
        try {
            let appversion = await ENTITY.AppversionE.getAppversion(payload)
            return appversion
        } catch (error) {
            consolelog(process.cwd(), "getAppversion", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsAppversionController = new CmsAppversionController();