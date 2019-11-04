import * as config from 'config'
import { Middleware, Context } from 'koa'
import { authService } from '../grpc'
import * as Constant from '../constant/appConstants'
import * as utils from '../utils'

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            utils.consolelog('authorization', ctx.header.authorization, true)
            let settings = {
                tokenType: "Bearer"
            }
            let authorization = ctx.header.authorization;
            const [tokenType, token] = authorization.split(/\s+/);

            if (!token || tokenType.toLowerCase() !== settings.tokenType.toLowerCase()) {
                return Promise.reject(utils.sendError(Constant.STATUS_MSG.ERROR.E401.MISSINING_AUTHENTICATION(settings.tokenType)))
            }

            let tokenData: ICommonRequest.AuthorizationObj = await authService.verifyToken({ token: token })

            if (!tokenData || !tokenData.deviceId || !tokenData.devicetype || !tokenData.tokenType) {
                return Promise.reject(utils.sendError(Constant.STATUS_MSG.ERROR.E401.TOKEN_ALREADY_EXPIRED))
            } else {
                ctx.state.user = tokenData
            }
        } catch (error) {
            return Promise.reject(error)
        }
        await next()
    }
}
