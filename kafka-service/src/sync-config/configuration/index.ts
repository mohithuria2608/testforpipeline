import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { syncService } from '../../grpc/client';

export class Configuration {

    constructor() { }

    async init(argv: ICommonRequest.IInitConfiguration) {
        try {
            let promise = []
            if (argv.bootstrap) {
                promise.push(this.initGeneralConfig())
                promise.push(this.initKafkaConfig())
                promise.push(this.initOrderStatusConfig())
                promise.push(this.initStoreCodeConfig())
                promise.push(this.initCountryConfig())
            }
            else {
                if (argv.type) {
                    switch (argv.type) {
                        case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                            promise.push(this.initGeneralConfig())
                            break;
                        }
                        case Constant.DATABASE.TYPE.CONFIG.KAFKA: {
                            promise.push(this.initKafkaConfig())
                            break;
                        }
                        case Constant.DATABASE.TYPE.CONFIG.ORDER_STATUS: {
                            promise.push(this.initOrderStatusConfig())
                            break;
                        }
                        case Constant.DATABASE.TYPE.CONFIG.COUNTRY_SPECIFIC: {
                            if (argv.country)
                                promise.push(this.initCountryConfig(argv.type))
                            break;
                        }
                    }
                }
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

    async initGeneralConfig() {
        try {
            let generalConfig = await syncService.fetchConfig({ type: Constant.DATABASE.TYPE.CONFIG.GENERAL })
            if (generalConfig && generalConfig.length > 0) {
                if (generalConfig[0].general && (generalConfig[0].createdAt != global.configSync.general))
                    Constant.generalConfigSync(generalConfig[0].general, generalConfig[0].createdAt)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "initGeneralConfig", JSON.stringify(error), false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
        }
    }

    async initKafkaConfig() {
        try {
            let kafkaConfig = await syncService.fetchConfig({ type: Constant.DATABASE.TYPE.CONFIG.KAFKA })
            if (kafkaConfig && kafkaConfig.length > 0) {
                if (kafkaConfig[0].kafka && (kafkaConfig[0].createdAt != global.configSync.kafka))
                    Constant.kafkaConfigSync(kafkaConfig[0].kafka, kafkaConfig[0].createdAt)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "initKafkaConfig", JSON.stringify(error), false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
        }
    }

    async initOrderStatusConfig() {
        try {
            let orderStatusConfig = await syncService.fetchConfig({ type: Constant.DATABASE.TYPE.CONFIG.ORDER_STATUS })
            if (orderStatusConfig && orderStatusConfig.length > 0) {
                if (orderStatusConfig[0].orderStatus && (orderStatusConfig[0].createdAt != global.configSync.orderStatus))
                    Constant.orderStatusConfigSync(orderStatusConfig[0].orderStatus, orderStatusConfig[0].createdAt)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "initOrderStatusConfig", JSON.stringify(error), false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
        }
    }

    async initStoreCodeConfig(store_code?: string) {
        try {
            if (!store_code)
                store_code = Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
            let config = await syncService.fetchConfig({ store_code: store_code })
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
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "initStoreCodeConfig", JSON.stringify(error), false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
        }
    }

    async initCountryConfig(country?: string) {
        try {
            if (!country)
                country = "UAE"
            let countrySpecificConfig = await syncService.fetchConfig({ type: Constant.DATABASE.TYPE.CONFIG.COUNTRY_SPECIFIC })
            if (countrySpecificConfig && countrySpecificConfig.length > 0) {
                if (countrySpecificConfig[0].countrySpecific && (countrySpecificConfig[0].createdAt != global.configSync.kafka))
                    Constant.countrySpecificConfigSync(country, countrySpecificConfig[0].countrySpecific, countrySpecificConfig[0].createdAt)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "initCountryConfig", JSON.stringify(error), false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
        }
    }
}

export const configuration = new Configuration();