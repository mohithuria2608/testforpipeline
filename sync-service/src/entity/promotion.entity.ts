'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { kafkaService } from '../grpc/client'


export class PromotionEntity extends BaseEntity {
    constructor() {
        super('promotion')
    }

    async syncPromoToKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            kafkaService.kafkaSync(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncPromoToKafka", error, false)
            return Promise.reject(error)
        }
    }
}

export const PromotionE = new PromotionEntity()