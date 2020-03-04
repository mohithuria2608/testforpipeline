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
            await ENTITY.LocationE.fetchLocationFromSDM(payload);
            kafkaService.kafkaSync({ set: Constant.SET_NAME.LOCATION, cms: { create: true, argv: JSON.stringify({ event: "location_sync" }) }, inQ: true });
        } catch (error) {
            consolelog(process.cwd(), "syncLocationData", error, false)
            return Promise.reject(error)
        }
    }
}

export const sdmLocationController = new SdmLocationController();