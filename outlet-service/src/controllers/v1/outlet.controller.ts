import * as Constant from '../../constant'
import { cryptData, consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class OutletController {

    constructor() { }

    /**
     * @method GET
     * */
    async getOutletByCoord(headers: ICommonRequest.IHeaders, payload: IOutletRequest.IGetOutletByCoord) {
        try {

        } catch (err) {
            consolelog("getOutletByCoord", err, false)
            return Promise.reject(err)
        }
    }
}

export const outletController = new OutletController();