import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { syncService } from '../../grpc/client';
import { configuration } from '../../configuration';

export class MiscController {

    constructor() { }

    /**
    * @method INTERNAL
    * @description : PING SERVICES
    * */
     async pingService(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let argv: ICommonRequest.IPingService = JSON.parse(payload.as.argv)
            if (argv && argv.set) {
                let set = argv.set;
                consolelog(process.cwd(), "Pinged by  :::", set, true)
                switch (set) {
                    case Constant.SET_NAME.CONFIG: {
                        if (argv.store_code) {
                            let storeCodeConfig: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ store_code: argv.store_code, type: Constant.DATABASE.TYPE.CONFIG.PAYMENT })
                            if (storeCodeConfig && storeCodeConfig.length > 0) {
                                if (storeCodeConfig[0].payment) {
                                    if (storeCodeConfig[0].createdAt != global.configSync.payment)
                                        Constant.paymentConfigSync(storeCodeConfig[0].store_code, storeCodeConfig[0].payment, storeCodeConfig[0].createdAt)
                                }
                            }
                        } else if (argv.type) {
                            let typeConfig: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ type: argv.type })
                            if (typeConfig && typeConfig.length > 0) {
                                switch (argv.type) {
                                    case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                                        if (typeConfig[0].createdAt != global.configSync.general)
                                            Constant.generalConfigSync(typeConfig[0].general, typeConfig[0].createdAt)
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                    case Constant.SET_NAME.APP_VERSION: {
                        let appVersionConfig = await syncService.fetchAppversion({ isActive: 1 })
                        consolelog(process.cwd(), "appversion", JSON.stringify(appVersionConfig), true)
                        break;
                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "pingService", JSON.stringify(error), false)
            return {}
        }
    }
}

export const miscController = new MiscController();