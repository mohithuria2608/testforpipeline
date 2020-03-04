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
            let homeData = {
                set: ENTITY.HomeE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload.data)
                },
                inQ: true
            }
            kafkaService.kafkaSync(homeData)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postHomeData", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsHomeController = new CmsHomeController();