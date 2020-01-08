declare namespace IPromotionGrpcRequest {

    interface ICreatePromotionReq {
        request: ICreatePromotion
    }

    interface ICreatePromotion {
        action: ICommonRequest.IChange
        data: string
        count?: number
        type?: string
    }
}