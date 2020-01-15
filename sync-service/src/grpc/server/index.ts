import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.sync.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const syncProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(syncProto.SyncService.service, {
    syncConfig: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "syncConfig", JSON.stringify(call.request), true)
            let res = await ENTITY.ConfigE.syncConfigFromKafka(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "syncConfig", error, false)
            callback(grpcSendError(error))
        }
    },
    getConfig: async (call: IConfigGrpcRequest.IGetConfigReq, callback) => {
        try {
            consolelog(process.cwd(), "getConfig", JSON.stringify(call.request), true)
            let res = await ENTITY.ConfigE.getConfig(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "getConfig", error, false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.sync.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.sync.server"), true)
server.start();