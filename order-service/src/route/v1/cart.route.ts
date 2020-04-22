import * as Joi from '@hapi/joi';
import * as Router from 'koa-router'
import { getMiddleware, validate } from '../../middlewares'
import * as Constant from '../../constant'
import { sendSuccess } from '../../utils'
import { cartController } from '../../controllers';
import * as JOI from './common.joi.validator';

export default (router: Router) => {
    router
        .post('/',
            ...getMiddleware([
                // Constant.MIDDLEWARE.APP_VERSION,
                Constant.MIDDLEWARE.AUTH
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    orderType: Joi.string().valid(Constant.DATABASE.TYPE.ORDER.DELIVERY.AS, Constant.DATABASE.TYPE.ORDER.PICKUP.AS).default(Constant.DATABASE.TYPE.ORDER.DELIVERY.AS).error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    cartId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_CART.message)),
                    curMenuId: Joi.number().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    menuUpdatedAt: Joi.number().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                    lat: Joi.number().unsafe().min(-90).max(90).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
                    lng: Joi.number().unsafe().min(-180).max(180).error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
                    couponCode: Joi.string().allow("").error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUPON.message)),
                    items: Joi.any().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PRODUCTS.message)),
                    selFreeItem: Joi.any().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_PRODUCTS.message)),

                    /**
                     * @description : ignore
                     */
                    addressId: Joi.any(),
                    paymentMethodId: Joi.number().valid(Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD, Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICartRequest.IValidateCart = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await cartController.validateCart(headers, payload, auth);
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
                Constant.MIDDLEWARE.AUTH
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                query: {
                    cartId: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_CART.message)),
                    cartUpdatedAt: Joi.number().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICartRequest.IGetCart = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await cartController.getCart(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, headers.language, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}