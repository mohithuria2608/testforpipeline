
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog,validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class OrderServiceValidator {
    constructor() {
    }
    async createDefaultCartValidator(data: IOrderGrpcRequest.ICreateDefaultCart) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    cartId: Joi.string().required(),
                    userId: Joi.string().required()
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

    async updateCartTtlValidator(data: IOrderGrpcRequest.IUpdateDefaultCartTTL) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    cartId: Joi.string().required()
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


export const orderServiceValidator = new OrderServiceValidator()


