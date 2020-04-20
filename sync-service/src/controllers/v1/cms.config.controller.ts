import * as config from 'config'
import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog, configIdGenerator } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client'
import { configuration } from '../../sync-config/configuration'

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
    */
    async syncConfigFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            // let data = {
            //     "type": "country_specific",
            //     "action": "reset",
            //     "data": [
            //         {
            //             "success": true,
            //             "data": [
            //                 {
            //                     "country_code": "AE",
            //                     "country_name": "United Arab Emirates",
            //                     "concept_id": "3",
            //                     "sdm_url": "https://sdkuatuae.americana.com.sa:1995/?wsdl",
            //                     "base_currency": "AED",
            //                     "licence": "AmericanaWeb",
            //                     "channel_data": [
            //                         {
            //                             "template_id": "17",
            //                             "template_status": "1",
            //                             "channel_name": "kfc_app",
            //                             "menu_data": [
            //                                 {
            //                                     "menu_id": "1",
            //                                     "menu_state": "0",
            //                                     "menu_cluster": "0",
            //                                     "frequency_cron": "0",
            //                                     "time_cron": "0"
            //                                 }
            //                             ]
            //                         }
            //                     ],
            //                     "address_object": [
            //                         {
            //                             "type": "DELIVERY",
            //                             "enable": 1,
            //                             "subType": [
            //                                 {
            //                                     "type": "DELIVERY",
            //                                     "enable": 1
            //                                 }
            //                             ]
            //                         },
            //                         {
            //                             "type": "PICKUP",
            //                             "enable": 1,
            //                             "subType": [
            //                                 {
            //                                     "type": "PICKUP",
            //                                     "enable": 1
            //                                 },
            //                                 {
            //                                     "type": "CARHOP",
            //                                     "enable": 1
            //                                 }
            //                             ]
            //                         }
            //                     ],
            //                     "home_overlay": {
            //                         "En": {
            //                             "mediaUrl": "covid-poppup-mob-en.png",
            //                             "gif": "-",
            //                             "mediaType": "image",
            //                             "extension": "png",
            //                             "action": {
            //                                 "id": "1",
            //                                 "type": "pickup_carhop",
            //                                 "delimeters": "delimeters"
            //                             }
            //                         },
            //                         "Ar": {
            //                             "mediaUrl": null,
            //                             "gif": null,
            //                             "mediaType": null,
            //                             "extension": null,
            //                             "action": {
            //                                 "id": null,
            //                                 "type": null,
            //                                 "delimeters": null
            //                             }
            //                         }
            //                     },
            //                     "sdm": {
            //                         "licence_code": "AmericanaWeb",
            //                         "concept_id": "3",
            //                         "menu_template_id": null
            //                     },
            //                     "ccode": "+971",
            //                     "customer_care": "600522252",
            //                     "support_email": "digiteam@americana-food.com",
            //                     "min_cart_value": "23",
            //                     "min_cod_cart_value": "300"
            //                 }
            //             ]
            //         }
            //     ]
            // }
            let data: ICmsConfigRequest.ICmsConfig = JSON.parse(payload.as.argv)
            switch (data.type) {
                case Constant.DATABASE.TYPE.CONFIG.GENERAL: {
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                        if (payload.as.reset) {
                            let conf: ICmsConfigRequest.ICmsConfigGeneral[] = data.data
                            if (conf && conf.length > 0) {
                                let configToSync = []
                                for (const config of conf) {
                                    let dataToSave: IConfigRequest.IConfig = {
                                        id: data.type,
                                        type: data.type,
                                        general: {
                                            cms_page_data: config.cms_page_data,
                                            ttl_for_cart: config.ttl_for_cart ? parseInt(config.ttl_for_cart) : Constant.CONF.GENERAL.DEFAULT_CART_TTL,
                                            initial_user_ttl: config.initial_user_ttl ? parseInt(config.initial_user_ttl) : 0,
                                            initial_guest_ttl: config.initial_guest_ttl ? parseInt(config.initial_guest_ttl) : 0,
                                            bypass_otp: config.bypass_otp ? parseInt(config.bypass_otp) : Constant.CONF.GENERAL.BY_PASS_OTP,
                                            otp_expire: config.otp_expire ? parseInt(config.otp_expire) : Constant.CONF.GENERAL.OTP_EXPIRE_TIME,
                                            access_token_expire_time: config.access_token_expire_time ? parseInt(config.access_token_expire_time) : Constant.CONF.GENERAL.ACCESS_TOKEN_EXPIRE_TIME,
                                            refresh_token_expire_time: config.refresh_token_expire_time ? parseInt(config.refresh_token_expire_time) : Constant.CONF.GENERAL.REFRESH_TOKEN_EXPIRE_TIME,
                                            cms_auth_exp: config.cms_auth_exp ? parseInt(config.cms_auth_exp) : 0,
                                            reg_ex_for_validation: config.reg_ex_for_validation ? config.reg_ex_for_validation : String.raw`^[1-9]\\d{8}$|^[1-9]\\d{8}$`,
                                            country_codes: config.country_codes ? config.country_codes : Constant.CONF.GENERAL.PAYMENT_API_KEY_PREFIX,
                                            user_change_ttl: config.user_change_ttl ? parseInt(config.user_change_ttl) : Constant.CONF.GENERAL.USERCHANGE_TTL,
                                            max_pending_state: config.max_pending_state ? parseInt(config.max_pending_state) : Constant.CONF.GENERAL.MAX_PENDING_STATE_TIME,
                                            payment_api_timeout: config.payment_api_timeout ? parseInt(config.payment_api_timeout) : Constant.CONF.GENERAL.PAYMENT_API_TIMEOUT,
                                            payment_api_key_prefix: config.payment_api_key_prefix ? config.payment_api_key_prefix : Constant.CONF.GENERAL.PAYMENT_API_KEY_PREFIX,
                                            display_color: (config.display_color && config.display_color == "true") ? true : false,
                                            deeplink_fallback: config.deeplink_fallback ? config.deeplink_fallback : Constant.CONF.GENERAL.DEEPLINK_FALLBACK,
                                            auth_mech: config.auth_mech ? config.auth_mech : Constant.CONF.GENERAL.AUTH_MECH,
                                            addr_show_time: config.addr_show_time ? parseInt(config.addr_show_time) : Constant.CONF.GENERAL.ADDR_SHOW_TIME,
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
                            let conf: ICmsConfigRequest.ICmsConfigKafka[] = data.data
                            if (conf && conf.length > 0) {
                                let configToSync = []
                                for (const config of conf) {
                                    let dataToSave: IConfigRequest.IConfig = {
                                        id: data.type,
                                        type: data.type,
                                        kafka: {
                                            sdm: {
                                                user_config: {
                                                    max_try: {
                                                        create: config.sdm.user_config.max_try.create ? parseInt(config.sdm.user_config.max_try.create) : Constant.CONF.KAFKA.SDM.USER.MAX_RETRY.CREATE,
                                                        update: config.sdm.user_config.max_try.update ? parseInt(config.sdm.user_config.max_try.update) : Constant.CONF.KAFKA.SDM.USER.MAX_RETRY.UPDATE,
                                                        get: config.sdm.user_config.max_try.get ? parseInt(config.sdm.user_config.max_try.get) : Constant.CONF.KAFKA.SDM.USER.MAX_RETRY.GET,
                                                        sync: config.sdm.user_config.max_try.sync ? parseInt(config.sdm.user_config.max_try.sync) : Constant.CONF.KAFKA.SDM.USER.MAX_RETRY.SYNC,
                                                        reset: config.sdm.user_config.max_try.reset ? parseInt(config.sdm.user_config.max_try.reset) : Constant.CONF.KAFKA.SDM.USER.MAX_RETRY.RESET
                                                    }
                                                },
                                                address_config: {
                                                    max_try: {
                                                        create: config.sdm.address_config.max_try.create ? parseInt(config.sdm.address_config.max_try.create) : Constant.CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.CREATE,
                                                        update: config.sdm.address_config.max_try.update ? parseInt(config.sdm.address_config.max_try.update) : Constant.CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.UPDATE,
                                                        get: config.sdm.address_config.max_try.get ? parseInt(config.sdm.address_config.max_try.get) : Constant.CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.GET,
                                                        sync: config.sdm.address_config.max_try.sync ? parseInt(config.sdm.address_config.max_try.sync) : Constant.CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.SYNC,
                                                        reset: config.sdm.address_config.max_try.reset ? parseInt(config.sdm.address_config.max_try.reset) : Constant.CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.RESET
                                                    }
                                                },
                                                menu_config: {
                                                    max_try: {
                                                        create: config.sdm.menu_config.max_try.create ? parseInt(config.sdm.menu_config.max_try.create) : Constant.CONF.KAFKA.SDM.MENU.MAX_RETRY.CREATE,
                                                        update: config.sdm.menu_config.max_try.update ? parseInt(config.sdm.menu_config.max_try.update) : Constant.CONF.KAFKA.SDM.MENU.MAX_RETRY.UPDATE,
                                                        get: config.sdm.menu_config.max_try.get ? parseInt(config.sdm.menu_config.max_try.get) : Constant.CONF.KAFKA.SDM.MENU.MAX_RETRY.GET,
                                                        sync: config.sdm.menu_config.max_try.sync ? parseInt(config.sdm.menu_config.max_try.sync) : Constant.CONF.KAFKA.SDM.MENU.MAX_RETRY.SYNC,
                                                        reset: config.sdm.menu_config.max_try.reset ? parseInt(config.sdm.menu_config.max_try.reset) : Constant.CONF.KAFKA.SDM.MENU.MAX_RETRY.RESET
                                                    }
                                                },
                                                promotion_config: {
                                                    max_try: {
                                                        create: config.sdm.promotion_config.max_try.create ? parseInt(config.sdm.promotion_config.max_try.create) : Constant.CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.CREATE,
                                                        update: config.sdm.promotion_config.max_try.update ? parseInt(config.sdm.promotion_config.max_try.update) : Constant.CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.UPDATE,
                                                        get: config.sdm.promotion_config.max_try.get ? parseInt(config.sdm.promotion_config.max_try.get) : Constant.CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.GET,
                                                        sync: config.sdm.promotion_config.max_try.sync ? parseInt(config.sdm.promotion_config.max_try.sync) : Constant.CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.SYNC,
                                                        reset: config.sdm.promotion_config.max_try.reset ? parseInt(config.sdm.promotion_config.max_try.reset) : Constant.CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.RESET
                                                    }
                                                },
                                                hidden_config: {
                                                    max_try: {
                                                        create: config.sdm.hidden_config.max_try.create ? parseInt(config.sdm.hidden_config.max_try.create) : Constant.CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.CREATE,
                                                        update: config.sdm.hidden_config.max_try.update ? parseInt(config.sdm.hidden_config.max_try.update) : Constant.CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.UPDATE,
                                                        get: config.sdm.hidden_config.max_try.get ? parseInt(config.sdm.hidden_config.max_try.get) : Constant.CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.GET,
                                                        sync: config.sdm.hidden_config.max_try.sync ? parseInt(config.sdm.hidden_config.max_try.sync) : Constant.CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.SYNC,
                                                        reset: config.sdm.hidden_config.max_try.reset ? parseInt(config.sdm.hidden_config.max_try.reset) : Constant.CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.RESET
                                                    }
                                                },
                                                order_config: {
                                                    max_try: {
                                                        create: config.sdm.order_config.max_try.create ? parseInt(config.sdm.order_config.max_try.create) : Constant.CONF.KAFKA.SDM.ORDER.MAX_RETRY.CREATE,
                                                        update: config.sdm.order_config.max_try.update ? parseInt(config.sdm.order_config.max_try.update) : Constant.CONF.KAFKA.SDM.ORDER.MAX_RETRY.UPDATE,
                                                        get: config.sdm.order_config.max_try.get ? parseInt(config.sdm.order_config.max_try.get) : Constant.CONF.KAFKA.SDM.ORDER.MAX_RETRY.GET,
                                                        sync: config.sdm.order_config.max_try.sync ? parseInt(config.sdm.order_config.max_try.sync) : Constant.CONF.KAFKA.SDM.ORDER.MAX_RETRY.SYNC,
                                                        reset: config.sdm.order_config.max_try.reset ? parseInt(config.sdm.order_config.max_try.reset) : Constant.CONF.KAFKA.SDM.ORDER.MAX_RETRY.RESET
                                                    },
                                                    interval: {
                                                        get: config.sdm.order_config.interval.get ? parseInt(config.sdm.order_config.interval.get) : Constant.CONF.KAFKA.SDM.ORDER.INTERVAL.GET,
                                                        get_once: config.sdm.order_config.interval.get_once ? parseInt(config.sdm.order_config.interval.get_once) : Constant.CONF.KAFKA.SDM.ORDER.INTERVAL.GET_ONCE,
                                                        get_max: config.sdm.order_config.interval.get_max ? parseInt(config.sdm.order_config.interval.get_max) : Constant.CONF.KAFKA.SDM.ORDER.INTERVAL.GET_MAX,
                                                        next_ping: config.sdm.order_config.interval.next_ping ? parseInt(config.sdm.order_config.interval.next_ping) : Constant.CONF.KAFKA.SDM.ORDER.INTERVAL.NEXT_PING
                                                    }
                                                }
                                            },
                                            cms: {
                                                user_config: {
                                                    max_try: {
                                                        create: config.cms.user_config.max_try.create ? parseInt(config.cms.user_config.max_try.create) : Constant.CONF.KAFKA.CMS.USER.MAX_RETRY.CREATE,
                                                        update: config.cms.user_config.max_try.update ? parseInt(config.cms.user_config.max_try.update) : Constant.CONF.KAFKA.CMS.USER.MAX_RETRY.UPDATE,
                                                        get: config.cms.user_config.max_try.get ? parseInt(config.cms.user_config.max_try.get) : Constant.CONF.KAFKA.CMS.USER.MAX_RETRY.GET,
                                                        sync: config.cms.user_config.max_try.sync ? parseInt(config.cms.user_config.max_try.sync) : Constant.CONF.KAFKA.CMS.USER.MAX_RETRY.SYNC,
                                                        reset: config.cms.user_config.max_try.reset ? parseInt(config.cms.user_config.max_try.reset) : Constant.CONF.KAFKA.CMS.USER.MAX_RETRY.RESET
                                                    }
                                                },
                                                address_config: {
                                                    max_try: {
                                                        create: config.cms.address_config.max_try.create ? parseInt(config.cms.address_config.max_try.create) : Constant.CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.CREATE,
                                                        update: config.cms.address_config.max_try.update ? parseInt(config.cms.address_config.max_try.update) : Constant.CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.UPDATE,
                                                        get: config.cms.address_config.max_try.get ? parseInt(config.cms.address_config.max_try.get) : Constant.CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.GET,
                                                        sync: config.cms.address_config.max_try.sync ? parseInt(config.cms.address_config.max_try.sync) : Constant.CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.SYNC,
                                                        reset: config.cms.address_config.max_try.reset ? parseInt(config.cms.address_config.max_try.reset) : Constant.CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.RESET
                                                    }
                                                },
                                                menu_config: {
                                                    max_try: {
                                                        create: config.cms.menu_config.max_try.create ? parseInt(config.cms.menu_config.max_try.create) : Constant.CONF.KAFKA.CMS.MENU.MAX_RETRY.CREATE,
                                                        update: config.cms.menu_config.max_try.update ? parseInt(config.cms.menu_config.max_try.update) : Constant.CONF.KAFKA.CMS.MENU.MAX_RETRY.UPDATE,
                                                        get: config.cms.menu_config.max_try.get ? parseInt(config.cms.menu_config.max_try.get) : Constant.CONF.KAFKA.CMS.MENU.MAX_RETRY.GET,
                                                        sync: config.cms.menu_config.max_try.sync ? parseInt(config.cms.menu_config.max_try.sync) : Constant.CONF.KAFKA.CMS.MENU.MAX_RETRY.SYNC,
                                                        reset: config.cms.menu_config.max_try.reset ? parseInt(config.cms.menu_config.max_try.reset) : Constant.CONF.KAFKA.CMS.MENU.MAX_RETRY.RESET
                                                    }
                                                },
                                                promotion_config: {
                                                    max_try: {
                                                        create: config.cms.promotion_config.max_try.create ? parseInt(config.cms.promotion_config.max_try.create) : Constant.CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.CREATE,
                                                        update: config.cms.promotion_config.max_try.update ? parseInt(config.cms.promotion_config.max_try.update) : Constant.CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.UPDATE,
                                                        get: config.cms.promotion_config.max_try.get ? parseInt(config.cms.promotion_config.max_try.get) : Constant.CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.GET,
                                                        sync: config.cms.promotion_config.max_try.sync ? parseInt(config.cms.promotion_config.max_try.sync) : Constant.CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.SYNC,
                                                        reset: config.cms.promotion_config.max_try.reset ? parseInt(config.cms.promotion_config.max_try.reset) : Constant.CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.RESET
                                                    }
                                                },
                                                hidden_config: {
                                                    max_try: {
                                                        create: config.cms.hidden_config.max_try.create ? parseInt(config.cms.hidden_config.max_try.create) : Constant.CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.CREATE,
                                                        update: config.cms.hidden_config.max_try.update ? parseInt(config.cms.hidden_config.max_try.update) : Constant.CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.UPDATE,
                                                        get: config.cms.hidden_config.max_try.get ? parseInt(config.cms.hidden_config.max_try.get) : Constant.CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.GET,
                                                        sync: config.cms.hidden_config.max_try.sync ? parseInt(config.cms.hidden_config.max_try.sync) : Constant.CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.SYNC,
                                                        reset: config.cms.hidden_config.max_try.reset ? parseInt(config.cms.hidden_config.max_try.reset) : Constant.CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.RESET
                                                    }
                                                },
                                                order_config: {
                                                    max_try: {
                                                        create: config.cms.order_config.max_try.create ? parseInt(config.cms.order_config.max_try.create) : Constant.CONF.KAFKA.CMS.ORDER.MAX_RETRY.CREATE,
                                                        update: config.cms.order_config.max_try.update ? parseInt(config.cms.order_config.max_try.update) : Constant.CONF.KAFKA.CMS.ORDER.MAX_RETRY.UPDATE,
                                                        get: config.cms.order_config.max_try.get ? parseInt(config.cms.order_config.max_try.get) : Constant.CONF.KAFKA.CMS.ORDER.MAX_RETRY.GET,
                                                        sync: config.cms.order_config.max_try.sync ? parseInt(config.cms.order_config.max_try.sync) : Constant.CONF.KAFKA.CMS.ORDER.MAX_RETRY.SYNC,
                                                        reset: config.cms.order_config.max_try.reset ? parseInt(config.cms.order_config.max_try.reset) : Constant.CONF.KAFKA.CMS.ORDER.MAX_RETRY.RESET
                                                    }
                                                }
                                            },
                                            as: {
                                                user_config: {
                                                    max_try: {
                                                        create: config.as.user_config.max_try.create ? parseInt(config.as.user_config.max_try.create) : Constant.CONF.KAFKA.AS.USER.MAX_RETRY.CREATE,
                                                        update: config.as.user_config.max_try.update ? parseInt(config.as.user_config.max_try.update) : Constant.CONF.KAFKA.AS.USER.MAX_RETRY.UPDATE,
                                                        get: config.as.user_config.max_try.get ? parseInt(config.as.user_config.max_try.get) : Constant.CONF.KAFKA.AS.USER.MAX_RETRY.GET,
                                                        sync: config.as.user_config.max_try.sync ? parseInt(config.as.user_config.max_try.sync) : Constant.CONF.KAFKA.AS.USER.MAX_RETRY.SYNC,
                                                        reset: config.as.user_config.max_try.reset ? parseInt(config.as.user_config.max_try.reset) : Constant.CONF.KAFKA.AS.USER.MAX_RETRY.RESET
                                                    }
                                                },
                                                address_config: {
                                                    max_try: {
                                                        create: config.as.address_config.max_try.create ? parseInt(config.as.address_config.max_try.create) : Constant.CONF.KAFKA.AS.ADDRESS.MAX_RETRY.CREATE,
                                                        update: config.as.address_config.max_try.update ? parseInt(config.as.address_config.max_try.update) : Constant.CONF.KAFKA.AS.ADDRESS.MAX_RETRY.UPDATE,
                                                        get: config.as.address_config.max_try.get ? parseInt(config.as.address_config.max_try.get) : Constant.CONF.KAFKA.AS.ADDRESS.MAX_RETRY.GET,
                                                        sync: config.as.address_config.max_try.sync ? parseInt(config.as.address_config.max_try.sync) : Constant.CONF.KAFKA.AS.ADDRESS.MAX_RETRY.SYNC,
                                                        reset: config.as.address_config.max_try.reset ? parseInt(config.as.address_config.max_try.reset) : Constant.CONF.KAFKA.AS.ADDRESS.MAX_RETRY.RESET
                                                    }
                                                },
                                                menu_config: {
                                                    max_try: {
                                                        create: config.as.menu_config.max_try.create ? parseInt(config.as.menu_config.max_try.create) : Constant.CONF.KAFKA.AS.MENU.MAX_RETRY.CREATE,
                                                        update: config.as.menu_config.max_try.update ? parseInt(config.as.menu_config.max_try.update) : Constant.CONF.KAFKA.AS.MENU.MAX_RETRY.UPDATE,
                                                        get: config.as.menu_config.max_try.get ? parseInt(config.as.menu_config.max_try.get) : Constant.CONF.KAFKA.AS.MENU.MAX_RETRY.GET,
                                                        sync: config.as.menu_config.max_try.sync ? parseInt(config.as.menu_config.max_try.sync) : Constant.CONF.KAFKA.AS.MENU.MAX_RETRY.SYNC,
                                                        reset: config.as.menu_config.max_try.reset ? parseInt(config.as.menu_config.max_try.reset) : Constant.CONF.KAFKA.AS.MENU.MAX_RETRY.RESET
                                                    }
                                                },
                                                promotion_config: {
                                                    max_try: {
                                                        create: config.as.promotion_config.max_try.create ? parseInt(config.as.promotion_config.max_try.create) : Constant.CONF.KAFKA.AS.PROMOTION.MAX_RETRY.CREATE,
                                                        update: config.as.promotion_config.max_try.update ? parseInt(config.as.promotion_config.max_try.update) : Constant.CONF.KAFKA.AS.PROMOTION.MAX_RETRY.UPDATE,
                                                        get: config.as.promotion_config.max_try.get ? parseInt(config.as.promotion_config.max_try.get) : Constant.CONF.KAFKA.AS.PROMOTION.MAX_RETRY.GET,
                                                        sync: config.as.promotion_config.max_try.sync ? parseInt(config.as.promotion_config.max_try.sync) : Constant.CONF.KAFKA.AS.PROMOTION.MAX_RETRY.SYNC,
                                                        reset: config.as.promotion_config.max_try.reset ? parseInt(config.as.promotion_config.max_try.reset) : Constant.CONF.KAFKA.AS.PROMOTION.MAX_RETRY.RESET
                                                    }
                                                },
                                                hidden_config: {
                                                    max_try: {
                                                        create: config.as.hidden_config.max_try.create ? parseInt(config.as.hidden_config.max_try.create) : Constant.CONF.KAFKA.AS.HIDDEN.MAX_RETRY.CREATE,
                                                        update: config.as.hidden_config.max_try.update ? parseInt(config.as.hidden_config.max_try.update) : Constant.CONF.KAFKA.AS.HIDDEN.MAX_RETRY.UPDATE,
                                                        get: config.as.hidden_config.max_try.get ? parseInt(config.as.hidden_config.max_try.get) : Constant.CONF.KAFKA.AS.HIDDEN.MAX_RETRY.GET,
                                                        sync: config.as.hidden_config.max_try.sync ? parseInt(config.as.hidden_config.max_try.sync) : Constant.CONF.KAFKA.AS.HIDDEN.MAX_RETRY.SYNC,
                                                        reset: config.as.hidden_config.max_try.reset ? parseInt(config.as.hidden_config.max_try.reset) : Constant.CONF.KAFKA.AS.HIDDEN.MAX_RETRY.RESET
                                                    }
                                                },
                                                configuration_config: {
                                                    max_try: {
                                                        create: config.as.configuration_config.max_try.create ? parseInt(config.as.configuration_config.max_try.create) : Constant.CONF.KAFKA.AS.CONFIG.MAX_RETRY.CREATE,
                                                        update: config.as.configuration_config.max_try.update ? parseInt(config.as.configuration_config.max_try.update) : Constant.CONF.KAFKA.AS.CONFIG.MAX_RETRY.UPDATE,
                                                        get: config.as.configuration_config.max_try.get ? parseInt(config.as.configuration_config.max_try.get) : Constant.CONF.KAFKA.AS.CONFIG.MAX_RETRY.GET,
                                                        sync: config.as.configuration_config.max_try.sync ? parseInt(config.as.configuration_config.max_try.sync) : Constant.CONF.KAFKA.AS.CONFIG.MAX_RETRY.SYNC,
                                                        reset: config.as.configuration_config.max_try.reset ? parseInt(config.as.configuration_config.max_try.reset) : Constant.CONF.KAFKA.AS.CONFIG.MAX_RETRY.RESET
                                                    }
                                                },
                                                app_config: {
                                                    max_try: {
                                                        create: config.as.app_config.max_try.create ? parseInt(config.as.app_config.max_try.create) : Constant.CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.CREATE,
                                                        update: config.as.app_config.max_try.update ? parseInt(config.as.app_config.max_try.update) : Constant.CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.UPDATE,
                                                        get: config.as.app_config.max_try.get ? parseInt(config.as.app_config.max_try.get) : Constant.CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.GET,
                                                        sync: config.as.app_config.max_try.sync ? parseInt(config.as.app_config.max_try.sync) : Constant.CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.SYNC,
                                                        reset: config.as.app_config.max_try.reset ? parseInt(config.as.app_config.max_try.reset) : Constant.CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.RESET
                                                    }
                                                }
                                            }
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
                            let conf: ICmsConfigRequest.ICmsConfigOrderStatus[] = data.data
                            if (conf && conf.length > 0) {
                                let configToSync = []
                                for (const config of conf) {
                                    let dataToSave: IConfigRequest.IConfig = {
                                        id: data.type,
                                        type: data.type,
                                        orderStatus: {
                                            cart_config: {
                                                as: config.cart_config.as ? config.cart_config.as : Constant.CONF.ORDER_STATUS.CART.AS,
                                                mongo: config.cart_config.mongo ? config.cart_config.mongo : Constant.CONF.ORDER_STATUS.CART.MONGO,
                                                cms: config.cart_config.cms ? config.cart_config.cms : Constant.CONF.ORDER_STATUS.CART.CMS,
                                                sdm: config.cart_config.sdm ? config.cart_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.CART.SDM,
                                                freq: {
                                                    get: config.cart_config.freq.get ? parseInt(config.cart_config.freq.get) : Constant.CONF.ORDER_STATUS.CART.FREQ.GET,
                                                    geet_once: config.cart_config.freq.geet_once ? parseInt(config.cart_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.CART.FREQ.GET_ONCE,
                                                    get_max: config.cart_config.freq.get_max ? parseInt(config.cart_config.freq.get_max) : Constant.CONF.ORDER_STATUS.CART.FREQ.GET_MAX,
                                                    next_ping: config.cart_config.freq.next_ping ? parseInt(config.cart_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.CART.FREQ.NEXT_PING
                                                }
                                            },
                                            pending_config: {
                                                as: config.pending_config.as ? config.pending_config.as : Constant.CONF.ORDER_STATUS.PENDING.AS,
                                                mongo: config.pending_config.mongo ? config.pending_config.mongo : Constant.CONF.ORDER_STATUS.PENDING.MONGO,
                                                cms: config.pending_config.cms ? config.pending_config.cms : Constant.CONF.ORDER_STATUS.PENDING.CMS,
                                                sdm: config.pending_config.sdm ? config.pending_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.PENDING.SDM,
                                                freq: {
                                                    get: config.pending_config.freq.get ? parseInt(config.pending_config.freq.get) : Constant.CONF.ORDER_STATUS.PENDING.FREQ.GET,
                                                    geet_once: config.pending_config.freq.geet_once ? parseInt(config.pending_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.PENDING.FREQ.GET_ONCE,
                                                    get_max: config.pending_config.freq.get_max ? parseInt(config.pending_config.freq.get_max) : Constant.CONF.ORDER_STATUS.PENDING.FREQ.GET_MAX,
                                                    next_ping: config.pending_config.freq.next_ping ? parseInt(config.pending_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.PENDING.FREQ.NEXT_PING
                                                }
                                            },
                                            confirmed_config: {
                                                as: config.confirmed_config.as ? config.confirmed_config.as : Constant.CONF.ORDER_STATUS.CONFIRMED.AS,
                                                mongo: config.confirmed_config.mongo ? config.confirmed_config.mongo : Constant.CONF.ORDER_STATUS.CONFIRMED.MONGO,
                                                cms: config.confirmed_config.cms ? config.confirmed_config.cms : Constant.CONF.ORDER_STATUS.CONFIRMED.CMS,
                                                sdm: config.confirmed_config.sdm ? config.confirmed_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.CONFIRMED.SDM,
                                                freq: {
                                                    get: config.confirmed_config.freq.get ? parseInt(config.confirmed_config.freq.get) : Constant.CONF.ORDER_STATUS.CONFIRMED.FREQ.GET,
                                                    geet_once: config.confirmed_config.freq.geet_once ? parseInt(config.confirmed_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.CONFIRMED.FREQ.GET_ONCE,
                                                    get_max: config.confirmed_config.freq.get_max ? parseInt(config.confirmed_config.freq.get_max) : Constant.CONF.ORDER_STATUS.CONFIRMED.FREQ.GET_MAX,
                                                    next_ping: config.confirmed_config.freq.next_ping ? parseInt(config.confirmed_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.CONFIRMED.FREQ.NEXT_PING
                                                }
                                            },
                                            prepared_config: {
                                                as: config.prepared_config.as ? config.prepared_config.as : Constant.CONF.ORDER_STATUS.BEING_PREPARED.AS,
                                                mongo: config.prepared_config.mongo ? config.prepared_config.mongo : Constant.CONF.ORDER_STATUS.BEING_PREPARED.MONGO,
                                                cms: config.prepared_config.cms ? config.prepared_config.cms : Constant.CONF.ORDER_STATUS.BEING_PREPARED.CMS,
                                                sdm: config.prepared_config.sdm ? config.prepared_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.BEING_PREPARED.SDM,
                                                freq: {
                                                    get: config.prepared_config.freq.get ? parseInt(config.prepared_config.freq.get) : Constant.CONF.ORDER_STATUS.BEING_PREPARED.FREQ.GET,
                                                    geet_once: config.prepared_config.freq.geet_once ? parseInt(config.prepared_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.BEING_PREPARED.FREQ.GET_ONCE,
                                                    get_max: config.prepared_config.freq.get_max ? parseInt(config.prepared_config.freq.get_max) : Constant.CONF.ORDER_STATUS.BEING_PREPARED.FREQ.GET_MAX,
                                                    next_ping: config.prepared_config.freq.next_ping ? parseInt(config.prepared_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.BEING_PREPARED.FREQ.NEXT_PING
                                                }
                                            },
                                            ready_config: {
                                                as: config.ready_config.as ? config.ready_config.as : Constant.CONF.ORDER_STATUS.READY.AS,
                                                mongo: config.ready_config.mongo ? config.ready_config.mongo : Constant.CONF.ORDER_STATUS.READY.MONGO,
                                                cms: config.ready_config.cms ? config.ready_config.cms : Constant.CONF.ORDER_STATUS.READY.CMS,
                                                sdm: config.ready_config.sdm ? config.ready_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.READY.SDM,
                                                freq: {
                                                    get: config.ready_config.freq.get ? parseInt(config.ready_config.freq.get) : Constant.CONF.ORDER_STATUS.READY.FREQ.GET,
                                                    geet_once: config.ready_config.freq.geet_once ? parseInt(config.ready_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.READY.FREQ.GET_ONCE,
                                                    get_max: config.ready_config.freq.get_max ? parseInt(config.ready_config.freq.get_max) : Constant.CONF.ORDER_STATUS.READY.FREQ.GET_MAX,
                                                    next_ping: config.ready_config.freq.next_ping ? parseInt(config.ready_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.READY.FREQ.NEXT_PING
                                                }
                                            },
                                            ontheway_config: {
                                                as: config.ontheway_config.as ? config.ontheway_config.as : Constant.CONF.ORDER_STATUS.ON_THE_WAY.AS,
                                                mongo: config.ontheway_config.mongo ? config.ontheway_config.mongo : Constant.CONF.ORDER_STATUS.ON_THE_WAY.MONGO,
                                                cms: config.ontheway_config.cms ? config.ontheway_config.cms : Constant.CONF.ORDER_STATUS.ON_THE_WAY.CMS,
                                                sdm: config.ontheway_config.sdm ? config.ontheway_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.ON_THE_WAY.SDM,
                                                freq: {
                                                    get: config.ontheway_config.freq.get ? parseInt(config.ontheway_config.freq.get) : Constant.CONF.ORDER_STATUS.ON_THE_WAY.FREQ.GET,
                                                    geet_once: config.ontheway_config.freq.geet_once ? parseInt(config.ontheway_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.ON_THE_WAY.FREQ.GET_ONCE,
                                                    get_max: config.ontheway_config.freq.get_max ? parseInt(config.ontheway_config.freq.get_max) : Constant.CONF.ORDER_STATUS.ON_THE_WAY.FREQ.GET_MAX,
                                                    next_ping: config.ontheway_config.freq.next_ping ? parseInt(config.ontheway_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.ON_THE_WAY.FREQ.NEXT_PING
                                                }
                                            },
                                            delivered_config: {
                                                as: config.delivered_config.as ? config.delivered_config.as : Constant.CONF.ORDER_STATUS.DELIVERED.AS,
                                                mongo: config.delivered_config.mongo ? config.delivered_config.mongo : Constant.CONF.ORDER_STATUS.DELIVERED.MONGO,
                                                cms: config.delivered_config.cms ? config.delivered_config.cms : Constant.CONF.ORDER_STATUS.DELIVERED.CMS,
                                                sdm: config.delivered_config.sdm ? config.delivered_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.DELIVERED.SDM,
                                                freq: {
                                                    get: config.delivered_config.freq.get ? parseInt(config.delivered_config.freq.get) : Constant.CONF.ORDER_STATUS.DELIVERED.FREQ.GET,
                                                    geet_once: config.delivered_config.freq.geet_once ? parseInt(config.delivered_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.DELIVERED.FREQ.GET_ONCE,
                                                    get_max: config.delivered_config.freq.get_max ? parseInt(config.delivered_config.freq.get_max) : Constant.CONF.ORDER_STATUS.DELIVERED.FREQ.GET_MAX,
                                                    next_ping: config.delivered_config.freq.next_ping ? parseInt(config.delivered_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.DELIVERED.FREQ.NEXT_PING
                                                }
                                            },
                                            closed_config: {
                                                as: config.closed_config.as ? config.closed_config.as : Constant.CONF.ORDER_STATUS.CLOSED.AS,
                                                mongo: config.closed_config.mongo ? config.closed_config.mongo : Constant.CONF.ORDER_STATUS.CLOSED.MONGO,
                                                cms: config.closed_config.cms ? config.closed_config.cms : Constant.CONF.ORDER_STATUS.CLOSED.CMS,
                                                sdm: config.closed_config.sdm ? config.closed_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.CLOSED.SDM,
                                                freq: {
                                                    get: config.closed_config.freq.get ? parseInt(config.closed_config.freq.get) : Constant.CONF.ORDER_STATUS.CART.FREQ.GET,
                                                    geet_once: config.closed_config.freq.geet_once ? parseInt(config.closed_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.CLOSED.FREQ.GET_ONCE,
                                                    get_max: config.closed_config.freq.get_max ? parseInt(config.closed_config.freq.get_max) : Constant.CONF.ORDER_STATUS.CLOSED.FREQ.GET_MAX,
                                                    next_ping: config.closed_config.freq.next_ping ? parseInt(config.closed_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.CLOSED.FREQ.NEXT_PING
                                                }
                                            },
                                            cancelled_config: {
                                                as: config.cancelled_config.as ? config.cancelled_config.as : Constant.CONF.ORDER_STATUS.CANCELED.AS,
                                                mongo: config.cancelled_config.mongo ? config.cancelled_config.mongo : Constant.CONF.ORDER_STATUS.CANCELED.MONGO,
                                                cms: config.cancelled_config.cms ? config.cancelled_config.cms : Constant.CONF.ORDER_STATUS.CANCELED.CMS,
                                                sdm: config.cancelled_config.sdm ? config.cancelled_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.CANCELED.SDM,
                                                freq: {
                                                    get: config.cancelled_config.freq.get ? parseInt(config.cancelled_config.freq.get) : Constant.CONF.ORDER_STATUS.CANCELED.FREQ.GET,
                                                    geet_once: config.cancelled_config.freq.geet_once ? parseInt(config.cancelled_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.CANCELED.FREQ.GET_ONCE,
                                                    get_max: config.cancelled_config.freq.get_max ? parseInt(config.cancelled_config.freq.get_max) : Constant.CONF.ORDER_STATUS.CANCELED.FREQ.GET_MAX,
                                                    next_ping: config.cancelled_config.freq.next_ping ? parseInt(config.cancelled_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.CANCELED.FREQ.NEXT_PING
                                                }
                                            },
                                            failure_config: {
                                                as: config.failure_config.as ? config.failure_config.as : Constant.CONF.ORDER_STATUS.FAILURE.AS,
                                                mongo: config.failure_config.mongo ? config.failure_config.mongo : Constant.CONF.ORDER_STATUS.FAILURE.MONGO,
                                                cms: config.failure_config.cms ? config.failure_config.cms : Constant.CONF.ORDER_STATUS.FAILURE.CMS,
                                                sdm: config.failure_config.sdm ? config.failure_config.sdm.split(",").map(obj => { if (obj) { return parseInt(obj.trim()) } }) : Constant.CONF.ORDER_STATUS.FAILURE.SDM,
                                                freq: {
                                                    get: config.failure_config.freq.get ? parseInt(config.failure_config.freq.get) : Constant.CONF.ORDER_STATUS.FAILURE.FREQ.GET,
                                                    geet_once: config.failure_config.freq.geet_once ? parseInt(config.failure_config.freq.geet_once) : Constant.CONF.ORDER_STATUS.FAILURE.FREQ.GET_ONCE,
                                                    get_max: config.failure_config.freq.get_max ? parseInt(config.failure_config.freq.get_max) : Constant.CONF.ORDER_STATUS.FAILURE.FREQ.GET_MAX,
                                                    next_ping: config.failure_config.freq.next_ping ? parseInt(config.failure_config.freq.next_ping) : Constant.CONF.ORDER_STATUS.FAILURE.FREQ.NEXT_PING
                                                }
                                            },
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
                            let conf: ICmsConfigRequest.ICmsConfigPayment[] = data.data
                            if (conf && conf.length > 0) {
                                for (const paymentConf of conf) {
                                    if (paymentConf.store_code == Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE) {
                                        let dataToSave: IConfigRequest.IConfig = {
                                            id: configIdGenerator(data.type, paymentConf.store_code),
                                            type: data.type,
                                            store_code: paymentConf.store_code,
                                            store_id: paymentConf.store_id,
                                            payment: {
                                                noonpayConfig: {
                                                    channel: paymentConf.noon_pay_config.channel ? paymentConf.noon_pay_config.channel : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.channel,
                                                    decimal: paymentConf.noon_pay_config.decimal ? parseInt(paymentConf.noon_pay_config.decimal) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.decimal,
                                                    brandCode: paymentConf.noon_pay_config.brand_code ? paymentConf.noon_pay_config.brand_code : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.brandCode,
                                                    countryCode: paymentConf.noon_pay_config.country_code ? paymentConf.noon_pay_config.country_code : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.countryCode,
                                                    currencyCode: paymentConf.noon_pay_config.currency_code ? paymentConf.noon_pay_config.currency_code : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.currencyCode,
                                                    paymentMethods: [],
                                                    paymentRetryInterval: paymentConf.noon_pay_config.payment_retry_interval ? parseInt(paymentConf.noon_pay_config.payment_retry_interval) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.paymentRetryInterval,
                                                    maxTry: paymentConf.noon_pay_config.max_try ? parseInt(paymentConf.noon_pay_config.max_try) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.maxTry,
                                                    noonpayOrderExpirationTime: paymentConf.noon_pay_config.noonpay_order_expiration_time ? parseInt(paymentConf.noon_pay_config.noonpay_order_expiration_time) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayOrderExpirationTime,
                                                    businessIdentifier: paymentConf.noon_pay_config.businessIdentifier ? paymentConf.noon_pay_config.businessIdentifier : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.businessIdentifier,
                                                    appIdentifier: paymentConf.noon_pay_config.app_identifier ? paymentConf.noon_pay_config.app_identifier : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.appIdentifier,
                                                    appAccessKey: paymentConf.noon_pay_config.app_access_key ? paymentConf.noon_pay_config.app_access_key : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.appAccessKey,
                                                    apiKey: paymentConf.noon_pay_config.api_key ? paymentConf.noon_pay_config.api_key : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.apiKey,
                                                    environment: paymentConf.noon_pay_config.environment ? paymentConf.noon_pay_config.environment : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.environment,
                                                    noonpayBaseUrl: paymentConf.noon_pay_config.noonpay_base_url ? paymentConf.noon_pay_config.noonpay_base_url : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayBaseUrl,
                                                    noonpayInitiatePaymentEndPoint: paymentConf.noon_pay_config.noonpay_initiate_payment_end_point ? paymentConf.noon_pay_config.noonpay_initiate_payment_end_point : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayInitiatePaymentEndPoint,
                                                    noonpayGetOrderEndPoint: paymentConf.noon_pay_config.noonpay_get_order_end_point ? paymentConf.noon_pay_config.noonpay_get_order_end_point : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayGetOrderEndPoint,
                                                    noonpayGetOrderByReferenceEndPoint: paymentConf.noon_pay_config.noonpay_get_order_by_reference_end_point ? paymentConf.noon_pay_config.noonpay_get_order_by_reference_end_point : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayGetOrderByReferenceEndPoint,
                                                    noonpayCapturePaymentEndPoint: paymentConf.noon_pay_config.noonpay_capture_payment_end_point ? paymentConf.noon_pay_config.noonpay_capture_payment_end_point : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayCapturePaymentEndPoint,
                                                    noonpayReversePaymentEndPoint: paymentConf.noon_pay_config.noonpay_reverse_payment_end_point ? paymentConf.noon_pay_config.noonpay_reverse_payment_end_point : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayReversePaymentEndPoint,
                                                    noonpayRefundPaymentEndPoint: paymentConf.noon_pay_config.noonpay_refund_payment_end_point ? paymentConf.noon_pay_config.noonpay_refund_payment_end_point : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.noonpayRefundPaymentEndPoint,
                                                    code: paymentConf.noon_pay_config.code ? paymentConf.noon_pay_config.code : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.code,
                                                    status: paymentConf.noon_pay_config.status ? parseInt(paymentConf.noon_pay_config.status) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.status,
                                                    // sdm: {
                                                    //     pay_status: paymentConf.noon_pay_config.sdm.pay_status ? parseInt(paymentConf.noon_pay_config.sdm.pay_status) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_STATUS,
                                                    //     pay_store_tender_id: paymentConf.noon_pay_config.sdm.pay_store_tender_id ? parseInt(paymentConf.noon_pay_config.sdm.pay_store_tender_id) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_STORE_TENDERID,
                                                    //     pay_sub_type: paymentConf.noon_pay_config.sdm.pay_sub_type ? parseInt(paymentConf.noon_pay_config.sdm.pay_sub_type) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_SUB_TYPE,
                                                    //     pay_type: paymentConf.noon_pay_config.sdm.pay_type ? parseInt(paymentConf.noon_pay_config.sdm.pay_type) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_TYPE,
                                                    // }
                                                },
                                                codInfo: {
                                                    status: paymentConf.cod_info.status ? parseInt(paymentConf.cod_info.status) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.status,
                                                    name: paymentConf.cod_info.name ? paymentConf.cod_info.name : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.name,
                                                    code: paymentConf.cod_info.code ? paymentConf.cod_info.code : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.code,
                                                    min_order_total: paymentConf.cod_info.min_order_total ? parseInt(paymentConf.cod_info.min_order_total) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.min_order_total,
                                                    max_order_total: paymentConf.cod_info.max_order_total ? parseInt(paymentConf.cod_info.max_order_total) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.max_order_total,
                                                    // sdm: {
                                                    //     pay_status: paymentConf.cod_info.sdm.pay_status ? parseInt(paymentConf.cod_info.sdm.pay_status) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_STATUS,
                                                    //     pay_store_tender_id: paymentConf.cod_info.sdm.pay_store_tender_id ? parseInt(paymentConf.cod_info.sdm.pay_store_tender_id) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_STORE_TENDERID,
                                                    //     pay_sub_type: paymentConf.cod_info.sdm.pay_sub_type ? parseInt(paymentConf.cod_info.sdm.pay_sub_type) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_SUB_TYPE,
                                                    //     pay_type: paymentConf.cod_info.sdm.pay_type ? parseInt(paymentConf.cod_info.sdm.pay_type) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_TYPE,
                                                    // }
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
                                            paymentMethods = Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.paymentMethods
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
                                }
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
                            let conf: ICmsConfigRequest.ICmsConfigShipment[] = data.data
                            if (conf && conf.length > 0) {
                                for (const shipmentConf of conf) {
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
                                }
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
                            data.data = data.data.map(obj => {
                                return obj.data[0]
                            })
                            let conf: ICmsConfigRequest.ICmsConfigCountrySpecifc[] = data.data
                            if (conf && conf.length > 0) {
                                for (const countrySpcificConf of conf) {
                                    if (countrySpcificConf.country_code == "AE") {
                                        countrySpcificConf.country_code = "UAE"
                                        let dataToSave: IConfigRequest.IConfig = {
                                            id: countrySpcificConf.country_code,
                                            type: data.type,
                                            countrySpecific: {
                                                country_code: countrySpcificConf.country_code ? countrySpcificConf.country_code : Constant.CONF.COUNTRY_SPECIFIC.UAE.COUNTRY_CODE,
                                                country_name: countrySpcificConf.country_name ? countrySpcificConf.country_name : Constant.CONF.COUNTRY_SPECIFIC.UAE.COUNTRY_NAME,
                                                base_currency: countrySpcificConf.base_currency ? countrySpcificConf.base_currency : Constant.CONF.COUNTRY_SPECIFIC.UAE.BASE_CURRENCY,
                                                channel_data: undefined,
                                                home_overlay: {
                                                    En: {
                                                        mediaUrl: countrySpcificConf.home_overlay.En.mediaUrl ? countrySpcificConf.home_overlay.En.mediaUrl : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.En.mediaUrl,
                                                        gif: countrySpcificConf.home_overlay.En.gif ? countrySpcificConf.home_overlay.En.gif : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.En.gif,
                                                        mediaType: countrySpcificConf.home_overlay.En.mediaType ? countrySpcificConf.home_overlay.En.mediaType : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.En.mediaType,
                                                        extension: countrySpcificConf.home_overlay.En.extension ? countrySpcificConf.home_overlay.En.extension : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.En.extension,
                                                        action: {
                                                            id: countrySpcificConf.home_overlay.En.action.id ? parseInt(countrySpcificConf.home_overlay.En.action.id) : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.En.action.id,
                                                            type: countrySpcificConf.home_overlay.En.action.type ? countrySpcificConf.home_overlay.En.action.type : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.En.action.type,
                                                            delimeters: countrySpcificConf.home_overlay.En.action.delimeters ? countrySpcificConf.home_overlay.En.action.delimeters : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.En.action.delimeters
                                                        }
                                                    },
                                                    Ar: {
                                                        mediaUrl: countrySpcificConf.home_overlay.Ar.mediaUrl ? countrySpcificConf.home_overlay.Ar.mediaUrl : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.Ar.mediaUrl,
                                                        gif: countrySpcificConf.home_overlay.Ar.gif ? countrySpcificConf.home_overlay.Ar.gif : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.Ar.gif,
                                                        mediaType: countrySpcificConf.home_overlay.Ar.mediaType ? countrySpcificConf.home_overlay.Ar.mediaType : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.Ar.mediaType,
                                                        extension: countrySpcificConf.home_overlay.Ar.extension ? countrySpcificConf.home_overlay.Ar.extension : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.Ar.extension,
                                                        action: {
                                                            id: countrySpcificConf.home_overlay.Ar.action.id ? parseInt(countrySpcificConf.home_overlay.Ar.action.id) : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.Ar.action.id,
                                                            type: countrySpcificConf.home_overlay.Ar.action.type ? countrySpcificConf.home_overlay.Ar.action.type : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.Ar.action.type,
                                                            delimeters: countrySpcificConf.home_overlay.Ar.action.delimeters ? countrySpcificConf.home_overlay.Ar.action.delimeters : Constant.CONF.COUNTRY_SPECIFIC.UAE.HOME_OVERLAY.Ar.action.delimeters
                                                        }
                                                    }
                                                },
                                                sdm: {
                                                    sdm_url: countrySpcificConf.sdm_url ? countrySpcificConf.sdm_url : Constant.CONF.COUNTRY_SPECIFIC.UAE.SDM.SDM_URL,
                                                    licence_code: countrySpcificConf.sdm.licence_code ? countrySpcificConf.sdm.licence_code : Constant.CONF.COUNTRY_SPECIFIC.UAE.SDM.LICENSE_CODE,
                                                    concept_id: countrySpcificConf.sdm.concept_id ? parseInt(countrySpcificConf.sdm.concept_id) : Constant.CONF.COUNTRY_SPECIFIC.UAE.SDM.CONCEPT_ID,
                                                    menu_template_id: countrySpcificConf.sdm.menu_template_id ? parseInt(countrySpcificConf.sdm.menu_template_id) : Constant.CONF.COUNTRY_SPECIFIC.UAE.SDM.MENU_TEMPLATE_ID,
                                                },
                                                ccode: countrySpcificConf.ccode ? countrySpcificConf.ccode : Constant.CONF.COUNTRY_SPECIFIC.UAE.CCODE,
                                                customer_care: countrySpcificConf.customer_care ? countrySpcificConf.customer_care : Constant.CONF.COUNTRY_SPECIFIC.UAE.CUSTOMER_CARE,
                                                support_email: countrySpcificConf.support_email ? countrySpcificConf.support_email : Constant.CONF.COUNTRY_SPECIFIC.UAE.SUPPORT_EMAIL,
                                                min_cart_value: countrySpcificConf.min_cart_value ? parseInt(countrySpcificConf.min_cart_value) : Constant.CONF.COUNTRY_SPECIFIC.UAE.MIN_CART_VALUE,
                                                min_cod_cart_value: countrySpcificConf.min_cod_cart_value ? parseInt(countrySpcificConf.min_cod_cart_value) : Constant.CONF.COUNTRY_SPECIFIC.UAE.MIN_COD_CART_VALUE,
                                            },
                                            createdAt: new Date().getTime()
                                        }
                                        let channel_data = []
                                        if (countrySpcificConf.channel_data && countrySpcificConf.channel_data.length > 0) {

                                        } else {
                                            channel_data = Constant.CONF.COUNTRY_SPECIFIC.UAE.CHANNEL_DATA
                                        }
                                        dataToSave['channel_data'] = channel_data
                                        let putArg: IAerospike.Put = {
                                            bins: dataToSave,
                                            set: ENTITY.ConfigE.set,
                                            key: dataToSave['id'],
                                            createOrReplace: true,
                                        }
                                        await Aerospike.put(putArg)
                                        let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                                            set: Constant.SET_NAME.PING_SERVICE,
                                            as: {
                                                create: true,
                                                argv: JSON.stringify({
                                                    set: Constant.SET_NAME.CONFIG,
                                                    service: [
                                                        Constant.MICROSERVICE.ORDER,
                                                        Constant.MICROSERVICE.USER,
                                                        Constant.MICROSERVICE.MENU,
                                                        Constant.MICROSERVICE.NOTIFICATION,
                                                    ],
                                                    country: countrySpcificConf.country_code
                                                })
                                            },
                                            inQ: true
                                        }
                                        kafkaService.kafkaSync(pingServices)
                                    }
                                }
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