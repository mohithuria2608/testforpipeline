import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'
import { userController, miscController, addressController } from '../../controllers';
import * as Constant from '../../constant'

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
    fetchSession: async (call: IUserGrpcRequest.IFetchSessionReq, callback) => {
        try {
            consolelog(process.cwd(), "getSession", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.SessionE.getSession(call.request.deviceid, call.request.userId)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "getSession", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    fetchUser: async (call: IUserGrpcRequest.IFetchUserReq, callback) => {
        try {
            consolelog(process.cwd(), "fetchUser", JSON.stringify(call.request), true)
            let res: IUserRequest.IUserData = await ENTITY.UserE.getUser(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "fetchUser", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let data = call.request
            let res: any
            switch (data.set) {
                case Constant.SET_NAME.USER: {
                    res = await userController.syncUser(data)
                    break;
                }
                case Constant.SET_NAME.ADDRESS: {
                    res = await addressController.syncAddress(data)
                    break;
                }
                case Constant.SET_NAME.PING_SERVICE: {
                    res = await miscController.pingService(data)
                    break;
                }
            }
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    fetchAddress: async (call: IUserGrpcRequest.IFetchAddressReq, callback) => {
        try {
            consolelog(process.cwd(), "fetchAddress", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.AddressE.getAddress(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "fetchAddress", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    creatUserOnCms: async (call: IUserGrpcRequest.ICraeteUserOnCmsReq, callback) => {
        try {
            consolelog(process.cwd(), "creatUserOnCms", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.UserE.createUserOnCms(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "creatUserOnCms", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    createAddressOnCms: async (call: IUserGrpcRequest.ICreatAddressOnCmsReq, callback) => {
        try {
            consolelog(process.cwd(), "creatAddressOnCms", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.AddressE.addAddressOnCms(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "creatAddressOnCms", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.user.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.user.server"), true)
server.start();

