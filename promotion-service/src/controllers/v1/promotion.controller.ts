import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class PromotionController {
    constructor() { }

    /**
     * @method POST
     * @description : Post bulk promotion data
     * */
    async postPromotion() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/promotion.json', 'utf-8');
            let promo = JSON.parse(rawdata);
            for (const iterator of promo) {
                ENTITY.PromotionE.post(iterator)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postPromotion", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @description gets the list of promotions
    * */
    async getPromotionsList(headers: ICommonRequest.IHeaders, payload: IPromotionRequest.IGetPromotion) {
        try {
            let testlist = await ENTITY.PromotionE.getPromotions({})
            let returnList = testlist.slice(((parseInt(payload.page.toString()) - 1) * 10), (parseInt(payload.page.toString()) * 10))
            return {
                list: returnList,
                nextPage: testlist[((parseInt(payload.page.toString()) * 10) + 1)] ? parseInt(payload.page.toString()) + 1 : -1,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (err) {
            consolelog(process.cwd(), "getPromotionsList", err, false)
            return Promise.reject(err)
        }
    }
}

export const promotionController = new PromotionController();