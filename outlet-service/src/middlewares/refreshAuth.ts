import * as config from 'config'
import { Middleware, Context } from 'koa'
import { authService } from '../grpc/client'
import * as Constant from '../constant';
import { sendError, consolelog } from '../utils';

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            consolelog('authorization', ctx.header.authorization, true)
            let settings = {
                tokenType: "Bearer"
            }
            let authorization = ctx.header.authorization;
            if (!authorization) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            }
            const [tokenType, token] = authorization.split(/\s+/);

            if (!token || tokenType.toLowerCase() !== settings.tokenType.toLowerCase()) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            }

            let authObj: ICommonRequest.AuthorizationObj = await authService.verifyToken({ token: token })

            if (!authObj || !authObj.deviceid || !authObj.devicetype || !authObj.tokenType || authObj.tokenType != Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            } else {
                ctx.state.user = authObj
            }
        } catch (error) {
            return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
        }
        await next()
    }
}
