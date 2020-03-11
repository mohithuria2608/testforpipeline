declare namespace ICartRequest {

    interface ICartData {
        cartId?: string,
        cartUnique?: string,
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
        promo?: IPromotionGrpcRequest.IValidatePromotionRes,
        storeOnline?: number
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
        name?: string
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
    interface IValidateCart extends ICommonRequest.ICordinatesOpt {
        orderType: string
        cartId: string,
        curMenuId: number,
        menuUpdatedAt: number,
        couponCode?: string,
        items: any,
        selFreeItem?: {
            ar?: any
            en?: any
        }
    }

    interface IGetCart extends ICommonRequest.ICordinatesOpt {
        cartId?: string,
        cmsCartRef?: number
        cartUpdatedAt?: number
    }

    interface IUpdateCart {
        headers: ICommonRequest.IHeaders,
        orderType: string,
        cartId: string,
        cmsCart: ICartCMSRequest.ICmsCartRes,
        changeCartUnique: boolean,
        curItems: any,
        selFreeItem: any,
        invalidMenu: boolean,
        promo: IPromotionGrpcRequest.IValidatePromotionRes,
        storeOnline: boolean
    }

    interface IDataToHash {
        items: any,
        promo: number,
        updatedAt: number
    }
}
