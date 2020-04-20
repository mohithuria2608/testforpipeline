import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client'

export class CmsAppversionController {

    constructor() { }

    /**
   * @method GRPC
   */
    async syncAppversionFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data: ICmsAppversionRequest.ICmsAppversion = JSON.parse(payload.as.argv)
            if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                if (payload.as.reset) {
                    if (data.data && data.data.length > 0) {
                        Aerospike.truncate({ set: ENTITY.AppversionE.set })
                        data.data.map(async appversion => {
                            let putArg: IAerospike.Put = {
                                bins: appversion,
                                set: ENTITY.AppversionE.set,
                                key: appversion['id'],
                                createOrReplace: true,
                            }
                            await Aerospike.put(putArg)
                        })
                        let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                            set: Constant.SET_NAME.PING_SERVICE,
                            as: {
                                create: true,
                                argv: JSON.stringify({
                                    set: Constant.SET_NAME.APP_VERSION,
                                    service: [
                                        Constant.MICROSERVICE.USER,
                                        Constant.MICROSERVICE.MENU,
                                        Constant.MICROSERVICE.ORDER,
                                        Constant.MICROSERVICE.LOCATION,
                                        Constant.MICROSERVICE.PAYMENT,
                                        Constant.MICROSERVICE.DEEPLINK,
                                        Constant.MICROSERVICE.PROMOTION,
                                        Constant.MICROSERVICE.HOME
                                    ],
                                })
                            },
                            inQ: true
                        }
                        kafkaService.kafkaSync(pingServices)
                    } else {
                        return Promise.reject("Unhandled error while saving general appversions from cms")
                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncappversionFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {any} payload
     * @description creates a appversion from CMS to aerospike
     */
    async postAppversion(payload: ICmsAppversionRequest.ICmsAppversion) {
        try {
            let appversionChange: IKafkaGrpcRequest.IKafkaBody = {
                set: ENTITY.AppversionE.set,
                as: {
                    reset: true,
                    argv: JSON.stringify(payload)
                },
                inQ: true
            }
            kafkaService.kafkaSync(appversionChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postappversion", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string=} type
     * @param {number=} isActive
     * @param {string=} deviceType
     * @description Get appversion from as 
     */
    async getAppversion(payload: IAppversionRequest.IFetchAppversion) {
        try {
            let appversion = await ENTITY.AppversionE.getAppversion(payload)
            return appversion
        } catch (error) {
            consolelog(process.cwd(), "getAppversion", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsAppversionController = new CmsAppversionController();