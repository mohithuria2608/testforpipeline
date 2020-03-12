'use strict';
import * as Joi from '@hapi/joi';
import * as request from 'request-promise';
import * as _config from "config";
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, sendSuccess } from '../utils'
import { Aerospike } from '../aerospike'
import { cloneObject } from '../utils/helper';

/**
 * Noonpay Payment Config from CMS
 */
const PAYMENT_CONFIG = Object.freeze({
    // cms store code
    main_website_store: {
        /** 
         * NOTE: 1. Currently this info is coming inside noon_pay_config from CMS
         * 2. Keys are coming '_' separated
         */
        channel: 'Mobile', // TODO: To be provided by Order service
        decimal: 2, // To be added in CMS Store config - here not required
        /** xxxx */
        noonpayConfig: {
            brandCode: 'KFC',
            countryCode: 'UAE',
            currencyCode: 'AED',
            paymentMethods: [
                {
                    id: 1,
                    name: 'Card',
                    orderCategory: 'kfc_3ds'
                },
                {
                    id: 2,
                    name: 'Visa Checkout',
                    orderCategory: 'kfc_visacheckout'
                }
            ],
            paymentRetryInterval: 10 * 1000, // in milliseconds
            maxTry: 2,
            noonpayOrderExpirationTime: 10 * 60 * 1000, // in milliseconds (10min)
            businessIdentifier: 'americana_test_cognizant',
            appIdentifier: 'kfc_uae_test',
            appAccessKey: '65c5cc823a3f4c079de1c2928d927ebd',
            environment: 'Test', // Test or Live
            noonpayBaseUrl: 'https://api.noonpayments.com/payment/v1',
            noonpayInitiatePaymentEndPoint: '/order',
            noonpayGetOrderEndPoint: '/order',
            noonpayGetOrderByReferenceEndPoint: '/order/GetByReference',
            noonpayCapturePaymentEndPoint: '/order',
            noonpayReversePaymentEndPoint: '/order',
            noonpayRefundPaymentEndPoint: '/order',
            code: "noonpay",
            status: 1
        },
        codInfo: {
            status: 1,
            title: 'Cash On Delivery',
            min_order_total: null,
            max_order_total: null,
            code: "cashondelivery"
        }
    }
});

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
        PENDING_AUTHORIZATION: {
            statusCode: 7001,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment authorization.',
            type: 'PENDING_AUTHORIZATION',
            actionHint: ''
        },
        PAYMENT_ORDER_EXPIRED: {
            statusCode: 7002,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment initiation expired.',
            type: 'PAYMENT_ORDER_EXPIRED',
            actionHint: ''
        },
        PAYMENT_ORDER_CANCELLED: {
            statusCode: 7003,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Payment cancelled.',
            type: 'PAYMENT_ORDER_CANCELLED',
            actionHint: ''
        },
        PENDING_CANCELLATION: {
            statusCode: 7004,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment cancellation.',
            type: 'PENDING_CANCELLATION',
            actionHint: ''
        },
        PENDING_PAYMENT_CAPTURE: {
            statusCode: 7005,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment capture.',
            type: 'PENDING_PAYMENT_CAPTURE',
            actionHint: ''
        },
        PENDING_PAYMENT_REFUND: {
            statusCode: 7006,
            httpCode: 400,
            name: 'PaymentError',
            message: 'Awaiting payment refund.',
            type: 'PENDING_PAYMENT_REFUND',
            actionHint: ''
        },
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

    // public sindex: IAerospike.CreateIndex[] = [
    //     {
    //         set: this.set,
    //         bin: 'userId',
    //         index: 'idx_' + this.set + '_' + 'userId',
    //         type: "STRING"
    //     }
    // ]

    constructor() {
        super('payment')
    }
    /**
     * @description Returns applicable payment configuration corresponding to a cms store code`
     * @param storeCode
     */
    private async getConfig(storeCode: string) {
        // TODO: Get from Aerospike
        return PAYMENT_CONFIG[storeCode];
    }
    /**
     * @description Returns applicable noonpay payment configuration corresponding to a cms store code`
     * @param storeCode
     */
    private async getNoonpayConfig(storeCode: string) {
        // TODO: Get from Aerospike
        return PAYMENT_CONFIG[storeCode].noonpayConfig;
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
    private getErrorObject(nonzeroResponse: any) {
        let err: ICommonRequest.IError;
        if (Constant.STATUS_MSG.NOONPAY_ERROR[nonzeroResponse.resultCode]) {
            err = cloneObject(Constant.STATUS_MSG.NOONPAY_ERROR[nonzeroResponse.resultCode]);
            if (err.useNoonPayMessage) {
                err.message = nonzeroResponse.message;
                delete err.useNoonPayMessage;
            }
        } else {
            err = cloneObject(Constant.STATUS_MSG.NOONPAY_ERROR.default);
            err.message = nonzeroResponse.message;
        }
        // attach noonpay response object
        if (nonzeroResponse && nonzeroResponse.resultCode !== undefined) {
            err.data = nonzeroResponse;
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
                    name: config.codInfo.title,
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
                totalAuthorizedAmount: response.result.order.totalAuthorizedAmount,
                totalCapturedAmount: response.result.order.totalCapturedAmount,
                totalRefundedAmount: response.result.order.totalRefundedAmount,
                totalReversedAmount: response.result.order.totalReversedAmount,
                currency: response.result.order.currency,
                noonPayOrderCategory: response.result.order.category,
                channel: response.result.order.channel,
                paymentDetails: response.result.paymentDetails,
                transactions: response.result.transactions,
                noonpayRedirectionUrl: response.result.checkoutData ? response.result.checkoutData.postUrl : ''
            };
            if (response.resultCode === 0 && response.result.order.status !== Constant.DATABASE.STATUS.PAYMENT.FAILED) {
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment ORDER STATUS, non-zero resultCode or order status failed', response, true);
                if (response.result.order.status === Constant.DATABASE.STATUS.PAYMENT.FAILED) {
                    result.message = response.result.order.errorMessage;
                }
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
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.EXPIRED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED;
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
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.AUTHORIZATION) { return t; } })) : []
            }
            return result;
        } catch (error) {
            consolelog(process.cwd(), 'Payment ORDER AUTHORIZATION STATUS', JSON.stringify(error), false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Get Noonpay order CANCELLED status using either noonpayOrderId or orderId (CMS)
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
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.EXPIRED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_CANCELLATION;
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
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.VOID_AUTHORIZATION) { return t; } })) : undefined
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
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.EXPIRED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.CANCELLED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_CANCELLED;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED) {
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
                // filter capture transaction details
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.CAPTURE) { return t; } })) : []
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
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.EXPIRED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_EXPIRED;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.CANCELLED) {
                throw PaymentClass.CUSTOM_ERRORS.PAYMENT_ORDER_CANCELLED;
            } else if (response.paymentStatus === Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED) {
                throw PaymentClass.CUSTOM_ERRORS.PENDING_PAYMENT_CAPTURE;
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
                transactions: response.transactions && response.transactions.length > 0 ? (response.transactions.filter((t) => { if (t.type === Constant.DATABASE.STATUS.TRANSACTION.REFUND) { return t; } })) : []
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
            console.log('--Payment CAPTURE');
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
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment CAPTURE, non-zero resultCode', response, true);
                return Promise.reject(result);
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
            console.log('--Payment REVERSE');
            let result = {
                resultCode: response.resultCode,
                message: response.message,
                noonpayOrderId: response.result.order.id,
                orderId: response.result.order.reference,
                paymentStatus: response.result.order.status, // CANCELLED in this case
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
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment REVERSE, non-zero resultCode', response, true);
                return Promise.reject(result);
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
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment REFUND, non-zero resultCode', response, true);
                return Promise.reject(result);
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
