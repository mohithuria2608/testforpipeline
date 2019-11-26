declare namespace ICartRequest {

    interface IValidateCart extends ICommonRequest.IHeaders, ICommonRequest.ICordinatesOpt {
        curMenuId: number,
        menuUpdatedAt: number,
        categoryId: number,
        items: IMenuServiceRequest.IProduct[]
    }

    interface ICartSuggestion extends ICommonRequest.IHeaders {
    }

}
