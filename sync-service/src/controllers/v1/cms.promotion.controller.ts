import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsPromotionController {

    constructor() { }

    /**
     * @method POST
     * @param {any} payload
     * @description creates and saves a new promotion from CMS to aerospike
     */
    async postPromotion(headers: ICommonRequest.IHeaders, payload: ICmsPromotionRequest.ICmsPromotion, auth: ICommonRequest.AuthorizationObj) {
        try {
            let change = {
                set: ENTITY.PromotionE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            ENTITY.PromotionE.syncToKafka(change)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postPromotion", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsPromotionController = new CmsPromotionController();