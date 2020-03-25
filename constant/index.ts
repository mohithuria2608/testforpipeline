export enum MICROSERVICE {
    AUTH = "auth",
    USER = "user",
    MENU = "menu",
    ORDER = "order",
    PROMOTION = "promotion",
    PAYMENT = "payment",
    SYNC = "sync",
    KAFKA = "kafka",
    DEEPLINK = "deeplink",
    HOME = "home",
    LOG = "log",
    NOTIFICATION = "notification",
    UPLOAD = "upload",
    LOCATION = "location"
};

export enum SET_NAME {
    USER = "user",
    SESSION = "session",
    USERCHANGE = "userchange",
    ADDRESS = "address",
    LOCATION = "location",
    HOME_EN = "home_en",
    HOME_AR = "home_ar",
    MENU_EN = "menu_en",
    MENU_AR = "menu_ar",
    HIDDEN_AR = "hidden_ar",
    HIDDEN_EN = "hidden_en",
    PROMOTION = "promotion",
    CART = "cart",
    ORDER = "order",
    CONFIG = "config",
    COUNTRY = "country",
    AREA = "area",
    CITY = "city",
    STORE = "store",
    PICKUP = "pickup",
    SYNC_STORE = "sync_store",
    SYNC_CITY = "sync_city",
    SYNC_AREA = "sync_area",
    SYNC_WEB_AREA = "sync_web_area",
    SYNC_COUNTRY = "sync_country",
    LOGGER = "logger",
    APP_VERSION = "appversion",
    FAILQ = "failq",
    PING_SERVICE = "ping-service",
    LOAD = "load"
};

export enum KAFKA_TOPIC {
    FAIL_Q = "fail_q",

    SDM_MENU = "sdm_menu",
    CMS_MENU = "cms_menu",
    AS_MENU = "as_menu",
    AS_HOME = "as_home",
    AS_HIDDEN = "as_hidden",

    AS_LOCATION = "as_location",
    CMS_LOCATION = "cms_location",
    AS_STORE = "as_store",

    SDM_USER = "sdm_user",
    CMS_USER = "cms_user",
    AS_USER = "as_user",

    CMS_ADDRESS = "cms_address",
    SDM_ADDRESS = "sdm_address",
    AS_ADDRESS = "as_address",

    AS_PROMOTION = 'as_promotion',

    SDM_ORDER = 'sdm_order',

    AS_CONFIG = 'as_config',
    AS_APP_VERSION = 'as_app_version',

    M_LOGGER = 'm_logger',

    PING_SERVICE = 'ping_service',
};

export enum MIDDLEWARE {
    AUTH = "auth",
    ACTIVITY_LOG = "activity_log",
    APP_VERSION = "app_version"
};

export const SERVER = {
    ENV: {
        default: 0,
        development: 1,
        testing: 2,
        staging: 3,
        production: 4
    },
    APP_INFO: {
        APP_NAME: "App",
        FB_LINK: "",
        TWITTER_LINK: "",
        INSTA_LINK: "",
        APP_ADDRESS: ""
    },
    SDM: {
        LICENSE_CODE: "PizzaHutApp",// "AmericanaWeb",
        CONCEPT_ID: 3,
        MENU_TEMPLATE_ID: 17
    },
    DEFAULT_CART_TTL: 24 * 60 * 60,//seconds
    USERCHANGE_TTL: 15 * 60,//seconds
    BY_PASS_OTP: 1212,
    OTP_EXPIRE_TIME: (10 * 60 * 1000), //millisecond
    ACCESS_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    REFRESH_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    TRACK_ORDER_UNITIL: (2 * 60 * 60 * 1000),
    MIN_COD_CART_VALUE: 300,//AED
    MIN_CART_VALUE: 23,//AED
    MAX_PENDING_STATE_TIME: (8 * 60 * 1000),//millisecond
    PAYMENT_API_TIMEOUT: 3 * 1000,// 1 sec
    PAYMENT_API_KEY_PREFIX: "Key_",
    DISPLAY_COLOR: true,
    ANDROID_SCHEME_HOST: "https://",
    ANDROID_PACKAGE_NAME: "com.android.kfc",
    IOS_SCHEME_HOST: "americanaKFCUAE://",
    DEEPLINK_FALLBACK: 'https://uae.kfc.me//',
    AUTH_MECH: "Bearer",
    ADDR_SHOW_TIME: 3,//hr
    CUSTOMER_CARE: "666666666",
    SUPPORT_EMAIL: "kfc_uae@ag.com",
    DEFAULT_CCODE: "+971",
    CHUNK_SIZE_USER_MIGRATION: 50000,
    PAYMENT_SUCCESS_FALLBACK: "payment/success",
    PAYMENT_FAILURE_FALLBACK: "payment/failure",
    DELIVERY_CHARGE_ID: 279
};

export const SDM_CONFIG = {
    UAE: {
        COUNTRY_ID: 1,
        MENU_ID: 1,
        SDM_URL: ''
    }
}

