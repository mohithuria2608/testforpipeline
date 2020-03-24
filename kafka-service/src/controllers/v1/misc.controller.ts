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
                        let configInitArgv: ICommonRequest.IInitConfiguration = {
                            bootstrap: false
                        }
                        if (argv.store_code && argv.store_code != "")
                            configInitArgv.store_code = argv.store_code
                        if (argv.type && argv.type != "")
                            configInitArgv.type = argv.type
                        configuration.init(configInitArgv)
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