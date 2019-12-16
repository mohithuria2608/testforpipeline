import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseCMS {
    private rp = require('request-promise');
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
                consolelog(process.cwd(), "In request manager options", options, true)

                this.rp(options)
                    .then(function (body) {
                        consolelog(process.cwd(), "In request manager body", JSON.stringify(body), true)
                        resolve(body)
                    })
                    .catch(function (err) {
                        consolelog(process.cwd(), "In request manager err", err, true)

                        if (err.statusCode && err.error && err.message) {
                            reject(err)
                        } else
                            reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                    })
            } catch (error) {
                consolelog(process.cwd(), 'RequestManager', error, false)
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
            consolelog(process.cwd(), 'cmsRes', cmsRes, false)

            return cmsRes
        } catch (error) {
            consolelog(process.cwd(), 'auth', error, false)
            return (error)
        }
    }
}