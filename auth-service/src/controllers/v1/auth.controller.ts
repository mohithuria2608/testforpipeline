import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { tokenManager } from '../../lib'

export class AuthController {

    constructor() { }

    async createToken(payload: IAuthServiceRequest.ITokenData) {
        try {
            let token = await tokenManager.setToken(payload)
            consolelog("createToken", token, true)
            return { token }
        } catch (err) {
            consolelog("createToken", err, false)
            return Promise.reject(err)
        }
    }

    async verifyToken(payload: IAuthServiceRequest.IToken) {
        try {
            let token = await tokenManager.verifyToken(payload)
            consolelog("verifyToken", token, true)
            return token
        } catch (err) {
            consolelog("verifyToken", err, false)
            return Promise.reject(err)
        }
    }
}

export const authController = new AuthController();