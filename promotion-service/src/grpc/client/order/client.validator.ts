
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class OrderServiceValidator {
    constructor() {
    }

    async getCartValidator(data: IOrderGrpcRequest.IGetOrder) {
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
                reject(error.message)
            }
        })
    }

    async updateCartValidator(data: IOrderGrpcRequest.IUpdateOrder) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    curItems: Joi.any(),
                    cmsCart: Joi.any(),
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


export const orderServiceValidator = new OrderServiceValidator()


