'use strict';
import * as Joi from '@hapi/joi';
import * as request from 'request-promise';
import * as _config from "config";
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, sendSuccess } from '../utils'
import { cloneObject } from '../utils/helper';

/**
 * Version: 1.0.0
 * @description Noonpay payment gateway integration class
 * @author Ashish Kumar (Appinventive)
 */
export class PaymentClass extends BaseEntity {

    private static readonly API_KEY_PREFIX = Constant.SERVER.PAYMENT_API_KEY_PREFIX;

    private static readonly CUSTOM_ERRORS = Object.freeze({
        default: {
            statusCode: 7000,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Unknown error', // add custom error message
            type: 'DEFAULT',
            actionHint: ''
        },
        PAYMENT_ORDER_EXPIRED: {
            statusCode: 7001,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment initiation expired.',
            type: 'PAYMENT_ORDER_EXPIRED',
            actionHint: ''
        },
        PAYMENT_ORDER_CANCELLED: {
            statusCode: 7002,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment cancelled.',
            type: 'PAYMENT_ORDER_CANCELLED',
            actionHint: ''
        },
        PAYMENT_ORDER_FAILED: {
            statusCode: 7003,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment Failed',
            type: 'PAYMENT_ORDER_FAILED',
            actionHint: ''
        },
        UNHANDLED_PAYMENT_ORDER_STATUS: {
            statusCode: 7010,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Unhandled Payment order status',
            type: 'UNHANDLED_PAYMENT_ORDER_STATUS',
            actionHint: ''
        },
        PAYMENT_ORDER_PENDING: {
            statusCode: 7011,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment order status is Pending',
            type: 'PAYMENT_ORDER_PENDING',
            actionHint: ''
        },
        PAYMENT_ORDER_MARKED_FOR_REVIEW: {
            statusCode: 7012,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment marked for review by Fraud Detection System',
            type: 'PAYMENT_ORDER_MARKED_FOR_REVIEW',
            actionHint: ''
        },
        PAYMENT_ORDER_REJECTED: {
            statusCode: 7013,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment Rejected by the Fraud Detection System',
            type: 'PAYMENT_ORDER_REJECTED',
            actionHint: ''
        },
        PENDING_AUTHORIZATION: {
            statusCode: 7014,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment authorization.',
            type: 'PENDING_AUTHORIZATION',
            actionHint: ''
        },
        PENDING_PAYMENT_REVERSAL: {
            statusCode: 7015,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment reversal.',
            type: 'PENDING_PAYMENT_REVERSAL',
            actionHint: ''
        },
        PENDING_PAYMENT_CAPTURE: {
            statusCode: 7016,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment capture.',
            type: 'PENDING_PAYMENT_CAPTURE',
            actionHint: ''
        },
        PENDING_PAYMENT_REFUND: {
            statusCode: 7017,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment refund.',
            type: 'PENDING_PAYMENT_REFUND',
            actionHint: ''
        },
        PAYMENT_REVERSED: {
            statusCode: 7018,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment reversed, can\'t perform Capture',
            type: 'PAYMENT_REVERSED',
            actionHint: ''
        },
        INVALID_PAYMENT_STATUS_FOR_CAPTURE: {
            statusCode: 7019,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Invalid Payment order status for CAPTURE operation',
            type: 'INVALID_PAYMENT_STATUS_FOR_CAPTURE',
            actionHint: ''
        },
        INVALID_PAYMENT_STATUS_FOR_REVERSE: {
            statusCode: 7020,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Invalid Payment order status for REVERSE operation',
            type: 'INVALID_PAYMENT_STATUS_FOR_REVERSE',
            actionHint: ''
        },
        INVALID_PAYMENT_STATUS_FOR_REFUND: {
            statusCode: 7021,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Invalid Payment order status for REFUND operation',
            type: 'INVALID_PAYMENT_STATUS_FOR_REFUND',
            actionHint: ''
        }
    });

    private static readonly INITIATE_PAYMENT_REQUEST_SCHEMA = Joi.object({
        storeCode: Joi.string().trim().required().description('CMS store code'),
        orderId: Joi.string().trim().required().description('CMS order id'),
        amount: Joi.number().required().greater(0),
        paymentMethodId: Joi.number().integer().required().description('User selected payment method id of noonpay payment methods'),
        channel: Joi.string().trim().required().valid('Mobile', 'Web'),
        locale: Joi.string().trim().lowercase().optional().valid(Constant.DATABASE.PAYMENT_LOCALE.EN, Constant.DATABASE.PAYMENT_LOCALE.AR),
    });

