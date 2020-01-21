import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class CmsPromotionController {

    constructor() { }

    /**
     * @method POST
     * @param {any} payload
     * @description creates and saves a new promotion from CMS to aerospike
     */
    async postPromotion(headers: ICommonRequest.IHeaders, payload: ICmsPromotionRequest.ICmsPromotion) {
        try {
            let promoChange = {
                set: ENTITY.PromotionE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload.data)
                }
            }
            if (payload.action == "update") {
                promoChange['as']['update'] = true
                delete promoChange['as']['create']
            }
            kafkaService.kafkaSync(promoChange)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postPromotion", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsPromotionController = new CmsPromotionController();