declare namespace ICartRequest {

    interface ICartData {
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
    interface IUpdateCartData {
        cartId?: string,
        cmsCartRef?: number,
        sdmOrderRef?: number,
        cmsOrderRef?: number,
        status?: string,
        updatedAt?: number,
        items?: any,
        addres?: IAddress,
        subTotal?: number,
        total?: number,
        tax?: ITax[]
        shipping?: IShipping[],
        coupon?: ICoupon[]
    }
    interface IValidateCart extends ICommonRequest.ICordinatesOpt {
        cartId: string,
        curMenuId: number,
        menuUpdatedAt: number,
        couponCode?: string,
        items: IMenuGrpcRequest.IProduct[]
    }

    interface IGetCart extends ICommonRequest.ICordinatesOpt {
        cartId: string,
        cartUpdatedAt: number
    }

    interface ICartId {
        cartId?: string,
        cmsCartRef?: number
    }
}
