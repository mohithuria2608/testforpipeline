import * as config from "config"
import * as rp from 'request-promise';
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseCMS {
    constructor() {
    }

    async request(options: ICommonRequest.IReqPromiseOptions, headers: object, parameter: object): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let params = {
                method: options.method,
                url: options.url,
                headers: headers,
                json: true
            }
            if (options.form) {
                params['form'] = parameter
            }
            else if (options.formData) {
                params[''] = parameter
            }
            else if (options.qs) {
                params['qs'] = parameter
            }
            else {
                params['body'] = parameter
            }
            consolelog(process.cwd(), "In request manager options", JSON.stringify(params), true)

            rp(params)
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

    // async auth() {
    //     try {
    //         const headers = {};
    //         const form = {
    //             "username": config.get("cms.auth.username"),
    //             "password": config.get("cms.auth.password")
    //         }
    //         const options = {
    //             method: Constant.CMS.END_POINTS.AUTH.METHOD,
    //             url: Constant.CMS.END_POINTS.AUTH.URL
    //         }
    //         let cmsRes = await this.request(options, headers, form)
    //         global[Constant.CMS.GLOBAL_VAR.AUTH_API_HIT] = new Date().getTime();
    //         consolelog(process.cwd(), 'cmsRes', cmsRes, false)

    //         return cmsRes
    //     } catch (error) {
    //         consolelog(process.cwd(), 'auth', error, false)
    //         return (error)
    //     }
    // }
}