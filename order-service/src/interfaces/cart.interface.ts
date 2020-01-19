declare namespace ICartRequest {

    interface ICartData {
        cartId?: string,
        cmsCartRef?: number,
        sdmOrderRef?: number,
        cmsOrderRef?: number,
        userId?: string,
        orderId?: string,
        status?: string,
        createdAt?: number,
        updatedAt?: number,
        items?: any,
        address?: IAddress,
        amount?: IAmount[],
    }

    interface IAmount {
        type: string
        name: string
        code: string
        amount: number
    }
    interface IAddress {
        addressId: string,
        sdmAddressRef: number,
        cmsAddressRef: number,
        areaId: number,
        storeId: number,
    }
    interface IValidateCart extends ICommonRequest.ICordinatesOpt {
        cartId: string,
        curMenuId: number,
        menuUpdatedAt: number,
        couponCode?: string,
        items: any
    }

    interface IGetCart extends ICommonRequest.ICordinatesOpt {
        cartId?: string,
        cmsCartRef?: number
        cartUpdatedAt?: number
    }
}
