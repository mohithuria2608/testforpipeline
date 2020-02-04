declare namespace IKafkaGrpcRequest {
    interface IKafkaReq {
        request: IKafkaBody
    }
    interface IKafkaBody {
        set: string,
        as?: IChangeAerospike
        cms?: IChangeCMS
        sdm?: IChangeSDM
        mdb?: IChangeMongo
        count?: number,
    }
    interface IChangeAerospike {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        argv: string
    }
    interface IChangeCMS {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        argv: string
    }
    interface IChangeSDM {
        create?: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        argv: string
    }
    interface IChangeMongo {
        create: boolean,
        update?: boolean,
        reset?: boolean,
        get?: boolean,
        argv: string
    }
}
