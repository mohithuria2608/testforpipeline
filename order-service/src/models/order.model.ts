import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface Iorder extends Document {
    cartId: string,
    orderType: string,
    cmsCartRef: number,
    sdmOrderRef: number,
    cmsOrderRef: number,
    userId: string,
    orderId: string,
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
    trackUntil: number
};

const orderSchema = new Schema({
    cartId: { type: String, required: true },
    orderType: { type: String, required: true },
    cmsCartRef: { type: Number, required: true },
    sdmOrderRef: { type: Number, required: true, index: true },
    cmsOrderRef: { type: Number, required: true },
    userId: { type: String, required: true, index: true },
    orderId: { type: String, required: true, index: true },
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
    amount: { type: Schema.Types.Mixed, required: true },
    address: { type: Schema.Types.Mixed, required: true },
    store: { type: Schema.Types.Mixed, required: true },
    payment: { type: Schema.Types.Mixed, required: true },
    transLogs: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Number, required: true, enum: [0, 1] },
    changePaymentMode: { type: Number, required: true, enum: [0, 1] },
    paymentMethodAddedOnSdm: { type: Number, required: true, enum: [0, 1] },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
    trackUntil: { type: Number, required: true }
});

export let order = model<Iorder>('order', orderSchema)