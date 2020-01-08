import * as config from "config"
import { kafkaServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class KafkaService {

    private kafkaProto = __dirname + config.get("directory.static.proto.kafka.client");
    private packageDefinition = protoLoader.loadSync(
        this.kafkaProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadKafka = grpc.loadPackageDefinition(this.packageDefinition).KafkaService
    private kafkaClient = new this.loadKafka(config.get("grpc.kafka.client"), grpc.credentials.createInsecure());

    constructor() {
        consolelog(process.cwd(), 'GRPC connection established kafka-service', config.get("grpc.kafka.client"), true)
    }

    // @todo-abhishek 
    async syncToCmsMenu(payload: IKafkaGrpcRequest.ISyncToSDMMenuData): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.syncToCmsMenuValidator(payload)
                this.kafkaClient.syncToCmsMenu(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully produced menu on kafka for syncing to CMS", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing menu on kafka for syncing to CMS", JSON.stringify(err), false)
                        reject(err)
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    // @todo-abhishek 
    async updateMenuFromCMS(payload: IKafkaGrpcRequest.IUpdateMenuFromCMS): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.updateMenuFromCMSValidator(payload)
                this.kafkaClient.updateMenuFromCMS(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully produced menu on kafka for syncing to CMS", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing menu on kafka for syncing to CMS", JSON.stringify(err), false)
                        reject(err)
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    /** syncs upsell products from cms to aerospike */
    async syncUpsellProducts(payload: IKafkaGrpcRequest.ISyncUpsellProducts): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.syncUpsellProductsValidator(payload)
                this.kafkaClient.syncUpsellProducts(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully produced upsell products on kafka for syncing to aerospike", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing upsell products on kafka for syncing to aerospike", JSON.stringify(err), false)
                        reject(err)
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    /** creates new promotion on aerospike from CMS */
    async createPromotion(payload: IKafkaGrpcRequest.ICreatePromotion): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.createPromotionValidator(payload)
                this.kafkaClient.createPromotion(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully created promotion on kafka", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in creating promotion on kafkaIs", JSON.stringify(err), false)
                        reject(err)
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const kafkaService = new KafkaService();