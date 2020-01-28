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
                headers: headers
            }
            if (options.form) {
                params['form'] = parameter
            }
            else if (options.formData) {
                params['formData'] = parameter
            }
            else if (options.qs) {
                params['qs'] = parameter
            }
            else if (options.body) {
                params['body'] = parameter
                params['json'] = true
            }
            consolelog(process.cwd(), "In request manager options", JSON.stringify(params), true)

            rp(params)
                .then(function (body) {
                    consolelog(process.cwd(), "In request manager body", JSON.stringify(body), true)
                    resolve(body)
                })
                .catch(function (error) {
                    consolelog(process.cwd(), "In request manager err", error.message, true)
                    if (error.statusCode || error.error || error.message) {
                        reject(error.message)
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
    //             url: config.get("cms.baseUrl") + Constant.CMS.END_POINTS.AUTH.URL,
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