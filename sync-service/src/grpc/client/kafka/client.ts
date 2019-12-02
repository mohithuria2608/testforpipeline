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
        consolelog('Connection established from sync service to kafka service', config.get("grpc.kafka.client"), true)
    }

    async produceMessage(payload: IKafkaServiceRequest.IProduceMessage): Promise<IKafkaServiceRequest.IProduceMessageRes> {
        return new Promise(async (resolve, reject) => {
            await kafkaServiceValidator.produceMessageValidator(payload)
            this.kafkaClient.produceMessage({ data: payload.data }, (err, res) => {
                if (!err) {
                    consolelog("successfully produced message on kafka", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog("Error in producing message", JSON.stringify(err), false)
                    reject(err)
                }
            })
        })
    }
}

export const kafkaService = new KafkaService();