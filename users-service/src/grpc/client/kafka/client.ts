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

    async syncToSdmUser(payload: IKafkaGrpcRequest.ISyncToSDMUserData): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.syncToSdmUserValidator(payload)
                this.kafkaClient.syncToSdmUser(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully produced user on kafka for syncing to SDM", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing user on kafka  for syncing to SDM", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    async syncToCmsUser(payload: IKafkaGrpcRequest.ISyncToCMSUserData): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.syncToCmsUserValidator(payload)
                this.kafkaClient.syncToCmsUser(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully produced user on kafka for syncing to CMS", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing user on kafka  for syncing to CMS", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const kafkaService = new KafkaService();