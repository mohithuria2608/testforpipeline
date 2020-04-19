import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    id: { type: String },
    password: { type: String },
    migrate: { type: Number },
    username: { type: String },
    brand: { type: String },
    country: { type: String },
    email: { type: String },
    fullPhnNo: { type: String },
    cCode: { type: String },
    phnNo: { type: String },
    sdmUserRef: { type: Number },
    sdmCorpRef: { type: Number },
    cmsUserRef: { type: Number },
    phnVerified: { type: Number },
    name: { type: String },
    profileStep: { type: Number },
    cmsAddress: { type: Schema.Types.Mixed }
}
);

export let user = model('user', userSchema)