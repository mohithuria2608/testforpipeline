import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.user.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const userProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(userProto.UserService.service, {
    getUserById: async (call: IUserGrpcRequest.IGetUserById, callback) => {
        try {
            consolelog("getUserById", JSON.stringify(call.request), true)
            let res: IUserRequest.IUserData = await ENTITY.UserE.getById(call.request)
            callback(null, res)
        } catch (error) {
            consolelog("getUserById", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.user.server"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc User Server running at", config.get("grpc.user.server"), true)
server.start();

