'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import * as CMS from "../cms"
import { Aerospike } from '../aerospike'

export class CartClass extends BaseEntity {
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

    constructor() {
        super('cart')
    }

    public cartSchema = Joi.object().keys({
        cartId: Joi.string().required().description("pk"),
        cmsCartRef: Joi.number().required(),
        userId: Joi.string().required().description("sk"),
        orderId: Joi.string().required().description("sk, UAE-1"),
        sdmOrderRef: Joi.number().required().description("sk"),
        cmsOrderRef: Joi.number().required().description("sk"),
        status: Joi.string().valid(
            Constant.DATABASE.STATUS.ORDER.CART.AS,
        ).required(),
        updatedAt: Joi.number().required(),
        address: Joi.object().keys({
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
        amount: Joi.array().items(
            Joi.object().keys({
                type: Joi.string().required(),
                name: Joi.string().required(),
                code: Joi.string().required(),
                amount: Joi.number().required(),
            })),
    })

    /**
    * @method INTERNAL
    * @param {string} cartId : cart id
    * @param {string} cmsCartRef : cms cart id
    * */
    async getCart(payload: ICartRequest.IGetCart): Promise<ICartRequest.ICartData> {
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
            consolelog(process.cwd(), "getCart", error, false)
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
                address: null,
                amount: []
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

    async assignNewCart(cartId: string, userId: string) {
        try {
            await this.createDefaultCart({ userId: userId, cartId: cartId })
            return
        } catch (error) {
            consolelog(process.cwd(), "assignNewCart", error, false)
            return Promise.reject(error)
        }
    }

    async createCartOnCMS(payload: ICartRequest.IValidateCart, userData: IUserRequest.IUserData) {
        try {
            let cart = []
            payload.items.map(sitem => {
                if (sitem['typeId'] == 'simple') {
                    cart.push({
                        product_id: sitem.id,
                        qty: sitem.qty ? sitem.qty : 1,
                        price: sitem.finalPrice,
                        type_id: sitem['typeId']
                    })
                }
                else if (sitem['typeId'] == 'configurable') {
                    let super_attribute = {};
                    let price = null;
                    if (sitem['items'] && sitem['items'].length > 0) {
                        sitem['items'].map(i => {
                            if (parseInt(i['sku']) == sitem['selectedItem']) {
                                price = i['finalPrice']
                                if (sitem['configurableProductOptions'] && sitem['configurableProductOptions'].length > 0) {
                                    sitem['configurableProductOptions'].map(co => {
                                        let value = null
                                        if (co['options'] && co['options'].length > 0) {
                                            co['options'].map(o => {
                                                if (o['isSelected'] == 1) {
                                                    value = o['id']
                                                }
                                            })
                                            super_attribute[co['id']] = value
                                        }
                                    })
                                }
                            }
                        })
                    }
                    cart.push({
                        product_id: sitem.id,
                        qty: sitem.qty ? sitem.qty : 1,
                        price: price,
                        type_id: sitem['typeId'],
                        super_attribute: super_attribute
                    })
                }
                else if (sitem['typeId'] == 'bundle') {
                    let bundle_option = {};
                    let selection_configurable_option = {};
                    sitem['bundleProductOptions'].map(bpo => {
                        if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
                            bpo['productLinks'].map(pl => {
                                if (pl['selected'] == 1) {
                                    if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                        if (bundle_option[pl['option_id']] == null)
                                            bundle_option[pl['option_id']] = {}
                                        bundle_option[pl['option_id']][pl['id']] = pl['selection_id']

                                    } else {
                                        bundle_option[pl['option_id']] = pl['selection_id']
                                    }
                                }
                                if (bundle_option.hasOwnProperty(pl['option_id'])) {
                                    if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                        pl['subOptions'].map(so => {
                                            if (pl['selected'] == 1 && so['selected'] == 1) {
                                                selection_configurable_option[pl['selection_id']] = so['id']
                                            }
                                            else {
                                                if (selection_configurable_option[pl['selection_id']] == undefined)
                                                    selection_configurable_option[pl['selection_id']] = ""
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                    cart.push({
                        product_id: sitem.id,
                        qty: sitem.qty,
                        price: sitem.finalPrice,
                        type_id: sitem['typeId'],
                        bundle_option: bundle_option,
                        selection_configurable_option: selection_configurable_option,
                    })
                }
                else if (sitem['typeId'] == 'bundle_group') {
                    return Promise.reject("Not handled bundle group products")
                    cart.push({
                        product_id: sitem.id,
                        qty: sitem.qty,
                        price: sitem.finalPrice,
                        type_id: "bundle"
                    })
                }
                else {
                    return Promise.reject("Unhandled  products")
                }
            })
            let req: ICartCMSRequest.ICreateCartCms = {
                cms_user_id: 10, //userData.cmsUserRef,
                website_id: 1,
                category_id: 20,
                cart_items: cart, // [{ "product_id": 1, "qty": 1, "price": 5, "type_id": "simple" }]// cart,
            }
            if (payload.couponCode)
                req['coupon_code'] = payload.couponCode
            else
                req['coupon_code'] = ""
            let cmsCart = await CMS.CartCMSE.createCart(req)
            return cmsCart
        } catch (error) {
            consolelog(process.cwd(), "createCartOnCMS", error, false)
            return Promise.reject(error)
        }
    }

    async updateCart(cartId: string, cmsCart: ICartCMSRequest.ICmsCartRes, curItems?: any) {
        try {
            let prevCart = await this.getCart({ cartId: cartId })
            if (curItems == undefined)
                curItems = prevCart.items
            let dataToUpdate: ICartRequest.ICartData = {}
            dataToUpdate['cmsCartRef'] = parseInt(cmsCart.cms_cart_id.toString())
            dataToUpdate['updatedAt'] = new Date().getTime()
            dataToUpdate['isPriceChanged'] = cmsCart.is_price_changed ? 1 : 0
            dataToUpdate['notAvailable'] = []
            dataToUpdate['items'] = []

            let amount = []
            amount.push({
                type: "SUB_TOTAL",
                name: "Sub Total",
                code: "SUB_TOTAL",
                amount: parseInt(cmsCart.subtotal.toString()),
                sequence: 1
            })
            if (cmsCart.discount_amount && cmsCart.coupon_code && cmsCart.coupon_code != "") {
                amount.push({
                    type: "DISCOUNT",
                    name: "Discount",
                    code: cmsCart.coupon_code,
                    amount: parseInt(cmsCart.discount_amount.toString()),
                    sequence: 2
                })
                dataToUpdate['couponApplied'] = 1
            } else
                dataToUpdate['couponApplied'] = 0
            if (cmsCart.tax && cmsCart.tax.length > 0) {
                amount.push({
                    type: "TAX",
                    name: cmsCart.tax[0].tax_name,
                    code: cmsCart.tax[0].tax_name,
                    amount: parseInt(cmsCart.tax[0].amount.toString()),
                    sequence: 3
                })
            } else {
                amount.push({
                    type: "TAX",
                    name: "VAT",
                    code: "VAT",
                    amount: 0,
                    sequence: 3
                })
            }
            amount.push({
                type: "SHIPPING",
                name: "Free Delivery",
                code: "FLAT",
                amount: 7.5,
                sequence: 4
            })
            amount.push({
                type: "TOTAL",
                name: "Total",
                code: "TOTAL",
                amount: parseInt(cmsCart.grandtotal.toString()),
                sequence: 5
            })
            dataToUpdate['amount'] = amount

            let parsedData = {}
            if (cmsCart.cart_items && cmsCart.cart_items.length > 0) {
                for (const obj of curItems) {
                    console.log("1", obj.id)
                    let parsedData = {}
                    for (const elem of cmsCart.cart_items) {
                        console.log("2", elem.product_id)
                        if (obj.id == elem.product_id && (parsedData[obj.id] == undefined)) {
                            parsedData[obj.id] = true
                            dataToUpdate['items'].push(obj)
                        }
                    }
                    if (parsedData[obj.id] == undefined)
                        dataToUpdate['notAvailable'].push(obj)
                }
            } else {
                dataToUpdate['notAvailable'] = curItems
            }
            let putArg: IAerospike.Put = {
                bins: dataToUpdate,
                set: this.set,
                key: prevCart.cartId,
                update: true,
            }
            await Aerospike.put(putArg)
            let newCart = await this.getCart({ cartId: cartId })
            return newCart
        } catch (error) {
            consolelog(process.cwd(), "updateCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const CartE = new CartClass()
