import * as config from 'config'

export let DATABASE = {
    LANGUAGE: {
        EN: 'En',
        AR: 'Ar'
    },

    COUNTRY: {
        UAE: 'UAE',
    },

    ENTITY: {
        APP: "APP",
        USER: "USER",
        ADMIN: "ADMIN",
    },

    DB_CHANGE_TYPE: {
        INSERT: "insert",
        DELETE: "delete",
        REPLACE: "replace",
        UPDATE: "update",
        DROP: "drop",
        RENAME: "rename",
        DROP_DATABASE: "dropDatabase",
        INVALIDATE: "invalidate",
    },

    STATUS: {
        APP_VERSION: {
            INACTIVE: 0,
            ACTIVE: 1,
            DELETED: 2
        }
    },

    ACTION: {
        DEEPLINK: {
            APP: "APP",
            RESET_PASSWORD: "RESET_PASSWORD"
        }
    },

    TYPE: {
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

        VERSION_UPDATE: {
            FORCE: "FORCE",
            SKIP: "SKIP",
            NORMAL: "NORMAL"
        },

        MIME: {
            DEFAULT: "default",
            IMAGE: "image",
            VIDEO: "video",
            AUDIO: "audio",
            GIF: "gif",
            PDF: "pdf",
            DOC: "doc",
            DOCX: "docx",
            XLSX: "xlsx",
            XLS: "xls",
            CSV: "csv",
            TXT: "txt",
            PPTX: "pptx"
        },

        REDIS_HASH_TYPES: {
            SESSION: "session"
        },

        ACTIVITY_LOG: {
            REQUEST: "REQUEST"
        }
    }
};


export enum KAFKA_TOPIC {
    CREATE_TOKEN = "create_token"
}

export enum MIDDLEWARE {
    API_AUTH = "api_auth",
    REFRESH_AUTH = "refresh_auth",
    ACTIVITY_LOG = "activity_log"
}

