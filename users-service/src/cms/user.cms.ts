'use strict';
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
                customer: {
                    firstname: payload.name,
                    lastname: payload.name,
                    email: payload.email,
                    store_id: 1,// payload.storeId,
                    website_id: 1,//payload.websiteId,
                    addresses: []
                },
                password: payload.password
            }

            // let authApiLastHit = global[Constant.CMS.GLOBAL_VAR.AUTH_API_HIT] ? global[Constant.CMS.GLOBAL_VAR.AUTH_API_HIT] : 0
            // let auth = global[Constant.CMS.GLOBAL_VAR.AUTH_TOKEN]
            // if (authApiLastHit + Constant.SERVER.CMS_AUTH_EXP < new Date().getTime()) {
            //     let authapi = await this.auth()
            //     global[Constant.CMS.GLOBAL_VAR.AUTH_TOKEN] = authapi
            //     auth = global[Constant.CMS.GLOBAL_VAR.AUTH_TOKEN]
            // }

            // consolelog(process.cwd(), "auth", auth, false)

            // const headers = {};
            // headers['Authorization'] = "bearer" + auth
            // const form = formObj;
            // const options = {
            //     method: Constant.CMS.END_POINTS.AUTH.METHOD,
            //     url: config.get("cms.baseUrl") + Constant.CMS.END_POINTS.AUTH.URL,
            // }
            // let cmsRes = await this.request(options, headers, form)
            // return cmsRes
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