export const DATABASE = {
    STORE_CODE: {
        MAIN_WEB_STORE: "main_website_store"
    },

    BRAND: {
        KFC: 'KFC',
        PH: 'PH'
    },

    COUNTRY: {
        UAE: 'UAE',
    },

    CCODE: {
        UAE: '+971',
    },

    LANGUAGE: {
        EN: 'En',
        AR: 'Ar'
    },

    PAYMENT_LOCALE: {
        EN: 'en',
        AR: 'ar'
    },

    UDF: {
        USER: {
            check_social_key: "check_social_key",
        }
    },

    CMS: {
        END_POINTS: {
            GENERAL_CONFIG: {
                METHOD: "GET",
                URL: "americanaconfig/"
            },
            CREATE_USER: {
                METHOD: "POST",
                URL: "createuser"
            },
            UPDATE_USER: {
                METHOD: "POST",
                URL: "updateuser"
            },
            GET_USER: {
                METHOD: "POST",
                URL: "getuser"
            },
            CREATE_ADDRESS: {
                METHOD: "POST",
                URL: "createaddress"
            },
            DELETE_ADDRESS: {
                METHOD: "POST",
                URL: "userdeleteaddress"
            },
            UPDATE_ADDRESS: {
                METHOD: "POST",
                URL: "userupdateaddress"
            },
            CREATE_CART: {
                METHOD: "POST",
                URL: "customcart/create-validate-cart"
            },
            CREATE_ORDER: {
                METHOD: "POST",
                URL: "custom-order/create-order"
            },
            UPDATE_ORDER: {
                METHOD: "POST",
                URL: "custom-order/update-attribute"
            },
            CREATE_TRANSACTION: {
                METHOD: "POST",
                URL: "custom-order/add-transaction"
            }
        }
    },

    KAFKA: {
        SDM: {
            USER: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            ADDRESS: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            MENU: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            PROMOTION: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            HIDDEN: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            ORDER: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                },
                INTERVAL: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            }
        },
        CMS: {
            USER: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            ADDRESS: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            MENU: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            PROMOTION: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            HIDDEN: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            }
        },
        AS: {
            USER: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            ADDRESS: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            MENU: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            PROMOTION: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            HIDDEN: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            CONFIG: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
            APP_VERSION: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            }
        }
    },

    TYPE: {
        PAYMENT_ACTION_HINTS: {
            STATUS_USING_NOONPAY_ID: 'GET_PAYMENT_STATUS_USING_NOONPAY_ID',
            SYNC_CONFIGURATION: 'SYNC_PAYMENT_CONFIGURATION'
        },

        PAYMENT_METHOD: {
            FRONTEND_TEXT: {
                En: [
                    {
                        name: "CARD",
                        value: "Card"
                    },
                    {
                        name: "COD",
                        value: "Cash On Delivery"
                    }
                ],
                Ar: [
                    {
                        name: "CARD",
                        value: "بطاقة إئتمان"
                    },
                    {
                        name: "COD",
                        value: "المبلغ المحدد نقداً"
                    }
                ]
            },
            TYPE: {
                CARD: "CARD",
                COD: "COD"
            }
        },

        PAYMENT_METHOD_ID: {
            CARD: 1,
            COD: 0
        },

        CONFIG: {
            GENERAL: "general",
            PAYMENT: "payment",
            SHIPMENT: "shipment",
            COUNTRY_SPECIFIC: "country-specific",
            KAFKA: "kafka",
            ORDER_STATUS: "order-status"
        },

        TOKEN: {
            GUEST_AUTH: "GUEST_AUTH",
            USER_AUTH: "USER_AUTH",
            REFRESH_AUTH: "REFRESH_AUTH"
        },

        DEVICE: {
            IOS: 'IOS',
            ANDROID: 'ANDROID',
            WEB: 'WEB'
        },

        SOCIAL_PLATFORM: {
            GOOGLE: "GOOGLE",
            FB: "FB",
            APPLE: "APPLE"
        },

        APP_VERSION: {
            FORCE: "FORCE",
            SKIP: "SKIP",
            NORMAL: "NORMAL"
        },

        ACTIVITY_LOG: {
            SDM_REQUEST: "SDM_REQUEST",
            CMS_REQUEST: "CMS_REQUEST",
            FAIL_Q: "FAIL_Q",
            REQUEST: "REQUEST",
            ERROR: "ERROR",
            INFO: "INFO",
            SMS: "SMS",
        },

        PROFILE_STEP: {
            INIT: 0,
            FIRST: 1,
        },

        TAG: {
            HOME: "HOME",
            OFFICE: "OFFICE",
            HOTEL: "HOTEL",
            OTHER: "OTHER"
        },

        ADDRESS: {
            PICKUP: "PICKUP",
            DELIVERY: "DELIVERY"
        },

        ADDRESS_BIN: {
            PICKUP: "pickup",
            DELIVERY: "delivery"
        },

        ORDER: {
            DELIVERY: {
                AS: "DELIVERY",
                SDM: 1
            },
            PICKUP: {
                AS: "PICKUP",
                SDM: 2,
            }
        },

        DEEPLINK_REDIRECTION: {
            HOME: "HOME",
            CATEGORY: "CATEGORY",
            ITEM_DETAIL: "ITEM_DETAIL",
            ADD_TO_CART: "ADD_TO_CART",
        },

        STATUS: {
            INACTIVE: 0,
            ACTIVE: 1
        },

        SYNC_ACTION: {
            CREATE: "create",
            UPDATE: "update",
            RESET: "reset",
        },

        CART_AMOUNT: {
            TYPE: {
                SUB_TOTAL: "SUB_TOTAL",
                DISCOUNT: "DISCOUNT",
                TAX: "TAX",
                SHIPPING: "SHIPPING",
                TOTAL: "TOTAL",
            },
            FRONTEND_TEXT: {
                En: [
                    {
                        name: "SUB_TOTAL",
                        value: "Sub Total"
                    },
                    {
                        name: "DISCOUNT",
                        value: "Discount"
                    },
                    {
                        name: "TAX",
                        value: "VAT"
                    },
                    {
                        name: "SHIPPING",
                        value: "Delivery"
                    },
                    {
                        name: "TOTAL",
                        value: "Total"
                    }
                ],
                Ar: [
                    {
                        name: "SUB_TOTAL",
                        value: "المجموع الفرعي"
                    },
                    {
                        name: "DISCOUNT",
                        value: "خدمة التوصيل"
                    },
                    {
                        name: "TAX",
                        value: "ضريبة مضافة"
                    },
                    {
                        name: "SHIPPING",
                        value: "رسوم النقل"
                    },
                    {
                        name: "TOTAL",
                        value: "المجموع"
                    }
                ]
            }
        },

        FREQ_TYPE: {
            GET: "GET",
            GET_ONCE: "GET_ONCE",
            GET_MAX: "GET_MAX",
        },

        MENU: {
            MENU: "MENU",
            FREE: "FREE",
            UPSELL: "UPSELL"
        },

        MENU_CATEGORY: {
            FREE: "Free Product",
            UPSELL: "Upsell"
        }
    },

    STATUS: {
        ORDER: {
            FRONTEND_TEXT: {
                En: [
                    {
                        name: "PENDING",
                        value: "Pending"
                    },
                    {
                        name: "CONFIRMED",
                        value: "Confirmed"
                    },
                    {
                        name: "BEING_PREPARED",
                        value: "Being prepared"
                    },
                    {
                        name: "READY",
                        value: "Ready"
                    },
                    {
                        name: "ON_THE_WAY",
                        value: "On the way"
                    },
                    {
                        name: "DELIVERED",
                        value: "Delivered"
                    },
                    {
                        name: "CLOSED",
                        value: "Closed"
                    },
                    {
                        name: "CANCELED",
                        value: "Canceled"
                    },
                    {
                        name: "FAILURE",
                        value: "Failure"
                    }
                ],
                Ar: [
                    {
                        name: "PENDING",
                        value: "قيد الانتظار"
                    },
                    {
                        name: "CONFIRMED",
                        value: "تم التأكيد"
                    },
                    {
                        name: "BEING_PREPARED",
                        value: "جاري التجهيز"
                    },
                    {
                        name: "READY",
                        value: "جاهز"
                    },
                    {
                        name: "ON_THE_WAY",
                        value: "في الطريق"
                    },
                    {
                        name: "DELIVERED",
                        value: "تم توصيله"
                    },
                    {
                        name: "CLOSED",
                        value: "مغلق"
                    },
                    {
                        name: "CANCELED",
                        value: "تم إلغاؤه"
                    },
                    {
                        name: "FAILURE",
                        value: "فشل"
                    }
                ]
            },
            CART: {
                AS: "CART",
                MONGO: "",
                CMS: "",
                SDM: [],
                FREQ: {
                    GET: 0,
                    GET_ONCE: 0,
                    GET_MAX: 0,
                    NEXT_PING: 0,
                }
            },
            PENDING: {
                AS: "",
                MONGO: "PENDING",
                CMS: "pending",
                SDM: [0, 1, 96], //@description : ((Suspended = 96)/(open = 1),
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
            CONFIRMED: {
                AS: "",
                MONGO: "CONFIRMED",
                CMS: "processing",
                SDM: [2], //@description : in kitchen
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
            BEING_PREPARED: {
                AS: "",
                MONGO: "BEING_PREPARED",
                CMS: "being_prepared",
                SDM: [2], //@description : in kitchen
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
            READY: {
                AS: "",
                MONGO: "READY",
                CMS: "ready",
                SDM: [8], //@description : ready
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
            ON_THE_WAY: {
                AS: "",
                MONGO: "ON_THE_WAY",
                CMS: "shipped",
                SDM: [16, 32], //@description : assigned/shipped
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
            DELIVERED: {
                AS: "",
                MONGO: "DELIVERED",
                CMS: "complete",
                SDM: [64, 128, 2048], //@description : [64 : delivered] , [128 : closed], [2048 : force closed(like pending orders will finally it reaches this state)]
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
            CLOSED: {
                AS: "",
                MONGO: "DELIVERED",
                CMS: "closed",
                SDM: [], //@description :
                FREQ: {
                    GET: 0,
                    GET_ONCE: 0,
                    GET_MAX: 0,
                    NEXT_PING: 0,
                }
            },
            CANCELED: {
                AS: "",
                MONGO: "CANCELED",
                CMS: "canceled",
                SDM: [512, 256, 1024, 4096, 8192], //@description : cancelled
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
            // 4096 : request for cancel ===> then it goes to 512 ===> final cancelled
            // 8192 : force cancelled (requested by the customer) ====> 512
            // 1024 : some issue in the pos
            FAILURE: {
                AS: "",
                MONGO: "FAILURE",
                CMS: "failed",
                SDM: [-2], //@description : for development purpose, not sdm actual value
                FREQ: {
                    GET: 5000,
                    GET_ONCE: 0,
                    GET_MAX: 65000,
                    NEXT_PING: 30,
                }
            },
        },

        PAYMENT: {
            INITIATED: 'INITIATED',
            AUTHORIZED: 'AUTHORIZED',
            CANCELLED: 'CANCELLED', // Order has been cancelled by the user.
            CAPTURED: 'CAPTURED',
            EXPIRED: 'EXPIRED',
            FAILED: 'FAILED',
            PARTIALLY_CAPTURED: 'PARTIALLY_CAPTURED',
            PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED',
            REFUNDED: 'REFUNDED',
            PAYMENT_INFO_ADDED: 'PAYMENT_INFO_ADDED',
            '3DS_ENROLL_CHECKED': '3DS_ENROLL_CHECKED',
            '3DS_RESULT_VERIFIED': '3DS_RESULT_VERIFIED',
            MARKED_FOR_REVIEW: 'MARKED_FOR_REVIEW',
            AUTHENTICATED: 'AUTHENTICATED',
            PARTIALLY_REVERSED: 'PARTIALLY_REVERSED',
            TOKENIZED: 'TOKENIZED',
            REVERSED: 'REVERSED', // Order has been fully reversed (total authorized amount).
            REJECTED: 'REJECTED',
            PENDING: 'PENDING'
        },

        /**
         * INITIATED - Order has been initiated with the amount, reference, billing, shipping and other basic details.
         * 
         * AUTHORIZED - Order has been authorized (amount on hold on the user card) successfully with the amount provided during the
         * initiate API. Merchant should always either call Capture Operation (for the amount to be settled to relevant
         * bank account) or Reverse Operation (release the hold on amount) so the user does not complain about the
         * amount which is on hold.
         * 
         * CANCELLED - Order has been cancelled by the user.
         * 
         * CAPTURED - Order has been captured successfully and merchant should see the funds in the relevant bank account as per
         * the settlement schedule (usually T+1 [transaction day +1]).
         * 
         * FAILED - Order has been failed due to some error (could be internal or external) and no further operations can be
         * performed.
         * 
         * PARTIALLY_CAPTURED - Order has been partially captured (partial amount of total authorized amount). Rest of the authorized amount
         * either could be auto reversed (if the configuration/external system does not support follow-on captures) or
         * available for the follow-on captures or reversal (if the configuration/external system does support).
         * 
         * PARTIALLY_REFUNDED - Order has been partially refunded (partial amount of total captured amount).
         * 
         * REFUNDED - Order has been fully refunded.
         * 
         * PAYMENT_INFO_ADDED - Order payment mechanism (CARD, PAYPAL, APPLE PAY) has been selected.
         * 
         * 3DS_ENROLL_CHECKED - User card has been checked for the 3D secure validation (card could be enrolled for 3D secure or could not be
         * enrolled).
         * 
         * 3DS_RESULT_VERIFIED - User has been successfully verified with the 3D secure.
         * 
         * MARKED_FOR_REVIEW - Order was marked for review due to fraud evaluation (applicable only if the fraud evaluation engine is enabled).
         * 
         * AUTHENTICATED - Order has been authenticated and is ready for the Authorize/Sale operation. This status is only applicable for the
         * wallet payment mechanism e.g. APPLE PAY, SUMSUNG PAY.
         * 
         * PARTIALLY_REVERSED - Order has been partially reversed (partial amount of total authorized amount).
         * 
         * TOKENIZED - Order has been tokenized successfully (only applicable to tokenization API).
         * 
         * EXPIRED - Order has been expired due to provided validity expiry (value can be passed during the INITIATE operation) or
         * no activity for long time (will only be applicable if no financial operation has been performed on the order e.g.
         * Authorize, Capture)
         * 
         * REVERSED - Order has been fully reversed (total authorized amount).
         * 
         * REJECTED - Order has been rejected during the fraud evaluation (only applicable if the fraud evaluation engine is enabled).
         * 
         * PENDING - Order is in pending status due to connectivity issue with external system or some internal issue and transaction
         * status cannot be determined immediately. In this case, noon payments support/technical team proactively
         * reacts to determine the exact transaction status (the time to resolve the pending status could be longer due to
         * external systems involved in the transaction flow). Merchants are requested to contact the noon payments
         * support/technical team if they found the order in pending status for long time.
         * NOTE:
         * Transaction may not be failed in the pending status so merchants should take the relevant action after the
         * pending status resolved.
         */

        TRANSACTION: {
            AUTHORIZATION: {
                AS: 'AUTHORIZATION',
                CMS: 'order'
            },
            VOID_AUTHORIZATION: {
                AS: 'VOID_AUTHORIZATION', // Reverse payment
                CMS: 'void'
            },
            CAPTURE: {
                AS: 'CAPTURE',
                CMS: 'capture'
            },
            REFUND: {
                AS: 'REFUND',
                CMS: "refund"
            },
            FAILED: {
                AS: 'FAILED',
                CMS: "void"
            }
        }
    },

    ACTION: {
        TRANSACTION: {
            INITIATE: 'INITIATE',
            AUTHORIZE: 'AUTHORIZE',
            CAPTURE: 'CAPTURE',
            SALE: 'SALE',
            REVERSE: 'REVERSE',
            REFUND: 'REFUND'
        },
        CART_AMOUNT: {
            ADD: "add",
            SUBTRACT: "subtract"
        }
    },

    FAQ: {
        Ar: [{
            "category": "FAQs",
            "questionair": [{
                "ques": "كيف سأعرف متى تم استلام طلبي من المطعم؟",
                "ans": "بمجرد تقديم طلبك، ستُظهر صفحة تأكيد طلب الشراء، الوقت الذي استلم فيه المطعم طلبك، إلى جانب الوقت المتوقع لتحضير أو تسليم طلبك. كما أنك ستستلم رسالة تأكيد طلب الشراء على عنوان البريد الإلكتروني الذي قمت بذكره عند التسجيل. وفي حال كنت غير متأكد من الطلب الذي قمت بتقديمه، بإمكانك دائماً الاتصال بالمطعم مباشرةً."
            },
            {
                "ques": "ما هي خيارات الدفع المتاحة عند طلب الشراء من خلال التطبيق؟",
                "ans": "يمكنك الدفع إلكترونياً باستخدام بطاقة الائتمانية أوالدفع نقداً عند استلام الطلب.A3:D4"
            },
            {
                "ques": "هل بإمكاني حفظ معلومات بطاقتي الائتمانية من أجل طلبات الشراء في المستقبل؟",
                "ans": "لا. للحفاظ على خصوصيتك، يتم التعامل مع جميع معلومات بطاقة الائتمان الخاصة بك من خلال بوابة البنك المضمونة و لا يتم حفظ أي معلومة على تطبيق دجاج كنتاكي."
            },
            {
                "ques": "أين بإمكاني تغيير معلومات حسابي؟",
                "ans": "حالما تقوم بتسجيل الدخول إلى التطبيق باستخدام رقم الجوال الخاص بك، اضغط على \"حسابي\" من القائمة العلوية، حيث بإمكانك تغيير معلومات حسابك من هناك."
            },
            {
                "ques": "هل رسوم التوصيل عند استخدام التطبيق أعلى من رسوم التوصيل المعتادة؟",
                "ans": "كلا، رسوم التوصيل موحدة بالنسبة للمطعم الذي يستلم الطلب ويوصله إليك، لا يوجد أي فرق بالرسوم."
            },
            {
                "ques": "كيف بإمكاني معرفة رسوم خدمة التوصيل التي سأدفعها؟",
                "ans": "رسوم التوصيل مدرجة بالتفصيل في قسم ملخص الطلب."
            },
            {
                "ques": "هل هناك حد أدنى لمبلغ طلب الشراء بالنسبة لمعظم طلبات التوصيل؟",
                "ans": "هناك حد أدنى لمبلغ طلبات الشراء عبر الإنترنت أو بواسطة الهاتف بالنسبة لطلبات التوصيل، وهو 24 درهم. بالإضافة الي رسم التوصيل"
            },
            {
                "ques": "كيف بإمكاني تقديم ملاحظاتي حول تجربتي في مطعم \"دجاج كنتاكي\"؟",
                "ans": "يسعى مطعم \"دجاج كنتاكي\" دائماً لضمان حصولك على تجربة تناول طعام رائعة ومتميزة في سلسلة فروعه وأثناء استخدامك لتطبيق الجوال. إذا كنت ترغب في إبداء أية ملاحظات حول تجربتك معنا، أدخل إلى القائمة الجانبية للتطبيق ، واضغط على \"الاتصال بالدعم\"."
            }
            ]
        }],
        En: [{
            "category": "FAQs",
            "questionair": [{
                "ques": "How will I know when the restaurant received my Order?",
                "ans": "Once you submit your order, the Order Confirmation page will show the time your order was received along with an estimated time that your order will be ready for carryout or delivery. You will also receive a confirmation email at the email address you provided at registration. And if you're still unsure about your order, you can always call the restaurant directly."
            },
            {
                "ques": "What payment options are available through Mobile Application Ordering?",
                "ans": "You can choose to pay online using your credit card or cash on delivery."
            },
            {
                "ques": "Can I save my credit card information for future purchases?",
                "ans": "No. For security purposes, all your credit card information are handled through a secured bank gateway and are never saved on the KFC application."
            },
            {
                "ques": "Where can I change my account info?",
                "ans": "Once you've signed in to the application with your phone number , Click on Your name from the top hamburger menu. You can change your account information there."
            },
            {
                "ques": "Are delivery charges higher for customers who order from KFC application?",
                "ans": "No. The transportation fee is always the same online as it is offline for the restaurant taking and delivering your order. There is no difference."
            },
            {
                "ques": "How can I tell how much I’m being charged for delivery service?",
                "ans": "The transtportation fee is listed at checkout in the itemized portion of the cart summary."
            },
            {
                "ques": "Is there a set minimum amount for most delivery orders?",
                "ans": "For delivery orders placed online or by phone there is a minimum order amount of Dhs. 24 “transportation fee applies”"
            },
            {
                "ques": "How can I give feedback to KFC about my restaurant experience?",
                "ans": "KFC wants to ensure that you have a terrific experience in our restaurants and in our mobile application. If you would like to provide feedback, From the Side menu, click on \"Call Support\""
            }
            ]
        }]
    }
};

export const NOTIFICATION_CODE = {
    SMS: {
        USER_OTP_VERIFICATION: 'USER_OTP_VERIFICATION',
        ORDER_DELIVERY_CONFIRM: 'ORDER_DELIVERY_CONFIRM',
        ORDER_PICKUP_CONFIRM: 'ORDER_PICKUP_CONFIRM',
        ORDER_CANCEL: 'ORDER_CANCEL',
        ORDER_FAIL: 'ORDER_FAIL'
    },
    EMAIL: {
        USER_WELCOME_EMAIL: 'USER_WELCOME_EMAIL',
        ORDER_DELIVERY_CONFIRM: 'ORDER_DELIVERY_CONFIRM_EMAIL',
        ORDER_PICKUP_CONFIRM: 'ORDER_PICKUP_CONFIRM_EMAIL',
        ORDER_CANCEL: 'ORDER_CANCEL_EMAIL',
        ORDER_FAIL: 'ORDER_FAIL_EMAIL',
        PAYMENT_FAIL: 'PAYMENT_FAIL_EMAIL'
    }
}

export const NOTIFICATION_MSG = {
    SMS: {
        En: {
            USER_OTP_VERIFICATION: (data) => `<#> ${data.otp} is an OTP to login to your KFC account. It is valid for the next 10 minutes. Please do not share this OTP with anyone. rMXm+gJ4X0P`,
            ORDER_DELIVERY_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `Thank you for choosing KFC! We will deliver your food hot and fresh at your doorstep. Your order is expected to arrive in the next 20 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount} AED.`
            },
            ORDER_PICKUP_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `Thank you for choosing KFC! Your order has been confirmed and will be ready in the next 30 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount} AED.`
            },
            ORDER_CANCEL: (data) => `Your order no. ${data.sdmOrderRef} was cancelled. We regret the inconvenience caused.  Any payments if deducted will get refunded within 4-7 business days.`,
            ORDER_FAIL: (data) => `Your order failed due to unavoidable reasons. Please try after some time.`,
        },
        Ar: {
            USER_OTP_VERIFICATION: (data) => `<#> ${data.otp} هوOTP . لتسجيل الدخول إلى حساب KFC الخاص بك. انها صالحة لمدة 10 دقائق القادمة. يرجى عدم مشاركة مع أي شخص. rMXm+gJ4X0P`,
            ORDER_DELIVERY_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `شكرًا لاختيارك دجاج كنتاكي. سنقوم بإيصال طلبك إلى منزلك ساخن وطازج. من المتوقع أن يصلك الطلب خلال 20 >قيقة. رقم الطلب: ${data.sdmOrderRef} المبلغ ${data.amount} درهم.`
            },
            ORDER_PICKUP_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `شكرًا لاختيارك دجاج كنتاكي. تم تأكيد طلبك وسيكون جاهز للاستلام خلال 30  دقيقة. رقم الطلب ${data.sdmOrderRef}. المبلغ: ${data.amount} درهم.`;
            },
            ORDER_CANCEL: (data) => `تم إلغاء الطلب رقم ${data.sdmOrderRef}. إي أموال تم سحبها سيتم إرجاعها خلال 4 إلى 7 أيام عمل.`,
            ORDER_FAIL: (data) => `عذرًا لم نتمكن من إكمال الطلب. يرجى المحاولة مجددًا بعد قليل`
        }

    },
    EMAIL: {
        En: {
            USER_WELCOME_EMAIL: 'Welcome to KFC',
            ORDER_DELIVERY_CONFIRM: 'Order Confirmed - Delivery',
            ORDER_PICKUP_CONFIRM: 'Order Confirmed - Pickup',
            ORDER_CANCEL: 'Order Cancelled',
            ORDER_FAIL: 'Order Failed',
        },
        Ar: {
            USER_WELCOME_EMAIL: 'Welcome to KFC',
            ORDER_DELIVERY_CONFIRM: 'Order Confirmed - Delivery',
            ORDER_PICKUP_CONFIRM: 'Order Confirmed - Pickup',
            ORDER_CANCEL: 'Order Cancelled',
            ORDER_FAIL: 'Order Failed',
        }
    }
}

export const EMAIL_META = {
    baseImageUrl: 'http://40.123.205.1/pub/media/catalog/product/emailer',
    ctaLink: '',
    contactEmail: 'hello@kfc.uae'
}

export const STATUS_MSG = {
    "ERROR": {
        "E400": {
            "INVALID_PHONE_NO": {
                "statusCode": 400,
                "httpCode": 400,
                "message": "Please enter a valid phone number",
                "type": "INVALID_PHONE_NO",
                "message_Ar": "يرجى إدخال رقم جوال صالح",
                "message_En": "Please enter a valid phone number"
            },
            "USER_NOT_CREATED_ON_SDM": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "USER_NOT_CREATED_ON_SDM",
                "message": "We have encountered some issue. Please try after sometime",
                "message_Ar": "لقد واجهتنا مشكلة، يرجى المحاولة بعد قليل",
                "message_En": "We have encountered some issue. Please try after sometime"
            },
            "USER_NOT_CREATED_ON_CMS": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "USER_NOT_CREATED_ON_CMS",
                "message": "We have encountered some issue. Please try after sometime",
                "message_Ar": "لقد واجهتنا مشكلة، يرجى المحاولة بعد قليل",
                "message_En": "We have encountered some issue. Please try after sometime"
            },
            "MIN_CART_VALUE_VOILATION": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "MIN_CART_VALUE_VOILATION",
                "message": "The minimum amount for an order is 23 Dhs. Please add more items to place the order",
                "message_Ar": "الحد الأدنى للطلب يجب أن يكون 23 درهم",
                "message_En": "The minimum amount for an order is 23 Dhs. Please add more items to place the order"
            },
            "MAX_COD_CART_VALUE_VOILATION": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "MAX_COD_CART_VALUE_VOILATION",
                "message": "Maximum COD allowed is 300 AED",
                "message_Ar": "الحد الأقصى المتاح 300 درهم",
                "message_En": "Maximum COD allowed is 300 AED"
            },
            "INVALID_PROMO": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_PROMO",
                "message": "The promo code that you have entered is invalid",
                "message_Ar": "الكوبون الذي أدخلته غير صحيح",
                "message_En": "The promo code that you have entered is invalid"
            },
            "PROMO_EXPIRED": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "PROMO_EXPIRED",
                "message": "This promo does not exists any longer",
                "message_Ar": "الكوبون الذي أدخلته لم يعد صالحًا",
                "message_En": "This promo does not exists any longer"
            },
            "INVALID_ADDRESS": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_ADDRESS",
                "message": "This address does not exists",
                "message_Ar": "هذا العنوان غير موجود",
                "message_En": "This address does not exists"
            },
            "PROFILE_SETUP_ALREADY_COMPLETE": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "PROFILE_SETUP_ALREADY_COMPLETE",
                "message": "Your profile is 100% complete",
                "message_Ar": "حسابك مكتمل بنسبة %100",
                "message_En": "Your profile is 100% complete"
            },
            "OTP_SESSION_EXPIRED": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "OTP_SESSION_EXPIRED",
                "message": "This OTP session has expired",
                "message_Ar": "لقد انتهت فترة صلاحية هذا الرمز",
                "message_En": "This OTP session has expired"
            },
            "OTP_EXPIRED": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "OTP_EXPIRED",
                "message": "This OTP does not exist any longer",
                "message_Ar": "هذا الرمز لم يعد موجودًا",
                "message_En": "This OTP does not exist any longer"
            },
            "INVALID_OTP": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_OTP",
                "message": "You have entered an incorrect OTP. Please try again",
                "message_Ar": "لقد أدخلت رمزًا خاطئًا، يرجى المحاولة مرة أخرى",
                "message_En": "You have entered an incorrect OTP. Please try again"
            },
            "INVALID_ID": {
                "statusCode": 400,
                "httpCode": 400,
                "message": "The information that you have provided seems incorrect",
                "type": "INVALID_ID",
                "message_Ar": "يبدو أن المعلومات التي أدخلتها غير صحيحة ",
                "message_En": "The information that you have provided seems incorrect"
            },
            "APP_ERROR": {
                "statusCode": 400,
                "httpCode": 400,
                "message": "Application Error",
                "type": "APP_ERROR",
                "message_Ar": "خطأ في التطبيق",
                "message_En": "Application Error"
            },
            "DEFAULT": {
                "statusCode": 400,
                "httpCode": 400,
                "message": "Bad Request",
                "type": "DEFAULT",
                "message_Ar": "طلب خاطئ",
                "message_En": "Bad Request"
            }
        },
        "E401": {
            "UNAUTHORIZED": {
                "statusCode": 401,
                "httpCode": 401,
                "message": "You are not authorized to perform this action",
                "type": "UNAUTHORIZED",
                "message_Ar": "ليست لديك صلاحية لتقوم بهذا الطلب",
                "message_En": "You are not authorized to perform this action"
            },
            "ACCESS_TOKEN_EXPIRED": {
                "statusCode": 401,
                "httpCode": 401,
                "type": "ACCESS_TOKEN_EXPIRED",
                "message": "Access token has expired.",
                "message_Ar": "انتهت صلاحية رمز الوصول",
                "message_En": "Access token has expired."
            }
        },
        "E404": {
            "RESOURCE_NOT_FOUND": {
                "statusCode": 404,
                "httpCode": 404,
                "type": "RESOURCE_NOT_FOUND",
                "message": "Resource not found",
                "message_Ar": "المصدر غير موجود",
                "message_En": "Resource not found"
            }
        },
        "E409": {
            "ORDER_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "Order not found, please enter the correct phone number and order ID",
                "type": "ORDER_NOT_FOUND",
                "message_Ar": "الطلب غير موجود، يرجى إدخال رقم هاتف صحيح وإعادة الطلب",
                "message_En": "Order not found, please enter the correct phone number and order ID"
            },
            "CONFIG_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "Config not found",
                "type": "CONFIG_NOT_FOUND",
                "message_Ar": "التكوين غير موجود",
                "message_En": "Config not found"
            },
            "USER_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "This user does not exist ",
                "type": "USER_NOT_FOUND",
                "message_Ar": "هذا المستخدم غير موجود",
                "message_En": "This user does not exist "
            },
            "MENU_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "Seems like this menu is not applicable in this country, we are trying to refresh the menu",
                "type": "MENU_NOT_FOUND",
                "message_Ar": "يبدو أن هذه القائمة غير قابلة للاستخدام في هذا البلد، نقوم حاليًا بمحاولة تحديث القائمة",
                "message_En": "Seems like this menu is not applicable in this country, we are trying to refresh the menu"
            },
            "HOME_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "We are trying to refresh the home screen",
                "type": "HOME_NOT_FOUND",
                "message_Ar": "نحاول حاليًا تحديث الصفحة الرئيسية",
                "message_En": "We are trying to refresh the home screen"
            },
            "SERVICE_UNAVAILABLE": {
                "statusCode": 409,
                "httpCode": 409,
                "type": "SERVICE_UNAVAILABLE",
                "message": "Sorry, we don't, deliver at this location",
                "message_Ar": "عذرًا، لا نقوم بالتوصيل في هذه المنطقة",
                "message_En": "Sorry, we do not, deliver at this location"
            },
            "ADDRESS_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "type": "ADDRESS_NOT_FOUND",
                "message": "This address does not exist",
                "message_Ar": "هذا العنوان غير موجود",
                "message_En": "This address does not exist"
            },
            "CART_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "type": "CART_NOT_FOUND",
                "message": "This cart no longer exists",
                "message_Ar": "العربة لم تعد موجودة",
                "message_En": "This cart no longer exists"
            },
            "PROMO_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "This promo does not exists any longer",
                "type": "PROMO_NOT_FOUND",
                "message_Ar": "هذا العرض لم يعد متاحًا",
                "message_En": "This promo does not exists any longer"
            },
            "DATA_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "Data not found",
                "type": "DATA_NOT_FOUND",
                "message_Ar": "تعذر العثور على المعلومات",
                "message_En": "Data not found"
            }
        },
        "E410": {
            "FORCE_UPDATE": {
                "statusCode": 410,
                "httpCode": 410,
                "message": "You need to update the application with the latest version in order to continue using it",
                "type": "FORCE_UPDATE",
                "message_Ar": "يجب عليك تحديث التطبيق لآخر نسخة لكي تتمكن من الاستمرار في استخدامه",
                "message_En": "You need to update the application with the latest version in order to continue using it"
            }
        },
        "E411": {
            "STORE_NOT_WORKING": {
                "statusCode": 411,
                "httpCode": 411,
                "message": "The store is currently offline, please feel free to explore menu.",
                "type": "STORE_NOT_WORKING",
                "message_Ar": "هذا المطعم غير متاح الآن",
                "message_En": "The store is currently offline, please feel free to explore menu."
            },
        },
        "E422": {
            "INVALID_COUNTRY_CODE": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "This number does not exist in this country",
                "type": "INVALID_COUNTRY_CODE",
                "message_Ar": "هذا الرقم لا ينتمي لهذه الدولة",
                "message_En": "This number does not exist in this country"
            },
            "INVALID_PHONE_NO": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Please enter a valid phone number",
                "type": "INVALID_PHONE_NO",
                "message_Ar": "يرجى إدخال رقم جوال صالح",
                "message_En": "Please enter a valid phone number"
            },
            "INVALID_EMAIL": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Please enter a valid email address",
                "type": "INVALID_EMAIL",
                "message_Ar": "يرجى إدخال بريد إلكتروني صالح",
                "message_En": "Please enter a valid email address"
            },
            "INVALID_NAME": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Please enter a valid name",
                "type": "INVALID_NAME",
                "message_Ar": "يرجى إدخال اسم صالح",
                "message_En": "Please enter a valid name"
            },
            "INVALID_LOCATION": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "This location does not exist",
                "type": "INVALID_LOCATION",
                "message_Ar": "هذا المكان غير موجود",
                "message_En": "This location does not exist"
            },
            "INVALID_ADDRESS": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_ADDRESS",
                "message": "This address does not exists",
                "message_Ar": "هذا العنوان غير موجود",
                "message_En": "This address does not exists"
            },
            "INVALID_OTP": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "You have entered an incorrect OTP. Please try again",
                "type": "INVALID_OTP",
                "message_Ar": "لقد أدخلت رمزًا خاطئًا، يرجى المحاولة مرة أخرى",
                "message_En": "You have entered an incorrect OTP. Please try again"
            },
            "INVALID_SOCIAL_INFO": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid social info",
                "type": "INVALID_SOCIAL_INFO",
                "message_Ar": "معلومات وسيلة التواصل غير صحيحة",
                "message_En": "Invalid social info"
            },
            "INVALID_CART": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid cart",
                "type": "INVALID_CART",
                "message_Ar": "العربة غير صالحة",
                "message_En": "Invalid cart"
            },
            "INVALID_COUPON": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid coupon",
                "type": "INVALID_COUPON",
                "message_Ar": "الكوبون غير صالح",
                "message_En": "Invalid coupon"
            },
            "INVALID_PRODUCTS": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid products",
                "type": "INVALID_PRODUCTS",
                "message_Ar": "المنتجات غير صالحة",
                "message_En": "Invalid products"
            },
            "INVALID_ORDER": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid order",
                "type": "INVALID_ORDER",
                "message_Ar": "الطلب غير صالح",
                "message_En": "Invalid order"
            },
            "INVALID_USERNAME": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid user name",
                "type": "INVALID_USERNAME",
                "message_Ar": "اسم المستخدم غير صحيح",
                "message_En": "Invalid user name"
            },
            "INVALID_PASSWORD": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid password",
                "type": "INVALID_PASSWORD",
                "message_Ar": "كلمة المرور غير صحيحة",
                "message_En": "Invalid password"
            },
            "INVALID_LANGUAGE": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid language",
                "type": "INVALID_LANGUAGE",
                "message_Ar": "اللغة غير صحيحة",
                "message_En": "Invalid language"
            },
            "INVALID_BRAND": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid brand",
                "type": "INVALID_BRAND",
                "message_Ar": "العلامة التجارية غير صالحة",
                "message_En": "Invalid brand"
            },
            "INVALID_COUNTRY": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid country",
                "type": "INVALID_COUNTRY",
                "message_Ar": "البلد غير صحيح",
                "message_En": "Invalid country"
            },
            "DEFAULT_VALIDATION_ERROR": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Invalid info provided",
                "type": "DEFAULT_VALIDATION_ERROR",
                "message_Ar": "المعلومات التي تم ادخالها غير صحيحة",
                "message_En": "Invalid info provided"
            },
            "VALIDATION_ERROR": {
                "statusCode": 422,
                "httpCode": 422,
                "message": "Validation Error :",
                "type": "VALIDATION_ERROR",
                "message_Ar": "خطأ في التحقق",
                "message_En": "Validation Error :"
            }
        },
        "E500": {
            "DB_ERROR": {
                "statusCode": 500,
                "httpCode": 500,
                "message": "DB Error : ",
                "type": "DB_ERROR",
                "message_Ar": "خطأ في قاعدة البيانات",
                "message_En": "DB Error : "
            },
            "IMP_ERROR": {
                "statusCode": 500,
                "httpCode": 500,
                "message": "Implementation Error",
                "type": "IMP_ERROR",
                "message_Ar": "خطأ في التنفيذ",
                "message_En": "Implementation Error"
            },
            "INVALID_TOKEN_TYPE": {
                "statusCode": 500,
                "httpCode": 500,
                "message": "Invalid token type provided",
                "type": "INVALID_TOKEN_TYPE",
                "message_Ar": "نوع الرمز الذي تم إدخاله غير صحيح",
                "message_En": "Invalid token type provided"
            },
            "CREATE_ORDER_ERROR": {
                "statusCode": 500,
                "httpCode": 500,
                "type": "CREATE_ORDER_ERROR",
                "message": "We have encountered an error while creating an order",
                "message_Ar": "لقد واجهتنا مشكلة في إنشاء الطلب",
                "message_En": "We have encountered an error while creating an order"
            }
        },
        "E501": {
            "TOKENIZATION_ERROR": {
                "statusCode": 501,
                "httpCode": 501,
                "message": "Failure in creating token",
                "type": "TOKENIZATION_ERROR",
                "message_Ar": "فشل في إنشاء الرمز",
                "message_En": "Failure in creating token"
            }
        }
    },
    "SUCCESS": {
        "S200": {
            "OTP_SENT": {
                "statusCode": 200,
                "httpCode": 200,
                "type": "OTP_SENT",
                "message": "Otp sent successfully",
                "message_Ar": "تم إرسال رمز التحقق بنجاح",
                "message_En": "Otp sent successfully"
            },
            "OTP_VERIFIED": {
                "statusCode": 200,
                "httpCode": 200,
                "type": "OTP_VERIFIED",
                "message": "Otp verified",
                "message_Ar": "تم بنجاح",
                "message_En": "Otp verified"
            },
            "RESET_SUCCESS": {
                "statusCode": 200,
                "httpCode": 200,
                "type": "RESET_SUCCESS",
                "message": "Password has been reset successfully",
                "message_Ar": "تم إعادة تعيين كلمة المرور بنجاح",
                "message_En": "Password has been reset successfully"
            },
            "PHONE_VERIFIED": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Phone number verification success",
                "type": "PHONE_VERIFIED",
                "message_Ar": "تم التحقق من رقم الجوال بنجاح",
                "message_En": "Phone number verification success"
            },
            "FORGET_PASSWORD": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "You password has been reset",
                "type": "FORGET_PASSWORD",
                "message_Ar": "تم إعادة تعيين كلمة المرور",
                "message_En": "You password has been reset"
            },
            "UPLOAD": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "This files has been uploaded successfully",
                "type": "UPLOAD",
                "message_Ar": "تم رفع هذا الملف بنجاح",
                "message_En": "This files has been uploaded successfully"
            },
            "UPDATED": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Updated Successfully",
                "type": "UPDATED",
                "message_Ar": "تم التعديل بنجاح",
                "message_En": "Updated Successfully"
            },
            "DELETED": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Deleted Successfully",
                "type": "DELETED",
                "message_Ar": "تم الحذف بنجاح",
                "message_En": "Deleted Successfully"
            },
            "BLOCKED": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Blocked Successfully",
                "type": "BLOCKED",
                "message_Ar": "تم المنع بنجاح",
                "message_En": "Blocked Successfully"
            },
            "SOCIAL_LOGIN": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Logged In Successfully",
                "type": "SOCIAL_LOGIN",
                "message_Ar": "تم تسجيل الدخول بنجاح",
                "message_En": "Logged In Successfully"
            },
            "LOGIN": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Logged In Successfully",
                "type": "LOGIN",
                "message_Ar": "تم تسجيل الدخول بنجاح",
                "message_En": "Logged In Successfully"
            },
            "LOGOUT": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Logged Out Successfully",
                "type": "LOGOUT",
                "message_Ar": "تم تسجيل الخروج بنجاح",
                "message_En": "Logged Out Successfully"
            },
            "DEFAULT": {
                "statusCode": 200,
                "httpCode": 200,
                "message_Ar": "بنجاح",
                "message_En": "Success",
                "message": "Success",
                "type": "DEFAULT"
            },
            "ACCOUNT_DELETED": {
                "statusCode": 200,
                "httpCode": 200,
                "message": "Account has been deleted",
                "type": "ACCOUNT_DELETED",
                "message_Ar": "تم حذف الحساب بنجاح",
                "message_En": "Account has been deleted"
            }
        },
        "S201": {
            "CREATED": {
                "statusCode": 201,
                "httpCode": 201,
                "message": "Created Successfully",
                "type": "CREATED",
                "message_Ar": "تم الإنشاء بنجاح",
                "message_En": "Created Successfully"
            }
        },
        "S205": {
            "MENU_CHANGED": {
                "statusCode": 205,
                "httpCode": 205,
                "message": "Menu has been changed. Please refresh your menu.",
                "type": "MENU_CHANGED",
                "message_Ar": "تم حدوث تغير في القائمة، يرجى تحديث القائمة",
                "message_En": "Menu has been changed. Please refresh your menu."
            },
            "DATA_CHANGED": {
                "statusCode": 205,
                "httpCode": 205,
                "message": "There is some update with the date. We are trying to refresh it",
                "type": "DATA_CHANGED",
                "message_Ar": "لقد حدثت بعض التعديلات في المعلومات، نحاول حاليًا تحديثها",
                "message_En": "There is some update with the date. We are trying to refresh it"
            }
        },
        "S215": {
            "USER_PHONE_ALREADY_EXIST": {
                "statusCode": 215,
                "httpCode": 200,
                "type": "USER_PHONE_ALREADY_EXIST",
                "message": "This phone number is already is use",
                "message_Ar": "رقم الهاتف الذي أدخلته مستخدم من قبل",
                "message_En": "This phone number is already is use"
            },
        },
        "S216": {
            "USER_EMAIL_ALREADY_EXIST": {
                "statusCode": 216,
                "httpCode": 200,
                "type": "USER_EMAIL_ALREADY_EXIST",
                "message": "This email is already registered. Please use another email Id or login through the registered phone no./email Id",
                "message_Ar": "رقم الهاتف الذي أدخلته مستخدم من قبل",
                "message_En": "This email is already registered. Please use another email Id or login through the registered phone no./email Id"
            }
        }
    },
    GRPC_ERROR: {
        TYPE: {
            OK: '0',
            CANCELLED: '1',
            UNKNOWN: '2',
            INVALID_ARGUMENT: '3',
            DEADLINE_EXCEEDED: '4',
            NOT_FOUND: '5',
            ALREADY_EXISTS: '6',
            PERMISSION_DENIED: '7',
            UNAUTHENTICATED: '16',
            RESOURCE_EXHAUSTED: '8',
            FAILED_PRECONDITION: '9',
            ABORTED: '10',
            OUT_OF_RANGE: '11',
            UNIMPLEMENTED: '12',
            INTERNAL: '13',
            UNAVAILABLE: '14',
            DATA_LOSS: '15',
            /**
             * @description : only for payment, not actual grpc error code
             */
            PAYMENT_AUTHORIZATION: '13',
            PAYMENT_ERROR: '13'
        },
        ERROR: (code, type, message) => {
            return {
                code: parseInt(code),
                details: message
            }
        }
    },
    FRONTEND_ERROR: {
        En: {
            VALIDATION: {
                INVALID_COUNTRY_CODE: "Your number belongs to another country",
                INVALID_PHONE_NO: "Please enter a valid phone number",
                INVALID_EMAIL: "Please enter a valid email address",
                INVALID_OTP: "You have entered an incorrect OTP. Please try again",
                INAVLID_NAME: "Please enter a valid name",
                EMPTY_PHONE_NO: "Please enter a valid phone number",
                EMPTY_EMAIL: "Please enter a valid email address",
                EMPTY_OTP: "Please enter OTP",
                EMPTY_NAME: "Please enter a valid name",
            }
        },
        Ar: {
            VALIDATION: {
                INVALID_COUNTRY_CODE: "رقم الهاتف الذي أدخلته ينتمي لبلد آخر",
                INVALID_PHONE_NO: "يرجى إدخال رقم جوال صالح",
                INVALID_EMAIL: "يرجى إدخال بريد إلكتروني صالح",
                INVALID_OTP: "لقد أدخلت رمزًا خاطئًا، يرجى المحاولة مرة أخرى",
                INAVLID_NAME: "يرجى إدخال اسم صالح",
                EMPTY_PHONE_NO: "يرجى إدخال رقم جوال صالح",
                EMPTY_EMAIL: "يرجى إدخال بريد إلكتروني صالح",
                EMPTY_OTP: "يرجى أدخل رمز التأكيد",
                EMPTY_NAME: "يرجى إدخال اسم صالح",
            }
        }
    },
    AEROSPIKE_ERROR: {
        TYPE: {
            DUPLICATE_INDEX: 200,
            DATA_NOT_FOUND: 2,
        }
    },
    NOONPAY_ERROR: {
        default: {
            statusCode: 6000,
            httpCode: 400,
            message: 'Unknown error', // associate noonpay returned message
            type: 'UNHANDLED_ERROR',
            actionHint: ''
        },
        1500: {
            statusCode: 1500,
            httpCode: 401,
            message: 'Payment authorization error',
            type: 'CONFIGURATION_ERROR',
            actionHint: DATABASE.TYPE.PAYMENT_ACTION_HINTS.SYNC_CONFIGURATION
        },
        19001: {
            statusCode: 6001,
            httpCode: 409,
            message: 'No payment transaction found for the provided order id',
            type: 'INVALID_ORDER_ID',
            actionHint: ''
        },
        19004: {
            statusCode: 6004,
            httpCode: 400,
            message: 'Invalid data provided',
            type: 'INVALID_DATA_PROVIDED',
            actionHint: '',
            useNoonPayMessage: true
        },
        19019: {
            statusCode: 6019,
            httpCode: 422,
            message: 'The requested operation can not be processed.',
            type: 'OPERATION_ERROR',
            actionHint: DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID,
            useNoonPayMessage: true
        },
        19066: {
            statusCode: 6066,
            httpCode: 422,
            message: 'Insufficient funds for the requested operation.',
            type: 'OPERATION_ERROR',
            actionHint: DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID
        },
        19077: {
            statusCode: 6077,
            httpCode: 400,
            message: 'Invalid Capture transaction id',
            type: 'INVALID_CAPTURE_TRANSACTION_ID',
            actionHint: ''
        },
        19085: {
            statusCode: 6085,
            httpCode: 400,
            message: 'Multiple payments were initiated for the given order, use noonpay order id to get the status',
            type: 'MULTIPLE_PAYMENTS_INITIATED',
            actionHint: DATABASE.TYPE.PAYMENT_ACTION_HINTS.STATUS_USING_NOONPAY_ID
        }
    },
    SDM_ORDER_VALIDATION: {
        ORDER_AMOUNT_MISMATCH: "Order amount mismatch",
        EXCEED_ORDER_AMOUNT: "EXCEED_ORDER_AMOUNT",
        MAX_PENDING_TIME_REACHED: "Maximum pending time reached",
        PAYMENT_FAILURE: "Payment failure",
        PAYMENT_ADD_ON_SDM_FAILURE: "Failure in adding payment on sdm"
    }
};


