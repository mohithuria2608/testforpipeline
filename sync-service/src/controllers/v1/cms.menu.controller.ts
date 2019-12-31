import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsMenuController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async postMenu(headers: ICommonRequest.IHeaders, payload: ICMSMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.MenuE.syncMenu(payload)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsMenuController = new CmsMenuController();