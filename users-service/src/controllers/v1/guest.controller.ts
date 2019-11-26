import * as Constant from '../../constant'
import { cryptData, consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class GuestController {

    constructor() { }

    /**
     * @method POST
     * */
    async guestLogin(payload: IGuestRequest.IGuestLogin) {
        try {
            let tokens = await ENTITY.UserE.getTokens(
                payload.deviceid,
                payload.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH]
            )
            const cartId = await cryptData(payload.deviceid)
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: { cartId } }
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const guestController = new GuestController();