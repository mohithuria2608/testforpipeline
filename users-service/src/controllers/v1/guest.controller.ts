import * as Constant from '../../constant'
import { authService } from '../../grpc'
import { consolelog } from '../../utils'

export class GuestController {

    constructor() { }

    async guestLogin(payload: IGuestRequest.IGuestLogin) {
        try {
            let accessToken: IAuthServiceRequest.ICreateTokenRes = await authService.createToken({
                deviceId: payload.deviceId,
                tokenType: Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
            })
            let refreshToken: IAuthServiceRequest.ICreateTokenRes = await authService.createToken({
                deviceId: payload.deviceId,
                tokenType: Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH
            })
            return { accessToken: accessToken.token, refreshToken: refreshToken.token }
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const guestController = new GuestController();