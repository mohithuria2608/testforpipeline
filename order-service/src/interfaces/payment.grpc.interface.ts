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
    interface IInitiatePaymentRes {
        resultCode: number,
        message: string,
        noonpayOrderId: number,
        orderId: string,
        paymentStatus: string,
        creationTime: string,
        amount: number,
        currency: string,
        channel: string,
        noonpayRedirectionUrl: string,
    }

    interface IGetPaymentStatus {
        noonpayOrderId: number;
        orderId?: number;
        storeCode: string;
        paymentStatus: string,
    }
    interface IGetPaymentStatusRes {
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
        totalAuthorizedAmount: number;
        totalCapturedAmount: number;
        totalRefundedAmount: number;
        totalReversedAmount: number;
        paymentDetails: IPaymentDetail;
        transaction?: ITransaction[];
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

    interface ICapturePayment {
        noonpayOrderId: number;
        orderId: string;
        amount: number;
        storeCode: string;
    }
    
    interface ICapturePaymentRes { }

    interface IReversePayment {
        noonpayOrderId: number;
        storeCode: string;
    }
    interface IReversePaymentRes { }

    interface IRefundPayment {
        noonpayOrderId: number;
        amount: number;
        captureTransactionId: string;
        storeCode: string;
    }
    interface IRefundPaymentRes { }
}