import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface Iorder extends Document {
    cartId: string,
    cartUnique: string
    orderType: string,
    cmsCartRef: number,
    sdmOrderRef: number,
    cmsOrderRef: number,
    userId: string,
    sdmUserRef: number,
    country: string,
    language: string,
    status: string,
    sdmOrderStatus: number,
    items: any,
    amount: any,
    address: any,
    store: any,
    transLogs: any,
    isActive: number,
    changePaymentMode: number,
    paymentMethodAddedOnSdm: number,
    createdAt: number,
    updatedAt: number,
    trackUntil: number,
    validationRemarks: string,
    promo: any,
    isFreeItem: any
};

const orderSchema = new Schema({
    cartId: { type: String, required: true },
    cartUnique: { type: String },
    orderType: {
        type: String, required: true, enum: [
            Constant.DATABASE.TYPE.ORDER.PICKUP,
            Constant.DATABASE.TYPE.ORDER.DELIVERY
        ]
    },
    cmsCartRef: { type: Number, required: true },
    sdmOrderRef: { type: Number, required: true, index: true },
    cmsOrderRef: { type: Number, required: true },
    userId: { type: String, required: true, index: true },
    sdmUserRef: { type: Number, required: true },
    country: {
        type: String, required: true, enum: [
            Constant.DATABASE.COUNTRY.UAE
        ]
    },
    language: {
        type: String, required: true, enum: [
            Constant.DATABASE.LANGUAGE.AR,
            Constant.DATABASE.LANGUAGE.EN
        ]
    },
    status: {
        type: String, enum: [
            Constant.DATABASE.STATUS.ORDER.PENDING.MONGO,
            Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO,
            Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
            Constant.DATABASE.STATUS.ORDER.READY.MONGO,
            Constant.DATABASE.STATUS.ORDER.ON_THE_WAY.MONGO,
            Constant.DATABASE.STATUS.ORDER.DELIVERED.MONGO,
            Constant.DATABASE.STATUS.ORDER.CANCELED.MONGO,
            Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO
        ], required: true,
        default: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO,
    },
    sdmOrderStatus: { type: Number, required: true, index: true, default: -1 },
    items: { type: Schema.Types.Mixed, required: true },
    amount: [{
        sequence: { type: Number, },
        name: { type: String },
        code: { type: String },
        action: {
            type: String, enum: [
                Constant.DATABASE.ACTION.CART_AMOUNT.ADD,
                Constant.DATABASE.ACTION.CART_AMOUNT.SUBTRACT
            ]
        },
        amount: { type: Number, default: 0 },
        type: {
            type: String, enum: [
                Constant.DATABASE.TYPE.CART_AMOUNT.SUB_TOTAL,
                Constant.DATABASE.TYPE.CART_AMOUNT.DISCOUNT,
                Constant.DATABASE.TYPE.CART_AMOUNT.SHIPPING,
                Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL,
            ]
        }
    }],
    vat: {
        sequence: { type: Number, },
        name: { type: String },
        code: { type: String },
        action: {
            type: String, enum: [
                Constant.DATABASE.ACTION.CART_AMOUNT.ADD,
                Constant.DATABASE.ACTION.CART_AMOUNT.SUBTRACT
            ]
        },
        amount: { type: Number, default: 0 },
        type: {
            type: String, enum: [
                Constant.DATABASE.TYPE.CART_AMOUNT.TAX
            ]
        }
    },
    address: {
        addressId: { type: String },
        sdmAddressRef: { type: Number, default: 0 },
        cmsAddressRef: { type: Number, default: 0 },
        tag: {
            type: String, enaum: [
                Constant.DATABASE.TYPE.TAG.En.HOME,
                Constant.DATABASE.TYPE.TAG.En.OFFICE,
                Constant.DATABASE.TYPE.TAG.En.HOTEL,
                Constant.DATABASE.TYPE.TAG.En.OTHER]
        },
        addressType: {
            type: String, enaum: [
                Constant.DATABASE.TYPE.ADDRESS.PICKUP,
                Constant.DATABASE.TYPE.ADDRESS.DELIVERY]
        },
        bldgName: { type: String },
        description: { type: String },
        flatNum: { type: String },
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
        countryId: { type: Number, default: 0 },
        areaId: { type: Number, default: 0 },
        cityId: { type: Number, default: 0 },
        storeId: { type: Number, default: 0 },
    },
    store: {
        storeId: { type: Number, default: 0 },
        countryId: { type: Number, default: 0 },
        areaId: { type: Number, default: 0 },
        cityId: { type: Number, default: 0 },
        location: {
            description: { type: String },
            latitude: { type: Number, default: 0 },
            longitude: { type: Number, default: 0 },
        },
        address_en: { type: String },
        address_ar: { type: String },
        name_en: { type: String },
        name_ar: { type: String },
    },
    payment: {
        paymentMethodId: { type: Number, enum: [Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD, Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD] },
        amount: { type: Number, default: 0 },
        name: {
            type: String, enum: [
                Constant.DATABASE.TYPE.PAYMENT_METHOD.CARD,
                Constant.DATABASE.TYPE.PAYMENT_METHOD.COD
            ]
        },
        status: {
            type: String, enum: [
                Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS,
                Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS,
                Constant.DATABASE.STATUS.TRANSACTION.CAPTURE.AS,
                Constant.DATABASE.STATUS.TRANSACTION.REFUND.AS,
                Constant.DATABASE.STATUS.TRANSACTION.FAILED.AS,
            ]
        }
    },
    transLogs: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Number, required: true, enum: [0, 1], default: 1 },
    changePaymentMode: { type: Number, required: true, enum: [0, 1], default: 0 },
    paymentMethodAddedOnSdm: { type: Number, required: true, enum: [0, 1], default: 0 },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
    trackUntil: { type: Number, required: true },
    validationRemarks: { type: String },
    promo: { type: Schema.Types.Mixed },
    isFreeItem: { type: Boolean }
});

export let order = model<Iorder>('order', orderSchema)