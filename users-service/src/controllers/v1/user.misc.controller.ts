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
            let sessionTime = Math.ceil((new Date().getTime()) / 1000)
            let sessionUpdate: ISessionRequest.ISession = {
                sessionTime: sessionTime,
                userId: authObj.id
            }
            await ENTITY.SessionE.buildSession(headers, sessionUpdate)

            if (authObj.tokenType != Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            const toCreateToken = (authObj.isGuest == 0) ? Constant.DATABASE.TYPE.TOKEN.USER_AUTH : Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
            let tokens = await ENTITY.UserE.getTokens(headers.deviceid, headers.devicetype, [toCreateToken], authObj.id, authObj.isGuest, sessionTime)
            let user = await ENTITY.UserE.getUser({ userId: authObj.id })
            return { accessToken: tokens.accessToken, response: formatUserData(user, headers, authObj.isGuest) }
        } catch (error) {
            consolelog(process.cwd(), "refreshToken", error, false)
            return Promise.reject(error)
        }
    }

    async logout(headers: ICommonRequest.IHeaders, auth: ICommonRequest.AuthorizationObj) {
        try {
            let getSession: ISessionRequest.ISession = await ENTITY.SessionE.getSession(headers.deviceid, auth.id)
            await ENTITY.SessionE.removeSession(headers, auth.id)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "logout", error, false)
            return Promise.reject(error)
        }
    }
}

export const miscUserController = new MiscUserController();