import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { syncController } from '../../controllers'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.sync.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const syncProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(syncProto.SyncService.service, {
    // fetchMenu: async (call: IMenuServiceRequest.IFetchMenu, callback) => {
    //     try {
    //         consolelog("fetchMenu", JSON.stringify(call.request), true)
    //         let res: IMenuServiceRequest.IFetchMenuRes = await syncController.grpcFetchMenu(call.request)
    //         callback(null, res)
    //     } catch (error) {
    //         consolelog("fetchMenu-server", error, false)
    //         callback(grpcSendError(error))
    //     }
    // }
})

server.bind(config.get("grpc.sync.server"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc Sync Server running at", config.get("grpc.sync.server"), true)
server.start();