import * as config from "config"
import { Middleware, Context } from 'koa'
import * as Constant from '../constant';
import { consolelog } from '../utils';

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        let executionTime;
        let startTime = new Date().getTime();

        await next()
    }
}