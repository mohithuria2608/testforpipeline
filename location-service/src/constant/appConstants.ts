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

        SOCIAL_PLATFORM: {
            GOOGLE: "GOOGLE",
            FB: "FB"
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
        },

        PROFILE_STEP: {
            INIT: 0,
            FIRST: 1,
        }
    }
};

export let UDF = {
    USER: {
        check_phone_exist: "check_phone_exist",
        check_social_key: "check_social_key",
    }
}
export enum KAFKA_TOPIC {
    CREATE_TOKEN = "create_token"
}

export enum MIDDLEWARE {
    API_AUTH = "api_auth",
    REFRESH_AUTH = "refresh_auth",
    AUTH = "auth",
    ACTIVITY_LOG = "activity_log"
}

export let STATUS_MSG = {
    ERROR: {
        E400: {
            PROFILE_SETUP_ALLREADY_COMPLETE: {
                statusCode: 400,
                type: 'PROFILE_SETUP_ALLREADY_COMPLETE',
                message: 'Profile setup is already complete'
            },

            OTP_SESSION_EXPIRED: {
                statusCode: 400,
                type: 'OTP_SESSION_EXPIRED',
                message: 'Otp session has expired'
            },

            OTP_EXPIRED: {
                statusCode: 400,
                type: 'OTP_EXPIRED',
                message: 'Otp entered has expired'
            },

            INVALID_OTP: {
                statusCode: 400,
                type: 'INVALID_OTP',
                message: 'Invalid otp entered'
            },

            PHONE_NO_REQ: {
                statusCode: 400,
                message: 'Phone number is required',
                type: 'PHONE_NO_REQ'
            },

            EMAIL_REQ: {
                statusCode: 400,
                message: 'Email is required',
                type: 'EMAIL_REQ'
            },

            NAME_REQ: {
                statusCode: 400,
                message: 'Name is required',
                type: 'NAME_REQ'
            },

            SOCIAL_KEY_REQ: {
                statusCode: 400,
                message: 'Social key is required',
                type: 'SOCIAL_KEY_REQ'
            },

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
            INVALID_LOGIN: {
                statusCode: 403,
                type: 'INVALID_LOGIN',
                message: 'Invalid login credentials'
            },

            INVALID_LINK: {
                statusCode: 403,
                message: 'Link is no more valid',
                type: 'INVALID_LINK'
            },

            RESET_PASSWORD_EXPIRED: {
                statusCode: 403,
                message: 'Your reset password token is expired!',
                type: 'TOKEN_EXPIRED'
            },
        },
        E404: {
            DATA_NOT_FOUND: {
                statusCode: 404,
                type: 'DATA_NOT_FOUND',
                message: 'Result not found'
            },

            STORE_NOT_FOUND: {
                statusCode: 404,
                message: 'Store not found',
                type: 'STORE_NOT_FOUND'
            },
        },
        E500: {
            IMP_ERROR: {
                statusCode: 500,
                message: 'Implementation Error',
                type: 'IMP_ERROR'
            },
            INVALID_TOKEN_TYPE: {
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
            OTP_SENT: {
                statusCode: 200,
                type: 'OTP_SENT',
                message: 'Otp sent successfully'
            },

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
    TEMPLATE_PATH: process.cwd() + '/views/',
    ACCESS_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    REFRESH_TOKEN_EXPIRE_TIME: (100 * 24 * 60 * 60),
    DISPLAY_COLOR: true
}