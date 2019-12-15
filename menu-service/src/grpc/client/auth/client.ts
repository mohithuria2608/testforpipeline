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
    private authClient = new this.loadAuth(config.get("grpc.auth.client"), grpc.credentials.createInsecure());

    constructor() {
        consolelog(process.cwd(),'GRPC connection established auth-service', config.get("grpc.auth.client"), true)
    }

    async verifyToken(payload: IAuthGrpcRequest.IVerifyTokenObj): Promise<ICommonRequest.AuthorizationObj> {
        return new Promise(async (resolve, reject) => {
            await authServiceValidator.verifyTokenValidator(payload)
            this.authClient.verifyToken({ token: payload.token }, (err, res) => {
                if (!err) {
                    consolelog(process.cwd(),"successfully verified token", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(),"Error in verifying token", JSON.stringify(err), false)
                    reject(err)
                }
            })
        })
    }

}

export const authService = new AuthService();