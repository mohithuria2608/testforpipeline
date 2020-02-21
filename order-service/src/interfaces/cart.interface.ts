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
        store?: IStore
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
        storeId: number,
        areaId: number,
        cityId: number,
        tag: number,
        bldgName: string,
        description: string,
        flatNum: string,
        addressType: string,
        lat: number,
        lng: number,
    }

    interface IStore {
        storeId: number,
        areaId: number,
        location: {
            description: string,
            latitude: number
            longitude: number
        },
        address_en: string,
        address_ar: string,
        name_en: string,
        name_ar: string,
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
