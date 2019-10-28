"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compose = require("koa-compose");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const error_1 = require("./error");
function middleware() {
    return compose([
        logger(),
        error_1.default(),
        serve('./views'),
        serve('./doc'),
        cors(),
        bodyParser({ formLimit: '100mb', jsonLimit: '100mb' }),
    ]);
}
exports.default = middleware;
