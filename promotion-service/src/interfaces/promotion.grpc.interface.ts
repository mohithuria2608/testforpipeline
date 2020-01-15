declare namespace IPromotionGrpcRequest {

    interface IValidatePromotionReq {
        request: IPromotionRequest.IValidatePromotion
    }

    interface IValidatePromotionRes {
        isValid: boolean
    }
}
