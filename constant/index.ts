export const UDF = {
    USER: {
        check_phone_exist: "check_phone_exist",
        check_social_key: "check_social_key"
    }
};

export enum KAFKA_TOPIC {
    FAIL_Q = "fail_q",
    NEW_MENU = "new_menu",
    NEW_USER = "new_user"
};

export enum MIDDLEWARE {
    API_AUTH = "api_auth",
    AUTH = "auth",
    ACTIVITY_LOG = "activity_log"
};

export let CMS = {
    GLOBAL_VAR: {
        AUTH_TOKEN: 'cms-auth-token',
        AUTH_API_HIT: 'cms-auth-hit-time'
    },
    END_POINTS: {
        AUTH: {
            METHOD: "POST",
            URL: "http://40.123.205.1/rest/default/V1/integration/customer/token",
        },
        CREATE_CUSTOMER: {
            METHOD: "POST",
            URL: "http://40.123.205.1/rest/default/V1/customers/",
        }
    }
};

export let SERVER = {
    ENV: {
        DEV: "development",
        QA: "testing",
        STAG: "staging",
        PROD: "production"
    },
    APP_INFO: {
        APP_NAME: "App",
        FB_LINK: "",
        TWITTER_LINK: "",
        INSTA_LINK: "",
        APP_ADDRESS: ""
    },
    DEFAULT_USER_NAME: 'App User',
    INITIAL_USER_TTL: 7 * 24 * 60 * 60,//seconds
    INITIAL_GUEST_USER_TTL: 24 * 60 * 60,//seconds
    BY_PASS_OTP: 1212,
    OTP_EXPIRE_TIME: (10 * 60 * 60 * 1000),
    ACCESS_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    REFRESH_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    CMS_AUTH_EXP: (10 * 60 * 1000),
    DISPLAY_COLOR: true,
    ANDROID_SCHEME_HOST: "https://",
    ANDROID_PACKAGE_NAME: "com.android.kfc",
    IOS_SCHEME_HOST: "americanaKFCUAE://",
    DEEPLINK_FALLBACK: 'https://uae.kfc.me//',
};

export let DATABASE = {
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

    TYPE: {
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
            FB: "FB"
        },

        VERSION_UPDATE: {
            FORCE: "FORCE",
            SKIP: "SKIP",
            NORMAL: "NORMAL"
        },

        ACTIVITY_LOG: {
            REQUEST: "REQUEST"
        },

        PROFILE_STEP: {
            INIT: 0,
            FIRST: 1,
        },

        TAG: {
            HOME: "HOME",
            OFFICE: "OFFICE",
            HOTEl: "HOTEl",
            OTHER: "OTHER"
        },

        DEEPLINK_REDIRECTION: {
            HOME: "HOME",
            CATEGORY: "CATEGORY",
            ITEM_DETAIL: "ITEM_DETAIL",
            ADD_TO_CART: "ADD_TO_CART",
        }
    }
};

export let STATUS_MSG = {
    ERROR: {
        E400: {
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
        E422: {
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
            }
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
        S204: {
            USER_NOT_FOUND: {
                statusCode: 204,
                httpCode: 204,
                message: 'User not found',
                type: 'USER_NOT_FOUND'
            },

            MENU_NOT_FOUND: {
                statusCode: 204,
                httpCode: 204,
                message: 'Menu not found',
                type: 'MENU_NOT_FOUND'
            },

            SERVICE_UNAVAILABLE: {
                statusCode: 204,
                httpCode: 204,
                type: 'SERVICE_UNAVAILABLE',
                message: "Sorry, we don't, deliver at this location"
            }
        },
        S205: {
            MENU_CHANGED: {
                statusCode: 205,
                httpCode: 205,
                message: 'Menu has been changed. Please refresh your menu.',
                type: 'MENU_CHANGED'
            },

            ITEM_CHANGED: {
                statusCode: 205,
                httpCode: 205,
                message: 'Item info has been changed. Please refresh your menu.',
                type: 'ITEM_CHANGED'
            }
        },
        S304: {
            NOT_MODIFIED: {
                statusCode: 304,
                httpCode: 304,
                message: 'Request not modified',
                type: 'NOT_MODIFIED'
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
    }
};