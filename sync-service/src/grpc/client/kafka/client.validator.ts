
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class KafkaServiceValidator {
    constructor() {
    }

    async syncToCmsMenuValidator(data: IKafkaGrpcRequest.ISyncToSDMMenuData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    data: Joi.string().required(),
                    action: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        name: Joi.boolean(),
                        email: Joi.boolean(),
                        phone: Joi.boolean(),
                    }),
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(error.message)
            }
        })
    }

    async updateMenuFromCMSValidator(data: IKafkaGrpcRequest.IUpdateMenuFromCMS) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    data: Joi.string().required(),
                    action: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        name: Joi.boolean(),
                        email: Joi.boolean(),
                        phone: Joi.boolean(),
                    }),
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(error.message)
            }
        })
    }

    async syncUpsellProductsValidator(data: IKafkaGrpcRequest.IUpdateMenuFromCMS) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    data: Joi.string().required(),
                    action: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        name: Joi.boolean(),
                        email: Joi.boolean(),
                        phone: Joi.boolean(),
                    }),
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(error.message)
            }
        })
    }

    async createPromotionValidator(data: IKafkaGrpcRequest.ICreatePromotion) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    data: Joi.string().required(),
                    action: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        name: Joi.boolean(),
                        email: Joi.boolean(),
                        phone: Joi.boolean(),
                    }),
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(error.message)
            }
        })
    }
}


export const kafkaServiceValidator = new KafkaServiceValidator()


