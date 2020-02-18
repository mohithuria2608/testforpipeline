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
                .catch(function (error) {
                    consolelog(process.cwd(), "In request manager err", error.message, true)
                    reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                    // if (error.statusCode || error.error || error.message) {
                    //     reject(error.message)
                    // }
                    // else
                    //     reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                })
        })
    }
}