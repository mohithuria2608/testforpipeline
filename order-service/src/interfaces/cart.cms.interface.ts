
declare namespace ICartCMSRequest {

    interface IHeader { }

    interface ICreateCartCms {
        cms_user_id: number,
        website_id: number,
        cart_items: ICMSCartItems[],
        category_id: number,
        coupon_code?: string
    }

    interface ICMSCartItems {
        product_id: number,
        price: number,
        qty: number,
        type_id: string,
        super_attribute?: any,
        bundle_option?: any,
        selection_configurable_option?: any,
        bundle_super_attribute?: any,
    }

    interface ICmsCartRes {
        cms_cart_id: number,
        currency_code: string,
        cart_items: ICMSCartItems[],
        subtotal: number,
        grandtotal: number,
        tax: ITax
        not_available: number[],
        is_price_changed: boolean,
        coupon_code: string,
        discount_amount: number,
        success: boolean,
    }

    interface ITax {
        tax_name: string,
        amount: number,
    }
}
