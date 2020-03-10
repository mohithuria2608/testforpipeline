
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
    SYNC_STORE = "sync_store",
    SYNC_CITY = "sync_city",
    SYNC_AREA = "sync_area",
    SYNC_COUNTRY = "sync_country",
    LOGGER = "logger",
    APP_VERSION = "appversion",
    FAILQ = "failq",
    PING_SERVICE = "ping-service"
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
        LICENSE_CODE: "AmericanaWeb",
        CONCEPT_ID: 3,
        MENU_TEMPLATE_ID: 17
    },
    DEFAULT_USER_NAME: 'App User',
    INITIAL_USER_TTL: 7 * 24 * 60 * 60,//seconds
    INITIAL_GUEST_USER_TTL: 24 * 60 * 60,//seconds
    DEFAULT_CART_TTL: 24 * 60 * 60,//seconds
    USERCHANGE_TTL: 15 * 60,//seconds
    BY_PASS_OTP: 1212,
    OTP_EXPIRE_TIME: (10 * 60 * 1000), //millisecond
    ACCESS_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    REFRESH_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    CMS_AUTH_EXP: (10 * 60 * 1000),
    TRACK_ORDER_UNITIL: (2 * 60 * 60 * 1000),
    MIN_COD_CART_VALUE: 300,//AED
    MIN_CART_VALUE: 23,//AED
    PAYMENT_API_TIMEOUT: 3 * 1000,// 1 sec
    PAYMENT_API_KEY_PREFIX: "Key_",
    DISPLAY_COLOR: true,
    ANDROID_SCHEME_HOST: "https://",
    ANDROID_PACKAGE_NAME: "com.android.kfc",
    IOS_SCHEME_HOST: "americanaKFCUAE://",
    DEEPLINK_FALLBACK: 'https://uae.kfc.me//',
    AUTH_MECH: "Bearer"
};

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
                    GET_STATUS: 30000,
                    GET_STATUS_ONCE: 0
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
            CARD: "Card",
            COD: "Cash On Delivery"
        },

        CONFIG: {
            GENERAL: "general",
            PAYMENT: "payment",
            SHIPMENT: "shipment"
        },

        TOKEN: {
            CMS_AUTH: "CMS_AUTH",
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
            PICKUP: "PICKUP",
            DELIVERY: "DELIVERY"
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
            SUB_TOTAL: "SUB_TOTAL",
            DISCOUNT: "DISCOUNT",
            TAX: "TAX",
            SHIPPING: "SHIPPING",
            TOTAL: "TOTAL",

        }
    },

    STATUS: {
        ORDER: {
            CART: {
                AS: "CART",
                CMS: ""
            },
            PENDING: {
                MONGO: "PENDING",
                CMS: "",
                SDM: [0, 1, 96] //@description : ((Suspended = 96)/(open = 1)
            },
            CONFIRMED: {
                MONGO: "CONFIRMED",
                CMS: "",
                SDM: [2] //@description : in kitchen
            },
            BEING_PREPARED: {
                MONGO: "BEING_PREPARED",
                CMS: "",
                SDM: [2] //@description : in kitchen
            },
            READY: {
                MONGO: "READY",
                CMS: "",
                SDM: [8] //@description : ready
            },
            ON_THE_WAY: {
                MONGO: "ON_THE_WAY",
                CMS: "",
                SDM: [16, 32] //@description : assigned/shipped
            },
            DELIVERED: {
                MONGO: "DELIVERED",
                CMS: "",
                SDM: [64, 128, 2048] //@description : delivered
            },
            CLOSED: {
                MONGO: "",
                CMS: "",
                SDM: []
            },
            CANCELED: {
                MONGO: "CANCELED",
                CMS: "",
                SDM: [512, 256, 1024, 4096, 8192] //@description : cancelled
            },
            FAILURE: {
                MONGO: "FAILURE",
                CMS: "",
                SDM: []
            },
        },

        PAYMENT: {
            INITIATED: 'INITIATED',
            AUTHORIZED: 'AUTHORIZED',
            CANCELLED: 'CANCELLED', // Reverse payment
            CAPTURED: 'CAPTURED',
            REFUNDED: 'REFUNDED',
            EXPIRED: 'EXPIRED',
            FAILED: 'FAILED',
        },

        TRANSACTION: {
            AUTHORIZATION: 'AUTHORIZATION',
            VOID_AUTHORIZATION: 'VOID_AUTHORIZATION', // Reverse payment
            CAPTURE: 'CAPTURE',
            REFUND: 'REFUND',
            FAILED: 'FAILED'
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
    }
};

