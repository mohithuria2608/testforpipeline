import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface Ilogger extends Document {
    type: string,
    info: any,
    description: string,
    options: {
        env: number,
    },
    createdAt: number
};

const loggerSchema = new Schema({
    type: {
        type: String, enum: [
            Constant.DATABASE.TYPE.ACTIVITY_LOG.REQUEST,
            Constant.DATABASE.TYPE.ACTIVITY_LOG.SDM_REQUEST,
            Constant.DATABASE.TYPE.ACTIVITY_LOG.CMS_REQUEST,
            Constant.DATABASE.TYPE.ACTIVITY_LOG.INFO,
            Constant.DATABASE.TYPE.ACTIVITY_LOG.ERROR,
            Constant.DATABASE.TYPE.ACTIVITY_LOG.SMS
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

export let logger = model<Ilogger>('logger', loggerSchema)
