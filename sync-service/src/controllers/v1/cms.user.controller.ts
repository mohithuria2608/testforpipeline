import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsUserController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async postUser(headers: ICommonRequest.IHeaders, payload: ICMSMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.UserE.syncUser(payload)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postUser", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsUserController = new CmsUserController();