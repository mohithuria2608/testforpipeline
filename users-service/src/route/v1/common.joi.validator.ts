
'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../../constant'


//@generic headers :on basis of platforms that which keys are required + mandatory
//@app version seperate apis
export const COMMON_HEADERS = {
    language: Joi.string().valid(
        Constant.DATABASE.LANGUAGE.AR,
        Constant.DATABASE.LANGUAGE.EN
    ).required(),
    brand:Joi.string().valid(
        Constant.DATABASE.BRAND.KFC,
        Constant.DATABASE.BRAND.PH
    ),
    country: Joi.string().valid(
        Constant.DATABASE.COUNTRY.UAE
    ).required(),
    appversion: Joi.string().required(),
    devicemodel: Joi.string().required(), 
    devicetype: Joi.string().valid(
        Constant.DATABASE.TYPE.DEVICE.ANDROID,
        Constant.DATABASE.TYPE.DEVICE.IOS
    ).required(),
    osversion: Joi.string().required(),
    deviceid: Joi.string().trim().required()
}