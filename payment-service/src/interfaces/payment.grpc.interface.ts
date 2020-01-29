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
        paymentStatus?: string;
    }
    interface IPaymentDetail {
        instrument: string;
        mode: string;
        integratorAccount: string;
        paymentInfo: string;
        paymentMechanism: string;
        brand: string;
        scheme: string;
        expiryMonth: string;
        expiryYear: string;
        isNetworkToken: string;
        cardType: string;
        cardCountry: string;
        cardCountryName: string;
    }
    interface ITransaction {
        type: string;
        authorizationCode?: string;
        creationTime: Date;
        status: string;
        stan: string;
        id: string;
        amount: number;
        currency: string;
    }
    interface IGetPaymentStatusRes {
        resultCode: number;
        message: string;
        noonpayOrderId: number;
        orderId: string;
        paymentStatus: string;
        creationTime: Date;
        amount: number;
        totalAuthorizedAmount: number;
        totalCapturedAmount: number;
        totalRefundedAmount: number;
        totalReversedAmount: number;
        currency: string;
        noonPayOrderCategory: string;
        channel: string;
        paymentDetails: IPaymentDetail;
        transactions: ITransaction[];
        noonpayRedirectionUrl: string;
    }

    interface IGetPaymentInitiateStatusRes {
        resultCode: number;
        message: string;
        noonpayOrderId: number;
        orderId: string;
        paymentStatus: string;
        creationTime: Date;
        amount: number;
        currency: string;
        channel: string;
        noonpayRedirectionUrl?: string;
    }
    interface IGetPaymentAuthorizationStatusRes extends IGetPaymentInitiateStatusRes {
        totalAuthorizedAmount: number;
        totalCapturedAmount: number;
        totalRefundedAmount: number;
        totalReversedAmount: number;
        paymentDetails: IPaymentDetail;
        transaction?: ITransaction[];
    }

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