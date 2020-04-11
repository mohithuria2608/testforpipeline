import * as config from "config"
import { Middleware, Context } from 'koa'
import * as Constant from '../constant';

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            let headers: ICommonRequest.IHeaders = ctx.headers
            let appversion = Constant.APP_VERSION[headers.devicetype]
            if (appversion && appversion.id) {
                if (headers.appversion != appversion.appversion) {
                    switch (appversion.type) {
                        case Constant.DATABASE.TYPE.APP_VERSION.SKIP: {
                            ctx.set('X-skip', 1);
                            break;
                        }
                        case Constant.DATABASE.TYPE.APP_VERSION.FORCE: {
                            return Promise.reject(Constant.STATUS_MSG.ERROR.E410.FORCE_UPDATE)
                        }
                        default: {
                            ctx.set('X-skip', 0);
                            break;
                        }
                    }
                } else
                    ctx.set('X-skip', 0);

            } else
                ctx.set('X-skip', 0);

        } catch (error) {
            return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        }
        await next()
    }
}