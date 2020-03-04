
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
    UPSELL = "upsell",
    HIDDEN = "hidden",
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

    M_LOGGER = 'm_logger',

    PING_SERVICE = 'ping_service',
};

export enum MIDDLEWARE {
    AUTH = "auth",
    ACTIVITY_LOG = "activity_log"
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
        },
        MENU: {
            get_menu: "get_menu"
        },
        HIDDEN: {
            get_hidden: "get_hidden"
        },
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
                URL: "updateaddress"
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
                    GET_STATUS: 10000
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

        VERSION_UPDATE: {
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
            REFUND: 'REFUND'
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

export const STATUS_MSG = {
    ERROR: {
        E400: {
            USER_NOT_CREATED_ON_SDM: {
                statusCode: 400,
                httpCode: 400,
                type: 'USER_NOT_CREATED_ON_SDM',
                message: 'Some issue has occured. Please try after sometime'
            },

            USER_NOT_CREATED_ON_CMS: {
                statusCode: 400,
                httpCode: 400,
                type: 'USER_NOT_CREATED_ON_CMS',
                message: 'Some issue has occured. Please try after sometime'
            },

            MIN_CART_VALUE_VOILATION: {
                statusCode: 400,
                httpCode: 400,
                type: 'MIN_CART_VALUE_VOILATION',
                message: 'Minimum cart voilation'
            },

            MAX_COD_CART_VALUE_VOILATION: {
                statusCode: 400,
                httpCode: 400,
                type: 'MAX_COD_CART_VALUE_VOILATION',
                message: 'Maximum cod cart voilation'
            },

            INVALID_PROMO: {
                statusCode: 400,
                httpCode: 400,
                type: 'INVALID_PROMO',
                message: 'Invalid Promotion'
            },

            PROMO_EXPIRED: {
                statusCode: 400,
                httpCode: 400,
                type: 'PROMO_EXPIRED',
                message: 'Promo expired'
            },

            INVALID_STORE: {
                statusCode: 400,
                httpCode: 400,
                type: 'INVALID_STORE',
                message: 'Invalid store'
            },

            INVALID_ADDRESS: {
                statusCode: 400,
                httpCode: 400,
                type: 'INVALID_ADDRESS',
                message: 'Invalid address provided'
            },

            PROFILE_SETUP_ALLREADY_COMPLETE: {
                statusCode: 400,
                httpCode: 400,
                type: 'PROFILE_SETUP_ALLREADY_COMPLETE',
                message: 'Profile setup is already complete'
            },

            OTP_SESSION_EXPIRED: {
                statusCode: 400,
                httpCode: 400,
                type: 'OTP_SESSION_EXPIRED',
                message: 'Otp session has expired'
            },

            OTP_EXPIRED: {
                statusCode: 400,
                httpCode: 400,
                type: 'OTP_EXPIRED',
                message: 'Otp entered has expired'
            },

            INVALID_OTP: {
                statusCode: 400,
                httpCode: 400,
                type: 'INVALID_OTP',
                message: 'Invalid otp'
            },

            USER_ALREADY_EXIST: {
                statusCode: 400,
                httpCode: 400,
                type: 'USER_ALREADY_EXIST',
                message: 'User already exist, please login'
            },

            INVALID_ID: {
                statusCode: 400,
                httpCode: 400,
                message: 'Invalid Id Provided ',
                type: 'INVALID_ID'
            },

            APP_ERROR: {
                statusCode: 400,
                httpCode: 400,
                message: 'Application Error',
                type: 'APP_ERROR'
            },

            DEFAULT: {
                statusCode: 400,
                httpCode: 400,
                message: 'Bad Request',
                type: 'DEFAULT'
            }
        },
        E401: {
            UNAUTHORIZED: {
                statusCode: 401,
                httpCode: 401,
                message: 'You are not authorized to perform this action',
                type: 'UNAUTHORIZED'
            },

            ACCESS_TOKEN_EXPIRED: {
                statusCode: 401,
                httpCode: 401,
                type: 'ACCESS_TOKEN_EXPIRED',
                message: 'Access token has expired.'
            }
        },
        E404: {
            RESOURCE_NOT_FOUND: {
                statusCode: 404,
                httpCode: 404,
                type: 'RESOURCE_NOT_FOUND',
                message: 'Resource not found'
            }
        },
        E409: {
            ORDER_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'Order not found',
                type: 'ORDER_NOT_FOUND'
            },

            CONFIG_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'Config not found',
                type: 'CONFIG_NOT_FOUND'
            },

            USER_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'User not found',
                type: 'USER_NOT_FOUND'
            },

            MENU_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'Menu not found',
                type: 'MENU_NOT_FOUND'
            },

            HOME_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'Home not found',
                type: 'HOME_NOT_FOUND'
            },

            SERVICE_UNAVAILABLE: {
                statusCode: 409,
                httpCode: 409,
                type: 'SERVICE_UNAVAILABLE',
                message: "Sorry, we don't, deliver at this location"
            },

            ADDRESS_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                type: 'ADDRESS_NOT_FOUND',
                message: "Address not found"
            },

            CART_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                type: 'CART_NOT_FOUND',
                message: "Cart not found"
            },

            STORE_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'Store not found',
                type: 'STORE_NOT_FOUND'
            },

            PROMO_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'Promotion not found',
                type: 'PROMO_NOT_FOUND'
            },

            DATA_NOT_FOUND: {
                statusCode: 409,
                httpCode: 409,
                message: 'Data not found',
                type: 'DATA_NOT_FOUND'
            },
        },
        E422: {
            INVALID_COUNTRY_CODE: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid country code',
                type: 'INVALID_COUNTRY_CODE'
            },
            INVALID_PHONE_NO: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid phone number',
                type: 'INVALID_PHONE_NO'
            },
            INVALID_EMAIL: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid email',
                type: 'INVALID_EMAIL'
            },
            INVALID_NAME: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid name',
                type: 'INVALID_NAME'
            },
            INVALID_LOCATION: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid location',
                type: 'INVALID_LOCATION'
            },
            INVALID_ADDRESS: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid address',
                type: 'INVALID_ADDRESS'
            },
            INVALID_OTP: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid otp',
                type: 'INVALID_OTP'
            },
            INVALID_SOCIAL_INFO: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid social info',
                type: 'INVALID_SOCIAL_INFO'
            },
            INVALID_CART: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid cart',
                type: 'INVALID_CART'
            },
            INVALID_COUPON: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid coupon',
                type: 'INVALID_COUPON'
            },
            INVALID_PRODUCTS: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid products',
                type: 'INVALID_PRODUCTS'
            },
            INVALID_ORDER: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid order',
                type: 'INVALID_ORDER'
            },
            INVALID_USERNAME: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid user name',
                type: 'INVALID_USERNAME'
            },
            INVALID_PASSWORD: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid password',
                type: 'INVALID_PASSWORD'
            },
            INVALID_LANGUAGE: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid language',
                type: 'INVALID_LANGUAGE'
            },
            INVALID_BRAND: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid brand',
                type: 'INVALID_BRAND'
            },
            INVALID_COUNTRY: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid country',
                type: 'INVALID_COUNTRY'
            },
            DEFAULT_VALIDATION_ERROR: {
                statusCode: 422,
                httpCode: 422,
                message: 'Invalid info provided',
                type: 'DEFAULT_VALIDATION_ERROR'
            },
            VALIDATION_ERROR: {
                statusCode: 422,
                httpCode: 422,
                message: 'Validation Error :',
                type: 'VALIDATION_ERROR'
            }
        },
        E500: {
            DB_ERROR: {
                statusCode: 500,
                httpCode: 500,
                message: 'DB Error : ',
                type: 'DB_ERROR'
            },

            IMP_ERROR: {
                statusCode: 500,
                httpCode: 500,
                message: 'Implementation Error',
                type: 'IMP_ERROR'
            },

            INVALID_TOKEN_TYPE: {
                statusCode: 500,
                httpCode: 500,
                message: 'Invalid token type provided',
                type: 'INVALID_TOKEN_TYPE'
            },

            CREATE_ORDER_ERROR: {
                statusCode: 500,
                httpCode: 500,
                type: 'CREATE_ORDER_ERROR',
                message: 'Error while creating order on SDM'
            },
        },
        E501: {
            TOKENIZATION_ERROR: {
                statusCode: 501,
                httpCode: 501,
                message: 'Failure in creating token',
                type: 'TOKENIZATION_ERROR'
            }
        }
    },
    SUCCESS: {
        S200: {
            OTP_SENT: {
                statusCode: 200,
                httpCode: 200,
                type: 'OTP_SENT',
                message: 'Otp sent successfully'
            },

            OTP_VERIFIED: {
                statusCode: 200,
                httpCode: 200,
                type: 'OTP_VERIFIED',
                message: 'Otp verified'
            },

            RESET_SUCCESS: {
                statusCode: 200,
                httpCode: 200,
                type: 'RESET_SUCCESS',
                message: 'Password has been successfully reset'
            },

            PHONE_VERIFIED: {
                statusCode: 200,
                httpCode: 200,
                message: 'Phone number successfully verified',
                type: 'PHONE_VERIFIED'
            },

            FORGET_PASSWORD: {
                statusCode: 200,
                httpCode: 200,
                message: 'Forget password successfully',
                type: 'FORGET_PASSWORD'
            },

            UPLOAD: {
                statusCode: 200,
                httpCode: 200,
                message: 'File uploaded successfully',
                type: 'UPLOAD'
            },

            UPDATED: {
                statusCode: 200,
                httpCode: 200,
                message: 'Updated Successfully',
                type: 'UPDATED'
            },

            DELETED: {
                statusCode: 200,
                httpCode: 200,
                message: 'Deleted Successfully',
                type: 'DELETED'
            },

            BLOCKED: {
                statusCode: 200,
                httpCode: 200,
                message: 'Blocked Successfully',
                type: 'BLOCKED'
            },
            SOCIAL_LOGIN: {
                statusCode: 200,
                httpCode: 200,
                message: 'Logged In Successfully',
                type: 'SOCIAL_LOGIN'
            },

            LOGIN: {
                statusCode: 200,
                httpCode: 200,
                message: 'Logged In Successfully',
                type: 'LOGIN'
            },

            LOGOUT: {
                statusCode: 200,
                httpCode: 200,
                message: 'Logged Out Successfully',
                type: 'LOGOUT'
            },

            DEFAULT: {
                statusCode: 200,
                httpCode: 200,
                message: 'Success',
                type: 'DEFAULT',
            },

            ACCOUNT_DELETED: {
                statusCode: 200,
                httpCode: 200,
                message: 'Account has been deleted',
                type: 'ACCOUNT_DELETED'
            }
        },
        S201: {
            CREATED: {
                statusCode: 201,
                httpCode: 201,
                message: 'Created Successfully',
                type: 'CREATED'
            },
        },
        S205: {
            MENU_CHANGED: {
                statusCode: 205,
                httpCode: 205,
                message: 'Menu has been changed. Please refresh your menu.',
                type: 'MENU_CHANGED'
            },

            DATA_CHANGED: {
                statusCode: 205,
                httpCode: 205,
                message: 'Existing data has been changed. Please refresh your data.',
                type: 'DATA_CHANGED'
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
        VALIDATION: {
            INVALID_PHONE_NO: "Invalid phone number",
            INVALID_EMAIL: "Please enter email address in a valid format",
            INVALID_OTP: "Invalid otp",
            INAVLID_NAME: "Please enter a valid name",
            EMPTY_PHONE_NO: "Empty phone number",
            EMPTY_EMAIL: "Empty email",
            EMPTY_OTP: "Empty otp",
            EMPTY_NAME: "Empty name",
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