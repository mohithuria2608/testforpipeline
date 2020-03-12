import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as Constant from '../../constant'
import { promotionController, miscController } from '../../controllers';

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
    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let data = call.request
            let res: any
            switch (data.set) {
                case Constant.SET_NAME.PROMOTION: {
                    res = await promotionController.syncPromoFromKafka(call.request)
                    break;
                }
                case Constant.SET_NAME.PING_SERVICE: {
                    res = await miscController.pingService(data)
                    break;
                }
                default: {
                    callback("unhandled grpc : set", {})
                    break;
                }
            }
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    validatePromotion: async (call: IPromotionGrpcRequest.IValidatePromotionReq, callback) => {
        try {
            consolelog(process.cwd(), "validatePromotion", JSON.stringify(call.request), true)
            let res: {} = await promotionController.validatePromotion(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "validatePromotion", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.promotion.server"), grpc.ServerCredentials.createInsecure(), { "grpc.keepalive_timeout_ms": config.get("grpc.configuration.keepalive_timeout_ms") })

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.promotion.server"), true)
server.start();