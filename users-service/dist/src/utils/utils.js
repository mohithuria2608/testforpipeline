'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const Joi = require("joi");
const Boom = require("boom");
const Constant = require("../constant/appConstants");
const crypto = require("crypto");
const randomstring = require("randomstring");
const util_1 = require("util");
const displayColors = Constant.SERVER.DISPLAY_COLOR;
exports.sendError = function (data) {
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && (data.hasOwnProperty('message') || data.hasOwnProperty('customMessage'))) {
        let errorToSend;
        if (data.hasOwnProperty('message')) {
            let error = new Error(data.message);
            errorToSend = Boom.boomify(error, { statusCode: data.statusCode });
        }
        else {
            let error = new Error(data.message);
            errorToSend = Boom.boomify(error, { statusCode: data.statusCode });
        }
        errorToSend.output.payload.responseType = data.type;
        return errorToSend;
    }
    else {
        let errorToSend = '';
        if (typeof data === 'object') {
            if (data.name === 'MongoError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.DB_ERROR.message + data.errmsg;
            }
            else if (data.name === 'ApplicationError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.APP_ERROR.message + ' : ';
            }
            else if (data.name === 'ValidationError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.VALIDATION_ERROR.message + data.message;
            }
            else if (data.name === 'CastError') {
                errorToSend += Constant.STATUS_MSG.ERROR.E400.DB_ERROR.message + Constant.STATUS_MSG.ERROR.E400.INVALID_ID.message + data.value;
            }
        }
        else {
            errorToSend = data;
        }
        var customErrorMessage = errorToSend;
        if (typeof customErrorMessage === 'string') {
            if (errorToSend.indexOf("[") > -1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
            }
            customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');
        }
        throw Boom.badRequest(customErrorMessage);
    }
};
exports.sendSuccess = function (successMsg, data) {
    if (typeof data === 'object' && data.hasOwnProperty('password')) {
        delete data['password'];
    }
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('message')) {
        return { statusCode: data.statusCode, message: data.message, type: data.type, data: data.data || null };
    }
    else if (successMsg != null && typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('message')) {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.message;
        return { statusCode: successMsg.statusCode, message: successMsg.message, data: data || null, type: (data.type) ? data.type : Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.type };
    }
    else {
        successMsg = successMsg || Constant.STATUS_MSG.SUCCESS.S200.DEFAULT.message;
        return { statusCode: 200, message: successMsg, data: data || null, type: (data.type) ? data.type : "" };
    }
};
exports.authorizationHeaderObj = Joi.object({
    authorization: Joi.string().required().description("bearer space accessToken")
}).unknown();
exports.cryptData = function (stringToCrypt) {
    return __awaiter(this, void 0, void 0, function* () {
        let hmac = crypto.createHmac('sha256', config.get('cryptoSecret'));
        let crypted = hmac.update(stringToCrypt).digest('hex');
        return crypted;
    });
};
exports.deCryptData = function (stringToCheck, dbString) {
    return __awaiter(this, void 0, void 0, function* () {
        let hmac = crypto.createHmac('sha256', config.get('cryptoSecret'));
        let crypted = hmac.update(stringToCheck).digest('hex');
        return (dbString == crypted) ? true : false;
    });
};
exports.cipherText = function (text) {
    return __awaiter(this, void 0, void 0, function* () {
        let cipher = crypto.createCipher('aes-128-ctr', config.get('cryptoSecret'));
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    });
};
exports.deCipherText = function (text) {
    return __awaiter(this, void 0, void 0, function* () {
        var decipher = crypto.createDecipher('aes-128-ctr', config.get('cryptoSecret'));
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    });
};
exports.generateOtp = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let otp = (Math.floor(1000 + Math.random() * 9000));
        return otp;
    });
};
exports.formatUserData = function (userObj) {
    try {
        userObj = JSON.parse(JSON.stringify(userObj));
        let emailVerify = userObj['emailVerify'] ? userObj['emailVerify']['status'] : false;
        let phoneVerify = userObj['phoneVerify'] ? userObj['phoneVerify']['status'] : false;
        userObj['emailVerify'] = emailVerify;
        userObj['phoneVerify'] = phoneVerify;
        if (userObj['backup'] && userObj['backup']['fileName']) { }
        else
            delete userObj['backup'];
        delete userObj['lastActivityTime'];
        delete userObj['refreshToken'];
        delete userObj['cards'];
        delete userObj['banks'];
        return userObj;
    }
    catch (error) {
        exports.consolelog('formatUserData', error, false);
        return Promise.reject(error);
    }
};
/**
 * @description to form a bucket id from first 3 numbers of _id to make read operations faster in redis
 * @param id
 */
exports.getBucket = (id) => {
    id = id.toString();
    let bucket = id.replace(/\D/g, ""); //regex to replace alphabets from stringified object id
    bucket = bucket.substr(0, 3);
    exports.consolelog('bucket', bucket, true);
    return bucket;
};
exports.getHashTag = (str) => {
    return str.split(" ").filter(obj => { return (obj.indexOf("#") == 0); });
};
exports.arrayToObject = function (array) {
    let data = array.reduce((obj, item) => {
        obj[item.key] = item.value;
        return obj;
    }, {});
    return data;
};
exports.consolelog = function (identifier, value, status) {
    try {
        if (util_1.isArray(value)) {
            value.forEach((obj, i) => {
                if (status) {
                    console.info(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', "<--------------" + identifier + "--------------" + i + "-------------->", obj);
                }
                else {
                    console.error(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', "<--------------" + identifier + "--------------" + i + "-------------->", obj);
                }
            });
            return;
        }
        else {
            if (status) {
                console.info(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', "<--------------" + identifier + "-------------->", value);
            }
            else {
                console.error(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', "<--------------" + identifier + "-------------->", value);
            }
            return;
        }
    }
    catch (error) {
        return;
    }
};
exports.validateLocation = function (lat, long) {
    var valid = true;
    if (lat < -90 || lat > 90) {
        valid = false;
    }
    if (long < -180 || long > 180) {
        valid = false;
    }
    return valid;
};
function sleep(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
exports.generateRandomString = function (digits) {
    return randomstring.generate(digits);
};
