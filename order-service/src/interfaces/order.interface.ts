declare namespace IOrderRequest {

    interface IOrderData {
        _id: string,
        orderType: string,
        cartId: string,
        cartUnique: string
        cmsCartRef: number,
        sdmOrderRef: number,
        cmsOrderRef: number,
        userId: string,
        sdmUserRef: number,
        country: string,
        status: string,
        createdAt: number,
        updatedAt: number,
        items: any,
        itemsHash: string
        address: IAddress,
        store: IStore,
        amount: IAmount[],
        language: string,
        promo: IPromotionGrpcRequest.IValidatePromotionRes
    }

    interface IAddress {
        addressId: string,
        sdmAddressRef: number,
        cmsAddressRef: number,
        countryId: number,
        storeId: number,
        areaId: number,
        cityId: number,
        tag: string,
        bldgName: string,
        description: string,
        flatNum: string,
        addressType: string,
        lat: number,
        lng: number,
    }

    interface IAmount {
        type: string
        name: string
        code: string
        amount: number,
        sequence: number,
    }

    interface IStore {
        storeId: number,
        countryId: number,
        areaId: number,
        cityId: number,
        location: any,
        address_en: string,
        address_ar: string,
        name_en: string,
        name_ar: string
    }

    interface IPostOrder extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination, ICartRequest.IValidateCart {
        addressId: string,
        orderType: string,
        paymentMethodId: number
    }

    interface IOrderHistory extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination {
        isActive: number
    }

    interface IOrderDetail {
        orderId: string,
    }

    interface IOrderStatus {
        orderId: string,
    }
    interface ITrackOrder {
        cCode: string,
        phnNo: string,
        orderId: string,
    }

    interface IGetSdmOrder {
        sdmOrderRef: number,
        status?: string,
        language: string
        timeInterval: number
    }
}
