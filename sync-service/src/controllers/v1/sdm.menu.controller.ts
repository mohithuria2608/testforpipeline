import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class SdmMenuController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async buildMenu(headers: ICommonRequest.IHeaders, payload: ICMSMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.MenuE.fetchMenuFromSDM(payload)
            return {};
        } catch (err) {
            consolelog(process.cwd(), "postMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const sdmMenuController = new SdmMenuController();