declare namespace IOrderGrpcRequest {

    interface ICreateDefaultCart {
        userId: string
    }

    interface ICreateDefaultCartRes { }

    interface IGetCart {
        cartId: string
    }

    interface IGetCartRes {
        cartId?: string,
        cmsCartRef?: number,
        sdmOrderRef?: number,
        cmsOrderRef?: number,
        userId?: string,
        orderId?: string,
        status?: string,
        orderType?: string
        createdAt?: number,
        updatedAt?: number,
        items?: any,
        notAvailable?: any
        address?: IAddress,
        amount?: IAmount[],
        vat?: IAmount,
        store?: IStore,
        invalidMenu?: number,
        freeItems?: {
            ar?: any
            en?: any
        },
        selFreeItem?: {
            ar?: any
            en?: any
        },
    }

    interface IAmount {
        type?: string
        code?: string
        amount?: number,
        sequence?: number,
        action?: string
    }
    interface IAddress {
        addressId?: string,
        sdmAddressRef?: number,
        cmsAddressRef?: number,
        storeId?: number,
        areaId?: number,
        cityId?: number,
        tag?: number,
        bldgName?: string,
        description?: string,
        flatNum?: string,
        addressType?: string,
        lat?: number,
        lng?: number,
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
}