interface IGeneral {
    cms_page_data: [{
        title: string,
        identifier: string,
    }],
    ttl_for_cart: number,
    initial_user_ttl: number,
    initial_guest_ttl: number,
    bypass_otp: number,
    otp_expire: number,
    access_token_expire_time: number,
    refresh_token_expire_time: number,
    cms_auth_exp: number,
    reg_ex_for_validation: string,
    country_codes: string,
    support: string,
    customer_care_email: string,
    user_change_ttl: number,
    max_pending_state: number,
    minimum_cart_price: number,
    payment_api_timeout: number,
    payment_api_key_prefix: string,
    display_color: boolean,
    deeplink_fallback: string,
    auth_mech: string,
    addr_show_time: number,
}
export const generalConfigSync = function (config: IGeneral, date: number) {
    SERVER.DEFAULT_CART_TTL = config.ttl_for_cart;
    SERVER.BY_PASS_OTP = config.bypass_otp;
    SERVER.OTP_EXPIRE_TIME = config.otp_expire;
    SERVER.ACCESS_TOKEN_EXPIRE_TIME = config.access_token_expire_time;
    SERVER.REFRESH_TOKEN_EXPIRE_TIME = config.refresh_token_expire_time;
    SERVER.PAYMENT_API_KEY_PREFIX = config.payment_api_key_prefix;
    SERVER.CUSTOMER_CARE = config.support;
    SERVER.SUPPORT_EMAIL = config.customer_care_email;
    SERVER.USERCHANGE_TTL = config.user_change_ttl;
    SERVER.MAX_PENDING_STATE_TIME = config.max_pending_state;
    SERVER.MIN_CART_VALUE = config.minimum_cart_price;
    SERVER.PAYMENT_API_TIMEOUT = config.payment_api_timeout;
    SERVER.PAYMENT_API_KEY_PREFIX = config.payment_api_key_prefix;
    SERVER.DEEPLINK_FALLBACK = config.deeplink_fallback;
    SERVER.ADDR_SHOW_TIME = config.addr_show_time;
    SERVER.AUTH_MECH = config.auth_mech;
    SERVER.DISPLAY_COLOR = config.display_color;
    // reg_ex_for_validation: config.reg_ex_for_validation ? config.reg_ex_for_validation : String.raw`^[1-9]\\d{8}$|^[1-9]\\d{8}$`


    global.configSync.general = date;
    console.log("--------------------MIN_CART_VALUE--------------------", SERVER)
    return {}
}

