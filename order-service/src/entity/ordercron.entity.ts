'use strict';
import * as config from "config"
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, getFrequency } from '../utils'
import { kafkaService, paymentService, notificationService, userService, promotionService, locationService } from '../grpc/client';
import { OrderSDME } from '../sdm';
import * as Joi from '@hapi/joi';


export class OrdercronClass extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.ORDERCRON)
    }
    public ordercronSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        position: Joi.number().required(),
    })

    async sdmReadyHandler() {
        try {

        } catch (error) {
            consolelog(process.cwd(), "sdmReadyHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const OrdercronE = new OrdercronClass()
