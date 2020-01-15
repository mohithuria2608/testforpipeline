declare namespace IOrderGrpcRequest {

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
