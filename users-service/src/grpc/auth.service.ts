const grpc = require('grpc');
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class AuthService {

    private authProto = __dirname + '/../../../../proto/auth.proto';
    private loadAuth = grpc.load(this.authProto).AuthService
    private authClient = new this.loadAuth('localhost:50051', grpc.credentials.createInsecure());

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