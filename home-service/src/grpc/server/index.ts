import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { homeController } from '../../controllers';

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.home.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const homeProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(homeProto.HomeService.service, {
    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let res = await homeController.syncFromKafka(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.home.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.home.server"), true)
server.start();