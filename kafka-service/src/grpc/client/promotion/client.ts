import * as config from "config"
import { promotionServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class PromotionService {

    private promotionProto = __dirname + config.get("directory.static.proto.promotion.client");
    private packageDefinition = protoLoader.loadSync(
        this.promotionProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadPromotion = grpc.loadPackageDefinition(this.packageDefinition).PromotionService
    private promotionClient = new this.loadPromotion(config.get("grpc.promotion.client"), grpc.credentials.createInsecure());

    constructor() {
    }

    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await promotionServiceValidator.syncValidator(payload)
                this.promotionClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced promotion on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing promotion on cms", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const promotionService = new PromotionService();