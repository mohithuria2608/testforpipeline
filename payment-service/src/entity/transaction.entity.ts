'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, sendSuccess } from '../utils'
import { Aerospike } from '../databases/aerospike'


export class TransactionClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'userId',
            index: 'idx_' + this.set + '_' + 'userId',
            type: "STRING"
        }
    ]

    constructor() {
        super('transaction')
    }

    public transactionSchema = Joi.object().keys({
        userId: Joi.string().required().description("sk")
    })

    async func1(payload: IPaymentGrpcRequest.IFunc1) {
        return {}
    }
}

export const TransactionE = new TransactionClass()
