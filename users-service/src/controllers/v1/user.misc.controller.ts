import * as Constant from '../../constant'
import { authService } from '../../grpc/client'
import { consolelog } from '../../utils'

export class MiscUserController {

    constructor() { }

    async refreshToken(payload: IUserRequest.IRefreshToken) {
        try {
            let res: IAuthServiceRequest.IToken = await authService.createToken({
                deviceid: payload.deviceid,
                devicetype: payload.devicetype,
                tokenType: Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
            })
            return { accessToken: res.token }
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const miscUserController = new MiscUserController();