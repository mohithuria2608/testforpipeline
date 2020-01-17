'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class CartCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createCart(formObj: ICartCMSRequest.ICreateCartCms): Promise<ICartCMSRequest.ICmsCartRes> {
        try {
            const headers = {};
            const form = formObj;
            const options: ICommonRequest.IReqPromiseOptions = {
                method: Constant.CMS.END_POINTS.CREATE_CART.METHOD,
                url: Constant.CMS.END_POINTS.CREATE_CART.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            return cmsRes[0]
        } catch (error) {
            consolelog(process.cwd(), 'createCart', error, false)
            return Promise.reject(error)
        }
    }

}

export const CartCMSE = new CartCMSEntity()
