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
                Constant.MIDDLEWARE.AUTH,
                Constant.MIDDLEWARE.ACTIVITY_LOG
            ]),
            validate({
                headers: JOI.COMMON_HEADERS,
                body: {
                    cartId: Joi.string().required(),
                    curMenuId: Joi.number(),
                    menuUpdatedAt: Joi.number(),
                    lat: Joi.number().min(0).max(90),
                    lng: Joi.number().min(-180).max(180),
                    items: Joi.array().items(
                        Joi.object().keys({
                            qty: Joi.number().required(),
                            id: Joi.number().required(),
                            position: Joi.number().required(),
                            name: Joi.string().required(),
                            description: Joi.string().required(),
                            inSide: Joi.string().required(),
                            finalPrice: Joi.number().required(),
                            specialPrice: Joi.number().required(),
                            typeId: Joi.string().valid("simple", "configurable", "bundle", "bundle_group").required(),
                            selectedItem: Joi.number().required(),
                            metaKeyword: Joi.array().items(Joi.string()),
                            products: Joi.array().items(
                                Joi.object().keys({
                                    id: Joi.number().required(),
                                    position: Joi.number().required(),
                                    name: Joi.string().required(),
                                    description: Joi.string().required(),
                                    inSide: Joi.string().required(),
                                    finalPrice: Joi.number().required(),
                                    specialPrice: Joi.number().required(),
                                    typeId: Joi.string().valid("bundle").required(),
                                    metaKeyword: Joi.array().items(Joi.string()),
                                    bundleProductOptions: Joi.array().items(
                                        Joi.object().keys({
                                            position: Joi.number().required(),
                                            isDependent: Joi.number().required(),
                                            maximumQty: Joi.number().required(),
                                            minimumQty: Joi.number().required(),
                                            title: Joi.string().required(),
                                            ingredient: null,
                                            type: Joi.string().valid("radio").required(),
                                            productLinks: Joi.array().items(
                                                Joi.object().keys({
                                                    position: Joi.number().required(),
                                                    price: Joi.number().required(),
                                                    id: Joi.number().required(),
                                                    name: Joi.string().required(),
                                                    selectionQty: Joi.number().required(),
                                                    subOptions: Joi.array().items(
                                                        Joi.object().keys({
                                                            price: Joi.number().required(),
                                                            selected: Joi.number().required(),
                                                            name: Joi.string().required()
                                                        })),
                                                    selected: Joi.number().required(),
                                                    default: Joi.string().required(),
                                                    dependentSteps: Joi.array()
                                                }))
                                        })),
                                    selectedItem: Joi.number().required(),
                                    configurableProductOptions: null,
                                    products: null,
                                    sku: Joi.string().required(),
                                    imageSmall: Joi.string().required(),
                                    imageThumbnail: Joi.string().required(),
                                    image: Joi.string().required(),
                                    taxClassId: Joi.string().required(),
                                    virtualGroup: Joi.number().required(),
                                    visibility: Joi.number().required(),
                                    associative: Joi.string().required(),
                                })),
                            variants: Joi.array().items(
                                Joi.object().keys({
                                    id: Joi.number().required(),
                                    title: Joi.string().required(),
                                    subtitle: Joi.string().required(),
                                    selIndex: Joi.number().required(),
                                    options: Joi.array().items(
                                        Joi.object().keys({
                                            id: Joi.number().required(),
                                            position: Joi.number().required(),
                                            title: Joi.string().required(),
                                            isSelected: Joi.number().required()
                                        }))
                                })),
                            bundleProductOptions: Joi.array().items(
                                Joi.object().keys({
                                    position: Joi.number().required(),
                                    isDependent: Joi.number().required(),
                                    maximumQty: Joi.number().required(),
                                    minimumQty: Joi.number().required(),
                                    title: Joi.string().required(),
                                    ingredient: null,
                                    type: Joi.string().valid("radio", "checkbox").required(),
                                    productLinks: Joi.array().items(
                                        Joi.object().keys({
                                            position: Joi.number().required(),
                                            price: Joi.number().required(),
                                            id: Joi.number().required(),
                                            name: Joi.string().required(),
                                            selectionQty: Joi.number().required(),
                                            subOptions: Joi.array().items(
                                                Joi.object().keys({
                                                    price: Joi.number().required(),
                                                    selected: Joi.number().required(),
                                                    name: Joi.string().required()
                                                })),
                                            selected: Joi.number().required(),
                                            default: Joi.string().required(),
                                            dependentSteps: Joi.array()
                                        }))
                                })),
                            configurableProductOptions: Joi.array().items(
                                Joi.object().keys({
                                    id: Joi.number().required(),
                                    position: Joi.number().required(),
                                    title: Joi.string().required(),
                                    subtitle: Joi.string().required(),
                                    selIndex: Joi.number().required(),
                                    options: Joi.array().items(
                                        Joi.object().keys({
                                            isSelected: Joi.number().required(),
                                            position: Joi.number().required(),
                                            title: Joi.string().required(),
                                            id: Joi.number().required()
                                        }))
                                })),
                            sku: Joi.string().required(),
                            imageSmall: Joi.string().required(),
                            imageThumbnail: Joi.string().required(),
                            image: Joi.string().required(),
                            taxClassId: Joi.string().required(),
                            virtualGroup: Joi.number().required(),
                            visibility: Joi.number().required(),
                            associative: Joi.string().required(),
                        }))
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICartRequest.IValidateCart = ctx.request.body;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await cartController.postCart(headers, payload, auth);
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
                    cartId: Joi.string().required(),
                    cartUpdatedAt: Joi.number().required(),
                }
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let payload: ICartRequest.IGetCart = ctx.request.query;
                    let auth: ICommonRequest.AuthorizationObj = ctx.state.user
                    let res = await cartController.getCart(headers, payload, auth);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}