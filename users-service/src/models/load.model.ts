import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface ILoad extends Document {
    cartId: string,
    deviceId: string,
    accessToken: string,
    addressId: string,
    cartUpdatedAt: string,
};

const loadSchema = new Schema({
    cartId: { type: String, required: true, index: true },
    deviceId: { type: String, required: true },
    accessToken: { type: String, required: true },
    addressId: { type: String, required: true },
    cartUpdatedAt: { type: Number }
});

export let load = model<ILoad>('load', loadSchema)