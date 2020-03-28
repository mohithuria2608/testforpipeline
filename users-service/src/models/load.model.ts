import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface ILoad extends Document {
    cartId: string,
    deviceId: string,
    accessToken: string,
    addressId: string,
    cartUpdatedAt: string,
    cCode: string,
    phnNo: string,
    name: string,
    email: string,
    type: string,
};

const loadSchema = new Schema({
    cartId: { type: String, required: true, index: true },
    deviceId: { type: String },
    accessToken: { type: String },
    addressId: { type: String },
    cartUpdatedAt: { type: Number },
    cCode: { type: String },
    phnNo: { type: String },
    name: { type: String },
    email: { type: String },
    type: { type: String, enum: ["VERIFY_OTP", "CREATE_PROFILE", "PLACE_ORDER"] },
});

export let load = model<ILoad>('load', loadSchema)