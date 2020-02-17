import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class CmsUserController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async postUser(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userChange = {
                set: ENTITY.UserE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            if (payload.action == "update") {
                userChange['as']['update'] = true
                delete userChange['as']['create']
            }
            kafkaService.kafkaSync(userChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postUser", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsUserController = new CmsUserController();