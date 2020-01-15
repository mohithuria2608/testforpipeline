
declare namespace ICartCMSRequest {

    interface IHeader { }

    interface ICreateCart {
        cms_user_id: number,
        website_id: number,
        cart_items: ICMSCartItems[],
        category_id: number
    }

    interface ICMSCartItems {
        product_id: number,
        price: number,
        qty: number,
        type_id: string
    }

    interface ICreateCartCmsRes {
        cms_cart_id: number,
        currency_code: string,
        cart_items: ICMSCartItems[],
        subtotal: number,
        grandtotal: number,
        tax: ITax[]
        shipping: any
        not_available: number[],
        is_price_changed: boolean
        success: boolean,
    }

    interface ITax {
        tax_name: string,
        amount: number,
    }
}
