declare namespace ICartRequest {

    interface IValidateCart extends ICommonRequest.IHeaders, ICommonRequest.ICordinatesOpt {
        curMenuId: string,
        items: [{
            itemId: string,
            name: string
        }]
    }

    interface ICartSuggestion extends ICommonRequest.IHeaders {
    }

}
