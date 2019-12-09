import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.outlet.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const outletProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(outletProto.OutletService.service, {
    getOutletByCoord: async (call: IOutletServiceRequest.IGetOutletByCoord, callback) => {
        try {
            consolelog("getOutletByCoord", JSON.stringify(call.request), true)
            // let res: IOutletRequest.IOutlet = await ENTITY.OutletE.getById(call.request)
            // callback(null, res)
        } catch (error) {
            consolelog("getOutletByCoord", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.outlet.server"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc Outlet Server running at", config.get("grpc.outlet.server"), true)
server.start();

