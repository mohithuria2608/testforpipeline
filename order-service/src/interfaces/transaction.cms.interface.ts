declare namespace ITransactionCMSRequest {

    interface ICreateTransactionCms {
        order_id: number,
        message: string,
        type: string,
        payment_data: {
            id: string,
            data: string
        }
    }
}
