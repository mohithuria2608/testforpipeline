declare namespace IOrderGrpcRequest {

    interface IGetSdmOrder {
        cartId: string,
        sdmOrderRef: number,
        status?: string,
        timeInterval: number
    }

    interface IGetSdmOrderRes { }
}
