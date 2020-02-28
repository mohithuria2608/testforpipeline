import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class CmsHomeController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     */
    async postHomeData(headers: ICommonRequest.IHeaders, payload: ICmsHomeRequest.ICmsHome, auth: ICommonRequest.AuthorizationObj) {
        try {
            let menuChange = {
                set: ENTITY.HomeE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload.data)
                }
            }
            kafkaService.kafkaSync(menuChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postHomeData", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsHomeController = new CmsHomeController();