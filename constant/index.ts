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
    OTPCOOLDOWN = "otpcooldown",
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
    ORDERSTATUS = "orderstatus",
    CONFIG = "config",
    COUNTRY = "country",
    AREA = "area",
    CITY = "city",
    STORE = "store",
    PICKUP = "pickup",
    CARHOP = "carhop",
    SYNC_QUEUE = "sync_queue",
    SYNC_STORE = "sync_store",
    SYNC_CITY = "sync_city",
    SYNC_AREA = "sync_area",
    SYNC_WEB_AREA = "sync_web_area",
    SYNC_COUNTRY = "sync_country",
    SYNC_MENU_VGROUP = "sync_menu_vgroup",
    SYNC_MENU_VSELECTOR = "sync_menu_vselector",
    SYNC_MENU_WEBCOMBO = "sync_menu_webcombo",
    SYNC_MENU = "sync_menu",
    SYNC_MENU_PRODUCT = "sync_menu_product",
    LOGGER = "logger",
    APP_VERSION = "appversion",
    FAQ = "faq",
    FAILQ = "failq",
    PING_SERVICE = "ping-service"
};

export enum KAFKA_TOPIC {
    FAIL_Q = "fail_q",
    SYNC_Q = "sync_q",
    RETRY1 = "retry1",
    RETRY2 = "retry2",
    RETRY3 = "retry3",

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
    CMS_ORDER = 'cms_order',

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

    TYPE: {
        API_CHANNEL: {
            KFC_APP: "kfcapp"
        },

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
            COUNTRY_SPECIFIC: "country_specific",
            KAFKA: "kafka",
            ORDER_STATUS: "order_status"
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
            PAYMENT_REQUEST: "PAYMENT_REQUEST"
        },

        ACTIVITY_LOG_ID_INFO: {
            ORDER_ID: "ORDER_ID",
            NOON_PAY_ORDER_ID: "NOON_PAY_ORDER_ID"
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
            PICKUP: {
                TYPE: "PICKUP",
                SUBTYPE: {
                    CARHOP: "CARHOP",
                    STORE: "STORE",
                }
            },
            DELIVERY: {
                TYPE: "DELIVERY",
                SUBTYPE: {
                    DELIVERY: "DELIVERY"
                }
            }
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
                SDM: 2
            }
        },

        STORE_SERVICE: {
            DELIVERY: "del",
            TAKEAWAY: "tak",
            DINEIN: "din",
            CARHOP: "carHop",
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
                        value: "Inclusive of VAT 5% i.e."
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
                        value: " خدمة التوصيل"
                    },
                    {
                        name: "TAX",
                        value: String.raw`يشتمل على ضريبة القيمة المضافة 5% بمعنى آخر`
                        // value: String.raw`%5 ضريبة القيمة المضافة`
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
            USER_OTP_VERIFICATION: (data) => `<#> ${data.otp} is an OTP to login to your KFC account. It is valid for the next 10 minutes. Please do not share this OTP with anyone. ${data.key}`,
            ORDER_DELIVERY_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `Thank you for choosing KFC! We will deliver your food hot and fresh at your doorstep. Your order is expected to arrive in the next 20 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount[0].amount} AED.`
            },
            ORDER_PICKUP_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `Thank you for choosing KFC! Your order has been confirmed and will be ready in the next 30 mins. Order no. ${data.sdmOrderRef} | Amount: ${data.amount[0].amount} AED.`
            },
            ORDER_CANCEL: (data) => `Your order no. ${data.sdmOrderRef} was cancelled. We regret the inconvenience caused.  Any payments if deducted will get refunded within 4-7 business days.`,
            ORDER_FAIL: (data) => `Your order failed due to unavoidable reasons. Please try after some time.`,
        },
        Ar: {
            USER_OTP_VERIFICATION: (data) => `<#> ${data.otp} هوOTP . لتسجيل الدخول إلى حساب KFC الخاص بك. انها صالحة لمدة 10 دقائق القادمة. يرجى عدم مشاركة مع أي شخص. ${data.key}`,
            ORDER_DELIVERY_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `شكرًا لاختيارك دجاج كنتاكي. سنقوم بإيصال طلبك إلى منزلك ساخن وطازج. من المتوقع أن يصلك الطلب خلال 20 >قيقة. رقم الطلب: ${data.sdmOrderRef} المبلغ ${data.amount[0].amount} درهم.`
            },
            ORDER_PICKUP_CONFIRM: (data) => {
                data.amount = data.amount.filter(obj => { return obj.type == DATABASE.TYPE.CART_AMOUNT.TYPE.TOTAL });
                return `شكرًا لاختيارك دجاج كنتاكي. تم تأكيد طلبك وسيكون جاهز للاستلام خلال 30  دقيقة. رقم الطلب ${data.sdmOrderRef}. المبلغ: ${data.amount[0].amount} درهم.`;
            },
            ORDER_CANCEL: (data) => `تم إلغاء الطلب رقم ${data.sdmOrderRef}. إي أموال تم سحبها سيتم إرجاعها خلال 4 إلى 7 أيام عمل.`,
            ORDER_FAIL: (data) => `عذرًا لم نتمكن من إكمال الطلب. يرجى المحاولة مجددًا بعد قليل`
        }
    },
    EMAIL: {
        En: {
            USER_WELCOME_EMAIL: 'Welcome to KFC! | KFC UAE',
            ORDER_DELIVERY_CONFIRM_EMAIL: 'Your order has been confirmed!- Delivery | KFC UAE',
            ORDER_PICKUP_CONFIRM_EMAIL: 'Your order has been confirmed! - Pickup | KFC UAE',
            ORDER_CANCEL_EMAIL: 'Your order has been cancelled | KFC UAE',
            ORDER_FAIL_EMAIL: 'Your order failed! | KFC UAE',
            PAYMENT_FAIL_EMAIL: 'Payment failed for your order| KFC UAE'
        },
        Ar: {
            USER_WELCOME_EMAIL: 'Welcome to KFC! | KFC UAE',
            ORDER_DELIVERY_CONFIRM_EMAIL: 'Your order has been confirmed! - Delivery | KFC UAE',
            ORDER_PICKUP_CONFIRM_EMAIL: 'Your order has been confirmed! - Pickup | KFC UAE',
            ORDER_CANCEL_EMAIL: 'Your order has been cancelled | KFC UAE',
            ORDER_FAIL_EMAIL: 'Your order failed! | KFC UAE',
            PAYMENT_FAIL_EMAIL: 'Payment failed for your order| KFC UAE'
        }
    }
}

export const EMAIL_META = {
    baseImageUrl: 'http://40.123.205.1/pub/media/catalog/product/emailer/',
    ctaLink: '',
    contactEmail: 'support@americana-food.com',
    contactNumber: '600522252'
}

