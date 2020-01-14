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

    async getPromotion(payload: IPromotionGrpcRequest.IGetPromotion): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await promotionServiceValidator.validateCouponValidator(payload)
                this.promotionClient.getPromotion(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully validated promotion on as", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in  validating promotion on as", JSON.stringify(err), false)
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