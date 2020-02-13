declare namespace IOrderCMSRequest {

    interface ICreateOrderCms extends ICartCMSRequest.ICreateCartCms {
        address_id?: number,
    }
}
