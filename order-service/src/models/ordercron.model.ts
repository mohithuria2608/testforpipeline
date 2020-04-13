import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface IOrdercron extends Document {
    sdmOrderRef: number
    mongoOrderRef: number
    cmsOrderRef: number
    status: string
    sdmOrderStatus: number
};


const ordercronSchema = new Schema({
    sdmOrderRef: { type: Number, required: true, index: true },
    mongoOrderRef: { type: Number, required: true, index: true },
    cmsOrderRef: { type: Number, required: true, index: true },
    status: { type: String, required: true, index: true },
    sdmOrderStatus: { type: Number, required: true, index: true },
});

export let ordercron = model<IOrdercron>('ordercron', ordercronSchema)