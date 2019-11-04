import { Middleware, Context } from 'koa'
import * as Constant from '../constant';
import { consolelog } from '../utils';
// import * as ENTITY from '../entity'

export default (opts?): Middleware => {
    return async (ctx: Context, next) => {
        let executionTime;
        let startTime = new Date().getTime();
        ctx.res.on('finish', () => {
            executionTime = new Date().getTime() - startTime;
            let dataToSave = {
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
                    'userId': ctx.state.user ? ctx.state.user._id : null
                },
                description: "",
                createdAt: new Date().getTime(),
            }
            consolelog("activity log", dataToSave, true, 'entryLog')
            // ENTITY.ActivitylogClassC.createOneEntity(dataToSave)
        })

        await next()
        ctx.set('X-Response-Time', `${new Date().getTime() - startTime}ms`);
    }
}