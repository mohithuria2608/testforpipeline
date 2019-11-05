import { Middleware, Context } from 'koa'
import * as CONSTANT from '../constant/appConstants'
import { consolelog } from '../utils'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (err) {
      // let errReturn = await errorHandler(err)
      ctx.status = err.statusCode;
      ctx.body = err.payload;
    }
  }
}