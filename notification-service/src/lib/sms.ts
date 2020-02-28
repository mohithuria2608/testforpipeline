'use strict';
import * as config from 'config'
import * as request from "request";
import { consolelog } from '../utils'
const exec = require('child_process').exec;

export class SmsCLass {
    private host = config.get("sms.host")
    private port = config.get("sms.port")
    private userName = config.get("sms.userName")
    private password = config.get("sms.password")
    private endPoint = config.get("sms.endPoint")
    private source = config.get("sms.source")

    constructor() { }

    singleSms(payload: ISmsRequest.ISingleSms) {
        try {
            // https://sms.rmlconnect.net/bulksms/bulksms?dlr=1&destination=971503934048&message=06450631062D0628062700200645062706460648062C&username=Adigital&password=vSqKeZdc&source=KFC&type=2
            let url = `https://${this.host}/${this.endPoint}?username=${this.userName}&password=${this.password}&type=${payload.type}&dlr=${payload.dlr}&destination=${payload.destination}&source=${this.source}&message=${payload.message}`
            let command = `curl -X GET ${url}`
            consolelog(process.cwd(), 'singleSms command:', command, true)

            exec(command, function (error, stdout, stderror) {
                consolelog(process.cwd(), 'singleSms stdout:', stdout, true)
                consolelog(process.cwd(), 'singleSms stderr:', JSON.stringify(error), false)
                if (error !== null) {
                    consolelog(process.cwd(), 'singleSms exec:', JSON.stringify(error), false)
                }
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), "sms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async sendSMS(payload: ISmsRequest.ISingleSms) {
        return new Promise((resolve, reject) => {
            request.get(
                `https://${this.host}/${this.endPoint}?username=${this.userName}&password=${this.password}&type=${payload.type}&dlr=${payload.dlr}&destination=${payload.destination}&source=${this.source}&message=${payload.message}`,
                function (err, data, b) {
                    if (err) { reject(err); }
                    else { resolve(b); }
                }
            );
        });
    }
}

export const sms = new SmsCLass()