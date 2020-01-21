declare namespace IPromotionGrpcRequest {

    interface IValidatePromotion {
        couponCode?: string,
    }

    interface IValidatePromotionRes {
        isValid: boolean
    }
}