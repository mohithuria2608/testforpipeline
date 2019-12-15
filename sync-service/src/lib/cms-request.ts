
'use strict';
import * as config from 'config'
import { consolelog } from '../utils'
import * as Constant from '../constant/appConstants'
import { CONNREFUSED } from 'dns';
const rp = require('request-promise');

export class CMSRequestManager {

    constructor() {
    }

    async request(method, url, headers, form) {
        return new Promise(async (resolve, reject) => {
            try {
                let options = {
                    method: method,
                    url: url,
                    headers: headers,
                    body: form,
                    json: true
                }
                if (method == "GET")
                    options['qs'] = form
                consolelog(process.cwd(),"In request manager options", options, true)

                rp(options)
                    .then(function (body) {
                        consolelog(process.cwd(),"In request manager body", JSON.stringify(body), true)
                        resolve(body)
                    })
                    .catch(function (err) {
                        consolelog(process.cwd(),"In request manager err", err, true)

                        if (err.statusCode && err.error && err.message) {
                            reject(err)
                        } else
                            reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                    })
            } catch (error) {
                consolelog(process.cwd(),'RequestManager', error, false)
                reject(error)
            }
        })
    }

    async auth() {
        try {
            const method = Constant.CMS.END_POINTS.AUTH.METHOD;
            const url = Constant.CMS.END_POINTS.AUTH.URL
            const headers = {};
            const form = Constant.CMS.AUTH_CRED;
            let cmsRes = await this.request(method, url, headers, form)
            global[Constant.CMS.GLOBAL_VAR.AUTH_API_HIT] = new Date().getTime();
            return cmsRes
        } catch (error) {
            consolelog(process.cwd(),'auth', error, false)
            return (error)
        }
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
            consolelog(process.cwd(),'createCostomer', error, false)
            return (error)
        }
    }
}

export const cmsRequestLib = new CMSRequestManager()
