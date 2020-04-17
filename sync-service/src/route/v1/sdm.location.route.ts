import * as Router from 'koa-router'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { sdmLocationController } from '../../controllers';

export default (router: Router) => {
    router
        // .post('/',
        //     async (ctx) => {
        //         try {
        //             sdmLocationController.syncLocationData();
        //             let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, {})
        //             ctx.status = sendResponse.statusCode;
        //             ctx.body = sendResponse
        //         }
        //         catch (error) {
        //             throw error
        //         }
        //     })
        .post('/store-status',
            async (ctx) => {
                try {
                    sdmLocationController.syncStoreStatusData();
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, {})
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        // .get('/scheduler/store',
        //     async (ctx) => {
        //         sdmLocationController.syncLocationData();
        //         ctx.status = 200;
        //         ctx.body = "success"
        //     })
        .get('/scheduler/store-status',
            async (ctx) => {
                sdmLocationController.syncStoreStatusData();
                ctx.status = 200;
                ctx.body = "success"
            })
}