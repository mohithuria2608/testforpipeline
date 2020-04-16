import * as config from 'config'
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class PromotionController {
    constructor() { }

    /**
    * @method GRPC
    * @param {string} data  actuall array of promotions
    */
    async syncPromoFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {

            let data = JSON.parse(payload.as.argv);
            await ENTITY.PromotionE.removeAllPromotions();
            if (payload.as.create || payload.as.update || payload.as.get) {
                for (let promotion of data) {
                    ENTITY.PromotionE.savePromotion(promotion, { createOrReplace: true });
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncPromoFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @description gets the list of promotions
    * @param {number=} page
    * */
    async getPromotionsList(headers: ICommonRequest.IHeaders, payload: IPromotionRequest.IGetPromotion) {
        try {
            if (config.get("sdm.promotion.default")) {
                return {
                    list: [],
                    nextPage: -1,
                    currentPage: parseInt(payload.page.toString())
                }
            }
            let promolist = await ENTITY.PromotionE.getPromotion({})
            // promolist.filter(obj => {
            //     if (new Date(obj.dateFrom).getTime() < new Date().getTime() &&
            //         new Date().getTime() < new Date(obj.dateTo).getTime()) {
            //         return obj
            //     }
            // })
            let returnList = promolist.slice(((parseInt(payload.page.toString()) - 1) * 10), (parseInt(payload.page.toString()) * 10))
            return {
                list: returnList,
                nextPage: promolist[((parseInt(payload.page.toString()) * 10) + 1)] ? parseInt(payload.page.toString()) + 1 : -1,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (error) {
            consolelog(process.cwd(), "getPromotionsList", JSON.stringify(error), false)
            return Promise.reject(error)
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
            if (promo && promo.length > 0) {
                if (new Date(promo[0].dateFrom).getTime() < new Date().getTime() &&
                    new Date().getTime() < new Date(promo[0].dateTo).getTime()) {
                    return { isValid: true, ...promo[0] }
                } else
                    return { isValid: false }
            } else
                return { isValid: false }
        } catch (error) {
            consolelog(process.cwd(), "validatePromotion", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const promotionController = new PromotionController();