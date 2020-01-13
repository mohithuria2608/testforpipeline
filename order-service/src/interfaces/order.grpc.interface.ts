declare namespace IOrderGrpcRequest {

    interface ICreateDefaultCartReq {
        request: ICreateDefaultCart
    }

    interface ICreateDefaultCart {
        cartId: string,
        userId: string
    }

    interface ICreateDefaultCartRes { }

    interface IUpdateDefaultCartTTLReq {
        request: IUpdateDefaultCartTTL
    }

    interface IUpdateDefaultCartTTL {
        cartId: string,
    }

    interface IUpdateDefaultCartTTLRes { }

    interface IGetSdmOrderReq {
        request: IGetSdmOrder
    }

    interface IGetSdmOrder {
        cartId: string,
        sdmOrderRef: number,
        status?: string,
        timeInterval: number
    }

    interface IGetSdmOrderRes { }
}
