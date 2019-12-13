import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { kafkaController } from '../../controllers'
import { async } from "rxjs/internal/scheduler/async";

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.kafka.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const kafkaProto = grpc.loadPackageDefinition(packageDefinition);
export const server = new grpc.Server()

server.addService(kafkaProto.KafkaService.service, {
    produceMessage: async (call: IKafkaGrpcRequest.IProduceMessageReq, callback) => {
        try {
            consolelog("produceMessage", JSON.stringify(call.request), true)
            let res: IKafkaGrpcRequest.IProduceMessageRes = await kafkaController.produceMessage(call.request)
            callback(null, res)
        } catch (error) {
            consolelog("produceMessage", error, false)
            callback(grpcSendError(error))
        }
    },
    
    createUser: async (call: IKafkaGrpcRequest.IProduceMessageReq, callback) => {
        try {
            consolelog("createUser ", JSON.stringify(call.request), true)
            let res: IKafkaGrpcRequest.IProduceMessageRes = await kafkaController.produceMessage(call.request)
            callback(null, res)
        } catch (error) {
            consolelog("createUser", error, false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.kafka.server"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc Kafka Server running at", config.get("grpc.kafka.server"), true)
server.start();