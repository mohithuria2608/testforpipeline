'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class PromotionCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async applyCoupon(payload: IPromotionCmsRequest.IApplyCoupon): Promise<IPromotionCmsRequest.ICmsCartRes> {
        try {
            const headers = {};
            const form = payload;
            const options = {
                method: Constant.CMS.END_POINTS.APPLY_COUPON.METHOD,
                url: Constant.CMS.END_POINTS.APPLY_COUPON.URL
            }
            let cmsRes = await this.request(options, headers, form)
            return cmsRes[0]
        } catch (error) {
            consolelog(process.cwd(), 'applyCoupon', error, false)
            return Promise.reject(error)
        }
    }

    async removeCoupon(payload: IPromotionCmsRequest.IRemoveCoupon): Promise<IPromotionCmsRequest.ICmsCartRes> {
        try {
            const headers = {};
            const form = payload;
            const options = {
                method: Constant.CMS.END_POINTS.APPLY_COUPON.METHOD,
                url: Constant.CMS.END_POINTS.APPLY_COUPON.URL
            }
            let cmsRes = await this.request(options, headers, form)
            return cmsRes[0]
        } catch (error) {
            consolelog(process.cwd(), 'removeCoupon', error, false)
            return Promise.reject(error)
        }
    }

}

export const PromotionCMSE = new PromotionCMSEntity()
