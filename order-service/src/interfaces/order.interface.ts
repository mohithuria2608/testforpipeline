declare namespace IOrderRequest {

    interface IOrderModel {
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
        subTotal: number,
        total: number,
        tax: ITax[]
        shipping: IShipping[],
        coupon: ICoupon[],
        isPreviousOrder: boolean,
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

    interface IStore {
        sdmStoreRef: number,
        lat: number,
        lng: number,
        address: string
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

    interface ITrackOrder {
        cCode: string,
        phnNo: string,
        orderId: string,
    }


    interface ICreateSdmOrder {

    }

    interface IGetSdmOrder {
        cartId: string,
        sdmOrderRef: number,
        status?: string,
        timeInterval: number
    }
}
