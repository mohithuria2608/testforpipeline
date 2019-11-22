import * as Joi from '@hapi/joi';

const addressSchema = Joi.object().keys({
    type: Joi.string(),
    city: Joi.string(),
    area: Joi.string(),
    road: Joi.string(),
    buildingName: Joi.string(),
    buildingNo: Joi.number(),
    floor: Joi.number(),
    pincode: Joi.number(),
    flatNo: Joi.string(),
    countryCode: Joi.number(),
    provinceId: Joi.number(),
    addId: Joi.number()
})

export const userSchema = Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    userName: Joi.string().lowercase().trim().required(),
    countryCode: Joi.string().trim().required(),
    phoneNo: Joi.string().trim().regex(/^[0-9]+$/).required(),
    dob: Joi.number(),
    email: Joi.string().lowercase().trim().required(),
    password: Joi.string().trim().required(),
    address: Joi.array().items(addressSchema),
    createdAt: Joi.number().required(),
});