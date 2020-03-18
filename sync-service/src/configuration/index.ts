import * as config from "config"
import * as Constant from '../constant'
import { consolelog } from '../utils'
import * as ENTITY from '../entity'

export class Configuration {

    constructor() { }

    async init() {
        try {
            let generalConfig = await ENTITY.ConfigE.getConfig({ type: Constant.DATABASE.TYPE.CONFIG.GENERAL })
            if (generalConfig && generalConfig.general && (generalConfig.createdAt != global.configSync.general))
                Constant.generalConfigSync(generalConfig.general, generalConfig.createdAt)


            let config = await ENTITY.ConfigE.getConfig({ store_code: Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE })

            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstraping Config", JSON.stringify(error), false)
            return {}
        }
    }
}

export const configuration = new Configuration();