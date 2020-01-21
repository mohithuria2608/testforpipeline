'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class OrderCMSEntity extends BaseCMS {
    constructor() {
        super()
    }
}

export const OrderCMSE = new OrderCMSEntity()
