/**
 * @file soap.utils
 * @description defines methods for soap manager lib
 * @created 2020-02-09 19:43:44
*/
import * as config from "config"
import * as Constant from '../constant';
const soap = require('soap');

export class SoapManagerClass {

    private baseSOAPUrl = config.get("sdm.baseUrl");
    private client;

    constructor() { }

    /** initializes client for soap request */
    async init() {
        return new Promise((resolve, reject) => {
            soap.createClient(this.baseSOAPUrl, (err, client) => {
                if (err) { reject(err); }
                else {
                    this.client = client;
                    console.log("> Soap client connected");
                    resolve();
                }
            });
        });
    }

    /** 
     * requests a client 
     * @param name - name of the function to hit
     */
    async requestData(name, params) {
        if (this.client) {
            return new Promise((resolve, reject) => {
                this.client[name](params, function (err, result) {
                    if (err) { reject(err); }
                    else resolve(result);
                });
            });
        } else throw Error('Client not initialized');
    }

}

export const SoapManager = new SoapManagerClass();

export const commonParams = {
    licenseCode: Constant.CONF.COUNTRY_SPECIFIC.UAE.SDM.LICENSE_CODE,
    language: 'En',
    conceptID: Constant.CONF.COUNTRY_SPECIFIC.UAE.SDM.CONCEPT_ID,
    menuTemplateID: 17
}