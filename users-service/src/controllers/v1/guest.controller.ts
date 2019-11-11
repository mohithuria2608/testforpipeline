import * as Constant from '../../constant'
import { authService } from '../../grpc'
import { consolelog } from '../../utils'

export class GuestController {

    constructor() { }

    async guestLogin(payload: IGuestRequest.IGuestLogin) {
        try {
            let accessToken = authService.createToken({
                deviceId: payload.deviceId,
                devicetype: payload.devicetype,
                tokenType: Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
            })
            let refreshToken = authService.createToken({
                deviceId: payload.deviceId,
                devicetype: payload.devicetype,
                tokenType: Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH
            })
            let tokens: IAuthServiceRequest.IToken[] = await Promise.all([accessToken, refreshToken])
            return { accessToken: tokens[0].token, refreshToken: tokens[1].token }
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const guestController = new GuestController();