declare namespace IKafkaGrpcRequest {
    interface ISyncToSDMMenuData {
        action: ICommonRequest.IChange,
        data: string
    }

    interface IUpdateMenuFromCMS {
        action: ICommonRequest.IChange,
        data: string
    }

    interface ISyncUpsellProducts {
        action: ICommonRequest.IChange,
        data: string
    }

    interface ICreatePromotion {
        action: ICommonRequest.IChange,
        data: string
    }

    interface ISyncToSDMUserData {

    }


}
