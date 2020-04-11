import * as config from "config"
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { kafkaService } from '../grpc/client'

export class BaseSDM {

    protected soap = require('soap');
    private baseSOAPUrl = config.get("sdm.baseUrl")
    private static client;
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
    async init() {
        try {
            if (!BaseSDM.client) {
                let soapC = await this.soap.createClientAsync(this.baseSOAPUrl)
                global.healthcheck.sdm = true
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
        let self = this
        if (BaseSDM.client) {
            return new Promise((resolve, reject) => {
                consolelog(process.cwd(), `${name}   ::`, `   ${JSON.stringify(params)}`, true)
                BaseSDM.client[name](params, function (error, result, rawResponse, soapHeader, rawRequest) {
                    if (name != "GetOrderDetails")
                        kafkaService.kafkaSync({
                            set: Constant.SET_NAME.LOGGER,
                            mdb: {
                                create: true,
                                argv: JSON.stringify({
                                    type: Constant.DATABASE.TYPE.ACTIVITY_LOG.SDM_REQUEST,
                                    info: {
                                        request: {
                                            body: rawRequest,
                                            baseSOAPUrl: self.baseSOAPUrl
                                        },
                                        response: error ? error : rawResponse
                                    },
                                    description: name,
                                    options: {
                                        env: Constant.SERVER.ENV[config.get("env")],
                                    },
                                    createdAt: new Date().getTime(),
                                })
                            },
                            inQ: true
                        })
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