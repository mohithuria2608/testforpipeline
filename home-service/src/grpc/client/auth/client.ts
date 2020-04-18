import * as config from "config"
import { authServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class AuthService {
    /**
     * @description  : grpc call to auth-service
     * */
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
    private authClient

    constructor() { 
        this.authClient = new this.loadAuth(config.get("grpc.auth.client"), grpc.credentials.createInsecure());
    }


    async verifyToken(payload: IAuthGrpcRequest.IVerifyTokenObj): Promise<ICommonRequest.AuthorizationObj> {
        return new Promise(async (resolve, reject) => {
            await authServiceValidator.verifyTokenValidator(payload)
            this.authClient.verifyToken({ token: payload.token }, (error, res) => {
                if (!error) {
                    consolelog(process.cwd(),"successfully verified token", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(),"Error in verifying token", JSON.stringify(error), false)
                    reject(error)
                }
            })
        })
    }

}

export const authService = new AuthService();