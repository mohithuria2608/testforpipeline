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
const Koa = require("koa");
const utils_1 = require("./utils");
const middlewares_1 = require("./middlewares");
const route_1 = require("./route");
const app = new Koa();
app.use(middlewares_1.default());
app.use(route_1.default());
exports.start = (() => __awaiter(this, void 0, void 0, function* () {
    try {
        const port = 3000;
        const server = app.listen(port);
        yield utils_1.bootstrap(server);
    }
    catch (err) {
        console.error(err);
    }
}))();
