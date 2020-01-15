import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

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
            let res: {} = await ENTITY.OrderE.createDefaultCart(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "createDefaultCart", error, false)
            callback(grpcSendError(error))
        }
    },
    updateCartTtl: async (call: IOrderGrpcRequest.IUpdateDefaultCartTTLReq, callback) => {
        try {
            consolelog(process.cwd(), "updateCartTTL", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.OrderE.updateCartTTL(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "updateCartTTL", error, false)
            callback(grpcSendError(error))
        }
    },
    getCart: async (call: IOrderGrpcRequest.IGetCartReq, callback) => {
        try {
            consolelog(process.cwd(), "getCart", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.OrderE.getCartOrder(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "getCart", error, false)
            callback(grpcSendError(error))
        }
    },
    updateCart: async (call: IOrderGrpcRequest.IUpdateOrderReq, callback) => {
        try {
            consolelog(process.cwd(), "updateCart", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.OrderE.updateCart(JSON.parse(call.request.curItems), JSON.parse(call.request.cmsCart))
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "updateCart", error, false)
            callback(grpcSendError(error))
        }
    },
    getSdmOrder: async (call: IOrderGrpcRequest.IGetSdmOrderReq, callback) => {
        try {
            consolelog(process.cwd(), "getSdmOrder", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.OrderE.getSdmOrder(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrder", error, false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.order.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.order.server"), true)
server.start();

