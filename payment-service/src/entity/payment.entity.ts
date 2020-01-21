'use strict';
import * as Joi from '@hapi/joi';
import * as request from 'request-promise';
import * as _config from "config";
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, sendSuccess } from '../utils'
import { Aerospike } from '../aerospike'

/**
 * Noonpay Payment Config from CMS
 */
const PAYMENT_CONFIG = Object.freeze({
    // cms store code
    kfc_uae_store: {
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

    private static readonly API_KEY_PREFIX = 'Key_';
    private static readonly PAYMENT_OPTIONS = Object.freeze({
        ACTIONS: {
            INITIATE: 'INITIATE',
            AUTHORIZE: 'AUTHORIZE',
            CAPTURE: 'CAPTURE',
            SALE: 'SALE',
            REVERSE: 'REVERSE',
            REFUND: 'REFUND'
        },
        LOCALE: {
            EN: 'en',
            AR: 'ar'
        },
        API_TIMEOUT: 3 * 1000 // 1 sec
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
        return `${_config.get('server.order.url')}:${_config.get('server.order.port')}/order/processPayment`;
    }
    /**
     * @description Get available payment methods for a given brand in a country
     * @param storeCode
     */
    public async getPaymentMethods(storeCode: string) {
        try {
            const config = await this.getConfig(storeCode);
            // TODO: Post Config from CMS, update this according to JSON format
            let availablePaymentMethods =  {
                noonpay: [],
                offline: []
            }
            availablePaymentMethods.noonpay = config.noonpayConfig.paymentMethods.map((pMethod) => ({ id: pMethod.id, name: pMethod.name }));
            if(config.codInfo && config.codInfo.status === 1) {
                // COD available
                availablePaymentMethods.offline.push({
                    title: config.codInfo.title, 
                    min_order_total: config.codInfo.min_order_total, 
                    max_order_total: config.codInfo.max_order_total, 
                    code: config.codInfo.code
                });
            }
            return availablePaymentMethods;
        } catch (error) {
            consolelog(process.cwd(), 'Get Payment Methods', error, false);
            return Promise.reject(error);
        }
    }
    /**
     * @description Initiates payment at noonpay with specified payment method, returns FE redirection url
     * @param payload IPaymentGrpcRequest.IInitiatePayment
     */
    public async initiatePayment(payload: IPaymentGrpcRequest.IInitiatePayment) {
        // get payment method details
        const config = await this.getNoonpayConfig(payload.storeCode);
        const paymentMethodDetails = config.paymentMethods.filter((pMethod) => { if (pMethod.id === payload.paymentMethodId) { return pMethod; } })[0];
        // get noonpay API key
        const apiKey = this.getNoonPayAPIKey(config);

        let initiatePayload = {
            apiOperation: PaymentClass.PAYMENT_OPTIONS.ACTIONS.INITIATE,
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
                locale: payload.locale || PaymentClass.PAYMENT_OPTIONS.LOCALE.EN, // default english
                paymentAction: PaymentClass.PAYMENT_OPTIONS.ACTIONS.AUTHORIZE,
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
                timeout: PaymentClass.PAYMENT_OPTIONS.API_TIMEOUT
            });
            // TODO: Add a timeout (1000 ms - Suggested by Manoj, later may be part of config)
            console.log('--Payment INITIATE response', response);
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
            if (response.resultCode === 0) {
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment INITIATE, non-zero resultCode', response, true);
                return Promise.reject(result);
            }
        } catch (error) {
            // TODO: Update Payment status and noonpay order id
            consolelog(process.cwd(), 'Payment INITIATE', error, false);
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
                timeout: PaymentClass.PAYMENT_OPTIONS.API_TIMEOUT
            });
            // TODO: In case of using CMS order id, response might contain contain multiple transaction, pick the recent one
            // TODO: Write a action wrapper to manage the payment status comparison and return result accordingly to consumer based on action.
            // TODO: In Authorization payment check, compare the order amount with authorized amount - if different -> cancel the transaction and reverse.
            console.log('--Payment ORDER STATUS response', response);
            let result = {
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
                transactions: response.result.transactions
            };
            if (response.resultCode === 0) {
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment ORDER STATUS, non-zero resultCode', response, true);
                return Promise.reject(result);
            }
        } catch (error) {
            consolelog(process.cwd(), 'Payment ORDER STATUS', error, false);
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
            consolelog(process.cwd(), 'Payment CAPTURE Validation error', error, false);
            return Promise.reject(error);
        }
        const config = await this.getNoonpayConfig(payload.storeCode);
        const apiKey = this.getNoonPayAPIKey(config);

        let capturePayload = {
            apiOperation: PaymentClass.PAYMENT_OPTIONS.ACTIONS.CAPTURE,
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
                timeout: PaymentClass.PAYMENT_OPTIONS.API_TIMEOUT
            });
            console.log('--Payment CAPTURE response', response);
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
                transaction: response.result.transaction // capture payment transaction
            };
            // TODO: Update Payment status
            if (response.resultCode === 0) {
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment CAPTURE, non-zero resultCode', response, true);
                return Promise.reject(result);
            }
        } catch (error) {
            // TODO: Update Payment status and noonpay order id
            consolelog(process.cwd(), 'Payment CAPTURE', error, false);
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
            consolelog(process.cwd(), 'Payment REVERSE Validation error', error, false);
            return Promise.reject(error);
        }
        const config = await this.getNoonpayConfig(payload.storeCode);
        const apiKey = this.getNoonPayAPIKey(config);

        let reversePayload = {
            apiOperation: PaymentClass.PAYMENT_OPTIONS.ACTIONS.REVERSE,
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
                timeout: PaymentClass.PAYMENT_OPTIONS.API_TIMEOUT
            });
            console.log('--Payment REVERSE response', response);
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
                transaction: response.result.transaction // reverse payment transaction
            };
            // TODO: Update Payment status
            if (response.resultCode === 0) {
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment REVERSE, non-zero resultCode', response, true);
                return Promise.reject(result);
            }
        } catch (error) {
            // TODO: Update Payment status and noonpay order id
            consolelog(process.cwd(), 'Payment REVERSE', error, false);
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
            consolelog(process.cwd(), 'Payment REFUND Validation error', error, false);
            return Promise.reject(error);
        }
        const config = await this.getNoonpayConfig(payload.storeCode);
        const apiKey = this.getNoonPayAPIKey(config);

        let refundPayload = {
            apiOperation: PaymentClass.PAYMENT_OPTIONS.ACTIONS.REFUND,
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
                timeout: PaymentClass.PAYMENT_OPTIONS.API_TIMEOUT
            });
            console.log('--Payment REFUND response', response);
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
                transaction: response.result.transaction // refund payment transaction
            };
            // TODO: Update Payment status
            if (response.resultCode === 0) {
                return result;
            } else {
                // some error
                consolelog(process.cwd(), 'Payment REFUND, non-zero resultCode', response, true);
                return Promise.reject(result);
            }
        } catch (error) {
            // TODO: Update Payment status and noonpay order id
            consolelog(process.cwd(), 'Payment REFUND', error, false);
            return Promise.reject(error);
        }
    }
}

export const PaymentE = new PaymentClass()
