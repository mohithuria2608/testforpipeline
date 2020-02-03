import * as config from "config"
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseSDM {

    protected soap = require('soap');
    private baseSOAPUrl = 'https://sdkuatuae.americana.com.sa:1995/?wsdl';
    private static client;
    private licenseCode = "AmericanaWeb"
    private conceptID = 3;
    static obj;

    constructor() {

    }

    static makeObject() {
        if (!BaseSDM.obj) {
            BaseSDM.obj = new BaseSDM();
        }
        return BaseSDM.obj;
    }

    /** initializes client for soap request */
    async initClient() {
        try {
            if (!BaseSDM.client) {
                let soapC = await this.soap.createClientAsync(this.baseSOAPUrl)
                consolelog(process.cwd(), "Soap client connected", "", true)
                BaseSDM.client = soapC;
            }
            return null
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /** 
     * requests a client 
     * @param name - name of the function to hit
     */
    async requestData(name: string, params: object): Promise<any> {
        if (BaseSDM.client) {
            return new Promise((resolve, reject) => {
                let param = {
                    licenseCode: 'AmericanaWeb',
                    conceptID: 3,
                    requestID: 1,
                    ...params

                }
                consolelog(process.cwd(), "params", JSON.stringify(params), true)
                BaseSDM.client[name](param, function (error, result) {
                    if (error) { reject(error); }
                    else {
                        consolelog(process.cwd(), "sdk response : ", JSON.stringify(result), true)
                        resolve(result);
                    }
                });
            });
        } else throw Error('SDM Client not initialized');
    }
}


export const SDM = BaseSDM.makeObject()
