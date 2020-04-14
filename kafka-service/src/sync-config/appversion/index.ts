import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { syncService } from '../../grpc/client';

export class Appversion {

    constructor() { }

    async init() {
        try {
            let appversion = await syncService.fetchAppversion({ isActive: 1 })
            if (appversion && appversion.length > 0) {
                let androidAppVersion = []
                let iosAppVersion = []
                appversion.forEach(vers => {
                    if (vers.deviceType == Constant.DATABASE.TYPE.DEVICE.ANDROID)
                        androidAppVersion.push(vers)
                    else
                        iosAppVersion.push(vers)
                })
                if (androidAppVersion && androidAppVersion.length > 0)
                    Constant.APP_VERSION[Constant.DATABASE.TYPE.DEVICE.ANDROID] = androidAppVersion
                if (iosAppVersion && iosAppVersion.length > 0)
                    Constant.APP_VERSION[Constant.DATABASE.TYPE.DEVICE.IOS] = iosAppVersion
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "init app version", JSON.stringify(error), false)
            return {}
        }
    }
}

export const appversion = new Appversion();