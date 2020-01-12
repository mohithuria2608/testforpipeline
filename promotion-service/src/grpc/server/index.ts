import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.promotion.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
const promotionProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(promotionProto.PromotionService.service, {
    sync: async (call: ICommonRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.PromotionE.syncFromKafka(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.promotion.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.promotion.server"), true)
server.start();