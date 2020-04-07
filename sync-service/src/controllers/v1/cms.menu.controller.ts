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
            if (payload.data) {
                let menuChange = {
                    set: ENTITY.MenuE.set,
                    as: {
                        create: true,
                        argv: JSON.stringify({ event: "cms_menu_sync", data: payload.data })
                    },
                    inQ: false
                }
                if (payload.action == "update") {
                    menuChange['as']['update'] = true
                    delete menuChange['as']['create']
                }
                kafkaService.kafkaSync(menuChange)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postMenu", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @description syncs hidden products
     * @param {any} data
    */
    async postHiddenMenu(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            payload['type'] = "hidden"
            let hiddenMenuData = {
                set: ENTITY.HiddenE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                },
                inQ: true
            }
            if (payload.action == "update") {
                hiddenMenuData['as']['update'] = true
                delete hiddenMenuData['as']['create']
            }
            kafkaService.kafkaSync(hiddenMenuData)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postHiddenMenu", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsMenuController = new CmsMenuController();