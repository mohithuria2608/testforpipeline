"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CONSTANT = require("../constant/appConstants");
const utils = require("../utils");
exports.default = (opts) => {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (err) {
            let errReturn = yield errorHandler(err);
            ctx.status = errReturn.statusCode;
            ctx.body = errReturn.payload;
        }
    });
};
let errorHandler = (err) => __awaiter(this, void 0, void 0, function* () {
    utils.consolelog('errorHandler', JSON.stringify(err), false);
    if (err.isBoom) {
        return err.output;
    }
    else {
        if (typeof err == "object" && err.message) {
            if (err.hasOwnProperty('statusCode')) {
                return {
                    statusCode: err.statusCode,
                    payload: err,
                    headers: {}
                };
            }
            else if (typeof err.message == "string" && err.message.substring("Invalid Request")) {
                let splitJoiErr = err.message.split("[");
                splitJoiErr = splitJoiErr[1] ? splitJoiErr[1].split(']') : [err.message];
                let customErrorMessage = splitJoiErr[0];
                customErrorMessage = customErrorMessage.replace(/"/g, '');
                customErrorMessage = customErrorMessage.replace('[', '');
                customErrorMessage = customErrorMessage.replace(']', '');
                return {
                    statusCode: 400,
                    payload: CONSTANT.STATUS_MSG.ERROR.E400.CUSTOM_VALIDATION_ERROR(customErrorMessage),
                    headers: {}
                };
            }
            else {
                return {
                    statusCode: 400,
                    payload: CONSTANT.STATUS_MSG.ERROR.E400.DEFAULT,
                    headers: {}
                };
            }
        }
        else {
            return {
                statusCode: 400,
                payload: CONSTANT.STATUS_MSG.ERROR.E400.DEFAULT,
                headers: {}
            };
        }
    }
});
