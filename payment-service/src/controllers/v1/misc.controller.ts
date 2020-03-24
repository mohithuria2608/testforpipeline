import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { syncService } from '../../grpc/client';

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
                            let config: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ store_code: argv.store_code, type: Constant.DATABASE.TYPE.CONFIG.PAYMENT })
                            if (config && config.length > 0) {
                                if (config[0].payment) {
                                    if (config[0].createdAt != global.configSync.payment)
                                        Constant.paymentConfigSync(config[0].store_code, config[0].payment, config[0].createdAt)
                                }
                            }
                        } else if (argv.type) {
                            let config: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ type: argv.type })
                            if (config && config.length > 0) {
                                switch (argv.type) {
                                    case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                                        if (config[0].createdAt != global.configSync.general)
                                            Constant.generalConfigSync(config[0].general, config[0].createdAt)
                                        break;
                                    }
                                }
                            }
                        }
                        consolelog(process.cwd(), "config", JSON.stringify(config), true)
                        break;
                    }
                    case Constant.SET_NAME.APP_VERSION: {
                        let config = await syncService.fetchAppversion({ isActive: 1 })
                        consolelog(process.cwd(), "appversion", JSON.stringify(config), true)
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