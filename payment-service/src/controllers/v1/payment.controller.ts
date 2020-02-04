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
    public async getPaymentMethods(headers: ICommonRequest.IHeaders, auth: ICommonRequest.AuthorizationObj) {
        try {
            let storeCode = "kfc_uae_store"
            return [
                {
                    "id": 1,
                    "name": "Card",
                    "image": "",
                },
                {
                    "id": 2,
                    "name": "Visa Checkout",
                    "image": "",
                },
                {
                    "id": 0,
                    "name": "Cash On Delivery",
                    "image": "",
                }
            ]
            // await ENTITY.PaymentE.getPaymentMethods(storeCode);
        } catch (error) {
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
        } catch (error) {
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
            let res: IPaymentGrpcRequest.IGetPaymentStatusRes;
            switch (payload.paymentStatus) {
                case ENTITY.PaymentClass.STATUS.ORDER.INITIATED:
                    res = (await ENTITY.PaymentE.getInitiateStatus(payload)) as IPaymentGrpcRequest.IGetPaymentStatusRes;
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
        } catch (err) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
            consolelog(process.cwd(), "refundPayment", error, false)
            return Promise.reject(error)
        }
    }

}

export const paymentController = new PaymentController();