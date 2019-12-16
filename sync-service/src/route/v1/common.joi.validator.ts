
'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../../constant'

export const JOI_CMS_HEADERS = {
    country: Joi.string().valid(
        Constant.DATABASE.COUNTRY.UAE
    ).required(),
    appversion: Joi.string().required(),
    devicetype: Joi.string().valid(
        Constant.DATABASE.TYPE.DEVICE.ANDROID,
        Constant.DATABASE.TYPE.DEVICE.IOS,
        Constant.DATABASE.TYPE.DEVICE.WEB
    ).required(),
    deviceid: Joi.string().trim().required()
}