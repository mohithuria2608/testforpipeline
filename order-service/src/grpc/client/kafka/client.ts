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
                        consolelog(process.cwd(), "successfully produced order request on kafka ", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing order request on kafka", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    async health(payload: ICommonRequest.IGrpcHealthCheckReq): Promise<ICommonRequest.IGrpcHealthCheckRes> {
        return new Promise(async (resolve, reject) => {
            try {
                this.kafkaClient.health(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully health check kafka ", JSON.stringify(res), false)
                        resolve(res.state)
                    } else {
                        consolelog(process.cwd(), "Error in  health check of kafka", JSON.stringify(error), false)
                        reject(false)
                    }
                })
            } catch (error) {
                reject(false)
            }
        })
    }
}

export const kafkaService = new KafkaService();