'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class PromotionClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'couponId',
            index: 'idx_' + this.set + '_' + 'couponId',
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
        couponId: Joi.string().trim().required().description("sk"),
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
     * @method Bootstrap
     */
    async post(data: IPromotionRequest.IPromoData, options: { create?: boolean, update?: boolean, replace?: boolean, createOrReplace?: boolean }) {
        try {
            data = this.filterPromotionData(data);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.couponId,
                ...options
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            return {}
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
            consolelog(process.cwd(), "save Promotion", JSON.stringify(error), false)
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
     * @param {number=} couponId
     * @param {string=} couponCode
     * @param {number=} page
     */
    async getPromotion(payload: IPromotionRequest.IGetPromotion): Promise<IPromotionRequest.IPromoData[]> {
        try {
            if (payload.couponCode || payload.couponId) {
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
                } else if (payload.couponId) {
                    queryArg = {
                        equal: {
                            bin: "couponId",
                            value: payload.couponId
                        },
                        set: this.set,
                        background: false,
                    }
                }
                let promo: IPromotionRequest.IPromoData[] = await Aerospike.query(queryArg)
                if (promo && promo.length > 0) {
                    return promo
                } else
                    return []
            } else {
                let getArg: IAerospike.Scan = {
                    set: this.set
                }
                let promotionsList = await Aerospike.scan(getArg)
                return promotionsList
            }
        } catch (error) {
            consolelog(process.cwd(), "getPromotions", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const PromotionE = new PromotionClass()

/**
 * promotion model
 *
 *  {
        "couponId": "1",
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
    couponId: Joi.string().trim().required().description("sk"),
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
