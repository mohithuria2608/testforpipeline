import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsConfigController {

    constructor() { }

    /**
     * @method POST
     * @param {any} payload
     * @description creates and saves a config from CMS to aerospike
     */
    async postConfig(headers: ICommonRequest.IHeaders, payload: ICmsConfigRequest.ICmsConfig) {
        try {
            let change = {
                set: ENTITY.ConfigE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload.data)
                }
            }
            if (payload.action == "update") {
                change['as']['update'] = true
                delete change['as']['create']
            }
            ENTITY.ConfigE.syncConfigFromKafka(change)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postConfig", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsConfigController = new CmsConfigController();