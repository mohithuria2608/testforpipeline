'use strict'
import * as config from 'config'
import * as Joi from '@hapi/joi'
import * as Constant from '../constant'
import * as crypto from 'crypto'
import * as randomstring from 'randomstring';
import { isArray } from 'util';
import { logger } from '../lib'
const displayColors = Constant.SERVER.DISPLAY_COLOR

export let grpcSendError = function (error) {
    if (typeof error === 'object' && error.hasOwnProperty('statusCode') && (error.hasOwnProperty('message') || error.hasOwnProperty('customMessage'))) {
        let message = error.hasOwnProperty('message') ? error.message : (error.hasOwnProperty('customMessage') ? error.customMessage : 'Some error occured in GRPC error handler')
        if (error.statusCode == 401 || error.statusCode == 403) {
            return Constant.STATUS_MSG.GRPC_ERROR.ERROR(Constant.STATUS_MSG.GRPC_ERROR.TYPE.INTERNAL, 'UNAUTHENTICATED', message)
        }
        else if (error.statusCode >= 400 && error.statusCode < 500 && error.statusCode != 401 && error.statusCode != 403) {
            return Constant.STATUS_MSG.GRPC_ERROR.ERROR(Constant.STATUS_MSG.GRPC_ERROR.TYPE.FAILED_PRECONDITION, 'FAILED_PRECONDITION', message)
        }
        else if (error.statusCode >= 500) {
            return Constant.STATUS_MSG.GRPC_ERROR.ERROR(Constant.STATUS_MSG.GRPC_ERROR.TYPE.INTERNAL, 'INTERNAL', message)
        } else {
            return Constant.STATUS_MSG.GRPC_ERROR.ERROR(Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNIMPLEMENTED, 'UNIMPLEMENTED', message)
        }
    } else {
        let message = typeof error == 'string' ? error : 'Some error occured'
        return Constant.STATUS_MSG.GRPC_ERROR.ERROR("INTERNAL", Constant.STATUS_MSG.GRPC_ERROR.TYPE.INTERNAL, message)
    }
}

