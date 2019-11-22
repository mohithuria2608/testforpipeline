declare namespace ICartRequest {

    interface IValidateCart extends ICommonRequest.IHeaders, ICommonRequest.ICordinatesOpt {
        curMenuId: string
    }
}
