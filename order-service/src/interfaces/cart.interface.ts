declare namespace ICartRequest {

    interface ICartData {
        id: string,
        sdmOrderRef: number,
        cmsOrderRef: number,
        userId: string,
        status: string,
        updatedAt: number,
        items: any
    }

    interface IValidateCart extends ICommonRequest.ICordinatesOpt {
        cartId: string,
        curMenuId: number,
        menuUpdatedAt: number,
        items: IMenuGrpcRequest.IProduct[]
    }

    interface IGetCart extends ICommonRequest.ICordinatesOpt {
        cartId: string,
        cartUpdatedAt: number
    }
}
