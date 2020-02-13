import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'
import { orderController } from '../../controllers';

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
    updateCartTtl: async (call: IOrderGrpcRequest.IUpdateDefaultCartTTLReq, callback) => {
        try {
            consolelog(process.cwd(), "updateCartTTL", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.CartE.updateCartTTL(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "updateCartTTL", JSON.stringify(error), false)
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
            let res: {} = await orderController.syncOrderFromKafka(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.order.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.order.server"), true)
server.start();

