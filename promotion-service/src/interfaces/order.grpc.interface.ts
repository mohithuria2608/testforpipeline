declare namespace IOrderGrpcRequest {

    interface IGetOrder {
        cartId: string
    }

    interface IGetOrderRes {
        cartId: string,
        cmsCartRef: number,
        sdmOrderRef: number,
        cmsOrderRef: number,
        userId: string,
        orderId: string,
        status: string,
        createdAt: number,
        updatedAt: number,
        items: any,
        address: IAddress,
        subTotal: number,
        total: number,
        tax: ITax[]
        shipping: IShipping[],
        coupon: ICoupon[]
    }

    interface IAddress {
        addressId: string,
        sdmAddressRef: number,
        cmsAddressRef: number,
        areaId: number,
        storeId: number,
    }

    interface ITax {
        name: string,
        value: number,
    }

    interface IShipping {
        name: string,
        code: string,
        value: number,
    }

    interface ICoupon {

    }

    interface IUpdateOrder {
        cartId: string,
        curItems: string,// IMenuGrpcRequest.IProduct[],
        cmsCart: string,//ICmsCartRes
    }

    interface ICmsCartRes {
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
