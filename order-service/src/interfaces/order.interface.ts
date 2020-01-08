declare namespace IOrderRequest {

    interface IOrderData {
        id: string,
        sdmOrderRef: number,
        cmsOrderRef: number,
        userId: string,
        status: string,
        updatedAt: number,
        address: {
            id: string,
            sdmAddressRef: number,
            cmsAddressRef: number,
            areaId: number,
            storeId: number,
        }
        items: any
    }
    interface IPostOrder extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination {
        addressId: string,
        cartId: string,
    }

    interface IOrderHistory extends ICommonRequest.ICordinatesOpt, ICommonRequest.IPagination {
    }
}
