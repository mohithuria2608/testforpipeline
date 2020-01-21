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
        consolelog(process.cwd(), 'GRPC connection established auth-service', config.get("grpc.auth.client"), true)
    }

    async createToken(payload: IAuthGrpcRequest.ICreateTokenData): Promise<IAuthGrpcRequest.IToken> {
        return new Promise(async (resolve, reject) => {
            try {
                await authServiceValidator.createTokenValidator(payload)
                let dataToSend = {
                    deviceid: payload.deviceid,
                    tokenType: payload.tokenType,
                    devicetype: payload.devicetype,
                    isGuest: payload.isGuest
                }
                if (payload.id)
                    dataToSend['id'] = payload.id
                this.authClient.createToken(dataToSend, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully created access and refresh token", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in creating token", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    async verifyToken(payload: IAuthGrpcRequest.IVerifyTokenObj): Promise<ICommonRequest.AuthorizationObj> {
        return new Promise(async (resolve, reject) => {
            try {
                await authServiceValidator.verifyTokenValidator(payload)
                this.authClient.verifyToken({ token: payload.token }, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully verified token", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in verifying token", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const authService = new AuthService();