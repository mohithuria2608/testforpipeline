declare namespace IOrderGrpcRequest {

    interface ICreateSdmOrder {

    }

    interface IGetSdmOrder {
        cartId: string,
        sdmOrderRef: number,
        status?: string,
        timeInterval: number
    }

    interface IGetSdmOrderRes { }
}
