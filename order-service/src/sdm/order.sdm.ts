'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog } from '../utils'
import * as  _ from 'lodash';

export class OrderSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    /**
    * @method SDK
    * */
    async createOrder(payload: IOrderSdmRequest.ICreateOrder) {
        try {
            
            return {}
        } catch (error) {
            consolelog(process.cwd(), 'createOrder', error, false)
            return (error)
        }
    }
}

export const OrderSDME = new OrderSDMEntity()
