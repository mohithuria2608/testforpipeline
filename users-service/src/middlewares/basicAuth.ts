import { Middleware, Context } from 'koa'
import * as CONSTANT from '../constant/appConstants'
import * as utils from '../utils'

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            let settings = {
                tokenType: "Basic"
            }
            let authorization = ctx.header.authorization;
            const [tokenType, token] = authorization.split(/\s+/);

            if (!token || tokenType.toLowerCase() !== settings.tokenType.toLowerCase()) {
                return Promise.reject(utils.sendError(CONSTANT.STATUS_MSG.ERROR.E401.MISSINING_AUTHENTICATION(settings.tokenType)))
            }

            let checkFunction = await basicAuthFunction(token)
            if (!checkFunction) {
                return Promise.reject(utils.sendError(CONSTANT.STATUS_MSG.ERROR.E401.UNAUTHORIZED))
            }
        } catch (error) {
            return Promise.reject(error)
        }
        await next()
    }
}

let basicAuthFunction = async function (access_token) {
    utils.consolelog('access_token', access_token, true)
    const credentials = Buffer.from(access_token, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    utils.consolelog('credentials', credentials, true)
    if (username !== password) {
        return false;
    }
    return true
}