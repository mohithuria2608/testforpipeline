import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

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
    fetchMenu: async (call: IMenuGrpcRequest.IFetchMenu, callback) => {
        try {
            consolelog(process.cwd(), "grpcFetchMenu", JSON.stringify(call.request), true)
            let res: IMenuGrpcRequest.IFetchMenuRes = await ENTITY.MenuE.grpcFetchMenu(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "fetchMenu-server", error, false)
            callback(grpcSendError(error))
        }
    },
    syncMenuOnCms: async (call: IMenuGrpcRequest.ICMSMenuSyncReq, callback) => {
        try {
            consolelog(process.cwd(), "syncMenuOnCms", JSON.stringify(call.request), true)
            let res = await ENTITY.MenuE.syncMenuWithCMS(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "syncMenuOnCms", error, false)
            callback(grpcSendError(error))
        }
    },
    updateMenu: async (call: IMenuGrpcRequest.IUpdateMenuReq, callback) => {
        try {
            consolelog(process.cwd(), "updateMenu", JSON.stringify(call.request), true)
            let res = await ENTITY.MenuE.updateMenuFromCMS(call.request);
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "updateMenu", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.menu.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.menu.server"), true)
server.start();