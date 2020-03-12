'use strict';
import * as config from "config"
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class OrderCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createOrder(formObj: IOrderCMSRequest.ICreateOrderCms): Promise<ICartCMSRequest.ICmsCartRes> {
        try {
            const headers = {};
            const form = formObj;
            const options: ICommonRequest.IReqPromiseOptions = {
                method: Constant.DATABASE.CMS.END_POINTS.CREATE_ORDER.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.CREATE_ORDER.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0].success)
                    return cmsRes[0]
                else
                    Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
            }
            else
                Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'createOrder', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateOrder(formObj: IOrderCMSRequest.IUpdateOrderCms): Promise<ICartCMSRequest.ICmsCartRes> {
        try {
            const headers = {};
            const form = formObj;
            const options: ICommonRequest.IReqPromiseOptions = {
                method: Constant.DATABASE.CMS.END_POINTS.UPDATE_ORDER.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.UPDATE_ORDER.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0].success)
                    return cmsRes[0]
                else
                    Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
            }
            else
                Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'updateOrder', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const OrderCMSE = new OrderCMSEntity()