export const STATUS_MSG = {
    "ERROR": {
        "E400": {
            "CHANGE_PAYMENT_METHOD": {
                "statusCode": 400,
                "httpCode": 400,
                "message": "Online Payment is currently taking longer than usual. Please proceed with Cash as mode of payment.",
                "type": "CHANGE_PAYMENT_METHOD",
                "message_Ar": "يستغرق الدفع الالكتروني وقتاً أكثر من المعتاد حالياً. الرجاء اختيار الدفع نقداً",
                "message_En": "Online Payment is currently taking longer than usual. Please proceed with Cash as mode of payment."
            },
            "OTP_RETRY_MAXED_OUT": {
                "statusCode": 400,
                "httpCode": 400,
                "message": "Otp retries has maxed out !!",
                "type": "OTP_RETRY_MAXED_OUT",
                "message_Ar": "يرجى إدخال رقم جوال صالح",
                "message_En": "Otp retries has maxed out !!"
            },
            "EMPTY_CART": {
                "statusCode": 400,
                "httpCode": 400,
                "message": "Empty cart !!",
                "type": "EMPTY_CART",
                "message_Ar": "يرجى إدخال رقم جوال صالح",
                "message_En": "Empty cart !!"
            },
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
            "CONFIG_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "Configurations not found",
                "type": "CONFIG_NOT_FOUND",
                "message_Ar": "الطلب غير موجود، يرجى إدخال رقم هاتف صحيح وإعادة الطلب",
                "message_En": "Configurations not found"
            },
            "ORDER_NOT_FOUND": {
                "statusCode": 409,
                "httpCode": 409,
                "message": "Order not found, please enter the correct phone number and order ID",
                "type": "ORDER_NOT_FOUND",
                "message_Ar": "الطلب غير موجود، يرجى إدخال رقم هاتف صحيح وإعادة الطلب",
                "message_En": "Order not found, please enter the correct phone number and order ID"
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
                "message": "Sorry, we don't deliver at this location",
                "message_Ar": "عذرًا، لا نقوم بالتوصيل في هذه المنطقة",
                "message_En": "Sorry, we do not deliver at this location"
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
        "E412": {
            "SERVICE_UNAVAILABLE": {
                "statusCode": 412,
                "httpCode": 412,
                "type": "SERVICE_UNAVAILABLE",
                "message": "Sorry, we don't deliver at this location",
                "message_Ar": "عذرًا، لا نقوم بالتوصيل في هذه المنطقة",
                "message_En": "Sorry, we don't deliver at this location"
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
            "INVALID_ADDRESS_INFO": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_ADDRESS_INFO",
                "message": "Invalid address information",
                "message_Ar": "هذا العنوان غير موجود",
                "message_En": "Invalid address information"
            },
            "INVALID_DELIVERY_INSTRUCTION": {
                "statusCode": 400,
                "httpCode": 400,
                "type": "INVALID_DELIVERY_INSTRUCTION",
                "message": "Please enter a valid delivery instruction",
                "message_Ar": "هذا العنوان غير موجود",
                "message_En": "Please enter a valid delivery instruction"
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
        "E455": {
            "SDM_INVALID_CORP_ID": {
                "statusCode": 455,
                "httpCode": 455,
                "message": "Invalid corpId of the customer",
                "type": "SDM_INVALID_CORP_ID",
                "message_En": "Invalid corpId of the customer",
                "message_Ar": "Invalid corpId of the customer",
            },
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
                EMPTY_ORDER_NO: "Please enter order no.",
                EMPTY_BUILDING_NAME: "Please enter building name.",
                EMPTY_FLAT_NO: "Please enter flat no.",
                EMPTY_MAP_LOCATION: "Please choose a location.",
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
                EMPTY_ORDER_NO: "الرجاء إدخال رقم الطلب",
                EMPTY_BUILDING_NAME: "الرجاء إدخال إسم البناء",
                EMPTY_FLAT_NO: "الرجاء إدخال رقم الشقة",
                EMPTY_MAP_LOCATION: "الرجاْء إختيار الموقع"
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
        PAYMENT_ADD_ON_SDM_FAILURE: "Failure in adding payment on sdm",
        SDM_ORDER_PRE_CONDITION_FAILURE: "Failure in order pre condition wrt SDM",
        SDM_ORDER_FAIL: "Error in creating order on SDM"
    }
};

export const CONF = {
    GENERAL: {
        DEFAULT_CART_TTL: 24 * 60 * 60,//seconds
        USERCHANGE_TTL: 15 * 60,//seconds
        BY_PASS_OTP: 1212,
        OTP_EXPIRE_TIME: (10 * 60 * 1000), //millisecond
        ACCESS_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
        REFRESH_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
        MAX_PENDING_STATE_TIME: (10 * 60 * 1000),//millisecond
        PAYMENT_API_TIMEOUT: 3 * 1000,// 1 sec
        PAYMENT_API_KEY_PREFIX: "Key_",
        DISPLAY_COLOR: true,
        DEEPLINK_FALLBACK: 'https://uae.kfc.me//',
        AUTH_MECH: "Bearer",
        ADDR_SHOW_TIME: 3,//hr
        TRACK_ORDER_UNITIL: (2 * 60 * 60 * 1000),
        ANDROID_SCHEME_HOST: "https://",
        ANDROID_PACKAGE_NAME: "com.android.kfc",
        IOS_SCHEME_HOST: "americanaKFCUAE://",
        SPLASH_EXPR_TIME: 1589523974000,
        CHUNK_SIZE_USER_MIGRATION: 1000,
        PAYMENT_SUCCESS_FALLBACK: "payment/success",
        PAYMENT_FAILURE_FALLBACK: "payment/failure",
        DELIVERY_CHARGE_ID: 279,
        IMG_ETAG_THRESHOLD: (2 * 60 * 60 * 1000),
        SDM_STORE_TIME_OFFSET: (4 * 60 * 60 * 1000),

        MAX_OTP_RETRY: 5,
        OTP_COOLDOWN: 30 * 60,//seconds
        DEFAULT_RETRY_COUNT: 3,
        CONTACTLESS_VISBILE: true,
        CONTACTLESS_CLICK_ENABLE: true,
        ORDERSTATUS_RESET: 24 * 60 * 60,//seconds
    },
    COUNTRY_SPECIFIC: {
        UAE: {
            COUNTRY_CODE: "UAE",
            COUNTRY_NAME: "United Arab Emirates",
            BASE_CURRENCY: "AED",
            HOME_OVERLAY: {
                En: {
                    "mediaUrl": "covid-poppup-mob-en.png",
                    "gif": "",
                    "mediaType": "image",
                    "extension": "png",
                    "action": {
                        "id": 1,
                        "type": "pickup_carhop",
                        "delimeters": "delimeters"
                    }
                },
                Ar: {
                    "mediaUrl": "covid-poppup-mob-arb.png",
                    "gif": "",
                    "mediaType": "image",
                    "extension": "png",
                    "action": {
                        "id": 1,
                        "type": "pickup_carhop",
                        "delimeters": "delimeters"
                    }
                }
            },
            CHANNEL_DATA: [
                {
                    template_id: 17,
                    template_status: 1,
                    channel_name: "App",
                    menu_data: [
                        {
                            menu_id: 1,
                            menu_state: 1,
                            menu_cluster: 0,
                            frequency_cron: 1,
                            time_cron: 1
                        }
                    ]
                }
            ],
            ADDRESS_TYPE: [
                {
                    type: DATABASE.TYPE.ADDRESS.DELIVERY.TYPE,
                    enable: true,
                    subType: [{
                        type: DATABASE.TYPE.ADDRESS.DELIVERY.SUBTYPE.DELIVERY,
                        enable: true
                    }]
                },
                {
                    type: DATABASE.TYPE.ADDRESS.PICKUP.TYPE,
                    enable: true,
                    subType: [{
                        type: DATABASE.TYPE.ADDRESS.PICKUP.SUBTYPE.CARHOP,
                        enable: true
                    },
                    {
                        type: DATABASE.TYPE.ADDRESS.PICKUP.SUBTYPE.STORE,
                        enable: true
                    }]
                }
            ],
            SDM: {
                SDM_URL: "https://sdkuatuae.americana.com.sa:1995/?wsdl",
                LICENSE_CODE: "PizzaHutApp",// "AmericanaWeb",
                CONCEPT_ID: 3,
                MENU_TEMPLATE_ID: 17
            },
            CCODE: "+971",
            CUSTOMER_CARE: "600522252",
            SUPPORT_EMAIL: "digiteam@americana-food.com",
            MIN_CART_VALUE: 23,//AED
            MIN_COD_CART_VALUE: 300,//AED
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
            SYNC: {
                MAX_RETRY: {
                    CREATE: 5,
                    UPDATE: 5,
                    GET: 5,
                    SYNC: 5,
                    RESET: 5
                }
            },
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
            },
            FAQ: {
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
    ORDER_STATUS: {
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
            MONGO: "CART",
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
                GET: 10000,
                GET_ONCE: 0,
                GET_MAX: 65000,
                NEXT_PING: 15,
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
                NEXT_PING: 10,
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
                NEXT_PING: 10,
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
                NEXT_PING: 60,
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
                NEXT_PING: 60,
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
                NEXT_PING: 60,
            }
        },
    },
    PAYMENT: {
        main_website_store: {
            channel: 'Mobile',
            decimal: 2,
            noonpayConfig: {
                brandCode: 'KFC',
                countryCode: 'UAE',
                currencyCode: 'AED',
                paymentMethods: [
                    {
                        id: 1,
                        name: 'Card',
                        orderCategory: 'kfc_3ds'
                    }
                ],
                paymentRetryInterval: 10 * 1000, // in milliseconds
                maxTry: 2,
                noonpayOrderExpirationTime: 10 * 60 * 1000, // in milliseconds (10min)
                businessIdentifier: 'americana_test_cognizant',
                appIdentifier: 'kfc_uae_test',
                appAccessKey: '65c5cc823a3f4c079de1c2928d927ebd',
                apiKey: "",
                environment: 'Test', // Test or Live
                noonpayBaseUrl: 'https://api.noonpayments.com/payment/v1',
                noonpayInitiatePaymentEndPoint: '/order',
                noonpayGetOrderEndPoint: '/order',
                noonpayGetOrderByReferenceEndPoint: '/order/GetByReference',
                noonpayCapturePaymentEndPoint: '/order',
                noonpayReversePaymentEndPoint: '/order',
                noonpayRefundPaymentEndPoint: '/order',
                code: "noonpay",
                status: 1,
                styleProfile: "KFC_Theme_1"
            },
            codInfo: {
                status: 1,
                title: 'Cash On Delivery',
                min_order_total: null,
                max_order_total: null,
                code: "cashondelivery",
                SDM: {
                    PAY_STATUS: 1,
                    PAY_STORE_TENDERID: 252,
                    PAY_SUB_TYPE: 2,
                    PAY_TYPE: 2,
                }
            }
        }
    },
    SHIPMENT: {
        main_website_store: {
            free_shipping: {
                status: "1",
                title: "Free Shipping",
                min_order_total: "1",
                price: 0,
                code: "freeshipping"
            },
            flat_rate: {
                status: "1",
                title: "Flat Rate",
                price: 6.5,
                code: "flatrate"
            }
        }
    }
}

export const APP_VERSION = {
    ANDROID: [{
        id: 1,
        type: "NORMAL",
        deviceType: "ANDROID",
        appversion: "1.0.0",
        isActive: 1,
        createdAt: 1586639026000,
        updatedAt: 1586639026000
    }],
    IOS: [{
        id: 2,
        type: "NORMAL",
        deviceType: "IOS",
        appversion: "1.0.0",
        isActive: 1,
        createdAt: 1586639026000,
        updatedAt: 1586639026000
    }]
}

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
    user_change_ttl: number,
    max_pending_state: number,
    payment_api_timeout: number,
    payment_api_key_prefix: string,
    display_color: boolean,
    deeplink_fallback: string,
    auth_mech: string,
    addr_show_time: number
}
export const generalConfigSync = function (config: IGeneral, date: number) {
    CONF.GENERAL.DEFAULT_CART_TTL = config.ttl_for_cart;
    CONF.GENERAL.BY_PASS_OTP = config.bypass_otp;
    CONF.GENERAL.OTP_EXPIRE_TIME = config.otp_expire;
    CONF.GENERAL.ACCESS_TOKEN_EXPIRE_TIME = config.access_token_expire_time;
    CONF.GENERAL.REFRESH_TOKEN_EXPIRE_TIME = config.refresh_token_expire_time;
    CONF.GENERAL.PAYMENT_API_KEY_PREFIX = config.payment_api_key_prefix;
    CONF.GENERAL.USERCHANGE_TTL = config.user_change_ttl;
    CONF.GENERAL.MAX_PENDING_STATE_TIME = config.max_pending_state;
    CONF.GENERAL.PAYMENT_API_TIMEOUT = config.payment_api_timeout;
    CONF.GENERAL.DEEPLINK_FALLBACK = config.deeplink_fallback;
    CONF.GENERAL.ADDR_SHOW_TIME = config.addr_show_time;
    CONF.GENERAL.AUTH_MECH = config.auth_mech;
    CONF.GENERAL.DISPLAY_COLOR = config.display_color;
    // reg_ex_for_validation: config.reg_ex_for_validation ? config.reg_ex_for_validation : String.raw`^[1-9]\\d{8}$|^[1-9]\\d{8}$`

    // CONF.GENERAL.TRACK_ORDER_UNITIL = ;
    // CONF.GENERAL.ANDROID_SCHEME_HOST = ;
    // CONF.GENERAL.ANDROID_PACKAGE_NAME = ;
    // CONF.GENERAL.IOS_SCHEME_HOST = ;
    // CONF.GENERAL.SPLASH_EXPR_TIME = ;
    // CONF.GENERAL.CHUNK_SIZE_USER_MIGRATION = ;
    // CONF.GENERAL.PAYMENT_SUCCESS_FALLBACK = ;
    // CONF.GENERAL.PAYMENT_FAILURE_FALLBACK = ;
    // CONF.GENERAL.DELIVERY_CHARGE_ID = ;
    // CONF.GENERAL.IMG_ETAG_THRESHOLD = ;

    console.log(`General Configs--------------->${JSON.stringify(CONF.GENERAL)}`)

    global.configSync.general = date;
    return {}
}

interface IKafka {
    sdm?: {
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
            max_try: IMaxRetry,
            interval: {
                get: number,
                get_once: number,
                get_max: number,
                next_ping: number
            }
        }
    },
    cms?: {
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
    as?: {
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
                    CONF.KAFKA.AS.USER.MAX_RETRY.CREATE = config.as.user_config.max_try.create
                if (config.as.user_config.max_try.update)
                    CONF.KAFKA.AS.USER.MAX_RETRY.UPDATE = config.as.user_config.max_try.update
                if (config.as.user_config.max_try.get)
                    CONF.KAFKA.AS.USER.MAX_RETRY.GET = config.as.user_config.max_try.get
                if (config.as.user_config.max_try.sync)
                    CONF.KAFKA.AS.USER.MAX_RETRY.SYNC = config.as.user_config.max_try.sync
                if (config.as.user_config.max_try.reset)
                    CONF.KAFKA.AS.USER.MAX_RETRY.RESET = config.as.user_config.max_try.reset
            }
        }
        if (config.as.address_config) {
            if (config.as.address_config.max_try) {
                if (config.as.address_config.max_try.create)
                    CONF.KAFKA.AS.ADDRESS.MAX_RETRY.CREATE = config.as.address_config.max_try.create
                if (config.as.address_config.max_try.update)
                    CONF.KAFKA.AS.ADDRESS.MAX_RETRY.UPDATE = config.as.address_config.max_try.update
                if (config.as.address_config.max_try.get)
                    CONF.KAFKA.AS.ADDRESS.MAX_RETRY.GET = config.as.address_config.max_try.get
                if (config.as.address_config.max_try.sync)
                    CONF.KAFKA.AS.ADDRESS.MAX_RETRY.SYNC = config.as.address_config.max_try.sync
                if (config.as.address_config.max_try.reset)
                    CONF.KAFKA.AS.ADDRESS.MAX_RETRY.RESET = config.as.address_config.max_try.reset
            }
        }
        if (config.as.menu_config) {
            if (config.as.menu_config.max_try) {
                if (config.as.menu_config.max_try.create)
                    CONF.KAFKA.AS.MENU.MAX_RETRY.CREATE = config.as.menu_config.max_try.create
                if (config.as.menu_config.max_try.update)
                    CONF.KAFKA.AS.MENU.MAX_RETRY.UPDATE = config.as.menu_config.max_try.update
                if (config.as.menu_config.max_try.get)
                    CONF.KAFKA.AS.MENU.MAX_RETRY.GET = config.as.menu_config.max_try.get
                if (config.as.menu_config.max_try.sync)
                    CONF.KAFKA.AS.MENU.MAX_RETRY.SYNC = config.as.menu_config.max_try.sync
                if (config.as.menu_config.max_try.reset)
                    CONF.KAFKA.AS.MENU.MAX_RETRY.RESET = config.as.menu_config.max_try.reset
            }
        }
        if (config.as.promotion_config) {
            if (config.as.promotion_config.max_try) {
                if (config.as.promotion_config.max_try.create)
                    CONF.KAFKA.AS.PROMOTION.MAX_RETRY.CREATE = config.as.promotion_config.max_try.create
                if (config.as.promotion_config.max_try.update)
                    CONF.KAFKA.AS.PROMOTION.MAX_RETRY.UPDATE = config.as.promotion_config.max_try.update
                if (config.as.promotion_config.max_try.get)
                    CONF.KAFKA.AS.PROMOTION.MAX_RETRY.GET = config.as.promotion_config.max_try.get
                if (config.as.promotion_config.max_try.sync)
                    CONF.KAFKA.AS.PROMOTION.MAX_RETRY.SYNC = config.as.promotion_config.max_try.sync
                if (config.as.promotion_config.max_try.reset)
                    CONF.KAFKA.AS.PROMOTION.MAX_RETRY.RESET = config.as.promotion_config.max_try.reset
            }
        }
        if (config.as.hidden_config) {
            if (config.as.hidden_config.max_try) {
                if (config.as.hidden_config.max_try.create)
                    CONF.KAFKA.AS.HIDDEN.MAX_RETRY.CREATE = config.as.hidden_config.max_try.create
                if (config.as.hidden_config.max_try.update)
                    CONF.KAFKA.AS.HIDDEN.MAX_RETRY.UPDATE = config.as.hidden_config.max_try.update
                if (config.as.hidden_config.max_try.get)
                    CONF.KAFKA.AS.HIDDEN.MAX_RETRY.GET = config.as.hidden_config.max_try.get
                if (config.as.hidden_config.max_try.sync)
                    CONF.KAFKA.AS.HIDDEN.MAX_RETRY.SYNC = config.as.hidden_config.max_try.sync
                if (config.as.hidden_config.max_try.reset)
                    CONF.KAFKA.AS.HIDDEN.MAX_RETRY.RESET = config.as.hidden_config.max_try.reset
            }
        }
        if (config.as.configuration_config) {
            if (config.as.configuration_config.max_try) {
                if (config.as.configuration_config.max_try.create)
                    CONF.KAFKA.AS.CONFIG.MAX_RETRY.CREATE = config.as.configuration_config.max_try.create
                if (config.as.configuration_config.max_try.update)
                    CONF.KAFKA.AS.CONFIG.MAX_RETRY.UPDATE = config.as.configuration_config.max_try.update
                if (config.as.configuration_config.max_try.get)
                    CONF.KAFKA.AS.CONFIG.MAX_RETRY.GET = config.as.configuration_config.max_try.get
                if (config.as.configuration_config.max_try.sync)
                    CONF.KAFKA.AS.CONFIG.MAX_RETRY.SYNC = config.as.configuration_config.max_try.sync
                if (config.as.configuration_config.max_try.reset)
                    CONF.KAFKA.AS.CONFIG.MAX_RETRY.RESET = config.as.configuration_config.max_try.reset
            }
        }
        if (config.as.app_config) {
            if (config.as.app_config.max_try) {
                if (config.as.app_config.max_try.create)
                    CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.CREATE = config.as.app_config.max_try.create
                if (config.as.app_config.max_try.update)
                    CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.UPDATE = config.as.app_config.max_try.update
                if (config.as.app_config.max_try.get)
                    CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.GET = config.as.app_config.max_try.get
                if (config.as.app_config.max_try.sync)
                    CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.SYNC = config.as.app_config.max_try.sync
                if (config.as.app_config.max_try.reset)
                    CONF.KAFKA.AS.APP_VERSION.MAX_RETRY.RESET = config.as.app_config.max_try.reset
            }
        }
    }
    if (config.cms) {
        if (config.cms.user_config) {
            if (config.cms.user_config.max_try) {
                if (config.cms.user_config.max_try.create)
                    CONF.KAFKA.CMS.USER.MAX_RETRY.CREATE = config.cms.user_config.max_try.create
                if (config.cms.user_config.max_try.update)
                    CONF.KAFKA.CMS.USER.MAX_RETRY.UPDATE = config.cms.user_config.max_try.update
                if (config.cms.user_config.max_try.get)
                    CONF.KAFKA.CMS.USER.MAX_RETRY.GET = config.cms.user_config.max_try.get
                if (config.cms.user_config.max_try.sync)
                    CONF.KAFKA.CMS.USER.MAX_RETRY.SYNC = config.cms.user_config.max_try.sync
                if (config.cms.user_config.max_try.reset)
                    CONF.KAFKA.CMS.USER.MAX_RETRY.RESET = config.cms.user_config.max_try.reset
            }
        }
        if (config.cms.address_config) {
            if (config.cms.address_config.max_try) {
                if (config.cms.address_config.max_try.create)
                    CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.CREATE = config.cms.address_config.max_try.create
                if (config.cms.address_config.max_try.update)
                    CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.UPDATE = config.cms.address_config.max_try.update
                if (config.cms.address_config.max_try.get)
                    CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.GET = config.cms.address_config.max_try.get
                if (config.cms.address_config.max_try.sync)
                    CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.SYNC = config.cms.address_config.max_try.sync
                if (config.cms.address_config.max_try.reset)
                    CONF.KAFKA.CMS.ADDRESS.MAX_RETRY.RESET = config.cms.address_config.max_try.reset
            }
        }
        if (config.cms.menu_config) {
            if (config.cms.menu_config.max_try) {
                if (config.cms.menu_config.max_try.create)
                    CONF.KAFKA.CMS.MENU.MAX_RETRY.CREATE = config.cms.menu_config.max_try.create
                if (config.cms.menu_config.max_try.update)
                    CONF.KAFKA.CMS.MENU.MAX_RETRY.UPDATE = config.cms.menu_config.max_try.update
                if (config.cms.menu_config.max_try.get)
                    CONF.KAFKA.CMS.MENU.MAX_RETRY.GET = config.cms.menu_config.max_try.get
                if (config.cms.menu_config.max_try.sync)
                    CONF.KAFKA.CMS.MENU.MAX_RETRY.SYNC = config.cms.menu_config.max_try.sync
                if (config.cms.menu_config.max_try.reset)
                    CONF.KAFKA.CMS.MENU.MAX_RETRY.RESET = config.cms.menu_config.max_try.reset
            }
        }
        if (config.cms.promotion_config) {
            if (config.cms.promotion_config.max_try) {
                if (config.cms.promotion_config.max_try.create)
                    CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.CREATE = config.cms.promotion_config.max_try.create
                if (config.cms.promotion_config.max_try.update)
                    CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.UPDATE = config.cms.promotion_config.max_try.update
                if (config.cms.promotion_config.max_try.get)
                    CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.GET = config.cms.promotion_config.max_try.get
                if (config.cms.promotion_config.max_try.sync)
                    CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.SYNC = config.cms.promotion_config.max_try.sync
                if (config.cms.promotion_config.max_try.reset)
                    CONF.KAFKA.CMS.PROMOTION.MAX_RETRY.RESET = config.cms.promotion_config.max_try.reset
            }
        }
        if (config.cms.hidden_config) {
            if (config.cms.hidden_config.max_try) {
                if (config.cms.hidden_config.max_try.create)
                    CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.CREATE = config.cms.hidden_config.max_try.create
                if (config.cms.hidden_config.max_try.update)
                    CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.UPDATE = config.cms.hidden_config.max_try.update
                if (config.cms.hidden_config.max_try.get)
                    CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.GET = config.cms.hidden_config.max_try.get
                if (config.cms.hidden_config.max_try.sync)
                    CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.SYNC = config.cms.hidden_config.max_try.sync
                if (config.cms.hidden_config.max_try.reset)
                    CONF.KAFKA.CMS.HIDDEN.MAX_RETRY.RESET = config.cms.hidden_config.max_try.reset
            }
        }
    }
    if (config.sdm) {
        if (config.sdm.user_config) {
            if (config.sdm.user_config.max_try) {
                if (config.sdm.user_config.max_try.create)
                    CONF.KAFKA.SDM.USER.MAX_RETRY.CREATE = config.sdm.user_config.max_try.create
                if (config.sdm.user_config.max_try.update)
                    CONF.KAFKA.SDM.USER.MAX_RETRY.UPDATE = config.sdm.user_config.max_try.update
                if (config.sdm.user_config.max_try.get)
                    CONF.KAFKA.SDM.USER.MAX_RETRY.GET = config.sdm.user_config.max_try.get
                if (config.sdm.user_config.max_try.sync)
                    CONF.KAFKA.SDM.USER.MAX_RETRY.SYNC = config.sdm.user_config.max_try.sync
                if (config.sdm.user_config.max_try.reset)
                    CONF.KAFKA.SDM.USER.MAX_RETRY.RESET = config.sdm.user_config.max_try.reset
            }
        }
        if (config.sdm.address_config) {
            if (config.sdm.address_config.max_try) {
                if (config.sdm.address_config.max_try.create)
                    CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.CREATE = config.sdm.address_config.max_try.create
                if (config.sdm.address_config.max_try.update)
                    CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.UPDATE = config.sdm.address_config.max_try.update
                if (config.sdm.address_config.max_try.get)
                    CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.GET = config.sdm.address_config.max_try.get
                if (config.sdm.address_config.max_try.sync)
                    CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.SYNC = config.sdm.address_config.max_try.sync
                if (config.sdm.address_config.max_try.reset)
                    CONF.KAFKA.SDM.ADDRESS.MAX_RETRY.RESET = config.sdm.address_config.max_try.reset
            }
        }
        if (config.sdm.menu_config) {
            if (config.sdm.menu_config.max_try) {
                if (config.sdm.menu_config.max_try.create)
                    CONF.KAFKA.SDM.MENU.MAX_RETRY.CREATE = config.sdm.menu_config.max_try.create
                if (config.sdm.menu_config.max_try.update)
                    CONF.KAFKA.SDM.MENU.MAX_RETRY.UPDATE = config.sdm.menu_config.max_try.update
                if (config.sdm.menu_config.max_try.get)
                    CONF.KAFKA.SDM.MENU.MAX_RETRY.GET = config.sdm.menu_config.max_try.get
                if (config.sdm.menu_config.max_try.sync)
                    CONF.KAFKA.SDM.MENU.MAX_RETRY.SYNC = config.sdm.menu_config.max_try.sync
                if (config.sdm.menu_config.max_try.reset)
                    CONF.KAFKA.SDM.MENU.MAX_RETRY.RESET = config.sdm.menu_config.max_try.reset
            }
        }
        if (config.sdm.promotion_config) {
            if (config.sdm.promotion_config.max_try) {
                if (config.sdm.promotion_config.max_try.create)
                    CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.CREATE = config.sdm.promotion_config.max_try.create
                if (config.sdm.promotion_config.max_try.update)
                    CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.UPDATE = config.sdm.promotion_config.max_try.update
                if (config.sdm.promotion_config.max_try.get)
                    CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.GET = config.sdm.promotion_config.max_try.get
                if (config.sdm.promotion_config.max_try.sync)
                    CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.SYNC = config.sdm.promotion_config.max_try.sync
                if (config.sdm.promotion_config.max_try.reset)
                    CONF.KAFKA.SDM.PROMOTION.MAX_RETRY.RESET = config.sdm.promotion_config.max_try.reset
            }
        }
        if (config.sdm.hidden_config) {
            if (config.sdm.hidden_config.max_try) {
                if (config.sdm.hidden_config.max_try.create)
                    CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.CREATE = config.sdm.hidden_config.max_try.create
                if (config.sdm.hidden_config.max_try.update)
                    CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.UPDATE = config.sdm.hidden_config.max_try.update
                if (config.sdm.hidden_config.max_try.get)
                    CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.GET = config.sdm.hidden_config.max_try.get
                if (config.sdm.hidden_config.max_try.sync)
                    CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.SYNC = config.sdm.hidden_config.max_try.sync
                if (config.sdm.hidden_config.max_try.reset)
                    CONF.KAFKA.SDM.HIDDEN.MAX_RETRY.RESET = config.sdm.hidden_config.max_try.reset
            }
        }
        if (config.sdm.order_config) {
            if (config.sdm.order_config.max_try) {
                if (config.sdm.order_config.max_try.create)
                    CONF.KAFKA.SDM.ORDER.MAX_RETRY.CREATE = config.sdm.order_config.max_try.create
                if (config.sdm.order_config.max_try.update)
                    CONF.KAFKA.SDM.ORDER.MAX_RETRY.UPDATE = config.sdm.order_config.max_try.update
                if (config.sdm.order_config.max_try.get)
                    CONF.KAFKA.SDM.ORDER.MAX_RETRY.GET = config.sdm.order_config.max_try.get
                if (config.sdm.order_config.max_try.sync)
                    CONF.KAFKA.SDM.ORDER.MAX_RETRY.SYNC = config.sdm.order_config.max_try.sync
                if (config.sdm.order_config.max_try.reset)
                    CONF.KAFKA.SDM.ORDER.MAX_RETRY.RESET = config.sdm.order_config.max_try.reset
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

    console.log(`Kafka Configs--------------->${JSON.stringify(CONF.KAFKA)}`)

    global.configSync.kafka = date;
    return {}
}

interface IOrderStatus {
    cart_config?: IStatus,
    pending_config?: IStatus,
    confirmed_config?: IStatus,
    prepared_config?: IStatus,
    ready_config?: IStatus,
    ontheway_config?: IStatus,
    delivered_config?: IStatus,
    closed_config?: IStatus,
    cancelled_config?: IStatus,
    failure_config?: IStatus
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
            CONF.ORDER_STATUS.CART.AS = config.cart_config.as
        if (config.cart_config.mongo)
            CONF.ORDER_STATUS.CART.MONGO = config.cart_config.mongo
        if (config.cart_config.cms)
            CONF.ORDER_STATUS.CART.CMS = config.cart_config.cms
        if (config.cart_config.sdm)
            CONF.ORDER_STATUS.CART.SDM = config.cart_config.sdm
        if (config.cart_config.freq) {
            if (config.cart_config.freq.get)
                CONF.ORDER_STATUS.CART.FREQ.GET = config.cart_config.freq.get
            if (config.cart_config.freq.geet_once)
                CONF.ORDER_STATUS.CART.FREQ.GET_ONCE = config.cart_config.freq.geet_once
            if (config.cart_config.freq.get_max)
                CONF.ORDER_STATUS.CART.FREQ.GET_MAX = config.cart_config.freq.get_max
            if (config.cart_config.freq.next_ping)
                CONF.ORDER_STATUS.CART.FREQ.NEXT_PING = config.cart_config.freq.next_ping
        }
    }
    if (config.pending_config) {
        if (config.pending_config.as)
            CONF.ORDER_STATUS.PENDING.AS = config.pending_config.as
        if (config.pending_config.mongo)
            CONF.ORDER_STATUS.PENDING.MONGO = config.pending_config.mongo
        if (config.pending_config.cms)
            CONF.ORDER_STATUS.PENDING.CMS = config.pending_config.cms
        if (config.pending_config.sdm)
            CONF.ORDER_STATUS.PENDING.SDM = config.pending_config.sdm
        if (config.pending_config.freq) {
            if (config.pending_config.freq.get)
                CONF.ORDER_STATUS.PENDING.FREQ.GET = config.pending_config.freq.get
            if (config.pending_config.freq.geet_once)
                CONF.ORDER_STATUS.PENDING.FREQ.GET_ONCE = config.pending_config.freq.geet_once
            if (config.pending_config.freq.get_max)
                CONF.ORDER_STATUS.PENDING.FREQ.GET_MAX = config.pending_config.freq.get_max
            if (config.pending_config.freq.next_ping)
                CONF.ORDER_STATUS.PENDING.FREQ.NEXT_PING = config.pending_config.freq.next_ping
        }
    }
    if (config.confirmed_config) {
        if (config.confirmed_config.as)
            CONF.ORDER_STATUS.CONFIRMED.AS = config.confirmed_config.as
        if (config.confirmed_config.mongo)
            CONF.ORDER_STATUS.CONFIRMED.MONGO = config.confirmed_config.mongo
        if (config.confirmed_config.cms)
            CONF.ORDER_STATUS.CONFIRMED.CMS = config.confirmed_config.cms
        if (config.confirmed_config.sdm)
            CONF.ORDER_STATUS.CONFIRMED.SDM = config.confirmed_config.sdm
        if (config.confirmed_config.freq) {
            if (config.confirmed_config.freq.get)
                CONF.ORDER_STATUS.CONFIRMED.FREQ.GET = config.confirmed_config.freq.get
            if (config.confirmed_config.freq.geet_once)
                CONF.ORDER_STATUS.CONFIRMED.FREQ.GET_ONCE = config.confirmed_config.freq.geet_once
            if (config.confirmed_config.freq.get_max)
                CONF.ORDER_STATUS.CONFIRMED.FREQ.GET_MAX = config.confirmed_config.freq.get_max
            if (config.confirmed_config.freq.next_ping)
                CONF.ORDER_STATUS.CONFIRMED.FREQ.NEXT_PING = config.confirmed_config.freq.next_ping
        }
    }
    if (config.prepared_config) {
        if (config.prepared_config.as)
            CONF.ORDER_STATUS.BEING_PREPARED.AS = config.prepared_config.as
        if (config.prepared_config.mongo)
            CONF.ORDER_STATUS.BEING_PREPARED.MONGO = config.prepared_config.mongo
        if (config.prepared_config.cms)
            CONF.ORDER_STATUS.BEING_PREPARED.CMS = config.prepared_config.cms
        if (config.prepared_config.sdm)
            CONF.ORDER_STATUS.BEING_PREPARED.SDM = config.prepared_config.sdm
        if (config.prepared_config.freq) {
            if (config.prepared_config.freq.get)
                CONF.ORDER_STATUS.BEING_PREPARED.FREQ.GET = config.prepared_config.freq.get
            if (config.prepared_config.freq.geet_once)
                CONF.ORDER_STATUS.BEING_PREPARED.FREQ.GET_ONCE = config.prepared_config.freq.geet_once
            if (config.prepared_config.freq.get_max)
                CONF.ORDER_STATUS.BEING_PREPARED.FREQ.GET_MAX = config.prepared_config.freq.get_max
            if (config.prepared_config.freq.next_ping)
                CONF.ORDER_STATUS.BEING_PREPARED.FREQ.NEXT_PING = config.prepared_config.freq.next_ping
        }
    }
    if (config.ready_config) {
        if (config.ready_config.as)
            CONF.ORDER_STATUS.READY.AS = config.ready_config.as
        if (config.ready_config.mongo)
            CONF.ORDER_STATUS.READY.MONGO = config.ready_config.mongo
        if (config.ready_config.cms)
            CONF.ORDER_STATUS.READY.CMS = config.ready_config.cms
        if (config.ready_config.sdm)
            CONF.ORDER_STATUS.READY.SDM = config.ready_config.sdm
        if (config.ready_config.freq) {
            if (config.ready_config.freq.get)
                CONF.ORDER_STATUS.READY.FREQ.GET = config.ready_config.freq.get
            if (config.ready_config.freq.geet_once)
                CONF.ORDER_STATUS.READY.FREQ.GET_ONCE = config.ready_config.freq.geet_once
            if (config.ready_config.freq.get_max)
                CONF.ORDER_STATUS.READY.FREQ.GET_MAX = config.ready_config.freq.get_max
            if (config.ready_config.freq.next_ping)
                CONF.ORDER_STATUS.READY.FREQ.NEXT_PING = config.ready_config.freq.next_ping
        }
    }
    if (config.ontheway_config) {
        if (config.ontheway_config.as)
            CONF.ORDER_STATUS.ON_THE_WAY.AS = config.ontheway_config.as
        if (config.ontheway_config.mongo)
            CONF.ORDER_STATUS.ON_THE_WAY.MONGO = config.ontheway_config.mongo
        if (config.ontheway_config.cms)
            CONF.ORDER_STATUS.ON_THE_WAY.CMS = config.ontheway_config.cms
        if (config.ontheway_config.sdm)
            CONF.ORDER_STATUS.ON_THE_WAY.SDM = config.ontheway_config.sdm
        if (config.ontheway_config.freq) {
            if (config.ontheway_config.freq.get)
                CONF.ORDER_STATUS.ON_THE_WAY.FREQ.GET = config.ontheway_config.freq.get
            if (config.ontheway_config.freq.geet_once)
                CONF.ORDER_STATUS.ON_THE_WAY.FREQ.GET_ONCE = config.ontheway_config.freq.geet_once
            if (config.ontheway_config.freq.get_max)
                CONF.ORDER_STATUS.ON_THE_WAY.FREQ.GET_MAX = config.ontheway_config.freq.get_max
            if (config.ontheway_config.freq.next_ping)
                CONF.ORDER_STATUS.ON_THE_WAY.FREQ.NEXT_PING = config.ontheway_config.freq.next_ping
        }
    }
    if (config.delivered_config) {
        if (config.delivered_config.as)
            CONF.ORDER_STATUS.DELIVERED.AS = config.delivered_config.as
        if (config.delivered_config.mongo)
            CONF.ORDER_STATUS.DELIVERED.MONGO = config.delivered_config.mongo
        if (config.delivered_config.cms)
            CONF.ORDER_STATUS.DELIVERED.CMS = config.delivered_config.cms
        if (config.delivered_config.sdm)
            CONF.ORDER_STATUS.DELIVERED.SDM = config.delivered_config.sdm
        if (config.delivered_config.freq) {
            if (config.delivered_config.freq.get)
                CONF.ORDER_STATUS.DELIVERED.FREQ.GET = config.delivered_config.freq.get
            if (config.delivered_config.freq.geet_once)
                CONF.ORDER_STATUS.DELIVERED.FREQ.GET_ONCE = config.delivered_config.freq.geet_once
            if (config.delivered_config.freq.get_max)
                CONF.ORDER_STATUS.DELIVERED.FREQ.GET_MAX = config.delivered_config.freq.get_max
            if (config.delivered_config.freq.next_ping)
                CONF.ORDER_STATUS.DELIVERED.FREQ.NEXT_PING = config.delivered_config.freq.next_ping
        }
    }
    if (config.closed_config) {
        if (config.closed_config.as)
            CONF.ORDER_STATUS.CLOSED.AS = config.closed_config.as
        if (config.closed_config.mongo)
            CONF.ORDER_STATUS.CLOSED.MONGO = config.closed_config.mongo
        if (config.closed_config.cms)
            CONF.ORDER_STATUS.CLOSED.CMS = config.closed_config.cms
        if (config.closed_config.sdm)
            CONF.ORDER_STATUS.CLOSED.SDM = config.closed_config.sdm
        if (config.closed_config.freq) {
            if (config.closed_config.freq.get)
                CONF.ORDER_STATUS.CLOSED.FREQ.GET = config.closed_config.freq.get
            if (config.closed_config.freq.geet_once)
                CONF.ORDER_STATUS.CLOSED.FREQ.GET_ONCE = config.closed_config.freq.geet_once
            if (config.closed_config.freq.get_max)
                CONF.ORDER_STATUS.CLOSED.FREQ.GET_MAX = config.closed_config.freq.get_max
            if (config.closed_config.freq.next_ping)
                CONF.ORDER_STATUS.CLOSED.FREQ.NEXT_PING = config.closed_config.freq.next_ping
        }
    }
    if (config.cancelled_config) {
        if (config.cancelled_config.as)
            CONF.ORDER_STATUS.CANCELED.AS = config.cancelled_config.as
        if (config.cancelled_config.mongo)
            CONF.ORDER_STATUS.CANCELED.MONGO = config.cancelled_config.mongo
        if (config.cancelled_config.cms)
            CONF.ORDER_STATUS.CANCELED.CMS = config.cancelled_config.cms
        if (config.cancelled_config.sdm)
            CONF.ORDER_STATUS.CANCELED.SDM = config.cancelled_config.sdm
        if (config.cancelled_config.freq) {
            if (config.cancelled_config.freq.get)
                CONF.ORDER_STATUS.CANCELED.FREQ.GET = config.cancelled_config.freq.get
            if (config.cancelled_config.freq.geet_once)
                CONF.ORDER_STATUS.CANCELED.FREQ.GET_ONCE = config.cancelled_config.freq.geet_once
            if (config.cancelled_config.freq.get_max)
                CONF.ORDER_STATUS.CANCELED.FREQ.GET_MAX = config.cancelled_config.freq.get_max
            if (config.cancelled_config.freq.next_ping)
                CONF.ORDER_STATUS.CANCELED.FREQ.NEXT_PING = config.cancelled_config.freq.next_ping
        }
    }
    if (config.failure_config) {
        if (config.failure_config.as)
            CONF.ORDER_STATUS.FAILURE.AS = config.failure_config.as
        if (config.failure_config.mongo)
            CONF.ORDER_STATUS.FAILURE.MONGO = config.failure_config.mongo
        if (config.failure_config.cms)
            CONF.ORDER_STATUS.FAILURE.CMS = config.failure_config.cms
        if (config.failure_config.sdm)
            CONF.ORDER_STATUS.FAILURE.SDM = config.failure_config.sdm
        if (config.failure_config.freq) {
            if (config.failure_config.freq.get)
                CONF.ORDER_STATUS.FAILURE.FREQ.GET = config.failure_config.freq.get
            if (config.failure_config.freq.geet_once)
                CONF.ORDER_STATUS.FAILURE.FREQ.GET_ONCE = config.failure_config.freq.geet_once
            if (config.failure_config.freq.get_max)
                CONF.ORDER_STATUS.FAILURE.FREQ.GET_MAX = config.failure_config.freq.get_max
            if (config.failure_config.freq.next_ping)
                CONF.ORDER_STATUS.FAILURE.FREQ.NEXT_PING = config.failure_config.freq.next_ping
        }
    }
    console.log(`Order status Configs--------------->${JSON.stringify(CONF.ORDER_STATUS)}`)
    global.configSync.orderStatus = date;
    return {}
}

interface IPayment {
    noonpayConfig: {
        channel: string,
        decimal: number,
        brandCode: string,
        countryCode: string,
        currencyCode: string,
        paymentMethods: IPaymentMethods[],
        paymentRetryInterval: number,
        maxTry: number,
        noonpayOrderExpirationTime: number,
        businessIdentifier: string,
        appIdentifier: string,
        appAccessKey: string,
        apiKey: string
        environment: string,
        noonpayBaseUrl: string,
        noonpayInitiatePaymentEndPoint: string,
        noonpayGetOrderEndPoint: string,
        noonpayGetOrderByReferenceEndPoint: string,
        noonpayCapturePaymentEndPoint: string,
        noonpayReversePaymentEndPoint: string,
        noonpayRefundPaymentEndPoint: string,
        code: string,
        status: number,
        // sdm: {
        //     pay_status: string,
        //     pay_store_tender_id: string,
        //     pay_sub_type: string,
        //     pay_type: string
        // }
    },
    codInfo: {
        status: number,
        name: string,
        code: string,
        min_order_total: number,
        max_order_total: number,
        // sdm: {
        //     pay_status: string,
        //     pay_store_tender_id: string,
        //     pay_sub_type: string,
        //     pay_type: string
        // }
    }
}
interface IPaymentMethods {
    id?: number,
    name?: string,
    orderCategory?: string
}
export const paymentConfigSync = function (store_code: string, config: IPayment, date: number) {
    if (config.noonpayConfig) {
        if (config.noonpayConfig.noonpayReversePaymentEndPoint)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayReversePaymentEndPoint = config.noonpayConfig.noonpayReversePaymentEndPoint
        if (config.noonpayConfig.noonpayOrderExpirationTime)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayOrderExpirationTime = config.noonpayConfig.noonpayOrderExpirationTime
        if (config.noonpayConfig.countryCode)
            CONF.PAYMENT[store_code].noonpayConfig.countryCode = config.noonpayConfig.countryCode
        if (config.noonpayConfig.businessIdentifier)
            CONF.PAYMENT[store_code].noonpayConfig.businessIdentifier = config.noonpayConfig.businessIdentifier
        if (config.noonpayConfig.appIdentifier)
            CONF.PAYMENT[store_code].noonpayConfig.appIdentifier = config.noonpayConfig.appIdentifier
        if (config.noonpayConfig.appAccessKey)
            CONF.PAYMENT[store_code].noonpayConfig.appAccessKey = config.noonpayConfig.appAccessKey
        if (config.noonpayConfig.apiKey)
            CONF.PAYMENT[store_code].noonpayConfig.apiKey = config.noonpayConfig.apiKey
        if (config.noonpayConfig.paymentMethods)
            CONF.PAYMENT[store_code].noonpayConfig.paymentMethods = config.noonpayConfig.paymentMethods
        if (config.noonpayConfig.code)
            CONF.PAYMENT[store_code].noonpayConfig.code = config.noonpayConfig.code
        if (config.noonpayConfig.decimal)
            CONF.PAYMENT[store_code].noonpayConfig.decimal = config.noonpayConfig.decimal

        if (config.noonpayConfig.status)
            CONF.PAYMENT[store_code].noonpayConfig.status = config.noonpayConfig.status
        if (config.noonpayConfig.environment)
            CONF.PAYMENT[store_code].noonpayConfig.environment = config.noonpayConfig.environment
        if (config.noonpayConfig.brandCode)
            CONF.PAYMENT[store_code].noonpayConfig.brandCode = config.noonpayConfig.brandCode
        if (config.noonpayConfig.noonpayGetOrderEndPoint)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayGetOrderEndPoint = config.noonpayConfig.noonpayGetOrderEndPoint
        if (config.noonpayConfig.noonpayBaseUrl)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayBaseUrl = config.noonpayConfig.noonpayBaseUrl
        if (config.noonpayConfig.maxTry)
            CONF.PAYMENT[store_code].noonpayConfig.maxTry = config.noonpayConfig.maxTry
        if (config.noonpayConfig.noonpayRefundPaymentEndPoint)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayRefundPaymentEndPoint = config.noonpayConfig.noonpayRefundPaymentEndPoint
        if (config.noonpayConfig.noonpayCapturePaymentEndPoint)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayCapturePaymentEndPoint = config.noonpayConfig.noonpayCapturePaymentEndPoint
        if (config.noonpayConfig.currencyCode)
            CONF.PAYMENT[store_code].noonpayConfig.currencyCode = config.noonpayConfig.currencyCode
        if (config.noonpayConfig.channel)
            CONF.PAYMENT[store_code].noonpayConfig.channel = config.noonpayConfig.channel
        if (config.noonpayConfig.noonpayInitiatePaymentEndPoint)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayInitiatePaymentEndPoint = config.noonpayConfig.noonpayInitiatePaymentEndPoint
        if (config.noonpayConfig.noonpayGetOrderByReferenceEndPoint)
            CONF.PAYMENT[store_code].noonpayConfig.noonpayGetOrderByReferenceEndPoint = config.noonpayConfig.noonpayGetOrderByReferenceEndPoint
        // if (config.noonpayConfig.sdm) {
        //     if (config.noonpayConfig.sdm.pay_status)
        //         CONF.PAYMENT[store_code].noonpayConfig.SDM.PAY_STATUS = config.noonpayConfig.sdm.pay_status
        //     if (config.noonpayConfig.sdm.pay_store_tender_id)
        //         CONF.PAYMENT[store_code].noonpayConfig.SDM.PAY_STORE_TENDERID = config.noonpayConfig.sdm.pay_store_tender_id
        //     if (config.noonpayConfig.sdm.pay_sub_type)
        //         CONF.PAYMENT[store_code].noonpayConfig.SDM.PAY_SUB_TYPE = config.noonpayConfig.sdm.pay_sub_type
        //     if (config.noonpayConfig.sdm.pay_type)
        //         CONF.PAYMENT[store_code].noonpayConfig.SDM.PAY_TYPE = config.noonpayConfig.sdm.pay_type
        // }
    }
    if (config.codInfo) {
        if (config.codInfo.min_order_total)
            CONF.PAYMENT[store_code].codInfo.min_order_total = config.codInfo.min_order_total
        if (config.codInfo.name)
            CONF.PAYMENT[store_code].codInfo.name = config.codInfo.name
        if (config.codInfo.code)
            CONF.PAYMENT[store_code].codInfo.code = config.codInfo.code
        if (config.codInfo.status)
            CONF.PAYMENT[store_code].codInfo.status = config.codInfo.status
        if (config.codInfo.max_order_total)
            CONF.PAYMENT[store_code].codInfo.max_order_total = config.codInfo.max_order_total
        // if (config.codInfo.sdm) {
        //     if (config.codInfo.sdm.pay_status)
        //         CONF.PAYMENT[store_code].codInfo.SDM.PAY_STATUS = config.codInfo.sdm.pay_status
        //     if (config.codInfo.sdm.pay_store_tender_id)
        //         CONF.PAYMENT[store_code].codInfo.SDM.PAY_STORE_TENDERID = config.codInfo.sdm.pay_store_tender_id
        //     if (config.codInfo.sdm.pay_sub_type)
        //         CONF.PAYMENT[store_code].codInfo.SDM.PAY_SUB_TYPE = config.codInfo.sdm.pay_sub_type
        //     if (config.codInfo.sdm.pay_type)
        //         CONF.PAYMENT[store_code].codInfo.SDM.PAY_TYPE = config.codInfo.sdm.pay_type
        // }
    }
    console.log(`Payment Configs--------------->${JSON.stringify(CONF.PAYMENT[store_code])}`)
    global.configSync.payment = date;
    return {}
}

interface IShipment {
    free_shipping: {
        status: string,
        title: string,
        min_order_total: string,
        price: number,
        code: string
    },
    flat_rate: {

        status: string,
        title: string,
        price: number,
        code: string
    }
}
export const shipmentConfigSync = function (store_code: string, config: IShipment, date: number) {
    if (config.flat_rate) {
        if (config.flat_rate.status)
            CONF.SHIPMENT[store_code].flat_rate.status = config.flat_rate.status
        if (config.flat_rate.title)
            CONF.SHIPMENT[store_code].flat_rate.title = config.flat_rate.title
        if (config.flat_rate.price)
            CONF.SHIPMENT[store_code].flat_rate.price = config.flat_rate.price
        if (config.flat_rate.code)
            CONF.SHIPMENT[store_code].flat_rate.code = config.flat_rate.code
    }
    if (config.free_shipping) {
        if (config.free_shipping.status)
            CONF.SHIPMENT[store_code].free_shipping.status = config.free_shipping.status
        if (config.free_shipping.title)
            CONF.SHIPMENT[store_code].free_shipping.title = config.free_shipping.title
        if (config.free_shipping.price)
            CONF.SHIPMENT[store_code].free_shipping.price = config.free_shipping.price
        if (config.free_shipping.code)
            CONF.SHIPMENT[store_code].free_shipping.code = config.free_shipping.code
        if (config.free_shipping.min_order_total)
            CONF.SHIPMENT[store_code].free_shipping.min_order_total = config.free_shipping.min_order_total
    }
    console.log(`Shipment Configs--------------->${JSON.stringify(CONF.SHIPMENT[store_code])}`)
    global.configSync.shipment = date;
    return {}
}

interface ICountrySpecific {
    country_code: string,
    country_name: string,
    base_currency: string,
    channel_data: [
        {
            template_id: number,
            template_status: number,
            channel_name: string,
            menu_data: [
                {
                    menu_id: number,
                    menu_state: number,
                    menu_cluster: number,
                    frequency_cron: number,
                    time_cron: number
                }
            ]
        }
    ],
    home_overlay: {
        En: {
            mediaUrl: string,
            gif: string,
            mediaType: string,
            extension: string,
            action: {
                id: number,
                type: string,
                delimeters: string
            }
        },
        Ar: {
            mediaUrl: string,
            gif: string,
            mediaType: string,
            extension: string,
            action: {
                id: number,
                type: string,
                delimeters: string
            }
        }
    },
    sdm: {
        sdm_url: string,
        licence_code: string,
        concept_id: number,
        menu_template_id: number
    },
    ccode: string,
    customer_care: string,
    support_email: string,
    min_cart_value: number,
    min_cod_cart_value: number
}
export const countrySpecificConfigSync = function (country: string, config: ICountrySpecific, date: number) {
    if (config.country_code)
        CONF.COUNTRY_SPECIFIC[country].COUNTRY_CODE = config.country_code
    if (config.country_name)
        CONF.COUNTRY_SPECIFIC[country].COUNTRY_CODE = config.country_name
    if (config.base_currency)
        CONF.COUNTRY_SPECIFIC[country].COUNTRY_CODE = config.base_currency
    if (config.channel_data)
        CONF.COUNTRY_SPECIFIC[country].CHANNEL_DATA = config.channel_data
    if (config.home_overlay) {
        if (config.home_overlay.Ar) {
            if (config.home_overlay.Ar.mediaUrl)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.Ar.mediaUrl = config.home_overlay.Ar.mediaUrl
            if (config.home_overlay.Ar.gif)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.Ar.gif = config.home_overlay.Ar.gif
            if (config.home_overlay.Ar.mediaType)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.Ar.mediaType = config.home_overlay.Ar.mediaType
            if (config.home_overlay.Ar.extension)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.Ar.extension = config.home_overlay.Ar.extension
            if (config.home_overlay.Ar.action) {
                if (config.home_overlay.Ar.action.id)
                    CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.Ar.action.id = config.home_overlay.Ar.action.id
                if (config.home_overlay.Ar.action.type)
                    CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.Ar.action.type = config.home_overlay.Ar.action.type
                if (config.home_overlay.Ar.action.delimeters)
                    CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.Ar.action.delimeters = config.home_overlay.Ar.action.delimeters
            }
        }
        if (config.home_overlay.En) {
            if (config.home_overlay.En.mediaUrl)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.En.mediaUrl = config.home_overlay.En.mediaUrl
            if (config.home_overlay.En.gif)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.En.gif = config.home_overlay.En.gif
            if (config.home_overlay.En.mediaType)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.En.mediaType = config.home_overlay.En.mediaType
            if (config.home_overlay.En.extension)
                CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.En.extension = config.home_overlay.En.extension
            if (config.home_overlay.En.action) {
                if (config.home_overlay.En.action.id)
                    CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.En.action.id = config.home_overlay.En.action.id
                if (config.home_overlay.En.action.type)
                    CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.En.action.type = config.home_overlay.En.action.type
                if (config.home_overlay.En.action.delimeters)
                    CONF.COUNTRY_SPECIFIC[country].HOME_OVERLAY.En.action.delimeters = config.home_overlay.En.action.delimeters
            }
        }
    }
    if (config.sdm) {
        if (config.sdm.sdm_url)
            CONF.COUNTRY_SPECIFIC[country].SDM.SDM_URL = config.sdm.sdm_url
        if (config.sdm.licence_code)
            CONF.COUNTRY_SPECIFIC[country].SDM.LICENSE_CODE = config.sdm.licence_code
        if (config.sdm.concept_id)
            CONF.COUNTRY_SPECIFIC[country].SDM.CONCEPT_ID = config.sdm.concept_id
        if (config.sdm.menu_template_id)
            CONF.COUNTRY_SPECIFIC[country].SDM.MENU_TEMPLATE_ID = config.sdm.menu_template_id
    }
    if (config.ccode)
        CONF.COUNTRY_SPECIFIC[country].CCODE = config.ccode
    if (config.customer_care)
        CONF.COUNTRY_SPECIFIC[country].CUSTOMER_CARE = config.customer_care
    if (config.support_email)
        CONF.COUNTRY_SPECIFIC[country].SUPPORT_EMAIL = config.support_email
    if (config.min_cart_value)
        CONF.COUNTRY_SPECIFIC[country].MIN_CART_VALUE = config.min_cart_value
    if (config.min_cod_cart_value)
        CONF.COUNTRY_SPECIFIC[country].MIN_COD_CART_VALUE = config.min_cod_cart_value

    console.log(`Country Specific Configs--------------->${JSON.stringify(CONF.COUNTRY_SPECIFIC[country])}`)
    global.configSync.countrySpecific = date;
    return {}
}