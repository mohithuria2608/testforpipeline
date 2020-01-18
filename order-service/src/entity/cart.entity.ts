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
        super('order')
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
        subTotal: Joi.number(),
        total: Joi.number(),
        discountAmt: Joi.number(),
        couponCode: Joi.string(),
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
    async getCart(payload: ICartRequest.ICartId) {
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
                subTotal: 0,
                total: 0,
                discountAmt: 0,
                couponCode: "",
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
            payload.items.map(obj => {
                if (obj['typeId'] == 'simple') {
                    cart.push({
                        product_id: obj.id,
                        qty: obj.qty,
                        price: obj.finalPrice,
                        type_id: obj['typeId']
                    })
                }
                else if (obj['typeId'] == 'configurable') {
                    let super_attribute = {};
                    let price = null;
                    if (obj['products'] && obj['products'].length > 0) {
                        obj['products'].map(p => {
                            if (parseInt(p['sku']) == obj['selectedItem']) {
                                price = p['finalPrice']
                                if (obj['configurableProductOptions'] && obj['configurableProductOptions'].length > 0) {
                                    obj['configurableProductOptions'].map(co => {
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
                        product_id: obj.id,
                        qty: obj.qty,
                        price: price,
                        type_id: obj['typeId'],
                        super_attribute: super_attribute
                    })
                }
                else if (obj['typeId'] == 'bundle') {
                    return Promise.reject("Not handled bundle products")
                    let bundle_option = {};
                    let selection_configurable_option = {};
                    let bundle_super_attribute = {};
                    obj['bundleProductOptions'].map(bpo => {
                        let bundleOptValue = null
                        if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
                            bpo['productLinks'].map(pl => {
                                if (pl['selected'] == 1) {
                                    if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                        let bundleOptSubValue = {}
                                        pl['subOptions'].map(so => {
                                            if (so['selected'] == 1)
                                                bundleOptSubValue[pl['id']] = so['id']  //@TODO : have to change
                                        })
                                        bundleOptValue = bundleOptSubValue
                                    } else {
                                        bundleOptValue = pl['position']
                                    }
                                }
                            })
                        }
                        bundle_option[bpo['id']] = bundleOptValue
                    })
                    cart.push({
                        product_id: obj.id,
                        qty: obj.qty,
                        price: obj.finalPrice,
                        type_id: obj['typeId'],
                        bundle_option: bundle_option,
                        selection_configurable_option: selection_configurable_option,
                        bundle_super_attribute: bundle_super_attribute,
                    })
                }
                else if (obj['typeId'] == 'bundle_group') {
                    return Promise.reject("Not handled bundle group products")
                    cart.push({
                        product_id: obj.id,
                        qty: obj.qty,
                        price: obj.finalPrice,
                        type_id: "bundle"
                    })
                } else {
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

    async updateCart(cartId: string, cmsCart: ICartCMSRequest.ICmsCartRes, curItems?: IMenuGrpcRequest.IProduct[]) {
        try {
            let prevCart = await this.getCart({ cartId: cartId })
            if (curItems == undefined)
                curItems = prevCart.items
            let dataToUpdate: ICartRequest.IUpdateCartData = {}
            dataToUpdate['cmsCartRef'] = parseInt(cmsCart.cms_cart_id.toString())
            dataToUpdate['updatedAt'] = new Date().getTime()
            dataToUpdate['subTotal'] = cmsCart.subtotal
            dataToUpdate['total'] = cmsCart.grandtotal
            dataToUpdate['shipping'] = [] // cmsCart.shipping
            dataToUpdate['isPriceChanged'] = cmsCart.is_price_changed ? 1 : 0
            dataToUpdate['notAvailable'] = []
            dataToUpdate['items'] = []
            if (cmsCart.coupon_code) {
                dataToUpdate['discountAmt'] = cmsCart.discount_amount ? cmsCart.discount_amount : 0
                dataToUpdate['couponCode'] = cmsCart.coupon_code ? cmsCart.coupon_code : ""
            }
            let updateTax = []
            dataToUpdate['tax'] = updateTax

            if (cmsCart.cart_items && cmsCart.cart_items.length > 0) {
                curItems.map(obj => {
                    cmsCart.cart_items.map(elem => {
                        if (obj.id == elem.product_id) {
                            dataToUpdate['items'].push(obj)
                        } else {
                            dataToUpdate['notAvailable'].push(obj)
                        }
                    })
                })
                if (dataToUpdate['notAvailable'].length < 0) {
                    dataToUpdate['notAvailable'] = [
                        {
                            "id": 41,
                            "position": 4,
                            "name": "Twister Box",
                            "description": "Twister, 1 PC chicken, fries, coleslaw and Pepsi",
                            "inSide": 1,
                            "finalPrice": 23,
                            "specialPrice": 22.5,
                            "typeId": "bundle_group",
                            "catId": 21,
                            "selectedItem": "44",
                            "metaKeyword": [
                                "Twister Box"
                            ],
                            "items": [
                                {
                                    "id": 15,
                                    "position": 1,
                                    "name": "Twister Box - Medium",
                                    "description": "",
                                    "inSide": 0,
                                    "finalPrice": 23,
                                    "specialPrice": 22.5,
                                    "typeId": "bundle",
                                    "catId": 21,
                                    "metaKeyword": [
                                        "Twister Box - Medium"
                                    ],
                                    "bundleProductOptions": [
                                        {
                                            "position": 1,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Chicken",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 15,
                                                    "id": 13,
                                                    "name": "Chicken Pc - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 15,
                                                    "id": 14,
                                                    "name": "Chicken Pc - Spicy",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 2,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sandwich",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 12,
                                                    "id": 17,
                                                    "name": "Twister Sandwich - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": [
                                                        3
                                                    ]
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 32,
                                                    "id": 27,
                                                    "name": "Twister Sandwich",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": [
                                                        3,
                                                        9
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "position": 3,
                                            "isDependent": 1,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Customize your Condiments",
                                            "ingredient": 1,
                                            "type": "checkbox",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 0,
                                                    "id": 21,
                                                    "name": "American Cheese",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 18,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 2,
                                                            "selected": 1,
                                                            "name": "Regular",
                                                            "id": 19,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 4,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 20,
                                                            "sku": "810001"
                                                        }
                                                    ],
                                                    "selected": 1,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 0,
                                                    "id": 25,
                                                    "name": "Tomato",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 1,
                                                            "name": "None",
                                                            "id": 22,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Regular",
                                                            "id": 23,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 24,
                                                            "sku": "811703"
                                                        }
                                                    ],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 9,
                                            "isDependent": 1,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Customize your Condiments new ",
                                            "ingredient": 1,
                                            "type": "checkbox",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 0,
                                                    "id": 21,
                                                    "name": "American Cheese",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 18,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 2,
                                                            "selected": 1,
                                                            "name": "Regular",
                                                            "id": 19,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 4,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 20,
                                                            "sku": "810001"
                                                        }
                                                    ],
                                                    "selected": 1,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 0,
                                                    "id": 25,
                                                    "name": "Tomato",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 1,
                                                            "name": "None",
                                                            "id": 22,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Regular",
                                                            "id": 23,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 24,
                                                            "sku": "811703"
                                                        }
                                                    ],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 4,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sides",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 8,
                                                    "id": 8,
                                                    "name": "Fries Original Medium",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": "1",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 7,
                                                    "id": 11,
                                                    "name": "Fries Spicy Medium",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 5,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Beverage",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 8,
                                                    "id": 4,
                                                    "name": "Pepsi Medium",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        }
                                    ],
                                    "selectedItem": 0,
                                    "configurableProductOptions": [],
                                    "sku": "44",
                                    "imageSmall": "/d/u/dummy-product.png",
                                    "imageThumbnail": "/d/u/dummy-product.png",
                                    "image": "/d/u/dummy-product.png",
                                    "sel1Value": 16287,
                                    "sel2Value": -1,
                                    "sel3Value": -1,
                                    "taxClassId": 2,
                                    "virtualGroup": 16298,
                                    "visibility": 4,
                                    "associative": 1
                                },
                                {
                                    "id": 26,
                                    "position": 2,
                                    "name": "Twister Box - Large",
                                    "description": "",
                                    "inSide": 0,
                                    "finalPrice": 24.5,
                                    "specialPrice": 24.5,
                                    "typeId": "bundle",
                                    "catId": 21,
                                    "metaKeyword": [
                                        "Twister Box - Large"
                                    ],
                                    "bundleProductOptions": [
                                        {
                                            "position": 1,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Chicken",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 15,
                                                    "id": 13,
                                                    "name": "Chicken Pc - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": "1",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 15,
                                                    "id": 14,
                                                    "name": "Chicken Pc - Spicy",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 2,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sandwich",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 12,
                                                    "id": 17,
                                                    "name": "Twister Sandwich - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": [
                                                        3
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "position": 3,
                                            "isDependent": 1,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Customize your Condiments",
                                            "ingredient": 0,
                                            "type": "checkbox",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 0,
                                                    "id": 21,
                                                    "name": "American Cheese",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 18,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 2,
                                                            "selected": 1,
                                                            "name": "Regular",
                                                            "id": 19,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 4,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 20,
                                                            "sku": "810001"
                                                        }
                                                    ],
                                                    "selected": 1,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 0,
                                                    "id": 25,
                                                    "name": "Tomato",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 22,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Regular",
                                                            "id": 23,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 24,
                                                            "sku": "811703"
                                                        }
                                                    ],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 4,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sides",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 9,
                                                    "id": 7,
                                                    "name": "Fries Original Large",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 5,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Beverage",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 9,
                                                    "id": 3,
                                                    "name": "Pepsi Large",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        }
                                    ],
                                    "selectedItem": 0,
                                    "configurableProductOptions": [],
                                    "sku": "45",
                                    "imageSmall": "/d/u/dummy-product.png",
                                    "imageThumbnail": "/d/u/dummy-product.png",
                                    "image": "/d/u/dummy-product.png",
                                    "sel1Value": 16286,
                                    "sel2Value": -1,
                                    "sel3Value": -1,
                                    "taxClassId": 2,
                                    "virtualGroup": 16298,
                                    "visibility": 4,
                                    "associative": 1
                                }
                            ],
                            "configurableProductOptions": [
                                {
                                    "id": 144,
                                    "position": 1,
                                    "title": "Size",
                                    "subtitle": "Size",
                                    "selIndex": 1,
                                    "options": [
                                        {
                                            "isSelected": 1,
                                            "position": 1,
                                            "title": "Medium",
                                            "id": 16287
                                        },
                                        {
                                            "isSelected": 0,
                                            "position": 2,
                                            "title": "Large",
                                            "id": 16286
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 15,
                            "position": 5,
                            "name": "Twister Box - Medium",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 23,
                            "specialPrice": 23,
                            "typeId": "bundle",
                            "catId": 21,
                            "metaKeyword": [
                                "Twister Box - Medium"
                            ],
                            "bundleProductOptions": [
                                {
                                    "position": 1,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Chicken",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 15,
                                            "id": 13,
                                            "name": "Chicken Pc - Original",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": 1,
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 15,
                                            "id": 14,
                                            "name": "Chicken Pc - Spicy",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 0,
                                            "default": "0",
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 2,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Sandwich",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 12,
                                            "id": 17,
                                            "name": "Twister Sandwich - Original",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": 1,
                                            "dependentSteps": [
                                                3
                                            ]
                                        },
                                        {
                                            "position": 2,
                                            "price": 32,
                                            "id": 27,
                                            "name": "Twister Sandwich",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 0,
                                            "default": 0,
                                            "dependentSteps": [
                                                3,
                                                9
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "position": 3,
                                    "isDependent": 1,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Customize your Condiments",
                                    "ingredient": 1,
                                    "type": "checkbox",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 0,
                                            "id": 21,
                                            "name": "American Cheese",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "None",
                                                    "id": 18,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 2,
                                                    "selected": 1,
                                                    "name": "Regular",
                                                    "id": 19,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 4,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 20,
                                                    "sku": "810001"
                                                }
                                            ],
                                            "selected": 1,
                                            "default": "0",
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 0,
                                            "id": 25,
                                            "name": "Tomato",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 1,
                                                    "name": "None",
                                                    "id": 22,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Regular",
                                                    "id": 23,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 24,
                                                    "sku": "811703"
                                                }
                                            ],
                                            "selected": 0,
                                            "default": 0,
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 9,
                                    "isDependent": 1,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Customize your Condiments new ",
                                    "ingredient": 1,
                                    "type": "checkbox",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 0,
                                            "id": 21,
                                            "name": "American Cheese",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "None",
                                                    "id": 18,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 2,
                                                    "selected": 1,
                                                    "name": "Regular",
                                                    "id": 19,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 4,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 20,
                                                    "sku": "810001"
                                                }
                                            ],
                                            "selected": 1,
                                            "default": "0",
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 0,
                                            "id": 25,
                                            "name": "Tomato",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 1,
                                                    "name": "None",
                                                    "id": 22,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Regular",
                                                    "id": 23,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 24,
                                                    "sku": "811703"
                                                }
                                            ],
                                            "selected": 0,
                                            "default": 0,
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 4,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Sides",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 8,
                                            "id": 8,
                                            "name": "Fries Original Medium",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": "1",
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 7,
                                            "id": 11,
                                            "name": "Fries Spicy Medium",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 0,
                                            "default": "0",
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 5,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Beverage",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 8,
                                            "id": 4,
                                            "name": "Pepsi Medium",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": 1,
                                            "dependentSteps": []
                                        }
                                    ]
                                }
                            ],
                            "configurableProductOptions": [],
                            "sku": "44",
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 16298,
                            "visibility": 4,
                            "associative": 1
                        }]
                } else {
                    dataToUpdate['items'] = dataToUpdate['items'].concat([
                        {
                            "id": 41,
                            "position": 4,
                            "name": "Twister Box",
                            "description": "Twister, 1 PC chicken, fries, coleslaw and Pepsi",
                            "inSide": 1,
                            "finalPrice": 23,
                            "specialPrice": 22.5,
                            "typeId": "bundle_group",
                            "catId": 21,
                            "selectedItem": "44",
                            "metaKeyword": [
                                "Twister Box"
                            ],
                            "items": [
                                {
                                    "id": 15,
                                    "position": 1,
                                    "name": "Twister Box - Medium",
                                    "description": "",
                                    "inSide": 0,
                                    "finalPrice": 23,
                                    "specialPrice": 22.5,
                                    "typeId": "bundle",
                                    "catId": 21,
                                    "metaKeyword": [
                                        "Twister Box - Medium"
                                    ],
                                    "bundleProductOptions": [
                                        {
                                            "position": 1,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Chicken",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 15,
                                                    "id": 13,
                                                    "name": "Chicken Pc - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 15,
                                                    "id": 14,
                                                    "name": "Chicken Pc - Spicy",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 2,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sandwich",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 12,
                                                    "id": 17,
                                                    "name": "Twister Sandwich - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": [
                                                        3
                                                    ]
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 32,
                                                    "id": 27,
                                                    "name": "Twister Sandwich",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": [
                                                        3,
                                                        9
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "position": 3,
                                            "isDependent": 1,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Customize your Condiments",
                                            "ingredient": 1,
                                            "type": "checkbox",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 0,
                                                    "id": 21,
                                                    "name": "American Cheese",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 18,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 2,
                                                            "selected": 1,
                                                            "name": "Regular",
                                                            "id": 19,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 4,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 20,
                                                            "sku": "810001"
                                                        }
                                                    ],
                                                    "selected": 1,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 0,
                                                    "id": 25,
                                                    "name": "Tomato",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 1,
                                                            "name": "None",
                                                            "id": 22,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Regular",
                                                            "id": 23,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 24,
                                                            "sku": "811703"
                                                        }
                                                    ],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 9,
                                            "isDependent": 1,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Customize your Condiments new ",
                                            "ingredient": 1,
                                            "type": "checkbox",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 0,
                                                    "id": 21,
                                                    "name": "American Cheese",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 18,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 2,
                                                            "selected": 1,
                                                            "name": "Regular",
                                                            "id": 19,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 4,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 20,
                                                            "sku": "810001"
                                                        }
                                                    ],
                                                    "selected": 1,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 0,
                                                    "id": 25,
                                                    "name": "Tomato",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 1,
                                                            "name": "None",
                                                            "id": 22,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Regular",
                                                            "id": 23,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 24,
                                                            "sku": "811703"
                                                        }
                                                    ],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 4,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sides",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 8,
                                                    "id": 8,
                                                    "name": "Fries Original Medium",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": "1",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 7,
                                                    "id": 11,
                                                    "name": "Fries Spicy Medium",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 5,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Beverage",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 8,
                                                    "id": 4,
                                                    "name": "Pepsi Medium",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        }
                                    ],
                                    "selectedItem": 0,
                                    "configurableProductOptions": [],
                                    "sku": "44",
                                    "imageSmall": "/d/u/dummy-product.png",
                                    "imageThumbnail": "/d/u/dummy-product.png",
                                    "image": "/d/u/dummy-product.png",
                                    "sel1Value": 16287,
                                    "sel2Value": -1,
                                    "sel3Value": -1,
                                    "taxClassId": 2,
                                    "virtualGroup": 16298,
                                    "visibility": 4,
                                    "associative": 1
                                },
                                {
                                    "id": 26,
                                    "position": 2,
                                    "name": "Twister Box - Large",
                                    "description": "",
                                    "inSide": 0,
                                    "finalPrice": 24.5,
                                    "specialPrice": 24.5,
                                    "typeId": "bundle",
                                    "catId": 21,
                                    "metaKeyword": [
                                        "Twister Box - Large"
                                    ],
                                    "bundleProductOptions": [
                                        {
                                            "position": 1,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Chicken",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 15,
                                                    "id": 13,
                                                    "name": "Chicken Pc - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": "1",
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 15,
                                                    "id": 14,
                                                    "name": "Chicken Pc - Spicy",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 0,
                                                    "default": "0",
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 2,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sandwich",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 12,
                                                    "id": 17,
                                                    "name": "Twister Sandwich - Original",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": [
                                                        3
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "position": 3,
                                            "isDependent": 1,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Customize your Condiments",
                                            "ingredient": 0,
                                            "type": "checkbox",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 0,
                                                    "id": 21,
                                                    "name": "American Cheese",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 18,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 2,
                                                            "selected": 1,
                                                            "name": "Regular",
                                                            "id": 19,
                                                            "sku": "810001"
                                                        },
                                                        {
                                                            "price": 4,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 20,
                                                            "sku": "810001"
                                                        }
                                                    ],
                                                    "selected": 1,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                },
                                                {
                                                    "position": 2,
                                                    "price": 0,
                                                    "id": 25,
                                                    "name": "Tomato",
                                                    "selectionQty": 1,
                                                    "subOptions": [
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "None",
                                                            "id": 22,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Regular",
                                                            "id": 23,
                                                            "sku": "811703"
                                                        },
                                                        {
                                                            "price": 0,
                                                            "selected": 0,
                                                            "name": "Extra",
                                                            "id": 24,
                                                            "sku": "811703"
                                                        }
                                                    ],
                                                    "selected": 0,
                                                    "default": 0,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 4,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Sides",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 9,
                                                    "id": 7,
                                                    "name": "Fries Original Large",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        },
                                        {
                                            "position": 5,
                                            "isDependent": 0,
                                            "maximumQty": 0,
                                            "minimumQty": 0,
                                            "title": "Choice of Beverage",
                                            "ingredient": 0,
                                            "type": "radio",
                                            "productLinks": [
                                                {
                                                    "position": 1,
                                                    "price": 9,
                                                    "id": 3,
                                                    "name": "Pepsi Large",
                                                    "selectionQty": 1,
                                                    "subOptions": [],
                                                    "selected": 1,
                                                    "default": 1,
                                                    "dependentSteps": []
                                                }
                                            ]
                                        }
                                    ],
                                    "selectedItem": 0,
                                    "configurableProductOptions": [],
                                    "sku": "45",
                                    "imageSmall": "/d/u/dummy-product.png",
                                    "imageThumbnail": "/d/u/dummy-product.png",
                                    "image": "/d/u/dummy-product.png",
                                    "sel1Value": 16286,
                                    "sel2Value": -1,
                                    "sel3Value": -1,
                                    "taxClassId": 2,
                                    "virtualGroup": 16298,
                                    "visibility": 4,
                                    "associative": 1
                                }
                            ],
                            "configurableProductOptions": [
                                {
                                    "id": 144,
                                    "position": 1,
                                    "title": "Size",
                                    "subtitle": "Size",
                                    "selIndex": 1,
                                    "options": [
                                        {
                                            "isSelected": 1,
                                            "position": 1,
                                            "title": "Medium",
                                            "id": 16287
                                        },
                                        {
                                            "isSelected": 0,
                                            "position": 2,
                                            "title": "Large",
                                            "id": 16286
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 15,
                            "position": 5,
                            "name": "Twister Box - Medium",
                            "description": "",
                            "inSide": 0,
                            "finalPrice": 23,
                            "specialPrice": 23,
                            "typeId": "bundle",
                            "catId": 21,
                            "metaKeyword": [
                                "Twister Box - Medium"
                            ],
                            "bundleProductOptions": [
                                {
                                    "position": 1,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Chicken",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 15,
                                            "id": 13,
                                            "name": "Chicken Pc - Original",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": 1,
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 15,
                                            "id": 14,
                                            "name": "Chicken Pc - Spicy",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 0,
                                            "default": "0",
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 2,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Sandwich",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 12,
                                            "id": 17,
                                            "name": "Twister Sandwich - Original",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": 1,
                                            "dependentSteps": [
                                                3
                                            ]
                                        },
                                        {
                                            "position": 2,
                                            "price": 32,
                                            "id": 27,
                                            "name": "Twister Sandwich",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 0,
                                            "default": 0,
                                            "dependentSteps": [
                                                3,
                                                9
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "position": 3,
                                    "isDependent": 1,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Customize your Condiments",
                                    "ingredient": 1,
                                    "type": "checkbox",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 0,
                                            "id": 21,
                                            "name": "American Cheese",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "None",
                                                    "id": 18,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 2,
                                                    "selected": 1,
                                                    "name": "Regular",
                                                    "id": 19,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 4,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 20,
                                                    "sku": "810001"
                                                }
                                            ],
                                            "selected": 1,
                                            "default": "0",
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 0,
                                            "id": 25,
                                            "name": "Tomato",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 1,
                                                    "name": "None",
                                                    "id": 22,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Regular",
                                                    "id": 23,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 24,
                                                    "sku": "811703"
                                                }
                                            ],
                                            "selected": 0,
                                            "default": 0,
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 9,
                                    "isDependent": 1,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Customize your Condiments new ",
                                    "ingredient": 1,
                                    "type": "checkbox",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 0,
                                            "id": 21,
                                            "name": "American Cheese",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "None",
                                                    "id": 18,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 2,
                                                    "selected": 1,
                                                    "name": "Regular",
                                                    "id": 19,
                                                    "sku": "810001"
                                                },
                                                {
                                                    "price": 4,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 20,
                                                    "sku": "810001"
                                                }
                                            ],
                                            "selected": 1,
                                            "default": "0",
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 0,
                                            "id": 25,
                                            "name": "Tomato",
                                            "selectionQty": 1,
                                            "subOptions": [
                                                {
                                                    "price": 0,
                                                    "selected": 1,
                                                    "name": "None",
                                                    "id": 22,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Regular",
                                                    "id": 23,
                                                    "sku": "811703"
                                                },
                                                {
                                                    "price": 0,
                                                    "selected": 0,
                                                    "name": "Extra",
                                                    "id": 24,
                                                    "sku": "811703"
                                                }
                                            ],
                                            "selected": 0,
                                            "default": 0,
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 4,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Sides",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 8,
                                            "id": 8,
                                            "name": "Fries Original Medium",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": "1",
                                            "dependentSteps": []
                                        },
                                        {
                                            "position": 2,
                                            "price": 7,
                                            "id": 11,
                                            "name": "Fries Spicy Medium",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 0,
                                            "default": "0",
                                            "dependentSteps": []
                                        }
                                    ]
                                },
                                {
                                    "position": 5,
                                    "isDependent": 0,
                                    "maximumQty": 0,
                                    "minimumQty": 0,
                                    "title": "Choice of Beverage",
                                    "ingredient": 0,
                                    "type": "radio",
                                    "productLinks": [
                                        {
                                            "position": 1,
                                            "price": 8,
                                            "id": 4,
                                            "name": "Pepsi Medium",
                                            "selectionQty": 1,
                                            "subOptions": [],
                                            "selected": 1,
                                            "default": 1,
                                            "dependentSteps": []
                                        }
                                    ]
                                }
                            ],
                            "configurableProductOptions": [],
                            "sku": "44",
                            "imageSmall": "/d/u/dummy-product.png",
                            "imageThumbnail": "/d/u/dummy-product.png",
                            "image": "/d/u/dummy-product.png",
                            "taxClassId": 2,
                            "virtualGroup": 16298,
                            "visibility": 4,
                            "associative": 1
                        }])
                }
            } else {
                dataToUpdate['notAvailable'] = cmsCart.cart_items
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
            consolelog(process.cwd(), "updateCart", error, false)
            return Promise.reject(error)
        }
    }
}

export const CartE = new CartClass()
