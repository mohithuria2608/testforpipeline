'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService, kafkaService } from '../grpc/client'
import { consolelog } from '../utils'


export class MenuEntity extends BaseEntity {
    constructor() {
        super('menu')
    }

    /**
     * make it dynamic for menu id and sub menu Id
     */
    async fetchMenuFromSDM(payload) {
        try {

        } catch (err) {
            consolelog(process.cwd(), "fetchMenuFromSDM", err, false)
            return Promise.reject(err)
        }
    }

    async syncMenuToKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            kafkaService.kafkaSync(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncMenuToKafka", error, false)
            return Promise.reject(error)
        }
    }
}

export const MenuE = new MenuEntity()