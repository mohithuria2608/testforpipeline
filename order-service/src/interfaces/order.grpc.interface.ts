declare namespace IOrderGrpcRequest {

    interface ICreateDefaultCartReq {
        request: ICreateDefaultCart
    }

    interface ICreateDefaultCart {
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

    interface IGetCartReq {
        request: ICartRequest.IGetCart
    }
}
