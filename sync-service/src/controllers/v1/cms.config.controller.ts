import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client'

export class CmsConfigController {

    constructor() { }

    /**
    * @method BOOTSTRAP
    * @description : Post bulk configuration data
    * */
    async bootstrapConfiguration() {
        try {
            await Aerospike.truncate({ set: ENTITY.ConfigE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/configuration.json', 'utf-8');
            let config = JSON.parse(rawdata);
            for (const iterator of config) {
                ENTITY.ConfigE.postConfiguration(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapConfiguration", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    */
    async syncConfigFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data: ICmsConfigRequest.ICmsConfig = JSON.parse(payload.as.argv)
            switch (data.type) {
                case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                        if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                let store_code = data.data['store_code']
                                data.data.map(async config => {
                                    let dataToSave = {
                                        id: data.type + "_" + config.store_code,
                                        type: data.type,
                                    }
                                    if (config.store_code)
                                        dataToSave['store_code'] = config.store_code
                                    if (config.store_id)
                                        dataToSave['store_id'] = config.store_id
                                    if (config.free_shipping)
                                        dataToSave['free_shipping'] = config.free_shipping
                                    if (config.flat_rate)
                                        dataToSave['flat_rate'] = config.flat_rate
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['id'],
                                        createOrReplace: true,
                                    }
                                    await Aerospike.put(putArg)
                                })
                                let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                    set: Constant.SET_NAME.PING_SERVICE,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify({
                                            set: Constant.SET_NAME.CONFIG,
                                            service: [
                                                Constant.MICROSERVICE.PAYMENT,
                                                Constant.MICROSERVICE.ORDER,
                                                Constant.MICROSERVICE.USER
                                            ],
                                            store_code: store_code
                                        })
                                    },
                                    inQ: true
                                }
                                kafkaService.kafkaSync(pingServices)
                            } else {
                                return Promise.reject("Unhandled error while saving general configs from cms")
                            }
                        }
                        else if (payload.as.get) {
                            await ENTITY.ConfigE.getConfig(data)
                        }
                    }
                    break;
                }
                case Constant.DATABASE.TYPE.CONFIG.PAYMENT: {
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                        if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                let store_code = data.data['store_code']
                                data.data.map(async config => {
                                    console.log("config", config)
                                    let dataToSave = {
                                        id: data.type + "_" + config.store_code,
                                        type: data.type
                                    }
                                    if (config.store_code)
                                        dataToSave['store_code'] = config.store_code
                                    if (config.store_id)
                                        dataToSave['store_id'] = config.store_id
                                    if (config.noon_pay_config)
                                        dataToSave['noon_pay_config'] = config.noon_pay_config
                                    if (config.cod_info)
                                        dataToSave['cod_info'] = config.cod_info

                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['id'],
                                        createOrReplace: true
                                    }
                                    await Aerospike.put(putArg)
                                })
                                let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                    set: Constant.SET_NAME.PING_SERVICE,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify({
                                            set: Constant.SET_NAME.CONFIG,
                                            service: [
                                                Constant.MICROSERVICE.PAYMENT,
                                                Constant.MICROSERVICE.ORDER,
                                                Constant.MICROSERVICE.USER
                                            ],
                                            store_code: store_code
                                        })
                                    },
                                    inQ: true
                                }
                                kafkaService.kafkaSync(pingServices)
                            } else {
                                return Promise.reject("Unhandled error while saving payment configs from cms")
                            }
                        }
                        else if (payload.as.get) {
                            await ENTITY.ConfigE.getConfig(data)
                        }
                    }
                    break;
                }
                case Constant.DATABASE.TYPE.CONFIG.SHIPMENT: {
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                        if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                let store_code = data.data['store_code']
                                data.data.map(async config => {
                                    let dataToSave = {
                                        id: data.type + "_" + config.store_code,
                                        type: data.type,
                                    }
                                    if (config.store_code)
                                        dataToSave['store_code'] = config.store_code
                                    if (config.store_id)
                                        dataToSave['store_id'] = config.store_id
                                    if (config.free_shipping)
                                        dataToSave['free_shipping'] = config.free_shipping
                                    if (config.flat_rate)
                                        dataToSave['flat_rate'] = config.flat_rate
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['id'],
                                        createOrReplace: true,
                                    }
                                    await Aerospike.put(putArg)
                                })
                                let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                    set: Constant.SET_NAME.PING_SERVICE,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify({
                                            set: Constant.SET_NAME.CONFIG,
                                            service: [
                                                Constant.MICROSERVICE.ORDER,
                                                Constant.MICROSERVICE.USER
                                            ],
                                            store_code: store_code
                                        })
                                    },
                                    inQ: true
                                }
                                kafkaService.kafkaSync(pingServices)
                            } else {
                                return Promise.reject("Unhandled error while saving payment configs from cms")
                            }
                        }
                        else if (payload.as.get) {
                            await ENTITY.ConfigE.getConfig(data)
                        }
                    }
                    break;
                }
                case Constant.DATABASE.TYPE.CONFIG.COUNTRY_SPECIFIC: {
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                        if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                let store_code = data.data['store_code']
                                data.data.map(async config => {
                                    let dataToSave = {
                                        id: data.type + "_" + config.store_code,
                                        type: data.type,
                                    }
                                    if (config.country_code)
                                        dataToSave['country_code'] = config.country_code
                                    if (config.country_name)
                                        dataToSave['country_name'] = config.country_name
                                    if (config.concept_id)
                                        dataToSave['concept_id'] = config.concept_id
                                    if (config.base_currency)
                                        dataToSave['base_currency'] = config.base_currency
                                    if (config.licence)
                                        dataToSave['licence'] = config.licence
                                    if (config.brand_kfc)
                                        dataToSave['brand_kfc'] = config.brand_kfc
                                    if (config.ccode)
                                        dataToSave['ccode'] = config.ccode
                                    if (config.language_en)
                                        dataToSave['language_en'] = config.language_en
                                    if (config.language_ar)
                                        dataToSave['language_ar'] = config.language_ar
                                    if (config.menus)
                                        dataToSave['menus'] = config.menus

                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['id'],
                                        createOrReplace: true,
                                    }
                                    await Aerospike.put(putArg)
                                })
                                let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                    set: Constant.SET_NAME.PING_SERVICE,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify({
                                            set: Constant.SET_NAME.CONFIG,
                                            service: [
                                                Constant.MICROSERVICE.ORDER,
                                                Constant.MICROSERVICE.USER
                                            ],
                                            store_code: store_code
                                        })
                                    },
                                    inQ: true
                                }
                                kafkaService.kafkaSync(pingServices)
                            } else {
                                return Promise.reject("Unhandled error while saving country specific configs from cms")
                            }
                        }
                        else if (payload.as.get) {
                            await ENTITY.ConfigE.getConfig(data)
                        }
                    }
                    break;
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncConfigFromKafka", JSON.stringify(error), false)
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
            let configChange: IKafkaGrpcRequest.IKafkaBody = {
                set: ENTITY.ConfigE.set,
                as: {
                    reset: true,
                    argv: JSON.stringify(payload)
                },
                inQ: true
            }
            kafkaService.kafkaSync(configChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postConfig", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string=} type
     * @description Get config from as 
     */
    async getConfig(payload: IConfigRequest.IFetchConfig) {
        try {
            let config = await ENTITY.ConfigE.getConfig(payload)
            return config
        } catch (error) {
            consolelog(process.cwd(), "getConfig", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsConfigController = new CmsConfigController();