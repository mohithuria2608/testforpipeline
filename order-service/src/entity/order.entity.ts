'use strict';
import * as Joi from '@hapi/joi';
import * as mongoose from "mongoose";
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import * as Services from '../mongo/dao';
import { consolelog, sendSuccess } from '../utils'
import * as CMS from "../cms"
import { Aerospike } from '../aerospike'
import { kafkaService } from '../grpc/client';


export class OrderClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'userId',
            index: 'idx_' + this.set + '_' + 'userId',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'orderId',
            index: 'idx_' + this.set + '_' + 'orderId',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'cmsCartRef',
            index: 'idx_' + this.set + '_' + 'cmsCartRef',
            type: "NUMERIC"
        }
    ]
    public ObjectId = mongoose.Types.ObjectId;
    public DAOManager = new Services.DAOManager();
    protected modelName: SetNames;
    constructor() {
        super('order')
        this.modelName = 'order'
    }

    public orderSchema = Joi.object().keys({
        cartId: Joi.string().required().description("pk"),
        cmsCartRef: Joi.number().required(),
        userId: Joi.string().required().description("sk"),
        orderId: Joi.string().required().description("sk, UAE-1"),
        sdmOrderRef: Joi.number().required().description("sk"),
        cmsOrderRef: Joi.number().required().description("sk"),
        status: Joi.string().valid(
            Constant.DATABASE.STATUS.ORDER.CART.AS,
            Constant.DATABASE.STATUS.ORDER.PENDING.AS,
        ).required(),
        updatedAt: Joi.number().required(),
        addres: Joi.object().keys({
            addressId: Joi.string(),
            sdmAddressRef: Joi.number(),
            cmsAddressRef: Joi.number(),
            bldgName: Joi.string(),
            description: Joi.string(),
            flatNum: Joi.string(),
            tag: Joi.string().valid(
                Constant.DATABASE.TYPE.TAG.HOME,
                Constant.DATABASE.TYPE.TAG.OFFICE,
                Constant.DATABASE.TYPE.TAG.HOTEL,
                Constant.DATABASE.TYPE.TAG.OTHER),
            addressType: Joi.string().valid(
                Constant.DATABASE.TYPE.ADDRESS.PICKUP,
                Constant.DATABASE.TYPE.ADDRESS.DELIVERY),
            lat: Joi.number().required(),
            lng: Joi.number().required(),
        }),
        store: Joi.object().keys({
            sdmStoreRef: Joi.number(),
            lat: Joi.number(),
            lng: Joi.number(),
            address: Joi.string(),
        }),
        items: Joi.array().items(
            Joi.object().keys({
                id: Joi.number().required().description("pk"),
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
            })),
        subTotal: Joi.number(),
        total: Joi.number(),
        tax: Joi.array().items(
            Joi.object().keys({
                name: Joi.string().required(),
                value: Joi.string().required(),
            })),
        shipping: Joi.array().items(
            Joi.object().keys({
                name: Joi.string().required(),
                code: Joi.string().required(),
                value: Joi.string().required(),
            })),
    })

    /**
    * @method INTERNAL
    * @param {string} cartId : cart id
    * @param {string} cmsCartRef : cms cart id
    * */
    async getCartOrder(payload: ICartRequest.ICartId) {
        try {
            if (payload.cartId) {
                let getArg: IAerospike.Get = {
                    set: this.set,
                    key: payload.cartId
                }
                let cart: ICartRequest.ICartData = await Aerospike.get(getArg)
                if (cart && cart.cartId) {
                    return cart
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
            }
            else if (payload.cmsCartRef) {
                let queryArg = {
                    equal: {
                        bin: "cmsCartRef",
                        value: payload.cmsCartRef
                    },
                    set: this.set,
                    background: false,
                }
                let cart: ICartRequest.ICartData[] = await Aerospike.query(queryArg)
                if (cart && cart.length > 0) {
                    return cart[0]
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
            }
            else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getById", error, false)
            return Promise.reject(error)
        }
    }

    async createDefaultCart(payload: IOrderGrpcRequest.ICreateDefaultCart) {
        try {
            let dataToSave: ICartRequest.ICartData = {
                cartId: payload.cartId,
                cmsCartRef: 0,
                sdmOrderRef: 0,
                cmsOrderRef: 0,
                userId: payload.userId,
                orderId: "UAE-1",
                status: Constant.DATABASE.STATUS.ORDER.CART.AS,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                items: [],
                addres: null,
                subTotal: 0,
                total: 0,
                tax: [],
                shipping: [],
                coupon: []
            }
            let putArg: IAerospike.Put = {
                bins: dataToSave,
                set: this.set,
                key: payload.cartId,
                ttl: Constant.SERVER.DEFAULT_CART_TTL,
                create: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createDefaultCart", error, false)
            return Promise.reject(error)
        }
    }

    async updateCartTTL(payload: IOrderGrpcRequest.IUpdateDefaultCartTTL) {
        try {
            let op = [
                Aerospike.operations.touch(0)
            ]
            await Aerospike.operationsOnMap({ set: this.set, key: payload.cartId }, op)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "updateCartTTL", error, false)
            return Promise.reject(error)
        }
    }

    async createCartOnCMS(payload: ICartRequest.IValidateCart, userData: IUserRequest.IUserData) {
        try {
            let cart = []
            let req: ICartCMSRequest.ICreateCart = {
                cms_user_id: 10,//userData.cmsUserRef,
                website_id: 1,
                category_id: 20,
                cart_items: [{ "product_id": 1, "qty": 1, "price": 5, "type_id": "simple" }]// cart
            }
            let cmsCart = await CMS.CartCMSE.createCart(req)
            return cmsCart
        } catch (error) {
            consolelog(process.cwd(), "createCartOnCMS", error, false)
            return Promise.reject(error)
        }
    }

    async updateCart(cmsCart: ICartCMSRequest.ICreateCartCmsRes) {
        try {
            let prevCart = await this.getCartOrder({ cmsCartRef: cmsCart.cms_cart_id })
            let updateCartData = []
            // [
            //     {
            //       "cart_items": [
            //         {
            //           "product_id": "1",
            //           "qty": 1,
            //           "price": 20.185,
            //           "type_id": "simple"
            //         }
            //       ],
            //       "cms_cart_id": "65",
            //       "currency_code": "AED",
            //       "subtotal": 20.19,
            //       "grandtotal": 20.19,
            //       "tax": [

            //       ],
            //       "not_available": [

            //       ],
            //       "is_price_changed": true,
            //       "coupon_code": "",
            //       "success": true
            //     }
            //   ]","timestamp":"2020-01-14T10: 23: 10.196Z"}

            // let dataToUpdate: ICartRequest.IUpdateCartData = {
            //     cartId: payload.cartId,
            //     cmsCartRef: 0,
            //     sdmOrderRef: 0,
            //     cmsOrderRef: 0,
            //     updatedAt: new Date().getTime(),
            //     items: asCart,
            //     subTotal: 0,
            //     total: 0,
            //     tax: [{
            //         name: "VAT",
            //         value: 0.26
            //     }],
            //     shipping: [{
            //         name: "VAT",
            //         code: "FREE",
            //         value: 7.5
            //     }],
            // }
            // let putArg: IAerospike.Put = {
            //     bins: dataToUpdate,
            //     set: this.set,
            //     key: payload.cartId,
            //     update: true,
            // }
            // await Aerospike.put(putArg)
            return {
                // cartId: payload.cartId,
                // userId: userData.id,
                // orderId: "UAE-1",
                // updatedAt: new Date().getTime(),
                // items: invalidMenu ? [] : payload.items.splice(0, 1),
                // notAvailable: payload.items,
                // addres: null,
                // subTotal: 30.23,
                // total: 30.23,
                // tax: [{
                //     name: "VAT",
                //     value: 0.26
                // }],
                // shipping: [{
                //     name: "VAT",
                //     code: "FREE",
                //     value: 7.5
                // }],
                // coupon: [],
                // paymentMethods: [],
                // isPriceChanged: false,
                // status: Constant.DATABASE.STATUS.ORDER.CART.AS,
            }
        } catch (error) {
            consolelog(process.cwd(), "updateCart", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} orderId : order id
    * @param {string} status : order status
    * @param {string} sdmOrderRef : sdm order id
    * @param {string} timeInterval : set timeout interval
    * */
    async getSdmOrder(payload: IOrderGrpcRequest.IGetSdmOrder) {
        try {
            setTimeout(async () => {
                //@todo :get order status from sdm 
                let dataToUpdate: ICartRequest.IUpdateCartData = {
                    status: payload.status,
                    updatedAt: new Date().getTime()
                }
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: this.set,
                    key: payload.cartId,
                    update: true,
                }
                await Aerospike.put(putArg)
                if (payload.status == Constant.DATABASE.STATUS.ORDER.CLOSED.SDM ||
                    payload.status == Constant.DATABASE.STATUS.ORDER.CANCELED.SDM ||
                    payload.status == Constant.DATABASE.STATUS.ORDER.FAILURE.SDM) {
                    let orderData = await this.getCartOrder({ cartId: payload.cartId })
                    this.DAOManager.saveData(this.set, orderData)
                } else {
                    let orderChange = {
                        set: this.set,
                        sdm: {
                            get: true,
                            argv: JSON.stringify(payload)
                        }
                    }
                    kafkaService.kafkaSync(orderChange)
                }
            }, payload.timeInterval)

            return {}
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrder", error, false)
            return Promise.reject(error)
        }
    }
}

export const OrderE = new OrderClass()
