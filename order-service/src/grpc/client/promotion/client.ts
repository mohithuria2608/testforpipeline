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
        console.log(process.cwd(), 'GRPC connection established promotion-service', config.get("grpc.promotion.client"), true)
    }

    async validatePromotion(payload: IPromotionGrpcRequest.IValidatePromotion): Promise<IPromotionGrpcRequest.IValidatePromotionRes> {
        return new Promise(async (resolve, reject) => {
            try {
                await promotionServiceValidator.validateCouponValidator(payload)
                this.promotionClient.validatePromotion(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully validated promotion on as", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in  validating promotion on as", JSON.stringify(error), false)
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