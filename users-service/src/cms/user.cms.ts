'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'
import { rejects } from "assert";

export class UserCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createCustomer(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let formObj: IUserCMSRequest.ICreateUser = {
                "email": payload.email,
                "phone": payload.fullPhnNo,
                "websiteId": "1",
                "firstName": payload.name,
                "lastName": payload.name,
                "password": payload.password,
                "sdmUserRef": payload.sdmUserRef,
                "sdmCorpRef": payload.sdmCorpRef
            }
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.CREATE_USER.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.CREATE_USER.URL,
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0]['success'])
                    return cmsRes[0]
                else
                    return Promise.reject(cmsRes[0]['error_message'])
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'createCustomer', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateCustomer(payload: IUserRequest.IUserData): Promise<any> {
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
            if (payload.sdmUserRef)
                formObj['sdmUserRef'] = payload.sdmUserRef
            if (payload.sdmCorpRef)
                formObj['sdmCorpRef'] = payload.sdmCorpRef
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.UPDATE_USER.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.UPDATE_USER.URL,
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0]['success'])
                    return cmsRes[0]
                else
                    return Promise.reject(cmsRes[0]['error_message'])
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'updateCustomer', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getCustomer(payload: IUserCMSRequest.IGetUser): Promise<any> {
        try {
            let formObj = {
                "websiteId": "1",
            }
            if (payload.cmsUserRef)
                formObj['customerId'] = payload.cmsUserRef
            else
                formObj['customerId'] = ""
            if (payload.email)
                formObj['email'] = payload.email
            else
                formObj['email'] = ""
            if (payload.fullPhnNo)
                formObj['phone'] = payload.fullPhnNo
            else
                formObj['phone'] = ""
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.GET_USER.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.GET_USER.URL,
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0]['success'])
                    return cmsRes[0]
                else
                    return {}
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'getCustomer', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const UserCMSE = new UserCMSEntity()
