declare namespace IPromotionCmsRequest {

    interface IApplyCoupon {
        cart_id: number,
        coupon_code: string
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

    interface IRemoveCoupon {
        cart_id: number,
        coupon_code: string
    }
}
