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
                        let config
                        if (argv.store_code) {
                            config = await syncService.fetchConfig({ store_code: argv.store_code })
                        } else if (argv.type) {
                            config = await syncService.fetchConfig({ type: argv.type })
                            switch (argv.type) {
                                case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                                    if (config.createdAt != global.configSync.general)
                                        Constant.generalConfigSync(config.general, config.createdAt)
                                    break;
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