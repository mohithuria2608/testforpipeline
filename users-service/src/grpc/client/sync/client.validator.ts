
'use strict';
import * as Joi from '@hapi/joi';
import { validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class SyncServiceValidator {
    constructor() {
    }

    async fetchConfigValidator(data: ISyncGrpcRequest.IFetchConfig) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    store_code: Joi.string(),
                    type: Joi.string(),
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }

    async fetchAppversionValidator(data: ISyncGrpcRequest.IFetchAppversion) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    type: Joi.string().valid(
                        Constant.DATABASE.TYPE.APP_VERSION.NORMAL,
                        Constant.DATABASE.TYPE.APP_VERSION.SKIP,
                        Constant.DATABASE.TYPE.APP_VERSION.FORCE),
                    isActive: Joi.number().valid(0, 1).required(),
                    deviceType: Joi.string().valid(
                        Constant.DATABASE.TYPE.DEVICE.ANDROID,
                        Constant.DATABASE.TYPE.DEVICE.IOS
                    )
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }

    async fetchFaqValidator(data: ISyncGrpcRequest.IFetchFaq) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    country: Joi.string().valid(
                        Constant.DATABASE.COUNTRY.UAE
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY.type)),
                    language: Joi.string().required().valid(
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ).default(Constant.DATABASE.LANGUAGE.EN).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.type)),
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }
}


export const syncServiceValidator = new SyncServiceValidator()


