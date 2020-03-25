import * as config from 'config'
import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog, configIdGenerator } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client'
import { configuration } from '../../configuration';

export class CmsConfigController {

    constructor() { }

    /**
    * @method BOOTSTRAP
    * @description : Post bulk configuration data
    * */
    async bootstrapConfiguration() {
        try {
            let jsonPostfix = config.get("sdm.type")
            await Aerospike.truncate({ set: ENTITY.ConfigE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + `/../../../model/configuration_${jsonPostfix}.json`, 'utf-8');
            let configurations = JSON.parse(rawdata);
            for (const iterator of configurations) {
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
                                let configToSync = []
                                for (const config of data.data) {
                                    let dataToSave: IConfigRequest.IConfig = {
                                        id: data.type,
                                        type: data.type,
                                        general: {
                                            cms_page_data: config.cms_page_data,
                                            ttl_for_cart: config.ttl_for_cart ? parseInt(config.ttl_for_cart) : Constant.SERVER.DEFAULT_CART_TTL,
                                            initial_user_ttl: config.initial_user_ttl ? parseInt(config.initial_user_ttl) : 0,
                                            initial_guest_ttl: config.initial_guest_ttl ? parseInt(config.initial_guest_ttl) : 0,
                                            bypass_otp: config.bypass_otp ? parseInt(config.bypass_otp) : Constant.SERVER.BY_PASS_OTP,
                                            otp_expire: config.otp_expire ? parseInt(config.otp_expire) : Constant.SERVER.OTP_EXPIRE_TIME,
                                            access_token_expire_time: config.access_token_expire_time ? parseInt(config.access_token_expire_time) : Constant.SERVER.ACCESS_TOKEN_EXPIRE_TIME,
                                            refresh_token_expire_time: config.refresh_token_expire_time ? parseInt(config.refresh_token_expire_time) : Constant.SERVER.REFRESH_TOKEN_EXPIRE_TIME,
                                            cms_auth_exp: config.cms_auth_exp ? parseInt(config.cms_auth_exp) : 0,
                                            reg_ex_for_validation: config.reg_ex_for_validation ? config.reg_ex_for_validation : String.raw`^[1-9]\\d{8}$|^[1-9]\\d{8}$`,
                                            country_codes: config.country_codes ? config.country_codes : Constant.SERVER.PAYMENT_API_KEY_PREFIX,
                                            support: config.support ? config.support : Constant.SERVER.CUSTOMER_CARE,
                                            customer_care_email: config.customer_care_email ? config.customer_care_email : Constant.SERVER.SUPPORT_EMAIL,
                                            user_change_ttl: config.user_change_ttl ? parseInt(config.user_change_ttl) : Constant.SERVER.USERCHANGE_TTL,
                                            max_pending_state: config.max_pending_state ? parseInt(config.max_pending_state) : Constant.SERVER.MAX_PENDING_STATE_TIME,
                                            minimum_cart_price: config.minimum_cart_price ? parseInt(config.minimum_cart_price) : Constant.SERVER.MIN_CART_VALUE,
                                            payment_api_timeout: config.payment_api_timeout ? parseInt(config.payment_api_timeout) : Constant.SERVER.PAYMENT_API_TIMEOUT,
                                            payment_api_key_prefix: config.payment_api_key_prefix ? config.payment_api_key_prefix : Constant.SERVER.PAYMENT_API_KEY_PREFIX,
                                            display_color: (config.display_color && config.display_color == "true") ? true : false,
                                            deeplink_fallback: config.deeplink_fallback ? config.deeplink_fallback : Constant.SERVER.DEEPLINK_FALLBACK,
                                            auth_mech: config.auth_mech ? config.auth_mech : Constant.SERVER.AUTH_MECH,
                                            addr_show_time: config.addr_show_time ? parseInt(config.addr_show_time) : Constant.SERVER.ADDR_SHOW_TIME,
                                        },
                                        createdAt: new Date().getTime()
                                    }
                                    configToSync.push(dataToSave)
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['id'],
                                        createOrReplace: true,
                                    }
                                    await Aerospike.put(putArg)
                                }
                                await configuration.init({ type: data.type, bootstrap: false });
                                let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                    set: Constant.SET_NAME.PING_SERVICE,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify({
                                            set: Constant.SET_NAME.CONFIG,
                                            service: [
                                                Constant.MICROSERVICE.AUTH,
                                                Constant.MICROSERVICE.USER,
                                                Constant.MICROSERVICE.MENU,
                                                Constant.MICROSERVICE.ORDER,
                                                Constant.MICROSERVICE.PROMOTION,
                                                Constant.MICROSERVICE.PAYMENT,
                                                Constant.MICROSERVICE.KAFKA,
                                                Constant.MICROSERVICE.DEEPLINK,
                                                Constant.MICROSERVICE.HOME,
                                                Constant.MICROSERVICE.LOG,
                                                Constant.MICROSERVICE.NOTIFICATION,
                                                Constant.MICROSERVICE.UPLOAD,
                                                Constant.MICROSERVICE.LOCATION,
                                            ],
                                            type: Constant.DATABASE.TYPE.CONFIG.GENERAL,
                                            data: configToSync
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
                case Constant.DATABASE.TYPE.CONFIG.KAFKA: {
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                        if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                let configToSync = []
                                for (const config of data.data) {
                                    let dataToSave: IConfigRequest.IConfig = {
                                        id: data.type,
                                        type: data.type,
                                        kafka: {},
                                        createdAt: new Date().getTime()
                                    }
                                    configToSync.push(dataToSave)
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['id'],
                                        createOrReplace: true,
                                    }
                                    await Aerospike.put(putArg)
                                }
                                await configuration.init({ type: data.type, bootstrap: false });
                                let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                    set: Constant.SET_NAME.PING_SERVICE,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify({
                                            set: Constant.SET_NAME.CONFIG,
                                            service: [
                                                Constant.MICROSERVICE.AUTH,
                                                Constant.MICROSERVICE.USER,
                                                Constant.MICROSERVICE.MENU,
                                                Constant.MICROSERVICE.ORDER,
                                                Constant.MICROSERVICE.PROMOTION,
                                                Constant.MICROSERVICE.PAYMENT,
                                                Constant.MICROSERVICE.KAFKA,
                                                Constant.MICROSERVICE.DEEPLINK,
                                                Constant.MICROSERVICE.HOME,
                                                Constant.MICROSERVICE.LOG,
                                                Constant.MICROSERVICE.NOTIFICATION,
                                                Constant.MICROSERVICE.UPLOAD,
                                                Constant.MICROSERVICE.LOCATION,
                                            ],
                                            type: Constant.DATABASE.TYPE.CONFIG.KAFKA,
                                            data: configToSync
                                        })
                                    },
                                    inQ: true
                                }
                                kafkaService.kafkaSync(pingServices)
                            } else {
                                return Promise.reject("Unhandled error while saving kafka configs from cms")
                            }
                        }
                        else if (payload.as.get) {
                            await ENTITY.ConfigE.getConfig(data)
                        }
                    }
                    break;
                }
                case Constant.DATABASE.TYPE.CONFIG.ORDER_STATUS: {
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                        if (payload.as.reset) {
                            if (data.data && data.data.length > 0) {
                                let configToSync = []
                                for (const config of data.data) {
                                    let dataToSave: IConfigRequest.IConfig = {
                                        id: data.type,
                                        type: data.type,
                                        orderStatus: {},
                                        createdAt: new Date().getTime()
                                    }
                                    configToSync.push(dataToSave)
                                    let putArg: IAerospike.Put = {
                                        bins: dataToSave,
                                        set: ENTITY.ConfigE.set,
                                        key: dataToSave['id'],
                                        createOrReplace: true,
                                    }
                                    await Aerospike.put(putArg)
                                }
                                await configuration.init({ type: data.type, bootstrap: false });
                                let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                    set: Constant.SET_NAME.PING_SERVICE,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify({
                                            set: Constant.SET_NAME.CONFIG,
                                            service: [
                                                Constant.MICROSERVICE.ORDER
                                            ],
                                            type: Constant.DATABASE.TYPE.CONFIG.ORDER_STATUS,
                                            data: configToSync
                                        })
                                    },
                                    inQ: true
                                }
                                kafkaService.kafkaSync(pingServices)
                            } else {
                                return Promise.reject("Unhandled error while saving order status configs from cms")
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
                                data.data.map(async paymentConf => {
                                    if (paymentConf.store_code == Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE) {
                                        console.log("paymentConf", paymentConf)
                                        let dataToSave: IConfigRequest.IConfig = {
                                            id: configIdGenerator(data.type, paymentConf.store_code),
                                            type: data.type,
                                            store_code: paymentConf.store_code,
                                            store_id: paymentConf.store_id,
                                            payment: {
                                                noonpayConfig: {
                                                    channel: paymentConf.noon_pay_config.channel ? paymentConf.noon_pay_config.channel : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.channel,
                                                    decimal: paymentConf.noon_pay_config.decimal ? parseInt(paymentConf.noon_pay_config.decimal) : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.decimal,
                                                    brandCode: paymentConf.noon_pay_config.brand_code ? paymentConf.noon_pay_config.brand_code : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.brandCode,
                                                    countryCode: paymentConf.noon_pay_config.country_code ? paymentConf.noon_pay_config.country_code : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.countryCode,
                                                    currencyCode: paymentConf.noon_pay_config.currency_code ? paymentConf.noon_pay_config.currency_code : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.currencyCode,
                                                    paymentMethods: [],
                                                    paymentRetryInterval: paymentConf.noon_pay_config.payment_retry_interval ? parseInt(paymentConf.noon_pay_config.payment_retry_interval) : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.paymentRetryInterval,
                                                    maxTry: paymentConf.noon_pay_config.max_try ? parseInt(paymentConf.noon_pay_config.max_try) : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.maxTry,
                                                    noonpayOrderExpirationTime: paymentConf.noon_pay_config.noonpay_order_expiration_time ? parseInt(paymentConf.noon_pay_config.noonpay_order_expiration_time) : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayOrderExpirationTime,
                                                    businessIdentifier: paymentConf.noon_pay_config.businessIdentifier ? paymentConf.noon_pay_config.businessIdentifier : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.businessIdentifier,
                                                    appIdentifier: paymentConf.noon_pay_config.app_identifier ? paymentConf.noon_pay_config.app_identifier : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.appIdentifier,
                                                    appAccessKey: paymentConf.noon_pay_config.app_access_key ? paymentConf.noon_pay_config.app_access_key : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.appAccessKey,,
                                                    apiKey: paymentConf.noon_pay_config.api_key ? paymentConf.noon_pay_config.api_key : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.apiKey,
                                                    environment: paymentConf.noon_pay_config.environment ? paymentConf.noon_pay_config.environment : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.environment,
                                                    noonpayBaseUrl: paymentConf.noon_pay_config.noonpay_base_url ? paymentConf.noon_pay_config.noonpay_base_url : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayBaseUrl,
                                                    noonpayInitiatePaymentEndPoint: paymentConf.noon_pay_config.noonpay_initiate_payment_end_point ? paymentConf.noon_pay_config.noonpay_initiate_payment_end_point : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayInitiatePaymentEndPoint,
                                                    noonpayGetOrderEndPoint: paymentConf.noon_pay_config.noonpay_get_order_end_point ? paymentConf.noon_pay_config.noonpay_get_order_end_point : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayGetOrderEndPoint,
                                                    noonpayGetOrderByReferenceEndPoint: paymentConf.noon_pay_config.noonpay_get_order_by_reference_end_point ? paymentConf.noon_pay_config.noonpay_get_order_by_reference_end_point : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayGetOrderByReferenceEndPoint,
                                                    noonpayCapturePaymentEndPoint: paymentConf.noon_pay_config.noonpay_capture_payment_end_point ? paymentConf.noon_pay_config.noonpay_capture_payment_end_point : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayCapturePaymentEndPoint,
                                                    noonpayReversePaymentEndPoint: paymentConf.noon_pay_config.noonpay_reverse_payment_end_point ? paymentConf.noon_pay_config.noonpay_reverse_payment_end_point : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayReversePaymentEndPoint,
                                                    noonpayRefundPaymentEndPoint: paymentConf.noon_pay_config.noonpay_refund_payment_end_point ? paymentConf.noon_pay_config.noonpay_refund_payment_end_point : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.noonpayRefundPaymentEndPoint,
                                                    code: paymentConf.noon_pay_config.code ? paymentConf.noon_pay_config.code : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.code,
                                                    status: paymentConf.noon_pay_config.status ? parseInt(paymentConf.noon_pay_config.status) : Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.status,
                                                },
                                                codInfo: {
                                                    status: paymentConf.cod_info.status ? parseInt(paymentConf.cod_info.status) : Constant.PAYMENT_CONFIG[paymentConf.store_code].codInfo.status,
                                                    name: paymentConf.cod_info.name ? paymentConf.cod_info.name : Constant.PAYMENT_CONFIG[paymentConf.store_code].codInfo.name,
                                                    code: paymentConf.cod_info.code ? paymentConf.cod_info.code : Constant.PAYMENT_CONFIG[paymentConf.store_code].codInfo.code,
                                                    min_order_total: paymentConf.cod_info.min_order_total ? parseInt(paymentConf.cod_info.min_order_total) : Constant.PAYMENT_CONFIG[paymentConf.store_code].codInfo.min_order_total,
                                                    max_order_total: paymentConf.cod_info.max_order_total ? parseInt(paymentConf.cod_info.max_order_total) : Constant.PAYMENT_CONFIG[paymentConf.store_code].codInfo.max_order_total,
                                                }
                                            },
                                            createdAt: new Date().getTime()
                                        }
                                        let paymentMethods = []
                                        if (paymentConf.noon_pay_config.payment_methods && paymentConf.noon_pay_config.payment_methods.length > 0) {
                                            paymentConf.noon_pay_config.payment_methods.map(obj => {
                                                paymentMethods.push({
                                                    id: parseInt(obj.id),
                                                    name: obj.name,
                                                    orderCategory: obj.order_category
                                                })
                                            })
                                        } else
                                            paymentMethods = Constant.PAYMENT_CONFIG[paymentConf.store_code].noonpayConfig.paymentMethods
                                        dataToSave['payment']['noonpayConfig']['paymentMethods'] = paymentMethods
                                        let putArg: IAerospike.Put = {
                                            bins: dataToSave,
                                            set: ENTITY.ConfigE.set,
                                            key: dataToSave['id'],
                                            createOrReplace: true
                                        }
                                        await Aerospike.put(putArg)

                                        await configuration.init({ store_code: paymentConf.store_code, bootstrap: false });
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
                                                    store_code: paymentConf.store_code
                                                })
                                            },
                                            inQ: true
                                        }
                                        kafkaService.kafkaSync(pingServices)
                                    }
                                })

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
                                data.data.map(async shipmentConf => {
                                    if (shipmentConf.store_code == Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE) {
                                        let dataToSave: IConfigRequest.IConfig = {
                                            id: configIdGenerator(data.type, shipmentConf.store_code),
                                            type: data.type,
                                            store_code: shipmentConf.store_code,
                                            store_id: shipmentConf.store_id,
                                            shipment: {
                                                free_shipping: shipmentConf.free_shipping,
                                                flat_rate: shipmentConf.flat_rate,
                                            },
                                            createdAt: new Date().getTime()
                                        }
                                        let putArg: IAerospike.Put = {
                                            bins: dataToSave,
                                            set: ENTITY.ConfigE.set,
                                            key: dataToSave['id'],
                                            createOrReplace: true,
                                        }
                                        await Aerospike.put(putArg)

                                        await configuration.init({ store_code: shipmentConf.store_code, bootstrap: false });
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
                                                    store_code: shipmentConf.store_code
                                                })
                                            },
                                            inQ: true
                                        }
                                        kafkaService.kafkaSync(pingServices)
                                    }
                                })
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
                                        id: configIdGenerator(data.type, config.store_code),
                                        type: data.type,
                                        createdAt: new Date().getTime()
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