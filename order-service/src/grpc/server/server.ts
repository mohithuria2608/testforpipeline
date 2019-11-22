import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import { cartController } from '../../controllers'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.auth")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const orderProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(orderProto.OrderService.service, {

})

server.bind(config.get("grpc.order.server"), grpc.ServerCredentials.createInsecure())

consolelog("Grpc Order Server running at", config.get("grpc.order.server"), true)
server.start();