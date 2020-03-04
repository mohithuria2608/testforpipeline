import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { kafkaController } from '../../controllers'

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
    kafkaSync: async (call: IKafkaRequest.IKafkaReq, callback) => {
        try {
            let res: {} = await kafkaController.kafkaSync(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "kafkaSync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.kafka.server"), grpc.ServerCredentials.createInsecure(), { "grpc.keepalive_timeout_ms": config.get("grpc.configuration.keepalive_timeout_ms") })

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.kafka.server"), true)
server.start();