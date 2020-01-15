declare namespace IPromotionGrpcRequest {

    interface IKafkaReq {
        request: IKafkaBody
    }
    interface IKafkaBody {
        set: string,
        as: IChangeAerospike
        cms: IChangeCMS
        sdm: IChangeSDM
        count?: number,
    }

    interface IChangeAerospike {
        create?: boolean,
        update?: boolean,
        get?: boolean,
        argv: string
    }

    interface IChangeCMS {
        create?: boolean,
        update?: boolean,
        get?: boolean,
        argv: string
    }

    interface IChangeSDM {
        create?: boolean,
        update?: boolean,
        get?: boolean,
        argv: string
    }
    interface IValidatePromotionReq {
        request: IPromotionRequest.IValidatePromotion
    }

    interface IValidatePromotionRes {
        isValid: boolean
    }
}
