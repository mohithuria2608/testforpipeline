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
        cmsCart: string,//ICmsCartRes
    }

    interface IUpdateOrderRes {
        cart: string
    }
}
