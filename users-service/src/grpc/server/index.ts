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
    createUserOnCms: async (call: IUserCMSRequest.ICreateUserDataOnCmsReq, callback) => {
        try {
            consolelog(process.cwd(), "createUserOnCms", JSON.stringify(call.request), true)
            let res: {} = await ENTITY.UserE.createUserOnCms(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "createUserOnCms", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.user.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.user.server"), true)
server.start();

