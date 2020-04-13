'use strict';
import * as config from "config"
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, getFrequency } from '../utils'
import * as Joi from '@hapi/joi';


export class OrdercronClass extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.ORDERCRON)
    }
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'mongoOrderRef',
            index: 'idx_' + this.set + '_' + 'mongoOrderRef',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'mOrdercron',
            index: 'idx_' + this.set + '_' + 'mOrdercron',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'cmsOrderRef',
            index: 'idx_' + this.set + '_' + 'cmsOrderRef',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'sdmOrderStatus',
            index: 'idx_' + this.set + '_' + 'sdmOrderStatus',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'status',
            index: 'idx_' + this.set + '_' + 'status',
            type: "STRING"
        }
    ]

    public ordercronSchema = Joi.object().keys({
        sdmOrderRef: Joi.number().required().description("pk"),
        mOrdercron: Joi.number().required().description("sk"),
        mongoOrderRef: Joi.number().required().description("sk"),
        cmsOrderRef: Joi.number().required().description("sk"),
        status: Joi.string().valid(Constant.CONF.ORDER_STATUS.CART.MONGO,
            Constant.CONF.ORDER_STATUS.PENDING.MONGO,
            Constant.CONF.ORDER_STATUS.CONFIRMED.MONGO,
            Constant.CONF.ORDER_STATUS.BEING_PREPARED.MONGO,
            Constant.CONF.ORDER_STATUS.READY.MONGO,
            Constant.CONF.ORDER_STATUS.ON_THE_WAY.MONGO,
            Constant.CONF.ORDER_STATUS.DELIVERED.MONGO,
            Constant.CONF.ORDER_STATUS.CANCELED.MONGO,
            Constant.CONF.ORDER_STATUS.FAILURE.MONGO),
        sdmOrderStatus: Joi.number()
    })

    async deleteOrdercronTigger(change) {
        try {
            return {}
        } catch (error) {
            consolelog(process.cwd(), "deleteOrdercronTigger", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const OrdercronE = new OrdercronClass()
