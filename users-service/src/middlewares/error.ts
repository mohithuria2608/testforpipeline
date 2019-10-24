import { Middleware, Context } from 'koa'
import * as CONSTANT from '../constant/appConstants'
import * as utils from '../utils'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (err) {
      let errReturn = await errorHandler(err)
      ctx.status = errReturn.statusCode;
      ctx.body = errReturn.payload;
    }
  }
}

let errorHandler = async (err) => {
  utils.consolelog('errorHandler', JSON.stringify(err), false)
  if (err.isBoom) {
    return err.output
  } else {
    if (typeof err == "object" && err.message) {
      if (err.hasOwnProperty('statusCode')) {
        return {
          statusCode: err.statusCode,
          payload: err,
          headers: {}
        }
      } else if (typeof err.message == "string" && err.message.substring("Invalid Request")) {
        let splitJoiErr = err.message.split("[")
        splitJoiErr = splitJoiErr[1] ? splitJoiErr[1].split(']') : [err.message]
        let customErrorMessage = splitJoiErr[0]
        customErrorMessage = customErrorMessage.replace(/"/g, '');
        customErrorMessage = customErrorMessage.replace('[', '');
        customErrorMessage = customErrorMessage.replace(']', '');
        return {
          statusCode: 400,
          payload: CONSTANT.STATUS_MSG.ERROR.E400.CUSTOM_VALIDATION_ERROR(customErrorMessage),
          headers: {}
        }
      }
      else {
        return {
          statusCode: 400,
          payload: CONSTANT.STATUS_MSG.ERROR.E400.DEFAULT,
          headers: {}
        }
      }
    }
    else {
      return {
        statusCode: 400,
        payload: CONSTANT.STATUS_MSG.ERROR.E400.DEFAULT,
        headers: {}
      }
    }
  }
}