import * as config from "config"
import { Middleware, Context } from 'koa'
import * as Constant from '../constant';
import { consolelog } from '../utils';
import { kafkaService } from '../grpc/client';

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        let executionTime;
        let startTime = new Date().getTime();
        ctx.res.on('finish', () => {
            executionTime = new Date().getTime() - startTime;
            let data : ICommonRequest.IActivityLogger = {
                type: Constant.DATABASE.TYPE.ACTIVITY_LOG.REQUEST,
                info: {
                    'request': {
                        'query': ctx.request.query,
                        'path': ctx.path,
                        'method': ctx.method,
                        'pathParams': ctx.params,
                        "body": ctx.request.body
                    },
                    'response': {
                        'statusCode': (ctx.body && ctx.body.statusCode) ? ctx.body.statusCode : "",
                        'message': (ctx.body && ctx.body.message) ? ctx.body.message : ""
                    },
                    'ip': ctx.request.ip,
                    'executionTime': executionTime,
                    'user': ctx.state.user ? ctx.state.user : {}
                },
                description: "",
                options: {
                    env: Constant.SERVER.ENV[config.get("env")],
                    
                },
                createdAt: new Date().getTime(),
            }
            let dataToSave = {
                set: Constant.SET_NAME.LOGGER,
                mdb: {
                    create: true,
                    argv: JSON.stringify(data)
                }
            }
            // consolelog(process.cwd(), "activity log", JSON.stringify(data), true)
            // kafkaService.kafkaSync(dataToSave)
        })

        await next()
        ctx.set('X-Response-Time', `${new Date().getTime() - startTime}ms`);
    }
}