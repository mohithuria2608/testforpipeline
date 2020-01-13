'use strict';
import * as config from 'config'
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

        let url = `http://${this.host}:${this.port}${this.endPoint}?username=${this.userName}&password=${this.password}&type=${payload.type}&dlr=${payload.dlr}&destination=${payload.destination}&source=${this.source}&message=${payload.message}`
        let command = `curl -X GET ${url}`
        consolelog(process.cwd(), 'singleSms command:', command, true)

        exec(command, function (error, stdout, stderr) {
            consolelog(process.cwd(), 'singleSms stdout:', stdout, true)
            consolelog(process.cwd(), 'singleSms stderr:', stderr, false)
            if (error !== null) {
                consolelog(process.cwd(), 'singleSms exec:', error, false)
            }
        });
        return {}
    }
}


export const sms = new SmsCLass()