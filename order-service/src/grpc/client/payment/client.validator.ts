
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
                    orderId: Joi.string().string().required(),
                    amount: Joi.number().string().required(),
                    storeCode: Joi.string().string().required(),
                    paymentMethodId: Joi.number().string().required(),
                    channel: Joi.string().string().required(),
                    locale: Joi.string().string(),
                });
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
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
                    noonpayOrderId: Joi.number().string().required(),
                    orderId: Joi.string().string().required(),
                    storeCode: Joi.string().string().required()
                });
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
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
                    noonpayOrderId: Joi.number().string().required(),
                    orderId: Joi.string().string().required(),
                    amount: Joi.number().string().required(),
                    storeCode: Joi.string().string().required()
                });
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


export const paymentServiceValidator = new PaymentServiceValidator()


