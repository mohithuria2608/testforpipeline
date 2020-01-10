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
        consolelog(process.cwd(), 'GRPC connection established promotion-service', config.get("grpc.promotion.client"), true)
    }

    /** Updates the upsell products list in aerospike */
    async createPromotion(payload: IPromotionGrpcRequest.ICreatePromotion): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await promotionServiceValidator.createPromotionValidator(payload)
                this.promotionClient.createPromotion(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully created promotion", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in creating promotion on aerospike", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const promotionService = new PromotionService();