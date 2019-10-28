"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Constant = require("../constant");
const userSchema = new mongoose_1.Schema({
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
exports.User = mongoose_1.model("User", userSchema);