interface IKafka {
    sdm: {
        user_config: {
            max_try: IMaxRetry
        },
        address_config: {
            max_try: IMaxRetry
        },
        menu_config: {
            max_try: IMaxRetry
        },
        promotion_config: {
            max_try: IMaxRetry
        },
        hidden_config: {
            max_try: IMaxRetry
        },
        order_config: {
            max_try: IMaxRetry
        }
    },
    cms: {
        user_config: {
            max_try: IMaxRetry
        },
        address_config: {
            max_try: IMaxRetry
        },
        menu_config: {
            max_try: IMaxRetry
        },
        promotion_config: {
            max_try: IMaxRetry
        },
        hidden_config: {
            max_try: IMaxRetry
        },
        order_config: {
            max_try: IMaxRetry
        }
    },
    as: {
        user_config: {
            max_try: IMaxRetry
        },
        address_config: {
            max_try: IMaxRetry
        },
        menu_config: {
            max_try: IMaxRetry
        },
        promotion_config: {
            max_try: IMaxRetry
        },
        hidden_config: {
            max_try: IMaxRetry
        },
        configuration_config: {
            max_try: IMaxRetry
        },
        app_config: {
            max_try: IMaxRetry
        }
    }
}

interface IMaxRetry {
    create: number,
    update: number,
    get: number,
    sync: number,
    reset: number
}

