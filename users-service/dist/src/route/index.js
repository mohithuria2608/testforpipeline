"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compose = require("koa-compose");
const Router = require("koa-router");
const anonymous_route_1 = require("./anonymous.route");
const children = [
    { routes: anonymous_route_1.default, prefix: '/v1/anonymous/user' },
];
function routes() {
    const router = new Router();
    router
        .get('/api', (ctx) => {
        ctx.body = router.stack.map(i => i.path);
    })
        .get('/echo', (ctx) => {
        ctx.body = { method: ctx.method, headers: ctx.headers, query: ctx.query };
    })
        .post('/echo', (ctx) => {
        ctx.body = { method: ctx.method, headers: ctx.headers, params: ctx.request.body };
    });
    // Nested routers
    children.forEach(child => {
        const nestedRouter = new Router();
        child.routes(nestedRouter);
        router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods());
    });
    return compose([router.routes(), router.allowedMethods()]);
}
exports.default = routes;
