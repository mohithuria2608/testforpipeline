declare namespace IWebhookNoonpayRequest {

    interface IOrderProcessPayment {
        paymentInfo: string,
        result: string,
        orderReference: number,
        orderId: number,
    }
}