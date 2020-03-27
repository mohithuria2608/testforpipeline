declare namespace ICartCMSRequest {

    interface IHeader { }

    interface ICreateCartCms {
        cms_user_id: number,
        website_id: number,
        cart_items: ICMSCartItems[],
        category_id: number,
        coupon_code?: string,
        order_type: string,
    }

    interface ICMSCartItems {
        product_id: number,
        price: number,
        qty: number,
        type_id: string,
        super_attribute?: any,
        bundle_option?: any,
        bundle_super_attribute?: any,
        option?: any
        final_price?: boolean
    }

    interface ICmsCartRes {
        cms_cart_id: number,
        currency_code: string,
        cart_items: ICMSCartItems[],
        subtotal: number,
        grandtotal: number,
        tax: ITax[]
        shipping: IShipping[]
        not_available: number[],
        is_price_changed: boolean,
        coupon_code: string,
        discount_amount: number,
        success: boolean,
        order_id?: string,
        free_items: string
    }

    interface ITax {
        tax_name: string,
        amount: number,
    }

    interface IShipping {
        method_name: string,
        price: number,
        method_code: string
    }
}
