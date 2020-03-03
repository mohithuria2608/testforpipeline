import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { storeController } from '../../controllers';

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.location.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const locationProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(locationProto.LocationService.service, {
    fetchStore: async (call: IStoreGrpcRequest.IFetchStoreReq, callback) => {
        try {
            consolelog(process.cwd(), "grpc fetchStore", JSON.stringify(call.request), true)
            let res: IStoreRequest.IStore = await storeController.fetchStore(call.request)
            res.geoFence = {}
            callback(null, { store: res })
        } catch (error) {
            consolelog(process.cwd(), "fetchStore", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },

    validateCoordinate: async (call: IStoreGrpcRequest.IValidateCoordinate, callback) => {
        try {
            consolelog(process.cwd(), "grpc validateCoordinate", JSON.stringify(call.request), true)
            let res: IStoreRequest.IStore[] = await storeController.validateCoords(call.request)
            res.map(item => item.geoFence = {})
            callback(null, { store: res })
        } catch (error) {
            consolelog(process.cwd(), "validateCoordinate", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },

    SyncStores: async (call: IStoreGrpcRequest.ISyncStoresReq, callback) => {
        try {
            consolelog(process.cwd(), "grpc syncStore", JSON.stringify(call.request), true)
            let res: IStoreRequest.IStore[] = await storeController.syncStores(call.request);
            callback(null, { store: true })
        } catch (error) {
            consolelog(process.cwd(), "syncStore", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },

    PostLocationDataToCMS: async (call: IStoreGrpcRequest.ISyncStoresReq, callback) => {
        try {
            consolelog(process.cwd(), "grpc syncStore", JSON.stringify(call.request), true)
            let res: IStoreRequest.IStore[] = await storeController.syncStores(call.request);
            callback(null, { store: true })
        } catch (error) {
            consolelog(process.cwd(), "syncStore", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },
})

server.bind(config.get("grpc.location.server"), grpc.ServerCredentials.createInsecure(), { "grpc.keepalive_timeout_ms": config.get("grpc.configuration.keepalive_timeout_ms") })

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.location.server"), true)
server.start();

