'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { kafkaService } from '../grpc/client'

export class UserEntity extends BaseEntity {
    constructor() {
        super('user')
    }

    async syncUserToKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            kafkaService.kafkaSync(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncUserToKafka", error, false)
            return Promise.reject(error)
        }
    }
}

export const UserE = new UserEntity()
