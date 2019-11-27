import * as config from 'config'
import { Middleware, Context } from 'koa'
import { authService } from '../grpc/client'
import * as Constant from '../constant/appConstants'
import { consolelog } from '../utils'

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            consolelog('authorization', ctx.header.authorization, true)
            let settings = {
                tokenType: "Bearer"
            }
            let authorization = ctx.header.authorization;
            const [tokenType, token] = authorization.split(/\s+/);

            if (!token || tokenType.toLowerCase() !== settings.tokenType.toLowerCase()) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.ACCESS_TOKEN_EXPIRED)
            }

            let tokenData: ICommonRequest.AuthorizationObj = await authService.verifyToken({ token: token })
            console.log("-------------------in menu service--------------------", JSON.stringify(tokenData))

            if (!tokenData || !tokenData.deviceid || !tokenData.devicetype || !tokenData.tokenType) {
                console.log("-------------------A1-------------------")

                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.ACCESS_TOKEN_EXPIRED)
            }
            else {
                console.log("-------------------A2-------------------")

                if (tokenData.tokenType == Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH || tokenData.tokenType == Constant.DATABASE.TYPE.TOKEN.USER_AUTH) {
                    console.log("-------------------A3-------------------")
                    ctx.state.user = tokenData
                } else {
                    console.log("-------------------A4-------------------")
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E401.ACCESS_TOKEN_EXPIRED)
                }
            }
        } catch (error) {
            console.log("-------------------A5-------------------", error)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E401.ACCESS_TOKEN_EXPIRED)
        }
        await next()
    }
}
