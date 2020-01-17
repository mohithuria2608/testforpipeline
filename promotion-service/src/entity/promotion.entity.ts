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
        id: Joi.string().trim().required().description("pk"),
        cmsCouponRef: Joi.string().trim().required().description("sk"),
        couponCode: Joi.string().trim().required().description("sk"),
        promotionType: Joi.string().trim().required(),
        discountAmount: Joi.string().trim().required(),
        maximumQtyDiscountIsAppliedTo: Joi.string().trim().required(),
        usesPerCoupon: Joi.string().trim().required(),
        usesPerCustomer: Joi.string().trim().required(),
        timesUsed: Joi.string().trim().required(),
        dateFrom: Joi.string().trim().required(),
        dateTo: Joi.string().trim().required(),
        ruleName: Joi.string().trim().required(),
        shortDescription: Joi.string().trim().required(),
        activeFlag: Joi.string().trim().required(),
        posId: Joi.string().trim().required(),
        maxDiscountAmount: Joi.string().trim().required(),
        isVisible: Joi.string().trim().required(),
        termsAndConditions: Joi.string().trim().required(),
    });

    /**
     * @method INTERNAL
     */
    async post(data: IPromotionRequest.IPromoData) {
        try {
            data = this.filterPromotionData(data);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.cmsCouponRef,
                create: true,
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
 *
 */
