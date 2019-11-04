import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { tokenManager } from '../../lib'

export class AuthController {

    constructor() { }

    async createToken(payload: IAuthServiceRequest.ICreateTokenData) {
        try {
            let token: string = await tokenManager.setToken(payload)
            return { token }
        } catch (err) {
            consolelog("createToken", err, false)
            return Promise.reject(err)
        }
    }

    async verifyToken(payload: IAuthServiceRequest.IVerifyTokenObj) {
        try {
            let tokenData: ICommonRequest.AuthorizationObj = await tokenManager.verifyToken(payload.token)
            return tokenData
        } catch (err) {
            consolelog("verifyToken", err, false)
            return Promise.reject(err)
        }
    }
}

export const authController = new AuthController();