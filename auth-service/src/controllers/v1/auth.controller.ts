import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { tokenManager } from '../../lib'

export class AuthController {

    constructor() { }

    async createToken(payload: IAuthGrpcRequest.ICreateTokenData) {
        try {
            let token: string = await tokenManager.setToken(payload)
            return { token }
        } catch (err) {
            consolelog(process.cwd(),"AuthController : createToken", JSON.stringify(err), false)
            return Promise.reject(err)
        }
    }

    async verifyToken(payload: IAuthGrpcRequest.IVerifyTokenObj) {
        try {
            let tokenData: ICommonRequest.AuthorizationObj = await tokenManager.verifyToken(payload.token)
            return tokenData
        } catch (err) {
            consolelog(process.cwd(),"AuthController : verifyToken", JSON.stringify(err), false)
            return Promise.reject(err)
        }
    }
}

export const authController = new AuthController();