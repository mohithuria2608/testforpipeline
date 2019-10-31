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

    async createToken(payload: IAuthServiceRequest.ICreateToken) {
        return new Promise((resolve, reject) => {
            try {
                this.authClient.token({ deviceId: payload.deviceId }, (err, res) => {
                    if (!err) {
                        consolelog("successfully created access and refresh token", JSON.stringify(res), false)
                        resolve(res)
                    } else
                        reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

}

export const authService = new AuthService();