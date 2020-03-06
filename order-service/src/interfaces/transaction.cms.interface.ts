declare namespace ITransactionCMSRequest {

    interface ICreateTransactionCms {
        order_id: string,
        message: string,
        type: string,
        payment_data: {
            id: string,
            data: string
        }
    }
}
