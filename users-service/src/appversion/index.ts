import * as config from "config"
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { syncService } from '../grpc/client';

export class Appversion {

    constructor() { }

    async init() {
        try {
            let appversion = await syncService.fetchAppversion({ isActive: 1 })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "init app version", JSON.stringify(error), false)
            return {}
        }
    }
}

export const appversion = new Appversion();