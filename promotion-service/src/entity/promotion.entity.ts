'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class PromotionClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    constructor() {
        super('promotion')
    }

    async post(data) {
        try {
            data = this.filterPromotionData(data);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.couponId,
                replace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "post promotion", error, false)
            return Promise.reject(error)
        }
    }

    /** updates promotion data */
    filterPromotionData(promotionPayload) {
        promotionPayload.dateFrom = new Date(promotionPayload.dateFrom).toISOString();
        promotionPayload.dateTo = new Date(promotionPayload.dateTo).toISOString();
        return promotionPayload;
    }

    /**
     * @method GRPC
     */
    async getPromotions() {
        try {
            let getArg: IAerospike.Scan = {
                set: this.set
            }
            let promotionsList = await Aerospike.scan(getArg)
            return promotionsList
            // if (menu && menu.id) {
            //     return menu
            // } else
            //     return Promise.reject(Constant.STATUS_MSG.ERROR.E409.MENU_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getById", error, false)
            return Promise.reject(error)
        }
    }

    // /**
    //  * @method GRPC
    //  * @param {string} data :data of the promotion
    //  */
    // async createPromotion(payload: IPromotionGrpcRequest.ICreatePromotion) {
    //     let parsedPayload = JSON.parse(payload.data);
    //     return this.post(parsedPayload.data);
    // }
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
 *
 */
