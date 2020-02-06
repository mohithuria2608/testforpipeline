import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class SdmMenuController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async partialProcessMenuFromSDM(headers: ICommonRequest.IHeaders, payload: ISdmMenuRequest.ISdmMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.MenuE.fetchMenuFromSDM(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postMenu", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const sdmMenuController = new SdmMenuController();