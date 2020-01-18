import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client'

export class CmsConfigController {

    constructor() { }

    /**
    * @method GRPC
    */
    async syncConfigFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data: ICmsConfigRequest.ICmsConfig = JSON.parse(payload.as.argv)
            switch (data.type) {
                case "payment": {
                    if (payload.as.create || payload.as.update || payload.as.get) {
                        if (payload.as.create) {
                            if (data.data && data.data.length > 0) {
                                data.data.map(async config => {
                                    let dataToSave = {
                                        type: data.type,
                                    }
                                    if (config.store_code)
                                        dataToSave['cmsStoreRef'] = config.store_id
                                    if (config.store_code)
                                        dataToSave['storeCode'] = config.store_code
                                    if (config.store_code)
                                        dataToSave['noonPayConfig'] = config.noon_pay_config
                                    if (config.store_code)
                                        dataToSave['codInfo'] = config.cod_info
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['storeId'],
                                        ttl: 0,
                                        create: true,
                                    }
                                    await Aerospike.put(putArg)
                                })
                            } else {
                                return Promise.reject("Unhandled error while saving payment configs from cms")
                            }
                        }
                        if (payload.as.get) {
                            await ENTITY.ConfigE.getConfig(data)
                        }
                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncConfigFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {any} payload
     * @description creates and saves a config from CMS to aerospike
     */
    async postConfig(headers: ICommonRequest.IHeaders, payload: ICmsConfigRequest.ICmsConfig) {
        try {
            let configChange = {
                set: ENTITY.ConfigE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            if (payload.action == "update") {
                configChange['as']['update'] = true
                delete configChange['as']['create']
            }
            kafkaService.kafkaSync(configChange)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postConfig", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsConfigController = new CmsConfigController();