export const SMS_MSG = {
    En: {
        USER: {
            OTP_VERIFICATION: (otp) => `${otp} is an OTP to login to your KFC account. It is valid for the next 10 minutes. Please do not share this OTP with anyone.`,
        },
        ORDER: {
            DELIVERY_CONFIRMED: (data) => `Thank you for choosing KFC! We will deliver your food hot and fresh at your doorstep. Your order is expected to arrive in the next 20 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount} AED.`,
            PICKUP_CONFIRMED: (data) => `Thank you for choosing KFC! Your order has been confirmed and will be ready in the next 30 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount} AED.`,
            ORDER_CANCEL: (data) => `Your order no. ${data.sdmOrderRef} was cancelled. We regret the inconvenience caused.  Any payments if deducted will get refunded within 4-7 business days.`
        }
    },
    Ar: {
        USER: {
            OTP_VERIFICATION: (otp) => `${otp} هو OTP لتسجيل الدخول إلى حساب KFC الخاص بك. انها صالحة لمدة 10 دقائق القادمة. يرجى عدم مشاركة OTP مع أي شخص.`,
        },
        ORDER: {
            DELIVERY_CONFIRMED: (data) => `Thank you for choosing KFC! We will deliver your food hot and fresh at your doorstep. Your order is expected to arrive in the next 20 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount} AED.`,
            PICKUP_CONFIRMED: (data) => `Thank you for choosing KFC! Your order has been confirmed and will be ready in the next 30 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount} AED.`,
            ORDER_CANCEL: (data) => `Your order no. ${data.sdmOrderRef} was cancelled. We regret the inconvenience caused.  Any payments if deducted will get refunded within 4-7 business days.`
        }
    }
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
                "message": "Minimum order value should be 23 AED",
                "message_Ar": "الحد الأدنى للطلب يجب أن يكون 23 درهم",
                "message_En": "Minimum order value should be 23 AED"
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
            "INVALID_STORE": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_STORE",
                "message": "This store is unserviceable at the moment",
                "message_Ar": "هذا المطعم خارج الخدمة في الوقت الحالي",
                "message_En": "This store is unserviceable at the moment"
            },
            "INVALID_ADDRESS": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_ADDRESS",
                "message": "This address does not exists",
                "message_Ar": "هذا العنوان غير موجود",
                "message_En": "This address does not exists"
            },
            "PROFILE_SETUP_ALLREADY_COMPLETE": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "PROFILE_SETUP_ALLREADY_COMPLETE",
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
            "USER_PHONE_ALREADY_EXIST": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "USER_PHONE_ALREADY_EXIST",
                "message": "This phone number is already is use",
                "message_Ar": "رقم الهاتف الذي أدخلته مستخدم من قبل",
                "message_En": "This phone number is already is use"
            },
            "USER_EMAIL_ALREADY_EXIST": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "USER_ALREADY_EXIST",
                "message": "This email is already is use",
                "message_Ar": "رقم الهاتف الذي أدخلته مستخدم من قبل",
                "message_En": "This email is already is use"
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
            "STORE_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "This store is unserviceable at the moment",
                "type": "STORE_NOT_FOUND",
                "message_Ar": "هذا المطعم غير متاح الآن",
                "message_En": "This store is unserviceable at the moment"
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
            DATA_LOSS: '15'
        },
        ERROR: (code, type, message) => {
            return {
                code: parseInt(code),
                details: `${type} : ${message}`
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
        },
    },
    SDM_ORDER_VALIDATION: {
        ORDER_AMOUNT_MISMATCH: "Order amount mismatch"
    }
};