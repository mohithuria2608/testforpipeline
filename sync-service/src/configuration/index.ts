import * as config from "config"
import * as Constant from '../constant'
import { consolelog, bootstrap } from '../utils'
import * as ENTITY from '../entity'

export class Configuration {

    constructor() { }

    async init(argv: ICommonRequest.IInitConfiguration) {
        try {
            let promise = []
            if (argv.bootstrap) {
                promise.push(this.initGeneralConfig())
                promise.push(this.initStoreCodeConfig())
            }
            else {
                if (argv.type)
                    promise.push(this.initGeneralConfig(argv.type))
                if (argv.store_code)
                    promise.push(this.initStoreCodeConfig(argv.store_code))
            }
            if (promise && promise.length > 0)
                await Promise.all(promise)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstraping Config", JSON.stringify(error), false)
            return {}
        }
    }

    async initGeneralConfig(type?: string) {
        try {
            if (!type)
                type = Constant.DATABASE.TYPE.CONFIG.GENERAL
            let generalConfig = await ENTITY.ConfigE.getConfig({ type: type })
            if (generalConfig && generalConfig.length > 0) {
                if (generalConfig[0].general && (generalConfig[0].createdAt != global.configSync.general))
                    Constant.generalConfigSync(generalConfig[0].general, generalConfig[0].createdAt)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "initGeneralConfig", JSON.stringify(error), false)
            return {}
        }
    }

    async initStoreCodeConfig(store_code?: string) {
        try {
            if (!store_code)
                store_code = Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
            let config = await ENTITY.ConfigE.getConfig({ store_code: store_code })
            if (config && config.length > 0) {
                config.map(singleConfig => {
                    if (singleConfig.id) {
                        switch (singleConfig.type) {
                            case Constant.DATABASE.TYPE.CONFIG.PAYMENT: {
                                if (singleConfig.payment && (singleConfig.createdAt != global.configSync.payment))
                                    Constant.paymentConfigSync(singleConfig.store_code, singleConfig.payment, singleConfig.createdAt)
                                break;
                            }
                            case Constant.DATABASE.TYPE.CONFIG.SHIPMENT: {
                                if (singleConfig.payment && (singleConfig.createdAt != global.configSync.shipment))
                                    Constant.shipmentConfigSync(singleConfig.store_code, singleConfig.shipment, singleConfig.createdAt)
                                break;
                            }
                        }
                    }
                })
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "initStoreCodeConfig", JSON.stringify(error), false)
            return {}
        }
    }
}

export const configuration = new Configuration();