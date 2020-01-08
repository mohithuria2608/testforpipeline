'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService, kafkaService } from '../grpc/client'
import { consolelog } from '../utils'


export class PromotionEntity extends BaseEntity {
    constructor() {
        super('promotion')
    }

    /**
     * creates a new promotion on the aerospike from the CMS
     */
    async createPromotion(payload: ICMSPromotionRequest.ICmsPromotion) {
        try {
            kafkaService.createPromotion({ action: { create: true }, data: JSON.stringify(payload) });
        } catch (err) {
            consolelog(process.cwd(), "createPromotion", err, false)
            return Promise.reject(err)
        }
    }
}

export const PromotionE = new PromotionEntity()