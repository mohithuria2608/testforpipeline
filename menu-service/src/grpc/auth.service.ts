import * as config from "config"
import { authServiceValidator } from './auth.service.validator'
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

    async verifyToken(payload: IAuthServiceRequest.IVerifyToken): Promise<IAuthServiceRequest.IPostVerifyTokenRes> {
        return new Promise(async (resolve, reject) => {
            await authServiceValidator.verifyTokenValidator(payload)
            this.authClient.verifyToken({ token: payload.token }, (err, res) => {
                if (!err) {
                    consolelog("successfully verified token", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog("Error in verifying token", JSON.stringify(err), false)
                    reject(err)
                }
            })
        })
    }

}

export const authService = new AuthService();