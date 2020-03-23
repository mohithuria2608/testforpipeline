'use strict'
import * as config from 'config'
import * as Joi from '@hapi/joi'
import * as Constant from '../constant'
import * as crypto from 'crypto'
import * as randomstring from 'randomstring';
import { logger } from '../lib'
const displayColors = Constant.SERVER.DISPLAY_COLOR
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);



export let grpcSendError = function (error, language = Constant.DATABASE.LANGUAGE.EN) {
    consolelog(process.cwd(), "In grpcSendError", JSON.stringify(error), true)
    error = sendError(error, language).payload
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
        consolelog(process.cwd(), "Unhandled grpcSendError status code", JSON.stringify(error), true)
    }
    return Constant.STATUS_MSG.GRPC_ERROR.ERROR(grpcErrCode, grpcErrType, message)
}

export let sendError = function (error, language: string = Constant.DATABASE.LANGUAGE.EN) {
    consolelog(process.cwd(), "In error handler type of ", typeof error, false)
    consolelog(process.cwd(), "In error handler direct ", error, false)
    consolelog(process.cwd(), "In error handler parsed ", JSON.stringify(error), false)

    let customError: ICommonRequest.IError = Constant.STATUS_MSG.ERROR.E400.DEFAULT
    let key = (language && language == Constant.DATABASE.LANGUAGE.AR) ? `message_${Constant.DATABASE.LANGUAGE.AR}` : `message_${Constant.DATABASE.LANGUAGE.EN}`
    if (error && error.code && error.details) {
        if (isJsonString(error.details)) {
            if (JSON.parse(error.details).hasOwnProperty("data"))
                customError.data = JSON.parse(error.details)
        }
        customError.message = error.details
        customError.message_Ar = error.details
        customError.message_En = error.details
        error.code = error.code + ""
        switch (error.code) {
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.CANCELLED: {
                consolelog(process.cwd(), "Unhandled grpc error type CANCELLED", JSON.stringify(error), true)
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNKNOWN: {
                consolelog(process.cwd(), "Unhandled grpc error type UNKNOWN", JSON.stringify(error), true)
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
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
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.NOT_FOUND: {
                customError.statusCode = Constant.STATUS_MSG.ERROR.E409.DATA_NOT_FOUND.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E409.DATA_NOT_FOUND.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E409.DATA_NOT_FOUND.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.ALREADY_EXISTS: {
                consolelog(process.cwd(), "Unhandled grpc error type ALREADY_EXISTS", JSON.stringify(error), true)
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.PERMISSION_DENIED: {
                consolelog(process.cwd(), "Unhandled grpc error type PERMISSION_DENIED", JSON.stringify(error), true)
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
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
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.FAILED_PRECONDITION: {
                consolelog(process.cwd(), "Unhandled grpc error type FAILED_PRECONDITION", JSON.stringify(error), true)
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
            case Constant.STATUS_MSG.GRPC_ERROR.TYPE.ABORTED: {
                consolelog(process.cwd(), "Unhandled grpc error type ABORTED", JSON.stringify(error), true)
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
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
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
            default: {
                consolelog(process.cwd(), "Unhandled grpc error type 1", JSON.stringify(error), true)
                customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
                customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
                customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
                break;
            }
        }
    }
    else if (typeof error == 'object') {
        if (error.name == "AerospikeError") {
            consolelog(process.cwd(), "-----step 1------", "", false)

            customError.message = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
            customError.message_Ar = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
            customError.message_En = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
            customError.statusCode = Constant.STATUS_MSG.ERROR.E500.DB_ERROR.statusCode
            customError.httpCode = Constant.STATUS_MSG.ERROR.E500.DB_ERROR.httpCode
            customError.type = Constant.STATUS_MSG.ERROR.E500.DB_ERROR.type
            if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DUPLICATE_INDEX) {
                customError.type = 'DUPLICATE_INDEX'
            }
        }
        else if (error.name === 'ValidationError') {
            consolelog(process.cwd(), "-----step 2------", "", false)
            customError.message = error.message
            customError.message_Ar = error.message
            customError.message_En = error.message
            customError.statusCode = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.statusCode
            customError.httpCode = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.httpCode
            customError.type = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.type
        }
        else if (error.name === 'PaymentError') {
            consolelog(process.cwd(), "-----step 3------", "", false)
            customError.message = error.message;
            customError.message_Ar = error.message
            customError.message_En = error.message
            customError.statusCode = error.statusCode;
            customError.httpCode = error.httpCode;
            customError.type = error.type;
        }
        else if ((error.hasOwnProperty('message') || error.hasOwnProperty('customMessage'))) {
            consolelog(process.cwd(), "-----step 4------", "", false)
            customError.message = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
            customError.message_Ar = error.hasOwnProperty(key) ? error[key] : error['customMessage']
            customError.message_En = error.hasOwnProperty(key) ? error[key] : error['customMessage']
            if (error.hasOwnProperty('statusCode'))
                customError['statusCode'] = error.statusCode
            if (error.hasOwnProperty('httpCode'))
                customError['httpCode'] = error.httpCode
            if (error.hasOwnProperty('type'))
                customError['type'] = error.type
        }
        else if (error.hasOwnProperty('statusCode') && error.hasOwnProperty('httpCode') && error.hasOwnProperty('payload')) {
            consolelog(process.cwd(), "-----step 5------", "", false)
            customError.message = error.payload.message
            customError.message_Ar = error.payload[key]
            customError.message_En = error.payload[key]
            customError.statusCode = error.payload.statusCode
            customError.httpCode = error.payload.httpCode
            customError.type = error.payload.type
        }
        else {
            consolelog(process.cwd(), "-----step 6------", "", false)
            customError.message = JSON.stringify(error)
            customError.message_Ar = JSON.stringify(error)
            customError.message_En = JSON.stringify(error)
            customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
            customError.httpCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.httpCode
            customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
        }
    }
    else {
        consolelog(process.cwd(), "-----step 7------", "", false)
        customError.message = JSON.stringify(error)
        customError.message_Ar = JSON.stringify(error)
        customError.message_En = JSON.stringify(error)
    }
    customError.message = customError.message ? customError.message && customError.message.replace(/"/g, '') : ""
    customError.message = customError.message ? customError.message && customError.message.replace('[', '') : ""
    customError.message = customError.message ? customError.message && customError.message.replace(']', '') : ""

    customError.message_Ar = customError.message_Ar ? customError.message_Ar && customError.message_Ar.replace(/"/g, '') : ""
    customError.message_Ar = customError.message_Ar ? customError.message_Ar && customError.message_Ar.replace('[', '') : ""
    customError.message_Ar = customError.message_Ar ? customError.message_Ar && customError.message_Ar.replace(']', '') : ""

    customError.message_En = customError.message_En ? customError.message_En && customError.message_En.replace(/"/g, '') : ""
    customError.message_En = customError.message_En ? customError.message_En && customError.message_En.replace('[', '') : ""
    customError.message_En = customError.message_En ? customError.message_En && customError.message_En.replace(']', '') : ""


    return {
        statusCode: customError.statusCode,
        httpCode: customError.httpCode,
        payload: stsMsgI18(customError, language),
        headers: {}
    }
}

export let sendSuccess = function (successMsg, language, data) {
    console.log("language", language)
    console.log("successMsg", successMsg)
    console.log("data", data)
    let key = (language && language == Constant.DATABASE.LANGUAGE.AR) ? `message_${Constant.DATABASE.LANGUAGE.AR}` : `message_${Constant.DATABASE.LANGUAGE.EN}`
    console.log("key", key)
    if (typeof data === 'object' && data.hasOwnProperty('password')) {
        delete data['password']
    }
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('message')) {
        return {
            statusCode: data.statusCode,
            httpCode: data.httpCode,
            message: data[key] ? data[key] : data.message,
            type: data.type,
            data: data.data || null
        }
    }
    else if (successMsg != null && typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('message')) {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT
        return {
            statusCode: successMsg.statusCode,
            httpCode: successMsg.httpCode,
            message: successMsg[key],
            type: (successMsg.type) ? successMsg.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type,
            data: data || null
        }
    } else {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT[key]
        return {
            statusCode: 200,
            httpCode: 200,
            message: successMsg,
            type: (data.type) ? data.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type,
            data: data || null,
        }
    }
}

export let authorizationHeaderObj = Joi.object({
    authorization: Joi.string().required().description("bearer space accessToken")
}).unknown()

export let cryptData = function (text: string) {
    var mykey = crypto.createCipher(config.get('cryptoAlgo'), config.get('cryptoSecret'));
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return mystr
}

export let deCryptData = function (text) {
    var mykey = crypto.createDecipher(config.get('cryptoAlgo'), config.get('cryptoSecret'));
    var mystr = mykey.update(text, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return mystr
}

export let generateOtp = function () {
    let otp = (Math.floor(1000 + Math.random() * 9000));
    return otp
}

export let formatUserData = function (userObj: IUserRequest.IUserData, headers: ICommonRequest.IHeaders, isGuest: number) {
    try {
        userObj['isGuest'] = (isGuest != undefined) ? isGuest : 0
        userObj['country'] = headers.country
        userObj['language'] = headers.language
        if (userObj.phnNo == undefined)
            userObj['phnNo'] = ""
        if (userObj.cCode == undefined)
            userObj['cCode'] = ""
        if (userObj.email == undefined)
            userObj['email'] = ""
        if (userObj.name == undefined)
            userObj['name'] = ""
        if (userObj.socialKey == undefined)
            userObj['socialKey'] = ""
        if (userObj.medium == undefined)
            userObj['medium'] = ""
        delete userObj['username']
        delete userObj['session']
        delete userObj['password']
        delete userObj['sdmUserRef']
        delete userObj['sdmCorpRef']
        delete userObj['cmsUserRef']
        delete userObj['sdmAddress']
        delete userObj['cmsAddress']
        delete userObj['asAddress']
        delete userObj['headers']
        return userObj
    } catch (error) {
        consolelog(process.cwd(), 'formatUserData', JSON.stringify(error), false)
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

export let generateSessionId = function (userId: string, deviceid: string) {
    return userId + "_" + deviceid;
};

export let validatorErr = function (error) {
    return {
        name: "ValidationError",
        message: error
    }
}

export let stsMsgI18 = function (statsObj: ICommonRequest.IError, language: string = Constant.DATABASE.LANGUAGE.EN, returnMsg?: boolean, returnErr?: boolean) {
    let key = (language && language == Constant.DATABASE.LANGUAGE.AR) ? `message_${Constant.DATABASE.LANGUAGE.AR}` : `message_${Constant.DATABASE.LANGUAGE.EN}`
    statsObj.message = statsObj[key];
    delete statsObj.message_En;
    delete statsObj.message_Ar;
    if (returnMsg)
        if (returnErr)
            return statsObj.message
        else
            return new Error(statsObj.message)
    else
        return statsObj
}


export let nameConstructor = function (name) {
    let splitName = name.split(" ")
    console.log("naemRes============>", splitName.length)

    let firstName = splitName.length == 1 ? splitName[0] : splitName.slice(0, splitName.length - 1).join(" ")
    let lastName = splitName.length > 1 ? splitName[splitName.length - 1] : "."
    return { firstName, lastName }
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}