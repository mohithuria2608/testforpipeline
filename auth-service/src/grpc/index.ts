import * as config from "config"
import { consolelog, grpcSendError } from "../utils"
import { authController } from '../controllers'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto")
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
    createToken: async (call: IAuthServiceRequest.ICreateTokenForUser, callback) => {
        try {
            consolelog("createToken", JSON.stringify(call.request), true)
            let res = await authController.createToken(call.request)
            callback(null, res)
        } catch (error) {
            consolelog("createToken", error, false)
            callback(grpcSendError(error))
        }
    },
    verifyToken: async (call: IAuthServiceRequest.IVerifyTokenForUser, callback) => {
        try {
            consolelog("verifyToken", JSON.stringify(call.request), true)
            let res = await authController.verifyToken(call.request)
            callback(null, res)
        } catch (error) {
            consolelog("verifyToken", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.url"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc Server running at", config.get("grpc.url"), true)
server.start()
;