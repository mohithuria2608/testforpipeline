import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { uploadController } from '../../controllers'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.upload.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const uploadProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(uploadProto.UploadService.service, {
    UploadJSON: async (call, callback) => {
        try {
            consolelog(process.cwd(), "UploadJSON", JSON.stringify(call.request), true)
            let res = await uploadController.uploadJSON(call.request);
            callback(null, res);
            return res;
        } catch (error) {
            consolelog(process.cwd(), "sync", error, false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.upload.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "Grpc upload Server running at", config.get("grpc.upload.server"), true)
server.start();