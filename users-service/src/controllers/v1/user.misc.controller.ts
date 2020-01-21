import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import * as ENTITY from '../../entity'

export class MiscUserController {

    constructor() { }

    /**
    * @method POST
    * @description : If the accessToken expire create new token using refreshToken with expiry time = 30 days
    * */
    async refreshToken(headers: ICommonRequest.IHeaders, payload: IUserRequest.IRefreshToken, authObj: ICommonRequest.AuthorizationObj) {
        try {
            if (authObj.tokenType != Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            const toCreateToken = (authObj.isGuest == 0) ? Constant.DATABASE.TYPE.TOKEN.USER_AUTH : Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
            let tokens = await ENTITY.UserE.getTokens(headers.deviceid, headers.devicetype, [toCreateToken], authObj.id, authObj.isGuest)
            let user = await ENTITY.UserE.getUser({ userId: authObj.id })
            return { accessToken: tokens.accessToken, response: formatUserData(user, headers) }
        } catch (err) {
            consolelog(process.cwd(), "refreshToken", err, false)
            return Promise.reject(err)
        }
    }

    async logout(headers: ICommonRequest.IHeaders, authObj: ICommonRequest.AuthorizationObj) {
        try {
            let getSession: ISessionRequest.ISession = await ENTITY.SessionE.getSession(headers.deviceid, authObj.userData.id)

            await ENTITY.SessionE.removeSession(headers, authObj.userData)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "logout", err, false)
            return Promise.reject(err)
        }
    }
}

export const miscUserController = new MiscUserController();