
'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../../constant'

export const JOI_HEADERS = {
    language: Joi.string().valid(
        Constant.DATABASE.LANGUAGE.AR,
        Constant.DATABASE.LANGUAGE.EN
    ).required(),
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