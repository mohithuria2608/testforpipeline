import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsUserController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async postUser(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            let change = {
                set: ENTITY.UserE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            if (payload.action == "update") {
                change['as']['update'] = true
                delete change['as']['create']
            }
            ENTITY.UserE.syncUserToKafka(change)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postUser", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsUserController = new CmsUserController();