'use strict';
import * as config from "config"
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
                method: Constant.DATABASE.CMS.END_POINTS.CREATE_CART.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.CREATE_CART.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0].success)
                    return cmsRes[0]
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
            }
            else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'createCart', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const CartCMSE = new CartCMSEntity()
