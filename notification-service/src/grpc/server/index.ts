import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { sms } from '../../lib'
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
    sms: async (call, callback) => {
        try {
            consolelog(process.cwd(), "sms", JSON.stringify(call.request), true)
            let res: {} = await sms.sendSMS(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sms", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.notification.server"), grpc.ServerCredentials.createInsecure(), { "grpc.keepalive_timeout_ms": config.get("grpc.configuration.keepalive_timeout_ms") })

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.notification.server"), true)
server.start();

