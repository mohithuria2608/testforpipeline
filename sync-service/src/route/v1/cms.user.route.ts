import * as multer from "@koa/multer";
import * as Router from 'koa-router'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cmsUserController } from '../../controllers';

const upload = multer({ dest: __dirname + '/../../exports' });

export default (router: Router) => {
    router
        .post('/cms',
            upload.single('file'),
            async (ctx) => {
                try {
                    let res = await cmsUserController.migrateUsers(ctx.file);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse;
                } catch (error) {
                    throw error;
                }
            }
        )
}