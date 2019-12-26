import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
// import * as ENTITY from '../../entity'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.notification.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const notificationProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(notificationProto.NotificationService.service, {
    createUserOnSdm: async (call, callback) => {
        try {
            // consolelog(process.cwd(), "createUserOnSdm", JSON.stringify(call.request), true)
            // let res: {} = await ENTITY.UserE.createUserOnSdm(call.request)
            // callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "createUserOnSdm", error, false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.notification.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.notification.server"), true)
server.start();

