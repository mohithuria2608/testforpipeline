import * as config from "config"
import { userServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog, sendError } from '../../../utils'

export class UserService {

    private authProto = __dirname + config.get("directory.static.proto.user.client");
    private packageDefinition = protoLoader.loadSync(
        this.authProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadUser = grpc.loadPackageDefinition(this.packageDefinition).UserService
    private userClient

    constructor() {
        this.userClient = new this.loadUser(config.get("grpc.user.client"), grpc.credentials.createInsecure());
    }

    async fetchUser(payload: IUserRequest.IFetchUser): Promise<IUserRequest.IUserData> {
        return new Promise(async (resolve, reject) => {
            await userServiceValidator.fetchUser(payload)
            this.userClient.fetchUser({ userId: payload.userId }, (error, res) => {
                if (!error) {
                    consolelog(process.cwd(), "successfully fetched user by id", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(), "Error in fetching user by id", JSON.stringify(error), false)
                    reject(sendError(error))
                }
            })
        })
    }
}

export const userService = new UserService();