'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class UserCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createCostomer(headersObj, formObj) {
        try {
            let authApiLastHit = global[Constant.CMS.GLOBAL_VAR.AUTH_API_HIT] ? global[Constant.CMS.GLOBAL_VAR.AUTH_API_HIT] : 0
            let auth = global[Constant.CMS.GLOBAL_VAR.AUTH_TOKEN]
            if (authApiLastHit + Constant.SERVER.CMS_AUTH_EXP < new Date().getTime()) {
                let authapi = await this.auth()
                global[Constant.CMS.GLOBAL_VAR.AUTH_TOKEN] = authapi
                auth = global[Constant.CMS.GLOBAL_VAR.AUTH_TOKEN]
            }
            const method = Constant.CMS.END_POINTS.CREATE_CUSTOMER.METHOD; "POST";
            const url = Constant.CMS.END_POINTS.CREATE_CUSTOMER.URL;
            const headers = headersObj;
            headers['Authorization'] = "bearer" + auth
            const form = formObj;
            let cmsRes = await this.request(method, url, headers, form)
            return cmsRes
        } catch (error) {
            consolelog(process.cwd(), 'createCostomer', error, false)
            return (error)
        }
    }

}

export const UserCMSE = new UserCMSEntity()