export let STATUS_MSG = {
    ERROR: {
        E400: {

            CANNOT_PERFORM_UPDATE_OPERATION: {
                statusCode: 400,
                message: 'Cannot perform update operation',
                type: 'CANNOT_PERFORM_UPDATE_OPERATION'
            },

            USER_NOT_REGISTERED: {
                statusCode: 400,
                type: 'USER_NOT_REGISTERED',
                message: 'User does not exist, please sign up'
            },

            USER_ALREADY_EXIST: {
                statusCode: 400,
                type: 'USER_ALREADY_EXIST',
                message: 'User already exist, please login'
            },

            EMAIL_ALREADY_EXIST: {
                statusCode: 400,
                type: 'EMAIL_ALREADY_EXIST',
                message: 'Email already exist'
            },

            EMAIL_NOT_REGISTERED: {
                statusCode: 400,
                type: 'EMAIL_NOT_REGISTERED',
                message: 'Email NOT Registered.'
            },

            EMAIL_NOT_VERIFIED: {
                statusCode: 400,
                type: 'EMAIL_NOT_VERIFIED',
                message: 'Email Not Verified.'
            },

            INVALID_EMAIL_TOKEN: {
                statusCode: 400,
                type: 'INVALID_EMAIL_TOKEN',
                message: "Wrong email token entered"
            },

            INVALID_OTP: {
                statusCode: 400,
                type: 'INVALID_OTP',
                message: "Invalid OTP"
            },

            APP_VERSION_ERROR: {
                statusCode: 400,
                message: 'One of the latest version or updated version value must be present',
                type: 'APP_VERSION_ERROR'
            },

            VALIDATION_ERROR: {
                statusCode: 400,
                message: 'Validation Error',
                type: 'VALIDATION_ERROR'
            },

            CUSTOM_VALIDATION_ERROR: (customErrorMessage) => {
                return {
                    statusCode: 400,
                    message: 'Validation Error : ' + customErrorMessage,
                    type: 'VALIDATION_ERROR'
                }
            },
            JOI_VALIDATION_ERROR: (customErrorMessage) => {
                return {
                    statusCode: 400,
                    message: customErrorMessage,
                    type: 'VALIDATION_ERROR'
                }
            },
            INVALID_ID: {
                statusCode: 400,
                message: 'Invalid Id Provided ',
                type: 'INVALID_ID'
            },

            INVALID_USER_ID: {
                statusCode: 400,
                message: 'Invalid User Id Provided ',
                type: 'INVALID_ID'
            },

            APP_ERROR: {
                statusCode: 400,
                message: 'Application Error',
                type: 'APP_ERROR'
            },

            DB_ERROR: {
                statusCode: 400,
                message: 'DB Error : ',
                type: 'DB_ERROR'
            },

            DEFAULT: {
                statusCode: 400,
                message: 'Error',
                type: 'DEFAULT'
            }
        },
        E401: {
            RESET_PASSWORD_EXPIRED: {
                statusCode: 401,
                message: 'Your reset password token is expired!',
                type: 'TOKEN_EXPIRED'
            },

            INVALID_LINK: {
                statusCode: 401,
                message: 'Link is no more valid',
                type: 'INVALID_LINK'
            },

            UNAUTHORIZED: {
                statusCode: 401,
                message: 'You are not authorized to perform this action',
                type: 'UNAUTHORIZED'
            },

            ACCESS_TOKEN_EXPIRED: {
                statusCode: 401,
                type: 'ACCESS_TOKEN_EXPIRED',
                message: 'Access token has expired.'
            }
        },
        E403: {
            INVALID_OTP: {
                statusCode: 403,
                type: 'INVALID_OTP',
                message: 'Invalid otp entered'
            },

            INVALID_LOGIN: {
                statusCode: 403,
                type: 'INVALID_LOGIN',
                message: 'Invalid login credentials'
            }
        },
        E404: {
            DATA_NOT_FOUND: {
                statusCode: 404,
                type: 'DATA_NOT_FOUND',
                message: 'Result not found'
            },

            USER_NOT_FOUND: {
                statusCode: 404,
                message: 'User not found',
                type: 'USER_NOT_FOUND'
            },
        },
        E500: {
            IMP_ERROR: {
                statusCode: 500,
                message: 'Implementation Error',
                type: 'IMP_ERROR'
            },
            INVALID_TOKEN_TYPE:{
                statusCode: 500,
                message: 'Invalid token type provided',
                type: 'INVALID_TOKEN_TYPE'
            }
        },
        E501: {
            TOKENIZATION_ERROR: {
                statusCode: 501,
                message: 'Failure in creating token',
                type: 'TOKENIZATION_ERROR'
            }
        }
    },
    SUCCESS: {
        S200: {

            OTP_VERIFIED: {
                statusCode: 200,
                type: 'OTP_VERIFIED',
                message: 'Otp verified'
            },

            RESET_SUCCESS: {
                statusCode: 200,
                type: 'RESET_SUCCESS',
                message: 'Password has been successfully reset'
            },

            PHONE_VERIFIED: {
                statusCode: 200,
                message: 'Phone number successfully verified',
                type: 'PHONE_VERIFIED'
            },

            FORGET_PASSWORD: {
                statusCode: 200,
                message: 'Forget password successfully',
                type: 'FORGET_PASSWORD'
            },

            UPLOAD: {
                statusCode: 200,
                message: 'File uploaded successfully',
                type: 'UPLOAD'
            },

            UPDATED: {
                statusCode: 200,
                message: 'Updated Successfully',
                type: 'UPDATED'
            },

            DELETED: {
                statusCode: 200,
                message: 'Deleted Successfully',
                type: 'DELETED'
            },

            BLOCKED: {
                statusCode: 200,
                message: 'Blocked Successfully',
                type: 'BLOCKED'
            },

            LOGIN: {
                statusCode: 200,
                message: 'Logged In Successfully',
                type: 'LOGIN'
            },

            LOGOUT: {
                statusCode: 200,
                message: 'Logged Out Successfully',
                type: 'LOGOUT'
            },

            DEFAULT: {
                statusCode: 200,
                message: 'Success',
                type: 'DEFAULT',
            },

            ACCOUNT_DELETED: {
                statusCode: 200,
                message: 'Account has been deleted',
                type: 'ACCOUNT_DELETED'
            }
        },
        S201: {
            CREATED: {
                statusCode: 201,
                message: 'Created Successfully',
                type: 'CREATED'
            },
        },
        S209: {
            FORGET_PASSWORD_EMAIL: {
                statusCode: 209,
                message: 'Reset password link sent to email',
                type: 'FORGET_PASSWORD_EMAIL'
            },
        },
        S210: {
            FORGET_PASSWORD_PHONE_NUMBER: {
                statusCode: 210,
                message: 'Reset otp sent to registered phone number',
                type: 'FORGET_PASSWORD_PHONE_NUMBER'
            }
        },
        S304: {
            REQUEST_EXISTS: {
                statusCode: 304,
                message: 'Friend request already Exists',
                type: 'REQUEST_EXISTS'
            },

            NO_SUCH_REQUEST: {
                statusCode: 304,
                message: 'No such request exists',
                type: 'NO_SUCH_REQUEST'
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
    IOS_URL: "",
    ANDROID_URL: "",
    ANDROID_PACKAGE_NAME: "",
    DEEPLINK_FALLBACK: 'https://www.google.co.in/',
    APP_URL: config.get("server.user.url"),
    LINKS: {
        TERMS_COND: '',
        PRIVACY: config.get("server.user.url") + "/privacy_policy/",
    },
    OTP_TEXT: (otp) => {
        return `Your App code is ${otp}. Welcome to the community!`
    },
    TEMPLATE_PATH: process.cwd() + '/views/',
    BY_PASS_OTP: 1212,
    LISTNG_LIMIT: 10,
    BULK_LIMIT: 2000,
    THUMB_DIMENSION: {
        DEFAULT: {
            WIDTH: 10,
            HEIGHT: 10,
        },
        PROFILE_PIC: {
            WIDTH: 200,
            HEIGHT: 200,
        },
        GIF: {
            WIDTH: 100,
            HEIGHT: 100,
        },
    },
    ACCESS_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    REFRESH_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    DISPLAY_COLOR: true
}