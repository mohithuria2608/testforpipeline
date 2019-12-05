import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class MiscUserController {

    constructor() { }

    /**
    * @method POST
    * @description : If the accessToken expire create new token using refreshToken with expiry time = 30 days
    * */
    async refreshToken(payload: IUserRequest.IRefreshToken, authObj: ICommonRequest.AuthorizationObj) {
        try {
            const tokenType = authObj.id ? Constant.DATABASE.TYPE.TOKEN.USER_AUTH : Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
            let tokens = await ENTITY.UserE.getTokens(payload.deviceid, payload.devicetype, [tokenType], authObj.id ? authObj.id : undefined)
            return { accessToken: tokens.accessToken }
        } catch (err) {
            consolelog("refreshToken", err, false)
            return Promise.reject(err)
        }
    }
}

export const miscUserController = new MiscUserController();