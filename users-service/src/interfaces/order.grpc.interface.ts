declare namespace IOrderGrpcRequest {

    interface ICreateDefaultCart {
        cartId: string,
        userId: string
    }

    interface ICreateDefaultCartRes { }

    interface IUpdateDefaultCartTTL {
        cartId: string,
    }

    interface IUpdateDefaultCartTTLRes { }
}
