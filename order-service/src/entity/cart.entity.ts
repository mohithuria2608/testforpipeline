'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import * as CMS from "../cms"
import { Aerospike } from '../aerospike'
import { promotionService } from '../grpc/client'

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
            consolelog(process.cwd(), "getCart", JSON.stringify(error), false)
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
                orderId: this.ObjectId().toString(),
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
            consolelog(process.cwd(), "createDefaultCart", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "updateCartTTL", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async assignNewCart(oldCartId: string, cartId: string, userId: string) {
        try {
            consolelog(process.cwd(), "assignNewCart111111111111111111", "error", false)

            await this.createDefaultCart({ userId: userId, cartId: cartId })
            await Aerospike.remove({ set: this.set, key: oldCartId })
            consolelog(process.cwd(), "assignNewCart1111111111111111112222222222222222", oldCartId, false)

            return
        } catch (error) {
            consolelog(process.cwd(), "assignNewCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createCartReqForCms(payload: ICartRequest.IValidateCart) {
        try {
            let sellingPrice = 0
            let cart = []
            payload.items.map(sitem => {
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
                    let positionIndex = sitem.bundleProductOptions[0].position
                    let bundle_option = {};
                    let selection_configurable_option = {};
                    sitem['bundleProductOptions'].forEach(bpo => {
                        if (bpo['isDependent'] == 0) {
                            if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
                                bpo['productLinks'].forEach(pl => {
                                    if (pl['selected'] == 1) {
                                        if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                            if (bundle_option[pl['option_id']] == null)
                                                bundle_option[pl['option_id']] = {}
                                            bundle_option[pl['option_id']][pl['id']] = pl['selection_id']
                                        } else {
                                            bundle_option[pl['option_id']] = pl['selection_id']
                                        }

                                        if (pl['dependentSteps'] && pl['dependentSteps'].length > 0) {
                                            let dependentSteps = sitem['bundleProductOptions'][(positionIndex == 0) ? pl['dependentSteps'][0] : (pl['dependentSteps'][0] - 1)]
                                            if (dependentSteps.isDependent == 1) {
                                                if (dependentSteps['productLinks'] && dependentSteps['productLinks'].length > 0) {
                                                    dependentSteps['productLinks'].forEach(dspl => {
                                                        if (!bundle_option.hasOwnProperty(dspl['option_id']))
                                                            bundle_option[dspl['option_id']] = {}
                                                        bundle_option[dspl['option_id']][dspl['id']] = dspl['selection_id']

                                                        if (dspl.selectionQty > 0) {
                                                            selection_configurable_option[pl['selection_id']] = dspl['id']
                                                        }
                                                    })
                                                }
                                            }
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
                        bundle_option: bundle_option,
                        selection_configurable_option: selection_configurable_option,
                    })
                }
                else if (sitem['originalTypeId'] == 'bundle_group') {
                    if (sitem['typeId'] == "bundle_group") {
                        let bundle_option = {};
                        let alreadyAddedInBundleOption = {}
                        let selection_configurable_option = {};
                        let item = 0
                        sitem['items'].forEach(i => {
                            if (sitem['selectedItem'] == i['sku']) {
                                item = i['id']
                                i['bundleProductOptions'].forEach(bpo => {
                                    if (bpo['productLinks'] && bpo['productLinks'].length > 0) {
                                        bpo['productLinks'].map(pl => {
                                            if (pl['selected'] == 1 && !alreadyAddedInBundleOption[pl['id']]) {
                                                if (pl['subOptions'] && pl['subOptions'].length > 0) {
                                                    if (bundle_option[pl['option_id']] == null)
                                                        bundle_option[pl['option_id']] = {}
                                                    bundle_option[pl['option_id']][pl['id']] = pl['selection_id']

                                                    selection_configurable_option[pl['selection_id']] = ""
                                                    pl['subOptions'].forEach(plso => {
                                                        if (plso['selected'] == 1) {
                                                            selection_configurable_option[pl['selection_id']] = plso['id']
                                                        }
                                                    })
                                                } else {
                                                    bundle_option[pl['option_id']] = pl['selection_id']
                                                }
                                                alreadyAddedInBundleOption[pl['id']] = true
                                            }
                                            if (pl['dependentSteps'] && pl['dependentSteps'].length > 0) {
                                                if (i['bundleProductOptions'] && i['bundleProductOptions'].length > 0) {
                                                    i['bundleProductOptions'].forEach(bpo2 => {
                                                        if (bpo2['position'] == pl['dependentSteps'][0]) {
                                                            if (bpo2['productLinks'] && bpo2['productLinks'].length > 0) {
                                                                bpo2['productLinks'].forEach(pl2 => {
                                                                    if (pl2['selected'] == 1)
                                                                        selection_configurable_option[pl['selection_id']] = pl2['id']
                                                                    else
                                                                        selection_configurable_option[pl['selection_id']] = ""
                                                                })
                                                            }
                                                        }
                                                    })
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
                            type_id: "bundle",// sitem['typeId'],
                            bundle_option: bundle_option,
                            selection_configurable_option: selection_configurable_option,
                        })
                    }
                }
                else {
                    return Promise.reject(JSON.stringify(sitem))
                }
            })

            let req = {
                cms_user_id: 12, //userData.cmsUserRef,
                website_id: 1,
                category_id: 20,
                cart_items: cart
            }
            if (payload.couponCode)
                req['coupon_code'] = payload.couponCode
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
            let req = await this.createCartReqForCms(payload)
            let cmsCart = await CMS.CartCMSE.createCart(req.req)
            // cmsCart['is_price_changed'] = false
            // /**
            //  * @description Temporary
            //  */
            // let subTotal = Math.round((((req.sellingPrice * 100) / 105) + Number.EPSILON) * 100) / 100
            // let tax = req.sellingPrice - subTotal
            // let grandTotal = req.sellingPrice + cmsCart['discount_amount']
            // cmsCart['subtotal'] = subTotal
            // cmsCart['tax'] = [{
            //     tax_name: "VAT@5%",
            //     amount: tax,
            // }]
            // cmsCart['grandtotal'] = grandTotal
            return cmsCart
        } catch (error) {
            consolelog(process.cwd(), "createCartOnCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateCart(cartId: string, cmsCart: ICartCMSRequest.ICmsCartRes, curItems?: any) {
        try {
            let prevCart: ICartRequest.ICartData
            if (curItems == undefined) {
                prevCart = await this.getCart({ cartId: cartId })
                curItems = prevCart.items
            }
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
                amount: cmsCart.subtotal,
                sequence: 1,
                action: "add"
            })
            if (cmsCart.discount_amount != 0 && cmsCart.coupon_code && cmsCart.coupon_code != "") {
                amount.push({
                    type: "DISCOUNT",
                    name: "Discount",
                    code: cmsCart.coupon_code,
                    amount: cmsCart.discount_amount,
                    sequence: 2,
                    action: "subtract"
                })
                dataToUpdate['couponApplied'] = 1
            } else {
                dataToUpdate['couponApplied'] = 0
            }
            if (cmsCart.tax && cmsCart.tax.length > 0) {
                amount.push({
                    type: "TAX",
                    name: cmsCart.tax[0].tax_name,
                    code: cmsCart.tax[0].tax_name,
                    amount: cmsCart.tax[0].amount,
                    sequence: 3,
                    action: "add"
                })
            } else {
                amount.push({
                    type: "TAX",
                    name: "VAT",
                    code: "VAT",
                    amount: 0,
                    sequence: 3,
                    action: "add"
                })
            }
            let delivery = {
                type: "SHIPPING",
                name: "Delivery",
                code: "DELIVERY",
                amount: 0,
                sequence: 4,
                action: "add"
            }
            if (cmsCart.grandtotal > 0) {
                delivery.amount = 6.5
            }
            amount.push(delivery)

            amount.push({
                type: "TOTAL",
                name: "Total",
                code: "TOTAL",
                amount: cmsCart.grandtotal + delivery.amount,
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
            } else {
                dataToUpdate['items'] = curItems
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
            consolelog(process.cwd(), "updateCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const CartE = new CartClass()