export let sendError = function (error) {
    let customError = Constant.STATUS_MSG.ERROR.E400.DEFAULT

    if (error && error.code && error.details) {
        customError.message = error.details
        if (error.code == Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNIMPLEMENTED || error.code == Constant.STATUS_MSG.GRPC_ERROR.TYPE.INTERNAL) {
            customError.statusCode = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.statusCode
            customError.type = Constant.STATUS_MSG.ERROR.E500.IMP_ERROR.type
        }
        else if (error.code == Constant.STATUS_MSG.GRPC_ERROR.TYPE.UNAUTHENTICATED) {
            customError.statusCode = Constant.STATUS_MSG.ERROR.E401.ACCESS_TOKEN_EXPIRED.statusCode
            customError.type = Constant.STATUS_MSG.ERROR.E401.ACCESS_TOKEN_EXPIRED.type
        }
        else if (error.code == Constant.STATUS_MSG.GRPC_ERROR.TYPE.FAILED_PRECONDITION) {
            customError.statusCode = Constant.STATUS_MSG.ERROR.E400.DEFAULT.statusCode
            customError.type = Constant.STATUS_MSG.ERROR.E400.DEFAULT.type
        } else {
            customError.statusCode = Constant.STATUS_MSG.ERROR.E400.DEFAULT.statusCode
            customError.type = Constant.STATUS_MSG.ERROR.E400.DEFAULT.type
        }

    } else if (typeof error === 'object' && error.name == "AerospikeError") {
        customError.message = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
        customError.statusCode = Constant.STATUS_MSG.ERROR.E400.DB_ERROR.statusCode
        customError.type = Constant.STATUS_MSG.ERROR.E400.DB_ERROR.type
        if (error.code == 200) {
            customError.type = 'DUPLICATE_INDEX'
        }
    }
    else if (typeof error === 'object' && (error.hasOwnProperty('message') || error.hasOwnProperty('customMessage'))) {
        customError.message = error.hasOwnProperty('message') ? error['message'] : error['customMessage']
        if (error.hasOwnProperty('statusCode'))
            customError['statusCode'] = error.statusCode
        if (error.hasOwnProperty('type'))
            customError['type'] = error.type
    }
    else {
        if (typeof error === 'object') {
            if (error.name === 'MongoError') {
                customError.message += Constant.STATUS_MSG.ERROR.E400.DB_ERROR.message + error.errmsg
                customError.statusCode = Constant.STATUS_MSG.ERROR.E400.DB_ERROR.statusCode
                customError.type = Constant.STATUS_MSG.ERROR.E400.DB_ERROR.type
            } else if (error.name === 'ApplicationError') {
                customError.message += Constant.STATUS_MSG.ERROR.E400.APP_ERROR.message + ' : '
                customError.statusCode = Constant.STATUS_MSG.ERROR.E400.APP_ERROR.statusCode
                customError.type = Constant.STATUS_MSG.ERROR.E400.APP_ERROR.type
            } else if (error.name === 'ValidationError') {
                customError.message += Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.message + error.message
                customError.statusCode = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.statusCode
                customError.type = Constant.STATUS_MSG.ERROR.E422.VALIDATION_ERROR.type
            } else if (error.name === 'CastError') {
                customError.message += Constant.STATUS_MSG.ERROR.E400.DB_ERROR.message + Constant.STATUS_MSG.ERROR.E400.INVALID_ID.message + error.value
                customError.statusCode = Constant.STATUS_MSG.ERROR.E400.DB_ERROR.statusCode
                customError.type = Constant.STATUS_MSG.ERROR.E400.DB_ERROR.type
            }
        } else {
            customError.message = error
        }
    }

    customError.message = customError.message && customError.message.replace(/"/g, '')
    customError.message = customError.message && customError.message.replace('[', '')
    customError.message = customError.message && customError.message.replace(']', '')

    return {
        statusCode: customError.statusCode,
        payload: customError,
        headers: {}
    }
}

export let sendSuccess = function (successMsg, data) {
    if (typeof data === 'object' && data.hasOwnProperty('password')) {
        delete data['password']
    }
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('message')) {
        return { statusCode: data.statusCode, message: data.message, type: data.type, data: data.data || null }

    } else if (successMsg != null && typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('message')) {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.message
        return { statusCode: successMsg.statusCode, message: successMsg.message, data: data || null, type: (successMsg.type) ? successMsg.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type }

    } else {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.message
        return { statusCode: 200, message: successMsg, data: data || null, type: (data.type) ? data.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type }
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

export let formatUserData = function (userObj: Object) {
    try {
        userObj = JSON.parse(JSON.stringify(userObj))

        let emailVerify = userObj['emailVerify'] ? userObj['emailVerify']['status'] : false
        let phoneVerify = userObj['phoneVerify'] ? userObj['phoneVerify']['status'] : false
        userObj['emailVerify'] = emailVerify
        userObj['phoneVerify'] = phoneVerify

        if (userObj['backup'] && userObj['backup']['fileName']) { }
        else
            delete userObj['backup']


        return userObj
    } catch (error) {
        consolelog('formatUserData', error, false)
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
    consolelog('bucket', bucket, true)
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

export let consolelog = function (identifier: string, value: any, isSuccess: boolean, logFunction?: string) {
    try {
        if (!logFunction)
            logFunction = 'info'
        if (isArray(value)) {
            value.forEach((obj, i) => {
                if (isSuccess) {
                    logger[logFunction](`${identifier}--------------${i}--------------${obj}`);
                } else {
                    logger.error(`${identifier}--------------${i}--------------${obj}`);
                }
            })
            return
        } else {
            if (isSuccess) {
                logger[logFunction](`${identifier}--------------${value}`);
            } else {
                logger.error(`${identifier}--------------${value}`);
            }
            return
        }
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