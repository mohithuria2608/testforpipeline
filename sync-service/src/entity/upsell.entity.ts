
'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { kafkaService } from '../grpc/client'

export class UpsellClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super('upsell')
    }

    async syncUpsellToKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            kafkaService.kafkaSync(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncUpsellToKafka", error, false)
            return Promise.reject(error)
        }
    }
}

export const UpsellE = new UpsellClass()
