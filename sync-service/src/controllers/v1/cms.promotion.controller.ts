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
    async postPromotion(headers: ICommonRequest.IHeaders, payload: ICMSPromotionRequest.ICmsPromotion, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.PromotionE.createPromotion(payload)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postPromotion", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method POST
     * @description syncs upsell products
     * @param {any} data
    */
    async syncUpsellProducts(headers: ICommonRequest.IHeaders, payload: ICMSMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.MenuE.syncUpsellProducts(payload)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "syncUpsellProducts", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsPromotionController = new CmsPromotionController();