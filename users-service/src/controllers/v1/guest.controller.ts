import * as Constant from '../../constant'
import { cryptData, consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class GuestController {

    constructor() { }

    /**
     * @method POST
     * */
    async guestLogin(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestLogin) {
        try {
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH]
            )
            const cartId = await cryptData(headers.deviceid)
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: { cartId } }
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const guestController = new GuestController();