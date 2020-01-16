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


    interface IUpdateCartReq {
        request: IUpdateCart
    }
    interface IUpdateCart {
        cartId: string,
        curItems: string,// IMenuGrpcRequest.IProduct[],
        cmsCart: string,//ICartCMSRequest.ICreateCartCmsRes
    }

    interface IGetCartReq {
        request: ICartRequest.ICartId
    }
}
