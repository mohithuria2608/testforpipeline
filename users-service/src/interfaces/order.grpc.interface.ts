declare namespace IOrderGrpcRequest {

    interface ICreateDefaultCart {
        userId: string
    }

    interface ICreateDefaultCartRes { }

    interface IUpdateDefaultCartTTL {
        cartId: string,
    }

    interface IUpdateDefaultCartTTLRes { }
}
