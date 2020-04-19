import * as multer from "@koa/multer";
import * as Router from '@koa/router';
import { sendSuccess } from '../../utils'
import * as Constant from '../../constant'
import { uploadController } from '../../controllers';

const upload = multer({ dest: __dirname + '/../../exports' });

export default (router: Router) => {
    router
        .post('/single-image',
            upload.single('image'),
            async (ctx) => {
                try {
                    let res = await uploadController.singleImage(ctx.file);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse;
                } catch (error) {
                    throw error;
                }
            }
        )
        .post('/single-zip',
            upload.single('payload'),
            async (ctx) => {
                try {
                    let res = await uploadController.singleFile(ctx.file);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse;
                }
                catch (error) {
                    throw error;
                }
            }
        )
        .post('/bulk-image',
            upload.array('image'),
            async (ctx) => {
                try {
                    let res = await uploadController.bulkImage(ctx.files);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse;
                }
                catch (error) {
                    throw error;
                }
            }
        )
}