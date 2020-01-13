'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class PromotionClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    constructor() {
        super('promotion')
    }


    public promotionSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
    });

   

    
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
