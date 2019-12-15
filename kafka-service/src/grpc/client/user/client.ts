import * as config from "config"
import { userServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class UserService {

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
        consolelog(process.cwd(),'GRPC connection established user-service', config.get("grpc.user.client"), true)
    }

    async updateCmsId(payload: IUserGrpcRequest.IUpdateUserInfo) {
        return new Promise(async (resolve, reject) => {
            try {
                await userServiceValidator.updateCmsIdValidator(payload)
                this.userClient.updateCmsId(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(),"successfully created user on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(),"Error in creating user on cms", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const userService = new UserService();