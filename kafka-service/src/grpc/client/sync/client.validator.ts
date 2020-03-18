
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog ,validatorErr} from "../../../utils"
import * as Constant from '../../../constant'

export class SyncServiceValidator {
    constructor() {
    }

    async syncValidator(data: IKafkaRequest.IKafkaBody) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    set: Joi.string().required(),
                    as: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    cms: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    sdm: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    mdb: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    count: Joi.number(),
                    q: Joi.string(),
                    error: Joi.string().allow(""),
                    inQ: Joi.boolean().required()
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

    async fetchConfigValidator(data: ISyncGrpcRequest.IFetchConfig) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    store_code: Joi.string().required(),
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
}


export const syncServiceValidator = new SyncServiceValidator()


