import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { tokenManager } from '../../lib'

export class AuthController {

    constructor() { }

    async createToken(payload: IAuthGrpcRequest.ICreateTokenData) {
        try {
            let token: string = await tokenManager.setToken(payload)
            return { token }
        } catch (error) {
            consolelog(process.cwd(),"AuthController : createToken", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async verifyToken(payload: IAuthGrpcRequest.IVerifyTokenObj) {
        try {
            let tokenData: ICommonRequest.AuthorizationObj = await tokenManager.verifyToken(payload.token)
            return tokenData
        } catch (error) {
            consolelog(process.cwd(),"AuthController : verifyToken", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const authController = new AuthController();