export const kafkaConfigSync = function (config: IKafka, date: number) {
    if (config.as) {
        if (config.as.user_config) {
            if (config.as.user_config.max_try) {
                if (config.as.user_config.max_try.create)
                    DATABASE.KAFKA.AS.USER.MAX_RETRY.CREATE = config.as.user_config.max_try.create
                if (config.as.user_config.max_try.update)
                    DATABASE.KAFKA.AS.USER.MAX_RETRY.UPDATE = config.as.user_config.max_try.update
                if (config.as.user_config.max_try.get)
                    DATABASE.KAFKA.AS.USER.MAX_RETRY.GET = config.as.user_config.max_try.get
                if (config.as.user_config.max_try.sync)
                    DATABASE.KAFKA.AS.USER.MAX_RETRY.SYNC = config.as.user_config.max_try.sync
                if (config.as.user_config.max_try.reset)
                    DATABASE.KAFKA.AS.USER.MAX_RETRY.RESET = config.as.user_config.max_try.reset
            }
        }
        if (config.as.address_config) {
            if (config.as.address_config.max_try) {
                if (config.as.address_config.max_try.create)
                    DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.CREATE = config.as.address_config.max_try.create
                if (config.as.address_config.max_try.update)
                    DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.UPDATE = config.as.address_config.max_try.update
                if (config.as.address_config.max_try.get)
                    DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.GET = config.as.address_config.max_try.get
                if (config.as.address_config.max_try.sync)
                    DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.SYNC = config.as.address_config.max_try.sync
                if (config.as.address_config.max_try.reset)
                    DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.RESET = config.as.address_config.max_try.reset
            }
        }
        if (config.as.menu_config) {
            if (config.as.menu_config.max_try) {
                if (config.as.menu_config.max_try.create)
                    DATABASE.KAFKA.AS.MENU.MAX_RETRY.CREATE = config.as.menu_config.max_try.create
                if (config.as.menu_config.max_try.update)
                    DATABASE.KAFKA.AS.MENU.MAX_RETRY.UPDATE = config.as.menu_config.max_try.update
                if (config.as.menu_config.max_try.get)
                    DATABASE.KAFKA.AS.MENU.MAX_RETRY.GET = config.as.menu_config.max_try.get
                if (config.as.menu_config.max_try.sync)
                    DATABASE.KAFKA.AS.MENU.MAX_RETRY.SYNC = config.as.menu_config.max_try.sync
                if (config.as.menu_config.max_try.reset)
                    DATABASE.KAFKA.AS.MENU.MAX_RETRY.RESET = config.as.menu_config.max_try.reset
            }
        }
        if (config.as.promotion_config) {
            if (config.as.promotion_config.max_try) {
                if (config.as.promotion_config.max_try.create)
                    DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.CREATE = config.as.promotion_config.max_try.create
                if (config.as.promotion_config.max_try.update)
                    DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.UPDATE = config.as.promotion_config.max_try.update
                if (config.as.promotion_config.max_try.get)
                    DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.GET = config.as.promotion_config.max_try.get
                if (config.as.promotion_config.max_try.sync)
                    DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.SYNC = config.as.promotion_config.max_try.sync
                if (config.as.promotion_config.max_try.reset)
                    DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.RESET = config.as.promotion_config.max_try.reset
            }
        }
        if (config.as.hidden_config) {
            if (config.as.hidden_config.max_try) {
                if (config.as.hidden_config.max_try.create)
                    DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.CREATE = config.as.hidden_config.max_try.create
                if (config.as.hidden_config.max_try.update)
                    DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.UPDATE = config.as.hidden_config.max_try.update
                if (config.as.hidden_config.max_try.get)
                    DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.GET = config.as.hidden_config.max_try.get
                if (config.as.hidden_config.max_try.sync)
                    DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.SYNC = config.as.hidden_config.max_try.sync
                if (config.as.hidden_config.max_try.reset)
                    DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.RESET = config.as.hidden_config.max_try.reset
            }
        }
        if (config.as.configuration_config) {
            if (config.as.configuration_config.max_try) {
                if (config.as.configuration_config.max_try.create)
                    DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.CREATE = config.as.configuration_config.max_try.create
                if (config.as.configuration_config.max_try.update)
                    DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.UPDATE = config.as.configuration_config.max_try.update
                if (config.as.configuration_config.max_try.get)
                    DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.GET = config.as.configuration_config.max_try.get
                if (config.as.configuration_config.max_try.sync)
                    DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.SYNC = config.as.configuration_config.max_try.sync
                if (config.as.configuration_config.max_try.reset)
                    DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.RESET = config.as.configuration_config.max_try.reset
            }
        }
        if (config.as.app_config) {
            if (config.as.app_config.max_try) {
                if (config.as.app_config.max_try.create)
                    DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.CREATE = config.as.app_config.max_try.create
                if (config.as.app_config.max_try.update)
                    DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.UPDATE = config.as.app_config.max_try.update
                if (config.as.app_config.max_try.get)
                    DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.GET = config.as.app_config.max_try.get
                if (config.as.app_config.max_try.sync)
                    DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.SYNC = config.as.app_config.max_try.sync
                if (config.as.app_config.max_try.reset)
                    DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.RESET = config.as.app_config.max_try.reset
            }
        }
    }
    if (config.cms) {
        if (config.cms.user_config) {
            if (config.cms.user_config.max_try) {
                if (config.cms.user_config.max_try.create)
                    DATABASE.KAFKA.CMS.USER.MAX_RETRY.CREATE = config.cms.user_config.max_try.create
                if (config.cms.user_config.max_try.update)
                    DATABASE.KAFKA.CMS.USER.MAX_RETRY.UPDATE = config.cms.user_config.max_try.update
                if (config.cms.user_config.max_try.get)
                    DATABASE.KAFKA.CMS.USER.MAX_RETRY.GET = config.cms.user_config.max_try.get
                if (config.cms.user_config.max_try.sync)
                    DATABASE.KAFKA.CMS.USER.MAX_RETRY.SYNC = config.cms.user_config.max_try.sync
                if (config.cms.user_config.max_try.reset)
                    DATABASE.KAFKA.CMS.USER.MAX_RETRY.RESET = config.cms.user_config.max_try.reset
            }
        }
        if (config.cms.address_config) {
            if (config.cms.address_config.max_try) {
                if (config.cms.address_config.max_try.create)
                    DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.CREATE = config.cms.address_config.max_try.create
                if (config.cms.address_config.max_try.update)
                    DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.UPDATE = config.cms.address_config.max_try.update
                if (config.cms.address_config.max_try.get)
                    DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.GET = config.cms.address_config.max_try.get
                if (config.cms.address_config.max_try.sync)
                    DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.SYNC = config.cms.address_config.max_try.sync
                if (config.cms.address_config.max_try.reset)
                    DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.RESET = config.cms.address_config.max_try.reset
            }
        }
        if (config.cms.menu_config) {
            if (config.cms.menu_config.max_try) {
                if (config.cms.menu_config.max_try.create)
                    DATABASE.KAFKA.CMS.MENU.MAX_RETRY.CREATE = config.cms.menu_config.max_try.create
                if (config.cms.menu_config.max_try.update)
                    DATABASE.KAFKA.CMS.MENU.MAX_RETRY.UPDATE = config.cms.menu_config.max_try.update
                if (config.cms.menu_config.max_try.get)
                    DATABASE.KAFKA.CMS.MENU.MAX_RETRY.GET = config.cms.menu_config.max_try.get
                if (config.cms.menu_config.max_try.sync)
                    DATABASE.KAFKA.CMS.MENU.MAX_RETRY.SYNC = config.cms.menu_config.max_try.sync
                if (config.cms.menu_config.max_try.reset)
                    DATABASE.KAFKA.CMS.MENU.MAX_RETRY.RESET = config.cms.menu_config.max_try.reset
            }
        }
        if (config.cms.promotion_config) {
            if (config.cms.promotion_config.max_try) {
                if (config.cms.promotion_config.max_try.create)
                    DATABASE.KAFKA.CMS.PROMOTION.MAX_RETRY.CREATE = config.cms.promotion_config.max_try.create
                if (config.cms.promotion_config.max_try.update)
                    DATABASE.KAFKA.CMS.PROMOTION.MAX_RETRY.UPDATE = config.cms.promotion_config.max_try.update
                if (config.cms.promotion_config.max_try.get)
                    DATABASE.KAFKA.CMS.PROMOTION.MAX_RETRY.GET = config.cms.promotion_config.max_try.get
                if (config.cms.promotion_config.max_try.sync)
                    DATABASE.KAFKA.CMS.PROMOTION.MAX_RETRY.SYNC = config.cms.promotion_config.max_try.sync
                if (config.cms.promotion_config.max_try.reset)
                    DATABASE.KAFKA.CMS.PROMOTION.MAX_RETRY.RESET = config.cms.promotion_config.max_try.reset
            }
        }
        if (config.cms.hidden_config) {
            if (config.cms.hidden_config.max_try) {
                if (config.cms.hidden_config.max_try.create)
                    DATABASE.KAFKA.CMS.HIDDEN.MAX_RETRY.CREATE = config.cms.hidden_config.max_try.create
                if (config.cms.hidden_config.max_try.update)
                    DATABASE.KAFKA.CMS.HIDDEN.MAX_RETRY.UPDATE = config.cms.hidden_config.max_try.update
                if (config.cms.hidden_config.max_try.get)
                    DATABASE.KAFKA.CMS.HIDDEN.MAX_RETRY.GET = config.cms.hidden_config.max_try.get
                if (config.cms.hidden_config.max_try.sync)
                    DATABASE.KAFKA.CMS.HIDDEN.MAX_RETRY.SYNC = config.cms.hidden_config.max_try.sync
                if (config.cms.hidden_config.max_try.reset)
                    DATABASE.KAFKA.CMS.HIDDEN.MAX_RETRY.RESET = config.cms.hidden_config.max_try.reset
            }
        }
    }
    if (config.sdm) {
        if (config.sdm.user_config) {
            if (config.sdm.user_config.max_try) {
                if (config.sdm.user_config.max_try.create)
                    DATABASE.KAFKA.SDM.USER.MAX_RETRY.CREATE = config.sdm.user_config.max_try.create
                if (config.sdm.user_config.max_try.update)
                    DATABASE.KAFKA.SDM.USER.MAX_RETRY.UPDATE = config.sdm.user_config.max_try.update
                if (config.sdm.user_config.max_try.get)
                    DATABASE.KAFKA.SDM.USER.MAX_RETRY.GET = config.sdm.user_config.max_try.get
                if (config.sdm.user_config.max_try.sync)
                    DATABASE.KAFKA.SDM.USER.MAX_RETRY.SYNC = config.sdm.user_config.max_try.sync
                if (config.sdm.user_config.max_try.reset)
                    DATABASE.KAFKA.SDM.USER.MAX_RETRY.RESET = config.sdm.user_config.max_try.reset
            }
        }
        if (config.sdm.address_config) {
            if (config.sdm.address_config.max_try) {
                if (config.sdm.address_config.max_try.create)
                    DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.CREATE = config.sdm.address_config.max_try.create
                if (config.sdm.address_config.max_try.update)
                    DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.UPDATE = config.sdm.address_config.max_try.update
                if (config.sdm.address_config.max_try.get)
                    DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.GET = config.sdm.address_config.max_try.get
                if (config.sdm.address_config.max_try.sync)
                    DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.SYNC = config.sdm.address_config.max_try.sync
                if (config.sdm.address_config.max_try.reset)
                    DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.RESET = config.sdm.address_config.max_try.reset
            }
        }
        if (config.sdm.menu_config) {
            if (config.sdm.menu_config.max_try) {
                if (config.sdm.menu_config.max_try.create)
                    DATABASE.KAFKA.SDM.MENU.MAX_RETRY.CREATE = config.sdm.menu_config.max_try.create
                if (config.sdm.menu_config.max_try.update)
                    DATABASE.KAFKA.SDM.MENU.MAX_RETRY.UPDATE = config.sdm.menu_config.max_try.update
                if (config.sdm.menu_config.max_try.get)
                    DATABASE.KAFKA.SDM.MENU.MAX_RETRY.GET = config.sdm.menu_config.max_try.get
                if (config.sdm.menu_config.max_try.sync)
                    DATABASE.KAFKA.SDM.MENU.MAX_RETRY.SYNC = config.sdm.menu_config.max_try.sync
                if (config.sdm.menu_config.max_try.reset)
                    DATABASE.KAFKA.SDM.MENU.MAX_RETRY.RESET = config.sdm.menu_config.max_try.reset
            }
        }
        if (config.sdm.promotion_config) {
            if (config.sdm.promotion_config.max_try) {
                if (config.sdm.promotion_config.max_try.create)
                    DATABASE.KAFKA.SDM.PROMOTION.MAX_RETRY.CREATE = config.sdm.promotion_config.max_try.create
                if (config.sdm.promotion_config.max_try.update)
                    DATABASE.KAFKA.SDM.PROMOTION.MAX_RETRY.UPDATE = config.sdm.promotion_config.max_try.update
                if (config.sdm.promotion_config.max_try.get)
                    DATABASE.KAFKA.SDM.PROMOTION.MAX_RETRY.GET = config.sdm.promotion_config.max_try.get
                if (config.sdm.promotion_config.max_try.sync)
                    DATABASE.KAFKA.SDM.PROMOTION.MAX_RETRY.SYNC = config.sdm.promotion_config.max_try.sync
                if (config.sdm.promotion_config.max_try.reset)
                    DATABASE.KAFKA.SDM.PROMOTION.MAX_RETRY.RESET = config.sdm.promotion_config.max_try.reset
            }
        }
        if (config.sdm.hidden_config) {
            if (config.sdm.hidden_config.max_try) {
                if (config.sdm.hidden_config.max_try.create)
                    DATABASE.KAFKA.SDM.HIDDEN.MAX_RETRY.CREATE = config.sdm.hidden_config.max_try.create
                if (config.sdm.hidden_config.max_try.update)
                    DATABASE.KAFKA.SDM.HIDDEN.MAX_RETRY.UPDATE = config.sdm.hidden_config.max_try.update
                if (config.sdm.hidden_config.max_try.get)
                    DATABASE.KAFKA.SDM.HIDDEN.MAX_RETRY.GET = config.sdm.hidden_config.max_try.get
                if (config.sdm.hidden_config.max_try.sync)
                    DATABASE.KAFKA.SDM.HIDDEN.MAX_RETRY.SYNC = config.sdm.hidden_config.max_try.sync
                if (config.sdm.hidden_config.max_try.reset)
                    DATABASE.KAFKA.SDM.HIDDEN.MAX_RETRY.RESET = config.sdm.hidden_config.max_try.reset
            }
        }
        if (config.sdm.order_config) {
            if (config.sdm.order_config.max_try) {
                if (config.sdm.order_config.max_try.create)
                    DATABASE.KAFKA.SDM.ORDER.MAX_RETRY.CREATE = config.sdm.order_config.max_try.create
                if (config.sdm.order_config.max_try.update)
                    DATABASE.KAFKA.SDM.ORDER.MAX_RETRY.UPDATE = config.sdm.order_config.max_try.update
                if (config.sdm.order_config.max_try.get)
                    DATABASE.KAFKA.SDM.ORDER.MAX_RETRY.GET = config.sdm.order_config.max_try.get
                if (config.sdm.order_config.max_try.sync)
                    DATABASE.KAFKA.SDM.ORDER.MAX_RETRY.SYNC = config.sdm.order_config.max_try.sync
                if (config.sdm.order_config.max_try.reset)
                    DATABASE.KAFKA.SDM.ORDER.MAX_RETRY.RESET = config.sdm.order_config.max_try.reset
            }
            // ORDER: {
            //     INTERVAL: {
            //         GET: 5000,
            //         GET_ONCE: 0,
            //         GET_MAX: 65000,
            //         NEXT_PING: 30,
            //     }
            // }
        }
    }
    global.configSync.kafka = date;
    return {}
}

