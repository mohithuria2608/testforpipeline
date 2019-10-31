import * as Constant from '../../constant'
import { consolelog } from '../../utils'

export class AuthController {

    constructor() { }

    async createToken(payload: IAuthServiceRequest.ICreateToken) {
        try {
            consolelog("token", JSON.stringify(payload.request), true)
            return { accesstoken: "accesstoken", refreshtoken: "refreshtoken" }
        } catch (err) {
            consolelog("createToken", err, false)
            return Promise.reject(err)
        }
    }
}

export const authController = new AuthController();