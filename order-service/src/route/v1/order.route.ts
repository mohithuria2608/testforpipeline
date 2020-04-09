import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { orderController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .post('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    addressId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_ADDRESS.message)),
                    orderType: Joi.string().required().valid(Constant.DATABASE.TYPE.ORDER.DELIVERY.AS, Constant.DATABASE.TYPE.ORDER.PICKUP.AS).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    paymentMethodId: Joi.number().required().valid(Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD, Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    cartId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_CART.message)),
                    curMenuId: Joi.number().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    menuUpdatedAt: Joi.number().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    lat: Joi.number().min(-90).max(90).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
                    lng: Joi.number().min(-180).max(180).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
                    couponCode: Joi.string().allow("").error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUPON.message)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IOrderRequest.IPostOrder = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await orderController.postOrder(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
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
                    isActive: Joi.number().valid(0, 1).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    page: Joi.number().min(1).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IOrderRequest.IOrderHistory = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await orderController.orderHistory(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/detail',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    orderId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_ORDER.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IOrderRequest.IOrderDetail = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await orderController.orderDetail(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/status',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    orderId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_ORDER.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IOrderRequest.IOrderStatus = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await orderController.orderStatusPing(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/track',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    cCode: Joi.string().required().valid(Constant.DATABASE.CCODE.UAE).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY_CODE.message)),
                    phnNo: Joi.string().required().min(9).max(9).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PHONE_NO.message)),
                    orderId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_ORDER.message))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IOrderRequest.ITrackOrder = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await orderController.trackOrder(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/scheduler',
            async (ctx) => {
                orderController.getSdmOrderScheduler();
                ctx.status = 200;
                ctx.body = "success"
            })
}