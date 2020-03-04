import { IMiddleware } from 'koa-router';
import * as compose from 'koa-compose';
import * as logger from 'koa-logger';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as Constant from '../constant'

import handleErrors from './error'
import activityLog from './activityLog'
import auth from './auth'
import appVersion from './app.version'

export default function middleware() {
  return compose([
    logger(),
    handleErrors(),
    serve('./views'),  // static resources don't need authorization
    serve('./doc'),
    cors(),
    bodyParser({ formLimit: '100mb', jsonLimit: '100mb' }),
  ])
}

export * from './joi.validator'

export function getMiddleware(middlewares: Constant.MIDDLEWARE[]): IMiddleware[] {
  let temp: IMiddleware[] = []
  if (middlewares.indexOf(Constant.MIDDLEWARE.APP_VERSION) != -1)
    temp.push(appVersion())
  if (middlewares.indexOf(Constant.MIDDLEWARE.AUTH) != -1)
    temp.push(auth())
  if (middlewares.indexOf(Constant.MIDDLEWARE.ACTIVITY_LOG) != -1)
    temp.push(activityLog())
  return temp
}
