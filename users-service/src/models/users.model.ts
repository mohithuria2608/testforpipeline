import { Schema, Document, model } from 'mongoose'
import * as Constant from '../constant';

export interface IUser extends Document {
    language?: string,
    name?: string,
    email?: string,
    countryCode: string,
    phoneNo: string,
    fullPhoneNo: string,
    registrationDate: Number,
};

const userSchema = new Schema({
    language: {
        type: String, enum: [
            Constant.DATABASE.LANGUAGE.EN,
        ],
        required: true
    },
    name: { type: String, trim: true },
    email: { type: String, trim: true, index: true },
    countryCode: { type: String, trim: true, required: true },
    phoneNo: { type: String, trim: true, required: true },
    fullPhoneNo: { type: String, index: true, required: true, sparse: true },
    registrationDate: { type: Number, required: true },
});

export let User = model<IUser>('User', userSchema)
