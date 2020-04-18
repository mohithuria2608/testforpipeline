
'use strict';
import * as Joi from '@hapi/joi';
import { validatorErr } from "../../../utils"
import * as Constant from "../../../constant";
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
                    paymentMethodId: Joi.number().valid(
                        Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.COD,
                        Constant.DATABASE.TYPE.PAYMENT_METHOD_ID.CARD
                    ).integer().required().description('User selected payment method id of noonpay payment methods'),
                    channel: Joi.string().trim().required().valid('Mobile', 'Web'),
                    locale: Joi.string().trim().lowercase().optional().valid(Constant.DATABASE.PAYMENT_LOCALE.EN, Constant.DATABASE.PAYMENT_LOCALE.AR),
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
                    paymentStatus: Joi.string().trim().optional().valid(
                        Constant.DATABASE.STATUS.PAYMENT.INITIATED,
                        Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED,
                        Constant.DATABASE.STATUS.PAYMENT.CANCELLED,
                        Constant.DATABASE.STATUS.PAYMENT.CAPTURED,
                        Constant.DATABASE.STATUS.PAYMENT.REFUNDED,
                        Constant.DATABASE.STATUS.PAYMENT.EXPIRED,
                        Constant.DATABASE.STATUS.PAYMENT.FAILED
                    )
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

    async reversePaymentValidator(data: IPaymentGrpcRequest.IReversePayment) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    noonpayOrderId: Joi.number().required(),
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

    async refundPaymentValidator(data: IPaymentGrpcRequest.IRefundPayment) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    noonpayOrderId: Joi.number().integer().required().description('Noonpay order id, returned in INITIATE'),
                    amount: Joi.number().required().description('Amount to refund(Order amount)'),
                    captureTransactionId: Joi.string().trim().required().description('The transaction id of Capture transaction'),
                    storeCode: Joi.string().trim().required().description('CMS store code')
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


