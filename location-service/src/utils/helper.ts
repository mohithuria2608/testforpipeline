'use strict'
import * as config from 'config'
import * as Joi from '@hapi/joi'
import * as Constant from '../constant'
import * as crypto from 'crypto'
import * as randomstring from 'randomstring';
import { logger } from '../lib'
const displayColors = Constant.SERVER.DISPLAY_COLOR

export let grpcSendError = function (error) {
    consolelog(process.cwd(), "In grpcSendError", JSON.stringify(error), true)
    error = sendError(error).payload
    let grpcErrCode = Constant.STATUS_MSG.GRPC_ERROR.TYPE.INTERNAL
    let grpcErrType = "INTERNAL"
    let message = error.message
    if (error.statusCode == 401) {
        grpcErrCode = Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNAUTHENTICATED
        grpcErrType = "UNAUTHENTICATED"
    }
    else if (error.statusCode == 409) {
        grpcErrCode = Constant.STATUS_MSG.GRPC_ERROR.TYPE.NOT_FOUND
        grpcErrType = "NOT_FOUND"
    }
    else if (error.statusCode == 422) {
        grpcErrCode = Constant.STATUS_MSG.GRPC_ERROR.TYPE.INVALID_ARGUMENT
        grpcErrType = "INVALID_ARGUMENT"
    }
    else if (error.statusCode >= 400) {
        grpcErrCode = Constant.STATUS_MSG.GRPC_ERROR.TYPE.INTERNAL
        grpcErrType = "INTERNAL"
    }
    else {
        consolelog(process.cwd(), "Unhandled grpcSendError 1", JSON.stringify(error), true)
    }
    return Constant.STATUS_MSG.GRPC_ERROR.ERROR(grpcErrCode, grpcErrType, message)
}

