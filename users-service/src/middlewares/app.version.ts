import * as config from "config"
import { Middleware, Context } from 'koa'
import * as Constant from '../constant';
import { consolelog } from '../utils';
import { syncService } from '../grpc/client';

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        try {
            let headers: ICommonRequest.IHeaders = ctx.headers
            let appversion = await syncService.fetchAppversion({ isActive: 1, deviceType: headers.devicetype })
            if (appversion && appversion.length > 0) {
                if (headers.appversion != appversion[0].appversion) {
                    switch (appversion[0].type) {
                        case Constant.DATABASE.TYPE.APP_VERSION.SKIP: {
                            // ctx.request.header['skipable'] = true
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