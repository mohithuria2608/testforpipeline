declare namespace IOrderRequest {

    interface IOrderData {
        cartId: string,
        cmsCartRef: number,
        sdmOrderRef: number,
        cmsOrderRef: number,
        userId: string,
        orderId: string,
        status: string,
        updatedAt: number,
        items: any,
        addres: IAddress,
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
    interface IPostOrder extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination {
        addressId: string,
        cartId: string,
    }

    interface IOrderHistory extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination {
    }
}
