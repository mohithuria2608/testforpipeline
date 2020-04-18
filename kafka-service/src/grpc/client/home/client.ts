import * as config from "config"
import { homeServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class HomeService {

    private homeProto = __dirname + config.get("directory.static.proto.home.client");
    private packageDefinition = protoLoader.loadSync(
        this.homeProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadHome = grpc.loadPackageDefinition(this.packageDefinition).HomeService
    private homeClient

    constructor() {
        this.homeClient = new this.loadHome(config.get("grpc.home.client"), grpc.credentials.createInsecure());
    }

    /**
     * @description : this will sync both home and upsell
     * @param payload 
     */
    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await homeServiceValidator.syncValidator(payload)
                this.homeClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced home on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing home on cms", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const homeService = new HomeService();