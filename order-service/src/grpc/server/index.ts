import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'
import { orderController, miscController } from '../../controllers';
import * as Constant from '../../constant'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.order.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const orderProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(orderProto.OrderService.service, {
    createDefaultCart: async (call: IOrderGrpcRequest.ICreateDefaultCartReq, callback) => {
        try {
            consolelog(process.cwd(), "createDefaultCart", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.CartE.createDefaultCart(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "createDefaultCart", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    getCart: async (call: IOrderGrpcRequest.IGetCartReq, callback) => {
        try {
            consolelog(process.cwd(), "getCart", JSON.stringify(call.request), true)
            let res = await ENTITY.CartE.getCart(call.request)
            callback(null, { cart: JSON.stringify(res) })
        } catch (error) {
            consolelog(process.cwd(), "getCart", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            // consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let data = call.request
            let res: any
            switch (data.set) {
                case Constant.SET_NAME.ORDER: {
                    res = await orderController.syncOrderFromKafka(call.request)
                    break;
                }
                case Constant.SET_NAME.PING_SERVICE: {
                    res = await miscController.pingService(data)
                    break;
                }
                default: { res = {}; break; }
            }
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.order.server"), grpc.ServerCredentials.createInsecure(), { "grpc.keepalive_timeout_ms": config.get("grpc.configuration.keepalive_timeout_ms") })

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.order.server"), true)
server.start();

