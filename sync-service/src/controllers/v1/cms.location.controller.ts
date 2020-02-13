import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class CmsLocationController {

    constructor() { }

    /**
     * @method POST
     * @description syncs upsell products
     * @param {any} data
    */
    async postStoresList(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            payload['type'] = "location"
            let upsellChange = {
                set: ENTITY.LocationE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            if (payload.action == "update") {
                upsellChange['as']['update'] = true
                delete upsellChange['as']['create']
            }
            kafkaService.kafkaSync(upsellChange);
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postStoresList", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsLocationController = new CmsLocationController();