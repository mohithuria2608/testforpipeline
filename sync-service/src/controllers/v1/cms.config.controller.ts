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
            let configssss = [
                {
                    "type": "general",
                    "action": "reset",
                    "data": [
                        {
                            "cms_page_data": [
                                {
                                    "title": "404 Not Found",
                                    "identifier": "no-route"
                                },
                                {
                                    "title": "Home page",
                                    "identifier": "home"
                                },
                                {
                                    "title": "Enable Cookies",
                                    "identifier": "enable-cookies"
                                },
                                {
                                    "title": "Privacy and Cookie Policy",
                                    "identifier": "privacy-policy-cookie-restriction-mode"
                                }
                            ],
                            "ttl_for_menu": null,
                            "ttl_for_cart": "86400",
                            "initial_user_ttl": "604800",
                            "initial_guest_ttl": "86400",
                            "bypass_otp": "1212",
                            "otp_expire": "600000",
                            "access_token_expire_time": "8640000",
                            "refresh_token_expire_time": "8640000",
                            "cms_auth_exp": null,
                            "reg_ex_for_validation": "^[1-9]\\\\d{8}$|^[1-9]\\\\d{8}$",
                            "country_codes": "+971",
                            "resent_otp_attempts": null,
                            "upgrade": null,
                            "tnclink": null,
                            "maximum_order_items": null,
                            "app_reset_time_stamp": null,
                            "cdn_base_url": null,
                            "maximum_cart_price": null,
                            "support": "666666666",
                            "appstore_url": null,
                            "play_store_url": null,
                            "customer_care_email": "kfc_uae@gmail.com",
                            "user_change_ttl": "900",
                            "max_pending_state": "480000",
                            "minimum_cart_price": "23",
                            "payment_api_timeout": "3 * 1000",
                            "payment_api_key_prefix": "Key_",
                            "display_color": "true",
                            "deeplink_fallback": "https://uae.kfc.me//",
                            "auth_mech": "Bearer",
                            "addr_show_time": "3",
                            "track_order": null,
                            "android_scheme_host": null,
                            "android_package_name": null,
                            "ios_scheme_host": null,
                            "splash_expr_time": null,
                            "chunk_size_user_migration": null,
                            "payment_success_fallback": null,
                            "payment_failure_fallback": null,
                            "delivery_charge_id": null,
                            "img_etag_threshold": null,
                            "sdm_store_time_offset": null,
                            "success": true
                        }
                    ]
                },
                {
                    "type": "kafka",
                    "action": "reset",
                    "data": [
                        {
                            "sdm": {
                                "user_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "address_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "menu_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "promotion_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "hidden_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "order_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    },
                                    "interval": {
                                        "get": null,
                                        "get_once": null,
                                        "get_max": null,
                                        "next_ping": null
                                    }
                                }
                            },
                            "user": {
                                "user_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "address_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "menu_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "promotion_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "hidden_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "order_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                }
                            },
                            "as": {
                                "user_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "address_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "menu_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "promotion_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "hidden_config": {
                                    "max_try": {
                                        "create": "5",
                                        "update": "5",
                                        "get": "5",
                                        "sync": "5",
                                        "reset": "5"
                                    }
                                },
                                "configuration_config": {
                                    "max_try": {
                                        "create": null,
                                        "update": null,
                                        "get": null,
                                        "sync": null,
                                        "reset": null
                                    }
                                },
                                "app_config": {
                                    "max_try": {
                                        "create": null,
                                        "update": null,
                                        "get": null,
                                        "sync": null,
                                        "reset": null
                                    }
                                },
                                "faq_config": {
                                    "max_try": {
                                        "create": null,
                                        "update": null,
                                        "get": null,
                                        "sync": null,
                                        "reset": null
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "order_status",
                    "action": "reset",
                    "data": [
                        {
                            "cart_config": {
                                "as": "CART",
                                "mongo": null,
                                "cms": null,
                                "sdm": null,
                                "freq": {
                                    "get": null,
                                    "geet_once": null,
                                    "get_max": null,
                                    "next_ping": null
                                }
                            }
                        },
                        {
                            "pending_config": {
                                "as": "PENDING",
                                "mongo": "PENDING",
                                "cms": "pending",
                                "sdm": "0,1,96",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "confirmed_config": {
                                "as": "CONFIRMED",
                                "mongo": "CONFIRMED",
                                "cms": "processing",
                                "sdm": "2",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "prepared_config": {
                                "as": "BEING_PREPARED",
                                "mongo": "BEING_PREPARED",
                                "cms": "being_prepared",
                                "sdm": "2",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "ready_config": {
                                "as": "READY",
                                "mongo": "READY",
                                "cms": "ready",
                                "sdm": "8",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "ontheway_config": {
                                "as": "ON_THE_WAY",
                                "mongo": "ON_THE_WAY",
                                "cms": "shipped",
                                "sdm": "16,32",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "delivered_config": {
                                "as": "DELIVERED",
                                "mongo": "DELIVERED",
                                "cms": "complete",
                                "sdm": "64,128,2048",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "closed_config": {
                                "as": null,
                                "mongo": null,
                                "cms": "closed",
                                "sdm": null,
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "cancelled_config": {
                                "as": "CANCELLED",
                                "mongo": "CANCELED",
                                "cms": "canceled",
                                "sdm": "512,256,1024,4096,8192",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        },
                        {
                            "failure_config": {
                                "as": "FAILURE",
                                "mongo": "FAILURE",
                                "cms": "failed",
                                "sdm": "-2",
                                "freq": {
                                    "get": "5000",
                                    "geet_once": "0",
                                    "get_max": "65000",
                                    "next_ping": "15"
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "payment",
                    "action": "reset",
                    "data": [
                        {
                            "cod_info": {
                                "status": "1",
                                "name": "Cash On Delivery",
                                "min_order_total": null,
                                "max_order_total": null,
                                "code": "cashondelivery",
                                "sdm": {
                                    "pay_status": null,
                                    "pay_store_tender_id": null,
                                    "pay_sub_type": null,
                                    "pay_type": null
                                }
                            },
                            "noon_pay_config": {
                                "brand_code": "KFC",
                                "country_code": "AE",
                                "currency_code": "AED",
                                "channel": "Mobile",
                                "decimal": "2",
                                "payment_methods": [
                                    {
                                        "id": "1",
                                        "name": "Card",
                                        "order_category": "kfc_3ds"
                                    }
                                ],
                                "payment_retry_interval": "10000",
                                "max_try": "2",
                                "noonpay_order_expiration_time": "600000",
                                "businessIdentifier": "americana_test_cognizant",
                                "app_identifier": "kfc_uae_test",
                                "app_access_key": "65c5cc823a3f4c079de1c2928d927ebd",
                                "apiKey": null,
                                "environment": "Test",
                                "noonpay_base_url": "https://api.noonpayments.com/payment/v1",
                                "noonpay_initiate_payment_end_point": "/order",
                                "noonpay_get_order_end_point": null,
                                "noonpay_get_order_refrence_end_point": null,
                                "noonpay_capture_payment_endpoint": null,
                                "noonpay_reverse_payment_endpoint": null,
                                "noonpay_refund_payment_endpoint": null,
                                "code": "noonpay",
                                "status": "1",
                                "sdm": {
                                    "pay_status": null,
                                    "pay_store_tender_id": null,
                                    "pay_sub_type": null,
                                    "pay_type": null
                                }
                            },
                            "store_code": "uae_store",
                            "store_id": "3"
                        },
                        {
                            "store_code": "ksa_store",
                            "store_id": "2",
                            "noon_pay_config": {
                                "brand_code": "ksa",
                                "country_code": "us",
                                "currency_code": null,
                                "channel": null,
                                "decimal": null,
                                "payment_methods": [
                                    {
                                        "id": "1",
                                        "name": "Card",
                                        "order_category": "kfc_3ds"
                                    }
                                ],
                                "payment_retry_interval": null,
                                "max_try": null,
                                "noonpay_order_expiration_time": null,
                                "businessIdentifier": null,
                                "app_identifier": null,
                                "app_access_key": null,
                                "apiKey": null,
                                "environment": null,
                                "noonpay_base_url": null,
                                "noonpay_initiate_payment_end_point": null,
                                "noonpay_get_order_end_point": null,
                                "noonpay_get_order_refrence_end_point": null,
                                "noonpay_capture_payment_endpoint": null,
                                "noonpay_reverse_payment_endpoint": null,
                                "noonpay_refund_payment_endpoint": null,
                                "code": "noonpay",
                                "status": "1",
                                "sdm": {
                                    "pay_status": null,
                                    "pay_store_tender_id": null,
                                    "pay_sub_type": null,
                                    "pay_type": null
                                }
                            },
                            "cod_info": {
                                "status": "1",
                                "name": "Cash On Delivery",
                                "min_order_total": null,
                                "max_order_total": null,
                                "code": "cashondelivery",
                                "sdm": {
                                    "pay_status": null,
                                    "pay_store_tender_id": null,
                                    "pay_sub_type": null,
                                    "pay_type": null
                                }
                            }
                        },
                        {
                            "store_code": "main_website_store",
                            "store_id": "1",
                            "noon_pay_config": {
                                "brand_code": "ksa",
                                "country_code": "us",
                                "currency_code": null,
                                "channel": null,
                                "decimal": null,
                                "payment_methods": [

                                ],
                                "payment_retry_interval": null,
                                "max_try": null,
                                "noonpay_order_expiration_time": null,
                                "businessIdentifier": null,
                                "app_identifier": null,
                                "app_access_key": null,
                                "apiKey": null,
                                "environment": null,
                                "noonpay_base_url": null,
                                "noonpay_initiate_payment_end_point": null,
                                "noonpay_get_order_end_point": null,
                                "noonpay_get_order_refrence_end_point": null,
                                "noonpay_capture_payment_endpoint": null,
                                "noonpay_reverse_payment_endpoint": null,
                                "noonpay_refund_payment_endpoint": null,
                                "code": "noonpay",
                                "status": "1",
                                "sdm": {
                                    "pay_status": null,
                                    "pay_store_tender_id": null,
                                    "pay_sub_type": null,
                                    "pay_type": null
                                }
                            },
                            "cod_info": {
                                "status": "1",
                                "name": "Cash On Delivery",
                                "min_order_total": null,
                                "max_order_total": null,
                                "code": "cashondelivery",
                                "sdm": {
                                    "pay_status": null,
                                    "pay_store_tender_id": null,
                                    "pay_sub_type": null,
                                    "pay_type": null
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "country_specific",
                    "action": "reset",
                    "data": [
                        {
                            "country_code": "BHM",
                            "country_name": "Bharat Mata",
                            "concept_id": "bot bda concept hai",
                            "sdm_url": "ptaa ni",
                            "base_currency": "upper currency",
                            "licence": "licence hi licence hai",
                            "channel_data": [
                                {
                                    "template_id": "1",
                                    "template_status": "1",
                                    "channel_name": "Star Sports",
                                    "menu_data": [
                                        {
                                            "menu_id": "2",
                                            "menu_state": "2",
                                            "menu_cluster": "2",
                                            "frequency_cron": "2",
                                            "time_cron": "2"
                                        },
                                        {
                                            "menu_id": "234",
                                            "menu_state": "delhi",
                                            "menu_cluster": "cluster",
                                            "frequency_cron": "bot jaldi",
                                            "time_cron": "2 mint"
                                        }
                                    ]
                                },
                                {
                                    "template_id": "2",
                                    "template_status": "1",
                                    "channel_name": "Nat Geo",
                                    "menu_data": [
                                        {
                                            "menu_id": "2",
                                            "menu_state": "2",
                                            "menu_cluster": "2",
                                            "frequency_cron": "2",
                                            "time_cron": "2"
                                        }
                                    ]
                                }
                            ],
                            "home_overlay": {
                                "En": {
                                    "mediaUrl": null,
                                    "gif": null,
                                    "mediaType": null,
                                    "extension": null,
                                    "action": {
                                        "id": null,
                                        "type": null,
                                        "delimeters": null
                                    }
                                },
                                "Ar": {
                                    "mediaUrl": null,
                                    "gif": null,
                                    "mediaType": null,
                                    "extension": null,
                                    "action": {
                                        "id": null,
                                        "type": null,
                                        "delimeters": null
                                    }
                                }
                            },
                            "sdm": {
                                "licence_code": null,
                                "concept_id": null,
                                "menu_template_id": null
                            },
                            "ccode": null,
                            "customer_care": null,
                            "support_email": null,
                            "min_cart_value": null,
                            "min_cod_cart_value": null
                        }
                    ]
                },
                {
                    "type": "shipment",
                    "action": "reset",
                    "data": [
                        {
                            "1": {
                                "store_code": "main_website_store",
                                "store_id": "1",
                                "free_shipping": {
                                    "status": "1",
                                    "title": "Free Shipping",
                                    "min_order_total": "1",
                                    "price": 0,
                                    "code": "freeshipping"
                                },
                                "flat_rate": {
                                    "status": "1",
                                    "title": "Flat Rate",
                                    "price": 6.5,
                                    "code": "flatrate"
                                }
                            },
                            "2": {
                                "store_code": "ksa_store",
                                "store_id": "2",
                                "free_shipping": {
                                    "status": "1",
                                    "title": "Free Shipping",
                                    "min_order_total": "1",
                                    "price": 0,
                                    "code": "freeshipping"
                                },
                                "flat_rate": {
                                    "status": "1",
                                    "title": "Flat Rate",
                                    "price": 6.5,
                                    "code": "flatrate"
                                }
                            },
                            "3": {
                                "store_code": "uae_store",
                                "store_id": "3",
                                "free_shipping": {
                                    "status": "1",
                                    "title": "Free Shipping",
                                    "min_order_total": "1",
                                    "price": 0,
                                    "code": "freeshipping"
                                },
                                "flat_rate": {
                                    "status": "1",
                                    "title": "Flat Rate",
                                    "price": 6.5,
                                    "code": "flatrate"
                                }
                            }
                        }
                    ]
                }
            ]
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
                            let conf: ICmsConfigRequest.ICmsConfigOrderStatus[] = data.data
                            if (conf && conf.length > 0) {
                                let configToSync = []
                                for (const config of conf) {
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
                                                    sdm: {
                                                        pay_status: paymentConf.noon_pay_config.sdm.pay_status ? parseInt(paymentConf.noon_pay_config.sdm.pay_status) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_STATUS,
                                                        pay_store_tender_id: paymentConf.noon_pay_config.sdm.pay_store_tender_id ? parseInt(paymentConf.noon_pay_config.sdm.pay_store_tender_id) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_STORE_TENDERID,
                                                        pay_sub_type: paymentConf.noon_pay_config.sdm.pay_sub_type ? parseInt(paymentConf.noon_pay_config.sdm.pay_sub_type) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_SUB_TYPE,
                                                        pay_type: paymentConf.noon_pay_config.sdm.pay_type ? parseInt(paymentConf.noon_pay_config.sdm.pay_type) : Constant.CONF.PAYMENT[paymentConf.store_code].noonpayConfig.SDM.PAY_TYPE,
                                                    }
                                                },
                                                codInfo: {
                                                    status: paymentConf.cod_info.status ? parseInt(paymentConf.cod_info.status) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.status,
                                                    name: paymentConf.cod_info.name ? paymentConf.cod_info.name : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.name,
                                                    code: paymentConf.cod_info.code ? paymentConf.cod_info.code : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.code,
                                                    min_order_total: paymentConf.cod_info.min_order_total ? parseInt(paymentConf.cod_info.min_order_total) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.min_order_total,
                                                    max_order_total: paymentConf.cod_info.max_order_total ? parseInt(paymentConf.cod_info.max_order_total) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.max_order_total,
                                                    sdm: {
                                                        pay_status: paymentConf.cod_info.sdm.pay_status ? parseInt(paymentConf.cod_info.sdm.pay_status) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_STATUS,
                                                        pay_store_tender_id: paymentConf.cod_info.sdm.pay_store_tender_id ? parseInt(paymentConf.cod_info.sdm.pay_store_tender_id) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_STORE_TENDERID,
                                                        pay_sub_type: paymentConf.cod_info.sdm.pay_sub_type ? parseInt(paymentConf.cod_info.sdm.pay_sub_type) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_SUB_TYPE,
                                                        pay_type: paymentConf.cod_info.sdm.pay_type ? parseInt(paymentConf.cod_info.sdm.pay_type) : Constant.CONF.PAYMENT[paymentConf.store_code].codInfo.SDM.PAY_TYPE,
                                                    }
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
                                conf.map(async shipmentConf => {
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
                            let conf: ICmsConfigRequest.ICmsConfigCountrySpecifc[] = data.data
                            if (conf && conf.length > 0) {
                                let store_code = data.data['store_code']
                                conf.map(async config => {
                                    let dataToSave = {
                                        id: config.country_code,
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
                                    if (config.ccode)
                                        dataToSave['ccode'] = config.ccode

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