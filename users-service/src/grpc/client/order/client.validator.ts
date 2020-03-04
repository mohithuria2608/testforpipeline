
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
                    userId: Joi.string().required()
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


export const orderServiceValidator = new OrderServiceValidator()


