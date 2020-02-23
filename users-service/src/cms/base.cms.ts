import * as config from "config"
import * as rp from 'request-promise';
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { kafkaService } from '../grpc/client'

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
                    kafkaService.kafkaSync({
                        set: Constant.SET_NAME.LOGGER,
                        mdb: {
                            create: true,
                            argv: JSON.stringify({
                                type: Constant.DATABASE.TYPE.ACTIVITY_LOG.CMS_REQUEST,
                                info: {
                                    request: {
                                        body: params
                                    },
                                    response: body
                                },
                                description: options.url,
                                options: {
                                    env: Constant.SERVER.ENV[config.get("env")],
                                },
                                createdAt: new Date().getTime(),
                            })
                        }
                    })
                    consolelog(process.cwd(), "In request manager body", JSON.stringify(body), true)
                    resolve(body)
                })
                .catch(function (error) {
                    kafkaService.kafkaSync({
                        set: Constant.SET_NAME.LOGGER,
                        mdb: {
                            create: true,
                            argv: JSON.stringify({
                                type: Constant.DATABASE.TYPE.ACTIVITY_LOG.CMS_REQUEST,
                                info: {
                                    request: {
                                        body: params
                                    },
                                    response: error
                                },
                                description: options.url,
                                options: {
                                    env: Constant.SERVER.ENV[config.get("env")],
                                },
                                createdAt: new Date().getTime(),
                            })
                        }
                    })
                    consolelog(process.cwd(), "In request manager err", error.message, true)
                    reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
                })
        })
    }
}