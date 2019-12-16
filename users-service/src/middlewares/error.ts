import { Middleware, Context } from 'koa'
import { sendError, consolelog } from '../utils'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (err) {
      consolelog(process.cwd(), "In error handler", err, false)

      let errReturn = sendError(err)
      ctx.status = errReturn.statusCode;
      ctx.body = errReturn.payload;
    }
  }
}