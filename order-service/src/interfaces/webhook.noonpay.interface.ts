declare namespace IWebhookNoonpayRequest {

    interface IOrderProcessPayment {
        paymentInfo: string,
        result: string,
        orderReference: string,
        orderId: string,
    }
}