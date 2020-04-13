import * as config from "config"
import { deeplinkServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class DeeplinkService {

    private deeplinkProto = __dirname + config.get("directory.static.proto.deeplink.client");
    private packageDefinition = protoLoader.loadSync(
        this.deeplinkProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadDeeplink = grpc.loadPackageDefinition(this.packageDefinition).DeeplinkService
    private deeplinkClient = new this.loadDeeplink(config.get("grpc.deeplink.client"), grpc.credentials.createInsecure());

    constructor() {
    }

    /**
     * @description : this will sync both deeplink and upsell
     * @param payload 
     */
    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await deeplinkServiceValidator.syncValidator(payload)
                this.deeplinkClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced deeplink on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing deeplink on cms", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const deeplinkService = new DeeplinkService();