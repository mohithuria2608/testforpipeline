import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { sendSuccess } from '../../utils'
import * as ENTITY from '../../entity'
import { orderService } from '../../grpc/client';

export class PaymentController {

    constructor() { }

    /**
     * @method GET
     * @param {string} storeCode :cms store code
     */
    public async getPaymentMethods(headers: ICommonRequest.IHeaders, payload: IPaymentGrpcRequest.IGetPaymentMethods, auth: ICommonRequest.AuthorizationObj) {
        try {
            let cart = await orderService.getCart({ cartId: payload.cartId })
            if (cart && cart.cartId && cart.amount && cart.amount.length > 0) {
                let amount = cart.amount.filter(obj => { return obj.type == Constant.DATABASE.TYPE.CART_AMOUNT.TOTAL })
                let storeCode = Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE
                if (amount[0].amount < Constant.SERVER.MIN_CART_VALUE) {
                    console.log("1")
                    return []
                }
                else if (amount[0].amount > Constant.SERVER.MIN_COD_CART_VALUE) {
                    console.log("2")
                    return [
                        {
                            "id": 1,
                            "name": "Card",
                            "image": "",
                            default: 1
                        }
                    ]
                }
                else {
                    console.log("3")
                    return [
                        {
                            "id": 1,
                            "name": "Card",
                            "image": "",
                            default: 0
                        },
                        {
                            "id": 0,
                            "name": "Cash On Delivery",
                            "image": "",
                            default: 1
                        }
                    ]

                }
                await ENTITY.PaymentE.getPaymentMethods(storeCode);
            } else {
                return []
            }
        } catch (error) {
            consolelog(process.cwd(), "getPaymentMethods", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "initiatePayment", JSON.stringify(error), false)
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
                case Constant.DATABASE.STATUS.PAYMENT.INITIATED:
                    res = (await ENTITY.PaymentE.getInitiateStatus(payload)) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED:
                    res = await ENTITY.PaymentE.getAuthorizationStatus(payload) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.CANCELLED:
                    res = await ENTITY.PaymentE.getReverseStatus(payload) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.CAPTURED:
                    res = await ENTITY.PaymentE.getCaptureStatus(payload) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.REFUNDED:
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
            consolelog(process.cwd(), "capturePayment", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "reversePayment", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "refundPayment", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const paymentController = new PaymentController();