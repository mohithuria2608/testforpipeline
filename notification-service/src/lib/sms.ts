'use strict';
import * as config from 'config'
import * as Helper from "../utils/helper";
import * as request from "request";
import { consolelog } from '../utils'
const exec = require('child_process').exec;
import { kafkaService } from '../grpc/client'
import * as Constant from '../constant'

export class SmsCLass {
    private host = config.get("sms.host")
    private port = config.get("sms.port")
    private userName = config.get("sms.userName")
    private password = config.get("sms.password")
    private endPoint = config.get("sms.endPoint")
    private source = config.get("sms.source")

    constructor() { }

    async sendSMS(payload: ISmsRequest.ISingleSms) {
        if (process.env.NODE_ENV == "staging")
            return {}
        else
            return new Promise((resolve, reject) => {
                payload.message = Helper.utfConverter(payload.message);
                request.get(
                    `https://${this.host}/${this.endPoint}?username=${this.userName}&password=${this.password}&type=2&dlr=0&destination=${payload.destination}&source=${this.source}&message=${payload.message}`,
                    function (err, data, b) {
                        kafkaService.kafkaSync({
                            set: Constant.SET_NAME.LOGGER,
                            mdb: {
                                create: true,
                                argv: JSON.stringify({
                                    type: Constant.DATABASE.TYPE.ACTIVITY_LOG.SMS,
                                    info: {
                                        request: {
                                            body: payload
                                        },
                                        response: err ? err : b
                                    },
                                    description: `https://${this.host}/${this.endPoint}?username=${this.userName}&password=${this.password}&type=2&dlr=0&destination=${payload.destination}&source=${this.source}&message=${payload.message}`,
                                    options: {
                                        env: Constant.SERVER.ENV[config.get("env")],
                                    },
                                    createdAt: new Date().getTime(),
                                })
                            },
                            inQ: true
                        })
                        if (err) { reject(err); }
                        else {
                            console.log("--> ", b);
                            resolve({ success: true, data: b });
                        }
                    }
                );
            });
    }
}

export const smsLib = new SmsCLass()