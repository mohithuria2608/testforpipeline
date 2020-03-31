declare namespace IOrderGrpcRequest {

    interface IGetOrder {
        cartId: string,
        bins?: string[]
    }

    interface IGetOrderRes {
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
        amount: IAmount[]
    }

    interface IAmount {
        type?: string
        code?: string
        amount?: number,
        sequence?: number,
        action?: string
    }

    interface IAddress {
        addressId: string,
        sdmAddressRef: number,
        cmsAddressRef: number,
        areaId: number,
        storeId: number,
    }
}
