'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class UserCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createCostomer(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let formObj: IUserCMSRequest.ICreateUser = {
                "email": payload.email,
                "phone": payload.fullPhnNo,
                "websiteId": "1",
                "firstname": payload.name,
                "lastname": payload.name,
                "password": "123456",
            }
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.CREATE_USER.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.CREATE_USER.URL,
            }
            let cmsRes = await this.request(options, headers, form)
            return cmsRes
        } catch (error) {
            consolelog(process.cwd(), 'createCostomer', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateCostomer(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let formObj: IUserCMSRequest.IUpdateUser = {
                "customerId": payload.cmsUserRef,
                "websiteId": "1",
                "alternatePhone": ""
            }
            if (payload.email)
                formObj['email'] = payload.email
            if (payload.fullPhnNo)
                formObj['phone'] = payload.fullPhnNo
            if (payload.name) {
                formObj['firstName'] = payload.name
                formObj['lastName'] = payload.name
            }
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.UPDATE_USER.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.UPDATE_USER.URL,
            }
            let cmsRes = await this.request(options, headers, form)
            return cmsRes
        } catch (error) {
            consolelog(process.cwd(), 'updateCostomer', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const UserCMSE = new UserCMSEntity()
