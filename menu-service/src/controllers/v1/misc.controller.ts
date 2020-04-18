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
                            let storeCodeConfig: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ store_code: argv.store_code, type: Constant.DATABASE.TYPE.CONFIG.PAYMENT })
                            if (storeCodeConfig && storeCodeConfig.length > 0) {
                                if (storeCodeConfig[0].payment) {
                                    if (storeCodeConfig[0].createdAt != global.configSync.payment)
                                        Constant.paymentConfigSync(storeCodeConfig[0].store_code, storeCodeConfig[0].payment, storeCodeConfig[0].createdAt)
                                }
                                if (storeCodeConfig[0].shipment) {
                                    if (storeCodeConfig[0].createdAt != global.configSync.shipment)
                                        Constant.shipmentConfigSync(storeCodeConfig[0].store_code, storeCodeConfig[0].shipment, storeCodeConfig[0].createdAt)
                                }
                            }
                        } else if (argv.type || argv.country) {
                            let typeConfig: ISyncGrpcRequest.IConfig[] = await syncService.fetchConfig({ type: argv.type })
                            if (typeConfig && typeConfig.length > 0) {
                                switch (argv.type) {
                                    case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                                        if (typeConfig[0].createdAt != global.configSync.general)
                                            Constant.generalConfigSync(typeConfig[0].general, typeConfig[0].createdAt)
                                        break;
                                    }
                                    case Constant.DATABASE.TYPE.CONFIG.KAFKA: {
                                        if (typeConfig[0].createdAt != global.configSync.kafka)
                                            Constant.kafkaConfigSync(typeConfig[0].kafka, typeConfig[0].createdAt)
                                        break;
                                    }
                                    case Constant.DATABASE.TYPE.CONFIG.ORDER_STATUS: {
                                        if (typeConfig[0].createdAt != global.configSync.orderStatus)
                                            Constant.orderStatusConfigSync(typeConfig[0].orderStatus, typeConfig[0].createdAt)
                                        break;
                                    }
                                    case Constant.DATABASE.TYPE.CONFIG.COUNTRY_SPECIFIC: {
                                        if (argv.country) {
                                            if (typeConfig[0].createdAt != global.configSync.countrySpecific)
                                                Constant.countrySpecificConfigSync(argv.country, typeConfig[0].countrySpecific, typeConfig[0].createdAt)
                                        }
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