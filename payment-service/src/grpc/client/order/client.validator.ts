
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class OrderServiceValidator {
    constructor() {
    }

    async getCartValidator(data: IOrderGrpcRequest.IGetOrder) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    cartId: Joi.string().required(),
                    bins: Joi.array()
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

    // async updateCartValidator(data: IOrderGrpcRequest.IUpdateCart) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             let dataToValidate = Joi.object().keys({
    //                 cartId: Joi.string().required(),
    //                 cmsCart: Joi.string().required(),
    //             })
    //             const { error, value } = dataToValidate.validate(data, { abortEarly: true })
    //             if (error)
    //                 reject(error.message)
    //             resolve({})
    //         } catch (error) {
    //             reject(validatorErr(error.message))
    //         }
    //     })
    // }
}


export const orderServiceValidator = new OrderServiceValidator()


