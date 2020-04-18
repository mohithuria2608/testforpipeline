import { Middleware, Context } from 'koa'
import * as Constant from '../constant';

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            let headers: ICommonRequest.IHeaders = ctx.headers
            let appversion = Constant.APP_VERSION[headers.devicetype]
            let check = -1;
            /**
             * @description  { -1 : force, 0 : skip, 1 : normal}
             */
            if (appversion && appversion.length > 0) {
                appversion.map(obj => {
                    if (obj.appversion == headers.appversion) {
                        switch (appversion.type) {
                            case Constant.DATABASE.TYPE.APP_VERSION.FORCE: {
                                check = -1
                                break;
                            }
                            case Constant.DATABASE.TYPE.APP_VERSION.SKIP: {
                                check = 0
                                break;
                            }
                            case Constant.DATABASE.TYPE.APP_VERSION.NORMAL: {
                                check = 1
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }
                })
            }
            switch (check) {
                case -1: { return Promise.reject(Constant.STATUS_MSG.ERROR.E410.FORCE_UPDATE) }
                case 0: { ctx.set('X-skip', 1); break; }
                case 1: { ctx.set('X-skip', 0); break; }
                default: { return Promise.reject(Constant.STATUS_MSG.ERROR.E410.FORCE_UPDATE) }
            }
        } catch (error) {
            return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        }
        await next()
    }
}