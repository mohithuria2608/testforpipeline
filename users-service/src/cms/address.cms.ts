'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class AddressCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createAddresssOnCms(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let formObj: IUserCMSRequest.ICreateUser = {
                "email": payload.email,
                "phone": payload.fullPhnNo,
                "websiteId": "1",
                "firstName": payload.name,
                "lastName": payload.name,
                "password": payload.password,
                "sdm_user_ref": payload.sdmUserRef ? payload.sdmUserRef : 0,
                "sdm_corp_ref": payload.sdmCorpRef ? payload.sdmCorpRef : 0
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
            consolelog(process.cwd(), 'createAddresssOnCms', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const AddressCMSE = new AddressCMSEntity()
