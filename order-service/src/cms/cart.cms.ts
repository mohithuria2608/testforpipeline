'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class CartCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createCart(headersObj: ICartCMSRequest.IHeader, formObj: ICartCMSRequest.ICreateCart): Promise<ICartCMSRequest.ICreateCartRes> {
        try {
            
        } catch (error) {
            consolelog(process.cwd(), 'createCart', error, false)
            return Promise.reject(error)
        }
    }

}

export const CartCMSE = new CartCMSEntity()