export let sendError = function (error) {
    let customError: ICommonRequest.IError = Constant.STATUS_MSG.ERROR.E400.DEFAULT
    if (error && error.code && error.details) {
        customError.message = error.details
        switch (error.code) {
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.CANCELLED: {
                consolelog(process.cwd(), "Unhandled grpc error type CANCELLED", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNKNOWN: {
                consolelog(process.cwd(), "Unhandled grpc error type UNKNOWN", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.INVALID_ARGUMENT: {
                customError.statusCode = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.DEADLINE_EXCEEDED: {
                consolelog(process.cwd(), "Unhandled grpc error type DEADLINE_EXCEEDED", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.NOT_FOUND: {
                customError.statusCode = Constant.STATUS_MSG.ERROR.E409.DATA_NOT_FOUND.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E409.DATA_NOT_FOUND.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E409.DATA_NOT_FOUND.type
                // consolelog(process.cwd(), "Unhandled grpc error type NOT_FOUND", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.ALREADY_EXISTS: {
                consolelog(process.cwd(), "Unhandled grpc error type ALREADY_EXISTS", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.PERMISSION_DENIED: {
                consolelog(process.cwd(), "Unhandled grpc error type PERMISSION_DENIED", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNAUTHENTICATED: {
                customError.statusCode = Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.RESOURCE_EXHAUSTED: {
                consolelog(process.cwd(), "Unhandled grpc error type RESOURCE_EXHAUSTED", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.FAILED_PRECONDITION: {
                consolelog(process.cwd(), "Unhandled grpc error type FAILED_PRECONDITION", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.ABORTED: {
                consolelog(process.cwd(), "Unhandled grpc error type ABORTED", JSON.stringify(error), true)
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNIMPLEMENTED:
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.INTERNAL: {
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNAVAILABLE: {
                customError.statusCode = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E404.RESOURCE_NOT_FOUND.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.DATA_LOSS: {
                consolelog(process.cwd(), "Unhandled grpc error type DATA_LOSS", JSON.stringify(error), true)
                break;
            }
            default: {
                consolelog(process.cwd(), "Unhandled grpc error type 1", JSON.stringify(error), true)
                break;
            }
        }
    }
    else if (typeof error == 'object') {
        if (error.name == "AerospikeError") {
            customError.message = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
            customError.statusCode = Constant.STATUS_MSG.ERROR.E500.DB_ERROR.statusCode
            customError.httpCode = Constant.STATUS_MSG.ERROR.E500.DB_ERROR.httpCode
            customError.type = Constant.STATUS_MSG.ERROR.E500.DB_ERROR.type
            if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DUPLICATE_INDEX) {
                customError.type = 'DUPLICATE_INDEX'
            }
        }
        else if (error.name === 'ValidationError') {
            customError.message += Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.message + error.message
            customError.statusCode = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.statusCode
            customError.httpCode = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.httpCode
            customError.type = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.type
        }
        else if ((error.hasOwnProperty('message') || error.hasOwnProperty('customMessage'))) {
            customError.message = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
            if (error.hasOwnProperty('statusCode'))
                customError['statusCode'] = error.statusCode
            if (error.hasOwnProperty('httpCode'))
                customError['httpCode'] = error.httpCode
            if (error.hasOwnProperty('type'))
                customError['type'] = error.type
        }
        else {
            consolelog(process.cwd(), "Unhandled error type 2", JSON.stringify(error), true)
        }
    }
    else {
        customError.message = error
    }
    customError.message = customError.message && customError.message.replace(/"/g, '')
    customError.message = customError.message && customError.message.replace('[', '')
    customError.message = customError.message && customError.message.replace(']', '')

    return {
        statusCode: customError.statusCode,
        httpCode: customError.httpCode,
        payload: customError,
        headers: {}
    }
}

export let sendSuccess = function (successMsg, data) {
    if (typeof data === 'object' && data.hasOwnProperty('password')) {
        delete data['password']
    }
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('message')) {
        return {
            statusCode: data.statusCode,
            message: data.message,
            type: data.type,
            data: data.data || null
        }

    } else if (successMsg != null && typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('message')) {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.message
        return {
            statusCode: successMsg.statusCode,
            message: successMsg.message,
            data: data || null,
            type: (successMsg.type) ? successMsg.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type
        }

    } else {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.message
        return {
            statusCode: 200,
            message: successMsg,
            data: data || null,
            type: (data.type) ? data.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type
        }
    }
}

export let authorizationHeaderObj = Joi.object({
    authorization: Joi.string().required().description("bearer space accessToken")
}).unknown()

export let cryptData = async function (stringToCrypt: string) {
    let hmac = crypto.createHmac('sha256', config.get('cryptoSecret'));
    let crypted = hmac.update(stringToCrypt).digest('hex');
    return crypted
}

export let deCryptData = async function (stringToCheck: string, dbString: string) {
    let hmac = crypto.createHmac('sha256', config.get('cryptoSecret'));
    let crypted = hmac.update(stringToCheck).digest('hex');
    return (dbString == crypted) ? true : false
}

export let cipherText = async function (text) {
    let cipher = crypto.createCipher('aes-128-ctr', config.get('cryptoSecret'))
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

export let deCipherText = async function (text) {
    var decipher = crypto.createDecipher('aes-128-ctr', config.get('cryptoSecret'))
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

export let generateOtp = async function () {
    let otp = (Math.floor(1000 + Math.random() * 9000));
    return otp
}

export let formatUserData = function (userObj: IUserRequest.IUserData, deviceid) {
    try {
        userObj['country'] = userObj['session'][deviceid].country
        userObj['language'] = userObj['session'][deviceid].language

        delete userObj['session']
        delete userObj['keepUserId']
        delete userObj['password']
        delete userObj['sdmUserRef']
        delete userObj['cmsUserRef']
        return userObj
    } catch (error) {
        consolelog(process.cwd(), 'formatUserData', error, false)
        return Promise.reject(error)
    }
}

/**
 * @description to form a bucket id from first 3 numbers of _id to make read operations faster in redis
 * @param id 
 */

export const getBucket = (id) => {
    id = id.toString()
    let bucket = id.replace(/\D/g, "")               //regex to replace alphabets from stringified object id
    bucket = bucket.substr(0, 3)
    consolelog(process.cwd(), 'bucket', bucket, true)
    return bucket
}

export const getHashTag = (str: string) => {
    return str.split(" ").filter(obj => { return (obj.indexOf("#") == 0) })
}
export let arrayToObject = function (array: any) {
    let data = array.reduce((obj, item) => {
        obj[item.key] = item.value
        return obj
    }, {})
    return data

}

export let consolelog = function (cwd: string, identifier: string, value: any, isSuccess: boolean, logFunction?: string) {
    try {
        const service = cwd.split('/')[cwd.split('/').length - 1]
        if (!logFunction)
            logFunction = 'info'
        if (isSuccess) {
            logger[logFunction](`${service}--------------${identifier}--------------${value}`);
        } else {
            logger.error(`${service}--------------${identifier}--------------${value}`);
        }
        return
    } catch (error) {
        return
    }
}

export let validateLocation = function (lat, long) {
    var valid = true;
    if (lat < -90 || lat > 90) {
        valid = false;
    }
    if (long < -180 || long > 180) {
        valid = false;
    }
    return valid;
};

export function sleep(ms: number) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export let generateRandomString = function (digits: number) {
    return randomstring.generate(digits);
};