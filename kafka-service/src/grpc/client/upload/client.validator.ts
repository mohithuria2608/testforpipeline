
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class UploadServiceValidator {
    constructor() {
    }

    async uploadValidator(data) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    set: Joi.string().required(),
                    as: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    cms: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    sdm: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    mdb: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    count: Joi.number(),
                    q: Joi.string()
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


export const uploadServiceValidator = new UploadServiceValidator()


