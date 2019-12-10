import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { storeController } from '../../controllers'

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
    validateCoordinate: async (call: IStoreServiceRequest.IValidateCoordinate, callback) => {
        try {
            consolelog("validateCoordinate", JSON.stringify(call.request), true)
            let res: IStoreRequest.IOutlet = await storeController.validateCoordinates(call.request)
            callback(null, res)
        } catch (error) {
            consolelog("validateCoordinate", error, false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.outlet.server"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc Outlet Server running at", config.get("grpc.outlet.server"), true)
server.start();

