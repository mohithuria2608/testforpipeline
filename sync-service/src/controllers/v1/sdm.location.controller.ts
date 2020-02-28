import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client';

export class SdmLocationController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async syncLocationData(headers: ICommonRequest.IHeaders, payload: ISdmMenuRequest.ISdmMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            let syncLocation = await ENTITY.LocationE.fetchLocationFromSDM(payload);
            if (syncLocation.success) {
                kafkaService.kafkaSync({ set: Constant.SET_NAME.LOCATION, cms: { create: true, argv: JSON.stringify(syncLocation) } })
            }
        } catch (error) {
            consolelog(process.cwd(), "postMenu", error, false)
            return Promise.reject(error)
        }
    }
}

export const sdmLocationController = new SdmLocationController();