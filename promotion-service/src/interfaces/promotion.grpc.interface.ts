declare namespace IPromotionGrpcRequest {

    interface ICreatePromotionReq {
        request: ICreatePromotion
    }

    interface ICreatePromotion {
        action: ICommonRequest.IChange,
        count?: Number
        type?: string
        data: string
    }
}
