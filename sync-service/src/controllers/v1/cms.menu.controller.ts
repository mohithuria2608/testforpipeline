import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsMenuController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     */
    async postMenu(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            let change = {
                set: ENTITY.MenuE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            ENTITY.MenuE.syncMenuToKafka(change)
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
    async postUpsell(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            let change = {
                set: ENTITY.UpsellE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            ENTITY.UpsellE.syncUpsellToKafka(change)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "syncUpsellProducts", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsMenuController = new CmsMenuController();