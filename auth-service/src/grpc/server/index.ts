import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { authController } from '../../controllers'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.auth.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const authProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(authProto.AuthService.service, {
    createToken: async (call: IAuthGrpcRequest.ICreateToken, callback) => {
        try {
            let res: IAuthGrpcRequest.IToken = await authController.createToken(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(),"createToken", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    verifyToken: async (call: IAuthGrpcRequest.IVerifyToken, callback) => {
        try {
            let res: ICommonRequest.AuthorizationObj = await authController.verifyToken(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(),"grpc : verifyToken", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.auth.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(),"GRPC server running at", config.get("grpc.auth.server"), true)
server.start();