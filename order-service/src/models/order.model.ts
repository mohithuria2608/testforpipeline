import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface Iorder extends Document {
    cartId: string,
    cmsCartRef: number,
    sdmOrderRef: number,
    cmsOrderRef: number,
    userId: string,
    orderId: string,
    status: string,
    items: any,
    amount: any,
    address: any,
    store: any,
    transLogs: any,
    createdAt: number,
    updatedAt: number
};

const orderSchema = new Schema({
    cartId: { type: String, required: true },
    cmsCartRef: { type: Number, required: true },
    sdmOrderRef: { type: Number, required: true, index: true },
    cmsOrderRef: { type: Number, required: true },
    userId: { type: String, required: true, index: true },
    orderId: { type: String, required: true, index: true },
    status: { type: String, required: true },
    items: { type: Schema.Types.Mixed, required: true },
    amount: { type: Schema.Types.Mixed, required: true },
    address: { type: Schema.Types.Mixed, required: true },
    store: { type: Schema.Types.Mixed, required: true },
    payment: { type: Schema.Types.Mixed, required: true },
    transLogs: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Number, required: true, enum: [0, 1] },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true }
});

export let order = model<Iorder>('order', orderSchema)