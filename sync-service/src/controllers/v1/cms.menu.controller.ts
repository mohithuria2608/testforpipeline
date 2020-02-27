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
            let menuChange = {
                set: ENTITY.MenuE.set,
                as: {
                    create: true,
                    argv: await ENTITY.MenuE.formatMenu(payload.data)
                },
                inQ: true
            }
            if (payload.action == "update") {
                menuChange['as']['update'] = true
                delete menuChange['as']['create']
            }
            kafkaService.kafkaSync(menuChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postMenu", JSON.stringify(error), false)
            return Promise.reject(error)
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
                },
                inQ: true
            }
            if (payload.action == "update") {
                upsellChange['as']['update'] = true
                delete upsellChange['as']['create']
            }
            kafkaService.kafkaSync(upsellChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncUpsellProducts", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsMenuController = new CmsMenuController();