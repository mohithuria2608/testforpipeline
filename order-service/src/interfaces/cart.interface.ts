declare namespace ICartRequest {

    interface IValidateCart extends ICommonRequest.IHeaders, ICommonRequest.ICordinatesOpt {
        curMenuId: number,
        menuUpdatedAt: number,
        items: IMenuServiceRequest.IProduct[]
    }
}
