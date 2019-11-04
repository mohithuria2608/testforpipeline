import * as Constant from '../../constant'
import { authService } from '../../grpc'
import { consolelog } from '../../utils'

export class MiscUserController {

    constructor() { }

    async refreshToken(payload: IUserRequest.IRefreshToken) {
        try {
            let accessToken: IAuthServiceRequest.IToken = await authService.createToken({
                deviceId: payload.deviceId,
                devicetype: payload.devicetype,
                tokenType: Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
            })
            return { accessToken }
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const miscUserController = new MiscUserController();