import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class CmsMenuController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     */
    async postMenu(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            payload['type'] = "menu"
            let menuChange = {
                set: ENTITY.MenuE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            if (payload.action == "update") {
                menuChange['as']['update'] = true
                delete menuChange['as']['create']
            }
            kafkaService.kafkaSync(menuChange)
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
            payload['type'] = "upsell"
            let upsellChange = {
                set: ENTITY.UpsellE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            if (payload.action == "update") {
                upsellChange['as']['update'] = true
                delete upsellChange['as']['create']
            }
            kafkaService.kafkaSync(upsellChange)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "syncUpsellProducts", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsMenuController = new CmsMenuController();