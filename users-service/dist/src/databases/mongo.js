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
const mongoose_1 = require("mongoose");
const config = require("config");
const utils = require("../utils");
class mongo {
    constructor() {
        this.mongoDbUrl = config.get('dbConfig.dbUrl');
    }
    mongoConnect(server) {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.set('debug', true);
            mongoose_1.set('useFindAndModify', false);
            mongoose_1.connection.on('error', err => { console.error('Database error. ', err); })
                .on('close', (error) => {
                utils.consolelog('Database connection closed. ', error, false);
            });
            mongoose_1.connect(this.mongoDbUrl, { useCreateIndex: true, useNewUrlParser: true }, function (err) {
                if (err) {
                    console.error('Database connection error. ', err);
                    return Promise.reject(err);
                }
            });
            console.info(`Connected to ${this.mongoDbUrl}`);
            return {};
        });
    }
}
exports.mongo = mongo;
exports.mongoC = new mongo();
