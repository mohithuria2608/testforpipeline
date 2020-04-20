import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { appversion } from '../../sync-config/appversion';
import { configuration } from '../../sync-config/configuration';


export class MiscController {

    constructor() { }

    async healthCheck(data: ICommonRequest.IGrpcHealthCheck) {
        try {
            return { state: true }
        } catch (error) {
            consolelog(process.cwd(), "healthCheck", JSON.stringify(error), false)
            return { state: false }
        }
    }

    /**
    * @method INTERNAL
    * @description : PING SERVICES
    * */
    async pingService(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let argv: ICommonRequest.IPingService = JSON.parse(payload.as.argv)
            if (argv && argv.set) {
                let set = argv.set;
                consolelog(process.cwd(), "Pinged for  :::", set, true)
                switch (set) {
                    case Constant.SET_NAME.CONFIG: {
                        await configuration.init({
                            store_code: argv.store_code,
                            type: argv.type,
                            bootstrap: false,
                            country: argv.country
                        })
                        break;
                    }
                    case Constant.SET_NAME.APP_VERSION: {
                        await appversion.init();
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