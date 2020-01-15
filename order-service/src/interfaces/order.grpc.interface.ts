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

    interface IUpdateOrderReq {
        request: IUpdateOrder
    }
    interface IUpdateOrder {
        curItems: string,// IMenuGrpcRequest.IProduct[],
        cmsCart: string,//ICartCMSRequest.ICreateCartCmsRes
    }

    interface ICMSCartItems {
        product_id: number,
        price: number,
        qty: number,
        type_id: string
    }

    interface ITax {
        tax_name: string,
        amount: number,
    }

    interface IUpdateOrderRes {
    }

    interface IGetCartReq {
        request: ICartRequest.ICartId
    }
}
