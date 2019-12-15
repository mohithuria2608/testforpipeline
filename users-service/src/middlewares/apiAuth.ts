import { Middleware, Context } from 'koa'
import * as Constant from '../constant'

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            // utils.consolelog(process.cwd(),'In API Auth', ctx.request.headers.api_key, false)
            let checkApiKeyFunction = await apiKeyFunction(ctx.request.headers.api_key)
            if (!checkApiKeyFunction) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            }
        } catch (error) {
            return Promise.reject(error)
        }
        await next()
    }
}

let apiKeyFunction = async function (api_key) {
    return (api_key === "1234") ? true : false
}
