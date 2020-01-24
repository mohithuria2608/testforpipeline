// tslint:disable-next-line: no-namespace
declare namespace IPaymentGrpcRequest {

    interface IGetPaymentMethods {
        storeCode: string;
    }

    interface IGetPaymentMethodsRes { }

    interface IInitiatePayment {
        orderId: string;
        amount: number;
        storeCode: string;
        paymentMethodId: number;
        channel: string;
        locale?: string;
    }
    interface IInitiatePaymentRes {}

    interface IGetPaymentStatus {
        noonpayOrderId: number;
        orderId: string;
        storeCode: string;
    }
    interface IGetPaymentStatusRes {}

    interface ICapturePayment {
        noonpayOrderId: number;
        orderId: string;
        amount: number;
        storeCode: string;
    }
    interface ICapturePaymentRes {}

    interface IReversePayment {
        noonpayOrderId: number;
        storeCode: string;
    }
    interface IReversePaymentRes {}

    interface IRefundPayment {
        noonpayOrderId: number;
        amount: number;
        captureTransactionId: string;
        storeCode: string;
    }
    interface IRefundPaymentRes {}
}