import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { storeController, locationController, miscController } from '../../controllers';
import * as Constant from '../../constant'

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

    SyncLocationFromCMS: async (call: IStoreGrpcRequest.ISyncLocationFromCMSReq, callback) => {
        try {
            consolelog(process.cwd(), "grpc SyncLocationFromCMS", JSON.stringify(call.request), true)
            let res: IStoreRequest.IStore[] = await locationController.syncLocationFromCMS(call.request);
            callback(null, { store: true })
        } catch (error) {
            consolelog(process.cwd(), "SyncLocationFromCMS", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },

    PostLocationDataToCMS: async (call: IStoreGrpcRequest.IPostLocationDataToCMSReq, callback) => {
        try {
            consolelog(process.cwd(), "grpc PostLocationDataToCMS", JSON.stringify(call.request), true)
            let res: IStoreRequest.IStore[] = await locationController.postLocationToCMS(call.request);
            callback(null, { store: true })
        } catch (error) {
            consolelog(process.cwd(), "PostLocationDataToCMS", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    },

    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let data = call.request
            let res: any
            switch (data.set) {
                case Constant.SET_NAME.PING_SERVICE: {
                    res = await miscController.pingService(data)
                    break;
                }
                default: {
                    callback("unhandled grpc : set", {})
                    break;
                }
            }
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.location.server"), grpc.ServerCredentials.createInsecure(), { "grpc.keepalive_timeout_ms": config.get("grpc.configuration.keepalive_timeout_ms") })

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.location.server"), true)
server.start();

