import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client';

export class SdmLocationController {

    constructor() { }

    /**
     * @method POST
     * */
    async syncLocationData() {
        try {
            await ENTITY.LocationE.fetchLocationFromSDM();
            kafkaService.kafkaSync({
                set: Constant.SET_NAME.LOCATION,
                cms: { create: true, argv: JSON.stringify({ event: "location_sync" }) },
                inQ: true
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncLocationData", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * */
    async syncStoreStatusData() {
        try {
            let storesStatusDataList = await ENTITY.LocationE.fetchStoresStatusFromSDM();
            kafkaService.kafkaSync({
                set: Constant.SET_NAME.LOCATION,
                as: { create: true, argv: JSON.stringify({ event: "store_status_sync", data: storesStatusDataList }) },
                inQ: true
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncStoreStatusData", error, false)
            return Promise.reject(error)
        }
    }
}

export const sdmLocationController = new SdmLocationController();