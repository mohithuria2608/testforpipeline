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
        sdmStoreRef: number,
        sdmAddressRef: number,
        cmsAddressRef: number,
        tag: number,
        bldgName: string,
        description: string,
        flatNum: string,
        addressType: string,
        lat: number,
        lng: number,
    }

    interface IStore {
        sdmStoreRef: 28,
        areaId: 520,
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
