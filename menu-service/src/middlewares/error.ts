import { Middleware, Context } from 'koa'
import { sendError, consolelog } from '../utils'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (error) {
      consolelog(process.cwd(), "In error handler", error, false)

      let errReturn = sendError(error)
      ctx.status = errReturn.httpCode;
      ctx.body = errReturn.payload;
    }
  }
}