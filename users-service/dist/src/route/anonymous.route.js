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
const validate = require("koa-joi-validate");
const Joi = require("joi");
const Constant = require("../constant");
const utils = require("../utils");
const controllers_1 = require("../controllers");
exports.default = (router) => {
    router
        .post('/register', validate({
        body: {
            countryCode: Joi.string().min(1).max(6).trim().required(),
            phoneNo: Joi.string().min(8).max(10).trim().required(),
            password: Joi.string().min(6).max(16).trim().required(),
        }
    }), (ctx) => __awaiter(this, void 0, void 0, function* () {
        try {
            let payload = ctx.request.body;
            payload['language'] = ctx.request.header['language'] || Constant.DATABASE.LANGUAGE.EN;
            payload['appVersion'] = ctx.request.header['appVersion'];
            payload['deviceModel'] = ctx.request.header['deviceModel'];
            let registerResponse = yield controllers_1.AnonymousController.register(payload);
            ctx.body = utils.sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, registerResponse);
        }
        catch (error) {
            throw (utils.sendError(error));
        }
    }));
};
