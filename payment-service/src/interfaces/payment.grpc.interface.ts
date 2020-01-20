// tslint:disable-next-line: no-namespace
declare namespace IPaymentGrpcRequest {

    interface IGetPaymentMethodsReq {
        request: IGetPaymentMethods;
    }

    interface IGetPaymentMethods {
        storeCode: string;
    }

    interface IGetPaymentMethodsRes { }

    interface IInitiatePaymentReq {
        request: IInitiatePayment;
    }
    interface IInitiatePayment {
        orderId: string;
        amount: number;
        storeCode: string;
        paymentMethodId: number;
        channel: string;
        locale?: string;
    }
    interface IInitiatePaymentRes {}

    interface IGetPaymentStatusReq {
        request: IGetPaymentStatus;
    }
    interface IGetPaymentStatus {
        noonpayOrderId: number;
        orderId: string;
        storeCode: string;
    }
    interface IGetPaymentStatusRes {}

    interface ICapturePaymentReq {
        request: ICapturePayment;
    }
    interface ICapturePayment {
        noonpayOrderId: number;
        orderId: string;
        amount: number;
        storeCode: string;
    }
    interface ICapturePaymentRes {}

    interface IReversePaymentReq {
        request: IReversePayment;
    }
    interface IReversePayment {
        noonpayOrderId: number;
        storeCode: string;
    }
    interface IReversePaymentRes {}

    interface IRefundPaymentReq {
        request: IRefundPayment;
    }
    interface IRefundPayment {
        noonpayOrderId: number;
        amount: number;
        captureTransactionId: string;
        storeCode: string;
    }
    interface IRefundPaymentRes {}
}