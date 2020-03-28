import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class CmsLocationController {

    constructor() { }

    /**
     * @method POST
     * @description syncs stores
     * @param {any} data
    */
    async postLocationData(headers: ICommonRequest.IHeaders, payload: ICmsMenuRequest.ICmsMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            payload['type'] = Constant.SET_NAME.LOCATION
            let locationData = {
                set: ENTITY.LocationE.set,
                as: {
                    create: true,
                    argv: JSON.stringify({ event: "location_sync", data: payload.data })
                },
                inQ: false // bypass queue, because data is too large. change to true
            }
            if (payload.action == "update") {
                locationData['as']['update'] = true
                delete locationData['as']['create']
            }
            kafkaService.kafkaSync(locationData);
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postLocationData", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsLocationController = new CmsLocationController();