import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.payment.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const paymentProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(paymentProto.PaymentService.service, {
    func1: async (call: IPaymentGrpcRequest.IFunc1Req, callback) => {
        try {
            consolelog(process.cwd(), "func1", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.TransactionE.func1(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "func1", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.payment.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.payment.server"), true)
server.start();

