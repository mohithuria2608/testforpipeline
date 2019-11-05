import { Middleware, Context } from 'koa'
import { sendError } from '../utils'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (err) {
      let errReturn = sendError(err)
      ctx.status = errReturn.statusCode;
      ctx.body = errReturn;
    }
  }
}