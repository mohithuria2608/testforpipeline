import { IMiddleware } from 'koa-router';
import * as compose from 'koa-compose';
import * as logger from 'koa-logger';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as Constant from '../constant'

import handleErrors from './error'
import apiAuth from './apiAuth'
import guestAuth from './guestAuth'
import activityLog from './activityLog'


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
  if (middlewares.indexOf(Constant.MIDDLEWARE.API_AUTH) != -1)
    temp.push(apiAuth())
  if (middlewares.indexOf(Constant.MIDDLEWARE.GUEST_AUTH) != -1)
    temp.push(guestAuth())
  if (middlewares.indexOf(Constant.MIDDLEWARE.ACTIVITY_LOG) != -1)
    temp.push(activityLog())
  return temp
}
