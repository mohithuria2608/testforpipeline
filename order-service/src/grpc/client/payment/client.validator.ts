
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
                    storeCode: Joi.string().trim().required().description('CMS store code'),
                    orderId: Joi.string().trim().required().description('CMS order id'),
                    amount: Joi.number().required().greater(0),
                    paymentMethodId: Joi.number().integer().required().description('User selected payment method id of noonpay payment methods'),
                    channel: Joi.string().trim().required().valid('Mobile', 'Web'),
                    locale: Joi.string().trim().lowercase().optional().valid('en', 'ar'),
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


