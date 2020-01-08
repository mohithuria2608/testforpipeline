
declare namespace ICartCMSRequest {

    interface IHeader { }

    interface ICreateCart {
        cms_user_id: number,
        website_id: number,
        cart_items: ICMSCartItems[]
    }

    interface ICMSCartItems {
        product_id: number,
        price: number,
        qty: number,
        type_id: string
    }

    interface ICreateCartRes {
        items: ICMSCartItems[],
        not_available: ICMSCartItems[],
        sub_total: string,
        tax_applied: any,
        coupon_applied: any,
        shipping_methods: any,
        payment_methods: any,
        is_price_changed: boolean
    }
}
