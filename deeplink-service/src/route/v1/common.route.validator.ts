
'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../../constant'

export const COMMON_HEADERS = {
    language: Joi.string().valid(
        Constant.DATABASE.LANGUAGE.AR,
        Constant.DATABASE.LANGUAGE.EN
    ).default(Constant.DATABASE.LANGUAGE.EN).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.type)),
    brand: Joi.string().valid(
        Constant.DATABASE.BRAND.KFC,
        Constant.DATABASE.BRAND.PH
    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_BRAND.type)),
    country: Joi.string().valid(
        Constant.DATABASE.COUNTRY.UAE
    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY.type)),
    appversion: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
    devicemodel: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
    devicetype: Joi.string().valid(
        Constant.DATABASE.TYPE.DEVICE.ANDROID,
        Constant.DATABASE.TYPE.DEVICE.IOS
    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
    osversion: Joi.string().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
    deviceid: Joi.string().trim().required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
    timezone: Joi.string().trim().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
    channel: Joi.string().valid(Constant.DATABASE.TYPE.API_CHANNEL.KFC_APP).trim().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.type)),
}