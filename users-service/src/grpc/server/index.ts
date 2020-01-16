import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'
import { userController } from '../../controllers';

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
    fetchUser: async (call: IUserGrpcRequest.IFetchUserReq, callback) => {
        try {
            consolelog(process.cwd(), "fetchUser", JSON.stringify(call.request), true)
            let res: IUserRequest.IUserData = await ENTITY.UserE.getUser(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "fetchUser", error, false)
            callback(grpcSendError(error))
        }
    },
    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let res: {} = await userController.syncUserFromKafka(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", error, false)
            callback(grpcSendError(error))
        }
    },
    fetchAddress: async (call: IUserGrpcRequest.IFetchAddressReq, callback) => {
        try {
            consolelog(process.cwd(), "fetchAddress", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.AddressE.getAddress(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "fetchAddress", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.user.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.user.server"), true)
server.start();

