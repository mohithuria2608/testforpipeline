import { Middleware, Context } from 'koa'
import { sendError } from '../utils'
import * as Constant from '../constant'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (error) {
      let language = ctx.request.header.language ? ctx.request.header.language : Constant.DATABASE.LANGUAGE.EN
      let errReturn = sendError(error, language)
      ctx.status = errReturn.httpCode;
      ctx.body = errReturn.payload;
    }
  }
}