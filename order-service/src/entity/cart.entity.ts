'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, hashObj } from '../utils'
import * as CMS from "../cms"
import { Aerospike } from '../aerospike'
import { promotionService, userService, menuService } from '../grpc/client'

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
        super(Constant.SET_NAME.CART)
    }
    public itemSchema = Joi.object().keys({
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
    })

    public cartSchema = Joi.object().keys({
        cartId: Joi.string().required().description("pk"),
        cartUnique: Joi.string().required(),
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
            storeId: Joi.number(),
            lat: Joi.number(),
            lng: Joi.number(),
            address: Joi.string(),
        }),
        items: Joi.array().items(this.itemSchema),
        notAvailable: Joi.array().items(this.itemSchema),
        amount: Joi.array().items(
            Joi.object().keys({
                type: Joi.string().required(),
                name: Joi.string().required(),
                code: Joi.string().required(),
                amount: Joi.number().required(),
            })),
        freeItems: Joi.object().keys({
            ar: Joi.array().items(this.itemSchema),
            en: Joi.array().items(this.itemSchema)
        }),
        selFreeItem: Joi.object().keys({
            ar: Joi.array().items(this.itemSchema),
            en: Joi.array().items(this.itemSchema)
        }),
    })

    /**
    * @method INTERNAL
    * @param {string} cartId : cart id
    * @param {string} cmsCartRef : cms cart id
    * */
    async getCart(payload: ICartRequest.IGetCart): Promise<ICartRequest.ICartData> {
        try {
            let cartFound = true
            if (payload.cartId) {
                let getArg: IAerospike.Get = {
                    set: this.set,
                    key: payload.cartId
                }
                let cart: ICartRequest.ICartData = await Aerospike.get(getArg)
                console.log("validate cart 444444444444444444444", cart)

                if (cart && cart.cartId) {
                    return cart
                } else
                    cartFound = false
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
                console.log("validate cart 5555555555555555555555", cart)

                if (cart && cart.length > 0) {
                    return cart[0]
                } else
                    cartFound = false
            }

            console.log("validate cart 666666666666666666666", cartFound)

            if (!cartFound) {
                let user = await userService.fetchUser({ cartId: payload.cartId })
                console.log("validate cart 77777777777777777777777", cartFound)

                if (user && user.id) {
                    if (user.cartId == payload.cartId) {
                        await this.createDefaultCart({
                            userId: user.id
                        })
                        let getArg: IAerospike.Get = {
                            set: this.set,
                            key: payload.cartId
                        }
                        return await Aerospike.get(getArg)
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
            }
            else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createDefaultCart(payload: IOrderGrpcRequest.ICreateDefaultCart) {
        try {
            let dataToSave: ICartRequest.ICartData = {
                cartId: payload.userId,
                cartUnique: this.ObjectId().toString(),
                cmsCartRef: 0,
                sdmOrderRef: 0,
                cmsOrderRef: 0,
                userId: payload.userId,
                orderId: this.ObjectId().toString(),
                status: Constant.DATABASE.STATUS.ORDER.CART.AS,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                items: [],
                address: {},
                amount: [],
                freeItems: { en: [], ar: [] }
            }
            console.log("dataToSave", dataToSave)
            let putArg: IAerospike.Put = {
                bins: dataToSave,
                set: this.set,
                key: payload.userId,
                // ttl: Constant.SERVER.DEFAULT_CART_TTL,
                createOrReplace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createDefaultCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async resetCart(userId: string) {
        try {
            let cartUpdate = {
                cartUnique: this.ObjectId().toString(),
                cmsCartRef: 0,
                sdmOrderRef: 0,
                cmsOrderRef: 0,
                userId: userId,
                cartId: userId,
                status: Constant.DATABASE.STATUS.ORDER.CART.AS,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                items: [],
                address: {},
                amount: [],
                freeItems: { en: [], ar: [] }
            }
            let putArg: IAerospike.Put = {
                bins: cartUpdate,
                set: this.set,
                key: userId,
                update: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "resetCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createCartReqForCms(
        items: any,
        selFreeItem: any,
        orderType: string,
        couponCode: string,
        userData: IUserRequest.IUserData
    ) {
        try {
            if (selFreeItem && selFreeItem.en && selFreeItem.en.length > 0) {
                items = items.concat(selFreeItem.en)
            }
            let sellingPrice = 0
            let cart = []
            items.map(sitem => {
                sellingPrice = sellingPrice + (sitem.sellingPrice * sitem.qty)
                if (sitem['originalTypeId'] == 'simple') {
                    if (sitem['type_id'] == 'simple') {
                        if (sitem.id == 0)
                            console.log("sitem>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", sitem)
                        cart.push({
                            product_id: sitem.id,
                            qty: sitem.qty ? sitem.qty : 1,
                            price: sitem.sellingPrice,
                            type_id: sitem['originalTypeId']
                        })
                    } else {
                        let subPrice = 0
                        let product = {};
                        product['product_id'] = sitem['id']
                        product['qty'] = sitem['qty']
                        product['type_id'] = sitem['originalTypeId']
                        let option = {}
                        if (sitem['bundleProductOptions'] && sitem['bundleProductOptions'].length > 0) {
                            sitem['bundleProductOptions'].forEach(bpo => {
                                if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
                                    bpo['productLinks'].forEach(pl => {
                                        if (pl['selected'] == 1) {
                                            if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                                pl['subOptions'].map(so => {
                                                    if (so['selected'] == 1) {
                                                        option[pl['id']] = so['id']
                                                        subPrice = subPrice + so['price']
                                                        cart.push({
                                                            product_id: so['product_id'],
                                                            qty: sitem['qty'],
                                                            type_id: "simple",
                                                            price: so['price'],
                                                            final_price: true
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        product['price'] = sitem['sellingPrice'] - subPrice
                        product['option'] = option
                        cart.push(product)
                    }
                }
                else if (sitem['originalTypeId'] == 'configurable') {
                    let super_attribute = {};
                    // let price = null;
                    if (sitem['items'] && sitem['items'].length > 0) {
                        sitem['items'].map(i => {
                            if (parseInt(i['sku']) == sitem['selectedItem']) {
                                // price = i['sellingPrice']
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
                        price: sitem.sellingPrice,
                        type_id: sitem['typeId'],
                        super_attribute: super_attribute
                    })
                }
                else if (sitem['originalTypeId'] == 'bundle' || sitem['typeId'] == 'bundle') {
                    let bundle_option = {};
                    sitem['bundleProductOptions'].forEach(bpo => {
                        if (bpo['isDependent'] == 0) {
                            if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
                                bpo['productLinks'].forEach(pl => {
                                    if (pl['selected'] == 1) {
                                        if (!bundle_option[pl['option_id']])
                                            bundle_option[pl['option_id']] = {}
                                        if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                            pl['subOptions'].forEach(plso => {
                                                if (plso['selected'] == 1) {
                                                    bundle_option[pl['option_id']][plso['id']] = plso['selection_id']
                                                }
                                            })
                                        } else {
                                            bundle_option[pl['option_id']] = pl['selection_id']
                                        }
                                    }
                                })
                            }
                        }
                    })
                    cart.push({
                        product_id: sitem.id,
                        qty: sitem.qty,
                        price: sitem.sellingPrice,
                        type_id: sitem['typeId'],
                        bundle_option: bundle_option
                    })
                }
                else if (sitem['originalTypeId'] == 'bundle_group') {
                    if (sitem['typeId'] == "bundle_group") {
                        let bundle_option = {};
                        let item = 0
                        sitem['items'].forEach(i => {
                            if (sitem['selectedItem'] == i['sku']) {
                                item = i['id']
                                i['bundleProductOptions'].forEach(bpo => {
                                    if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
                                        bpo['productLinks'].map(pl => {
                                            if (pl['selected'] == 1) {
                                                if (!bundle_option[pl['option_id']])
                                                    bundle_option[pl['option_id']] = {}
                                                if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                                    pl['subOptions'].forEach(plso => {
                                                        if (plso['selected'] == 1) {
                                                            bundle_option[pl['option_id']][plso['id']] = plso['selection_id']
                                                        }
                                                    })
                                                } else {
                                                    bundle_option[pl['option_id']] = pl['selection_id']
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        cart.push({
                            product_id: item,
                            qty: sitem.qty,
                            price: sitem.sellingPrice,
                            type_id: "bundle",
                            bundle_option: bundle_option,
                        })
                    }
                }
                else {
                    return Promise.reject(JSON.stringify(sitem))
                }
            })
            console.log(JSON.stringify(cart))
            let req = {
                cms_user_id: userData.cmsUserRef,
                website_id: 1,
                category_id: 20,
                cart_items: cart,
                order_type: orderType
            }
            if (couponCode)
                req['coupon_code'] = couponCode
            else
                req['coupon_code'] = ""
            return { req: req, sellingPrice: sellingPrice }
        } catch (error) {
            consolelog(process.cwd(), "createCartReqForCms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createCartOnCMS(payload: ICartRequest.IValidateCart, userData?: IUserRequest.IUserData) {
        try {
            if (payload.items && payload.items.length > 0) {
                let req = await this.createCartReqForCms(payload.items, payload.selFreeItem, payload.orderType, payload.couponCode, userData)
                let cmsCart = await CMS.CartCMSE.createCart(req.req)
                return cmsCart
            } else {
                return {
                    cms_cart_id: 0,
                    currency_code: "",
                    cart_items: [],
                    subtotal: 0,
                    grandtotal: 0,
                    tax: [],
                    shipping: [],
                    not_available: [],
                    is_price_changed: false,
                    coupon_code: "",
                    discount_amount: 0,
                    success: true,
                    free_items: ""
                }
            }
        } catch (error) {
            consolelog(process.cwd(), "createCartOnCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateCart(headers: ICommonRequest.IHeaders, cartId: string, cmsCart: ICartCMSRequest.ICmsCartRes, changeCartUnique: boolean, curItems: any, selFreeItem: any) {
        try {
            let prevCart: ICartRequest.ICartData
            if (curItems == undefined) {
                prevCart = await this.getCart({ cartId: cartId })
                curItems = prevCart.items
            }
            let dataToUpdate: ICartRequest.ICartData = {}
            console.log("cmsCart", JSON.stringify(cmsCart))

            dataToUpdate['cmsCartRef'] = parseInt(cmsCart.cms_cart_id.toString())
            dataToUpdate['updatedAt'] = new Date().getTime()
            dataToUpdate['isPriceChanged'] = cmsCart.is_price_changed ? 1 : 0
            dataToUpdate['notAvailable'] = []
            dataToUpdate['items'] = []

            let amount = []
            amount.push({
                type: Constant.DATABASE.TYPE.CART_AMOUNT.SUB_TOTAL,
                name: "Sub Total",
                code: "SUB_TOTAL",
                amount: cmsCart.subtotal,
                sequence: 1,
                action: "add"
            })
            if (cmsCart.coupon_code && cmsCart.coupon_code != "") {
                if (selFreeItem && selFreeItem.en && selFreeItem.en.length > 0) {
                    dataToUpdate['freeItems'] = {
                        ar: [],
                        en: []
                    }
                    dataToUpdate['selFreeItem'] = selFreeItem
                } else {
                    if (cmsCart.free_items && cmsCart.free_items != "") {
                        let freeItemSku = cmsCart.free_items.split(",")
                        let freeItems_En = await menuService.fetchHidden({
                            menuId: 1,
                            language: Constant.DATABASE.LANGUAGE.EN,
                            type: ""
                        })
                        let freeItems_Ar = await menuService.fetchHidden({
                            menuId: 1,
                            language: Constant.DATABASE.LANGUAGE.AR,
                            type: ""
                        })
                        freeItems_En = freeItems_En.filter(obj => { return freeItemSku.indexOf(obj.sku) >= 0 })
                        freeItems_Ar = freeItems_Ar.filter(obj => { return freeItemSku.indexOf(obj.sku) >= 0 })

                        dataToUpdate['freeItems'] = {
                            ar: freeItems_Ar,
                            en: freeItems_En
                        }
                    }
                    dataToUpdate['selFreeItem'] = {
                        ar: [],
                        en: []
                    }
                }
                if (cmsCart.discount_amount != 0)
                    amount.push({
                        type: Constant.DATABASE.TYPE.CART_AMOUNT.DISCOUNT,
                        name: "Discount",
                        code: cmsCart.coupon_code,
                        amount: cmsCart.discount_amount,
                        sequence: 2,
                        action: "subtract"
                    })
                dataToUpdate['couponApplied'] = 1
            } else {
                dataToUpdate['couponApplied'] = 0
                dataToUpdate['freeItems'] = {
                    ar: [],
                    en: []
                }
                dataToUpdate['selFreeItem'] = {
                    ar: [],
                    en: []
                }
            }
            if (cmsCart.tax && cmsCart.tax.length > 0) {
                amount.push({
                    type: Constant.DATABASE.TYPE.CART_AMOUNT.TAX,
                    name: cmsCart.tax[0].tax_name,
                    code: cmsCart.tax[0].tax_name,
                    amount: cmsCart.tax[0].amount,
                    sequence: 3,
                    action: "add"
                })
            } else {
                amount.push({
                    type: Constant.DATABASE.TYPE.CART_AMOUNT.TAX,
                    name: "VAT",
                    code: "VAT",
                    amount: 0,
                    sequence: 3,
                    action: "add"
                })
            }
            if (cmsCart.shipping && cmsCart.shipping.length > 0) {
                if (cmsCart.shipping[0].price > 0)
                    amount.push({
                        type: Constant.DATABASE.TYPE.CART_AMOUNT.SHIPPING,
                        name: "Delivery",
                        code: cmsCart.shipping[0].method_code,
                        amount: cmsCart.shipping[0].price,
                        sequence: 4,
                        action: "add"
                    })
            }
            amount.push({
                type: Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL,
                name: "Total",
                code: "TOTAL",
                amount: cmsCart.grandtotal,
                sequence: 5,
                action: "add"
            })
            dataToUpdate['amount'] = amount
            console.log("amount", typeof amount, JSON.stringify(amount))
            if (cmsCart.not_available && cmsCart.not_available.length > 0) {
                curItems.forEach(obj => {
                    if (cmsCart.not_available.indexOf(obj.id) == -1) {
                        dataToUpdate['items'].push(obj)
                    } else {
                        dataToUpdate['notAvailable'].push(obj)
                    }
                })
            } else
                dataToUpdate['items'] = curItems

            let updatedAt = new Date().getTime()
            dataToUpdate['updatedAt'] = updatedAt
            if (changeCartUnique) {
                let dataToHash: ICartRequest.IDataToHash = {
                    items: dataToUpdate['items'],
                    promo: dataToUpdate['couponApplied'],
                    updatedAt: updatedAt
                }
                dataToUpdate['cartUnique'] = hashObj(dataToHash)
                // this.ObjectId().toString()
            }

            let putArg: IAerospike.Put = {
                bins: dataToUpdate,
                set: this.set,
                key: cartId,
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
