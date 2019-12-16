declare namespace ICartRequest {

    interface IValidateCart extends  ICommonRequest.ICordinatesOpt {
        curMenuId: number,
        menuUpdatedAt: number,
        items: IMenuGrpcRequest.IProduct[]
    }
}
