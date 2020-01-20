'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'
import * as CMS from "../cms";

export class PromotionClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'cmsCouponRef',
            index: 'idx_' + this.set + '_' + 'cmsCouponRef',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'couponCode',
            index: 'idx_' + this.set + '_' + 'couponCode',
            type: "STRING"
        },
    ]
    constructor() {
        super('promotion')
    }

    public promotionSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        cmsCouponRef: Joi.string().trim().required().description("sk"),
        couponCode: Joi.string().trim().required().description("sk"),
        promotionType: Joi.string().trim().required(),
        discountAmount: Joi.number().required(),
        maxDiscountApp: Joi.number().required(),
        usesPerCoupon: Joi.number().required(),
        usesPerCust: Joi.number().required(),
        timesUsed: Joi.number().required(),
        dateFrom: Joi.string().trim().required(),
        dateTo: Joi.string().trim().required(),
        ruleName: Joi.string().trim().required(),
        shortDesc: Joi.string().trim().required(),
        activeFlag: Joi.number().required(),
        posId: Joi.number().required(),
        maxDiscountAmt: Joi.number().required(),
        isVisible: Joi.number().required(),
        termsAndCond: Joi.string().trim().required()
    });

    /**
     * @method INTERNAL
     */
    async post(data: IPromotionRequest.IPromoData, options: { create?: boolean, update?: boolean, replace?: boolean, createOrReplace?: boolean }) {
        try {
            data = this.filterPromotionData(data);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.cmsCouponRef,
                ...options
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "post promotion", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method INTERNAL
     * @description inserts promotion into aerospike
     */
    async savePromotion(data: IPromotionRequest.IPromoData, options: { create?: boolean, update?: boolean, replace?: boolean, createOrReplace?: boolean }) {
        try {
            return this.post(data, options);
        } catch (error) {
            consolelog(process.cwd(), "save Promotion", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method INTERNAL
     * @description :  updates promotion data
     */
    filterPromotionData(promotionPayload) {
        promotionPayload.dateFrom = new Date(promotionPayload.dateFrom).toISOString();
        promotionPayload.dateTo = new Date(promotionPayload.dateTo).toISOString();
        return promotionPayload;
    }

    /**
     * @method GRPC/INTERNAL
     * @param {number=} cmsCouponRef
     * @param {string=} couponCode
     * @param {number=} page
     */
    async getPromotions(payload: IPromotionRequest.IGetPromotion): Promise<IPromotionRequest.IPromoData[]> {
        try {
            if (payload.couponCode || payload.cmsCouponRef) {
                let queryArg: IAerospike.Query
                if (payload.couponCode) {
                    queryArg = {
                        equal: {
                            bin: "couponCode",
                            value: payload.couponCode
                        },
                        set: this.set,
                        background: false,
                    }
                } else if (payload.cmsCouponRef) {
                    queryArg = {
                        equal: {
                            bin: "cmsCouponRef",
                            value: payload.cmsCouponRef
                        },
                        set: this.set,
                        background: false,
                    }
                }
                let promo: IPromotionRequest.IPromoData[] = await Aerospike.query(queryArg)
                if (promo && promo.length > 0) {
                    return promo
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.PROMO_NOT_FOUND)
            } else {
                let getArg: IAerospike.Scan = {
                    set: this.set
                }
                let promotionsList = await Aerospike.scan(getArg)
                return promotionsList
            }
        } catch (error) {
            consolelog(process.cwd(), "getPromotions", error, false)
            return Promise.reject(error)
        }
    }


    /**
     * @method INTERNAL
     * @param {string=} cartId
     * @param {string=} couponCode
     */
    async validatePromoOnCms(payload: IPromotionRequest.IApplyPromotion) {
        try {
            let res = await CMS.PromotionCMSE.applyCoupon({ cartId: payload.cartId, couponCode: payload.couponCode })
            return res[0]
        } catch (error) {
            consolelog(process.cwd(), "validatePromoOnCms", error, false)
            return Promise.reject(error)
        }
    }
}

export const PromotionE = new PromotionClass()

/**
 * promotion model
 *
 *  {
        "cmsCouponRef": "1",
        "couponCode": "KFC 10",
        "promotionType": "by_percent",
        "discountAmount": "10.0000",
        "maximumQtyDiscountIsAppliedTo": "1.0000",
        "usesPerCoupon": "1000",
        "usesPerCustomer": "10",
        "timesUsed": "1",
        "dateFrom": "2019-12-01",
        "dateTo": "2019-12-30",
        "ruleName": "10% off upto max 10",
        "shortDescription": "%s discount off with a cap of the max amount",
        "activeFlag": "1",
        "posId": "",
        "maxDiscountAmount": "",
        "isVisible": "",
        "termsAndConditions": ""
    }

    id: Joi.number().required().description("pk"),
    cmsCouponRef: Joi.string().trim().required().description("sk"),
    couponCode: Joi.string().trim().required().description("sk"),
    promotionType: Joi.string().trim().required(),
    discountAmount: Joi.number().required(),
    maxDiscountApp: Joi.number().required(),
    usesPerCoupon: Joi.number().required(),
    usesPerCust: Joi.number().required(),
    timesUsed: Joi.number().required(),
    dateFrom: Joi.string().trim().required(),
    dateTo: Joi.string().trim().required(),
    ruleName: Joi.string().trim().required(),
    shortDesc: Joi.string().trim().required(),
    activeFlag: Joi.number().required(),
    posId: Joi.number().required(),
    maxDiscountAmt: Joi.number().required(),
    isVisible: Joi.number().required(),
    termsAndCond: Joi.string().trim().required(),
 *
 */
