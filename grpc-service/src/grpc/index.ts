import { consolelog } from "../utils"
const grpc = require('grpc')
const authProto = grpc.load(__dirname + '/../../../../proto/auth.proto')

const server = new grpc.Server()

server.addService(authProto.AuthService.service, {
    token: (call, callback) => {
        consolelog("token", call, true)
        callback(null, { accesstoken: "accesstoken", refreshtoken: "refreshtoken" })
    }
})

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())

console.log('Server running at http://127.0.0.1:50051')
server.start()
