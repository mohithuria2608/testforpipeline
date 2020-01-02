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
    syncToSdmUser: async (call: IUserGrpcRequest.ISyncToSdmUserDataReq, callback) => {
        try {
            consolelog(process.cwd(), "syncToSdmUser ", JSON.stringify(call.request), true)
            let res: {} = await kafkaController.syncToSdmUser(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "syncToSdmUser", error, false)
            callback(grpcSendError(error))
        }
    },
    syncToCmsUser: async (call: IUserGrpcRequest.ISyncToCmsUserDataReq, callback) => {
        try {
            consolelog(process.cwd(), "syncToCmsUser ", JSON.stringify(call.request), true)
            let res: {} = await kafkaController.syncToCmsUser(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "syncToCmsUser", error, false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.kafka.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.kafka.server"), true)
server.start();