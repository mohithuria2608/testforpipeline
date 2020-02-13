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
                // "country_id": "en",
                // "zip": "201301",
                // "city": "noida",
                // "state": "up",
                // "street": "b-25 noida",
                // "latitude": "89.000333",
                // "longitude": "32.334343",
                // "description": "description",
                // "address_is": "1",
                // "address_type": "dsds",
                // "use_in_reg": "1",
                // "alternate_phone": "9876543200"
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

    async updateCostomer(payload) {
        try {
            return {}
        } catch (error) {
            consolelog(process.cwd(), 'updateCostomer', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const UserCMSE = new UserCMSEntity()
