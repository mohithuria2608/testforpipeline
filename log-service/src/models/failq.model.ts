import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface Ifailq extends Document {
    type: string,
    info: any,
    description: string,
    options: {
        env: number,
    },
    createdAt: number
};

const failQSchema = new Schema({
    type: {
        type: String, enum: [
            Constant.DATABASE.TYPE.ACTIVITY_LOG.FAIL_Q
        ],
        index: true
    },
    info: { type: Schema.Types.Mixed },
    description: { type: String },
    options: {
        env: { type: Number },
    },
    createdAt: { type: Number },
});

export let failq = model<Ifailq>('failq', failQSchema)
