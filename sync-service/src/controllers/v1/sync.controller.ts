import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { kafkaService } from '../../grpc/client'
import * as ENTITY from '../../entity'

export class SyncController {

    constructor() { }

    /**
     * @method POST
     * @param {any} menu : menu data to be pushed in aerosipke
     * */
    async syncMenu(payload: ISyncMenuRequest.ISyncMenu) {
        try {
            kafkaService.produceMessage({ data: payload.menu })
            return {}
        } catch (err) {
            consolelog("syncMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const syncController = new SyncController();