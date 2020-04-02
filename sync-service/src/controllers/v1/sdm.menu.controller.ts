import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { kafkaService } from '../../grpc/client';
import * as ENTITY from '../../entity'

export class SdmMenuController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async fetchMenuFromSDM(headers: ICommonRequest.IHeaders, payload: ISdmMenuRequest.ISdmMenu, auth: ICommonRequest.AuthorizationObj) {
        try {
            ENTITY.MenuE.fetchMenuFromSDM(payload);
            kafkaService.kafkaSync({
                set: Constant.SET_NAME.MENU_EN,
                cms: { create: true, argv: JSON.stringify({ event: "menu_sync" }) },
                inQ: false
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), "fetchMenuFromSDM", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const sdmMenuController = new SdmMenuController();