declare namespace IOrderRequest {

    interface IOrderData {
        _id: string,
        orderType: string,
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
        store: IStore,
        amount: IAmount[],
    }

    interface IAddress {
        addressId: string,
        sdmAddressRef: number,
        cmsAddressRef: number,
        areaId: number,
        storeId: number,
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
        sdmStoreRef: number,
        lat: number,
        lng: number,
        address: string,
        name_en: string,
        name_ar: string,
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
        timeInterval: number
    }
}
