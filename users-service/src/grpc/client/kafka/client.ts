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
        consolelog('Connection established from user service to kafka service', config.get("grpc.kafka.client"), true)
    }

    async syncUser(payload: IKafkaGrpcRequest.ISyncUserData): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.syncUserValidator(payload)
                this.kafkaClient.syncUser(payload, (err, res) => {
                    if (!err) {
                        consolelog("successfully produced user on kafka for syncing", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog("Error in producing user on kafka  for syncing", JSON.stringify(err), false)
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