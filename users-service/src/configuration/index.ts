import * as config from "config"
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { syncService } from '../grpc/client';

export class Configuration {

    constructor() { }

    async init() {
        try {
            let config = await syncService.fetchConfig({ store_code: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE })
            
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstraping Config", JSON.stringify(error), false)
            return {}
        }
    }
}

export const configuration = new Configuration();