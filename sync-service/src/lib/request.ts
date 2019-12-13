
'use strict';
import * as config from 'config'
import * as utils from '../utils'
import * as Constant from '../constant/appConstants'
const rp = require('request-promise');

export class RequestManager {

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
                utils.consolelog("In request manager options", options, true)

                rp(options)
                    .then(function (body) {
                        utils.consolelog("In request manager body", JSON.stringify(body), true)
                        resolve(body)
                    })
                    .catch(function (err) {
                        utils.consolelog("In request manager err", err, true)

                        if (err.statusCode && err.error && err.message) {
                            reject(err)
                        } else
                            reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                    })
            } catch (error) {
                utils.consolelog('RequestManager', error, false)
                reject(error)
            }
        })
    }
}

export const requestLib = new RequestManager()
