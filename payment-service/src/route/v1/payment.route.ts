import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { paymentController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .get('/',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    cartId: Joi.string().required(),
                    cartUpdatedAt: Joi.number().required(),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    // let payload: ICartRequest.IGetCart = ctx.request.query;
                    // let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    // let res = await cartController.getCart(headers, payload, auth);
                    // let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    // ctx.status = sendResponse.statusCode;
                    // ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/methods',
            ...getMiddleware([
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    cartId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_CART.message)),
                    // storeCode: Joi.string().trim().required()
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IPaymentGrpcRequest.IGetPaymentMethods = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await paymentController.getPaymentMethods(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/initiate',
            ...getMiddleware([
                // Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    storeCode: Joi.string().trim().required(),
                    orderId: Joi.string().trim().required().description("cms order id"),
                    amount: Joi.number().required().greater(0),
                    paymentMethodId: Joi.number().integer(),
                    channel: Joi.string().valid('Mobile', 'Web')
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IPaymentGrpcRequest.IInitiatePayment = ctx.request.body;
                    payload.locale = headers.language.toLowerCase();
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await paymentController.initiatePayment(payload, auth);
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
                // Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    storeCode: Joi.string().trim().required(),
                    noonpayOrderId: Joi.number().integer().when('orderId', { is: null, then: Joi.required() }),
                    orderId: Joi.string().trim(),
                    paymentStatus: Joi.string().trim().optional().valid(
                        Constant.DATABASE.STATUS.PAYMENT.INITIATED,
                        Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                        Constant.DATABASE.STATUS.PAYMENT.CANCELLED,
                        Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                        Constant.DATABASE.STATUS.PAYMENT.REFUNDED,
                        Constant.DATABASE.STATUS.PAYMENT.EXPIRED,
                        Constant.DATABASE.STATUS.PAYMENT.FAILED
                    )
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IPaymentGrpcRequest.IGetPaymentStatus = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await paymentController.getPaymentStatus(payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/capture',
            ...getMiddleware([
                // Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    storeCode: Joi.string().trim().required(),
                    noonpayOrderId: Joi.number().integer().required(),
                    orderId: Joi.string().trim().optional(),
                    amount: Joi.number().required().greater(0)
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IPaymentGrpcRequest.ICapturePayment = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await paymentController.capturePayment(payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/reverse',
            ...getMiddleware([
                // Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    storeCode: Joi.string().trim().required(),
                    noonpayOrderId: Joi.number().integer().required()
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IPaymentGrpcRequest.IReversePayment = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await paymentController.reversePayment(payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .post('/refund',
            ...getMiddleware([
                // Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    storeCode: Joi.string().trim().required(),
                    noonpayOrderId: Joi.number().integer().required(),
                    amount: Joi.number().required().greater(0),
                    captureTransactionId: Joi.string().trim().optional()
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: IPaymentGrpcRequest.IRefundPayment = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await paymentController.refundPayment(payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}