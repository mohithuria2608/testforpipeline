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
        }catch(err) {
            consolelog(process.cwd(), "getPaymentMethods", err, false)
            return Promise.reject(err)
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
        }catch(err) {
            consolelog(process.cwd(), "initiatePayment", err, false)
            return Promise.reject(err)
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
            let res: IPaymentGrpcRequest.IGetPaymentStatusRes;
            switch (payload.paymentStatus) {
                case ENTITY.PaymentClass.STATUS.ORDER.INITIATED:
                    res =  (await ENTITY.PaymentE.getInitiateStatus(payload)) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case ENTITY.PaymentClass.STATUS.ORDER.AUTHORIZED:
                    res = await ENTITY.PaymentE.getAuthorizationStatus(payload) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case ENTITY.PaymentClass.STATUS.ORDER.CANCELLED:
                    res = await ENTITY.PaymentE.getReverseStatus(payload) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case ENTITY.PaymentClass.STATUS.ORDER.CAPTURED:
                    res = await ENTITY.PaymentE.getCaptureStatus(payload) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case ENTITY.PaymentClass.STATUS.ORDER.REFUNDED:
                    res = await ENTITY.PaymentE.getRefundStatus(payload) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                default:
                    res = await ENTITY.PaymentE.getPaymentStatus(payload);
                    break;
            }
            return res;
        }catch(err) {
            consolelog(process.cwd(), "getPaymentStatus", err, false)
            return Promise.reject(err)
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
        }catch(err) {
            consolelog(process.cwd(), "capturePayment", err, false)
            return Promise.reject(err)
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
        }catch(err) {
            consolelog(process.cwd(), "reversePayment", err, false)
            return Promise.reject(err)
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
        }catch(err) {
            consolelog(process.cwd(), "refundPayment", err, false)
            return Promise.reject(err)
        }
    }
   
}

export const paymentController = new PaymentController();