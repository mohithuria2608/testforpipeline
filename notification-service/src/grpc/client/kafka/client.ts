import * as config from "config"
import * as Constant from '../../../constant'
import { kafkaServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'
import { logService } from '../logger/client'
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
        console.log(process.cwd(), 'GRPC connection established kafka-service', config.get("grpc.kafka.client"), true)
    }

    async kafkaSync(payload: IKafkaGrpcRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await kafkaServiceValidator.kafkaValidator(payload)
                this.kafkaClient.kafkaSync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully produced data on kafka for syncing", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing data on kafka  for syncing", JSON.stringify(error), false)
                        if (error.code === Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNAVAILABLE)
                            logService.sync(payload)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const kafkaService = new KafkaService();