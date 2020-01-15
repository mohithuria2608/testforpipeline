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
        cms_cart_id: number,
        currency_code: string,
        cart_items: ICMSCartItems[],
        subtotal: number,
        grandtotal: number,
        tax: ITax
        not_available: number[],
        is_price_changed: boolean
        success: boolean,
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
}
