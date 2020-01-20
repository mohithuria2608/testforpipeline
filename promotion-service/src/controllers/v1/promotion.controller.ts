import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { userService, orderService } from '../../grpc/client';

export class PromotionController {
    constructor() { }

    /**
    * @method GRPC
    * @param {string} data  actuall array of promotions
    */
    async syncPromoFromKafka(payload: IPromotionGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                for (let promotion of data) {
                    ENTITY.PromotionE.savePromotion(promotion, { createOrReplace: true });
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncPromoFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @description : Post bulk promotion data
     * */
    async postPromotion() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/promotion.json', 'utf-8');
            let promo = JSON.parse(rawdata);

            for (const iterator of promo) {
                ENTITY.PromotionE.post(iterator, { create: true })
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
    * @param {number=} page
    * */
    async getPromotionsList(headers: ICommonRequest.IHeaders, payload: IPromotionRequest.IGetPromotion) {
        try {
            let promolist = await ENTITY.PromotionE.getPromotion({})
            let returnList = promolist.slice(((parseInt(payload.page.toString()) - 1) * 10), (parseInt(payload.page.toString()) * 10))
            return {
                list: returnList,
                nextPage: promolist[((parseInt(payload.page.toString()) * 10) + 1)] ? parseInt(payload.page.toString()) + 1 : -1,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (err) {
            consolelog(process.cwd(), "getPromotionsList", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @description validate promotion    
    * @param {string=} couponCode
    * */
    async validatePromotion(payload: IPromotionRequest.IValidatePromotion) {
        try {
            let promo = await ENTITY.PromotionE.getPromotion({ couponCode: payload.couponCode })
            return { isValid: true }
            if ((new Date().toISOString() > new Date(promo[0].dateFrom).toISOString()) && (new Date().toISOString() < new Date(promo[0].dateTo).toISOString())) {
                return { isValid: true }
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROMO_EXPIRED)
        } catch (error) {
            consolelog(process.cwd(), "validatePromotion", error, false)
            return Promise.reject(error)
        }
    }
}

export const promotionController = new PromotionController();