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
                return Promise.reject(Constant.STATUS_MSG.ERROR.E406.ACCESS_TOKEN_EXPIRED)
            }

            let tokenData: ICommonRequest.AuthorizationObj = await authService.verifyToken({ token: token })

            if (!tokenData || !tokenData.deviceid || !tokenData.devicetype || !tokenData.tokenType) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E406.ACCESS_TOKEN_EXPIRED)
            } else {
                ctx.state.user = tokenData
            }
        } catch (error) {
            return Promise.reject(Constant.STATUS_MSG.ERROR.E406.ACCESS_TOKEN_EXPIRED)
        }
        await next()
    }
}
