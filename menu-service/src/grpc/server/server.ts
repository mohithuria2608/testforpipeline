import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { menuController } from '../../controllers'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.menu.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const menuProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(menuProto.MenuService.service, {
    fetchMenu: async (call: IMenuServiceRequest.IFetchMenu, callback) => {
        try {
            consolelog("fetchMenu", JSON.stringify(call.request), true)
            let res: IMenuServiceRequest.IFetchMenuRes = await menuController.fetchMenu(call.request)
            callback(null, res)
        } catch (error) {
            consolelog("fetchMenu-server", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.menu.server"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc Menu Server running at", config.get("grpc.menu.server"), true)
server.start();