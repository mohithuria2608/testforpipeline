'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class OrderCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createOrder(formObj: IOrderCMSRequest.ICreateOrderCms): Promise<IOrderCMSRequest.ICreateOrderCmsRes> {
        try {
            const headers = {};
            const form = formObj;
            const options: ICommonRequest.IReqPromiseOptions = {
                method: Constant.CMS.END_POINTS.CREATE_ORDER.METHOD,
                url: Constant.CMS.END_POINTS.CREATE_ORDER.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            return cmsRes[0]
        } catch (error) {
            consolelog(process.cwd(), 'createOrder', error, false)
            return Promise.reject(error)
        }
    }
}

export const OrderCMSE = new OrderCMSEntity()
