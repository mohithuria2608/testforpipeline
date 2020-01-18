import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { userService, orderService } from '../../grpc/client';
import * as CMS from "../../cms";

export class PromotionController {
    constructor() { }

    /**
    * @method GRPC
    * @param {string} data  actuall array of menu or upsell
    */
    async syncPromoFromKafka(payload: IPromotionGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update) {

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
                ENTITY.PromotionE.bootstrapPromo(iterator)
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
            let testlist = await ENTITY.PromotionE.getPromotion({})
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

    /**
    * @method INTERNAL
    * @description Apply promotion    
    * @param {string=} cartId
    * @param {string=} couponCode
    */
    async applyPromotion(headers: ICommonRequest.IHeaders, payload: IPromotionRequest.IApplyPromotion, auth: ICommonRequest.AuthorizationObj) {
        try {
            let validPromo = await this.validatePromotion({ couponCode: payload.couponCode })
            if (!validPromo.isValid)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_PROMO)
            let getCartData = await orderService.getCart({ cartId: payload.cartId })

            let cmsValidatedPromo = await CMS.PromotionCMSE.applyCoupon({ cart_id: getCartData.cmsCartRef, coupon_code: payload.couponCode })
            // [{\"cart_items\":[],\"cms_cart_id\":\"65\",\"currency_code\":\"AED\",\"subtotal\":69.74,\"grandtotal\":66.25,\"discount_amt\":3.49,\"tax\":[],\"not_available\":[],\"is_price_changed\":false,\"coupon_code\":\"KFC 10\",\"success\":true}]","timestamp":"2020-01-17T09:18:58.950Z"}
            let res = await ENTITY.PromotionE.updateCart(payload.cartId, cmsValidatedPromo)
            return res
        } catch (err) {
            consolelog(process.cwd(), "applyPromotion", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @description remove promotion     
    * @param {string=} cartId
    * */
    async removePromotion(headers: ICommonRequest.IHeaders, payload: IPromotionRequest.IRemovePromotion, auth: ICommonRequest.AuthorizationObj) {
        try {
            let getCartData = await orderService.getCart({ cartId: payload.cartId })
            let removePromo = await CMS.PromotionCMSE.removeCoupon({ cart_id: getCartData.cmsCartRef, coupon_code: "" })
            let res = await ENTITY.PromotionE.updateCart(payload.cartId, removePromo)
            return res
        } catch (err) {
            consolelog(process.cwd(), "removePromotion", err, false)
            return Promise.reject(err)
        }
    }
}

export const promotionController = new PromotionController();