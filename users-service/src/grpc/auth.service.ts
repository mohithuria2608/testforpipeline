import * as config from "config"
import * as Constant from '../constant'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../utils'

export class AuthService {

    private authProto = __dirname + config.get("directory.static.proto");
    private packageDefinition = protoLoader.loadSync(
        this.authProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadAuth = grpc.loadPackageDefinition(this.packageDefinition).AuthService
    private authClient = new this.loadAuth(config.get("grpc.url"), grpc.credentials.createInsecure());

    constructor() { }

    async createToken(payload: IAuthServiceRequest.ICreateToken): Promise<IAuthServiceRequest.ICreateTokenRes> {
        return new Promise((resolve, reject) => {
            this.authClient.createToken({ deviceId: payload.deviceId, tokenType: payload.tokenType }, (err, res) => {
                if (!err) {
                    consolelog("successfully created access and refresh token", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog("Error in creating token", JSON.stringify(err), false)
                    reject(err)
                }
            })
        })
    }

}

export const authService = new AuthService();