interface IOrderStatus {
    cart_config: IStatus,
    pending_config: IStatus,
    confirmed_config: IStatus,
    prepared_config: IStatus,
    ready_config: IStatus,
    ontheway_config: IStatus,
    delivered_config: IStatus,
    closed_config: IStatus,
    cancelled_config: IStatus,
    failure_config: IStatus
}
interface IStatus {
    as: string,
    mongo: string,
    cms: string,
    sdm: number[],
    freq: {
        get: number,
        geet_once: number,
        get_max: number,
        next_ping: number
    }
}

export const orderStatusConfigSync = function (config: IOrderStatus, date: number) {
    if (config.cart_config) {
        if (config.cart_config.as)
            DATABASE.STATUS.ORDER.CART.AS = config.cart_config.as
        if (config.cart_config.mongo)
            DATABASE.STATUS.ORDER.CART.MONGO = config.cart_config.mongo
        if (config.cart_config.cms)
            DATABASE.STATUS.ORDER.CART.CMS = config.cart_config.cms
        if (config.cart_config.sdm)
            DATABASE.STATUS.ORDER.CART.SDM = config.cart_config.sdm
        if (config.cart_config.freq) {
            if (config.cart_config.freq.get)
                DATABASE.STATUS.ORDER.CART.FREQ.GET = config.cart_config.freq.get
            if (config.cart_config.freq.geet_once)
                DATABASE.STATUS.ORDER.CART.FREQ.GET_ONCE = config.cart_config.freq.geet_once
            if (config.cart_config.freq.get_max)
                DATABASE.STATUS.ORDER.CART.FREQ.GET_MAX = config.cart_config.freq.get_max
            if (config.cart_config.freq.next_ping)
                DATABASE.STATUS.ORDER.CART.FREQ.NEXT_PING = config.cart_config.freq.next_ping
        }
    }
    if (config.pending_config) {
        if (config.pending_config.as)
            DATABASE.STATUS.ORDER.PENDING.AS = config.pending_config.as
        if (config.pending_config.mongo)
            DATABASE.STATUS.ORDER.PENDING.MONGO = config.pending_config.mongo
        if (config.pending_config.cms)
            DATABASE.STATUS.ORDER.PENDING.CMS = config.pending_config.cms
        if (config.pending_config.sdm)
            DATABASE.STATUS.ORDER.PENDING.SDM = config.pending_config.sdm
        if (config.pending_config.freq) {
            if (config.pending_config.freq.get)
                DATABASE.STATUS.ORDER.PENDING.FREQ.GET = config.pending_config.freq.get
            if (config.pending_config.freq.geet_once)
                DATABASE.STATUS.ORDER.PENDING.FREQ.GET_ONCE = config.pending_config.freq.geet_once
            if (config.pending_config.freq.get_max)
                DATABASE.STATUS.ORDER.PENDING.FREQ.GET_MAX = config.pending_config.freq.get_max
            if (config.pending_config.freq.next_ping)
                DATABASE.STATUS.ORDER.PENDING.FREQ.NEXT_PING = config.pending_config.freq.next_ping
        }
    }
    if (config.confirmed_config) {
        if (config.confirmed_config.as)
            DATABASE.STATUS.ORDER.CONFIRMED.AS = config.confirmed_config.as
        if (config.confirmed_config.mongo)
            DATABASE.STATUS.ORDER.CONFIRMED.MONGO = config.confirmed_config.mongo
        if (config.confirmed_config.cms)
            DATABASE.STATUS.ORDER.CONFIRMED.CMS = config.confirmed_config.cms
        if (config.confirmed_config.sdm)
            DATABASE.STATUS.ORDER.CONFIRMED.SDM = config.confirmed_config.sdm
        if (config.confirmed_config.freq) {
            if (config.confirmed_config.freq.get)
                DATABASE.STATUS.ORDER.CONFIRMED.FREQ.GET = config.confirmed_config.freq.get
            if (config.confirmed_config.freq.geet_once)
                DATABASE.STATUS.ORDER.CONFIRMED.FREQ.GET_ONCE = config.confirmed_config.freq.geet_once
            if (config.confirmed_config.freq.get_max)
                DATABASE.STATUS.ORDER.CONFIRMED.FREQ.GET_MAX = config.confirmed_config.freq.get_max
            if (config.confirmed_config.freq.next_ping)
                DATABASE.STATUS.ORDER.CONFIRMED.FREQ.NEXT_PING = config.confirmed_config.freq.next_ping
        }
    }
    if (config.prepared_config) {
        if (config.prepared_config.as)
            DATABASE.STATUS.ORDER.BEING_PREPARED.AS = config.prepared_config.as
        if (config.prepared_config.mongo)
            DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO = config.prepared_config.mongo
        if (config.prepared_config.cms)
            DATABASE.STATUS.ORDER.BEING_PREPARED.CMS = config.prepared_config.cms
        if (config.prepared_config.sdm)
            DATABASE.STATUS.ORDER.BEING_PREPARED.SDM = config.prepared_config.sdm
        if (config.prepared_config.freq) {
            if (config.prepared_config.freq.get)
                DATABASE.STATUS.ORDER.BEING_PREPARED.FREQ.GET = config.prepared_config.freq.get
            if (config.prepared_config.freq.geet_once)
                DATABASE.STATUS.ORDER.BEING_PREPARED.FREQ.GET_ONCE = config.prepared_config.freq.geet_once
            if (config.prepared_config.freq.get_max)
                DATABASE.STATUS.ORDER.BEING_PREPARED.FREQ.GET_MAX = config.prepared_config.freq.get_max
            if (config.prepared_config.freq.next_ping)
                DATABASE.STATUS.ORDER.BEING_PREPARED.FREQ.NEXT_PING = config.prepared_config.freq.next_ping
        }
    }
    if (config.ready_config) {
        if (config.ready_config.as)
            DATABASE.STATUS.ORDER.READY.AS = config.ready_config.as
        if (config.ready_config.mongo)
            DATABASE.STATUS.ORDER.READY.MONGO = config.ready_config.mongo
        if (config.ready_config.cms)
            DATABASE.STATUS.ORDER.READY.CMS = config.ready_config.cms
        if (config.ready_config.sdm)
            DATABASE.STATUS.ORDER.READY.SDM = config.ready_config.sdm
        if (config.ready_config.freq) {
            if (config.ready_config.freq.get)
                DATABASE.STATUS.ORDER.READY.FREQ.GET = config.ready_config.freq.get
            if (config.ready_config.freq.geet_once)
                DATABASE.STATUS.ORDER.READY.FREQ.GET_ONCE = config.ready_config.freq.geet_once
            if (config.ready_config.freq.get_max)
                DATABASE.STATUS.ORDER.READY.FREQ.GET_MAX = config.ready_config.freq.get_max
            if (config.ready_config.freq.next_ping)
                DATABASE.STATUS.ORDER.READY.FREQ.NEXT_PING = config.ready_config.freq.next_ping
        }
    }
    if (config.ontheway_config) {
        if (config.ontheway_config.as)
            DATABASE.STATUS.ORDER.ON_THE_WAY.AS = config.ontheway_config.as
        if (config.ontheway_config.mongo)
            DATABASE.STATUS.ORDER.ON_THE_WAY.MONGO = config.ontheway_config.mongo
        if (config.ontheway_config.cms)
            DATABASE.STATUS.ORDER.ON_THE_WAY.CMS = config.ontheway_config.cms
        if (config.ontheway_config.sdm)
            DATABASE.STATUS.ORDER.ON_THE_WAY.SDM = config.ontheway_config.sdm
        if (config.ontheway_config.freq) {
            if (config.ontheway_config.freq.get)
                DATABASE.STATUS.ORDER.ON_THE_WAY.FREQ.GET = config.ontheway_config.freq.get
            if (config.ontheway_config.freq.geet_once)
                DATABASE.STATUS.ORDER.ON_THE_WAY.FREQ.GET_ONCE = config.ontheway_config.freq.geet_once
            if (config.ontheway_config.freq.get_max)
                DATABASE.STATUS.ORDER.ON_THE_WAY.FREQ.GET_MAX = config.ontheway_config.freq.get_max
            if (config.ontheway_config.freq.next_ping)
                DATABASE.STATUS.ORDER.ON_THE_WAY.FREQ.NEXT_PING = config.ontheway_config.freq.next_ping
        }
    }
    if (config.delivered_config) {
        if (config.delivered_config.as)
            DATABASE.STATUS.ORDER.DELIVERED.AS = config.delivered_config.as
        if (config.delivered_config.mongo)
            DATABASE.STATUS.ORDER.DELIVERED.MONGO = config.delivered_config.mongo
        if (config.delivered_config.cms)
            DATABASE.STATUS.ORDER.DELIVERED.CMS = config.delivered_config.cms
        if (config.delivered_config.sdm)
            DATABASE.STATUS.ORDER.DELIVERED.SDM = config.delivered_config.sdm
        if (config.delivered_config.freq) {
            if (config.delivered_config.freq.get)
                DATABASE.STATUS.ORDER.DELIVERED.FREQ.GET = config.delivered_config.freq.get
            if (config.delivered_config.freq.geet_once)
                DATABASE.STATUS.ORDER.DELIVERED.FREQ.GET_ONCE = config.delivered_config.freq.geet_once
            if (config.delivered_config.freq.get_max)
                DATABASE.STATUS.ORDER.DELIVERED.FREQ.GET_MAX = config.delivered_config.freq.get_max
            if (config.delivered_config.freq.next_ping)
                DATABASE.STATUS.ORDER.DELIVERED.FREQ.NEXT_PING = config.delivered_config.freq.next_ping
        }
    }
    if (config.closed_config) {
        if (config.closed_config.as)
            DATABASE.STATUS.ORDER.CLOSED.AS = config.closed_config.as
        if (config.closed_config.mongo)
            DATABASE.STATUS.ORDER.CLOSED.MONGO = config.closed_config.mongo
        if (config.closed_config.cms)
            DATABASE.STATUS.ORDER.CLOSED.CMS = config.closed_config.cms
        if (config.closed_config.sdm)
            DATABASE.STATUS.ORDER.CLOSED.SDM = config.closed_config.sdm
        if (config.closed_config.freq) {
            if (config.closed_config.freq.get)
                DATABASE.STATUS.ORDER.CLOSED.FREQ.GET = config.closed_config.freq.get
            if (config.closed_config.freq.geet_once)
                DATABASE.STATUS.ORDER.CLOSED.FREQ.GET_ONCE = config.closed_config.freq.geet_once
            if (config.closed_config.freq.get_max)
                DATABASE.STATUS.ORDER.CLOSED.FREQ.GET_MAX = config.closed_config.freq.get_max
            if (config.closed_config.freq.next_ping)
                DATABASE.STATUS.ORDER.CLOSED.FREQ.NEXT_PING = config.closed_config.freq.next_ping
        }
    }
    if (config.cancelled_config) {
        if (config.cancelled_config.as)
            DATABASE.STATUS.ORDER.CANCELED.AS = config.cancelled_config.as
        if (config.cancelled_config.mongo)
            DATABASE.STATUS.ORDER.CANCELED.MONGO = config.cancelled_config.mongo
        if (config.cancelled_config.cms)
            DATABASE.STATUS.ORDER.CANCELED.CMS = config.cancelled_config.cms
        if (config.cancelled_config.sdm)
            DATABASE.STATUS.ORDER.CANCELED.SDM = config.cancelled_config.sdm
        if (config.cancelled_config.freq) {
            if (config.cancelled_config.freq.get)
                DATABASE.STATUS.ORDER.CANCELED.FREQ.GET = config.cancelled_config.freq.get
            if (config.cancelled_config.freq.geet_once)
                DATABASE.STATUS.ORDER.CANCELED.FREQ.GET_ONCE = config.cancelled_config.freq.geet_once
            if (config.cancelled_config.freq.get_max)
                DATABASE.STATUS.ORDER.CANCELED.FREQ.GET_MAX = config.cancelled_config.freq.get_max
            if (config.cancelled_config.freq.next_ping)
                DATABASE.STATUS.ORDER.CANCELED.FREQ.NEXT_PING = config.cancelled_config.freq.next_ping
        }
    }
    if (config.failure_config) {
        if (config.failure_config.as)
            DATABASE.STATUS.ORDER.FAILURE.AS = config.failure_config.as
        if (config.failure_config.mongo)
            DATABASE.STATUS.ORDER.FAILURE.MONGO = config.failure_config.mongo
        if (config.failure_config.cms)
            DATABASE.STATUS.ORDER.FAILURE.CMS = config.failure_config.cms
        if (config.failure_config.sdm)
            DATABASE.STATUS.ORDER.FAILURE.SDM = config.failure_config.sdm
        if (config.failure_config.freq) {
            if (config.failure_config.freq.get)
                DATABASE.STATUS.ORDER.FAILURE.FREQ.GET = config.failure_config.freq.get
            if (config.failure_config.freq.geet_once)
                DATABASE.STATUS.ORDER.FAILURE.FREQ.GET_ONCE = config.failure_config.freq.geet_once
            if (config.failure_config.freq.get_max)
                DATABASE.STATUS.ORDER.FAILURE.FREQ.GET_MAX = config.failure_config.freq.get_max
            if (config.failure_config.freq.next_ping)
                DATABASE.STATUS.ORDER.FAILURE.FREQ.NEXT_PING = config.failure_config.freq.next_ping
        }
    }
    global.configSync.orderStatus = date;
    return {}
}