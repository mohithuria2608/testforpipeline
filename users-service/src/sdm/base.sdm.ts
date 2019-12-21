import * as config from "config"
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseSDM {

    protected soap = require('soap');
    private baseSOAPUrl = 'https://sdkuatuae.americana.com.sa:1995/?wsdl';
    private client;
    private licenseCode = "AmericanaWeb"
    private conceptID = 3

    constructor() {
        this.initClient()
    }

    /** initializes client for soap request */
    async initClient() {
        return new Promise(async(resolve, reject) => {
            try {
                let soapC = await this.soap.createClientAsync(this.baseSOAPUrl)
                this.client = soapC;
                consolelog(process.cwd(), "Soap client connected", "", true)
                resolve();
            } catch (error) {
                reject(new Error('SDM Client not initialized'))
            }
        });
    }

    /** 
     * requests a client 
     * @param name - name of the function to hit
     */
    async requestData(name, params): Promise<any> {
        if (this.client) {
            return new Promise((resolve, reject) => {
                // params['licenseCode'] = 'AmericanaWeb'
                // params['conceptID'] = 3
                // params['requestID'] = 1
                consolelog(process.cwd(), "params", JSON.stringify(params), true)
                this.client[name](params, function (err, result) {
                    if (err) { reject(err); }
                    else {
                        consolelog(process.cwd(), "sdk response : ", JSON.stringify(result), true)
                        resolve(result);
                    }
                });
            });
        } else throw Error('SDM Client not initialized');
    }
}


export const SDM = new BaseSDM()
