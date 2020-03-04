import * as multer from "@koa/multer";
import * as Router from '@koa/router';
import { sendSuccess } from '../../utils'
import * as Constant from '../../constant'
import { uploadController } from '../../controllers';

const upload = multer({ dest: __dirname + '/../../../../exports' });

export default (router: Router) => {
    router
        .post('/',
            upload.single('product'),
            async (ctx) => {
                try {
                    console.log('ctx.files', ctx.file);
                    let res = await uploadController.uploadImage(ctx.file);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, Constant.DATABASE.LANGUAGE.EN, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse;
                }
                catch (error) {
                    throw error;
                }
            })
}