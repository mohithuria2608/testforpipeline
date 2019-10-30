'use strict'
import * as config from 'config'
import * as Joi from 'joi'
import * as Boom from 'boom'
import * as Constant from '../constant/appConstants'
import * as crypto from 'crypto'
import * as randomstring from 'randomstring';
import { isArray } from 'util';
import { logger } from '../lib'
const displayColors = Constant.SERVER.DISPLAY_COLOR

export let sendError = function (data) {
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && (data.hasOwnProperty('message') || data.hasOwnProperty('customMessage'))) {
        let errorToSend
        if (data.hasOwnProperty('message')) {
            let error = new Error(data.message);
            errorToSend = Boom.boomify(error, { statusCode: data.statusCode })
        } else {
            let error = new Error(data.message);
            errorToSend = Boom.boomify(error, { statusCode: data.statusCode })
        }
        errorToSend.output.payload.responseType = data.type
        return errorToSend
    } else {
        let errorToSend = ''
        if (typeof data === 'object') {
            if (data.name === 'MongoError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.DB_ERROR.message + data.errmsg
            } else if (data.name === 'ApplicationError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.APP_ERROR.message + ' : '
            } else if (data.name === 'ValidationError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.VALIDATION_ERROR.message + data.message
            } else if (data.name === 'CastError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.DB_ERROR.message + Constant.STATUS_MSG.ERROR.E400.INVALID_ID.message + data.value
            }
        } else {
            errorToSend = data
        }
        var customErrorMessage = errorToSend
        if (typeof customErrorMessage === 'string') {
            if (errorToSend.indexOf("[") > -1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["))
            }
            customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '')
            customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '')
            customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '')
        }
        throw Boom.badRequest(customErrorMessage)
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
        return { statusCode: successMsg.statusCode, message: successMsg.message, data: data || null, type: (data.type) ? data.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type }

    } else {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.message
        return { statusCode: 200, message: successMsg, data: data || null, type: (data.type) ? data.type : "" }
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

        delete userObj['lastActivityTime']
        delete userObj['refreshToken']
        delete userObj['cards']
        delete userObj['banks']

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

export let consolelog = function (identifier: string, value: any, status: boolean) {
    try {
        if (isArray(value)) {
            value.forEach((obj, i) => {
                if (status) {
                    logger.info(`${identifier}--------------${i}--------------${obj}`);
                } else {
                    logger.error(`${identifier}--------------${i}--------------${obj}`);
                }
            })
            return
        } else {
            if (status) {
                logger.info(`${identifier}--------------${value}`);
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