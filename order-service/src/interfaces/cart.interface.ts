declare namespace ICartRequest {

    interface IValidateCart extends ICommonRequest.IHeaders, ICommonRequest.ICordinatesOpt {
        curMenuId: string,
        menuUpdatedAt: number
        items: any
    }

    interface ICartSuggestion extends ICommonRequest.IHeaders {
    }

}
