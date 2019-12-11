import * as config from "config"
import { userServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class UserGrpcService {
    private userProto = __dirname + config.get("directory.static.proto.user.client");
    private packageDefinition = protoLoader.loadSync(
        this.userProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadUser = grpc.loadPackageDefinition(this.packageDefinition).UserService
    private userClient = new this.loadUser(config.get("grpc.user.client"), grpc.credentials.createInsecure());

    constructor() {
        console.log("Connection established from auth service to user service", config.get("grpc.user.client"))
        // consolelog("Connection established from auth service to user service", config.get("grpc.user.client"), true)
    }

    async getUserById(payload: IUserGrpcRequest.IId): Promise<IUserGrpcRequest.IUserData> {
        return new Promise(async (resolve, reject) => {
            try {
                await userServiceValidator.getUserByIdValidator(payload)
                let dataToSend = {
                    id: payload.id
                }
                this.userClient.getUserById(dataToSend, (err, res) => {
                    if (!err) {
                        consolelog("successfully retrieved user data", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog("Error in fetching user info", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const userGrpcService = new UserGrpcService();