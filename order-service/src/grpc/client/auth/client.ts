import * as config from "config"
import { authServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class AuthService {

    private authProto = __dirname + config.get("directory.static.proto.auth.client");
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
    private authClient = new this.loadAuth(config.get("grpc.auth.client"), grpc.credentials.createInsecure());

    constructor() {
        consolelog('Connection established from order service to auth service', config.get("grpc.auth.client"), true)
    }

    async createToken(payload: IAuthServiceRequest.ICreateTokenData): Promise<IAuthServiceRequest.IToken> {
        return new Promise(async (resolve, reject) => {
            await authServiceValidator.createTokenValidator(payload)
            this.authClient.createToken({ deviceid: payload.deviceid, tokenType: payload.tokenType, devicetype: payload.devicetype }, (err, res) => {
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
    async verifyToken(payload: IAuthServiceRequest.IVerifyTokenObj): Promise<ICommonRequest.AuthorizationObj> {
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