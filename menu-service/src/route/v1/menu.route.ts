import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { menuController } from '../../controllers';
import * as JOI from './common.joi.validator';
import * as ENTITY from '../../entity'
import * as fs from 'fs'
const protobuf = require("protobufjs");


export default (router: Router) => {
    router
        .post('/bootstrap',
            async (ctx) => {
                try {
                    let res = await menuController.postMenu();
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    menuId: Joi.number(),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IMenuRequest.IFetchMenu = ctx.request.query;
                    let res = await menuController.fetchMenu(headers, payload);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/fs',
            async (ctx) => {
                try {
                    let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
                    let menu = JSON.parse(rawdata);
                    ctx.body = menu
                }
                catch (error) {
                    throw error
                }
            })
        .get('/as',
            async (ctx) => {
                try {
                    var myMessage = protobuf.Writer.create()
                        .string(JSON.stringify(await ENTITY.MenuE.getMenu({ menuId: 5 })))
                        .finish();
                    ctx.body = myMessage
                }
                catch (error) {
                    throw error
                }
            })
}