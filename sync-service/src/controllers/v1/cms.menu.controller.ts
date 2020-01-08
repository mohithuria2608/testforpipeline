import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsMenuController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     */
    async postMenu(headers: ICommonRequest.IHeaders, payload: ICMSMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.MenuE.fetchMenuFromCMS(payload)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postMenu", err, false)
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

export const cmsMenuController = new CmsMenuController();