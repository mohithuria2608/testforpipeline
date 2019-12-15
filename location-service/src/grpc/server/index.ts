import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

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
    validateCoordinate: async (call: IStoreGrpcRequest.IValidateCoordinate, callback) => {
        try {
            consolelog(process.cwd(),"grpc validateCoordinate", JSON.stringify(call.request), true)
            let res: IStoreRequest.IStore[] = await ENTITY.StoreE.validateCoords(call.request)
            res.map(item => item.geoFence = {})
            callback(null, { store: res })
        } catch (error) {
            consolelog(process.cwd(),"validateCoordinate", error, false)
            callback(grpcSendError(error))
        }
    },
    // getAreaByStoreId: async (call: IAreaGrpcRequest.IGetAreaByStoreId, callback) => {
    //     try {
    //         consolelog(process.cwd(),"grpc getAreaByStoreId", JSON.stringify(call.request), true)
    //         let res: IAreaRequest.IArea = await ENTITY.AreaE.getAreaByStoreId(call.request)
    //         callback(null, res)
    //     } catch (error) {
    //         consolelog(process.cwd(),"getAreaByStoreId", error, false)
    //         callback(grpcSendError(error))
    //     }
    // },
})

server.bind(config.get("grpc.location.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(),"GRPC server running at", config.get("grpc.location.server"), true)
server.start();

