
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog,validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class PromotionServiceValidator {
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
                    count: Joi.number()
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }
}


export const promotionServiceValidator = new PromotionServiceValidator()


