
'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../../constant'


//@generic headers :on basis of platforms that which keys are required + mandatory
//@app version seperate apis
export const COMMON_HEADERS = {
    language: Joi.string().valid(
        Constant.DATABASE.LANGUAGE.AR,
        Constant.DATABASE.LANGUAGE.EN
    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.message)),
    brand: Joi.string().valid(
        Constant.DATABASE.BRAND.KFC,
        Constant.DATABASE.BRAND.PH
    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_BRAND.message)),
    country: Joi.string().valid(
        Constant.DATABASE.COUNTRY.UAE
    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY.message)),
    appversion: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
    devicemodel: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
    devicetype: Joi.string().valid(
        Constant.DATABASE.TYPE.DEVICE.ANDROID,
        Constant.DATABASE.TYPE.DEVICE.IOS
    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
    osversion: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
    deviceid: Joi.string().trim().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message))
}