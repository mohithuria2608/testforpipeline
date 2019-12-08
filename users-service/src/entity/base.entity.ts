import * as Joi from '@hapi/joi';
import { Aerospike } from "../databases/aerospike";
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseEntity {
    public DAO = Aerospike;
    protected set: SetNames;
    constructor(set?) {
        this.set = set
    }

    public addressSchema = Joi.object().keys({
        areaId: Joi.number().required(),
        bldgName: Joi.string(),
        bldgNameUn: Joi.string(),
        bldgNum: Joi.string(),
        cityId: Joi.number().required(),
        classId: Joi.number(),
        countryId: Joi.number().required(),
        userId: Joi.number().required(),
        description: Joi.string(),
        districtId: Joi.number().required(),
        flatNum: Joi.number(),
        floor: Joi.string(),
        language: Joi.string(),
        phoneAreaCode: Joi.string(),
        phoneLookup: Joi.string(),
        phoneNumber: Joi.string().required(),
        phoneType: Joi.number(),
        postalCode: Joi.string().required(),
        provinceCode: Joi.number().required(),
        sketch: Joi.string(),
        streetId: Joi.number(),
        useMap: Joi.number(),
        createdAt: Joi.number().required(),
        createdBy: Joi.string(),
        updatedBy: Joi.string()
    })

    public sessionSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        language: Joi.string().valid(Constant.DATABASE.LANGUAGE.AR, Constant.DATABASE.LANGUAGE.EN).trim().required(),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        appversion: Joi.string().trim().required(),
        devicemodel: Joi.string().trim().required(),
        devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS).trim().required(),
        osversion: Joi.string().trim().required(),
        deviceid: Joi.string().trim().required().description("sk"),
        isLogin: Joi.number().required(),
        createdAt: Joi.number().required(),
    });

    public userSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        cCode: Joi.string().trim().required().description("sk"),
        phnNo: Joi.string().trim().required().description("sk"),
        phnVerified: Joi.number().valid(0, 1).required(),
        otp: Joi.number().required(),
        otpExpAt: Joi.number().required(),
        email: Joi.string().email().lowercase().trim().required().description("sk"),
        profileStep: Joi.number().valid(Constant.DATABASE.TYPE.PROFILE_STEP.INIT, Constant.DATABASE.TYPE.PROFILE_STEP.FIRST).required(),
        language: Joi.string().valid(Constant.DATABASE.LANGUAGE.AR, Constant.DATABASE.LANGUAGE.EN).trim().required(),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        appversion: Joi.string().trim().required(),
        devicemodel: Joi.string().trim().required(),
        devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS).trim().required(),
        osversion: Joi.string().trim().required(),
        deviceid: Joi.string().trim().required().description("sk"),
        isLogin: Joi.number().required(),
        socialKey: Joi.string().trim().required().description("sk"),
        medium: Joi.string().trim().required(),
        createdAt: Joi.number().required(),
    });


}