declare namespace IPromotionGrpcRequest {

    interface IChangeAerospike {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }

    interface IChangeCMS {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }

    interface IChangeSDM {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }
    interface IChangeMongo {
        create: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        sync?: boolean,
        argv: string
    }
    
    interface IValidatePromotionReq {
        request: IPromotionRequest.IValidatePromotion
    }

    interface IValidatePromotionRes {
        isValid: boolean
    }
}
