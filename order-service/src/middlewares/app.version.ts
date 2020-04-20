import * as config from "config"
import { Middleware, Context } from 'koa'
import * as Constant from '../constant';

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            let headers: ICommonRequest.IHeaders = ctx.headers
            console.log("headers-----------------", headers)
            let appversion = Constant.APP_VERSION[headers.devicetype]
            let check = -1;
            /**
             * @description  { -1 : force, 0 : skip, 1 : normal}
             */
            if (appversion && appversion.length > 0) {
                appversion.map(obj => {
                    console.log("obj-----------------", obj)
                    if (obj.appversion == headers.appversion) {
                        switch (obj.type) {
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
                                console.log("else check-----------------", check)
                                break;
                            }
                        }
                    } else {
                        console.log("else check-----------------", check)
                    }
                })
            }
            console.log("check-----------------", check)
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