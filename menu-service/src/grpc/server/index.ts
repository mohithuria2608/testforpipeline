import * as config from "config"
import * as Constant from "../../constant";
import { consolelog, grpcSendError } from "../../utils"
import { menuController, hiddenController, miscController } from '../../controllers';

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
            let res: IMenuGrpcRequest.IFetchMenuRes = await menuController.grpcFetchMenu(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "fetchMenu-server", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    fetchHidden: async (call: IMenuGrpcRequest.IFetchHidden, callback) => {
        try {
            consolelog(process.cwd(), "grpcFetchHidden", JSON.stringify(call.request), true)
            let res: IMenuGrpcRequest.IFetchMenuRes = await hiddenController.grpcFetchHidden(call.request)
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "fetchHidden-server", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            // consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let data = call.request
            let res: any
            switch (data.set) {
                case Constant.SET_NAME.MENU_EN: case Constant.SET_NAME.MENU_AR: {
                    res = await menuController.sync(data)
                    break;
                }
                case Constant.SET_NAME.HIDDEN_AR: case Constant.SET_NAME.HIDDEN_EN: {
                    res = await hiddenController.syncToAS(data)
                    break;
                }
                case Constant.SET_NAME.PING_SERVICE: {
                    res = await miscController.pingService(data)
                    break;
                }
                default: { res = {}; break; }
            }
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.menu.server"), grpc.ServerCredentials.createInsecure(), { "grpc.keepalive_timeout_ms": config.get("grpc.configuration.keepalive_timeout_ms") })

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.menu.server"), true)
server.start();