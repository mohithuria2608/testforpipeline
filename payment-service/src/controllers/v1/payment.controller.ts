import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { sendSuccess } from '../../utils'
import * as ENTITY from '../../entity'

export class PaymentController {

    constructor() { }

    /**
     * @method GET
     * @param {string} storeCode :cms store code
     */
    public async getPaymentMethods(payload: IPaymentGrpcRequest.IGetPaymentMethods, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.PaymentE.getPaymentMethods(payload.storeCode);
        }catch(error) {
            consolelog(process.cwd(), "getPaymentMethods", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {string} storeCode :cms store code
     * @param {string} orderId :CMS order id
     * @param {number} amount :Order amount
     * @param {number} paymentMethodId :noonpay payment method id
     * @param {string} channel :Sales channel
     * @param {string} locale :Payment page language
     */
    public async initiatePayment(payload: IPaymentGrpcRequest.IInitiatePayment, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.PaymentE.initiatePayment(payload);
        }catch(error) {
            consolelog(process.cwd(), "initiatePayment", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {string} storeCode :cms store code
     * @param {number} noonpayOrderId :Noonpay Order id
     * @param {string} orderId :CMS order id
     */
    public async getPaymentStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.PaymentE.getPaymentStatus(payload);
        }catch(error) {
            consolelog(process.cwd(), "getPaymentStatus", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {string} storeCode :cms store code
     * @param {number} noonpayOrderId :Noonpay Order id
     * @param {string} orderId :CMS order id
     * @param {number} amount :Order amount
     */
    public async capturePayment(payload: IPaymentGrpcRequest.ICapturePayment, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.PaymentE.capturePayment(payload);
        }catch(error) {
            consolelog(process.cwd(), "capturePayment", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {string} storeCode :cms store code
     * @param {number} noonpayOrderId :Noonpay Order id
     */
    public async reversePayment(payload: IPaymentGrpcRequest.IReversePayment, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.PaymentE.reversePayment(payload);
        }catch(error) {
            consolelog(process.cwd(), "reversePayment", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {string} storeCode :cms store code
     * @param {number} noonpayOrderId :Noonpay Order id
     * @param {number} amount :Order amount
     * @param {string} captureTransactionId :Noonpay capture transaction id
     */
    public async refundPayment(payload: IPaymentGrpcRequest.IRefundPayment, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.PaymentE.refundPayment(payload);
        }catch(error) {
            consolelog(process.cwd(), "refundPayment", error, false)
            return Promise.reject(error)
        }
    }
   
}

export const paymentController = new PaymentController();