declare namespace IOrderCMSRequest {

    interface ICreateOrderCms extends ICartCMSRequest.ICreateCartCms {
        address_id?: number,
        payment_method: string,
        mongo_order_id: string
    }

    interface IUpdateOrderCms {
        order_id: number,
        order_status: string,
        payment_status: string,
        sdm_order_id: number
    }
}
