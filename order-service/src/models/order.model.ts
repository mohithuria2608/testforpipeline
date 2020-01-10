import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface IOrder extends Document {
    id: string,
    sdmOrderRef: number,
    cmsOrderRef: number,
    userId: string,
    status: string,
    updatedAt: number,
    address: {
        id: string,
        sdmAddressRef: number,
        cmsAddressRef: number,
        areaId: number,
        storeId: number,
    }
    items: any
};

const orderSchema = new Schema({
    cartId: { type: String, required: true },
    cmsCartRef: { type: Number, required: true },
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    sdmOrderRef: { type: Number, required: true },
    cmsOrderRef: { type: Number, required: true },
    status: {
        type: String, required: true, enum: [
            Constant.DATABASE.STATUS.ORDER.CART,
            Constant.DATABASE.STATUS.ORDER.PENDING,
        ]
    },
    updatedAt: { type: Number, required: true },
    addres: {
        id: { type: String },
        sdmAddressRef: { type: Number },
        cmsAddressRef: { type: Number },
        areaId: { type: Number },
        storeId: { type: Number },
        bldgName: { type: String },
        description: { type: String },
        flatNum: { type: String },
        tag: {
            type: String, required: true, enum: [
                Constant.DATABASE.TYPE.TAG.HOME,
                Constant.DATABASE.TYPE.TAG.OFFICE,
                Constant.DATABASE.TYPE.TAG.HOTEL,
                Constant.DATABASE.TYPE.TAG.OTHER]
        },
        addressType: {
            type: String, required: true, enum: [
                Constant.DATABASE.TYPE.ADDRESS.PICKUP,
                Constant.DATABASE.TYPE.ADDRESS.DELIVERY]
        },
    },
    items: { type: Schema.Types.Mixed, required: true },
    subTotal: { type: Number },
    total: { type: Number },
    tax: {
        name: { type: String, required: true },
        value: { type: String, required: true },
    },
    shipping: {
        name: { type: String, required: true },
        code: { type: String, required: true },
        value: { type: String, required: true },
    }
});

export let Order = model<IOrder>('Order', orderSchema)
