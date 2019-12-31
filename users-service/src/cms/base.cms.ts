import * as config from "config"
import * as rp from 'request-promise';
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseCMS {
    constructor() {
    }

    async request(method: string, url: string, headers: object, form: object) {
        return new Promise(async (resolve, reject) => {
            let options = {
                method: method,
                url: url,
                headers: headers,
                body: form,
                json: true
            }
            if (method == "GET")
                options['qs'] = form
            consolelog(process.cwd(), "In request manager options", JSON.stringify(options), true)

            rp(options)
                .then(function (body) {
                    consolelog(process.cwd(), "In request manager body", JSON.stringify(body), true)
                    resolve(body)
                })
                .catch(function (err) {
                    consolelog(process.cwd(), "In request manager err", err.message, true)
                    if (err.statusCode || err.error || err.message) {
                        reject(err.message)
                    }
                    else
                        reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                })
        })
    }

    async auth() {
        try {
            const method = Constant.CMS.END_POINTS.AUTH.METHOD;
            const url = Constant.CMS.END_POINTS.AUTH.URL
            const headers = {};
            const form = {
                "username": config.get("cms.auth.username"),
                "password": config.get("cms.auth.password")
            }
            let cmsRes = await this.request(method, url, headers, form)
            global[Constant.CMS.GLOBAL_VAR.AUTH_API_HIT] = new Date().getTime();
            consolelog(process.cwd(), 'cmsRes', cmsRes, false)

            return cmsRes
        } catch (error) {
            consolelog(process.cwd(), 'auth', error, false)
            return (error)
        }
    }
}