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
                case Constant.DATABASE.TYPE.SYNC_CONFIG.PAYMENT: {
                    if (payload.as.create || payload.as.update || payload.as.reset || payload.as.get) {
                        if (payload.as.create) {

                        }
                        else if (payload.as.update) {

                        }
                        else if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                data.data.map(async config => {
                                    let dataToSave = {
                                        type: data.type,
                                    }
                                    // if (config.store_code)
                                    //     dataToSave['storeCode'] = parseInt(config.store_id)
                                    // if (config.)
                                    //     dataToSave['cmsStoreRef'] = config.store_code
                                    // if (config.store_code)
                                    //     dataToSave['noonPayConfig'] = config.noon_pay_config
                                    // if (config.store_code)
                                    //     dataToSave['codInfo'] = config.cod_info
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['cmsStoreRef'],
                                        ttl: 0,
                                        create: true,
                                    }
                                    await Aerospike.put(putArg)
                                })
                            } else {
                                return Promise.reject("Unhandled error while saving payment configs from cms")
                            }
                        }
                        else if (payload.as.get) {
                            await ENTITY.ConfigE.getConfig(data)
                        }
                    }
                }
                case Constant.DATABASE.TYPE.SYNC_CONFIG.SHIPMENT: {
                    if (payload.as.create || payload.as.update || payload.as.reset || payload.as.get) {
                        if (payload.as.create) {

                        }
                        else if (payload.as.update) {

                        }
                        else if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                data.data.map(async config => {
                                    let dataToSave = {
                                        type: data.type,
                                    }
                                    if (config.store_code)
                                        dataToSave['cmsStoreRef'] = parseInt(config.store_id)
                                    if (config.store_code)
                                        dataToSave['storeCode'] = config.store_code
                                    if (config.store_code)
                                        dataToSave['noonPayConfig'] = config.noon_pay_config
                                    if (config.store_code)
                                        dataToSave['codInfo'] = config.cod_info
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['cmsStoreRef'],
                                        ttl: 0,
                                        create: true,
                                    }
                                    await Aerospike.put(putArg)
                                })
                            } else {
                                return Promise.reject("Unhandled error while saving payment configs from cms")
                            }
                        }
                        else if (payload.as.get) {
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
     * @description creates a config from CMS to aerospike
     */
    async postConfig(headers: ICommonRequest.IHeaders, payload: ICmsConfigRequest.ICmsConfig) {
        try {
            let configChange = {
                set: ENTITY.ConfigE.set
            }
            if (payload.action == Constant.DATABASE.TYPE.SYNC_ACTION.CREATE) {
                configChange['as']['create'] = true
                configChange['as']['argv'] = JSON.stringify(payload)
            }
            if (payload.action == Constant.DATABASE.TYPE.SYNC_ACTION.UPDATE) {
                configChange['as']['update'] = true
                configChange['as']['argv'] = JSON.stringify(payload)
            }
            if (payload.action == Constant.DATABASE.TYPE.SYNC_ACTION.RESET) {
                configChange['as']['reset'] = true
                configChange['as']['argv'] = JSON.stringify(payload)
            }
            this.syncConfigFromKafka(configChange)
            // kafkaService.kafkaSync(configChange)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postConfig", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GRPC
     * @param {string=} cmsStoreRef
     * @param {string=} type
     * @description Get config from as 
     */
    async getConfig(payload: IConfigRequest.IFetchConfig) {
        try {
            let data = {}
            if (payload.cmsStoreRef)
                data['cmsStoreRef'] = payload.cmsStoreRef
            if (payload.type)
                data['type'] = payload.type
            let config = await ENTITY.ConfigE.getConfig(data)
            return config
        } catch (err) {
            consolelog(process.cwd(), "getConfig", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsConfigController = new CmsConfigController();