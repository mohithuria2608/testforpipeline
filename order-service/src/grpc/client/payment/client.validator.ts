
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class PaymentServiceValidator {
    constructor() {
    }

    async initiatePaymentValidator(data: IPaymentGrpcRequest.IInitiatePayment) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    orderId: Joi.string().required(),
                    amount: Joi.number().required(),
                    storeCode: Joi.string().required(),
                    paymentMethodId: Joi.number().required(),
                    channel: Joi.string().required(),
                    locale: Joi.string().required(),
                });
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }

    async getPaymentStatusValidator(data: IPaymentGrpcRequest.IGetPaymentStatus) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    noonpayOrderId: Joi.number().required(),
                    orderId: Joi.number(),
                    storeCode: Joi.string().required(),
                    paymentStatus: Joi.string(),
                });
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }

    async capturePaymentValidator(data: IPaymentGrpcRequest.ICapturePayment) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    noonpayOrderId: Joi.number().required(),
                    orderId: Joi.string().required(),
                    amount: Joi.number().required(),
                    storeCode: Joi.string().required()
                });
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


export const paymentServiceValidator = new PaymentServiceValidator()


