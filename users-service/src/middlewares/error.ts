import { Middleware, Context } from 'koa'
import { consolelog, sendError } from '../utils'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (err) {
      consolelog("In error middleware", JSON.stringify(err), false)
      let errReturn = sendError(err)
      ctx.status = errReturn.statusCode;
      ctx.body = errReturn;
    }
  }
}