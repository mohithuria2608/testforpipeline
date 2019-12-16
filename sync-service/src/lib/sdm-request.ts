/**
 * @file sdm.manager
 * @description defines methods for soap manager lib
 * @created 2019-10-23 13:29:30
*/

const soap = require('soap');
import { consolelog } from '../utils'

export class SoapManagerClass {

    private baseSOAPUrl = 'https://sdkuatuae.americana.com.sa:1995/?wsdl';
    private client;

    constructor() { }

    /** initializes client for soap request */
    async initClient() {
        return new Promise((resolve, reject) => {
            soap.createClient(this.baseSOAPUrl, (err, client) => {
                if (err) { reject(err); }
                else {
                    this.client = client;
                    consolelog(process.cwd(), "Soap client connected", "", true)
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

export const sdmRequestLib = new SoapManagerClass()