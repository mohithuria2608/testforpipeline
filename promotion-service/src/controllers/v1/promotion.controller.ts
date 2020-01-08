import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class PromotionController {
    constructor() { }

    /**
     * @method POST
     * @description : Post bulk menu data
     * */
    async postMenu() {
        try {
            // let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            // let menu = JSON.parse(rawdata);
            // for (const iterator of menu) {
            //     ENTITY.MenuE.post(iterator)
            // }
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postMenu", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @description gets the list of promotions
    * */
    async getPromotionsList(headers: ICommonRequest.IHeaders, payload: IPromotionRequest.IFetchPromotion) {
        try {
            return await ENTITY.PromotionE.getPromotions();
        } catch (err) {
            consolelog(process.cwd(), "fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const promotionController = new PromotionController();