    private static readonly CAPTURE_PAYMENT_REQUEST_SCHEMA = Joi.object({
        noonpayOrderId: Joi.number().integer().required().description('Noonpay order id, returned in INITIATE'),
        orderId: Joi.string().trim().optional().description('CMS order id'),
        amount: Joi.number().required(),
        storeCode: Joi.string().trim().required().description('CMS store code')
    });

    private static readonly REVERSE_PAYMENT_REQUEST_SCHEMA = Joi.object({
        noonpayOrderId: Joi.number().integer().required().description('Noonpay order id, returned in INITIATE'),
        storeCode: Joi.string().trim().required().description('CMS store code')
    });

    private static readonly REFUND_PAYMENT_REQUEST_SCHEMA = Joi.object({
        noonpayOrderId: Joi.number().integer().required().description('Noonpay order id, returned in INITIATE'),
        amount: Joi.number().required().description('Amount to refund(Order amount)'),
        captureTransactionId: Joi.string().trim().required().description('The transaction id of Capture transaction'),
        storeCode: Joi.string().trim().required().description('CMS store code')
    });

    constructor() {
        super('payment')
    }
    /**
     * @description Returns applicable payment configuration corresponding to a cms store code`
     * @param storeCode
     */
    private async getConfig(storeCode: string) {
        // TODO: Get from Aerospike
        return Constant.PAYMENT_CONFIG[storeCode];
    }
    /**
     * @description Returns applicable noonpay payment configuration corresponding to a cms store code`
     * @param storeCode
     */
    private async getNoonpayConfig(storeCode: string) {
        // TODO: Get from Aerospike
        return Constant.PAYMENT_CONFIG[storeCode].noonpayConfig;
    }
    /**
     * @description Generates and returns API key for specified configuration
     * @param noonpayConfig 
     */
    private getNoonPayAPIKey(noonpayConfig: any): string {
        // Format: Key_Environment Base64Encoded(BusinessIdentifier.ApplicationIdentifier:AppKey (case-insensitive))
        let key = `${PaymentClass.API_KEY_PREFIX}${noonpayConfig.environment} ${(new Buffer(`${noonpayConfig.businessIdentifier}.${noonpayConfig.appIdentifier}:${noonpayConfig.appAccessKey}`)).toString('base64')}`;
        return key;
    }
    /**
     * @description Returns noonpay post authorization callback url
     */
    private getReturnUrl(): string {
        // return `${_config.get('server.order.url')}:${_config.get('server.order.port')}/order-service/v1/webhook/noonpay/order/process-payment`;
        let api = 'v1/webhook/noonpay/order/process-payment'
        return `${_config.get('server.order.url')}${api}`
    }
    /**
     * @description Returns custom error objects corresponding to noonpay error codes
     */
    private getErrorObject(paymentResponse: any) {
        let err: ICommonRequest.IError;
        if (Constant.STATUS_MSG.NOONPAY_ERROR[paymentResponse.resultCode]) {
            err = cloneObject(Constant.STATUS_MSG.NOONPAY_ERROR[paymentResponse.resultCode]);
            if (err.useNoonPayMessage) {
                err.message = paymentResponse.message;
                delete err.useNoonPayMessage;
            }
        } else {
            err = cloneObject(Constant.STATUS_MSG.NOONPAY_ERROR.default);
            err.message = paymentResponse.message;
        }
        // attach noonpay response object
        if (paymentResponse && paymentResponse.resultCode !== undefined) {
            err.data = paymentResponse;
        }
        err.name = 'PaymentError';
        console.log('---------error object', err);
        return err;
    }
    /**
     * @description Get available payment methods for a given brand in a country
     * @param storeCode
     */
    public async getPaymentMethods(storeCode: string) {
        try {
            const config = await this.getConfig(storeCode);
            let availablePaymentMethods = {
                noonpay: [],
                offline: []
            }
            availablePaymentMethods.noonpay = config.noonpayConfig.paymentMethods.map((pMethod) => ({ id: pMethod.id, name: pMethod.name }));
            if (config.codInfo && config.codInfo.status === 1) {
                // COD available
                availablePaymentMethods.offline.push({
                    id: 0,
                    name: config.codInfo.name,
                    min_order_total: config.codInfo.min_order_total,
                    max_order_total: config.codInfo.max_order_total,
                    code: config.codInfo.code
                });
            }
            return availablePaymentMethods;
        } catch (error) {
            consolelog(process.cwd(), 'Get Payment Methods', JSON.stringify(error), false);
            if (error && !error.name) {
                error.name = 'PaymentError';
            }
            return Promise.reject(error);
        }
    }
    /**
     * @description Initiates payment at noonpay with specified payment method, returns FE redirection url
     * @param payload IPaymentGrpcRequest.IInitiatePayment
     */
    public async initiatePayment(payload: IPaymentGrpcRequest.IInitiatePayment) {
        const { error, value } = PaymentClass.INITIATE_PAYMENT_REQUEST_SCHEMA.validate(payload);
        if (error) {
            consolelog(process.cwd(), 'Payment INITIATE Validation error', JSON.stringify(error), false);
            return Promise.reject(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR);
        }
        // get payment method details
        const config = await this.getNoonpayConfig(payload.storeCode);
        const paymentMethodDetails = config.paymentMethods.filter((pMethod) => { if (pMethod.id === payload.paymentMethodId) { return pMethod; } })[0];
        // get noonpay API key
        const apiKey = this.getNoonPayAPIKey(config);

        let initiatePayload = {
            apiOperation: Constant.DATABASE.ACTION.TRANSACTION.INITIATE,
            order: {
                name: 'Order from KFC App', // TODO: Confirm what needs to be sent here ?
                amount: payload.amount,
                currency: config.currencyCode,
                channel: payload.channel,
                category: paymentMethodDetails.orderCategory,
                reference: payload.orderId
            },
            configuration: {
                returnUrl: this.getReturnUrl(),
                locale: payload.locale || Constant.DATABASE.PAYMENT_LOCALE.EN, // default english
                paymentAction: Constant.DATABASE.ACTION.TRANSACTION.AUTHORIZE,
                initiationValidity: new Date(Date.now() + (config.noonpayOrderExpirationTime)).toISOString()
            }
        };

        try {
            let response: any = await request.post(`${config.noonpayBaseUrl}${config.noonpayInitiatePaymentEndPoint}`, {
                body: initiatePayload,
                headers: {
                    Authorization: apiKey
                },
                json: true,
                timeout: Constant.SERVER.PAYMENT_API_TIMEOUT
            });

            console.log('--Payment INITIATE');
            let result = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.result.order.id,
                orderId: response.result.order.reference,
                paymentStatus: response.result.order.status,
                creationTime: response.result.order.creationTime,
                amount: response.result.order.amount,
                currency: response.result.order.currency,
                channel: response.result.order.channel,
                noonpayRedirectionUrl: response.result.checkoutData.postUrl
            };
            // TODO: Update Payment status and noonpay order id
            // To be done in order service
            if (response.resultCode === 0) {
                console.log('--Payment INITIATE 1', result);

                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment INITIATE, non-zero resultCode', response, true);
                return Promise.reject(this.getErrorObject(result));
            }
        } catch (error) {
            // TODO: Update Payment status and noonpay order id
            // To be done in order service
            error = error && error.error ? error.error : error;
            if (error.resultCode) {
                error = this.getErrorObject(error);
            }
            consolelog(process.cwd(), 'Payment INITIATE', (error && error.message ? error.message : error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Get Noonpay order status using either noonpayOrderId or orderId (CMS)
     * @param payload IPaymentGrpcRequest.IGetPaymentStatus
     */
    public async getPaymentStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus) {
        if (!payload.noonpayOrderId && !payload.orderId) {
            return Promise.reject('Either Noonpay order id or CMS order id required');
        }
        const config = await this.getNoonpayConfig(payload.storeCode);
        const apiKey = this.getNoonPayAPIKey(config);

        try {
            let response: any = await request.get(`${config.noonpayBaseUrl}${payload.noonpayOrderId ? config.noonpayGetOrderEndPoint + '/' + payload.noonpayOrderId : config.noonpayGetOrderByReferenceEndPoint + '/' + payload.orderId}`, {
                headers: {
                    Authorization: apiKey
                },
                json: true,
                timeout: Constant.SERVER.PAYMENT_API_TIMEOUT
            });
            // EXPECTED: In case of using CMS order id, response might contain contain multiple transaction, pick the recent one
            // ACTUAL: Get Error code 19085
            // TODO: In Authorization payment check, compare the order amount with authorized amount - if different -> cancel the transaction and reverse.
            // To be implemented in order service
            console.log('--Payment ORDER STATUS', JSON.stringify(response));
            let result: IPaymentGrpcRequest.IGetPaymentStatusRes = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.result.order.id,
                orderId: response.result.order.reference,
                paymentStatus: response.result.order.status,
                creationTime: response.result.order.creationTime,
                amount: response.result.order.amount,
                totalAuthorizedAmount: response.result.order.totalAuthorizedAmount || 0,
                totalCapturedAmount: response.result.order.totalCapturedAmount || 0,
                totalRefundedAmount: response.result.order.totalRefundedAmount || 0,
                totalReversedAmount: response.result.order.totalReversedAmount || 0,
                currency: response.result.order.currency,
                noonPayOrderCategory: response.result.order.category,
                channel: response.result.order.channel,
                paymentDetails: response.result.paymentDetails,
                transactions: response.result.transactions,
                noonpayRedirectionUrl: response.result.checkoutData ? response.result.checkoutData.postUrl : ''
            };
            if (response.resultCode === 0) {
                // response.result.order.status !== Constant.DATABASE.STATUS.PAYMENT.FAILED
                switch (response.result.order.status) {
                    case Constant.DATABASE.STATUS.PAYMENT.EXPIRED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED);
                    case Constant.DATABASE.STATUS.PAYMENT.CANCELLED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_CANCELLED);
                    case Constant.DATABASE.STATUS.PAYMENT.FAILED:
                        // result.message = response.result.order.errorMessage;
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_FAILED);
                    case Constant.DATABASE.STATUS.PAYMENT.PENDING:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_PENDING);
                    case Constant.DATABASE.STATUS.PAYMENT.MARKED_FOR_REVIEW:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_MARKED_FOR_REVIEW);
                    case Constant.DATABASE.STATUS.PAYMENT.REJECTED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_REJECTED);
                    case Constant.DATABASE.STATUS.PAYMENT.INITIATED:
                    case Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED:
                    case Constant.DATABASE.STATUS.PAYMENT.CAPTURED:
                    case Constant.DATABASE.STATUS.PAYMENT.REVERSED:
                    case Constant.DATABASE.STATUS.PAYMENT.REFUNDED:
                        return result;
                    default:
                        consolelog(process.cwd(), 'Payment Unhandled ORDER STATUS', response, true);
                        throw PaymentClass.CUSTOM_ERRORS.UNHANDLED_PAYMENT_ORDER_STATUS;
                }
            } else {
                // some error
                consolelog(process.cwd(), 'Payment ORDER STATUS, non-zero resultCode or order status failed', response, true);
                return Promise.reject(this.getErrorObject(result));
            }
        } catch (error) {
            error = error && error.error ? error.error : error;
            if (error.resultCode) {
                error = this.getErrorObject(error);
            }
            consolelog(process.cwd(), 'Payment ORDER STATUS', (error && error.message ? error.message : error), false);
            return Promise.reject(error);
        }

    }
    /**
     * @description Get Noonpay order INITIATE status using either noonpayOrderId or orderId (CMS)
     * @param payload IPaymentGrpcRequest.IGetPaymentStatus
     */
    public async getInitiateStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus): Promise<IPaymentGrpcRequest.IGetPaymentInitiateStatusRes> {
        if (!payload.noonpayOrderId && !payload.orderId) {
            return Promise.reject('Either Noonpay order id or CMS order id required');
        }
        try {
            let response: IPaymentGrpcRequest.IGetPaymentStatusRes = await this.getPaymentStatus(payload);
            let result: IPaymentGrpcRequest.IGetPaymentInitiateStatusRes = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.noonpayOrderId,
                orderId: response.orderId,
                paymentStatus: response.paymentStatus,
                creationTime: response.creationTime,
                amount: response.amount,
                currency: response.currency,
                channel: response.channel,
                noonpayRedirectionUrl: response.noonpayRedirectionUrl
            }
            return result;
        } catch (error) {
            consolelog(process.cwd(), 'Payment ORDER INITIATE STATUS', JSON.stringify(error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Get Noonpay order AUTHORIZATION status using either noonpayOrderId or orderId (CMS)
     * @param payload IPaymentGrpcRequest.IGetPaymentStatus
     */
    public async getAuthorizationStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus): Promise<IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes> {
        if (!payload.noonpayOrderId && !payload.orderId) {
            return Promise.reject('Either Noonpay order id or CMS order id required');
        }
        try {
            let response: IPaymentGrpcRequest.IGetPaymentStatusRes = await this.getPaymentStatus(payload);
            if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.INITIATED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_AUTHORIZATION;
            }
            let result: IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.noonpayOrderId,
                orderId: response.orderId,
                paymentStatus: response.paymentStatus,
                creationTime: response.creationTime,
                amount: response.amount,
                totalAuthorizedAmount: response.totalAuthorizedAmount,
                totalCapturedAmount: response.totalCapturedAmount,
                totalRefundedAmount: response.totalRefundedAmount,
                totalReversedAmount: response.totalReversedAmount,
                currency: response.currency,
                channel: response.channel,
                paymentDetails: response.paymentDetails,
                // filter authorization transaction details
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION.AS) { return t; } })) : []
            }
            return result;
        } catch (error) {
            consolelog(process.cwd(), 'Payment ORDER AUTHORIZATION STATUS', JSON.stringify(error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Get Noonpay order REVERSED status using either noonpayOrderId or orderId (CMS)
     * @param payload IPaymentGrpcRequest.IGetPaymentStatus
     */
    public async getReverseStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus): Promise<IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes> {
        if (!payload.noonpayOrderId && !payload.orderId) {
            return Promise.reject('Either Noonpay order id or CMS order id required');
        }
        try {
            let response: IPaymentGrpcRequest.IGetPaymentStatusRes = await this.getPaymentStatus(payload);
            if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.INITIATED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_AUTHORIZATION;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_PAYMENT_REVERSAL;
            }
            let result: IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.noonpayOrderId,
                orderId: response.orderId,
                paymentStatus: response.paymentStatus,
                creationTime: response.creationTime,
                amount: response.amount,
                totalAuthorizedAmount: response.totalAuthorizedAmount,
                totalCapturedAmount: response.totalCapturedAmount,
                totalRefundedAmount: response.totalRefundedAmount,
                totalReversedAmount: response.totalReversedAmount,
                currency: response.currency,
                channel: response.channel,
                paymentDetails: response.paymentDetails,
                // filter void transaction(reverse) details
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION.AS) { return t; } })) : undefined
            }
            return result;
        } catch (error) {
            consolelog(process.cwd(), 'Payment ORDER REVERSE STATUS', JSON.stringify(error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Get Noonpay order CAPTURE status using either noonpayOrderId or orderId (CMS)
     * @param payload IPaymentGrpcRequest.IGetPaymentStatus
     */
    public async getCaptureStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus): Promise<IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes> {
        if (!payload.noonpayOrderId && !payload.orderId) {
            return Promise.reject('Either Noonpay order id or CMS order id required');
        }
        try {
            let response: IPaymentGrpcRequest.IGetPaymentStatusRes = await this.getPaymentStatus(payload);
            if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.INITIATED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_AUTHORIZATION;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_PAYMENT_CAPTURE;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.REVERSED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_REVERSED;
            }
            let result: IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.noonpayOrderId,
                orderId: response.orderId,
                paymentStatus: response.paymentStatus,
                creationTime: response.creationTime,
                amount: response.amount,
                totalAuthorizedAmount: response.totalAuthorizedAmount,
                totalCapturedAmount: response.totalCapturedAmount,
                totalRefundedAmount: response.totalRefundedAmount,
                totalReversedAmount: response.totalReversedAmount,
                currency: response.currency,
                channel: response.channel,
                paymentDetails: response.paymentDetails,
                // filter capture transaction details
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.CAPTURE.AS) { return t; } })) : []
            }
            return result;
        } catch (error) {
            consolelog(process.cwd(), 'Payment ORDER CAPTURE STATUS', JSON.stringify(error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Get Noonpay order REFUND status using either noonpayOrderId or orderId (CMS)
     * @param payload IPaymentGrpcRequest.IGetPaymentStatus
     */
    public async getRefundStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus): Promise<IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes> {
        if (!payload.noonpayOrderId && !payload.orderId) {
            return Promise.reject('Either Noonpay order id or CMS order id required');
        }
        try {
            let response: IPaymentGrpcRequest.IGetPaymentStatusRes = await this.getPaymentStatus(payload);
            if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.INITIATED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_AUTHORIZATION;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_PAYMENT_CAPTURE;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.REVERSED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_REVERSED;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.CAPTURED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_PAYMENT_CAPTURE;
            }
            let result: IPaymentGrpcRequest.IGetPaymentAuthorizationStatusRes = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.noonpayOrderId,
                orderId: response.orderId,
                paymentStatus: response.paymentStatus,
                creationTime: response.creationTime,
                amount: response.amount,
                totalAuthorizedAmount: response.totalAuthorizedAmount,
                totalCapturedAmount: response.totalCapturedAmount,
                totalRefundedAmount: response.totalRefundedAmount,
                totalReversedAmount: response.totalReversedAmount,
                currency: response.currency,
                channel: response.channel,
                paymentDetails: response.paymentDetails,
                // filter refund transaction details
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.REFUND.AS) { return t; } })) : []
            }
            return result;
        } catch (error) {
            consolelog(process.cwd(), 'Payment ORDER REFUND STATUS', JSON.stringify(error), false);
            return Promise.reject(error);
        }
    }

    /**
     * @description Capture authorized payment
     * @param payload IPaymentGrpcRequest.ICapturePayment
     */
    public async capturePayment(payload: IPaymentGrpcRequest.ICapturePayment) {
        const { error, value } = PaymentClass.CAPTURE_PAYMENT_REQUEST_SCHEMA.validate(payload);
        if (error) {
            consolelog(process.cwd(), 'Payment CAPTURE Validation error', JSON.stringify(error), false);
            return Promise.reject(error);
        }
        const config = await this.getNoonpayConfig(payload.storeCode);
        const apiKey = this.getNoonPayAPIKey(config);

        let capturePayload = {
            apiOperation: Constant.DATABASE.ACTION.TRANSACTION.CAPTURE,
            order: {
                id: payload.noonpayOrderId
            },
            transaction: {
                /** IMPORTANT: If the requested capture amount is less than authorized amount then system(Noonpay) will automatically reverse the remaining amount. */
                amount: payload.amount,
                currency: config.currencyCode,
                finalCapture: true
            }
        };

        try {
            let response: any = await request.post(`${config.noonpayBaseUrl}${config.noonpayCapturePaymentEndPoint}`, {
                body: capturePayload,
                headers: {
                    Authorization: apiKey
                },
                json: true,
                timeout: Constant.SERVER.PAYMENT_API_TIMEOUT
            });
            console.log('--Payment CAPTURE', JSON.stringify(response));
            let result = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.result.order.id,
                orderId: response.result.order.reference,
                paymentStatus: response.result.order.status,
                creationTime: response.result.transaction.creationTime, // capture payment timestamp
                amount: response.result.order.amount,
                totalAuthorizedAmount: response.result.order.totalAuthorizedAmount,
                totalCapturedAmount: response.result.order.totalCapturedAmount,
                totalRefundedAmount: response.result.order.totalRefundedAmount,
                totalReversedAmount: response.result.order.totalReversedAmount,
                currency: response.result.order.currency,
                noonPayOrderCategory: response.result.order.category,
                channel: response.result.order.channel,
                transactions: [response.result.transaction] // capture payment transaction
            };
            // TODO: Update Payment status
            // To be done at order service
            if (response.resultCode === 0) {
                switch (response.result.order.status) {
                    case Constant.DATABASE.STATUS.PAYMENT.EXPIRED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED);
                    case Constant.DATABASE.STATUS.PAYMENT.CANCELLED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_CANCELLED);
                    case Constant.DATABASE.STATUS.PAYMENT.FAILED:
                        // result.message = response.result.order.errorMessage;
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_FAILED);
                    case Constant.DATABASE.STATUS.PAYMENT.PENDING:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_PENDING);
                    case Constant.DATABASE.STATUS.PAYMENT.MARKED_FOR_REVIEW:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_MARKED_FOR_REVIEW);
                    case Constant.DATABASE.STATUS.PAYMENT.REJECTED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_REJECTED);
                    case Constant.DATABASE.STATUS.PAYMENT.INITIATED:
                    case Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED:
                    case Constant.DATABASE.STATUS.PAYMENT.REVERSED:
                    case Constant.DATABASE.STATUS.PAYMENT.REFUNDED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.INVALID_PAYMENT_STATUS_FOR_CAPTURE);
                    case Constant.DATABASE.STATUS.PAYMENT.CAPTURED:
                        return result;
                    default:
                        consolelog(process.cwd(), 'Payment Unhandled ORDER STATUS', response, true);
                        throw PaymentClass.CUSTOM_ERRORS.UNHANDLED_PAYMENT_ORDER_STATUS;
                }
            } else {
                // some error
                consolelog(process.cwd(), 'Payment CAPTURE, non-zero resultCode', response, true);
                return Promise.reject(this.getErrorObject(result));
            }
        } catch (error) {
            error = error && error.error ? error.error : error;
            if (error.resultCode) {
                error = this.getErrorObject(error);
            }
            // TODO: Update Payment status and noonpay order id
            // To be done at order service
            consolelog(process.cwd(), 'Payment CAPTURE', (error && error.message ? error.message : error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Reverse authorized payment
     * @param payload IPaymentGrpcRequest.IReversePayment
     */
    public async reversePayment(payload: IPaymentGrpcRequest.IReversePayment) {
        const { error, value } = PaymentClass.REVERSE_PAYMENT_REQUEST_SCHEMA.validate(payload);
        if (error) {
            consolelog(process.cwd(), 'Payment REVERSE Validation error', JSON.stringify(error), false);
            return Promise.reject(error);
        }
        const config = await this.getNoonpayConfig(payload.storeCode);
        const apiKey = this.getNoonPayAPIKey(config);

        let reversePayload = {
            apiOperation: Constant.DATABASE.ACTION.TRANSACTION.REVERSE,
            order: {
                id: payload.noonpayOrderId
            }
        };

        try {
            let response: any = await request.post(`${config.noonpayBaseUrl}${config.noonpayReversePaymentEndPoint}`, {
                body: reversePayload,
                headers: {
                    Authorization: apiKey
                },
                json: true,
                timeout: Constant.SERVER.PAYMENT_API_TIMEOUT
            });
            console.log('--Payment REVERSE', JSON.stringify(response));
            let result = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.result.order.id,
                orderId: response.result.order.reference,
                paymentStatus: response.result.order.status, // REVERSED in this case
                creationTime: response.result.transaction.creationTime, // capture payment timestamp
                amount: response.result.order.amount,
                totalAuthorizedAmount: response.result.order.totalAuthorizedAmount,
                totalCapturedAmount: response.result.order.totalCapturedAmount,
                totalRefundedAmount: response.result.order.totalRefundedAmount,
                totalReversedAmount: response.result.order.totalReversedAmount,
                currency: response.result.order.currency,
                noonPayOrderCategory: response.result.order.category,
                channel: response.result.order.channel,
                transactions: [response.result.transaction] // reverse payment transaction
            };
            // TODO: Update Payment status
            // To be done at order service
            if (response.resultCode === 0) {
                switch (response.result.order.status) {
                    case Constant.DATABASE.STATUS.PAYMENT.EXPIRED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED);
                    case Constant.DATABASE.STATUS.PAYMENT.CANCELLED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_CANCELLED);
                    case Constant.DATABASE.STATUS.PAYMENT.FAILED:
                        // result.message = response.result.order.errorMessage;
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_FAILED);
                    case Constant.DATABASE.STATUS.PAYMENT.PENDING:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_PENDING);
                    case Constant.DATABASE.STATUS.PAYMENT.MARKED_FOR_REVIEW:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_MARKED_FOR_REVIEW);
                    case Constant.DATABASE.STATUS.PAYMENT.REJECTED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_REJECTED);
                    case Constant.DATABASE.STATUS.PAYMENT.INITIATED:
                    case Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED:
                    case Constant.DATABASE.STATUS.PAYMENT.CAPTURED:
                    case Constant.DATABASE.STATUS.PAYMENT.REFUNDED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.INVALID_PAYMENT_STATUS_FOR_REVERSE);
                    case Constant.DATABASE.STATUS.PAYMENT.REVERSED:
                        return result;
                    default:
                        consolelog(process.cwd(), 'Payment Unhandled ORDER STATUS', response, true);
                        throw PaymentClass.CUSTOM_ERRORS.UNHANDLED_PAYMENT_ORDER_STATUS;
                }
            } else {
                // some error
                consolelog(process.cwd(), 'Payment REVERSE, non-zero resultCode', response, true);
                return Promise.reject(this.getErrorObject(result));
            }
        } catch (error) {
            error = error && error.error ? error.error : error;
            if (error.resultCode) {
                error = this.getErrorObject(error);
            }
            // TODO: Update Payment status and noonpay order id
            // To be done at order service
            consolelog(process.cwd(), 'Payment REVERSE', (error && error.message ? error.message : error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Refund captured payment
     * @param payload IPaymentGrpcRequest.IRefundPayment
     */
    public async refundPayment(payload: IPaymentGrpcRequest.IRefundPayment) {
        const { error, value } = PaymentClass.REFUND_PAYMENT_REQUEST_SCHEMA.validate(payload);
        if (error) {
            consolelog(process.cwd(), 'Payment REFUND Validation error', JSON.stringify(error), false);
            return Promise.reject(error);
        }
        const config = await this.getNoonpayConfig(payload.storeCode);
        const apiKey = this.getNoonPayAPIKey(config);

        let refundPayload = {
            apiOperation: Constant.DATABASE.ACTION.TRANSACTION.REFUND,
            order: {
                id: payload.noonpayOrderId
            },
            transaction: {
                amount: payload.amount,
                currency: config.currencyCode,
                targetTransactionId: payload.captureTransactionId
            }
        };

        try {
            let response: any = await request.post(`${config.noonpayBaseUrl}${config.noonpayRefundPaymentEndPoint}`, {
                body: refundPayload,
                headers: {
                    Authorization: apiKey
                },
                json: true,
                timeout: Constant.SERVER.PAYMENT_API_TIMEOUT
            });
            console.log('--Payment REFUND');
            let result = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.result.order.id,
                orderId: response.result.order.reference,
                paymentStatus: response.result.order.status, // REFUNDED in this case
                creationTime: response.result.transaction.creationTime, // capture payment timestamp
                amount: response.result.order.amount,
                totalAuthorizedAmount: response.result.order.totalAuthorizedAmount,
                totalCapturedAmount: response.result.order.totalCapturedAmount,
                totalRefundedAmount: response.result.order.totalRefundedAmount,
                totalReversedAmount: response.result.order.totalReversedAmount,
                currency: response.result.order.currency,
                noonPayOrderCategory: response.result.order.category,
                channel: response.result.order.channel,
                transactions: [response.result.transaction] // refund payment transaction
            };
            // TODO: Update Payment status
            // To be done at order service
            if (response.resultCode === 0) {
                switch (response.result.order.status) {
                    case Constant.DATABASE.STATUS.PAYMENT.EXPIRED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED);
                    case Constant.DATABASE.STATUS.PAYMENT.CANCELLED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_CANCELLED);
                    case Constant.DATABASE.STATUS.PAYMENT.FAILED:
                        // result.message = response.result.order.errorMessage;
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_FAILED);
                    case Constant.DATABASE.STATUS.PAYMENT.PENDING:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_PENDING);
                    case Constant.DATABASE.STATUS.PAYMENT.MARKED_FOR_REVIEW:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_MARKED_FOR_REVIEW);
                    case Constant.DATABASE.STATUS.PAYMENT.REJECTED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_REJECTED);
                    case Constant.DATABASE.STATUS.PAYMENT.INITIATED:
                    case Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED:
                    case Constant.DATABASE.STATUS.PAYMENT.CAPTURED:
                    case Constant.DATABASE.STATUS.PAYMENT.REVERSED:
                        return Promise.reject(PaymentClass.CUSTOM_ERRORS.INVALID_PAYMENT_STATUS_FOR_REFUND);
                    case Constant.DATABASE.STATUS.PAYMENT.REFUNDED:
                        return result;
                    default:
                        consolelog(process.cwd(), 'Payment Unhandled ORDER STATUS', response, true);
                        throw PaymentClass.CUSTOM_ERRORS.UNHANDLED_PAYMENT_ORDER_STATUS;
                }
            } else {
                // some error
                consolelog(process.cwd(), 'Payment REFUND, non-zero resultCode', response, true);
                return Promise.reject(this.getErrorObject(result));
            }
        } catch (error) {
            error = error && error.error ? error.error : error;
            if (error.resultCode) {
                error = this.getErrorObject(error);
            }
            // TODO: Update Payment status and noonpay order id
            // To be done at order service
            consolelog(process.cwd(), 'Payment REFUND', (error && error.message ? error.message : error), false);
            return Promise.reject(error);
        }
    }
}

export const PaymentE = new PaymentClass()
